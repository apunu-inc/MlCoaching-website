import { Link } from "react-router-dom";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useRef } from "react";

import aboutImg from "../assets/aboutImg.jpg";

// Reusable animation settings
const createReveal = (reduceMotion, delay = 0) => ({
  initial: {
    opacity: 0,
    y: reduceMotion ? 0 : 28,
  },
  whileInView: {
    opacity: 1,
    y: 0,
  },
  viewport: {
    once: true,
    amount: 0.2,
  },
  transition: {
    duration: reduceMotion ? 0 : 0.75,
    delay: reduceMotion ? 0 : delay,
    ease: [0.22, 1, 0.36, 1],
  },
});

function GoldButton({ href, children }) {
  return (
    <Link
      to={href}
      className="group inline-flex min-h-12 items-center gap-4 rounded-full bg-[#c69b55] pl-6 pr-2.5 text-sm font-medium text-white shadow-[0_8px_24px_rgba(198,155,85,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#ad8241] hover:shadow-[0_12px_30px_rgba(198,155,85,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c69b55] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f7f4ee]"
    >
      <span>{children}</span>

      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#bd914b] transition-transform duration-300 group-hover:rotate-45">
        <ArrowUpRight size={17} strokeWidth={2} />
      </span>
    </Link>
  );
}

function About() {
  const shouldReduceMotion = useReducedMotion();
  const imageRef = useRef(null);

  const imageInView = useInView(imageRef, {
    once: true,
    amount: 0.2,
  });

  return (
    <main className="overflow-hidden bg-[#f7f4ee] text-[#292923]">
      <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-12 sm:px-8 sm:pb-24 sm:pt-16 lg:px-14 lg:pb-32 lg:pt-20 xl:px-20">
        {/* Page introduction */}
        <motion.header
          {...createReveal(shouldReduceMotion)}
          className="max-w-2xl"
        >
          <div className="mb-5 flex items-center gap-3">
            {/* <span className="h-px w-8 bg-[#a17d4d]" /> */}

            {/* <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#65715b]">
              About
            </p> */}
          </div>

          <h1 className="max-w-2xl text-[clamp(2.3rem,5vw,4.4rem)] font-medium leading-[1.08] tracking-[-0.055em]">
            Meet the person behind the{" "}
            <span className="font-serif italic font-normal text-[#a17d4d]">
              Coaching
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-[1.85] text-[#737168] sm:text-lg">
            A little about who I am, what shaped my approach and why I'm
            passionate about helping people move forward with clarity and
            purpose.
          </p>
        </motion.header>

        {/* Coach profile */}
        <section
          aria-label="Meet your coach"
          className="mt-14 grid grid-cols-1 items-center gap-12 sm:mt-20 md:grid-cols-2 md:gap-12 lg:mt-24 lg:gap-20 xl:gap-28"
        >
          {/* Portrait */}
          <motion.div
            ref={imageRef}
            initial={{
              opacity: 0,
              x: shouldReduceMotion ? 0 : -35,
            }}
            animate={imageInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative mx-auto w-full max-w-[620px] md:mx-0"
          >
            {/* Decorative frame */}
            <div className="absolute -bottom-4 -right-4 h-full w-full rounded-[4px] border border-[#c69b55]/40 sm:-bottom-5 sm:-right-5" />

            {/* Image container */}
            <div className="group relative aspect-[0.92/1] overflow-hidden rounded-[4px] bg-[#e9e3d9]">
              <motion.img
                src={aboutImg}
                alt="Mubo Laschuetza, personal development and financial wellbeing coach"
                width="900"
                height="1000"
                loading="lazy"
                decoding="async"
                initial={{ scale: shouldReduceMotion ? 1 : 1.08 }}
                animate={imageInView ? { scale: 1 } : {}}
                transition={{
                  duration: shouldReduceMotion ? 0 : 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.025]"
              />

              {/* Soft image overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#292923]/15 via-transparent to-transparent" />
            </div>

            {/* Decorative caption */}
            <div className="absolute -bottom-9 left-0 flex items-center gap-2 text-xs tracking-wide text-[#737168] sm:-bottom-11">
              <Sparkles size={14} className="text-[#a17d4d]" />
              <span>Personal growth. Financial wellbeing. Purpose.</span>
            </div>
          </motion.div>

          {/* Biography */}
          <motion.div
            {...createReveal(shouldReduceMotion, 0.15)}
            className="pt-4 md:pt-0"
          >
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#a17d4d]">
              A little introduction
            </p>

            <h2 className="text-[clamp(2rem,3.5vw,3.4rem)] font-medium leading-[1.12] tracking-[-0.05em]">
              Hello, I'm
              <br />
              <span className="font-serif font-normal italic text-[#a17d4d]">
                Mubo Laschuetza
              </span>
            </h2>

            <div className="mt-8 space-y-6 text-[15px] leading-[1.95] text-[#74736c] sm:text-base">
              <p>
                I am passionate about personal development and how to leverage
                inner strength to achieve what is personally important. After
                many years of coaching and finding myself always falling into
                coaching mode, I decided to formally explore it as a career.
              </p>

              <p>
                With my senior finance leadership experience across FMCG and
                technology. I combine business and financial expertise with a
                coaching approach to help professionals make clearer decisions
                about their careers, money and lives. Be it you are currently
                feeling stuck or you just want to have a one off conversation to
                get you moving, I will provide the safe space you need.
              </p>

              <p>
                If you are not sure about which of my services to book, you can
                book a get to know me call via here.
              </p>
            </div>

            <div className="mt-9">
              <GoldButton href="/booking">Get to Know Me</GoldButton>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}

export default About;
