import { useNavigate } from "react-router-dom";
import { ArrowRight, Tag } from "lucide-react";

const OfferBanner = () => {
  const navigate = useNavigate();

  return (
    <section
      className="
        w-full
        bg-white
        px-4
        py-10
        transition-colors
        duration-300

        dark:bg-[#06111f]

        sm:px-6
        lg:px-8
        lg:py-14
      "
    >
      <div className="mx-auto max-w-7xl">

        <div
          className="
            relative
            min-h-[250px]
            overflow-hidden
            rounded-2xl
            bg-[#9eb9d1]
            shadow-sm
            transition-colors
            duration-300

            dark:bg-[#172b44]

            sm:min-h-[270px]
            lg:min-h-[290px]
          "
        >

          {/* =================================================
              CAR IMAGE
          ================================================= */}

          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85"
            alt="Premium sports car"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              object-center
            "
          />

          {/* =================================================
              IMAGE OVERLAY
          ================================================= */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-[#7898b8]/95
              via-[#91adc7]/75
              to-transparent

              dark:from-[#081827]/95
              dark:via-[#102b43]/80
              dark:to-transparent
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/10
              via-transparent
              to-transparent

              dark:from-black/30
            "
          />

          {/* =================================================
              DECORATION
          ================================================= */}

          <div
            className="
              absolute
              -right-20
              -top-24
              h-64
              w-64
              rounded-full
              bg-white/10
              blur-3xl
            "
          />

          <div
            className="
              absolute
              -bottom-24
              left-[35%]
              h-64
              w-64
              rounded-full
              bg-blue-400/10
              blur-3xl

              dark:bg-blue-500/15
            "
          />

          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <div
            className="
              relative
              z-10
              flex
              min-h-[250px]
              items-center
              px-6
              py-8

              sm:min-h-[270px]
              sm:px-10

              lg:min-h-[290px]
              lg:px-12
            "
          >

            <div className="max-w-[400px]">

              {/* Small label */}

              <div
                className="
                  mb-3
                  flex
                  items-center
                  gap-2
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-white/90

                  sm:text-xs
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
                    bg-white/15
                    backdrop-blur-sm
                  "
                >
                  <Tag size={13} />
                </span>

                Limited Time Offer
              </div>

              {/* Heading */}

              <h2
                className="
                  text-3xl
                  font-extrabold
                  leading-[1.05]
                  tracking-tight
                  text-white

                  sm:text-4xl
                  lg:text-[46px]
                "
              >
                Special offers

                <span className="block">
                  up to{" "}
                  <span className="text-blue-100 dark:text-blue-200">
                    25% off
                  </span>
                </span>
              </h2>

              {/* Description */}

              <p
                className="
                  mt-4
                  max-w-[330px]
                  text-xs
                  leading-5
                  text-white/85

                  sm:text-sm
                "
              >
                Don't miss our latest car rental deals.
                Find your perfect vehicle and enjoy
                premium monthly rental prices.
              </p>

              {/* Button */}

              <button
                type="button"
                onClick={() => navigate("/cars")}
                className="
                  group
                  mt-5
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-blue-600
                  px-5
                  py-2.5
                  text-xs
                  font-bold
                  text-white
                  shadow-lg
                  shadow-blue-950/20
                  transition-all
                  duration-300
                  hover:bg-blue-700
                  hover:shadow-xl
                "
              >
                View all vehicles

                <ArrowRight
                  size={14}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </button>
            </div>
          </div>

          {/* =================================================
              RIGHT SIDE INFO
          ================================================= */}

          <div
            className="
              absolute
              bottom-7
              right-7
              z-10
              hidden
              w-[190px]

              lg:block
            "
          >
            <div
              className="
                rounded-2xl
                border
                border-white/20
                bg-white/10
                p-4
                backdrop-blur-md
                transition-all
                duration-300

                dark:border-white/10
                dark:bg-[#0b1a2b]/40
              "
            >

              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-wider
                  text-white/70
                "
              >
                Premium Rental
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  leading-5
                  text-white/90
                "
              >
                Discover premium vehicles with
                flexible monthly rental options.
              </p>

              <button
                type="button"
                onClick={() => navigate("/cars")}
                className="
                  mt-3
                  flex
                  items-center
                  gap-1.5
                  text-[10px]
                  font-bold
                  text-white
                  transition
                  hover:text-blue-100
                "
              >
                Explore cars
                <ArrowRight size={12} />
              </button>

            </div>
          </div>

          {/* =================================================
              MOBILE IMAGE GRADIENT
          ================================================= */}

          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              h-24
              bg-gradient-to-t
              from-black/20
              to-transparent

              dark:from-black/40

              sm:hidden
            "
          />

        </div>
      </div>
    </section>
  );
};

export default OfferBanner;