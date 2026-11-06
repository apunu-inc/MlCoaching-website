import { memo } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react"; //CircleArrowRight
import { SquareCheck } from "lucide-react";

import resourcesImg from ".././assets/resourcesImg.jpg";

const resources = [
  {
    type: "WORKBOOK",
    title: "Purposeful Action Workbook",
    description:
      "This if for you if you are able to stay consistent on your own and want to do the purposeful action program by yourself. The workbook is instant download after payment.",
    button: "Buy Now",
    href: "/checkout/purposeful-action-workbook",
  },
  {
    type: "WORKBOOK",
    title: "Financial Step Change Workbook",
    description:
      "Are you ready to turn around your relationship around money and get onto the path towards financial independence. This workbook will take you through the step by step questions to ask yourself and the actions you need to do on a daily, monthly basis towards your money goals. The workbook is instant download after payment.",
    button: "Buy Now",
    href: "/checkout/financial-step-change-workbook",
  },
];

function GoldButton({ href, children, className = "" }) {
  return (
    <Link
      to={href}
      className={`inline-flex min-h-9 items-center justify-center gap-2
        rounded-full bg-[#c69b55] px-3.5 py-2 text-[11px] font-medium
        text-white shadow-sm transition duration-200
        hover:bg-[#ad8241] hover:shadow-md
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-[#c69b55] focus-visible:ring-offset-2
        ${className}`}
    >
      <span>{children}</span>
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/95 text-[#bd914b]">
        <ArrowUpRight size={13} strokeWidth={2.2} />
      </span>
    </Link>
  );
}

const ResourceCard = memo(function ResourceCard({
  type,
  title,
  description,
  button,
  href,
}) {
  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex h-full flex-col items-start rounded-[20px] bg-white p-5
        shadow-[0_2px_5px_rgba(35,30,20,0.04)]
        sm:p-6 lg:p-7"
    >
      <p className="mb-5 flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.09em] text-[#78816d]">
        <SquareCheck size={13} strokeWidth={1.8} />
        {type}
      </p>

      <h2 className="mb-3 text-[19px] font-medium leading-snug tracking-[-0.035em] text-[#242421] sm:text-[21px]">
        {title}
      </h2>

      <p className="mb-6 text-[11px] leading-[1.85] text-[#74736c] sm:text-xs">
        {description}
      </p>

      <div className="mt-auto">
        <GoldButton href={href}>{button}</GoldButton>
      </div>
    </motion.article>
  );
});

export default function Resources() {
  const shouldReduceMotion = useReducedMotion();

  const reveal = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.45 },
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
          className="max-w-xl"
        >
          <p className="mb-3 text-[11px] font-medium text-[#65715b]">
            <span className="mr-1 text-[#8c9b7c]">//</span>
            Resources
          </p>

          <h1 className="max-w-lg text-[27px] font-semibold leading-[1.2] tracking-[-0.045em] sm:text-[32px]">
            Tools to Help You Move Forward
          </h1>

          <p className="mt-3 max-w-md text-[12px] leading-[1.8] text-[#737168] sm:text-[13px]">
            Practical resources to help you gain clarity, take purposeful
            action, and build a healthier relationship with money.
          </p>
        </motion.header>
        {/* Featured survey */}
        <motion.section
          variants={reveal}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.12 }}
          aria-labelledby="survey-title"
          className="mt-10 sm:mt-12 lg:mt-14"
        >
          <article className="relative flex min-h-[205px] overflow-hidden rounded-[20px] bg-white p-5 shadow-[0_2px_5px_rgba(35,30,20,0.04)] sm:min-h-[225px] sm:p-7 lg:min-h-[235px] lg:items-center lg:justify-between lg:gap-8 lg:px-8">
            <div className="relative z-10 flex w-full flex-col items-start lg:w-[76%]">
              <p className="mb-5 flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.09em] text-[#78816d]">
                <SquareCheck size={13} strokeWidth={1.8} />
                SURVEY
              </p>

              <h2
                id="survey-title"
                className="text-[20px] font-medium leading-snug tracking-[-0.035em] sm:text-[23px]"
              >
                Purposeful Action Survey
              </h2>

              <p className="mt-3 max-w-[590px] text-[11px] leading-[1.85] text-[#74736c] sm:text-xs">
                Ever wondered if you have it together or if something needs to
                change? Take this free survey to understand where you are and
                discover practical actions you can start taking now.
              </p>

              <p className="mt-3 text-[10px] font-medium text-[#80a96c]">
                Free
              </p>

              <GoldButton href="/survey" className="mt-3">
                Take the Survey
              </GoldButton>
            </div>

            {/* Decorative artwork. Replace with the supplied Figma asset. */}
            <div
              aria-hidden="true"
              className="pointer-events-none relative ml-auto hidden h-[190px] w-[145px] shrink-0 items-end justify-center lg:flex"
            >
              <img
                src={resourcesImg}
                alt=""
                width="290"
                height="380"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain object-bottom"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            </div>
          </article>
        </motion.section>
        {/* Workbook cards */}
        <motion.section
          variants={reveal}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          aria-label="Available workbooks"
          className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          {resources.map((resource) => (
            <ResourceCard key={resource.title} {...resource} />
          ))}
        </motion.section>
      </div>
    </main>
  );
}
