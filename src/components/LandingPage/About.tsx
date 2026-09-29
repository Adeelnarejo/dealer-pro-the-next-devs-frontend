import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Brand {
  name: string;
  cars: number;
  logo: string;
}

const brands: Brand[] = [
  {
    name: "Mercedes-Benz",
    cars: 368,
    logo: "https://cdn.simpleicons.org/mercedes",
  },
  {
    name: "BMW",
    cars: 104,
    logo: "https://cdn.simpleicons.org/bmw",
  },
  {
    name: "Ferrari",
    cars: 18,
    logo: "https://cdn.simpleicons.org/ferrari",
  },
  {
    name: "Lamborghini",
    cars: 44,
    logo: "https://cdn.simpleicons.org/lamborghini",
  },
  {
    name: "Tesla",
    cars: 5,
    logo: "https://cdn.simpleicons.org/tesla",
  },
  {
    name: "Audi",
    cars: 86,
    logo: "https://cdn.simpleicons.org/audi",
  },
  {
    name: "Porsche",
    cars: 32,
    logo: "https://cdn.simpleicons.org/porsche",
  },
  {
    name: "Toyota",
    cars: 156,
    logo: "https://cdn.simpleicons.org/toyota",
  },
  {
    name: "Volkswagen",
    cars: 124,
    logo: "https://cdn.simpleicons.org/volkswagen",
  },
  {
    name: "Ford",
    cars: 72,
    logo: "https://cdn.simpleicons.org/ford",
  },
  {
    name: "Honda",
    cars: 61,
    logo: "https://cdn.simpleicons.org/honda",
  },
];

const Brands = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleBrands = showAll ? brands : brands.slice(0, 5);

  return (
    <section
      id="brands"
      className="
        w-full
        bg-[#f8fafc]
        py-14
        font-plus-jakarta
        transition-colors duration-300
        dark:bg-[#020b16]
        sm:py-16
        lg:py-20
      "
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            HEADING
        ===================================================== */}

        <div className="mx-auto max-w-2xl text-center">

          <span
            className="
              inline-flex
              rounded-md
              bg-blue-50
              px-3 py-1.5
              text-[10px]
              font-semibold
              text-blue-600
              transition-colors duration-300
              dark:bg-blue-500/10
              dark:text-blue-400
              sm:text-xs
            "
          >
            Top Brand Cars
          </span>

          <h2
            className="
              mt-4
              text-3xl
              font-bold
              tracking-tight
              text-gray-900
              transition-colors duration-300
              dark:text-white
              sm:text-4xl
              lg:text-[42px]
            "
          >
            Cars from Top Brands
          </h2>

          <p
            className="
              mx-auto
              mt-2
              max-w-xl
              text-xs
              leading-5
              text-gray-500
              transition-colors duration-300
              dark:text-slate-400
              sm:text-sm
            "
          >
            Explore quality vehicles from the world's most trusted
            automotive brands.
          </p>

        </div>

        {/* =====================================================
            BRAND CARDS
        ===================================================== */}

        <div
          className={`mt-9 grid gap-3 ${
            showAll
              ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
              : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
          }`}
        >
          {visibleBrands.map((brand) => (
            <div
              key={brand.name}
              className="
                group
                flex
                min-h-[82px]
                items-center
                gap-3
                rounded-lg
                border
                border-gray-100
                bg-white
                px-3 py-3
                shadow-sm
                transition-all duration-300
                hover:-translate-y-0.5
                hover:border-blue-100
                hover:shadow-md
                dark:border-slate-700/70
                dark:bg-[#0b1a2b]
                dark:shadow-none
                dark:hover:border-blue-500/30
                dark:hover:bg-[#0e2135]
                dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]
                sm:min-h-[88px]
                sm:px-4
              "
            >

              {/* Logo */}

              <div
                className="
                  flex
                  h-10 w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gray-100
                  bg-white
                  transition-colors duration-300
                  dark:border-slate-700
                  dark:bg-[#101f33]
                  sm:h-11 sm:w-11
                "
              >
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="
                    h-7 w-7
                    object-contain
                    transition-all duration-300
                    sm:h-8 sm:w-8
                  "
                  loading="lazy"
                />
              </div>

              {/* Brand information */}

              <div className="min-w-0">

                <h3
                  className="
                    truncate
                    text-[11px]
                    font-bold
                    text-gray-800
                    transition-colors duration-300
                    dark:text-white
                    sm:text-xs
                  "
                >
                  {brand.name}
                </h3>

                <p
                  className="
                    mt-1
                    text-[10px]
                    text-gray-400
                    transition-colors duration-300
                    dark:text-slate-500
                    sm:text-[11px]
                  "
                >
                  {brand.cars} Cars
                </p>

              </div>

            </div>
          ))}
        </div>

        {/* =====================================================
            VIEW ALL BUTTON
        ===================================================== */}

        <div className="mt-7 flex justify-center">

          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="
              flex
              items-center
              gap-2
              rounded-full
              bg-blue-600
              px-5 py-2.5
              text-[11px]
              font-semibold
              text-white
              shadow-md
              shadow-blue-600/20
              transition-all duration-300
              hover:bg-blue-700
              hover:shadow-lg
              active:scale-95
              dark:bg-blue-600
              dark:hover:bg-blue-500
            "
          >
            {showAll ? "Show Less" : "View all Brands"}

            {showAll ? (
              <ChevronUp size={14} />
            ) : (
              <ChevronDown size={14} />
            )}
          </button>

        </div>

      </div>
    </section>
  );
};

export default Brands;