import { useNavigate } from "react-router-dom";
import { ArrowRight, Fuel, Users } from "lucide-react";

interface Car {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  seats: number;
  fuel: string;
  transmission: string;
}

const cars: Car[] = [
  {
    id: 1,
    name: "Toyota GR Supra",
    category: "Sports Car",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=900&q=85",
    seats: 2,
    fuel: "Petrol",
    transmission: "Automatic",
  },
  {
    id: 2,
    name: "Honda Civic",
    category: "Sedan",
    price: 95,
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=85",
    seats: 5,
    fuel: "Petrol",
    transmission: "Automatic",
  },
  {
    id: 3,
    name: "BMW M4",
    category: "Luxury",
    price: 220,
    image:
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=900&q=85",
    seats: 4,
    fuel: "Petrol",
    transmission: "Automatic",
  },
  {
    id: 4,
    name: "Toyota RAV4",
    category: "SUV",
    price: 130,
    image:
      "https://images.unsplash.com/photo-1568844293986-8c5c7e0b0b0e?auto=format&fit=crop&w=900&q=85",
    seats: 5,
    fuel: "Hybrid",
    transmission: "Automatic",
  },
];

const Stats = () => {
  const navigate = useNavigate();

  return (
    <section
      className="
        w-full
        bg-[#f8fafc]
        py-16
        font-plus-jakarta
        transition-colors duration-300
        dark:bg-[#020b16]
        sm:py-20
        lg:py-24
      "
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>

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
              Monthly Rent
            </span>

            <h2
              className="
                mt-3
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
              Monthly car for rent
            </h2>

            <p
              className="
                mt-2
                max-w-2xl
                text-xs
                leading-5
                text-gray-500
                transition-colors duration-300
                dark:text-slate-400
                sm:text-sm
              "
            >
              Choose from our extensive inventory of premium vehicles
              available for monthly rental.
            </p>

          </div>

          {/* Desktop View All */}

          <button
            type="button"
            onClick={() => navigate("/cars")}
            className="
              group
              hidden
              items-center
              gap-2
              text-sm
              font-semibold
              text-blue-600
              transition-all duration-300
              hover:text-blue-700
              dark:text-blue-400
              dark:hover:text-blue-300
              sm:flex
            "
          >
            View all available cars

            <ArrowRight
              size={17}
              className="
                transition-transform duration-300
                group-hover:translate-x-1
              "
            />
          </button>

        </div>

        {/* =====================================================
            CAR CARDS
        ===================================================== */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {cars.map((car) => (
            <div
              key={car.id}
              className="
                group
                overflow-hidden
                rounded-2xl
                border
                border-gray-100
                bg-white
                shadow-sm
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-xl
                dark:border-slate-700/70
                dark:bg-[#0b1a2b]
                dark:shadow-none
                dark:hover:bg-[#0e2135]
                dark:hover:shadow-[0_15px_40px_rgba(0,0,0,0.35)]
              "
            >

              {/* Image */}

              <div
                className="
                  relative
                  h-[190px]
                  overflow-hidden
                  bg-gray-100
                  dark:bg-[#101f33]
                "
              >

                <img
                  src={car.image}
                  alt={car.name}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform duration-500
                    group-hover:scale-105
                  "
                />

                {/* Category */}

                <div
                  className="
                    absolute
                    left-3 top-3
                    rounded-full
                    bg-white/90
                    px-3 py-1
                    text-[10px]
                    font-semibold
                    text-gray-700
                    shadow-sm
                    backdrop-blur-sm
                    transition-colors duration-300
                    dark:bg-[#0b1a2b]/90
                    dark:text-slate-200
                  "
                >
                  {car.category}
                </div>

              </div>

              {/* Details */}

              <div className="p-4">

                <div className="flex items-start justify-between gap-2">

                  <div>

                    <h3
                      className="
                        text-base
                        font-bold
                        text-gray-900
                        transition-colors duration-300
                        dark:text-white
                      "
                    >
                      {car.name}
                    </h3>

                    <p
                      className="
                        mt-1
                        text-[11px]
                        text-gray-400
                        transition-colors duration-300
                        dark:text-slate-500
                      "
                    >
                      Available for monthly rental
                    </p>

                  </div>

                  <div className="text-right">

                    <p
                      className="
                        text-lg
                        font-bold
                        text-blue-600
                        dark:text-blue-400
                      "
                    >
                      ${car.price}
                    </p>

                    <p
                      className="
                        text-[10px]
                        text-gray-400
                        dark:text-slate-500
                      "
                    >
                      / month
                    </p>

                  </div>

                </div>

                {/* Specs */}

                <div
                  className="
                    mt-4
                    flex
                    items-center
                    gap-3
                    border-t
                    border-gray-100
                    pt-3
                    transition-colors duration-300
                    dark:border-slate-700/70
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-1
                      text-[10px]
                      text-gray-500
                      dark:text-slate-400
                    "
                  >
                    <Users size={13} />
                    {car.seats} Seats
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-1
                      text-[10px]
                      text-gray-500
                      dark:text-slate-400
                    "
                  >
                    <Fuel size={13} />
                    {car.fuel}
                  </div>

                  <div
                    className="
                      text-[10px]
                      text-gray-500
                      dark:text-slate-400
                    "
                  >
                    {car.transmission}
                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>

        {/* =====================================================
            MOBILE VIEW ALL
        ===================================================== */}

        <div className="mt-7 flex justify-center sm:hidden">

          <button
            type="button"
            onClick={() => navigate("/cars")}
            className="
              flex
              items-center
              gap-2
              rounded-full
              bg-blue-600
              px-5 py-2.5
              text-xs
              font-semibold
              text-white
              shadow-md
              shadow-blue-600/20
              transition-all duration-300
              hover:bg-blue-700
              dark:bg-blue-600
              dark:hover:bg-blue-500
            "
          >
            View all available cars

            <ArrowRight size={15} />
          </button>

        </div>

      </div>
    </section>
  );
};

export default Stats;