import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Users,
  Gauge,
} from "lucide-react";

interface Car {
  id: number;
  name: string;
  type: string;
  image: string;
  price: string;
  monthlyPrice: string;
  seats: number;
  mileage: string;
  location: string;
}

const cars: Car[] = [
  {
    id: 1,
    name: "Ford Mustang",
    type: "Sports Car",
    image:
      "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=90",
    price: "$179",
    monthlyPrice: "$919",
    seats: 4,
    mileage: "2,400 km",
    location: "New York",
  },
  {
    id: 2,
    name: "Mercedes-Benz C-Class",
    type: "Luxury Sedan",
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=90",
    price: "$199",
    monthlyPrice: "$1,099",
    seats: 5,
    mileage: "1,800 km",
    location: "Los Angeles",
  },
  {
    id: 3,
    name: "BMW M4",
    type: "Premium Sports",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=90",
    price: "$219",
    monthlyPrice: "$1,199",
    seats: 4,
    mileage: "1,500 km",
    location: "Miami",
  },
  {
    id: 4,
    name: "Porsche 911",
    type: "Sports Car",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=90",
    price: "$299",
    monthlyPrice: "$1,499",
    seats: 2,
    mileage: "1,200 km",
    location: "Chicago",
  },
  {
    id: 5,
    name: "Audi A6",
    type: "Luxury Sedan",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=90",
    price: "$189",
    monthlyPrice: "$999",
    seats: 5,
    mileage: "2,100 km",
    location: "Houston",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState<number>(2);

  const previousCar = () => {
    setActiveIndex((current) =>
      current === 0 ? cars.length - 1 : current - 1
    );
  };

  const nextCar = () => {
    setActiveIndex((current) =>
      current === cars.length - 1 ? 0 : current + 1
    );
  };

  const getCar = (offset: number): Car => {
    const index =
      (activeIndex + offset + cars.length) % cars.length;

    return cars[index];
  };

  const centerCar = getCar(0);
  const leftCar = getCar(-1);
  const rightCar = getCar(1);

  return (
    <section
      className="
        w-full
        overflow-hidden
        bg-[#f8fafc]
        py-14
        font-plus-jakarta
        transition-colors
        duration-300

        dark:bg-[#020b16]

        sm:py-16
        lg:py-20
      "
    >
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">

          {/* Badge */}

          <div
            className="
              mb-3
              inline-flex
              items-center
              rounded-full
              bg-blue-50
              px-3
              py-1
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-blue-500
              transition-colors
              duration-300

              dark:bg-blue-500/10
              dark:text-blue-400
            "
          >
            Latest Offers
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
              lg:text-[44px]
            "
          >
            Latest Car Rental Offers
          </h2>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-3
              max-w-xl
              text-[10px]
              leading-4
              text-slate-500
              transition-colors
              duration-300

              dark:text-slate-400

              sm:text-xs
              sm:leading-5
            "
          >
            Choose among our latest rental vehicles and find a car that
            perfectly fits your journey, lifestyle, and budget.
          </p>
        </div>

        {/* =====================================================
            DESKTOP / TABLET SLIDER
        ===================================================== */}

        <div className="relative hidden h-[330px] items-center md:flex">

          {/* ===================================================
              LEFT CAR
          =================================================== */}

          <div
            className="
              absolute
              left-[-80px]
              top-1/2
              w-[340px]
              -translate-y-1/2
              opacity-70
              transition-all
              duration-500

              lg:left-[-40px]
              lg:w-[390px]

              xl:left-[-10px]
              xl:w-[430px]
            "
          >
            <div className="relative">

              <img
                src={leftCar.image}
                alt={leftCar.name}
                className="
                  h-[180px]
                  w-full
                  object-contain
                  drop-shadow-lg
                  lg:h-[200px]
                "
              />

              <div className="mt-2 px-3">

                <p
                  className="
                    text-[8px]
                    font-medium
                    text-slate-500
                    transition-colors
                    duration-300

                    dark:text-slate-400
                  "
                >
                  {leftCar.type}
                </p>

                <h3
                  className="
                    mt-0.5
                    text-xs
                    font-semibold
                    text-slate-800
                    transition-colors
                    duration-300

                    dark:text-slate-200
                  "
                >
                  {leftCar.name}
                </h3>

              </div>
            </div>
          </div>

          {/* ===================================================
              LEFT ARROW
          =================================================== */}

          <button
            type="button"
            onClick={previousCar}
            aria-label="Previous car"
            className="
              absolute
              left-[20%]
              top-1/2
              z-30
              flex
              h-9
              w-9
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white
              text-slate-500
              shadow-sm
              transition-all
              duration-300
              hover:border-blue-200
              hover:bg-blue-50
              hover:text-blue-600

              dark:border-slate-700
              dark:bg-[#0d1b2a]
              dark:text-slate-300
              dark:hover:border-blue-500/50
              dark:hover:bg-blue-500/10
              dark:hover:text-blue-400

              lg:left-[25%]
            "
          >
            <ChevronLeft size={17} />
          </button>

          {/* ===================================================
              CENTER CARD
          =================================================== */}

          <div
            className="
              absolute
              left-1/2
              top-1/2
              z-20
              w-[350px]
              -translate-x-1/2
              -translate-y-1/2

              sm:w-[400px]
              lg:w-[440px]
            "
          >
            <div
              className="
                overflow-hidden
                rounded-xl
                border
                border-slate-200
                bg-white
                shadow-[0_15px_45px_rgba(15,23,42,0.08)]
                transition-colors
                duration-300

                dark:border-slate-700/70
                dark:bg-[#0b1a2b]
                dark:shadow-[0_15px_45px_rgba(0,0,0,0.35)]
              "
            >

              {/* Car Image */}

              <div
                className="
                  relative
                  flex
                  h-[175px]
                  items-center
                  justify-center
                  bg-[#f8fafc]
                  px-4
                  transition-colors
                  duration-300

                  dark:bg-[#101f33]

                  sm:h-[190px]
                "
              >

                <img
                  src={centerCar.image}
                  alt={centerCar.name}
                  className="
                    h-full
                    w-full
                    object-contain
                    transition-all
                    duration-500
                  "
                />

                {/* Image arrows */}

                <button
                  type="button"
                  onClick={previousCar}
                  aria-label="Previous"
                  className="
                    absolute
                    left-3
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-slate-500
                    shadow-sm
                    transition-all
                    duration-300
                    hover:bg-blue-50
                    hover:text-blue-600

                    dark:bg-[#17283d]
                    dark:text-slate-300
                    dark:hover:bg-blue-500/10
                    dark:hover:text-blue-400
                  "
                >
                  <ChevronLeft size={14} />
                </button>

                <button
                  type="button"
                  onClick={nextCar}
                  aria-label="Next"
                  className="
                    absolute
                    right-3
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-slate-500
                    shadow-sm
                    transition-all
                    duration-300
                    hover:bg-blue-50
                    hover:text-blue-600

                    dark:bg-[#17283d]
                    dark:text-slate-300
                    dark:hover:bg-blue-500/10
                    dark:hover:text-blue-400
                  "
                >
                  <ChevronRight size={14} />
                </button>

              </div>

              {/* Details */}

              <div
                className="
                  border-t
                  border-slate-100
                  px-5
                  py-4
                  transition-colors
                  duration-300

                  dark:border-slate-700/70
                "
              >

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <p
                      className="
                        text-[9px]
                        font-medium
                        text-slate-400
                      "
                    >
                      {centerCar.type}
                    </p>

                    <h3
                      className="
                        mt-0.5
                        text-sm
                        font-bold
                        text-slate-900
                        transition-colors
                        duration-300

                        dark:text-white

                        sm:text-base
                      "
                    >
                      {centerCar.name}
                    </h3>

                  </div>

                  <div className="text-right">

                    <p className="text-[9px] text-slate-400">
                      From
                    </p>

                    <p
                      className="
                        text-sm
                        font-bold
                        text-slate-900
                        transition-colors
                        duration-300

                        dark:text-white
                      "
                    >
                      {centerCar.price}

                      <span className="text-[9px] font-normal text-slate-400">
                        /day
                      </span>
                    </p>

                  </div>

                </div>

                {/* Bottom information */}

                <div
                  className="
                    mt-3
                    flex
                    flex-wrap
                    items-center
                    gap-x-4
                    gap-y-2
                    border-t
                    border-slate-100
                    pt-3
                    transition-colors
                    duration-300

                    dark:border-slate-700/70
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-1.5
                      text-[9px]
                      text-slate-500
                      transition-colors
                      duration-300

                      dark:text-slate-400
                    "
                  >
                    <Users size={11} />
                    {centerCar.seats} Seats
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-1.5
                      text-[9px]
                      text-slate-500
                      transition-colors
                      duration-300

                      dark:text-slate-400
                    "
                  >
                    <Gauge size={11} />
                    {centerCar.mileage}
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-1.5
                      text-[9px]
                      text-slate-500
                      transition-colors
                      duration-300

                      dark:text-slate-400
                    "
                  >
                    <MapPin size={11} />
                    {centerCar.location}
                  </div>

                  <div
                    className="
                      ml-auto
                      text-[9px]
                      text-slate-400
                    "
                  >
                    From{" "}

                    <span
                      className="
                        font-bold
                        text-slate-800
                        transition-colors
                        duration-300

                        dark:text-slate-200
                      "
                    >
                      {centerCar.monthlyPrice}
                    </span>

                    /month
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* ===================================================
              RIGHT CAR
          =================================================== */}

          <div
            className="
              absolute
              right-[-80px]
              top-1/2
              w-[340px]
              -translate-y-1/2
              opacity-70
              transition-all
              duration-500

              lg:right-[-40px]
              lg:w-[390px]

              xl:right-[-10px]
              xl:w-[430px]
            "
          >
            <div className="relative">

              <img
                src={rightCar.image}
                alt={rightCar.name}
                className="
                  h-[180px]
                  w-full
                  object-contain
                  drop-shadow-lg
                  lg:h-[200px]
                "
              />

              <div className="mt-2 px-3">

                <p
                  className="
                    text-[8px]
                    font-medium
                    text-slate-500
                    transition-colors
                    duration-300

                    dark:text-slate-400
                  "
                >
                  {rightCar.type}
                </p>

                <h3
                  className="
                    mt-0.5
                    text-xs
                    font-semibold
                    text-slate-800
                    transition-colors
                    duration-300

                    dark:text-slate-200
                  "
                >
                  {rightCar.name}
                </h3>

              </div>
            </div>
          </div>

          {/* ===================================================
              RIGHT ARROW
          =================================================== */}

          <button
            type="button"
            onClick={nextCar}
            aria-label="Next car"
            className="
              absolute
              right-[20%]
              top-1/2
              z-30
              flex
              h-9
              w-9
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white
              text-slate-500
              shadow-sm
              transition-all
              duration-300
              hover:border-blue-200
              hover:bg-blue-50
              hover:text-blue-600

              dark:border-slate-700
              dark:bg-[#0d1b2a]
              dark:text-slate-300
              dark:hover:border-blue-500/50
              dark:hover:bg-blue-500/10
              dark:hover:text-blue-400

              lg:right-[25%]
            "
          >
            <ChevronRight size={17} />
          </button>

        </div>

        {/* =====================================================
            MOBILE SLIDER
        ===================================================== */}

        <div className="md:hidden">

          <div
            className="
              relative
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
            "
          >

            {/* Image */}

            <div
              className="
                relative
                flex
                h-[210px]
                items-center
                justify-center
                bg-[#f8fafc]
                p-4
                transition-colors
                duration-300

                dark:bg-[#101f33]
              "
            >

              <img
                src={centerCar.image}
                alt={centerCar.name}
                className="h-full w-full object-contain"
              />

              {/* Previous */}

              <button
                type="button"
                onClick={previousCar}
                aria-label="Previous car"
                className="
                  absolute
                  left-3
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  text-slate-500
                  shadow-sm
                  transition-all
                  duration-300
                  hover:bg-blue-50
                  hover:text-blue-600

                  dark:bg-[#17283d]
                  dark:text-slate-300
                  dark:hover:bg-blue-500/10
                  dark:hover:text-blue-400
                "
              >
                <ChevronLeft size={16} />
              </button>

              {/* Next */}

              <button
                type="button"
                onClick={nextCar}
                aria-label="Next car"
                className="
                  absolute
                  right-3
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  text-slate-500
                  shadow-sm
                  transition-all
                  duration-300
                  hover:bg-blue-50
                  hover:text-blue-600

                  dark:bg-[#17283d]
                  dark:text-slate-300
                  dark:hover:bg-blue-500/10
                  dark:hover:text-blue-400
                "
              >
                <ChevronRight size={16} />
              </button>

            </div>

            {/* Details */}

            <div
              className="
                border-t
                border-slate-100
                p-4
                transition-colors
                duration-300

                dark:border-slate-700/70
              "
            >

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-[9px] text-slate-400">
                    {centerCar.type}
                  </p>

                  <h3
                    className="
                      mt-1
                      text-base
                      font-bold
                      text-slate-900
                      transition-colors
                      duration-300

                      dark:text-white
                    "
                  >
                    {centerCar.name}
                  </h3>

                </div>

                <div className="text-right">

                  <p className="text-[9px] text-slate-400">
                    From
                  </p>

                  <p
                    className="
                      font-bold
                      text-slate-900
                      transition-colors
                      duration-300

                      dark:text-white
                    "
                  >
                    {centerCar.price}

                    <span className="text-[9px] font-normal text-slate-400">
                      /day
                    </span>
                  </p>

                </div>

              </div>

              <div
                className="
                  mt-4
                  flex
                  flex-wrap
                  gap-3
                  border-t
                  border-slate-100
                  pt-3
                  transition-colors
                  duration-300

                  dark:border-slate-700/70
                "
              >

                <span
                  className="
                    flex
                    items-center
                    gap-1
                    text-[9px]
                    text-slate-500
                    transition-colors
                    duration-300

                    dark:text-slate-400
                  "
                >
                  <Users size={11} />
                  {centerCar.seats} Seats
                </span>

                <span
                  className="
                    flex
                    items-center
                    gap-1
                    text-[9px]
                    text-slate-500
                    transition-colors
                    duration-300

                    dark:text-slate-400
                  "
                >
                  <Gauge size={11} />
                  {centerCar.mileage}
                </span>

                <span
                  className="
                    flex
                    items-center
                    gap-1
                    text-[9px]
                    text-slate-500
                    transition-colors
                    duration-300

                    dark:text-slate-400
                  "
                >
                  <MapPin size={11} />
                  {centerCar.location}
                </span>

              </div>

              <div
                className="
                  mt-3
                  text-right
                  text-[9px]
                  text-slate-400
                "
              >
                Monthly from{" "}

                <span
                  className="
                    font-bold
                    text-slate-800
                    transition-colors
                    duration-300

                    dark:text-slate-200
                  "
                >
                  {centerCar.monthlyPrice}
                </span>

              </div>

            </div>
          </div>
        </div>

        {/* =====================================================
            SLIDER DOTS
        ===================================================== */}

        <div className="mt-7 flex justify-center gap-1.5">

          {cars.map((car, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={car.id}
                type="button"
                aria-label={`Go to ${car.name}`}
                onClick={() => setActiveIndex(index)}
                className={`
                  h-1.5
                  rounded-full
                  transition-all
                  duration-300

                  ${
                    isActive
                      ? "w-6 bg-blue-600"
                      : "w-1.5 bg-slate-300 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600"
                  }
                `}
              />
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default Testimonials;
