import { Link } from "react-router-dom";
import { MessageCircle, ArrowUpRight } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";

import logo from "../assets/logo.svg";
import coaching from "../assets/coaching.svg";

const footerGroups = [
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Work with Me", to: "/what-we-do" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", to: "/terms" },
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Cookies", to: "/cookies" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Leave us a message", to: "/contact" },
      { label: "Frequently Asked Questions", to: "/faq" },
    ],
  },
];

const socialLinks = [
  {
    label: "WhatsApp",
    href: null,
    Icon: MessageCircle,
  },
  {
    label: "Instagram",
    href: null,
    Icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: null,
    Icon: FaFacebookF,
  },
  {
    label: "YouTube",
    href: null,
    Icon: FaYoutube,
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#292820] text-white">
      {/* TOP DECORATIVE LINE */}
      <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#a17d4d] to-transparent" />

      <div className="mx-auto max-w-[1440px] px-6 pb-6 pt-16 sm:px-10 sm:pt-20 lg:px-20 xl:px-28">
        {/* TOP SECTION */}
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          {/* BRAND */}
          <div className="max-w-[420px]">
            <Link
              to="/"
              aria-label="M Coaching home"
              className="inline-flex items-center transition-opacity hover:opacity-80"
            >
              <img
                src={logo}
                alt="M Coaching logo"
                className="h-[34px] w-[34px] object-contain"
              />

              <img
                src={coaching}
                alt="Coaching"
                className="ml-0.5 h-[20px] w-auto object-contain brightness-0 invert"
              />
            </Link>

            <p className="mt-7 max-w-[350px] text-[13px] leading-[2] text-[#c2beb3]">
              Get expert coaching, practical strategies and personalised support
              to help you grow, stand out and achieve your goals in your career
              and beyond.
            </p>

            <Link
              to="/booking"
              className="group mt-7 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.13em] text-[#c6a77a] transition-colors hover:text-white"
            >
              Start your journey
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>

          {/* FOOTER LINKS */}
          <div className="grid grid-cols-2 gap-x-7 gap-y-10 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                  {group.title}
                </h2>

                <ul className="mt-6 space-y-4">
                  {group.links.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="text-[12px] leading-6 text-[#bcb8ae] transition-colors duration-300 hover:text-[#c6a77a] focus-visible:outline-none focus-visible:underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="grid gap-10 py-10 sm:grid-cols-2 sm:items-center lg:grid-cols-3">
          {/* CONTACT */}
          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
              Contact Us
            </h2>

            <a
              href="mailto:REPLACE_WITH_CLIENT_EMAIL"
              className="group mt-4 inline-flex items-center gap-3 text-[12px] text-[#bcb8ae] transition-colors hover:text-[#c6a77a]"
            >
              <MessageCircle size={16} className="text-[#c6a77a]" />
              mubu@waiting.com
            </a>
          </div>

          {/* SOCIAL LINKS */}
          <div className="sm:text-right lg:text-center">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
              Connect With Us!
            </h2>

            <div className="mt-5 flex items-center gap-3 sm:justify-end lg:justify-center">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href || undefined}
                  aria-label={label}
                  title={label}
                  onClick={href ? undefined : (event) => event.preventDefault()}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[#c6a77a] transition-all duration-300 hover:-translate-y-1 hover:border-[#c6a77a] hover:bg-[#a17d4d] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6a77a]"
                >
                  <Icon size={16} />
                </a>
              ))}

              {/* X / TWITTER */}
              <a
                href={undefined}
                aria-label="X"
                title="X"
                onClick={(event) => event.preventDefault()}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[#c6a77a] transition-all duration-300 hover:-translate-y-1 hover:border-[#c6a77a] hover:bg-[#a17d4d] hover:text-white"
              >
                <span className="text-[19px] leading-none">𝕏</span>
              </a>
            </div>
          </div>

          {/* FOOTER TAGLINE */}
          <div className="hidden text-right lg:block">
            <p className="font-serif text-2xl italic text-[#c6a77a]">
              Your next chapter.
            </p>

            <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-[#888478]">
              Begins with intention
            </p>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-[11px] text-[#aaa69b]">
            © {new Date().getFullYear()} M Coaching. All Rights Reserved.
          </p>

          <Link
            to="/"
            className="text-[10px] uppercase tracking-[0.15em] text-[#c6a77a] transition-colors hover:text-white"
          >
            Back to home ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}
