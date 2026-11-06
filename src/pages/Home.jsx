import { useState } from "react";
import { Link } from "react-router-dom";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

import {
  ArrowUpRight,
  Compass,
  Target,
  Lightbulb,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  // MoveUpRight,
} from "lucide-react";

// SERVICES
const services = [
  {
    icon: Target,
    title: "Purposeful Action Program",
    text: "Turn clarity into intentional progress, with a practical plan that supports your goals and keeps you moving forward.",
  },
  {
    icon: Lightbulb,
    title: "Mentoring & Advisory",
    text: "Get thoughtful perspective, guidance, and accountability from someone who understands the path you are navigating.",
  },
  {
    icon: TrendingUp,
    title: "Financial Freedom Coaching",
    text: "Build confidence with your money, develop healthier habits, and make decisions that support the life you want.",
  },
];

// TRANSFORMATION STEPS
const steps = [
  {
    icon: Compass,
    title: "Clarity",
    text: "Know what you want and what needs to change.",
  },
  {
    icon: Lightbulb,
    title: "Confidence",
    text: "Strengthen your voice and trust your own decisions.",
  },
  {
    icon: Target,
    title: "Action",
    text: "Turn your goals into practical steps and consistent progress.",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    text: "Build the career, brand and life you are proud of.",
  },
];

// TESTIMONIALS
const testimonials = [
  {
    quote:
      "The process helped me get clear on what I wanted and gave me the confidence to take the next step.",
    name: "Client testimonial",
    role: "Career coaching",
  },
  {
    quote:
      "I felt heard, supported, and challenged in the best way. I left each session with a clearer plan.",
    name: "Client testimonial",
    role: "Mentoring & advisory",
  },
  {
    quote:
      "A thoughtful experience that helped me approach my goals with more intention and self-belief.",
    name: "Client testimonial",
    role: "Personal development",
  },
];

const ease = [0.22, 1, 0.36, 1];

const revealVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease,
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

function Reveal({ children, className = "", reduced }) {
  return (
    <motion.div
      className={className}
      variants={reduced ? undefined : revealVariants}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

export default function Home({ onBook }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  const nextTestimonial = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const previousTestimonial = () => {
    setActive((prev) => (prev + testimonials.length - 1) % testimonials.length);
  };

  const displayedTestimonials = [0, 1, 2].map(
    (offset) => testimonials[(active + offset) % testimonials.length],
  );

  return (
    <main id="main" className="overflow-hidden bg-[#faf9f6] text-[#24231f]">
      {/* ================= HERO ================= */}
      <section className="relative min-h-[650px] overflow-hidden bg-[#f0ede6] lg:min-h-[760px]">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[550px] w-[550px] rounded-full border border-[#d9cbb3]/50" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full border border-[#d9cbb3]/40" />

        <div className="mx-auto grid min-h-[650px] max-w-[1440px] items-center gap-12 px-6 py-20 sm:px-10 lg:min-h-[760px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-20 xl:px-28">
          {/* Hero content */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease }}
            className="relative z-10 max-w-[680px]"
          >
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mb-7 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#98774c] sm:text-xs"
            >
              {/* <span className="h-px w-9 bg-[#98774c]" /> */}
              Your journey. Your next chapter.
            </motion.p>

            <h1 className="font-serif text-[clamp(2.8rem,5.4vw,5.5rem)] font-normal leading-[1.08] tracking-[-0.055em] text-[#29271f]">
              Build the Career,
              <br />
              Personal Brand &amp; Life
              <br />
              <em className="font-normal text-[#a17d4d]">You're Proud Of</em>
            </h1>

            <p className="mt-8 max-w-[490px] text-[14px] leading-[1.95] text-[#77736a] sm:text-base">
              Get expert coaching, practical strategies and personalised support
              to help you grow, stand out and achieve your goals in your career
              and beyond.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              {" "}
              <Link
                to="/booking"
                onClick={onBook}
                className="group inline-flex items-center gap-5 bg-[#a17d4d] px-7 py-[18px] text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-[#80613b] hover:shadow-xl hover:shadow-[#a17d4d]/20 active:scale-[0.98]"
              >
                Book A Discovery Call
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#8b867b]">
                Start your next chapter
              </span>
            </div>
          </motion.div>

          {/* Hero portrait */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.15, ease }}
            className="relative mx-auto w-full max-w-[490px] lg:ml-auto lg:max-w-[510px]"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#d8cbbb]">
              {/* Replace this visual placeholder with your coach portrait */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#b9a58b] via-[#d6c9b7] to-[#8e7963]" />

              <div className="absolute -right-10 top-16 h-64 w-64 rounded-full border border-white/30" />
              <div className="absolute -right-4 top-24 h-48 w-48 rounded-full border border-white/30" />

              <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-sm">
                  <Compass size={30} strokeWidth={1} className="text-white" />
                </div>

                <span className="font-serif text-3xl italic text-white sm:text-4xl">
                  Your next chapter
                </span>

                <span className="mt-3 text-[9px] uppercase tracking-[0.35em] text-white/80">
                  Begins with intention
                </span>
              </div>

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#30271d]/30 via-transparent to-transparent" />
            </div>

            {/* Floating accent */}
            <div className="absolute -bottom-5 -left-5 hidden h-28 w-28 items-center justify-center border border-[#a17d4d]/40 bg-[#faf9f6] sm:flex">
              <div className="text-center">
                <span className="block font-serif text-3xl text-[#a17d4d]">
                  01
                </span>
                <span className="mt-1 block text-[8px] uppercase tracking-[0.2em] text-[#77736a]">
                  Begin here
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section
        className="px-6 py-24 sm:px-10 sm:py-32 lg:px-20 xl:px-28"
        id="services"
      >
        <div className="mx-auto max-w-[1240px]">
          <Reveal
            reduced={reduced}
            className="mx-auto max-w-[720px] text-center"
          >
            <span className="mb-6 inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a17d4d]">
              WHAT WE DO
            </span>

            <h2 className="font-serif text-4xl font-normal leading-[1.2] tracking-[-0.04em] text-[#29271f] sm:text-5xl lg:text-[58px]">
              Support for where you are and
              <br className="hidden sm:block" />
              where you want to go
            </h2>

            <p className="mx-auto mt-7 max-w-[620px] text-sm leading-[2] text-[#77736a] sm:text-base">
              Whether you're early-career, pivoting careers, or a leader
              planning for your next chapter, these coaching and advisory
              services are designed to help you move forward with confidence.
            </p>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial={reduced ? false : "hidden"}
            whileInView={reduced ? undefined : "visible"}
            viewport={{ once: true, amount: 0.1 }}
            className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service, i) => {
              const Icon = service.icon;

              return (
                <motion.article
                  key={service.title}
                  variants={reduced ? undefined : revealVariants}
                  whileHover={reduced ? undefined : { y: -8 }}
                  className="group relative flex min-h-[330px] flex-col border border-[#e9e4da] bg-white p-8 transition-shadow duration-500 hover:border-[#c6ae8e] hover:shadow-[0_25px_60px_rgba(55,43,25,0.07)] sm:p-10"
                >
                  <div className="flex h-12 w-12 items-center justify-center bg-[#f3eee6] text-[#a17d4d] transition-all duration-300 group-hover:bg-[#a17d4d] group-hover:text-white">
                    <Icon size={19} strokeWidth={1.5} />
                  </div>

                  <span className="mt-9 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#b29a77]">
                    0{i + 1} / OUR SERVICES
                  </span>

                  <h3 className="mt-4 font-serif text-[26px] leading-[1.25] tracking-[-0.025em] text-[#302e28]">
                    {service.title}
                  </h3>

                  <p className="mt-5 text-[13px] leading-[1.9] text-[#817c72]">
                    {service.text}
                  </p>

                  <button
                    onClick={onBook}
                    aria-label={`Learn more about ${service.title}`}
                    className="mt-auto flex h-10 w-10 items-center justify-center self-end border border-[#e8e1d6] text-[#a17d4d] transition-all duration-300 hover:border-[#a17d4d] hover:bg-[#a17d4d] hover:text-white"
                  >
                    <ArrowUpRight size={17} />
                  </button>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ================= TRANSFORMATION ================= */}
      <section
        className="relative overflow-hidden bg-[#292820] px-6 py-24 text-white sm:px-10 sm:py-32 lg:px-20 xl:px-28"
        id="transformation"
      >
        <div className="pointer-events-none absolute -right-40 top-0 h-[550px] w-[550px] rounded-full border border-white/[0.06]" />
        <div className="pointer-events-none absolute -right-20 top-20 h-[400px] w-[400px] rounded-full border border-white/[0.06]" />

        <div className="relative z-10 mx-auto max-w-[1240px]">
          <Reveal reduced={reduced} className="max-w-[700px]">
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c6a77a]">
              THE TRANSFORMATION
            </p>

            <h2 className="font-serif text-4xl font-normal leading-[1.2] tracking-[-0.04em] sm:text-5xl lg:text-[62px]">
              From where you are to where
              <br className="hidden sm:block" />
              you want to be.
            </h2>

            <p className="mt-7 max-w-[590px] text-sm leading-[2] text-[#c2beb3] sm:text-base">
              Coaching helps you clarify direction, build confidence and take
              intentional steps toward meaningful progress in your career,
              personal brand and life.
            </p>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial={reduced ? false : "hidden"}
            whileInView={reduced ? undefined : "visible"}
            viewport={{ once: true, amount: 0.1 }}
            className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
          >
            {steps.map((step, i) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.title}
                  variants={reduced ? undefined : revealVariants}
                  className="relative border-t border-white/15 pt-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center border border-[#a17d4d]/60 text-[#c6a77a]">
                      <Icon size={19} strokeWidth={1.4} />
                    </span>

                    <span className="font-serif text-3xl text-white/20">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="mt-9 font-serif text-3xl font-normal">
                    {step.title}
                  </h3>

                  <p className="mt-4 max-w-[230px] text-[13px] leading-[1.9] text-[#bcb8ae]">
                    {step.text}
                  </p>

                  {i !== steps.length - 1 && (
                    <div className="absolute -right-5 top-10 hidden text-[#a17d4d] lg:block">
                      <ArrowUpRight size={18} strokeWidth={1} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section
        className="bg-[#f5f2ec] px-6 py-24 sm:px-10 sm:py-32 lg:px-20 xl:px-28"
        id="about"
      >
        <div className="mx-auto max-w-[1240px]">
          <Reveal reduced={reduced} className="mb-14 text-center">
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a17d4d]">
              // TESTIMONIALS
            </p>

            <h2 className="font-serif text-4xl font-normal leading-[1.2] tracking-[-0.04em] sm:text-5xl lg:text-[58px]">
              Trusted by many,
              <br />
              loved by more
            </h2>
          </Reveal>

          <div
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            aria-live="polite"
            aria-atomic="true"
          >
            <AnimatePresence mode="wait">
              {displayedTestimonials.map((item, offset) => (
                <motion.article
                  key={`${active}-${offset}`}
                  initial={reduced ? false : { opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.4,
                    delay: reduced ? 0 : offset * 0.08,
                    ease,
                  }}
                  className="flex min-h-[310px] flex-col border border-[#e7e0d5] bg-white p-8 sm:p-9"
                >
                  <span className="font-serif text-[65px] leading-[0.8] text-[#c1a47b]">
                    “
                  </span>

                  <p className="mt-7 flex-1 font-serif text-[20px] leading-[1.65] text-[#3d3931]">
                    {item.quote}
                  </p>

                  <div className="mt-8">
                    <div
                      className="mb-5 text-[12px] tracking-[0.25em] text-[#b28d58]"
                      aria-label="5 out of 5 stars"
                    >
                      ★★★★★
                    </div>

                    <div className="flex items-center gap-4 border-t border-[#eee9e0] pt-5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f2ede5] font-serif text-lg text-[#a17d4d]">
                        {item.name.charAt(0)}
                      </div>

                      <div>
                        <strong className="block text-[11px] font-semibold text-[#39362e]">
                          {item.name}
                        </strong>

                        <small className="mt-1 block text-[10px] tracking-wide text-[#969084]">
                          {item.role}
                        </small>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {/* Carousel controls */}
          <div className="mt-12 flex items-center justify-center gap-5">
            <button
              onClick={previousTestimonial}
              aria-label="Previous testimonials"
              className="flex h-11 w-11 items-center justify-center border border-[#dcd3c5] text-[#82735e] transition-all hover:border-[#a17d4d] hover:bg-[#a17d4d] hover:text-white"
            >
              <ChevronLeft size={17} />
            </button>

            <div className="flex items-center gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Show testimonial set ${i + 1}`}
                  aria-pressed={active === i}
                  className={`h-[6px] rounded-full transition-all duration-300 ${
                    active === i
                      ? "w-8 bg-[#a17d4d]"
                      : "w-[6px] bg-[#d3c8b8] hover:bg-[#a17d4d]"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              aria-label="Next testimonials"
              className="flex h-11 w-11 items-center justify-center border border-[#dcd3c5] text-[#82735e] transition-all hover:border-[#a17d4d] hover:bg-[#a17d4d] hover:text-white"
            >
              <ChevronRight size={17} />
            </button>
          </div>

          <p className="mt-8 text-center text-[10px] leading-relaxed text-[#969084]">
            Testimonials shown as layout placeholders — replace with approved
            client feedback before launch.
          </p>
        </div>
      </section>

      {/* ================= CLOSING CTA ================= */}
      <section className="bg-[#faf9f6] px-6 py-24 sm:px-10 sm:py-32 lg:px-20 xl:px-28">
        <Reveal reduced={reduced}>
          <div className="relative mx-auto max-w-[1240px] overflow-hidden bg-[#eae3d8] px-7 py-20 text-center sm:px-12 sm:py-28">
            <div className="pointer-events-none absolute -right-20 -top-40 h-96 w-96 rounded-full border border-[#bba78b]/40" />
            <div className="pointer-events-none absolute -right-10 -top-28 h-72 w-72 rounded-full border border-[#bba78b]/40" />

            <div className="relative z-10 mx-auto max-w-[760px]">
              <p className="mb-7 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a17d4d]">
                YOUR NEXT CHAPTER STARTS HERE
              </p>

              <h2 className="font-serif text-4xl font-normal leading-[1.2] tracking-[-0.04em] text-[#302e28] sm:text-5xl lg:text-[60px]">
                Ready to build a career and life you're
                <br className="hidden sm:block" /> proud of?
              </h2>

              <p className="mx-auto mt-7 max-w-[490px] text-sm leading-[1.9] text-[#77736a] sm:text-base">
                Let's talk about where you are today and where you'd like to go.
              </p>
              <Link
                to="/booking"
                onClick={onBook}
                className="group mt-10 inline-flex items-center gap-5 bg-[#a17d4d] px-8 py-[19px] text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#80613b] hover:shadow-xl hover:shadow-[#a17d4d]/20 active:scale-[0.98]"
              >
                Book A Discovery Call
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
