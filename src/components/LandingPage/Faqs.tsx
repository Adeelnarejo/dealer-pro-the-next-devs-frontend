
import {
  ArrowRight,
  CalendarDays,
  Gauge,
  MapPin,
  Settings2,
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
  return (
    <section
      className="
        w-full
        bg-[#f7f9fc]
        px-4
        py-14
        transition-colors
        duration-300

        dark:bg-[#020b16]

        sm:px-6
        lg:px-8
        lg:py-20
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <div
          className="
            mb-9
            flex
            flex-col
            justify-between
            gap-5

            sm:mb-10

            lg:flex-row
            lg:items-end
          "
        >
          <div className="max-w-2xl">

            {/* Badge */}

            <div
              className="
                mb-3
                inline-flex
                rounded-full
                bg-blue-50
                px-3
                py-1
                text-[9px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-blue-600
                transition-colors
                duration-300

                dark:bg-blue-500/10
                dark:text-blue-400
              "
            >
              DealerPro Inventory
            </div>

            {/* Heading */}

            <h2
              className="
                text-3xl
                font-bold
                tracking-tight
                text-slate-900
                transition-colors
                duration-300

                dark:text-white

                sm:text-4xl
                lg:text-[42px]
              "
            >
              Featured Vehicles
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
                duration-300

                dark:text-slate-400
              "
            >
              Explore our latest dealer inventory and discover quality
              vehicles ready for your next customer.
            </p>

          </div>

          {/* View All */}

          <button
            type="button"
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
              hover:border-blue-200
              hover:bg-blue-50
              hover:text-blue-600

              dark:border-slate-700
              dark:bg-[#0b1a2b]
              dark:text-slate-300
              dark:hover:border-blue-500/50
              dark:hover:bg-blue-500/10
              dark:hover:text-blue-400
            "
          >
            View all inventory

            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

        </div>

        {/* =================================================
            DESKTOP VEHICLE SHOWCASE
        ================================================= */}

        <div
          className="
            hidden
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-sm
            transition-colors
            duration-300

            dark:border-slate-700/70
            dark:bg-[#0b1a2b]
            dark:shadow-black/30

            lg:block
          "
        >
          <div className="grid grid-cols-12">

            {/* LEFT LARGE CAR */}

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
              />
            </div>

            {/* MIDDLE */}

            <div
              className="
                col-span-4
                border-r
                border-slate-200

                dark:border-slate-700/70
              "
            >
              <div className="grid h-full grid-rows-2">

                <VehicleBlock vehicle={vehicles[1]} />

                <VehicleBlock
                  vehicle={vehicles[2]}
                  borderTop
                />

              </div>
            </div>

            {/* RIGHT */}

            <div className="col-span-3">

              <div className="grid h-full grid-rows-2">

                <VehicleBlock vehicle={vehicles[3]} />

                <VehicleBlock
                  vehicle={vehicles[5]}
                  borderTop
                />

              </div>

            </div>

          </div>

          {/* BOTTOM FEATURED VEHICLE */}

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
            />
          </div>

        </div>

        {/* =================================================
            TABLET
        ================================================= */}

        <div className="hidden gap-3 sm:grid sm:grid-cols-2 lg:hidden">

          {vehicles.map((vehicle) => (
            <VehicleBlock
              key={vehicle.id}
              vehicle={vehicle}
              tablet
            />
          ))}

        </div>

        {/* =================================================
            MOBILE
        ================================================= */}

        <div className="grid gap-3 sm:hidden">

          {vehicles.map((vehicle) => (
            <VehicleBlock
              key={vehicle.id}
              vehicle={vehicle}
              mobile
            />
          ))}

        </div>

        {/* =================================================
            FOOTER CTA
        ================================================= */}

        <div
          className="
            mt-6
            flex
            flex-col
            gap-4
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
            transition-colors
            duration-300

            dark:border-slate-700/70
            dark:bg-[#0b1a2b]
            dark:shadow-black/30

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <div>

            <h3
              className="
                text-sm
                font-bold
                text-slate-900
                transition-colors
                duration-300

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
                transition-colors
                duration-300

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
              transition-all
              duration-300
              hover:bg-blue-700
            "
          >
            Manage inventory

            <ArrowRight
              size={13}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

        </div>

      </div>
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
}

const VehicleBlock = ({
  vehicle,
  large = false,
  horizontal = false,
  borderTop = false,
  tablet = false,
  mobile = false,
}: VehicleBlockProps) => {

  /* =========================================================
     HORIZONTAL CARD
  ========================================================= */

  if (horizontal) {
    return (
      <div
        className="
          group
          flex
          min-h-[220px]
          items-center
          overflow-hidden
          bg-white
          transition-colors
          duration-300
          hover:bg-slate-50

          dark:bg-[#0b1a2b]
          dark:hover:bg-[#0e2135]
        "
      >

        <div
          className="
            flex
            w-[48%]
            items-center
            justify-center
            self-stretch
            bg-[#f4f7fa]
            transition-colors
            duration-300

            dark:bg-[#101f33]
          "
        >

          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="
              h-[210px]
              w-full
              object-contain
              px-5
              transition
              duration-500
              group-hover:scale-105
            "
          />

        </div>

        <div className="flex-1 px-8 py-6">

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
              transition-colors
              duration-300

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
              transition-colors
              duration-300

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

      </div>
    );
  }

  /* =========================================================
     NORMAL / LARGE CARD
  ========================================================= */

  return (
    <div
      className={`
        group
        overflow-hidden
        bg-white
        transition-colors
        duration-300
        hover:bg-slate-50

        dark:bg-[#0b1a2b]
        dark:hover:bg-[#0e2135]

        ${
          borderTop
            ? "border-t border-slate-200 dark:border-slate-700/70"
            : ""
        }

        ${
          tablet
            ? "rounded-2xl border border-slate-200 shadow-sm dark:border-slate-700/70 dark:shadow-black/30"
            : ""
        }

        ${
          mobile
            ? "rounded-2xl border border-slate-200 shadow-sm dark:border-slate-700/70 dark:shadow-black/30"
            : ""
        }
      `}
    >

      {/* ================= IMAGE ================= */}

      <div
        className={`
          relative
          overflow-hidden
          bg-[#f3f6fa]
          transition-colors
          duration-300

          dark:bg-[#101f33]

          ${
            large
              ? "h-[310px]"
              : tablet
              ? "h-[210px]"
              : mobile
              ? "h-[210px]"
              : "h-[170px]"
          }
        `}
      >

        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="
            h-full
            w-full
            object-cover
            object-center
            transition
            duration-700
            group-hover:scale-105
          "
        />

        {/* Image overlay */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/20
            via-transparent
            to-transparent
          "
        />

        {/* Category */}

        <div
          className="
            absolute
            left-4
            top-4
            rounded-md
            bg-white/95
            px-2.5
            py-1
            text-[8px]
            font-bold
            uppercase
            tracking-wide
            text-slate-700
            shadow-sm

            dark:bg-[#0b1a2b]/95
            dark:text-slate-200
          "
        >
          {vehicle.category}
        </div>

        {/* Price */}

        <div className="absolute bottom-4 left-4">

          <p className="text-[8px] text-white/80">
            Starting from
          </p>

          <p
            className={`font-bold text-white ${
              large ? "text-lg" : "text-sm"
            }`}
          >
            {vehicle.price}
          </p>

        </div>

      </div>

      {/* ================= CONTENT ================= */}

      <div className={`${large ? "p-5" : "p-4"}`}>

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
                transition-colors
                duration-300

                dark:text-white

                ${
                  large
                    ? "text-base"
                    : "text-xs"
                }
              `}
            >
              {vehicle.name}
            </h3>

          </div>

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

    </div>
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
