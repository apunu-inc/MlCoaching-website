import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Compass, Wallet, TrendingUp } from "lucide-react";

const services = [
  {
    title: "PURPOSEFUL ACTION PROGRAM",
    description:
      "Are you feeling stuck in any part of your life(Career, Personal, Financial)? If yes, the purposeful action program is for you. It is designed to help you self reflect on where you, define how you want to move forward, and immediately start taking action from session 1. This program is a 6 week coaching session where we delve into clarifying where you are, choosing empowering beliefs. becoming the you that you want, knowing where you are going, defining what matters to you most and moving from intention to Action.",
    href: "/booking",
    button: "Explore Coaching",
    Icon: Compass,
  },
  {
    title: "Mentoring & Advisory Session",
    description:
      "Do you need to talk through a situation or make a decision? I leverage my experience as a finance leader in FMCG and technology to give you perspective, practical guidance and lessons I have learned along the way. We will explore your situation together towards identifying a unique solution that works for you.",
    href: "/resources",
    button: "Explore Resources",
    Icon: Wallet,
  },
  {
    title: "Financial Freedom Coaching",
    description:
      "I support you to build a clearer relationship with your money and create a path toward financial independence. The goal is to build the mindset, habits and plan that move you toward financial independence.",
    href: "/booking",
    button: "Book a Discovery Call",
    Icon: TrendingUp,
  },
];

function GoldButton({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-flex min-h-[46px] items-center gap-3 rounded-[5px] bg-[#c69b55] px-5 py-3 text-[14px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ad8241] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c69b55] focus-visible:ring-offset-2"
    >
      {children}
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#bd914b]">
        <ArrowUpRight size={15} />
      </span>
    </Link>
  );
}

export default function WorkWithMe() {
  const shouldReduceMotion = useReducedMotion();

  const reveal = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <main className="overflow-hidden bg-[#f7f4ee]">
      {/* Page Introduction */}
      <section className="px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-28 lg:px-16 lg:pb-24 lg:pt-36">
        <div className="mx-auto max-w-7xl">
          <motion.div variants={reveal} initial="hidden" animate="visible">
            <p className="text-[13px] font-medium text-[#65715b]">Services</p>

            <h1 className="mt-5 max-w-3xl font-serif text-4xl font-medium leading-[1.12] tracking-[-0.04em] text-[#292923] sm:text-5xl lg:text-7xl">
              Clarity To Move Forward
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-[#77766e] sm:text-lg sm:leading-9">
              Get the clarity, guidance, and practical support you need to make
              better decisions and take meaningful actions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="px-5 pb-24 sm:px-8 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.Icon;

            return (
              <motion.article
                key={service.title}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  delay: shouldReduceMotion ? 0 : index * 0.12,
                }}
                className="flex h-full flex-col rounded-xl border border-[#e9e4da] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(41,41,35,0.07)] sm:p-9"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f4efe5] text-[#b58b4c]">
                  <Icon size={25} strokeWidth={1.5} />
                </div>

                <h2 className="mt-9 font-serif text-2xl font-medium leading-snug text-[#292923] sm:text-[27px]">
                  {service.title}
                </h2>

                <p className="mt-5 flex-1 text-[15px] leading-[1.95] text-[#77766e]">
                  {service.description}
                </p>

                <div className="mt-9 border-t border-[#eeeae2] pt-7">
                  <GoldButton to={service.href}>{service.button}</GoldButton>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-5 pb-24 sm:px-8 lg:px-16">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-xl bg-[#ece6da] px-7 py-12 sm:px-12 sm:py-16 lg:flex-row lg:items-center lg:px-16"
        >
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl font-medium leading-tight tracking-[-0.025em] text-[#292923] sm:text-4xl lg:text-5xl">
              Ready to Take the Next Step?
            </h2>

            <p className="mt-5 text-[15px] leading-8 text-[#77766e] sm:text-base">
              You don’t have to figure everything out alone. Let’s talk about
              where you are, what you need, and the right support to help you
              move forward.
            </p>
          </div>

          <div className="shrink-0">
            <GoldButton to="/booking">Book A Session</GoldButton>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
