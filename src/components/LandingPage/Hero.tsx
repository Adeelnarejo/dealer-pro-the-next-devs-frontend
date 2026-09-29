import { useEffect, useState } from "react";
import {
  MapPin,
  CalendarDays,
  CarFront,
  Search,
  ChevronDown,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Header from "./Header";

const Hero = () => {
  const [location, setLocation] = useState("Dubai Silicon Oasis");
  const [vehicleType, setVehicleType] = useState("All vehicles");
  const [availability, setAvailability] = useState("Any date");
  const [loaded, setLoaded] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = () => {
    setSearching(true);

    console.log({
      location,
      vehicleType,
      availability,
    });

    setTimeout(() => {
      setSearching(false);
    }, 900);
  };

  return (
    <section
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-slate-950
        transition-colors
        duration-500
        dark:bg-[#020811]
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2400&q=90"
          alt="Premium sports car"
          className="
            h-full
            w-full
            object-cover
            object-center
            scale-[1.04]
            animate-hero-image
          "
        />

        {/* Main dark layer */}
        <div
          className="
            absolute
            inset-0
            bg-black/50
            dark:bg-black/65
          "
        />

        {/* Premium gradient */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-black/80
            via-black/25
            to-black/75
          "
        />

        {/* Blue cinematic glow */}
        <div
          className="
            absolute
            -left-24
            top-1/4
            h-72
            w-72
            rounded-full
            bg-blue-500/20
            blur-[120px]
            animate-glow
          "
        />

        <div
          className="
            absolute
            -right-24
            bottom-1/4
            h-80
            w-80
            rounded-full
            bg-cyan-400/10
            blur-[130px]
            animate-glow-reverse
          "
        />

        {/* Fine glass overlay */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)]
          "
        />
      </div>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <Header />

      {/* =====================================================
          HERO
      ===================================================== */}

      <div
        className="
          relative
          z-10
          flex
          min-h-screen
          flex-col
          px-4
          pb-5
          pt-28

          sm:px-6
          sm:pt-32

          md:pt-36

          lg:px-10
          lg:pt-40
        "
      >
        {/* =================================================
            HERO CONTENT
        ================================================= */}

        <div
          className={`
            mx-auto
            w-full
            max-w-5xl
            text-center
            transition-all
            duration-1000
            ${
              loaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }
          `}
        >
          {/* Premium badge */}

          <div
            className="
              group
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/20
              bg-white/[0.08]
              px-4
              py-2
              shadow-[0_8px_40px_rgba(0,0,0,0.25)]
              backdrop-blur-2xl
              transition-all
              duration-500
              hover:-translate-y-1
              hover:border-blue-300/30
              hover:bg-white/[0.12]
              sm:px-5
              sm:py-2.5
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
                bg-blue-500/15
                ring-1
                ring-blue-300/20
              "
            >
              <ShieldCheck
                size={14}
                className="text-blue-300"
              />
            </span>

            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-white/80
                sm:text-[10px]
              "
            >
              Smarter dealership management
            </span>

            <Sparkles
              size={13}
              className="
                text-blue-300
                transition-transform
                duration-500
                group-hover:rotate-180
              "
            />
          </div>

          {/* Heading */}

          <h1
            className="
              mx-auto
              max-w-5xl
              text-[40px]
              font-black
              leading-[0.98]
              tracking-[-0.055em]
              text-white
              drop-shadow-[0_12px_35px_rgba(0,0,0,0.45)]

              sm:text-5xl

              md:text-6xl

              lg:text-[78px]

              xl:text-[88px]
            "
          >
            Your dealership.

            <span
              className="
                mt-1
                block
                bg-gradient-to-r
                from-blue-200
                via-blue-400
                to-cyan-300
                bg-clip-text
                text-transparent
              "
            >
              Smarter. Simpler. Better.
            </span>
          </h1>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-sm
              font-medium
              leading-6
              text-white/70
              sm:mt-6
              sm:text-base
              sm:leading-7
              lg:text-lg
              lg:leading-8
            "
          >
            Manage vehicles, customers, sales and your entire
            dealership operation from one powerful platform built
            for modern automotive businesses.
          </p>

          {/* Small trust row */}

          <div
            className="
              mt-6
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-5
              gap-y-2
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.08em]
              text-white/55
              sm:text-[11px]
            "
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2
                size={13}
                className="text-blue-300"
              />
              Verified dealers
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />

            <span className="flex items-center gap-1.5">
              <CheckCircle2
                size={13}
                className="text-blue-300"
              />
              Live inventory
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />

            <span className="flex items-center gap-1.5">
              <CheckCircle2
                size={13}
                className="text-blue-300"
              />
              Secure platform
            </span>
          </div>
        </div>

        {/* =================================================
            FLOATING SEARCH AREA
        ================================================= */}

        <div
          className={`
            relative
            z-20
            mx-auto
            mt-auto
            w-full
            max-w-6xl
            pt-9

            sm:pt-12

            lg:pt-16

            transition-all
            duration-[1200ms]
            delay-200

            ${
              loaded
                ? "translate-y-0 opacity-100"
                : "translate-y-16 opacity-0"
            }
          `}
        >
          {/* Outer glow */}

          <div
            className="
              pointer-events-none
              absolute
              -inset-5
              rounded-[38px]
              bg-blue-500/10
              opacity-70
              blur-3xl
            "
          />

          {/* Search glass shell */}

          <div
            className="
              relative
              rounded-[26px]
              border
              border-white/20
              bg-white/[0.10]
              p-2
              shadow-[0_30px_100px_rgba(0,0,0,0.40)]
              backdrop-blur-3xl
              backdrop-saturate-150

              sm:rounded-[30px]
              sm:p-3
            "
          >
            {/* Inner shine */}

            <div
              className="
                pointer-events-none
                absolute
                inset-[1px]
                rounded-[25px]
                border
                border-white/[0.08]
                sm:rounded-[29px]
              "
            />

            <div
              className="
                relative
                grid
                gap-2

                lg:grid-cols-[1.35fr_1fr_1fr_auto]
              "
            >
              {/* =================================================
                  LOCATION
              ================================================= */}

              <SearchField
                icon={<MapPin size={18} />}
                label="Location"
              >
                <input
                  type="text"
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                  placeholder="Enter location"
                  className="
                    mt-1
                    w-full
                    bg-transparent
                    text-sm
                    font-bold
                    text-white
                    outline-none
                    placeholder:text-white/35
                  "
                />
              </SearchField>

              {/* =================================================
                  VEHICLE
              ================================================= */}

              <SearchField
                icon={<CarFront size={18} />}
                label="Vehicle Type"
              >
                <div className="relative mt-1">
                  <select
                    value={vehicleType}
                    onChange={(e) =>
                      setVehicleType(e.target.value)
                    }
                    className="
                      w-full
                      appearance-none
                      bg-transparent
                      pr-6
                      text-sm
                      font-bold
                      text-white
                      outline-none
                    "
                  >
                    <option
                      className="bg-slate-900"
                      value="All vehicles"
                    >
                      All vehicles
                    </option>

                    <option
                      className="bg-slate-900"
                      value="SUV"
                    >
                      SUV
                    </option>

                    <option
                      className="bg-slate-900"
                      value="Sedan"
                    >
                      Sedan
                    </option>

                    <option
                      className="bg-slate-900"
                      value="Luxury"
                    >
                      Luxury
                    </option>

                    <option
                      className="bg-slate-900"
                      value="Sports Car"
                    >
                      Sports Car
                    </option>

                    <option
                      className="bg-slate-900"
                      value="Electric"
                    >
                      Electric
                    </option>
                  </select>

                  <ChevronDown
                    size={14}
                    className="
                      pointer-events-none
                      absolute
                      right-0
                      top-1/2
                      -translate-y-1/2
                      text-white/45
                    "
                  />
                </div>
              </SearchField>

              {/* =================================================
                  AVAILABILITY
              ================================================= */}

              <SearchField
                icon={<CalendarDays size={18} />}
                label="Availability"
              >
                <div className="relative mt-1">
                  <select
                    value={availability}
                    onChange={(e) =>
                      setAvailability(e.target.value)
                    }
                    className="
                      w-full
                      appearance-none
                      bg-transparent
                      pr-6
                      text-sm
                      font-bold
                      text-white
                      outline-none
                    "
                  >
                    <option
                      className="bg-slate-900"
                      value="Any date"
                    >
                      Any date
                    </option>

                    <option
                      className="bg-slate-900"
                      value="Available today"
                    >
                      Available today
                    </option>

                    <option
                      className="bg-slate-900"
                      value="This week"
                    >
                      This week
                    </option>

                    <option
                      className="bg-slate-900"
                      value="This month"
                    >
                      This month
                    </option>
                  </select>

                  <ChevronDown
                    size={14}
                    className="
                      pointer-events-none
                      absolute
                      right-0
                      top-1/2
                      -translate-y-1/2
                      text-white/45
                    "
                  />
                </div>
              </SearchField>

              {/* =================================================
                  SEARCH BUTTON
              ================================================= */}

              <button
                type="button"
                onClick={handleSearch}
                disabled={searching}
                className="
                  group
                  relative
                  flex
                  min-h-[64px]
                  items-center
                  justify-center
                  gap-2
                  overflow-hidden
                  rounded-2xl
                  bg-blue-600
                  px-7
                  text-sm
                  font-bold
                  text-white
                  shadow-[0_12px_35px_rgba(37,99,235,0.35)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-blue-500
                  hover:shadow-[0_18px_45px_rgba(37,99,235,0.45)]
                  active:translate-y-0
                  disabled:cursor-wait
                  disabled:opacity-80
                "
              >
                {/* Shine animation */}

                <span
                  className="
                    absolute
                    -left-20
                    top-0
                    h-full
                    w-16
                    rotate-[20deg]
                    bg-white/20
                    blur-md
                    transition-all
                    duration-700
                    group-hover:left-[120%]
                  "
                />

                {searching ? (
                  <>
                    <span
                      className="
                        h-4
                        w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-white/30
                        border-t-white
                      "
                    />

                    Searching...
                  </>
                ) : (
                  <>
                    <Search size={18} />

                    Search

                    <ArrowRight
                      size={15}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    />
                  </>
                )}
              </button>
            </div>

            {/* =================================================
                BOTTOM TRUST BAR
            ================================================= */}

            <div
              className="
                relative
                mt-2
                flex
                flex-col
                gap-2
                border-t
                border-white/10
                px-2
                pt-3
                text-[10px]
                font-medium
                text-white/45

                sm:flex-row
                sm:items-center
                sm:justify-between
                sm:px-3
              "
            >
              <div className="flex items-center gap-2">
                <span
                  className="
                    flex
                    h-5
                    w-5
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-500/15
                    text-blue-300
                  "
                >
                  ✓
                </span>

                Verified dealership inventory
              </div>

              <div
                className="
                  flex
                  flex-wrap
                  gap-x-4
                  gap-y-1
                  uppercase
                  tracking-wide
                "
              >
                <span>✓ Updated inventory</span>
                <span>✓ Trusted dealers</span>
                <span>✓ Easy management</span>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            BOTTOM SCROLL INDICATOR
        ================================================= */}

        <div
          className="
            mx-auto
            hidden
            items-center
            gap-3
            pt-7
            text-[9px]
            font-bold
            uppercase
            tracking-[0.25em]
            text-white/35
            lg:flex
          "
        >
          <span className="h-px w-8 bg-white/20" />
          Explore DealerPro
          <span className="h-px w-8 bg-white/20" />
        </div>
      </div>

      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style>{`
        @keyframes heroImage {
          0% {
            transform: scale(1.04);
          }

          50% {
            transform: scale(1.075);
          }

          100% {
            transform: scale(1.04);
          }
        }

        @keyframes glow {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.45;
          }

          50% {
            transform: translate3d(35px, -20px, 0) scale(1.12);
            opacity: 0.7;
          }

          100% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.45;
          }
        }

        @keyframes glowReverse {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.35;
          }

          50% {
            transform: translate3d(-30px, 25px, 0) scale(1.1);
            opacity: 0.65;
          }

          100% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.35;
          }
        }

        .animate-hero-image {
          animation: heroImage 14s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 8s ease-in-out infinite;
        }

        .animate-glow-reverse {
          animation: glowReverse 10s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-hero-image,
          .animate-glow,
          .animate-glow-reverse {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

/* ============================================================
   SEARCH FIELD
============================================================ */

type SearchFieldProps = {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
};

const SearchField = ({
  icon,
  label,
  children,
}: SearchFieldProps) => {
  return (
    <div
      className="
        group
        flex
        min-h-[64px]
        items-center
        gap-3
        rounded-2xl
        border
        border-white/10
        bg-black/20
        px-4
        shadow-inner
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-white/20
        hover:bg-white/[0.08]
      "
    >
      {/* Icon */}

      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          border
          border-blue-300/10
          bg-blue-500/10
          text-blue-300
          shadow-[0_5px_20px_rgba(37,99,235,0.12)]
          transition-all
          duration-300
          group-hover:scale-105
          group-hover:bg-blue-500/15
        "
      >
        {icon}
      </div>

      {/* Content */}

      <div className="min-w-0 flex-1">
        <label
          className="
            block
            text-[9px]
            font-bold
            uppercase
            tracking-[0.16em]
            text-white/40
          "
        >
          {label}
        </label>

        {children}
      </div>
    </div>
  );
};

export default Hero;