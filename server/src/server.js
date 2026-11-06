import "dotenv/config";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import pg from "pg";
import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";

const app = express();
const { Pool } = pg;

const PORT = Number(process.env.PORT || 4000);
const FRONTEND_URL = process.env.FRONTEND_URL;
const API_PUBLIC_URL = process.env.API_PUBLIC_URL;
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

if (
  !process.env.DATABASE_URL ||
  !FRONTEND_URL ||
  !API_PUBLIC_URL ||
  !PAYSTACK_SECRET_KEY
) {
  throw new Error("Missing required environment variables.");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: true }
      : undefined,
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PRIVATE_FILES_DIR = path.resolve(
  process.env.PRIVATE_FILES_DIR || "../private",
);

const PRODUCTS = {
  "purposeful-action-workbook": {
    title: "Purposeful Action Workbook",
    priceNgn: Number(process.env.PURPOSEFUL_WORKBOOK_PRICE_NGN),
    filename: "purposeful-action-workbook.pdf",
  },
  "financial-step-change-workbook": {
    title: "Financial Step Change Workbook",
    priceNgn: Number(process.env.FINANCIAL_WORKBOOK_PRICE_NGN),
    filename: "financial-step-change-workbook.pdf",
  },
};

for (const product of Object.values(PRODUCTS)) {
  if (!Number.isSafeInteger(product.priceNgn) || product.priceNgn <= 0) {
    throw new Error("Every workbook must have a valid price in naira.");
  }
}

app.disable("x-powered-by");
app.use(helmet());

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }),
);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

app.use("/api", apiLimiter);

// Paystack webhook MUST receive the raw request body.
// Register it before express.json().
app.post(
  "/api/paystack/webhook",
  express.raw({ type: "application/json", limit: "1mb" }),
  async (req, res) => {
    try {
      const signature = req.get("x-paystack-signature");

      if (!signature || !Buffer.isBuffer(req.body)) {
        return res.sendStatus(400);
      }

      const expectedSignature = crypto
        .createHmac("sha512", PAYSTACK_SECRET_KEY)
        .update(req.body)
        .digest("hex");

      const received = Buffer.from(signature, "hex");
      const expected = Buffer.from(expectedSignature, "hex");

      if (
        received.length !== expected.length ||
        !crypto.timingSafeEqual(received, expected)
      ) {
        return res.sendStatus(401);
      }

      const event = JSON.parse(req.body.toString("utf8"));

      // Acknowledge unrelated events without modifying orders.
      if (event.event !== "charge.success") {
        return res.sendStatus(200);
      }

      const reference = event.data?.reference;

      if (typeof reference !== "string") {
        return res.sendStatus(400);
      }

      // Verify directly with Paystack before granting access.
      await verifyAndMarkPaid(reference);

      return res.sendStatus(200);
    } catch (error) {
      console.error("Paystack webhook error:", error.message);
      return res.sendStatus(500);
    }
  },
);

app.use(express.json({ limit: "20kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

function isValidEmail(email) {
  return (
    typeof email === "string" &&
    email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );
}

function generateReference() {
  return `coach_${crypto.randomBytes(16).toString("hex")}`;
}

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

// Confirm status, currency and amount against the stored order.
async function verifyAndMarkPaid(reference) {
  const orderResult = await pool.query(
    `SELECT * FROM orders WHERE reference = $1`,
    [reference],
  );

  const order = orderResult.rows[0];

  if (!order) {
    throw new Error("Order not found.");
  }

  if (order.payment_status === "paid") {
    return order;
  }

  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
      signal: AbortSignal.timeout(15000),
    },
  );

  if (!response.ok) {
    throw new Error("Paystack verification request failed.");
  }

  const result = await response.json();
  const transaction = result.data;

  if (
    !result.status ||
    !transaction ||
    transaction.status !== "success" ||
    transaction.reference !== order.reference ||
    transaction.amount !== Number(order.amount_kobo) ||
    transaction.currency !== order.currency
  ) {
    throw new Error("Payment could not be verified.");
  }

  const updated = await pool.query(
    `UPDATE orders
     SET payment_status = 'paid', paid_at = NOW()
     WHERE reference = $1
       AND payment_status = 'pending'
     RETURNING *`,
    [reference],
  );

  return updated.rows[0] || order;
}

// Create an order and initialize Paystack checkout.
app.post("/api/checkout", async (req, res) => {
  try {
    const { productSlug, email } = req.body || {};

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Enter a valid email address." });
    }

    const product = PRODUCTS[productSlug];

    if (!product) {
      return res.status(400).json({ error: "Invalid workbook." });
    }

    const reference = generateReference();
    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = hashToken(token);
    const amountKobo = product.priceNgn * 100;

    await pool.query(
      `INSERT INTO orders
       (reference, product_slug, customer_email, amount_kobo, access_token_hash)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        reference,
        productSlug,
        email.trim().toLowerCase(),
        amountKobo,
        tokenHash,
      ],
    );

    const paymentResponse = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          amount: amountKobo,
          currency: "NGN",
          reference,
          callback_url: `${FRONTEND_URL}/payment/verify`,
          metadata: {
            product_slug: productSlug,
            product_title: product.title,
          },
        }),
        signal: AbortSignal.timeout(15000),
      },
    );

    const payment = await paymentResponse.json();

    if (!paymentResponse.ok || !payment.status) {
      await pool.query(
        `UPDATE orders SET payment_status = 'failed'
         WHERE reference = $1 AND payment_status = 'pending'`,
        [reference],
      );

      return res.status(502).json({
        error: "Could not initialize payment. Please try again.",
      });
    }

    // Keep the access token on the server until payment is verified.
    // It is not returned as part of the checkout response.
    await pool.query(
      `UPDATE orders SET payment_status = 'pending' WHERE reference = $1`,
      [reference],
    );

    // Store the token in a separate table in production, or generate
    // a new token after verification. See note below about token handling.
    return res.json({
      authorizationUrl: payment.data.authorization_url,
      reference,
    });
  } catch (error) {
    console.error("Checkout error:", error.message);
    return res.status(500).json({ error: "Checkout could not be started." });
  }
});

// Verify a payment after Paystack redirects back to the website.
app.get("/api/checkout/verify/:reference", async (req, res) => {
  try {
    const { reference } = req.params;

    if (!/^coach_[a-f0-9]{32}$/.test(reference)) {
      return res.status(400).json({ error: "Invalid payment reference." });
    }

    const orderResult = await pool.query(
      `SELECT * FROM orders WHERE reference = $1`,
      [reference],
    );

    const order = orderResult.rows[0];

    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    if (order.payment_status !== "paid") {
      await verifyAndMarkPaid(reference);
    }

    // Only issue a download after payment is verified.
    const paidOrder = await pool.query(
      `SELECT product_slug, access_token_hash
       FROM orders WHERE reference = $1 AND payment_status = 'paid'`,
      [reference],
    );

    if (!paidOrder.rows[0]) {
      return res.status(402).json({ error: "Payment is not confirmed." });
    }

    // This basic version needs the raw token to be retained securely.
    // The token delivery improvement below replaces this placeholder.
    return res.json({
      success: true,
      product: PRODUCTS[paidOrder.rows[0].product_slug].title,
      message: "Payment verified successfully.",
    });
  } catch (error) {
    console.error("Verification error:", error.message);
    return res.status(400).json({
      error: "Payment has not been confirmed. Please try again shortly.",
    });
  }
});

// Secure download endpoint: the client must supply a valid access token.
app.get("/api/download/:token", async (req, res) => {
  try {
    const token = req.params.token;

    if (!/^[a-f0-9]{64}$/.test(token)) {
      return res.status(404).json({ error: "Download not found." });
    }

    const result = await pool.query(
      `SELECT product_slug FROM orders
       WHERE access_token_hash = $1 AND payment_status = 'paid'`,
      [hashToken(token)],
    );

    const order = result.rows[0];

    if (!order) {
      return res.status(404).json({ error: "Download not found." });
    }

    const product = PRODUCTS[order.product_slug];
    const filePath = path.resolve(PRIVATE_FILES_DIR, product.filename);

    if (!filePath.startsWith(PRIVATE_FILES_DIR + path.sep)) {
      return res.status(400).json({ error: "Invalid file path." });
    }

    await fs.access(filePath);

    return res.download(filePath, product.filename);
  } catch (error) {
    if (error.code === "ENOENT") {
      return res.status(404).json({ error: "Workbook file not found." });
    }

    console.error("Download error:", error.message);
    return res.status(500).json({ error: "Could not download workbook." });
  }
});

// Validate and store survey submissions.
const surveyLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

app.post("/api/survey", surveyLimiter, async (req, res) => {
  try {
    const { email, answers } = req.body || {};

    const questions = [
      "goals",
      "consistency",
      "finances",
      "nextStep",
      "confidence",
    ];

    if (
      !answers ||
      typeof answers !== "object" ||
      Array.isArray(answers) ||
      !questions.every(
        (question) =>
          Number.isInteger(answers[question]) &&
          answers[question] >= 1 &&
          answers[question] <= 5,
      )
    ) {
      return res.status(400).json({
        error: "Please answer every survey question.",
      });
    }

    if (email && !isValidEmail(email)) {
      return res.status(400).json({ error: "Enter a valid email address." });
    }

    const score = questions.reduce(
      (total, question) => total + answers[question],
      0,
    );

    const resultCategory =
      score <= 11
        ? "finding_clarity"
        : score <= 18
          ? "building_consistency"
          : "ready_for_action";

    await pool.query(
      `INSERT INTO survey_submissions
       (customer_email, answers, score, result_category)
       VALUES ($1, $2, $3, $4)`,
      [email?.trim().toLowerCase() || null, answers, score, resultCategory],
    );

    return res.status(201).json({
      success: true,
      score,
      resultCategory,
    });
  } catch (error) {
    console.error("Survey error:", error.message);
    return res.status(500).json({
      error: "Your answers could not be saved. Please try again.",
    });
  }
});

app.use((error, _req, res, _next) => {
  console.error(error.message);
  res.status(500).json({ error: "An unexpected error occurred." });
});

app.listen(PORT, () => {
  console.log(`Coaching API running on port ${PORT}`);
});
