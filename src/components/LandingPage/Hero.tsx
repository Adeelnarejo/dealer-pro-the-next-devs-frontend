import { useState } from "react";
import {
  MapPin,
  CalendarDays,
  CarFront,
  Search,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";
import Header from "./Header";

const Hero = () => {
  const [location, setLocation] = useState("Dubai Silicon Oasis");
  const [vehicleType, setVehicleType] = useState("All vehicles");
  const [availability, setAvailability] = useState("Any date");

  const handleSearch = () => {
    console.log({
      location,
      vehicleType,
      availability,
    });
  };

  return (
    <section
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-slate-900
        transition-colors
        duration-300

        dark:bg-[#020b16]
      "
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}

      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2400&q=90"
          alt="Premium car"
          className="
            h-full
            w-full
            object-cover
            object-center
          "
        />

        {/* Dark overlay */}

        <div
          className="
            absolute
            inset-0
            bg-black/35
            transition-opacity
            duration-300

            dark:bg-black/50
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-black/55
            via-black/10
            to-black/45

            dark:from-black/65
            dark:via-black/25
            dark:to-black/65
          "
        />
      </div>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <Header />

      {/* =====================================================
          HERO CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          flex
          min-h-screen
          flex-col
          px-4
          pb-8
          pt-32

          sm:px-6
          sm:pb-10
          sm:pt-36

          lg:px-10
          lg:pt-40
        "
      >
        {/* =================================================
            HEADING
        ================================================= */}

        <div className="mx-auto w-full max-w-4xl text-center">

          {/* Badge */}

          <div
            className="
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/30
              bg-white/10
              px-4
              py-2
              text-xs
              font-semibold
              text-white
              backdrop-blur-md
              transition-all
              duration-300

              dark:border-white/20
              dark:bg-black/20
            "
          >
            <ShieldCheck
              size={15}
              className="text-blue-300"
            />

            The smarter way to manage your dealership
          </div>

          {/* Heading */}

          <h1
            className="
              mx-auto
              max-w-4xl
              text-4xl
              font-bold
              leading-tight
              tracking-tight
              text-white
              drop-shadow-2xl

              sm:text-5xl
              md:text-6xl
              lg:text-7xl
            "
          >
            Your dealership.

            <span className="block text-blue-300">
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
              text-white
              drop-shadow-lg

              sm:text-base
              lg:text-lg
            "
          >
            Manage your vehicles, customers, sales and dealership
            operations from one powerful platform built for modern
            dealerships.
          </p>
        </div>

        {/* =================================================
            SEARCH BOX
        ================================================= */}

        <div
          className="
            relative
            z-20
            mx-auto
            mt-auto
            w-full
            max-w-6xl
            pt-10

            sm:pt-16
            lg:pt-24
          "
        >
          <div
            className="
              rounded-[24px]
              bg-white
              p-3
              shadow-2xl
              transition-colors
              duration-300

              dark:border
              dark:border-slate-700/60
              dark:bg-[#0b1a2b]
              dark:shadow-black/50

              sm:rounded-[28px]
              sm:p-4
            "
          >
            <div
              className="
                grid
                gap-2

                lg:grid-cols-[1.3fr_1fr_1fr_auto]
              "
            >
              {/* =================================================
                  LOCATION
              ================================================= */}

              <div
                className="
                  flex
                  min-h-[64px]
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-slate-100
                  bg-slate-50
                  px-4
                  transition-colors
                  duration-300

                  dark:border-slate-700/70
                  dark:bg-[#101f33]
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-100
                    text-blue-600

                    dark:bg-blue-500/10
                    dark:text-blue-400
                  "
                >
                  <MapPin size={19} />
                </div>

                <div className="min-w-0 flex-1">

                  <label
                    className="
                      block
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-slate-400
                    "
                  >
                    Location
                  </label>

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
                      text-slate-800
                      outline-none
                      transition-colors

                      dark:text-slate-100
                      dark:placeholder:text-slate-500
                    "
                  />
                </div>
              </div>

              {/* =================================================
                  VEHICLE
              ================================================= */}

              <div
                className="
                  flex
                  min-h-[64px]
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-slate-100
                  bg-slate-50
                  px-4
                  transition-colors
                  duration-300

                  dark:border-slate-700/70
                  dark:bg-[#101f33]
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-100
                    text-blue-600

                    dark:bg-blue-500/10
                    dark:text-blue-400
                  "
                >
                  <CarFront size={19} />
                </div>

                <div className="min-w-0 flex-1">

                  <label
                    className="
                      block
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-slate-400
                    "
                  >
                    Vehicle Type
                  </label>

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
                        pr-5
                        text-sm
                        font-bold
                        text-slate-800
                        outline-none
                        transition-colors

                        dark:text-slate-100
                      "
                    >
                      <option>All vehicles</option>
                      <option>SUV</option>
                      <option>Sedan</option>
                      <option>Luxury</option>
                      <option>Sports Car</option>
                      <option>Electric</option>
                    </select>

                    <ChevronDown
                      size={15}
                      className="
                        pointer-events-none
                        absolute
                        right-0
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                      "
                    />

                  </div>
                </div>
              </div>

              {/* =================================================
                  AVAILABILITY
              ================================================= */}

              <div
                className="
                  flex
                  min-h-[64px]
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-slate-100
                  bg-slate-50
                  px-4
                  transition-colors
                  duration-300

                  dark:border-slate-700/70
                  dark:bg-[#101f33]
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-100
                    text-blue-600

                    dark:bg-blue-500/10
                    dark:text-blue-400
                  "
                >
                  <CalendarDays size={19} />
                </div>

                <div className="min-w-0 flex-1">

                  <label
                    className="
                      block
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-slate-400
                    "
                  >
                    Availability
                  </label>

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
                        pr-5
                        text-sm
                        font-bold
                        text-slate-800
                        outline-none
                        transition-colors

                        dark:text-slate-100
                      "
                    >
                      <option>Any date</option>
                      <option>Available today</option>
                      <option>This week</option>
                      <option>This month</option>
                    </select>

                    <ChevronDown
                      size={15}
                      className="
                        pointer-events-none
                        absolute
                        right-0
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                      "
                    />

                  </div>
                </div>
              </div>

              {/* =================================================
                  SEARCH
              ================================================= */}

              <button
                type="button"
                onClick={handleSearch}
                className="
                  flex
                  min-h-[64px]
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-blue-600
                  px-8
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  transition-all
                  duration-300
                  hover:bg-blue-700
                  active:scale-[0.98]
                "
              >
                <Search size={19} />
                Search
              </button>
            </div>

            {/* =================================================
                BOTTOM INFORMATION
            ================================================= */}

            <div
              className="
                mt-3
                flex
                flex-col
                gap-2
                border-t
                border-slate-100
                px-2
                pt-3
                text-[11px]
                font-medium
                text-slate-500
                transition-colors
                duration-300

                dark:border-slate-700/70
                dark:text-slate-400

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
                    bg-blue-50
                    font-bold
                    text-blue-600

                    dark:bg-blue-500/10
                    dark:text-blue-400
                  "
                >
                  ✓
                </span>

                Verified dealership inventory
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-1">

                <span>✓ Updated inventory</span>
                <span>✓ Trusted dealers</span>
                <span>✓ Easy management</span>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;