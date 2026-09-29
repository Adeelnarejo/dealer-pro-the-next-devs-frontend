import {
  ArrowUpRight,
  CarFront,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const goTo = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="
        group/footer
        relative
        overflow-hidden
        border-t
        border-slate-200/70
        bg-white
        font-plus-jakarta
        text-slate-900
        transition-colors
        duration-500

        dark:border-white/[0.06]
        dark:bg-[#020b16]
        dark:text-white
      "
    >
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          -top-40
          h-[420px]
          w-[420px]
          rounded-full
          bg-blue-500/10
          blur-[110px]
          transition-all
          duration-[1800ms]
          group-hover/footer:scale-125
          group-hover/footer:bg-blue-500/15
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-48
          left-[20%]
          h-[420px]
          w-[420px]
          rounded-full
          bg-cyan-400/5
          blur-[120px]
          animate-[footerGlow_9s_ease-in-out_infinite]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-[-120px]
          top-[35%]
          h-72
          w-72
          rounded-full
          bg-blue-600/5
          blur-[100px]
          animate-[footerGlowReverse_11s_ease-in-out_infinite]
        "
      />

      {/* =====================================================
          TOP CTA
      ===================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16">
        <div
          className="
            group/cta
            relative
            overflow-hidden
            rounded-[26px]
            border
            border-blue-200/70
            bg-gradient-to-br
            from-blue-600
            via-blue-600
            to-blue-700
            p-5
            shadow-[0_20px_60px_rgba(37,99,235,0.18)]
            transition-all
            duration-700
            hover:-translate-y-1
            hover:shadow-[0_30px_80px_rgba(37,99,235,0.28)]

            dark:border-blue-400/10
            dark:shadow-[0_25px_70px_rgba(0,0,0,0.35)]

            sm:p-7
            lg:p-8
          "
        >
          {/* Decorative circles */}

          <div
            className="
              pointer-events-none
              absolute
              -right-16
              -top-20
              h-48
              w-48
              rounded-full
              border
              border-white/10
              transition-all
              duration-[1400ms]
              group-hover/cta:scale-125
              group-hover/cta:rotate-12
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-28
              right-[25%]
              h-56
              w-56
              rounded-full
              border
              border-white/10
              transition-all
              duration-[1600ms]
              group-hover/cta:-translate-y-8
              group-hover/cta:scale-110
            "
          />

          {/* Shine */}

          <div
            className="
              pointer-events-none
              absolute
              -left-[30%]
              top-[-40%]
              h-[180%]
              w-[18%]
              rotate-[20deg]
              bg-white/10
              blur-xl
              transition-transform
              duration-[1800ms]
              group-hover/cta:translate-x-[800%]
            "
          />

          <div
            className="
              relative
              z-10
              flex
              flex-col
              gap-6

              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            <div
              className="
                flex
                items-start
                gap-4
                animate-[footerContentIn_700ms_cubic-bezier(0.22,1,0.36,1)]
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/10
                  text-white
                  shadow-lg
                  backdrop-blur-md
                  transition-all
                  duration-500
                  group-hover/cta:rotate-[-6deg]
                  group-hover/cta:scale-110
                  group-hover/cta:bg-white/15

                  sm:h-12
                  sm:w-12
                "
              >
                <CarFront
                  size={21}
                  className="
                    transition-transform
                    duration-500
                    group-hover/cta:scale-110
                  "
                />
              </div>

              <div>
                <span
                  className="
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-blue-100
                    sm:text-[9px]
                  "
                >
                  DealerPro Platform
                </span>

                <h2
                  className="
                    mt-1
                    text-base
                    font-bold
                    leading-tight
                    text-white
                    sm:text-lg
                    lg:text-xl
                  "
                >
                  Built for modern car dealerships
                </h2>

                <p
                  className="
                    mt-1.5
                    max-w-xl
                    text-[10px]
                    leading-5
                    text-blue-100
                    sm:text-xs
                    sm:leading-6
                  "
                >
                  Manage your inventory, customers, sales and dealership
                  operations from one powerful platform.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => goTo("/login")}
              className="
                group/button
                flex
                w-full
                shrink-0
                items-center
                justify-between
                rounded-full
                bg-white
                px-5
                py-3
                text-[10px]
                font-bold
                text-blue-600
                shadow-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:scale-[1.02]
                hover:bg-blue-50
                hover:shadow-2xl
                active:scale-95

                sm:w-fit
                sm:px-6
                sm:py-3.5
              "
            >
              <span>Get started</span>

              <span
                className="
                  ml-4
                  flex
                  h-6
                  w-6
                  items-center
                  justify-center
                  rounded-full
                  bg-blue-50
                  transition-all
                  duration-300
                  group-hover/button:bg-blue-100
                "
              >
                <ArrowUpRight
                  size={13}
                  className="
                    transition-transform
                    duration-300
                    group-hover/button:translate-x-0.5
                    group-hover/button:-translate-y-0.5
                  "
                />
              </span>
            </button>
          </div>
        </div>

        {/* =====================================================
            MAIN FOOTER GRID
        ===================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-10
            py-12

            sm:grid-cols-2
            sm:gap-9

            lg:grid-cols-5
            lg:gap-8
            lg:py-16
          "
        >
          {/* =================================================
              BRAND
          ================================================= */}

          <div
            className="
              sm:col-span-2
              lg:col-span-2
              animate-[footerColumnIn_800ms_cubic-bezier(0.22,1,0.36,1)]
            "
          >
            {/* Logo */}

            <button
              type="button"
              onClick={() => goTo("/")}
              className="
                group/logo
                flex
                items-center
                gap-2.5
                text-left
              "
            >
              <div
                className="
                  relative
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-2xl
                  bg-blue-600
                  text-white
                  shadow-lg
                  shadow-blue-600/20
                  transition-all
                  duration-500
                  group-hover/logo:-translate-y-1
                  group-hover/logo:rotate-[-5deg]
                  group-hover/logo:scale-105
                  group-hover/logo:shadow-blue-600/40
                "
              >
                <div
                  className="
                    absolute
                    -left-8
                    top-0
                    h-full
                    w-5
                    rotate-[25deg]
                    bg-white/20
                    blur-sm
                    transition-transform
                    duration-700
                    group-hover/logo:translate-x-20
                  "
                />

                <CarFront
                  size={21}
                  className="
                    relative
                    z-10
                    transition-transform
                    duration-500
                    group-hover/logo:scale-110
                  "
                />
              </div>

              <div>
                <h2
                  className="
                    text-xl
                    font-extrabold
                    tracking-[-0.04em]
                    text-slate-900
                    transition-colors
                    duration-300
                    dark:text-white
                  "
                >
                  Dealer
                  <span className="text-blue-500">Pro</span>
                </h2>

                <p
                  className="
                    text-[7px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-blue-500
                  "
                >
                  Dealership Platform
                </p>
              </div>
            </button>

            {/* Description */}

            <p
              className="
                mt-5
                max-w-sm
                text-[11px]
                leading-5
                text-slate-500
                transition-colors
                duration-300
                dark:text-slate-400

                sm:text-xs
                sm:leading-6
              "
            >
              Everything your dealership needs to manage vehicles,
              customers, sales and daily operations — all in one
              professional platform.
            </p>

            {/* Contact */}

            <div className="mt-6 space-y-3">
              <a
                href="mailto:hello@dealerpro.se"
                className="
                  group/contact
                  flex
                  w-fit
                  items-center
                  gap-2.5
                  text-[10px]
                  text-slate-500
                  transition-all
                  duration-300
                  hover:translate-x-1
                  hover:text-blue-500
                  dark:text-slate-400
                  dark:hover:text-white
                "
              >
                <span
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-lg
                    bg-blue-50
                    text-blue-500
                    transition-all
                    duration-300
                    group-hover/contact:scale-110
                    group-hover/contact:bg-blue-500
                    group-hover/contact:text-white

                    dark:bg-blue-500/10
                  "
                >
                  <Mail size={13} />
                </span>

                hello@dealerpro.se
              </a>

              <a
                href="tel:+46000000000"
                className="
                  group/contact
                  flex
                  w-fit
                  items-center
                  gap-2.5
                  text-[10px]
                  text-slate-500
                  transition-all
                  duration-300
                  hover:translate-x-1
                  hover:text-blue-500
                  dark:text-slate-400
                  dark:hover:text-white
                "
              >
                <span
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-lg
                    bg-blue-50
                    text-blue-500
                    transition-all
                    duration-300
                    group-hover/contact:scale-110
                    group-hover/contact:bg-blue-500
                    group-hover/contact:text-white

                    dark:bg-blue-500/10
                  "
                >
                  <Phone size={13} />
                </span>

                Contact DealerPro
              </a>

              <div
                className="
                  flex
                  items-center
                  gap-2.5
                  text-[10px]
                  text-slate-500
                  dark:text-slate-400
                "
              >
                <span
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-lg
                    bg-blue-50
                    text-blue-500

                    dark:bg-blue-500/10
                  "
                >
                  <MapPin size={13} />
                </span>

                Sweden
              </div>
            </div>
          </div>

          {/* =================================================
              PLATFORM
          ================================================= */}

          <FooterColumn
            title="Platform"
            delay="100ms"
            links={[
              {
                label: "About DealerPro",
                action: () => goTo("/"),
              },
              {
                label: "Features",
                action: () => goTo("/features"),
              },
              {
                label: "Vehicle Inventory",
                action: () => goTo("/inventory"),
              },
              {
                label: "Dealer Tools",
                action: () => goTo("/services"),
              },
              {
                label: "Pricing",
                action: () => goTo("/services"),
              },
            ]}
          />

          {/* =================================================
              DEALERS
          ================================================= */}

          <FooterColumn
            title="For Dealers"
            delay="180ms"
            links={[
              {
                label: "Manage Inventory",
                action: () => goTo("/inventory"),
              },
              {
                label: "Customer Management",
                action: () => goTo("/features"),
              },
              {
                label: "Digital Contracts",
                action: () => goTo("/features"),
              },
              {
                label: "Sales Management",
                action: () => goTo("/services"),
              },
              {
                label: "Dealer Support",
                action: () => goTo("/services"),
              },
            ]}
          />

          {/* =================================================
              COMPANY
          ================================================= */}

          <FooterColumn
            title="Company"
            delay="260ms"
            links={[
              {
                label: "Contact Us",
                action: () => goTo("/"),
              },
              {
                label: "FAQ",
                action: () => goTo("/services"),
              },
              {
                label: "Customer Reviews",
                action: () => goTo("/"),
              },
              {
                label: "Help Center",
                action: () => goTo("/services"),
              },
            ]}
          />
        </div>

        {/* =====================================================
            BOTTOM BAR
        ===================================================== */}

        <div
          className="
            relative
            border-t
            border-slate-200
            py-5
            transition-colors
            duration-500
            dark:border-white/[0.07]
          "
        >
          <div
            className="
              flex
              flex-col
              gap-5

              sm:flex-row
              sm:flex-wrap
              sm:items-center
              sm:justify-between
            "
          >
            {/* Copyright */}

            <p
              className="
                text-[9px]
                text-slate-400
                transition-colors
                duration-300
                dark:text-slate-500
                sm:text-[10px]
              "
            >
              © {currentYear} DealerPro. All rights reserved.
            </p>

            {/* Legal */}

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <LegalLink label="Terms of Service" />
              <LegalLink label="Privacy Policy" />
              <LegalLink label="Cookie Policy" />
            </div>

            {/* Security */}

            <div
              className="
                group/security
                flex
                items-center
                gap-1.5
                text-[9px]
                text-slate-400
                transition-colors
                duration-300
                dark:text-slate-500
              "
            >
              <span
                className="
                  flex
                  h-6
                  w-6
                  items-center
                  justify-center
                  rounded-full
                  bg-blue-50
                  transition-all
                  duration-300
                  group-hover/security:scale-110
                  group-hover/security:bg-blue-100

                  dark:bg-blue-500/10
                "
              >
                <ShieldCheck
                  size={12}
                  className="
                    text-blue-500
                    transition-transform
                    duration-500
                    group-hover/security:rotate-[-8deg]
                  "
                />
              </span>

              Secure dealership platform
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style>
        {`
          @keyframes footerGlow {
            0%,
            100% {
              transform: translate3d(0, 0, 0) scale(1);
            }

            50% {
              transform: translate3d(35px, -20px, 0) scale(1.08);
            }
          }

          @keyframes footerGlowReverse {
            0%,
            100% {
              transform: translate3d(0, 0, 0) scale(1);
            }

            50% {
              transform: translate3d(-30px, 20px, 0) scale(1.1);
            }
          }

          @keyframes footerContentIn {
            0% {
              opacity: 0;
              transform: translateX(-25px);
            }

            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes footerColumnIn {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }

            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            [class*="animate-"] {
              animation: none !important;
            }
          }
        `}
      </style>
    </footer>
  );
};

/* ===========================================================
   FOOTER COLUMN
=========================================================== */

type FooterColumnProps = {
  title: string;
  delay: string;
  links: {
    label: string;
    action: () => void;
  }[];
};

const FooterColumn = ({
  title,
  delay,
  links,
}: FooterColumnProps) => {
  return (
    <div
      className="
        animate-[footerColumnIn_800ms_cubic-bezier(0.22,1,0.36,1)]
      "
      style={{
        animationDelay: delay,
        animationFillMode: "both",
      }}
    >
      <h3
        className="
          mb-5
          text-[10px]
          font-bold
          uppercase
          tracking-[0.16em]
          text-slate-900
          dark:text-white
        "
      >
        {title}
      </h3>

      <nav className="space-y-3.5">
        {links.map((link) => (
          <button
            key={link.label}
            type="button"
            onClick={link.action}
            className="
              group/link
              flex
              w-fit
              items-center
              gap-1
              text-left
              text-[10px]
              text-slate-500
              transition-all
              duration-300
              hover:translate-x-1
              hover:text-blue-500

              dark:text-slate-400
              dark:hover:text-white
            "
          >
            <span>{link.label}</span>

            <ArrowUpRight
              size={10}
              className="
                translate-y-0.5
                opacity-0
                transition-all
                duration-300
                group-hover/link:translate-x-0.5
                group-hover/link:-translate-y-0.5
                group-hover/link:opacity-100
              "
            />
          </button>
        ))}
      </nav>
    </div>
  );
};

/* ===========================================================
   LEGAL LINK
=========================================================== */

const LegalLink = ({ label }: { label: string }) => {
  return (
    <button
      type="button"
      className="
        group/legal
        text-[9px]
        text-slate-400
        transition-all
        duration-300
        hover:text-blue-500

        dark:text-slate-500
        dark:hover:text-white
      "
    >
      <span>{label}</span>

      <span
        className="
          mt-0.5
          block
          h-px
          w-0
          bg-blue-500
          transition-all
          duration-300
          group-hover/legal:w-full
        "
      />
    </button>
  );
};

export default Footer;