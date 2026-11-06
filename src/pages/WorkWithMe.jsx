import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    number: "01",
    label: "PERSONAL DEVELOPMENT",
    title: "PURPOSEFUL ACTION PROGRAM",
    description:
      "Are you feeling stuck in any part of your life(Career, Personal, Financial)? If yes, the purposeful action program is for you. It is designed to help you self reflect on where you, define how you want to move forward, and immediately start taking action from session 1. This program is a 6 week coaching session where we delve into clarifying where you are, choosing empowering beliefs. becoming the you that you want, knowing where you are going, defining what matters to you most and moving from intention to Action.",
    href: "/booking",
    button: "Explore Coaching",
  },
  {
    number: "02",
    label: "FINANCIAL WELLBEING",
    title: "Mentoring & Advisory Session",
    description:
      "Do you need to talk through a situation or make a decision? | leverage my experience as a finance leader in FMCG and technology to give you perspective, practical guidance and lessons | have learned along the way. We will explore your situation together towards identifying a unique solution that works for you.",
    href: "/resources",
    button: "Explore Resources",
  },
  {
    number: "03",
    label: "CAREER AND LIFE",
    title: "Financial Freedom Coaching",
    description:
      "I support you to build a clearer relationship with your money and create a path toward nancial independence. The goal is to build the mindset habits and plan that move you toward financial independence.",
    href: "/booking",
    button: "Book a Discovery Call",
  },
];

function GoldButton({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-flex min-h-[42px] items-center gap-2 rounded-[5px] bg-[#c69b55] px-4 py-2.5 text-[13px] font-medium text-white transition duration-200 hover:bg-[#ad8241] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c69b55] focus-visible:ring-offset-2"
    >
      {children}
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#bd914b]">
        <ArrowUpRight size={14} />
      </span>
    </Link>
  );
}

export default function WorkWithMe() {
  const reduceMotion = useReducedMotion();

  const reveal = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.45,
        ease: "easeOut",
      },
    },
  };

  return (
    <main className="bg-[#f7f4ee] text-[#292923]">
      <div className="mx-auto min-h-[480px] max-w-[1440px] px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-12 lg:px-12 lg:pb-20 lg:pt-14">
        {/* Page introduction */}
        <motion.header
          variants={reveal}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <p className="mb-3 text-[13px] font-medium text-[#65715b]">
            <span className="mr-1 text-[#8c9b7c]">//</span>
            Services
          </p>

          <h1 className="max-w-xl text-[30px] font-semibold leading-[1.2] tracking-[-0.04em] sm:text-[38px]">
            Clarity To Move Forward
          </h1>

          <p className="mt-4 max-w-xl text-[14px] leading-[1.9] text-[#737168] sm:text-[15px]">
            Get the clarity, guidance, and practical support you need to make
            better decisions and take meaningful actions
          </p>
        </motion.header>

        {/* Services */}
        <section
          aria-label="Coaching services"
          className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, index) => (
            <motion.article
              key={service.number}
              variants={reveal}
              initial="hidden"
              animate="visible"
              transition={{
                delay: reduceMotion ? 0 : 0.08 * (index + 1),
              }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              className="flex h-full flex-col rounded-[18px] bg-white p-6 shadow-[0_2px_5px_rgba(35,30,20,0.04)] transition-shadow duration-200 hover:shadow-[0_8px_24px_rgba(35,30,20,0.06)] sm:p-7 lg:p-8"
            >
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-medium tracking-[0.09em] text-[#78816d]">
                  {service.label}
                </p>

                <span className="text-[13px] tabular-nums text-[#c69b55]">
                  {service.number}
                </span>
              </div>

              <h2 className="mt-7 text-[22px] font-medium leading-[1.35] tracking-[-0.025em] sm:text-[24px]">
                {service.title}
              </h2>

              <p className="mt-4 flex-1 text-[14px] leading-[1.9] text-[#74736c]">
                {service.description}
              </p>

              <div className="mt-7">
                <GoldButton to={service.href}>{service.button}</GoldButton>
              </div>
            </motion.article>
          ))}
        </section>

        {/* Closing call to action */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-7 rounded-[18px] bg-[#ece6da] px-6 py-8 sm:px-9 sm:py-10 lg:flex lg:items-center lg:justify-between lg:gap-8"
        >
          <div className="max-w-xl">
            <p className="text-[12px] font-medium text-[#65715b]">
              {/* YOUR NEXT STEP */}
            </p>

            <h2 className="mt-3 text-[24px] font-semibold leading-tight tracking-[-0.03em] sm:text-[28px]">
              Ready to Take the Next Step?{" "}
            </h2>

            <p className="mt-3 text-[14px] leading-[1.8] text-[#737168]">
              You don’t have to figure everything out alone. Let’s talk about
              where you are, what you need, and the right support to help you
              move forward.
            </p>
          </div>

          <div className="mt-6 lg:mt-0 lg:shrink-0">
            <GoldButton to="/booking">Book A Session</GoldButton>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
