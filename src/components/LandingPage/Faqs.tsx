import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Gauge,
  MapPin,
  Settings2,
  Sparkles,
} from "lucide-react";

interface Vehicle {
  id: number;
  name: string;
  category: string;
  price: string;
  year: string;
  mileage: string;
  transmission: string;
  location: string;
  image: string;
  size: "large" | "small";
}

const vehicles: Vehicle[] = [
  {
    id: 1,
    name: "Ford Mustang",
    category: "Sports Car",
    price: "$54,900",
    year: "2024",
    mileage: "12,400 km",
    transmission: "Automatic",
    location: "New York",
    size: "large",
    image:
      "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1400&q=90",
  },
  {
    id: 2,
    name: "Jeep Rubicon",
    category: "SUV",
    price: "$54,900",
    year: "2024",
    mileage: "18,200 km",
    transmission: "Automatic",
    location: "Los Angeles",
    size: "small",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: 3,
    name: "BMW M4",
    category: "Luxury Sports",
    price: "$54,900",
    year: "2023",
    mileage: "9,800 km",
    transmission: "Automatic",
    location: "Miami",
    size: "small",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: 4,
    name: "Ford Explorer",
    category: "Premium SUV",
    price: "$54,900",
    year: "2024",
    mileage: "15,600 km",
    transmission: "Automatic",
    location: "Chicago",
    size: "small",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: 5,
    name: "BMW 2 Series Gran Coupe",
    category: "Sedan",
    price: "$54,900",
    year: "2024",
    mileage: "8,900 km",
    transmission: "Automatic",
    location: "Houston",
    size: "large",
    image:
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1400&q=90",
  },
  {
    id: 6,
    name: "Jeep Grand Cherokee",
    category: "Luxury SUV",
    price: "$54,900",
    year: "2023",
    mileage: "21,300 km",
    transmission: "Automatic",
    location: "Dallas",
    size: "small",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=90",
  },
];

const Faqs = () => {
  const [visible, setVisible] = useState(false);
  const [activeVehicle, setActiveVehicle] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveVehicle((current) => (current + 1) % vehicles.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const scrollToInventory = () => {
    const inventory = document.getElementById("inventory");
    inventory?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="inventory"
      className="
        relative
        w-full
        overflow-hidden
        bg-[#f7f9fc]
        px-4
        py-14
        font-plus-jakarta
        transition-colors
        duration-500

        dark:bg-[#020b16]

        sm:px-6
        sm:py-16

        lg:px-8
        lg:py-20
      "
    >
      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          top-20
          h-96
          w-96
          rounded-full
          bg-blue-500/10
          blur-[120px]
          animate-[inventoryGlow_8s_ease-in-out_infinite]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-20
          h-96
          w-96
          rounded-full
          bg-cyan-400/10
          blur-[120px]
          animate-[inventoryGlow_10s_ease-in-out_infinite_reverse]
        "
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div
          className={`
            mb-9
            flex
            flex-col
            justify-between
            gap-5

            sm:mb-10

            lg:flex-row
            lg:items-end

            ${
              visible
                ? "animate-[sectionFadeUp_800ms_cubic-bezier(0.22,1,0.36,1)]"
                : "opacity-0"
            }
          `}
        >
          <div className="max-w-2xl">

            {/* Badge */}

            <div
              className="
                mb-3
                inline-flex
                items-center
                gap-1.5
                rounded-full
                border
                border-blue-100
                bg-blue-50
                px-3
                py-1.5
                text-[9px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-blue-600
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lg

                dark:border-blue-500/20
                dark:bg-blue-500/10
                dark:text-blue-400
              "
            >
              <Sparkles size={11} />
              DealerPro Inventory
            </div>

            {/* Heading */}

            <h2
              className="
                text-3xl
                font-bold
                tracking-[-0.04em]
                text-slate-900
                transition-colors
                duration-500

                dark:text-white

                sm:text-4xl
                lg:text-[44px]
              "
            >
              Featured Vehicles
              <span
                className="
                  ml-2
                  text-blue-600
                  dark:text-blue-400
                "
              >
                .
              </span>
            </h2>

            {/* Description */}

            <p
              className="
                mt-3
                max-w-xl
                text-xs
                leading-5
                text-slate-500
                transition-colors
                duration-500

                dark:text-slate-400
              "
            >
              Explore our latest dealer inventory and discover
              quality vehicles ready for your next customer.
            </p>

          </div>

          {/* View All */}

          <button
            type="button"
            onClick={scrollToInventory}
            className="
              group
              flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              border-slate-200
              bg-white
              px-5
              py-2.5
              text-xs
              font-semibold
              text-slate-700
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-blue-200
              hover:bg-blue-50
              hover:text-blue-600
              hover:shadow-[0_12px_30px_rgba(37,99,235,0.12)]
              active:scale-95

              dark:border-slate-700
              dark:bg-[#0b1a2b]
              dark:text-slate-300
              dark:hover:border-blue-500/50
              dark:hover:bg-blue-500/10
              dark:hover:text-blue-400
            "
          >
            View all inventory

            <span
              className="
                flex
                h-6
                w-6
                items-center
                justify-center
                rounded-full
                bg-slate-100
                transition-all
                duration-300
                group-hover:bg-blue-100
                dark:bg-white/5
                dark:group-hover:bg-blue-500/20
              "
            >
              <ArrowRight
                size={13}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </span>
          </button>
        </div>

        {/* ===================================================
            DESKTOP SHOWCASE
        =================================================== */}

        <div
          className={`
            hidden
            overflow-hidden
            rounded-[26px]
            border
            border-slate-200
            bg-white
            shadow-[0_20px_70px_rgba(15,23,42,0.08)]
            transition-all
            duration-700
            hover:shadow-[0_30px_90px_rgba(15,23,42,0.13)]

            dark:border-slate-700/70
            dark:bg-[#0b1a2b]
            dark:shadow-[0_25px_80px_rgba(0,0,0,0.35)]

            lg:block
            ${
              visible
                ? "animate-[showcaseFade_1000ms_cubic-bezier(0.22,1,0.36,1)]"
                : "opacity-0"
            }
          `}
        >
          <div className="grid grid-cols-12">

            {/* =================================================
                LEFT LARGE
            ================================================= */}

            <div
              className="
                col-span-5
                border-r
                border-slate-200
                dark:border-slate-700/70
              "
            >
              <VehicleBlock
                vehicle={vehicles[0]}
                large
                active={activeVehicle === 0}
                index={0}
                onSelect={() => setActiveVehicle(0)}
              />
            </div>

            {/* =================================================
                MIDDLE
            ================================================= */}

            <div
              className="
                col-span-4
                border-r
                border-slate-200
                dark:border-slate-700/70
              "
            >
              <div className="grid h-full grid-rows-2">

                <VehicleBlock
                  vehicle={vehicles[1]}
                  active={activeVehicle === 1}
                  index={1}
                  onSelect={() => setActiveVehicle(1)}
                />

                <VehicleBlock
                  vehicle={vehicles[2]}
                  borderTop
                  active={activeVehicle === 2}
                  index={2}
                  onSelect={() => setActiveVehicle(2)}
                />

              </div>
            </div>

            {/* =================================================
                RIGHT
            ================================================= */}

            <div className="col-span-3">

              <div className="grid h-full grid-rows-2">

                <VehicleBlock
                  vehicle={vehicles[3]}
                  active={activeVehicle === 3}
                  index={3}
                  onSelect={() => setActiveVehicle(3)}
                />

                <VehicleBlock
                  vehicle={vehicles[5]}
                  borderTop
                  active={activeVehicle === 5}
                  index={5}
                  onSelect={() => setActiveVehicle(5)}
                />

              </div>

            </div>
          </div>

          {/* =================================================
              BOTTOM FEATURED
          ================================================= */}

          <div
            className="
              border-t
              border-slate-200
              dark:border-slate-700/70
            "
          >
            <VehicleBlock
              vehicle={vehicles[4]}
              horizontal
              active={activeVehicle === 4}
              index={4}
              onSelect={() => setActiveVehicle(4)}
            />
          </div>
        </div>

        {/* ===================================================
            TABLET
        =================================================== */}

        <div
          className={`
            hidden
            gap-4
            sm:grid
            sm:grid-cols-2
            lg:hidden
            ${
              visible
                ? "animate-[sectionFadeUp_900ms_200ms_both]"
                : "opacity-0"
            }
          `}
        >
          {vehicles.map((vehicle, index) => (
            <VehicleBlock
              key={vehicle.id}
              vehicle={vehicle}
              tablet
              active={activeVehicle === index}
              index={index}
              onSelect={() => setActiveVehicle(index)}
            />
          ))}
        </div>

        {/* ===================================================
            MOBILE
        =================================================== */}

        <div
          className={`
            grid
            gap-4
            sm:hidden
            ${
              visible
                ? "animate-[sectionFadeUp_900ms_200ms_both]"
                : "opacity-0"
            }
          `}
        >
          {vehicles.map((vehicle, index) => (
            <VehicleBlock
              key={vehicle.id}
              vehicle={vehicle}
              mobile
              active={activeVehicle === index}
              index={index}
              onSelect={() => setActiveVehicle(index)}
            />
          ))}
        </div>

        {/* ===================================================
            FOOTER CTA
        =================================================== */}

        <div
          className={`
            mt-6
            flex
            flex-col
            gap-4
            rounded-[22px]
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
            transition-all
            duration-500
            hover:-translate-y-1
            hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]

            dark:border-slate-700/70
            dark:bg-[#0b1a2b]
            dark:shadow-black/30

            sm:flex-row
            sm:items-center
            sm:justify-between

            ${
              visible
                ? "animate-[sectionFadeUp_900ms_400ms_both]"
                : "opacity-0"
            }
          `}
        >
          <div>
            <h3
              className="
                text-sm
                font-bold
                text-slate-900
                dark:text-white
              "
            >
              Manage your dealership inventory
            </h3>

            <p
              className="
                mt-1
                text-[10px]
                leading-4
                text-slate-500
                dark:text-slate-400
              "
            >
              Add vehicles, manage stock and keep your dealership
              organized with DealerPro.
            </p>
          </div>

          <button
            type="button"
            className="
              group
              flex
              w-fit
              items-center
              gap-2
              rounded-full
              bg-blue-600
              px-5
              py-2.5
              text-[10px]
              font-bold
              text-white
              shadow-[0_10px_25px_rgba(37,99,235,0.22)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-blue-500
              hover:shadow-[0_15px_35px_rgba(37,99,235,0.32)]
              active:scale-95
            "
          >
            Manage inventory

            <ArrowRight
              size={13}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </button>
        </div>
      </div>

      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style>
        {`
          @keyframes sectionFadeUp {
            0% {
              opacity: 0;
              transform: translateY(35px);
              filter: blur(6px);
            }

            100% {
              opacity: 1;
              transform: translateY(0);
              filter: blur(0);
            }
          }

          @keyframes showcaseFade {
            0% {
              opacity: 0;
              transform: translateY(45px) scale(0.97);
              filter: blur(8px);
            }

            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0);
            }
          }

          @keyframes vehicleFade {
            0% {
              opacity: 0;
              transform: translateY(25px) scale(0.96);
            }

            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes inventoryGlow {
            0%,
            100% {
              transform: translate3d(0, 0, 0) scale(1);
            }

            50% {
              transform: translate3d(25px, -20px, 0) scale(1.08);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            [class*="animate-"] {
              animation: none !important;
            }
          }
        `}
      </style>
    </section>
  );
};

/* =============================================================
   VEHICLE BLOCK
============================================================= */

interface VehicleBlockProps {
  vehicle: Vehicle;
  large?: boolean;
  horizontal?: boolean;
  borderTop?: boolean;
  tablet?: boolean;
  mobile?: boolean;
  active?: boolean;
  index?: number;
  onSelect?: () => void;
}

const VehicleBlock = ({
  vehicle,
  large = false,
  horizontal = false,
  borderTop = false,
  tablet = false,
  mobile = false,
  active = false,
  index = 0,
  onSelect,
}: VehicleBlockProps) => {

  /* =========================================================
     HORIZONTAL
  ========================================================= */

  if (horizontal) {
    return (
      <button
        type="button"
        onClick={onSelect}
        className={`
          group
          relative
          flex
          min-h-[220px]
          w-full
          items-center
          overflow-hidden
          bg-white
          text-left
          transition-all
          duration-700
          hover:bg-slate-50

          dark:bg-[#0b1a2b]
          dark:hover:bg-[#0e2135]

          ${
            active
              ? "shadow-[inset_0_0_0_1px_rgba(59,130,246,0.35)]"
              : ""
          }
        `}
        style={{
          animation: `vehicleFade 700ms cubic-bezier(0.22,1,0.36,1) ${
            index * 100
          }ms both`,
        }}
      >
        {/* Active glow */}

        <div
          className={`
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-r
            from-blue-500/[0.08]
            via-transparent
            to-transparent
            transition-opacity
            duration-500
            ${active ? "opacity-100" : "opacity-0"}
          `}
        />

        {/* Image */}

        <div
          className="
            relative
            flex
            w-[48%]
            items-center
            justify-center
            self-stretch
            overflow-hidden
            bg-[#f4f7fa]
            transition-all
            duration-500

            dark:bg-[#101f33]
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-32
              w-32
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-blue-400/10
              blur-3xl
              transition-all
              duration-700
              group-hover:scale-150
            "
          />

          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="
              relative
              z-10
              h-[210px]
              w-full
              object-contain
              px-5
              transition-all
              duration-700
              ease-out
              group-hover:scale-[1.07]
              group-hover:-translate-y-1
            "
          />

          {/* Shine */}

          <div
            className="
              pointer-events-none
              absolute
              -left-[70%]
              top-0
              z-20
              h-full
              w-1/3
              rotate-[18deg]
              bg-white/30
              blur-xl
              transition-transform
              duration-[1200ms]
              group-hover:translate-x-[450%]
            "
          />
        </div>

        {/* Content */}

        <div className="relative z-10 flex-1 px-8 py-6">

          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-blue-600
              dark:text-blue-400
            "
          >
            {vehicle.category}
          </p>

          <h3
            className="
              mt-2
              text-xl
              font-bold
              text-slate-900
              transition-all
              duration-300
              group-hover:translate-x-1

              dark:text-white
            "
          >
            {vehicle.name}
          </h3>

          <div
            className="
              mt-2
              text-sm
              font-bold
              text-slate-900
              dark:text-slate-100
            "
          >
            {vehicle.price}
          </div>

          <div className="mt-5 flex flex-wrap gap-4">

            <Spec
              icon={<CalendarDays size={12} />}
              text={vehicle.year}
            />

            <Spec
              icon={<Gauge size={12} />}
              text={vehicle.mileage}
            />

            <Spec
              icon={<Settings2 size={12} />}
              text={vehicle.transmission}
            />

            <Spec
              icon={<MapPin size={12} />}
              text={vehicle.location}
            />

          </div>
        </div>
      </button>
    );
  }

  /* =========================================================
     NORMAL / LARGE / TABLET / MOBILE
  ========================================================= */

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`
        group
        relative
        w-full
        overflow-hidden
        bg-white
        text-left
        transition-all
        duration-700
        hover:-translate-y-1
        hover:shadow-[0_20px_50px_rgba(15,23,42,0.10)]

        dark:bg-[#0b1a2b]
        dark:hover:bg-[#0e2135]
        dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.28)]

        ${
          borderTop
            ? "border-t border-slate-200 dark:border-slate-700/70"
            : ""
        }

        ${
          tablet || mobile
            ? "rounded-2xl border border-slate-200 shadow-sm dark:border-slate-700/70 dark:shadow-black/30"
            : ""
        }

        ${
          active
            ? "ring-1 ring-blue-500/30"
            : ""
        }
      `}
      style={{
        animation: `vehicleFade 700ms cubic-bezier(0.22,1,0.36,1) ${
          index * 100
        }ms both`,
        perspective: "1000px",
      }}
    >
      {/* ===================================================
          ACTIVE GLOW
      =================================================== */}

      <div
        className={`
          pointer-events-none
          absolute
          inset-0
          z-20
          bg-gradient-to-br
          from-blue-500/[0.06]
          via-transparent
          to-cyan-400/[0.03]
          transition-opacity
          duration-500
          ${active ? "opacity-100" : "opacity-0"}
        `}
      />

      {/* ===================================================
          IMAGE
      =================================================== */}

      <div
        className={`
          relative
          overflow-hidden
          bg-[#f3f6fa]
          transition-colors
          duration-500

          dark:bg-[#101f33]

          ${
            large
              ? "h-[310px]"
              : tablet
              ? "h-[210px]"
              : mobile
              ? "h-[220px]"
              : "h-[170px]"
          }
        `}
      >
        {/* Glow */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-36
            w-36
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-blue-400/10
            blur-3xl
            transition-all
            duration-700
            group-hover:scale-[1.6]
          "
        />

        {/* Image */}

        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="
            relative
            z-10
            h-full
            w-full
            object-cover
            object-center
            transition-all
            duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:scale-[1.08]
            group-hover:-translate-y-1
          "
        />

        {/* Gradient */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-20
            bg-gradient-to-t
            from-black/35
            via-transparent
            to-transparent
          "
        />

        {/* Moving shine */}

        <div
          className="
            pointer-events-none
            absolute
            -left-[60%]
            top-0
            z-30
            h-full
            w-[35%]
            rotate-[18deg]
            bg-white/20
            blur-xl
            transition-transform
            duration-[1300ms]
            group-hover:translate-x-[430%]
          "
        />

        {/* Category */}

        <div
          className="
            absolute
            left-4
            top-4
            z-40
            rounded-full
            border
            border-white/30
            bg-white/90
            px-2.5
            py-1
            text-[8px]
            font-bold
            uppercase
            tracking-wide
            text-slate-700
            shadow-lg
            backdrop-blur-md
            transition-all
            duration-300
            group-hover:-translate-y-1
            group-hover:bg-white

            dark:border-white/10
            dark:bg-[#0b1a2b]/90
            dark:text-slate-200
          "
        >
          {vehicle.category}
        </div>

        {/* Price */}

        <div className="absolute bottom-4 left-4 z-40">

          <p className="text-[8px] text-white/80">
            Starting from
          </p>

          <p
            className={`
              font-bold
              text-white
              transition-transform
              duration-300
              group-hover:translate-x-1

              ${large ? "text-lg" : "text-sm"}
            `}
          >
            {vehicle.price}
          </p>

        </div>

        {/* Active indicator */}

        <div
          className={`
            absolute
            bottom-4
            right-4
            z-40
            h-2
            w-2
            rounded-full
            bg-blue-400
            shadow-[0_0_15px_rgba(96,165,250,0.9)]
            transition-all
            duration-500
            ${
              active
                ? "scale-100 opacity-100"
                : "scale-0 opacity-0"
            }
          `}
        />
      </div>

      {/* ===================================================
          CONTENT
      =================================================== */}

      <div
        className={`
          relative
          z-30
          ${large ? "p-5" : "p-4"}
        `}
      >
        <div className="flex items-start justify-between gap-3">

          <div>

            <p
              className="
                text-[8px]
                font-medium
                uppercase
                tracking-wide
                text-slate-400
              "
            >
              {vehicle.year} · {vehicle.category}
            </p>

            <h3
              className={`
                mt-1
                font-bold
                text-slate-900
                transition-all
                duration-300
                group-hover:translate-x-1

                dark:text-white

                ${large ? "text-base" : "text-xs"}
              `}
            >
              {vehicle.name}
            </h3>

          </div>

          <span
            className="
              flex
              h-7
              w-7
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-slate-100
              text-slate-400
              transition-all
              duration-500
              group-hover:translate-x-1
              group-hover:bg-blue-600
              group-hover:text-white
              group-hover:rotate-[-8deg]

              dark:bg-white/5
              dark:text-slate-500
              dark:group-hover:bg-blue-600
              dark:group-hover:text-white
            "
          >
            <ArrowRight size={12} />
          </span>
        </div>

        {/* Specs */}

        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-2">

          <Spec
            icon={<CalendarDays size={11} />}
            text={vehicle.year}
          />

          <Spec
            icon={<Gauge size={11} />}
            text={vehicle.mileage}
          />

          <Spec
            icon={<Settings2 size={11} />}
            text={vehicle.transmission}
          />

        </div>

        {/* Location */}

        <div
          className="
            mt-2
            flex
            items-center
            gap-1
            text-[8px]
            text-slate-400
          "
        >
          <MapPin size={10} />
          {vehicle.location}
        </div>
      </div>
    </button>
  );
};

/* =============================================================
   SPEC
============================================================= */

interface SpecProps {
  icon: React.ReactNode;
  text: string;
}

const Spec = ({ icon, text }: SpecProps) => {
  return (
    <span
      className="
        flex
        items-center
        gap-1
        text-[8px]
        text-slate-500
        transition-colors
        duration-300

        dark:text-slate-400
      "
    >
      {icon}
      {text}
    </span>
  );
};

export default Faqs;
