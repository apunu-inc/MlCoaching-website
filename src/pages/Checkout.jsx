import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const PRODUCTS = {
  "purposeful-action-workbook": {
    title: "Purposeful Action Workbook",
    price: "₦5,000",
  },
  "financial-step-change-workbook": {
    title: "Financial Step Change Workbook",
    price: "₦7,500",
  },
};

export default function Checkout() {
  const { productSlug } = useParams();
  const product = PRODUCTS[productSlug];

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not start checkout.");
      }

      // Navigate to Paystack-hosted checkout.
      window.location.assign(data.authorizationUrl);
    } catch (err) {
      setError(err.message || "Something went wrong.");
      setLoading(false);
    }
  }

  if (!product) {
    return (
      <main className="min-h-[60vh] bg-[#f7f4ee] px-5 py-16">
        <div className="mx-auto max-w-lg rounded-2xl bg-white p-8">
          <h1 className="text-2xl font-semibold">Workbook not found</h1>
          <Link to="/resources" className="mt-4 inline-block underline">
            Return to Resources
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[65vh] bg-[#f7f4ee] px-5 py-12 sm:py-20">
      <div className="mx-auto max-w-lg">
        <Link
          to="/resources"
          className="inline-flex items-center gap-2 text-sm text-[#74736c] hover:text-[#292923]"
        >
          <ArrowLeft size={16} /> Back to Resources
        </Link>

        <section className="mt-6 rounded-[20px] bg-white p-6 shadow-sm sm:p-9">
          <p className="text-xs uppercase tracking-widest text-[#78816d]">
            Secure checkout
          </p>

          <h1 className="mt-3 text-2xl font-semibold tracking-tight">
            {product.title}
          </h1>

          <p className="mt-4 text-3xl font-semibold text-[#292923]">
            {product.price}
          </p>

          <p className="mt-2 text-sm leading-6 text-[#74736c]">
            Enter your email address to continue to secure payment. Your
            download will become available after payment verification.
          </p>

          <form onSubmit={handleCheckout} className="mt-7 space-y-5">
            <div>
              <label
                htmlFor="checkout-email"
                className="mb-2 block text-sm font-medium"
              >
                Email address
              </label>

              <input
                id="checkout-email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#e6e0d6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#c69b55] focus:ring-2 focus:ring-[#c69b55]/20"
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#c69b55] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#ad8241] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Preparing checkout..." : "Continue to payment"}
            </button>
          </form>

          <p className="mt-5 flex items-center justify-center gap-2 text-xs text-[#74736c]">
            <ShieldCheck size={15} /> Secure payment powered by Paystack
          </p>
        </section>
      </div>
    </main>
  );
}
