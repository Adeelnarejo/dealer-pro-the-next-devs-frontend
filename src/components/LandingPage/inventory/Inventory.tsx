import React, { useMemo, useState } from "react";

import {
  ArrowRight,
  CalendarDays,
  CarFront,
  CheckCircle2,
  ChevronDown,
  Fuel,
  Gauge,
  Heart,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";

import Header from "../Header";
import Footer from "../Footer";

// =====================================================
// TYPES
// =====================================================

type VehicleStatus = "Available" | "Reserved" | "Sold";

type Vehicle = {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: string;
  mileage: string;
  fuel: string;
  transmission: string;
  location: string;
  status: VehicleStatus;
  image: string;
};

// =====================================================
// IMAGE FALLBACK
// =====================================================

const fallbackCar =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=90";

const lamborghiniImage = "/lamborghini.png";

// =====================================================
// VEHICLES
// =====================================================

const vehicles: Vehicle[] = [
  {
    id: 1,
    brand: "Lamborghini",
    model: "Huracán EVO",
    year: 2024,
    price: "$289,900",
    mileage: "2,450 km",
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Dubai, UAE",
    status: "Available",
    image: lamborghiniImage,
  },
  {
    id: 2,
    brand: "BMW",
    model: "M8 Competition",
    year: 2024,
    price: "$142,500",
    mileage: "8,320 km",
    fuel: "Petrol",
    transmission: "Automatic",
    location: "London, UK",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: 3,
    brand: "Mercedes-Benz",
    model: "AMG GT 63",
    year: 2024,
    price: "$189,800",
    mileage: "4,120 km",
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Berlin, Germany",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: 4,
    brand: "Porsche",
    model: "911 Carrera",
    year: 2023,
    price: "$156,900",
    mileage: "11,280 km",
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Miami, USA",
    status: "Reserved",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: 5,
    brand: "Audi",
    model: "RS7 Sportback",
    year: 2024,
    price: "$118,400",
    mileage: "6,870 km",
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Paris, France",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: 6,
    brand: "Ferrari",
    model: "Roma",
    year: 2023,
    price: "$274,500",
    mileage: "3,610 km",
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Monaco",
    status: "Sold",
    image:
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200&q=90",
  },
];

// =====================================================
// BRANDS
// =====================================================

const brands = [
  "All Cars",
  "Lamborghini",
  "BMW",
  "Mercedes-Benz",
  "Porsche",
  "Audi",
  "Ferrari",
];

// =====================================================
// INVENTORY PAGE
// =====================================================

const Inventory = () => {
  const [selectedBrand, setSelectedBrand] = useState("All Cars");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedVehicle, setSelectedVehicle] =
    useState<Vehicle | null>(null);

  // ===================================================
  // FILTER
  // ===================================================

  const filteredVehicles = useMemo(() => {
    const value = search.trim().toLowerCase();

    return vehicles.filter((vehicle) => {
      const brandMatch =
        selectedBrand === "All Cars" ||
        vehicle.brand === selectedBrand;

      const searchMatch =
        !value ||
        vehicle.brand.toLowerCase().includes(value) ||
        vehicle.model.toLowerCase().includes(value) ||
        vehicle.location.toLowerCase().includes(value);

      return brandMatch && searchMatch;
    });
  }, [selectedBrand, search]);

  return (
    <div
      className="
        min-h-screen
        w-full
        overflow-x-hidden
        bg-white
        text-slate-900
        transition-colors
        duration-300
        dark:bg-[#030303]
        dark:text-white
      "
    >
      {/* =================================================
          EXISTING HEADER
      ================================================= */}

      <Header />

      {/* =================================================
          HERO
      ================================================= */}

      <section
        className="
          relative
          min-h-[calc(100vh-64px)]
          overflow-hidden
          bg-slate-100
          dark:bg-[#050505]
        "
      >
        {/* Background */}

        <div className="absolute inset-0">
          <img
            src={fallbackCar}
            alt="Premium car background"
            className="
              h-full
              w-full
              object-cover
              opacity-[0.08]
              dark:opacity-[0.22]
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-white
              via-white/95
              to-white/60
              dark:from-black
              dark:via-black/85
              dark:to-black/20
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-white
              via-transparent
              to-transparent
              dark:from-[#050505]
            "
          />
        </div>

        {/* Orange / blue glows */}

        <div
          className="
            pointer-events-none
            absolute
            -left-40
            top-20
            h-[450px]
            w-[450px]
            rounded-full
            bg-orange-500/10
            blur-[130px]
            dark:bg-orange-500/[0.07]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-40
            bottom-0
            h-[450px]
            w-[450px]
            rounded-full
            bg-blue-500/10
            blur-[130px]
            dark:bg-blue-500/[0.05]
          "
        />

        {/* Content */}

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            min-h-[calc(100vh-64px)]
            w-full
            max-w-[1600px]
            items-center
            px-5
            py-14
            sm:px-8
            lg:px-12
            xl:px-16
          "
        >
          <div
            className="
              grid
              w-full
              items-center
              gap-10
              lg:grid-cols-[0.72fr_1.28fr]
              xl:gap-4
            "
          >
            {/* LEFT */}

            <div className="relative z-20 max-w-xl">
              {/* Badge */}

              <div
                className="
                  mb-6
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-slate-200
                  bg-white/80
                  px-3
                  py-2
                  shadow-sm
                  backdrop-blur-xl
                  dark:border-white/10
                  dark:bg-white/[0.06]
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
                    bg-orange-500/10
                    text-orange-500
                  "
                >
                  <ShieldCheck size={14} />
                </span>

                <span
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-slate-600
                    dark:text-white/70
                    sm:text-[10px]
                  "
                >
                  Premium Vehicle Collection
                </span>
              </div>

              {/* Heading */}

              <h1
                className="
                  text-5xl
                  font-black
                  uppercase
                  leading-[0.9]
                  tracking-[-0.055em]
                  text-slate-950
                  dark:text-white
                  sm:text-6xl
                  md:text-7xl
                  lg:text-[72px]
                  xl:text-[88px]
                "
              >
                Find Your

                <span
                  className="
                    mt-2
                    block
                    bg-gradient-to-r
                    from-orange-500
                    via-red-500
                    to-orange-400
                    bg-clip-text
                    text-transparent
                  "
                >
                  Dream Car
                </span>
              </h1>

              <p
                className="
                  mt-6
                  max-w-lg
                  text-sm
                  leading-7
                  text-slate-600
                  dark:text-white/45
                  sm:text-base
                "
              >
                Explore premium, performance and luxury vehicles
                from trusted dealerships around the world.
              </p>

              {/* Search */}

              <div
                className="
                  mt-7
                  flex
                  w-full
                  max-w-xl
                  flex-col
                  gap-2
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white/90
                  p-2
                  shadow-xl
                  shadow-slate-900/5
                  backdrop-blur-xl
                  dark:border-white/10
                  dark:bg-white/[0.06]
                  dark:shadow-black/30
                  sm:flex-row
                "
              >
                <div className="flex min-h-12 flex-1 items-center gap-3 px-3">
                  <Search
                    size={18}
                    className="shrink-0 text-slate-400 dark:text-white/30"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Lamborghini, BMW, Porsche..."
                    className="
                      w-full
                      bg-transparent
                      text-sm
                      text-slate-900
                      outline-none
                      placeholder:text-slate-400
                      dark:text-white
                      dark:placeholder:text-white/25
                    "
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("inventory")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                  className="
                    flex
                    h-12
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-orange-500
                    to-red-500
                    px-6
                    text-sm
                    font-bold
                    text-white
                    shadow-lg
                    shadow-orange-500/20
                    transition
                    hover:-translate-y-0.5
                  "
                >
                  Search
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Trust */}

              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3">
                <Trust text="Verified Vehicles" />
                <Trust text="Trusted Dealers" />
                <Trust text="Secure Deals" />
              </div>
            </div>

            {/* RIGHT CAR */}

            <div
              className="
                relative
                flex
                min-h-[350px]
                items-center
                justify-center
                lg:min-h-[580px]
              "
            >
              {/* Large text */}

              <div
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-1/2
                  hidden
                  -translate-x-1/2
                  -translate-y-1/2
                  select-none
                  whitespace-nowrap
                  text-[130px]
                  font-black
                  uppercase
                  tracking-[-0.08em]
                  text-slate-900/[0.035]
                  dark:text-white/[0.025]
                  xl:block
                  xl:text-[190px]
                "
              >
                LUXURY
              </div>

              {/* Glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-1/2
                  h-[280px]
                  w-[280px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-orange-500/10
                  blur-[90px]
                  dark:bg-orange-500/[0.09]
                  sm:h-[430px]
                  sm:w-[430px]
                "
              />

              {/* Lamborghini */}

              <img
                src={lamborghiniImage}
                alt="Lamborghini Huracán EVO"
                onError={(e) => {
                  e.currentTarget.src = fallbackCar;
                }}
                className="
                  relative
                  z-10
                  w-full
                  max-w-[820px]
                  object-contain
                  drop-shadow-[0_30px_40px_rgba(0,0,0,0.35)]
                  transition
                  duration-700
                  hover:scale-[1.025]
                "
              />

              {/* Mileage */}

              <div
                className="
                  absolute
                  right-0
                  top-[12%]
                  z-20
                  hidden
                  w-28
                  rounded-full
                  border
                  border-slate-200
                  bg-white/90
                  p-5
                  text-center
                  shadow-xl
                  backdrop-blur-xl
                  dark:border-white/10
                  dark:bg-[#111]/90
                  sm:block
                "
              >
                <Gauge
                  size={18}
                  className="mx-auto mb-2 text-orange-500"
                />

                <p className="text-xl font-black text-slate-900 dark:text-white">
                  2.4K
                </p>

                <p className="mt-1 text-[8px] uppercase tracking-widest text-slate-400 dark:text-white/30">
                  KM Driven
                </p>
              </div>

              {/* Verified */}

              <div
                className="
                  absolute
                  bottom-[8%]
                  left-0
                  z-20
                  hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white/90
                  p-4
                  shadow-xl
                  backdrop-blur-xl
                  dark:border-white/10
                  dark:bg-black/70
                  sm:block
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      bg-orange-500/10
                      text-orange-500
                    "
                  >
                    <ShieldCheck size={18} />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      Verified Vehicle
                    </p>

                    <p className="mt-0.5 text-[9px] text-slate-400 dark:text-white/30">
                      Dealer inspected
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          INVENTORY
      ================================================= */}

      <section
        id="inventory"
        className="
          relative
          overflow-hidden
          bg-slate-50
          px-5
          py-20
          transition-colors
          duration-300
          dark:bg-[#080808]
          sm:px-8
          lg:px-12
          lg:py-28
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            -right-40
            top-20
            h-96
            w-96
            rounded-full
            bg-orange-500/[0.04]
            blur-[120px]
          "
        />

        <div className="relative mx-auto max-w-[1450px]">
          {/* Heading */}

          <div
            className="
              flex
              flex-col
              gap-6
              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            <div>
              <div
                className="
                  mb-4
                  flex
                  items-center
                  gap-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-orange-500
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                Our Collection
              </div>

              <h2
                className="
                  text-4xl
                  font-black
                  uppercase
                  tracking-[-0.04em]
                  text-slate-950
                  dark:text-white
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                Explore

                <span className="ml-3 text-slate-300 dark:text-white/25">
                  Inventory
                </span>
              </h2>

              <p
                className="
                  mt-4
                  max-w-xl
                  text-sm
                  leading-7
                  text-slate-500
                  dark:text-white/40
                "
              >
                Discover premium vehicles selected for
                performance, luxury and everyday driving.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-white/40">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {filteredVehicles.length}
              </span>
              Vehicles
            </div>
          </div>

          {/* FILTER BAR */}

          <div
            className="
              mt-10
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-3
              shadow-sm
              dark:border-white/10
              dark:bg-[#101010]
              dark:shadow-none
            "
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              {/* Brand scroll */}

              <div
                className="
                  flex
                  min-w-0
                  flex-1
                  gap-2
                  overflow-x-auto
                  pb-1
                  scrollbar-hide
                "
              >
                {brands.map((brand) => {
                  const active = selectedBrand === brand;

                  return (
                    <button
                      key={brand}
                      type="button"
                      onClick={() => setSelectedBrand(brand)}
                      className={`
                        whitespace-nowrap
                        rounded-xl
                        px-4
                        py-3
                        text-xs
                        font-semibold
                        transition
                        ${
                          active
                            ? "bg-slate-950 text-white dark:bg-white dark:text-black"
                            : "text-slate-500 hover:bg-slate-100 hover:text-slate-950 dark:text-white/40 dark:hover:bg-white/[0.05] dark:hover:text-white"
                        }
                      `}
                    >
                      {brand}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="
                  flex
                  h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-5
                  text-xs
                  font-bold
                  text-slate-600
                  transition
                  hover:bg-slate-100
                  dark:border-white/10
                  dark:bg-white/[0.04]
                  dark:text-white/60
                  dark:hover:bg-white/[0.08]
                "
              >
                <SlidersHorizontal size={15} />

                Filters

                <ChevronDown
                  size={14}
                  className={`transition ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Extra filters */}

            {showFilters && (
              <div
                className="
                  mt-3
                  grid
                  gap-3
                  border-t
                  border-slate-200
                  pt-3
                  dark:border-white/10
                  sm:grid-cols-2
                  lg:grid-cols-4
                "
              >
                <FilterBox
                  label="Price Range"
                  value="Any Price"
                />

                <FilterBox
                  label="Model Year"
                  value="Any Year"
                />

                <FilterBox
                  label="Body Type"
                  value="All Types"
                />

                <FilterBox
                  label="Fuel Type"
                  value="All Fuels"
                />
              </div>
            )}
          </div>

          {/* VEHICLES */}

          {filteredVehicles.length > 0 ? (
            <div
              className="
                mt-8
                grid
                gap-5
                sm:grid-cols-2
                xl:grid-cols-3
              "
            >
              {filteredVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onView={() => setSelectedVehicle(vehicle)}
                />
              ))}
            </div>
          ) : (
            <div
              className="
                mt-8
                flex
                min-h-[280px]
                flex-col
                items-center
                justify-center
                rounded-3xl
                border
                border-slate-200
                bg-white
                px-5
                text-center
                dark:border-white/10
                dark:bg-[#101010]
              "
            >
              <CarFront className="text-slate-300 dark:text-white/15" size={42} />

              <h3 className="mt-5 text-xl font-bold">
                No vehicles found
              </h3>

              <p className="mt-2 text-sm text-slate-400 dark:text-white/35">
                Try another brand or search term.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedBrand("All Cars");
                }}
                className="
                  mt-6
                  rounded-xl
                  bg-slate-950
                  px-5
                  py-3
                  text-xs
                  font-bold
                  text-white
                  dark:bg-white
                  dark:text-black
                "
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =================================================
          STATS
      ================================================= */}

      <section
        className="
          border-y
          border-slate-200
          bg-white
          px-5
          py-14
          transition-colors
          dark:border-white/[0.06]
          dark:bg-[#050505]
          sm:px-8
          lg:px-12
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1200px]
            overflow-hidden
            rounded-3xl
            border
            border-slate-200
            bg-slate-100
            dark:border-white/[0.07]
            dark:bg-white/[0.07]
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          <Stat number="250+" label="Premium Vehicles" />
          <Stat number="80+" label="Trusted Dealers" />
          <Stat number="24" label="Countries" />
          <Stat number="98%" label="Customer Satisfaction" />
        </div>
      </section>

      {/* =================================================
          WHY DEALERPRO
      ================================================= */}

      <section
        className="
          bg-slate-50
          px-5
          py-20
          transition-colors
          dark:bg-[#080808]
          sm:px-8
          lg:px-12
          lg:py-28
        "
      >
        <div className="mx-auto max-w-[1450px]">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* TEXT */}

            <div>
              <div
                className="
                  mb-4
                  flex
                  items-center
                  gap-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-orange-500
                "
              >
                <Sparkles size={14} />
                Why DealerPro
              </div>

              <h2
                className="
                  max-w-xl
                  text-4xl
                  font-black
                  uppercase
                  leading-[1]
                  tracking-[-0.04em]
                  text-slate-950
                  dark:text-white
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                More than

                <span className="block text-slate-300 dark:text-white/25">
                  just a car listing.
                </span>
              </h2>

              <p
                className="
                  mt-6
                  max-w-lg
                  text-sm
                  leading-7
                  text-slate-500
                  dark:text-white/40
                "
              >
                DealerPro connects dealerships, vehicles and
                customers in one modern automotive platform.
              </p>

              <div className="mt-9 space-y-5">
                <Feature
                  title="Verified Inventory"
                  text="Keep vehicle specifications, availability and details organized."
                />

                <Feature
                  title="Powerful Dealership Tools"
                  text="Manage vehicles, customers, agreements, payments and invoices."
                />

                <Feature
                  title="Premium Customer Experience"
                  text="Give customers a modern way to discover your inventory."
                />
              </div>
            </div>

            {/* IMAGE */}

            <div className="relative">
              <div
                className="
                  absolute
                  -inset-5
                  rounded-[40px]
                  bg-orange-500/[0.05]
                  blur-3xl
                "
              />

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[30px]
                  border
                  border-slate-200
                  bg-white
                  p-3
                  shadow-xl
                  dark:border-white/10
                  dark:bg-[#101010]
                  dark:shadow-black/30
                "
              >
                <div
                  className="
                    relative
                    h-[330px]
                    overflow-hidden
                    rounded-[24px]
                    bg-slate-100
                    dark:bg-[#080808]
                    sm:h-[420px]
                  "
                >
                  <img
                    src={lamborghiniImage}
                    alt="Lamborghini"
                    onError={(e) => {
                      e.currentTarget.src = fallbackCar;
                    }}
                    className="h-full w-full object-contain"
                  />

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/80
                      via-transparent
                      to-transparent
                    "
                  />

                  <div
                    className="
                      absolute
                      bottom-5
                      left-5
                      right-5
                      rounded-2xl
                      border
                      border-white/10
                      bg-black/60
                      p-5
                      text-white
                      backdrop-blur-xl
                    "
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.2em] text-orange-500">
                          Featured Vehicle
                        </p>

                        <h3 className="mt-1 text-lg font-black sm:text-xl">
                          Lamborghini Huracán EVO
                        </h3>
                      </div>

                      <span className="rounded-full bg-green-500/10 px-3 py-1.5 text-[8px] font-bold uppercase tracking-wider text-green-400">
                        Available
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          CTA
      ================================================= */}

      <section
        className="
          bg-white
          px-5
          py-16
          transition-colors
          dark:bg-[#050505]
          sm:px-8
          lg:px-12
          lg:py-24
        "
      >
        <div
          className="
            relative
            mx-auto
            max-w-[1450px]
            overflow-hidden
            rounded-[30px]
            border
            border-slate-200
            bg-slate-100
            px-6
            py-14
            dark:border-white/10
            dark:bg-gradient-to-br
            dark:from-[#17100c]
            dark:via-[#100b09]
            dark:to-[#080808]
            sm:px-10
            lg:px-16
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-40
              h-96
              w-96
              rounded-full
              bg-orange-500/10
              blur-[100px]
            "
          />

          <div
            className="
              relative
              flex
              flex-col
              items-start
              justify-between
              gap-8
              lg:flex-row
              lg:items-center
            "
          >
            <div>
              <div className="mb-4 flex items-center gap-2 text-orange-500">
                <CarFront size={17} />

                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                  DealerPro Inventory
                </span>
              </div>

              <h2
                className="
                  max-w-3xl
                  text-3xl
                  font-black
                  uppercase
                  tracking-[-0.04em]
                  text-slate-950
                  dark:text-white
                  sm:text-4xl
                  lg:text-5xl
                "
              >
                Your next car

                <span className="text-orange-500">
                  {" "}
                  is waiting.
                </span>
              </h2>

              <p
                className="
                  mt-4
                  max-w-2xl
                  text-sm
                  leading-7
                  text-slate-500
                  dark:text-white/40
                "
              >
                Explore our complete inventory and discover
                vehicles that match your lifestyle.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("inventory")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
              className="
                group
                flex
                shrink-0
                items-center
                gap-3
                rounded-xl
                bg-slate-950
                px-6
                py-3.5
                text-sm
                font-bold
                text-white
                transition
                hover:-translate-y-0.5
                dark:bg-white
                dark:text-black
                dark:hover:bg-orange-500
                dark:hover:text-white
              "
            >
              Browse Inventory

              <ArrowRight
                size={17}
                className="transition group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </section>

      {/* =================================================
          VEHICLE MODAL
      ================================================= */}

      {selectedVehicle && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/75
            p-3
            backdrop-blur-md
            sm:p-5
          "
          onClick={() => setSelectedVehicle(null)}
        >
          <div
            className="
              relative
              max-h-[92vh]
              w-full
              max-w-3xl
              overflow-y-auto
              rounded-3xl
              border
              border-white/10
              bg-white
              shadow-2xl
              dark:bg-[#101010]
            "
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedVehicle(null)}
              className="
                absolute
                right-3
                top-3
                z-20
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-black/60
                text-white
                backdrop-blur-xl
              "
            >
              <X size={18} />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Modal image */}

              <div
                className="
                  flex
                  min-h-[280px]
                  items-center
                  justify-center
                  bg-slate-100
                  p-6
                  dark:bg-[#080808]
                  sm:min-h-[350px]
                "
              >
                <img
                  src={selectedVehicle.image}
                  alt={`${selectedVehicle.brand} ${selectedVehicle.model}`}
                  onError={(e) => {
                    e.currentTarget.src = fallbackCar;
                  }}
                  className="max-h-[350px] w-full object-contain"
                />
              </div>

              {/* Details */}

              <div className="p-6 sm:p-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">
                  {selectedVehicle.status}
                </span>

                <h2 className="mt-3 text-3xl font-black text-slate-950 dark:text-white">
                  {selectedVehicle.brand}
                </h2>

                <p className="text-xl text-slate-400 dark:text-white/40">
                  {selectedVehicle.model}
                </p>

                <p className="mt-6 text-3xl font-black text-slate-950 dark:text-white">
                  {selectedVehicle.price}
                </p>

                <div className="mt-7 space-y-4">
                  <Detail
                    icon={<CalendarDays size={17} />}
                    label="Year"
                    value={String(selectedVehicle.year)}
                  />

                  <Detail
                    icon={<Gauge size={17} />}
                    label="Mileage"
                    value={selectedVehicle.mileage}
                  />

                  <Detail
                    icon={<Fuel size={17} />}
                    label="Fuel"
                    value={selectedVehicle.fuel}
                  />

                  <Detail
                    icon={<CarFront size={17} />}
                    label="Transmission"
                    value={selectedVehicle.transmission}
                  />

                  <Detail
                    icon={<MapPin size={17} />}
                    label="Location"
                    value={selectedVehicle.location}
                  />
                </div>

                <button
                  type="button"
                  className="
                    mt-8
                    flex
                    h-12
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-orange-500
                    to-red-500
                    text-sm
                    font-bold
                    text-white
                  "
                >
                  Contact Dealer
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================
          EXISTING FOOTER
      ================================================= */}

      <Footer />
    </div>
  );
};

// =====================================================
// VEHICLE CARD
// =====================================================

const VehicleCard = ({
  vehicle,
  onView,
}: {
  vehicle: Vehicle;
  onView: () => void;
}) => {
  return (
    <div
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-500
        hover:-translate-y-1
        hover:shadow-xl
        dark:border-white/[0.08]
        dark:bg-[#101010]
        dark:hover:border-orange-500/20
      "
    >
      {/* IMAGE */}

      <div className="relative h-[230px] overflow-hidden bg-slate-100 dark:bg-[#0b0b0b] sm:h-[250px]">
        <img
          src={vehicle.image}
          alt={`${vehicle.brand} ${vehicle.model}`}
          onError={(e) => {
            e.currentTarget.src = fallbackCar;
          }}
          className="
            h-full
            w-full
            object-cover
            transition
            duration-700
            group-hover:scale-105
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Status */}

        <div className="absolute left-4 top-4">
          <span
            className={`
              rounded-full
              px-3
              py-1.5
              text-[9px]
              font-bold
              uppercase
              tracking-wider
              backdrop-blur-xl
              ${
                vehicle.status === "Available"
                  ? "bg-green-500/15 text-green-400"
                  : vehicle.status === "Reserved"
                    ? "bg-yellow-500/15 text-yellow-400"
                    : "bg-red-500/15 text-red-400"
              }
            `}
          >
            {vehicle.status}
          </span>
        </div>

        {/* Heart */}

        <button
          type="button"
          className="
            absolute
            right-4
            top-4
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-black/40
            text-white/70
            backdrop-blur-xl
            transition
            hover:bg-white
            hover:text-black
          "
        >
          <Heart size={15} />
        </button>

        {/* Brand */}

        <div className="absolute bottom-4 left-5">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-orange-500">
            {vehicle.brand}
          </p>

          <h3 className="mt-1 text-xl font-black text-white">
            {vehicle.model}
          </h3>
        </div>
      </div>

      {/* DETAILS */}

      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xl font-black text-slate-950 dark:text-white">
            {vehicle.price}
          </p>

          <span className="text-[10px] text-slate-400 dark:text-white/30">
            {vehicle.year}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <SmallDetail
            icon={<Gauge size={14} />}
            value={vehicle.mileage}
          />

          <SmallDetail
            icon={<Fuel size={14} />}
            value={vehicle.fuel}
          />

          <SmallDetail
            icon={<CarFront size={14} />}
            value={vehicle.transmission}
          />

          <SmallDetail
            icon={<MapPin size={14} />}
            value={vehicle.location}
          />
        </div>

        <button
          type="button"
          onClick={onView}
          className="
            group/button
            mt-5
            flex
            h-11
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            text-xs
            font-bold
            text-slate-600
            transition
            hover:border-orange-500/30
            hover:bg-orange-500
            hover:text-white
            dark:border-white/10
            dark:bg-white/[0.04]
            dark:text-white/60
          "
        >
          View Details

          <ArrowRight
            size={15}
            className="transition group-hover/button:translate-x-1"
          />
        </button>
      </div>
    </div>
  );
};

// =====================================================
// TRUST
// =====================================================

const Trust = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-white/45">
      <CheckCircle2 size={14} className="text-orange-500" />
      {text}
    </div>
  );
};

// =====================================================
// FILTER BOX
// =====================================================

const FilterBox = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <button
      type="button"
      className="
        flex
        items-center
        justify-between
        rounded-xl
        border
        border-slate-200
        bg-slate-50
        px-4
        py-3
        text-left
        transition
        hover:bg-slate-100
        dark:border-white/[0.07]
        dark:bg-white/[0.03]
        dark:hover:bg-white/[0.06]
      "
    >
      <div>
        <p className="text-[9px] uppercase tracking-wider text-slate-400 dark:text-white/25">
          {label}
        </p>

        <p className="mt-1 text-xs font-semibold text-slate-700 dark:text-white/70">
          {value}
        </p>
      </div>

      <ChevronDown
        size={14}
        className="text-slate-400 dark:text-white/30"
      />
    </button>
  );
};

// =====================================================
// SMALL DETAIL
// =====================================================

const SmallDetail = ({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) => {
  return (
    <div className="flex min-w-0 items-center gap-2 text-[10px] text-slate-400 dark:text-white/40">
      <span className="shrink-0 text-slate-300 dark:text-white/25">
        {icon}
      </span>

      <span className="truncate">{value}</span>
    </div>
  );
};

// =====================================================
// FEATURE
// =====================================================

const Feature = ({
  title,
  text,
}: {
  title: string;
  text: string;
}) => {
  return (
    <div className="flex gap-4">
      <div
        className="
          mt-1
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-orange-500/10
          text-orange-500
        "
      >
        <CheckCircle2 size={17} />
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-6 text-slate-500 dark:text-white/35">
          {text}
        </p>
      </div>
    </div>
  );
};

// =====================================================
// STAT
// =====================================================

const Stat = ({
  number,
  label,
}: {
  number: string;
  label: string;
}) => {
  return (
    <div className="bg-white px-6 py-8 text-center dark:bg-[#101010]">
      <p className="text-3xl font-black text-slate-950 dark:text-white">
        {number}
      </p>

      <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-slate-400 dark:text-white/30">
        {label}
      </p>
    </div>
  );
};

// =====================================================
// DETAIL
// =====================================================

const Detail = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        border-b
        border-slate-200
        pb-3
        dark:border-white/[0.06]
      "
    >
      <div className="flex items-center gap-3 text-slate-400 dark:text-white/35">
        {icon}
        <span className="text-xs">{label}</span>
      </div>

      <span className="text-xs font-semibold text-slate-700 dark:text-white/75">
        {value}
      </span>
    </div>
  );
};

export default Inventory;