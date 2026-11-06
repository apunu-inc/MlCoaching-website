import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import logo from "../assets/logo.svg";
import coaching from "../assets/coaching.svg";

const navigation = [
  { label: "Home", to: "/" },
  { label: "Work with Me", to: "/what-we-do" },
  { label: "Resources", to: "/resources" },
  { label: "About", to: "/about" },
];

const ease = [0.22, 1, 0.36, 1];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();

  const closeMenu = () => setMenuOpen(false);

  const linkClass = ({ isActive }) =>
    `relative py-2 text-[13px] transition-colors duration-300 ${
      isActive
        ? "font-semibold text-[#292820]"
        : "text-[#77736a] hover:text-[#a17d4d]"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[#e9e4da] bg-[#faf9f6]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:h-[84px] lg:px-20 xl:px-28">
        {/* BRAND */}
        <Link
          to="/"
          aria-label="M Coaching home"
          onClick={closeMenu}
          className="group flex shrink-0 items-center"
        >
          <img
            src={logo}
            alt="M Coaching logo"
            className="h-[32px] w-[32px] object-contain transition-transform duration-300 group-hover:scale-105"
          />

          <img
            src={coaching}
            alt="Coaching"
            className="ml-0.5 h-[19px] w-auto object-contain"
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 md:flex lg:gap-11"
        >
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={linkClass}
            >
              {({ isActive }) => (
                <>
                  {item.label}

                  <span
                    className={`absolute -bottom-[2px] left-0 h-[1px] bg-[#a17d4d] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* DESKTOP CTA */}
        <Link
          to="/booking"
          className="group hidden min-h-[43px] items-center gap-3 bg-[#a17d4d] px-5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#80613b] hover:shadow-lg hover:shadow-[#a17d4d]/20 md:inline-flex"
        >
          Book A Discovery Call
          <ArrowUpRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </Link>

        {/* MOBILE TOGGLE */}
        <button
          type="button"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center border border-[#e9e4da] text-[#292820] transition-colors hover:bg-[#f0ede6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a17d4d] md:hidden"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {/* MOBILE NAVIGATION */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={reduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduced ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease }}
            className="absolute left-0 right-0 top-full overflow-hidden border-b border-[#e9e4da] bg-[#faf9f6] shadow-xl shadow-black/[0.04] md:hidden"
          >
            <div className="mx-auto flex max-w-[1440px] flex-col px-6 pb-7 pt-4 sm:px-10">
              <div className="flex flex-col">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.to}
                    initial={reduced ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: reduced ? 0 : index * 0.05,
                    }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `flex items-center justify-between border-b border-[#e9e4da] py-4 text-[15px] transition-colors ${
                          isActive
                            ? "font-semibold text-[#a17d4d]"
                            : "text-[#555249] hover:text-[#a17d4d]"
                        }`
                      }
                    >
                      {item.label}

                      <ArrowUpRight size={16} className="opacity-50" />
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              <Link
                to="/booking"
                onClick={closeMenu}
                className="group mt-6 flex min-h-[50px] items-center justify-center gap-3 bg-[#a17d4d] px-5 text-[12px] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#80613b]"
              >
                Book A Discovery Call
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>

              <p className="mt-6 text-center text-[9px] uppercase tracking-[0.25em] text-[#aaa397]">
                Your journey. Your next chapter.
              </p>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
