import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const WorkWithMe = lazy(() => import("./pages/WorkWithMe"));
const Resources = lazy(() => import("./pages/Resources"));
const About = lazy(() => import("./pages/About"));

const Checkout = lazy(() => import("./pages/Checkout"));
const PaymentVerify = lazy(() => import("./pages/PaymentVerify"));
const Survey = lazy(() => import("./pages/Survey"));
const Booking = lazy(() => import("./pages/Booking"));

function PageLoader() {
  return (
    <div
      role="status"
      aria-label="Loading page"
      className="flex min-h-[50vh] items-center justify-center bg-[#f7f4ee]"
    >
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#e6ddcd] border-t-[#c69b55]" />
      <span className="sr-only">Loading page...</span>
    </div>
  );
}

function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center bg-[#f7f4ee] px-6 text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#a17d4d]">
        404 — Page not found
      </p>

      <h1 className="font-serif text-4xl text-[#292820] md:text-5xl">
        This page doesn't exist.
      </h1>

      <a
        href="/"
        className="mt-8 inline-flex items-center bg-[#292820] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#a17d4d]"
      >
        Back to homepage
      </a>
    </main>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />

      <Header />

      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/what-we-do" element={<WorkWithMe />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/about" element={<About />} />

            <Route path="/checkout/:productSlug" element={<Checkout />} />

            <Route path="/payment/verify" element={<PaymentVerify />} />

            <Route path="/survey" element={<Survey />} />
            <Route path="/booking" element={<Booking />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
