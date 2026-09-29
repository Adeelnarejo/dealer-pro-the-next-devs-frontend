import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CarFront,
  CheckCircle2,
  Sparkles,
  Zap,
} from "lucide-react";

const Banner = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    "Manage vehicle inventory",
    "Digital contracts & signing",
    "Customer management",
    "Sales & dealership tools",
  ];

  return (
    <section
      className={`
        w-full
        overflow-hidden
        bg-white
        px-4
        py-12
        font-plus-jakarta
        transition-colors
        duration-300
        dark:bg-[#06111f]
        sm:px-6
        sm:py-14
        lg:px-8
        lg:py-20
      `}
    >
      <div className="mx-auto max-w-7xl">
        {/* =====================================================
            MAIN BANNER
        ===================================================== */}

        <div
          className={`
            group/banner
            relative
            overflow-hidden
            rounded-[28px]
            border
            border-slate-200/80
            bg-[#f3f7fc]
            shadow-[0_25px_80px_rgba(15,23,42,0.08)]
            transition-all
            duration-700
            dark:border-white/[0.07]
            dark:bg-[#0a192b]
            dark:shadow-[0_25px_90px_rgba(0,0,0,0.28)]
            ${
              visible
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-8 scale-[0.985] opacity-0"
            }
          `}
        >
          {/* =====================================================
              BACKGROUND GLOW
          ===================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              -right-32
              -top-40
              h-[430px]
              w-[430px]
              rounded-full
              bg-blue-300/20
              blur-[90px]
              transition-all
              duration-1000
              group-hover/banner:scale-110
              dark:bg-blue-600/10
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-40
              left-[25%]
              h-[360px]
              w-[360px]
              rounded-full
              bg-sky-300/20
              blur-[90px]
              dark:bg-sky-600/10
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-0
              h-px
              w-[65%]
              -translate-x-1/2
              bg-gradient-to-r
              from-transparent
              via-blue-400/40
              to-transparent
              opacity-70
            "
          />

          {/* =====================================================
              DECORATIVE ORBS
          ===================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              right-[8%]
              top-[18%]
              h-2
              w-2
              rounded-full
              bg-blue-400
              shadow-[0_0_20px_rgba(59,130,246,0.9)]
              animate-[floatOrb_5s_ease-in-out_infinite]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              bottom-[18%]
              left-[48%]
              h-1.5
              w-1.5
              rounded-full
              bg-sky-400
              shadow-[0_0_15px_rgba(56,189,248,0.8)]
              animate-[floatOrb_6s_ease-in-out_infinite_reverse]
            "
          />

          {/* =====================================================
              CONTENT
          ===================================================== */}

          <div
            className="
              relative
              z-10
              flex
              flex-col
              gap-8
              p-5
              sm:p-7
              md:p-9
              lg:flex-row
              lg:items-center
              lg:gap-12
              lg:p-10
              xl:p-12
            "
          >
            {/* =================================================
                LEFT IMAGE
            ================================================= */}

            <div
              className={`
                relative
                w-full
                lg:w-[48%]
                ${
                  visible
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-8 opacity-0"
                }
                transition-all
                delay-150
                duration-700
              `}
            >
              {/* 3D shadow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-5
                  left-[10%]
                  right-[10%]
                  h-8
                  rounded-full
                  bg-blue-900/20
                  blur-2xl
                  transition-all
                  duration-700
                  group-hover/banner:scale-90
                  group-hover/banner:opacity-60
                  dark:bg-black/60
                "
              />

              <div
                className="
                  group/image
                  relative
                  overflow-hidden
                  rounded-[22px]
                  border
                  border-white/70
                  bg-slate-900
                  shadow-[0_25px_55px_rgba(15,23,42,0.16)]
                  transition-all
                  duration-700
                  hover:-translate-y-2
                  hover:rotate-[0.5deg]
                  hover:shadow-[0_35px_70px_rgba(15,23,42,0.22)]
                  dark:border-white/10
                  dark:shadow-[0_30px_65px_rgba(0,0,0,0.35)]
                "
              >
                {/* Image */}

                <img
                  src="/images (1).jfif"
                  alt="Car dealership"
                  className="
                    h-[220px]
                    w-full
                    object-cover
                    transition-transform
                    duration-[1200ms]
                    ease-out
                    group-hover/image:scale-110
                    sm:h-[270px]
                    md:h-[315px]
                    lg:h-[350px]
                  "
                />

                {/* Main overlay */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-slate-950/75
                    via-slate-950/10
                    to-transparent
                  "
                />

                {/* Blue cinematic glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-tr
                    from-blue-600/10
                    via-transparent
                    to-blue-400/10
                    opacity-70
                    transition-opacity
                    duration-500
                    group-hover/image:opacity-100
                  "
                />

                {/* =================================================
                    MOVING SHINE
                ================================================= */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -left-[70%]
                    top-0
                    h-full
                    w-[45%]
                    rotate-[18deg]
                    bg-gradient-to-r
                    from-transparent
                    via-white/25
                    to-transparent
                    blur-sm
                    transition-all
                    duration-[1100ms]
                    group-hover/image:left-[125%]
                  "
                />

                {/* =================================================
                    TOP BADGE
                ================================================= */}

                <div
                  className="
                    absolute
                    left-4
                    top-4
                    flex
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    border-white/15
                    bg-black/30
                    px-3
                    py-1.5
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-white
                    backdrop-blur-xl
                  "
                >
                  <Sparkles size={11} className="text-blue-300" />
                  Premium Platform
                </div>

                {/* =================================================
                    DEALER BADGE
                ================================================= */}

                <div
                  className="
                    absolute
                    bottom-4
                    left-4
                    right-4
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-white/15
                    bg-black/35
                    p-2.5
                    shadow-2xl
                    backdrop-blur-xl
                    transition-all
                    duration-500
                    group-hover/image:-translate-y-1
                  "
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-600
                        text-white
                        shadow-[0_8px_20px_rgba(37,99,235,0.35)]
                      "
                    >
                      <CarFront size={15} />
                    </span>

                    <div>
                      <p
                        className="
                          text-[7px]
                          font-bold
                          uppercase
                          tracking-[0.16em]
                          text-blue-300
                        "
                      >
                        DealerPro
                      </p>

                      <p className="mt-0.5 text-[9px] font-bold text-white sm:text-[10px]">
                        Professional Dealership
                      </p>
                    </div>
                  </div>

                  <div
                    className="
                      hidden
                      items-center
                      gap-1
                      rounded-full
                      bg-white/10
                      px-2.5
                      py-1.5
                      text-[7px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-white/80
                      sm:flex
                    "
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    Active
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                RIGHT CONTENT
            ================================================= */}

            <div
              className={`
                w-full
                lg:w-[52%]
                ${
                  visible
                    ? "translate-x-0 opacity-100"
                    : "translate-x-8 opacity-0"
                }
                transition-all
                delay-300
                duration-700
              `}
            >
              {/* =================================================
                  BADGE
              ================================================= */}

              <div
                className="
                  mb-4
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-blue-200/70
                  bg-blue-50
                  px-3
                  py-1.5
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-blue-600
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-md
                  dark:border-blue-400/10
                  dark:bg-blue-500/10
                  dark:text-blue-400
                "
              >
                <Zap size={11} />
                DealerPro for Dealers
              </div>

              {/* =================================================
                  HEADING
              ================================================= */}

              <h2
                className="
                  max-w-xl
                  text-3xl
                  font-bold
                  leading-[1.08]
                  tracking-[-0.04em]
                  text-slate-900
                  transition-colors
                  duration-300
                  dark:text-white
                  sm:text-4xl
                  lg:text-[42px]
                  xl:text-[46px]
                "
              >
                Grow your dealership

                <span
                  className="
                    mt-1
                    block
                    bg-gradient-to-r
                    from-blue-600
                    via-blue-500
                    to-sky-400
                    bg-clip-text
                    text-transparent
                    dark:from-blue-400
                    dark:via-blue-400
                    dark:to-sky-300
                  "
                >
                  with DealerPro
                </span>
              </h2>

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <p
                className="
                  mt-4
                  max-w-lg
                  text-xs
                  leading-5
                  text-slate-500
                  transition-colors
                  duration-300
                  dark:text-slate-400
                  sm:text-sm
                  sm:leading-6
                "
              >
                Manage your vehicles, customers, sales and dealership
                operations from one powerful platform. DealerPro gives car
                dealers everything they need to run their business more
                efficiently.
              </p>

              {/* =================================================
                  FEATURES
              ================================================= */}

              <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {features.map((feature, index) => (
                  <div
                    key={feature}
                    className="
                      group/feature
                      flex
                      items-center
                      gap-2.5
                      rounded-xl
                      border
                      border-transparent
                      px-2
                      py-1.5
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:border-blue-100
                      hover:bg-blue-50/70
                      dark:hover:border-blue-500/10
                      dark:hover:bg-blue-500/[0.05]
                    "
                    style={{
                      animation: visible
                        ? `featureReveal 0.6s ease-out ${
                            450 + index * 100
                          }ms both`
                        : "none",
                    }}
                  >
                    <span
                      className="
                        flex
                        h-6
                        w-6
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-blue-100
                        transition-all
                        duration-300
                        group-hover/feature:scale-110
                        group-hover/feature:rotate-3
                        dark:bg-blue-500/10
                      "
                    >
                      <CheckCircle2
                        size={14}
                        className="text-blue-600 dark:text-blue-400"
                      />
                    </span>

                    <span
                      className="
                        text-[10px]
                        font-semibold
                        text-slate-600
                        transition-colors
                        group-hover/feature:text-blue-600
                        dark:text-slate-300
                        dark:group-hover/feature:text-blue-400
                      "
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* =================================================
                  BUTTONS
              ================================================= */}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="
                    group
                    relative
                    flex
                    items-center
                    justify-center
                    gap-2
                    overflow-hidden
                    rounded-full
                    bg-blue-600
                    px-5
                    py-3
                    text-[10px]
                    font-bold
                    text-white
                    shadow-[0_10px_30px_rgba(37,99,235,0.22)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-blue-500
                    hover:shadow-[0_16px_35px_rgba(37,99,235,0.32)]
                    active:translate-y-0
                  "
                >
                  {/* Button shine */}

                  <span
                    className="
                      pointer-events-none
                      absolute
                      -left-12
                      top-0
                      h-full
                      w-8
                      rotate-12
                      bg-white/20
                      blur-sm
                      transition-all
                      duration-700
                      group-hover:left-[115%]
                    "
                  />

                  <span className="relative z-10">
                    Start with DealerPro
                  </span>

                  <span
                    className="
                      relative
                      z-10
                      flex
                      h-5
                      w-5
                      items-center
                      justify-center
                      rounded-full
                      bg-white/15
                    "
                  >
                    <ArrowRight
                      size={12}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-0.5
                      "
                    />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/inventory")}
                  className="
                    group
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    border
                    border-slate-200
                    bg-white/80
                    px-5
                    py-3
                    text-[10px]
                    font-bold
                    text-slate-700
                    shadow-sm
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-blue-200
                    hover:bg-blue-50
                    hover:text-blue-600
                    hover:shadow-md
                    active:translate-y-0
                    dark:border-slate-700
                    dark:bg-[#101f33]/80
                    dark:text-slate-200
                    dark:hover:border-blue-500/40
                    dark:hover:bg-blue-500/10
                    dark:hover:text-blue-400
                  "
                >
                  View inventory

                  <ArrowRight
                    size={12}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-0.5
                    "
                  />
                </button>
              </div>

              {/* =================================================
                  BOTTOM TRUST LINE
              ================================================= */}

              <div className="mt-5 flex items-center gap-2">
                <div className="flex -space-x-1">
                  <span className="h-5 w-5 rounded-full border-2 border-[#f3f7fc] bg-slate-400 dark:border-[#0a192b]" />
                  <span className="h-5 w-5 rounded-full border-2 border-[#f3f7fc] bg-blue-500 dark:border-[#0a192b]" />
                  <span className="h-5 w-5 rounded-full border-2 border-[#f3f7fc] bg-slate-700 dark:border-[#0a192b]" />
                </div>

                <p
                  className="
                    text-[8px]
                    font-medium
                    text-slate-400
                    transition-colors
                    dark:text-slate-500
                  "
                >
                  Built for modern car dealerships & automotive businesses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          ANIMATION STYLES
      ===================================================== */}

      <style>{`
        @keyframes featureReveal {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.96);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes floatOrb {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(0, -12px, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Banner;