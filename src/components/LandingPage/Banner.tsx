import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CarFront,
  CheckCircle2,
} from "lucide-react";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section
      className="
        w-full
        bg-white
        px-4
        py-12
        font-plus-jakarta
        transition-colors
        duration-300
        sm:px-6
        lg:px-8
        lg:py-16

        dark:bg-[#06111f]
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            MAIN BANNER
        ===================================================== */}

        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            bg-[#f3f7fc]
            transition-colors
            duration-300

            dark:bg-[#0c1b2e]
          "
        >

          {/* Decorative background */}

          <div
            className="
              pointer-events-none
              absolute
              -right-24
              -top-32
              h-80
              w-80
              rounded-full
              bg-blue-100/70
              blur-3xl

              dark:bg-blue-900/20
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-32
              left-1/3
              h-72
              w-72
              rounded-full
              bg-sky-100/60
              blur-3xl

              dark:bg-sky-900/15
            "
          />

          {/* =================================================
              CONTENT
          ================================================= */}

          <div
            className="
              relative
              z-10
              flex
              flex-col
              items-center
              gap-8
              p-5
              transition-colors
              duration-300

              sm:p-7
              md:p-9
              lg:flex-row
              lg:gap-12
              lg:p-10
              xl:p-12
            "
          >

            {/* =================================================
                LEFT IMAGE
            ================================================= */}

            <div className="relative w-full lg:w-[48%]">

              <div className="group relative overflow-hidden rounded-2xl">

                <img
                  src="images (1).jfif"
                  alt="Car dealership"
                  className="
                    h-[230px]
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105

                    sm:h-[280px]
                    md:h-[320px]
                    lg:h-[350px]
                  "
                />

                {/* Image overlay */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-slate-950/35
                    via-transparent
                    to-transparent
                  "
                />

                {/* Dealer badge */}

                <div
                  className="
                    absolute
                    bottom-4
                    left-4
                    flex
                    items-center
                    gap-2
                    rounded-full
                    bg-white/95
                    px-3
                    py-2
                    shadow-lg
                    backdrop-blur-md

                    dark:bg-[#0d1b2d]/95
                  "
                >

                  <span
                    className="
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-full
                      bg-blue-600
                      text-white
                    "
                  >
                    <CarFront size={14} />
                  </span>

                  <div>
                    <p
                      className="
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-wide
                        text-slate-400
                      "
                    >
                      DealerPro
                    </p>

                    <p
                      className="
                        text-[10px]
                        font-bold
                        text-slate-900

                        dark:text-white
                      "
                    >
                      Professional Dealership
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                RIGHT CONTENT
            ================================================= */}

            <div className="w-full lg:w-[52%]">

              {/* Badge */}

              <div
                className="
                  mb-4
                  inline-flex
                  items-center
                  rounded-full
                  bg-blue-50
                  px-3
                  py-1.5
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-blue-600

                  dark:bg-blue-500/10
                  dark:text-blue-400
                "
              >
                DealerPro for Dealers
              </div>

              {/* Heading */}

              <h2
                className="
                  max-w-xl
                  text-3xl
                  font-bold
                  leading-[1.1]
                  tracking-tight
                  text-slate-900
                  transition-colors
                  duration-300

                  dark:text-white

                  sm:text-4xl
                  lg:text-[42px]
                "
              >
                Grow your dealership

                <span className="block text-blue-600 dark:text-blue-400">
                  with DealerPro
                </span>
              </h2>

              {/* Description */}

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
                operations from one powerful platform. DealerPro gives
                car dealers everything they need to run their business
                more efficiently.
              </p>

              {/* =================================================
                  FEATURES
              ================================================= */}

              <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">

                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={15}
                    className="shrink-0 text-blue-600 dark:text-blue-400"
                  />

                  <span
                    className="
                      text-[10px]
                      font-medium
                      text-slate-600
                      transition-colors
                      dark:text-slate-300
                    "
                  >
                    Manage vehicle inventory
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={15}
                    className="shrink-0 text-blue-600 dark:text-blue-400"
                  />

                  <span
                    className="
                      text-[10px]
                      font-medium
                      text-slate-600
                      transition-colors
                      dark:text-slate-300
                    "
                  >
                    Digital contracts & signing
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={15}
                    className="shrink-0 text-blue-600 dark:text-blue-400"
                  />

                  <span
                    className="
                      text-[10px]
                      font-medium
                      text-slate-600
                      transition-colors
                      dark:text-slate-300
                    "
                  >
                    Customer management
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={15}
                    className="shrink-0 text-blue-600 dark:text-blue-400"
                  />

                  <span
                    className="
                      text-[10px]
                      font-medium
                      text-slate-600
                      transition-colors
                      dark:text-slate-300
                    "
                  >
                    Sales & dealership tools
                  </span>
                </div>

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
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    bg-blue-600
                    px-5
                    py-3
                    text-[10px]
                    font-bold
                    text-white
                    shadow-lg
                    shadow-blue-600/20
                    transition-all
                    duration-300
                    hover:bg-blue-700
                    hover:shadow-xl
                  "
                >
                  Start with DealerPro

                  <ArrowRight
                    size={13}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/cars")}
                  className="
                    rounded-full
                    border
                    border-slate-200
                    bg-white
                    px-5
                    py-3
                    text-[10px]
                    font-bold
                    text-slate-700
                    shadow-sm
                    transition-all
                    duration-300
                    hover:border-blue-200
                    hover:bg-blue-50
                    hover:text-blue-600

                    dark:border-slate-700
                    dark:bg-[#101f33]
                    dark:text-slate-200
                    dark:hover:border-blue-500/50
                    dark:hover:bg-blue-500/10
                    dark:hover:text-blue-400
                  "
                >
                  View inventory
                </button>

              </div>

              {/* Small bottom text */}

              <p
                className="
                  mt-4
                  text-[9px]
                  text-slate-400
                  transition-colors
                  dark:text-slate-500
                "
              >
                Built for modern car dealerships and automotive businesses.
              </p>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;