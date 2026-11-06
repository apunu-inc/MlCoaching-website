import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL;

export default function Booking() {
  const containerRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    if (
      !CALENDLY_URL ||
      !/^https:\/\/calendly\.com\/[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)?\/?$/.test(
        CALENDLY_URL,
      )
    ) {
      setError("The coach's Calendly booking link has not been configured.");
      return;
    }

    let script = document.querySelector('script[data-calendly-widget="true"]');

    function initialize() {
      if (cancelled || !containerRef.current || !window.Calendly) return;

      containerRef.current.innerHTML = "";

      window.Calendly.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: containerRef.current,
      });
    }

    if (window.Calendly) {
      initialize();
    } else if (script) {
      script.addEventListener("load", initialize);
      script.addEventListener("error", handleScriptError);
    } else {
      script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.dataset.calendlyWidget = "true";
      script.addEventListener("load", initialize);
      script.addEventListener("error", handleScriptError);
      document.body.appendChild(script);
    }

    function handleScriptError() {
      if (!cancelled) {
        setError("Booking could not load. Please try again later.");
      }
    }

    return () => {
      cancelled = true;
      script?.removeEventListener("load", initialize);
      script?.removeEventListener("error", handleScriptError);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/about"
          className="inline-flex items-center gap-2 text-sm text-[#74736c]"
        >
          <ArrowLeft size={15} /> About
        </Link>

        <header className="mt-8 max-w-xl">
          <p className="text-xs font-medium uppercase tracking-widest text-[#78816d]">
            Let's connect
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Get to Know Me
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#74736c]">
            Choose a suitable time for a discovery call. I look forward to
            learning more about you and what you would like to work towards.
          </p>
        </header>

        <section className="mt-8 overflow-hidden rounded-[20px] bg-white p-3 shadow-sm sm:p-5">
          {error ? (
            <div role="alert" className="p-5 text-sm text-[#74736c]">
              <p>{error}</p>
              <p className="mt-3">
                Please contact the coach directly to arrange a time.
              </p>
            </div>
          ) : (
            <div
              ref={containerRef}
              className="min-h-[700px] w-full"
              aria-label="Book a discovery call"
            />
          )}
        </section>
      </div>
    </main>
  );
}
