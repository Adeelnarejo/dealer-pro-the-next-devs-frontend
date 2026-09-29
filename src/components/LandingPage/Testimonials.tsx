import { useEffect, useState } from "react";
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
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isChanging, setIsChanging] = useState(false);
  const [isHoveringCenter, setIsHoveringCenter] = useState(false);

  const previousCar = () => {
    setDirection("prev");
    setIsChanging(true);

    setActiveIndex((current) =>
      current === 0 ? cars.length - 1 : current - 1
    );

    setTimeout(() => {
      setIsChanging(false);
    }, 500);
  };

  const nextCar = () => {
    setDirection("next");
    setIsChanging(true);

    setActiveIndex((current) =>
      current === cars.length - 1 ? 0 : current + 1
    );

    setTimeout(() => {
      setIsChanging(false);
    }, 500);
  };

  const selectCar = (index: number) => {
    if (index === activeIndex) return;

    setDirection(index > activeIndex ? "next" : "prev");
    setIsChanging(true);
    setActiveIndex(index);

    setTimeout(() => {
      setIsChanging(false);
    }, 500);
  };

  const getCar = (offset: number): Car => {
    const index =
      (activeIndex + offset + cars.length) % cars.length;

    return cars[index];
  };

  const centerCar = getCar(0);
  const leftCar = getCar(-1);
  const rightCar = getCar(1);

  /* =========================================================
     AUTO RESET ANIMATION STATE
  ========================================================== */

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsChanging(false);
    }, 520);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  return (
    <section
      className="
        w-full
        overflow-hidden
        bg-[#f8fafc]
        py-14
        font-plus-jakarta
        transition-colors
        duration-500

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
              transition-all
              duration-500
              hover:-translate-y-0.5
              hover:shadow-lg
              hover:shadow-blue-500/10

              dark:bg-blue-500/10
              dark:text-blue-400
            "
          >
            Latest Offers
          </div>

          <h2
            className="
              text-3xl
              font-bold
              tracking-tight
              text-slate-900
              transition-all
              duration-500

              dark:text-white

              sm:text-4xl
              lg:text-[44px]
            "
          >
            Latest Car Rental Offers
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-xl
              text-[10px]
              leading-4
              text-slate-500
              transition-colors
              duration-500

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

        <div className="relative hidden h-[350px] items-center md:flex">

          {/* ===================================================
              LEFT CAR
          =================================================== */}

          <div
            className="
              group
              absolute
              left-[-80px]
              top-1/2
              w-[340px]
              -translate-y-1/2
              opacity-60
              transition-all
              duration-700
              ease-[cubic-bezier(0.22,1,0.36,1)]

              hover:scale-[1.03]
              hover:opacity-80

              lg:left-[-40px]
              lg:w-[390px]

              xl:left-[-10px]
              xl:w-[430px]
            "
          >
            <div
              className="
                relative
                transition-transform
                duration-700
                ease-out
                group-hover:-translate-x-2
                group-hover:rotate-[-1deg]
              "
            >
              <img
                src={leftCar.image}
                alt={leftCar.name}
                className="
                  h-[180px]
                  w-full
                  object-contain
                  drop-shadow-[0_20px_18px_rgba(15,23,42,0.16)]
                  transition-all
                  duration-700
                  group-hover:scale-105
                  lg:h-[200px]
                "
              />

              <div
                className="
                  mt-2
                  translate-x-1
                  px-3
                  opacity-80
                  transition-all
                  duration-500
                  group-hover:translate-x-3
                  group-hover:opacity-100
                "
              >
                <p
                  className="
                    text-[8px]
                    font-medium
                    text-slate-500

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
              group
              absolute
              left-[20%]
              top-1/2
              z-30
              flex
              h-10
              w-10
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

              hover:-translate-x-1
              hover:scale-110
              hover:border-blue-200
              hover:bg-blue-50
              hover:text-blue-600
              hover:shadow-lg
              hover:shadow-blue-500/10

              active:scale-95

              dark:border-slate-700
              dark:bg-[#0d1b2a]
              dark:text-slate-300
              dark:hover:border-blue-500/50
              dark:hover:bg-blue-500/10
              dark:hover:text-blue-400

              lg:left-[25%]
            "
          >
            <ChevronLeft
              size={17}
              className="
                transition-transform
                duration-300
                group-hover:-translate-x-0.5
              "
            />
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
            style={{
              perspective: "1200px",
            }}
            onMouseEnter={() => setIsHoveringCenter(true)}
            onMouseLeave={() => setIsHoveringCenter(false)}
          >
            <div
              className={`
                relative
                overflow-hidden
                rounded-xl
                border
                border-slate-200
                bg-white
                shadow-[0_20px_55px_rgba(15,23,42,0.10)]
                transition-all
                duration-500
                ease-out

                dark:border-slate-700/70
                dark:bg-[#0b1a2b]
                dark:shadow-[0_20px_55px_rgba(0,0,0,0.38)]

                ${
                  isHoveringCenter
                    ? "rotate-x-[1deg] rotate-y-[-2deg] -translate-y-1 shadow-[0_28px_70px_rgba(15,23,42,0.16)] dark:shadow-[0_28px_70px_rgba(0,0,0,0.48)]"
                    : ""
                }
              `}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* BLUE TOP LIGHT */}

              <div
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-0
                  z-30
                  h-[2px]
                  w-1/2
                  -translate-x-1/2
                  bg-gradient-to-r
                  from-transparent
                  via-blue-500
                  to-transparent
                  opacity-60
                  blur-[1px]
                "
              />

              {/* =================================================
                  CAR IMAGE
              ================================================= */}

              <div
                className="
                  relative
                  flex
                  h-[175px]
                  items-center
                  justify-center
                  overflow-hidden
                  bg-[#f8fafc]
                  px-4

                  dark:bg-[#101f33]

                  sm:h-[190px]
                "
              >
                {/* Glow */}

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

                {/* Animated car */}

                <div
                  key={centerCar.id}
                  className={`
                    relative
                    z-10
                    h-full
                    w-full
                    ${
                      isChanging
                        ? direction === "next"
                          ? "animate-[carSlideNext_500ms_cubic-bezier(0.22,1,0.36,1)]"
                          : "animate-[carSlidePrev_500ms_cubic-bezier(0.22,1,0.36,1)]"
                        : "animate-[carFloat_4s_ease-in-out_infinite]"
                    }
                  `}
                >
                  <img
                    src={centerCar.image}
                    alt={centerCar.name}
                    className="
                      h-full
                      w-full
                      object-contain
                      drop-shadow-[0_18px_18px_rgba(15,23,42,0.18)]
                      transition-transform
                      duration-500
                      hover:scale-[1.04]
                    "
                  />
                </div>

                {/* Image arrows */}

                <button
                  type="button"
                  onClick={previousCar}
                  aria-label="Previous"
                  className="
                    group/arrow
                    absolute
                    left-3
                    z-20
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-slate-100
                    bg-white/90
                    text-slate-500
                    shadow-sm
                    backdrop-blur-md
                    transition-all
                    duration-300

                    hover:scale-110
                    hover:border-blue-200
                    hover:bg-blue-50
                    hover:text-blue-600
                    hover:shadow-md

                    active:scale-90

                    dark:border-slate-600
                    dark:bg-[#17283d]/90
                    dark:text-slate-300
                    dark:hover:border-blue-500/50
                    dark:hover:bg-blue-500/10
                    dark:hover:text-blue-400
                  "
                >
                  <ChevronLeft
                    size={14}
                    className="transition-transform duration-300 group-hover/arrow:-translate-x-0.5"
                  />
                </button>

                <button
                  type="button"
                  onClick={nextCar}
                  aria-label="Next"
                  className="
                    group/arrow
                    absolute
                    right-3
                    z-20
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-slate-100
                    bg-white/90
                    text-slate-500
                    shadow-sm
                    backdrop-blur-md
                    transition-all
                    duration-300

                    hover:scale-110
                    hover:border-blue-200
                    hover:bg-blue-50
                    hover:text-blue-600
                    hover:shadow-md

                    active:scale-90

                    dark:border-slate-600
                    dark:bg-[#17283d]/90
                    dark:text-slate-300
                    dark:hover:border-blue-500/50
                    dark:hover:bg-blue-500/10
                    dark:hover:text-blue-400
                  "
                >
                  <ChevronRight
                    size={14}
                    className="transition-transform duration-300 group-hover/arrow:translate-x-0.5"
                  />
                </button>
              </div>

              {/* =================================================
                  DETAILS
              ================================================= */}

              <div
                key={`details-${centerCar.id}`}
                className="
                  border-t
                  border-slate-100
                  px-5
                  py-4
                  animate-[detailsIn_450ms_ease-out]

                  dark:border-slate-700/70
                "
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[9px] font-medium text-slate-400">
                      {centerCar.type}
                    </p>

                    <h3
                      className="
                        mt-0.5
                        text-sm
                        font-bold
                        text-slate-900

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
                    mt-3
                    flex
                    flex-wrap
                    items-center
                    gap-x-4
                    gap-y-2
                    border-t
                    border-slate-100
                    pt-3

                    dark:border-slate-700/70
                  "
                >
                  <InfoItem
                    icon={<Users size={11} />}
                    text={`${centerCar.seats} Seats`}
                  />

                  <InfoItem
                    icon={<Gauge size={11} />}
                    text={centerCar.mileage}
                  />

                  <InfoItem
                    icon={<MapPin size={11} />}
                    text={centerCar.location}
                  />

                  <div className="ml-auto text-[9px] text-slate-400">
                    From{" "}
                    <span
                      className="
                        font-bold
                        text-slate-800

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
              group
              absolute
              right-[-80px]
              top-1/2
              w-[340px]
              -translate-y-1/2
              opacity-60
              transition-all
              duration-700
              ease-[cubic-bezier(0.22,1,0.36,1)]

              hover:scale-[1.03]
              hover:opacity-80

              lg:right-[-40px]
              lg:w-[390px]

              xl:right-[-10px]
              xl:w-[430px]
            "
          >
            <div
              className="
                relative
                transition-transform
                duration-700
                ease-out
                group-hover:translate-x-2
                group-hover:rotate-[1deg]
              "
            >
              <img
                src={rightCar.image}
                alt={rightCar.name}
                className="
                  h-[180px]
                  w-full
                  object-contain
                  drop-shadow-[0_20px_18px_rgba(15,23,42,0.16)]
                  transition-all
                  duration-700
                  group-hover:scale-105
                  lg:h-[200px]
                "
              />

              <div
                className="
                  mt-2
                  px-3
                  opacity-80
                  transition-all
                  duration-500
                  group-hover:translate-x-[-6px]
                  group-hover:opacity-100
                "
              >
                <p
                  className="
                    text-[8px]
                    font-medium
                    text-slate-500

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
              group
              absolute
              right-[20%]
              top-1/2
              z-30
              flex
              h-10
              w-10
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

              hover:translate-x-1
              hover:scale-110
              hover:border-blue-200
              hover:bg-blue-50
              hover:text-blue-600
              hover:shadow-lg
              hover:shadow-blue-500/10

              active:scale-95

              dark:border-slate-700
              dark:bg-[#0d1b2a]
              dark:text-slate-300
              dark:hover:border-blue-500/50
              dark:hover:bg-blue-500/10
              dark:hover:text-blue-400

              lg:right-[25%]
            "
          >
            <ChevronRight
              size={17}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-0.5
              "
            />
          </button>
        </div>

        {/* =====================================================
            MOBILE SLIDER
        ===================================================== */}

        <div className="md:hidden">
          <div
            className="
              group/mobile
              relative
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-sm
              transition-all
              duration-500
              hover:-translate-y-1
              hover:shadow-xl
              hover:shadow-slate-900/10

              dark:border-slate-700/70
              dark:bg-[#0b1a2b]
              dark:shadow-black/30
            "
          >
            {/* IMAGE */}

            <div
              className="
                relative
                flex
                h-[210px]
                items-center
                justify-center
                overflow-hidden
                bg-[#f8fafc]
                p-4

                dark:bg-[#101f33]
              "
            >
              {/* Glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-1/2
                  h-40
                  w-40
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-blue-400/10
                  blur-3xl
                "
              />

              <div
                key={`mobile-${centerCar.id}`}
                className={`
                  relative
                  z-10
                  h-full
                  w-full

                  ${
                    isChanging
                      ? direction === "next"
                        ? "animate-[carSlideNext_500ms_cubic-bezier(0.22,1,0.36,1)]"
                        : "animate-[carSlidePrev_500ms_cubic-bezier(0.22,1,0.36,1)]"
                      : "animate-[carFloat_4s_ease-in-out_infinite]"
                  }
                `}
              >
                <img
                  src={centerCar.image}
                  alt={centerCar.name}
                  className="
                    h-full
                    w-full
                    object-contain
                    drop-shadow-[0_20px_20px_rgba(15,23,42,0.18)]
                  "
                />
              </div>

              {/* PREVIOUS */}

              <button
                type="button"
                onClick={previousCar}
                aria-label="Previous car"
                className="
                  group/arrow
                  absolute
                  left-3
                  z-20
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-white/95
                  text-slate-500
                  shadow-md
                  backdrop-blur-md
                  transition-all
                  duration-300

                  hover:scale-110
                  hover:bg-blue-50
                  hover:text-blue-600

                  active:scale-90

                  dark:bg-[#17283d]/95
                  dark:text-slate-300
                  dark:hover:bg-blue-500/10
                  dark:hover:text-blue-400
                "
              >
                <ChevronLeft
                  size={16}
                  className="transition-transform duration-300 group-hover/arrow:-translate-x-0.5"
                />
              </button>

              {/* NEXT */}

              <button
                type="button"
                onClick={nextCar}
                aria-label="Next car"
                className="
                  group/arrow
                  absolute
                  right-3
                  z-20
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-white/95
                  text-slate-500
                  shadow-md
                  backdrop-blur-md
                  transition-all
                  duration-300

                  hover:scale-110
                  hover:bg-blue-50
                  hover:text-blue-600

                  active:scale-90

                  dark:bg-[#17283d]/95
                  dark:text-slate-300
                  dark:hover:bg-blue-500/10
                  dark:hover:text-blue-400
                "
              >
                <ChevronRight
                  size={16}
                  className="transition-transform duration-300 group-hover/arrow:translate-x-0.5"
                />
              </button>
            </div>

            {/* DETAILS */}

            <div
              key={`mobile-details-${centerCar.id}`}
              className="
                border-t
                border-slate-100
                p-4
                animate-[detailsIn_450ms_ease-out]

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

                  dark:border-slate-700/70
                "
              >
                <InfoItem
                  icon={<Users size={11} />}
                  text={`${centerCar.seats} Seats`}
                />

                <InfoItem
                  icon={<Gauge size={11} />}
                  text={centerCar.mileage}
                />

                <InfoItem
                  icon={<MapPin size={11} />}
                  text={centerCar.location}
                />
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
            DOTS
        ===================================================== */}

        <div className="mt-7 flex justify-center gap-1.5">
          {cars.map((car, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={car.id}
                type="button"
                aria-label={`Go to ${car.name}`}
                onClick={() => selectCar(index)}
                className={`
                  relative
                  h-1.5
                  rounded-full
                  transition-all
                  duration-500
                  ease-out

                  ${
                    isActive
                      ? "w-8 bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.45)]"
                      : "w-1.5 bg-slate-300 hover:w-3 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600"
                  }
                `}
              >
                {isActive && (
                  <span
                    className="
                      absolute
                      inset-0
                      animate-pulse
                      rounded-full
                      bg-blue-400
                      opacity-40
                    "
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================
          CUSTOM ANIMATIONS
      ========================================================== */}

      <style>
        {`
          @keyframes carSlideNext {
            0% {
              opacity: 0;
              transform:
                translate3d(55px, 0, 0)
                scale(0.88)
                rotateY(-10deg);
              filter: blur(5px);
            }

            55% {
              opacity: 1;
              transform:
                translate3d(-5px, 0, 0)
                scale(1.03)
                rotateY(2deg);
              filter: blur(0);
            }

            100% {
              opacity: 1;
              transform:
                translate3d(0, 0, 0)
                scale(1)
                rotateY(0);
            }
          }

          @keyframes carSlidePrev {
            0% {
              opacity: 0;
              transform:
                translate3d(-55px, 0, 0)
                scale(0.88)
                rotateY(10deg);
              filter: blur(5px);
            }

            55% {
              opacity: 1;
              transform:
                translate3d(5px, 0, 0)
                scale(1.03)
                rotateY(-2deg);
              filter: blur(0);
            }

            100% {
              opacity: 1;
              transform:
                translate3d(0, 0, 0)
                scale(1)
                rotateY(0);
            }
          }

          @keyframes carFloat {
            0%,
            100% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-5px);
            }
          }

          @keyframes detailsIn {
            0% {
              opacity: 0;
              transform: translateY(8px);
            }

            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            [class*="animate-[carSlide"],
            [class*="animate-[carFloat"],
            [class*="animate-[detailsIn"] {
              animation: none !important;
            }
          }
        `}
      </style>
    </section>
  );
};

/* =========================================================
   INFO ITEM
========================================================= */

const InfoItem = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => {
  return (
    <div
      className="
        flex
        items-center
        gap-1.5
        text-[9px]
        text-slate-500
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:text-blue-500

        dark:text-slate-400
      "
    >
      <span className="text-blue-500">
        {icon}
      </span>

      {text}
    </div>
  );
};

export default Testimonials;