import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, LoaderCircle } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function PaymentVerify() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");

  const [status, setStatus] = useState("verifying");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [message, setMessage] = useState("Verifying your payment...");

  useEffect(() => {
    let active = true;

    async function verifyPayment() {
      if (!reference) {
        setStatus("error");
        setMessage("No payment reference was provided.");
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/api/checkout/verify/${encodeURIComponent(reference)}`,
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || "Payment is not confirmed yet.");
        }

        if (active) {
          setDownloadUrl(data.downloadUrl);
          setStatus("success");
          setMessage("Your payment has been verified.");
        }
      } catch (error) {
        if (active) {
          setStatus("error");
          setMessage(error.message);
        }
      }
    }

    verifyPayment();

    return () => {
      active = false;
    };
  }, [reference]);

  return (
    <main className="min-h-[65vh] bg-[#f7f4ee] px-5 py-16">
      <section className="mx-auto max-w-lg rounded-[20px] bg-white p-7 text-center shadow-sm sm:p-10">
        {status === "verifying" && (
          <LoaderCircle
            className="mx-auto animate-spin text-[#c69b55]"
            size={42}
          />
        )}

        {status === "success" && (
          <CheckCircle2 className="mx-auto text-[#788f69]" size={44} />
        )}

        <h1 className="mt-5 text-2xl font-semibold">
          {status === "success"
            ? "Payment successful"
            : status === "error"
              ? "Payment confirmation"
              : "One moment, please"}
        </h1>

        <p role="status" className="mt-3 text-sm leading-6 text-[#74736c]">
          {message}
        </p>

        {status === "success" && downloadUrl && (
          <a
            href={downloadUrl}
            className="mt-7 inline-flex rounded-full bg-[#c69b55] px-6 py-3 text-sm font-medium text-white hover:bg-[#ad8241]"
          >
            Download your workbook
          </a>
        )}

        {status === "error" && (
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-full bg-[#c69b55] px-5 py-3 text-sm text-white hover:bg-[#ad8241]"
          >
            Try verification again
          </button>
        )}

        <div>
          <Link
            to="/resources"
            className="mt-6 inline-block text-sm text-[#74736c] underline underline-offset-4"
          >
            Return to Resources
          </Link>
        </div>
      </section>
    </main>
  );
}
