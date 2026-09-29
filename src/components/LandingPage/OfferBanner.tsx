import { useRef, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Tag,
  Fuel,
  Users,
  Gauge,
  Sparkles,
} from "lucide-react";

interface OfferCar {
  id: number;
  name: string;
  category: string;
  price: number;
  discount: number;
  image: string;
  seats: number;
  fuel: string;
  transmission: string;
}

const offerCars: OfferCar[] = [
  {
    id: 1,
    name: "Porsche 911",
    category: "Sports Car",
    price: 320,
    discount: 25,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=90",
    seats: 2,
    fuel: "Petrol",
    transmission: "Automatic",
  },
  {
    id: 2,
    name: "BMW M4",
    category: "Luxury",
    price: 280,
    discount: 20,
    image:
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1400&q=90",
    seats: 4,
    fuel: "Petrol",
    transmission: "Automatic",
  },
  {
    id: 3,
    name: "Mercedes AMG GT",
    category: "Performance",
    price: 350,
    discount: 22,
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1400&q=90",
    seats: 2,
    fuel: "Petrol",
    transmission: "Automatic",
  },
  {
    id: 4,
    name: "Range Rover Sport",
    category: "SUV",
    price: 260,
    discount: 18,
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1400&q=90",
    seats: 5,
    fuel: "Hybrid",
    transmission: "Automatic",
  },
  {
    id: 5,
    name: "Audi R8",
    category: "Supercar",
    price: 390,
    discount: 25,
    image:
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1400&q=90",
    seats: 2,
    fuel: "Petrol",
    transmission: "Automatic",
  },
  {
    id: 6,
    name: "Lamborghini Huracan",
    category: "Supercar",
    price: 520,
    discount: 20,
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1400&q=90",
    seats: 2,
    fuel: "Petrol",
    transmission: "Automatic",
  },
  {
    id: 7,
    name: "Toyota Supra",
    category: "Sports Car",
    price: 210,
    discount: 15,
    image:
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1400&q=90",
    seats: 2,
    fuel: "Petrol",
    transmission: "Automatic",
  },
  {
    id: 8,
    name: "Tesla Model S",
    category: "Electric",
    price: 230,
    discount: 17,
    image:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1400&q=90",
    seats: 5,
    fuel: "Electric",
    transmission: "Automatic",
  },
];

const OfferBanner = () => {
  const [showAll, setShowAll] = useState(false);
  const [activeCar, setActiveCar] = useState(0);

  const allCarsRef = useRef<HTMLElement | null>(null);
  const bannerRef = useRef<HTMLElement | null>(null);

  const openAllCars = () => {
    setShowAll(true);

    setTimeout(() => {
      allCarsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
  };

  const closeAllCars = () => {
    setShowAll(false);

    setTimeout(() => {
      bannerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x =
      (e.clientX - rect.left) / rect.width;

    const index = Math.min(
      offerCars.length - 1,
      Math.floor(x * offerCars.length)
    );

    setActiveCar(index);
  };

  const selectedCar = offerCars[activeCar];

  return (
    <div className="w-full font-plus-jakarta">
      {/* =========================================================
          OFFER BANNER
      ========================================================== */}

      <section
        ref={bannerRef}
        className="
          w-full
          bg-white
          px-4
          py-10
          transition-colors
          duration-500
          dark:bg-[#06111f]

          sm:px-6
          sm:py-14

          lg:px-8
          lg:py-20
        "
      >
        <div className="mx-auto max-w-7xl">
          <div
            className="
              group
              relative
              min-h-[300px]
              overflow-hidden
              rounded-[28px]
              border
              border-white/20
              bg-[#7898b8]
              shadow-[0_25px_70px_rgba(15,23,42,0.18)]
              transition-all
              duration-500
              hover:shadow-[0_35px_90px_rgba(15,23,42,0.25)]

              dark:border-white/10
              dark:bg-[#101f33]
              dark:shadow-[0_25px_80px_rgba(0,0,0,0.4)]

              sm:min-h-[330px]
              lg:min-h-[390px]
            "
          >
            {/* CAR IMAGE */}

            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=90"
              alt="Premium sports car"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                object-center
                transition-transform
                duration-[1200ms]
                ease-out
                group-hover:scale-[1.045]
              "
            />

            {/* MAIN OVERLAY */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-r
                from-[#526f8d]/[0.98]
                via-[#7898b8]/[0.86]
                to-transparent

                dark:from-[#050d18]/[0.98]
                dark:via-[#0b2035]/[0.86]
                dark:to-transparent
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/30
                via-transparent
                to-transparent
                dark:from-black/50
              "
            />

            {/* GLOW */}

            <div
              className="
                absolute
                -right-24
                -top-28
                h-80
                w-80
                rounded-full
                bg-blue-300/20
                blur-[90px]
                transition-transform
                duration-1000
                group-hover:scale-125
              "
            />

            <div
              className="
                absolute
                -bottom-32
                left-[35%]
                h-80
                w-80
                rounded-full
                bg-blue-400/15
                blur-[100px]
                dark:bg-blue-500/20
              "
            />

            {/* CONTENT */}

            <div
              className="
                relative
                z-10
                flex
                min-h-[300px]
                items-center
                px-6
                py-10

                sm:min-h-[330px]
                sm:px-10

                lg:min-h-[390px]
                lg:px-14
              "
            >
              <div className="max-w-[470px]">
                {/* LABEL */}

                <div
                  className="
                    mb-4
                    flex
                    items-center
                    gap-2
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-white/90
                    sm:text-xs
                  "
                >
                  <span
                    className="
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/20
                      bg-white/15
                      shadow-lg
                      backdrop-blur-md
                    "
                  >
                    <Tag size={13} />
                  </span>

                  Limited Time Offer
                </div>

                {/* HEADING */}

                <h2
                  className="
                    text-4xl
                    font-extrabold
                    leading-[0.98]
                    tracking-[-0.045em]
                    text-white
                    drop-shadow-lg

                    sm:text-5xl

                    lg:text-[58px]
                  "
                >
                  Special offers

                  <span className="mt-1 block">
                    up to{" "}
                    <span className="text-blue-100 dark:text-blue-300">
                      25% off
                    </span>
                  </span>
                </h2>

                {/* DESCRIPTION */}

                <p
                  className="
                    mt-5
                    max-w-[390px]
                    text-xs
                    leading-5
                    text-white/80
                    sm:text-sm
                    sm:leading-6
                  "
                >
                  Don't miss our latest premium car
                  rental deals. Choose your dream vehicle
                  and enjoy exclusive monthly prices.
                </p>

                {/* BUTTON */}

                <button
                  type="button"
                  onClick={openAllCars}
                  className="
                    group/button
                    mt-6
                    flex
                    items-center
                    gap-2.5
                    rounded-full
                    bg-blue-600
                    px-6
                    py-3
                    text-xs
                    font-bold
                    text-white
                    shadow-[0_12px_30px_rgba(37,99,235,0.35)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-blue-500
                    hover:shadow-[0_18px_40px_rgba(37,99,235,0.45)]
                    active:translate-y-0
                  "
                >
                  View all vehicles

                  <span
                    className="
                      flex
                      h-6
                      w-6
                      items-center
                      justify-center
                      rounded-full
                      bg-white/15
                    "
                  >
                    <ArrowRight
                      size={13}
                      className="
                        transition-transform
                        duration-300
                        group-hover/button:translate-x-0.5
                      "
                    />
                  </span>
                </button>
              </div>
            </div>

            {/* DESKTOP INFO CARD */}

            <div
              className="
                absolute
                bottom-8
                right-8
                z-10
                hidden
                w-[205px]
                rounded-[22px]
                border
                border-white/20
                bg-white/10
                p-4
                shadow-2xl
                backdrop-blur-xl
                transition-all
                duration-500
                hover:-translate-y-1
                hover:bg-white/15

                lg:block
              "
            >
              <div className="flex items-center justify-between">
                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-white/60
                  "
                >
                  Premium Rental
                </p>

                <Sparkles
                  size={14}
                  className="text-blue-200"
                />
              </div>

              <p
                className="
                  mt-2
                  text-xs
                  leading-5
                  text-white/90
                "
              >
                Premium vehicles with flexible
                monthly rental options.
              </p>

              <button
                type="button"
                onClick={openAllCars}
                className="
                  group/explore
                  mt-4
                  flex
                  items-center
                  gap-1.5
                  text-[10px]
                  font-bold
                  text-white
                  transition
                  hover:text-blue-200
                "
              >
                Explore cars

                <ArrowRight
                  size={12}
                  className="
                    transition-transform
                    duration-300
                    group-hover/explore:translate-x-1
                  "
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          ALL CARS SECTION
      ========================================================== */}

      {showAll && (
        <section
          ref={allCarsRef}
          className="
            relative
            w-full
            scroll-mt-20
            overflow-hidden
            bg-[#f5f8fc]
            px-4
            py-16
            transition-colors
            duration-500
            dark:bg-[#020b16]

            sm:px-6
            sm:py-20

            lg:px-8
            lg:py-24
          "
        >
          {/* BACKGROUND GLOW */}

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
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -right-40
              top-[35%]
              h-96
              w-96
              rounded-full
              bg-cyan-400/10
              blur-[120px]
            "
          />

          <div className="relative z-10 mx-auto max-w-7xl">
            {/* HEADER */}

            <div
              className="
                mb-10
                flex
                flex-col
                gap-5

                sm:flex-row
                sm:items-end
                sm:justify-between
              "
            >
              <div>
                <div
                  className="
                    mb-3
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-blue-200
                    bg-blue-50
                    px-3
                    py-1.5
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-blue-600

                    dark:border-blue-400/20
                    dark:bg-blue-500/10
                    dark:text-blue-400
                  "
                >
                  <Sparkles size={12} />
                  Exclusive Collection
                </div>

                <h2
                  className="
                    text-3xl
                    font-extrabold
                    tracking-[-0.035em]
                    text-gray-950

                    dark:text-white

                    sm:text-4xl

                    lg:text-5xl
                  "
                >
                  Explore all{" "}
                  <span className="text-blue-600 dark:text-blue-400">
                    vehicles
                  </span>
                </h2>

                <p
                  className="
                    mt-3
                    max-w-2xl
                    text-xs
                    leading-5
                    text-gray-500

                    dark:text-slate-400

                    sm:text-sm
                    sm:leading-6
                  "
                >
                  Discover our complete collection of
                  premium, performance and luxury vehicles.
                </p>
              </div>

              <button
                type="button"
                onClick={closeAllCars}
                className="
                  group
                  flex
                  w-fit
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-gray-200
                  bg-white
                  px-4
                  py-2.5
                  text-xs
                  font-bold
                  text-gray-700
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-blue-300
                  hover:text-blue-600

                  dark:border-slate-700
                  dark:bg-[#0b1a2b]
                  dark:text-slate-300
                  dark:hover:border-blue-500/40
                  dark:hover:text-blue-400
                "
              >
                <ArrowLeft
                  size={14}
                  className="
                    transition-transform
                    duration-300
                    group-hover:-translate-x-1
                  "
                />

                Back to offer
              </button>
            </div>

            {/* =====================================================
                3D FEATURED CAR
            ====================================================== */}

            <div
              onMouseMove={handleMouseMove}
              className="
                group/showcase
                relative
                mb-10
                min-h-[330px]
                overflow-hidden
                rounded-[30px]
                border
                border-gray-200
                bg-white
                shadow-[0_25px_70px_rgba(15,23,42,0.10)]
                transition-colors
                duration-500

                dark:border-slate-700/70
                dark:bg-[#081525]
                dark:shadow-[0_30px_80px_rgba(0,0,0,0.35)]

                sm:min-h-[400px]

                lg:min-h-[470px]
              "
            >
              {/* GRID */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  opacity-[0.035]
                  dark:opacity-[0.06]
                "
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)",
                  backgroundSize: "45px 45px",
                }}
              />

              {/* GLOW */}

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
                  bg-blue-500/10
                  blur-[90px]

                  sm:h-[380px]
                  sm:w-[380px]
                "
              />

              {/* FEATURE LABEL */}

              <div
                className="
                  absolute
                  left-5
                  top-5
                  z-20
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-blue-200
                  bg-white/80
                  px-3
                  py-2
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-blue-600
                  shadow-sm
                  backdrop-blur-xl

                  dark:border-blue-400/20
                  dark:bg-[#0b1a2b]/80
                  dark:text-blue-400

                  sm:left-7
                  sm:top-7
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.9)]" />
                Featured vehicle
              </div>

              {/* CAR STAGE */}

              <div
                className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                  px-4
                  pt-10

                  sm:px-10
                  sm:pt-0
                "
                style={{
                  perspective: "1200px",
                }}
              >
                <div
                  key={selectedCar.id}
                  className="
                    relative
                    w-full
                    max-w-[780px]
                    animate-[offerCarIn_650ms_cubic-bezier(0.22,1,0.36,1)]
                  "
                >
                  {/* FLOOR */}

                  <div
                    className="
                      absolute
                      bottom-[-15px]
                      left-1/2
                      h-8
                      w-[65%]
                      -translate-x-1/2
                      rounded-[50%]
                      bg-blue-500/20
                      blur-2xl
                    "
                  />

                  {/* IMAGE */}

                  <img
                    src={selectedCar.image}
                    alt={selectedCar.name}
                    className="
                      relative
                      z-10
                      mx-auto
                      h-[220px]
                      w-full
                      object-contain
                      drop-shadow-[0_30px_30px_rgba(0,0,0,0.28)]
                      transition-transform
                      duration-500
                      group-hover/showcase:scale-[1.025]

                      sm:h-[300px]

                      lg:h-[350px]
                    "
                  />
                </div>
              </div>

              {/* CAR DETAILS */}

              <div
                className="
                  absolute
                  bottom-5
                  left-5
                  z-20
                  max-w-[230px]

                  sm:bottom-7
                  sm:left-7
                "
              >
                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-blue-600

                    dark:text-blue-400
                  "
                >
                  {selectedCar.category}
                </p>

                <h3
                  className="
                    mt-1
                    text-2xl
                    font-extrabold
                    tracking-tight
                    text-gray-950

                    dark:text-white

                    sm:text-3xl
                  "
                >
                  {selectedCar.name}
                </h3>

                <div className="mt-2 flex items-center gap-2">
                  <span
                    className="
                      text-lg
                      font-extrabold
                      text-blue-600

                      dark:text-blue-400
                    "
                  >
                    ${selectedCar.price}
                  </span>

                  <span
                    className="
                      text-[10px]
                      text-gray-400

                      dark:text-slate-500
                    "
                  >
                    / month
                  </span>
                </div>
              </div>

              {/* SPECS */}

              <div
                className="
                  absolute
                  bottom-5
                  right-5
                  z-20
                  hidden
                  items-center
                  gap-2

                  sm:flex
                  sm:flex-col
                  sm:items-end
                "
              >
                <SpecPill
                  icon={<Users size={12} />}
                  value={`${selectedCar.seats} Seats`}
                />

                <SpecPill
                  icon={<Fuel size={12} />}
                  value={selectedCar.fuel}
                />

                <SpecPill
                  icon={<Gauge size={12} />}
                  value={selectedCar.transmission}
                />
              </div>
            </div>

            {/* =====================================================
                CAR GRID
            ====================================================== */}

            <div
              className="
                grid
                grid-cols-1
                gap-4

                sm:grid-cols-2

                lg:grid-cols-4
              "
            >
              {offerCars.map((car, index) => (
                <button
                  type="button"
                  key={car.id}
                  onClick={() => setActiveCar(index)}
                  className={`
                    group
                    overflow-hidden
                    rounded-[24px]
                    border
                    bg-white
                    text-left
                    shadow-sm
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:shadow-[0_25px_50px_rgba(15,23,42,0.15)]

                    dark:bg-[#0b1a2b]
                    dark:shadow-none
                    dark:hover:bg-[#0e2135]
                    dark:hover:shadow-[0_25px_55px_rgba(0,0,0,0.35)]

                    ${
                      selectedCar.id === car.id
                        ? "border-blue-500/50 ring-2 ring-blue-500/10 dark:border-blue-400/40"
                        : "border-gray-200 dark:border-slate-700/70"
                    }
                  `}
                >
                  {/* IMAGE */}

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
                        transition-transform
                        duration-700
                        group-hover:scale-110
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/45
                        via-transparent
                        to-transparent
                        opacity-70
                      "
                    />

                    {/* DISCOUNT */}

                    <div
                      className="
                        absolute
                        left-3
                        top-3
                        flex
                        items-center
                        gap-1
                        rounded-full
                        bg-blue-600
                        px-2.5
                        py-1.5
                        text-[9px]
                        font-bold
                        text-white
                        shadow-lg
                      "
                    >
                      <Tag size={10} />
                      {car.discount}% OFF
                    </div>

                    {/* CATEGORY */}

                    <div
                      className="
                        absolute
                        bottom-3
                        left-3
                        rounded-full
                        border
                        border-white/20
                        bg-black/30
                        px-2.5
                        py-1
                        text-[9px]
                        font-semibold
                        text-white
                        backdrop-blur-md
                      "
                    >
                      {car.category}
                    </div>
                  </div>

                  {/* CONTENT */}

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3
                          className="
                            text-sm
                            font-extrabold
                            text-gray-900
                            transition-colors
                            group-hover:text-blue-600

                            dark:text-white
                            dark:group-hover:text-blue-400
                          "
                        >
                          {car.name}
                        </h3>

                        <p
                          className="
                            mt-1
                            text-[10px]
                            text-gray-400

                            dark:text-slate-500
                          "
                        >
                          Premium monthly rental
                        </p>
                      </div>

                      <div className="text-right">
                        <p
                          className="
                            text-base
                            font-extrabold
                            text-blue-600

                            dark:text-blue-400
                          "
                        >
                          ${car.price}
                        </p>

                        <p
                          className="
                            text-[9px]
                            text-gray-400

                            dark:text-slate-500
                          "
                        >
                          / month
                        </p>
                      </div>
                    </div>

                    <div
                      className="
                        mt-4
                        flex
                        items-center
                        gap-2
                        border-t
                        border-gray-100
                        pt-3

                        dark:border-slate-700/70
                      "
                    >
                      <MiniSpec
                        icon={<Users size={12} />}
                        text={`${car.seats}`}
                      />

                      <MiniSpec
                        icon={<Fuel size={12} />}
                        text={car.fuel}
                      />

                      <MiniSpec
                        icon={<Gauge size={12} />}
                        text={car.transmission}
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* BOTTOM CTA */}

            <div
              className="
                mt-10
                flex
                justify-center
              "
            >
              <button
                type="button"
                onClick={closeAllCars}
                className="
                  group
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-gray-200
                  bg-white
                  px-5
                  py-3
                  text-xs
                  font-bold
                  text-gray-700
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-blue-300
                  hover:text-blue-600

                  dark:border-slate-700
                  dark:bg-[#0b1a2b]
                  dark:text-slate-300
                  dark:hover:border-blue-400/30
                  dark:hover:text-blue-400
                "
              >
                <ArrowLeft
                  size={14}
                  className="
                    transition-transform
                    duration-300
                    group-hover:-translate-x-1
                  "
                />

                Back to special offer
              </button>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          ANIMATION
      ========================================================== */}

      <style>
        {`
          @keyframes offerCarIn {
            0% {
              opacity: 0;
              transform:
                translate3d(55px, 10px, 0)
                scale(0.88)
                rotateY(-12deg);
              filter: blur(5px);
            }

            60% {
              opacity: 1;
              transform:
                translate3d(-6px, 0, 0)
                scale(1.02)
                rotateY(3deg);
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

          @media (prefers-reduced-motion: reduce) {
            [class*="animate-[offerCarIn"] {
              animation: none !important;
            }
          }
        `}
      </style>
    </div>
  );
};

/* =========================================================
   SMALL COMPONENTS
========================================================= */

const SpecPill = ({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) => {
  return (
    <div
      className="
        flex
        items-center
        gap-1.5
        rounded-full
        border
        border-white/20
        bg-white/70
        px-3
        py-1.5
        text-[9px]
        font-semibold
        text-gray-700
        shadow-sm
        backdrop-blur-xl

        dark:border-white/10
        dark:bg-[#0b1a2b]/75
        dark:text-slate-300
      "
    >
      <span className="text-blue-500">
        {icon}
      </span>

      {value}
    </div>
  );
};

const MiniSpec = ({
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
        gap-1
        text-[9px]
        text-gray-500

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

export default OfferBanner;