import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Fuel,
  Gauge,
  Users,
  Sparkles,
} from "lucide-react";

interface Car {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  seats: number;
  fuel: string;
  transmission: string;
  speed: string;
}

const cars: Car[] = [
  {
    id: 1,
    name: "Toyota GR Supra",
    category: "Sports Car",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1400&q=90",
    seats: 2,
    fuel: "Petrol",
    transmission: "Automatic",
    speed: "250 km/h",
  },
  {
    id: 2,
    name: "Honda Civic",
    category: "Sedan",
    price: 95,
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1400&q=90",
    seats: 5,
    fuel: "Petrol",
    transmission: "Automatic",
    speed: "210 km/h",
  },
  {
    id: 3,
    name: "BMW M4",
    category: "Luxury",
    price: 220,
    image:
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1400&q=90",
    seats: 4,
    fuel: "Petrol",
    transmission: "Automatic",
    speed: "280 km/h",
  },
  {
    id: 4,
    name: "Toyota RAV4",
    category: "SUV",
    price: 130,
    image:
      "https://images.unsplash.com/photo-1568844293986-8c5c7e0b0b0e?auto=format&fit=crop&w=1400&q=90",
    seats: 5,
    fuel: "Hybrid",
    transmission: "Automatic",
    speed: "200 km/h",
  },
  {
    id: 5,
    name: "Porsche 911",
    category: "Sports Car",
    price: 260,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=90",
    seats: 2,
    fuel: "Petrol",
    transmission: "Automatic",
    speed: "300 km/h",
  },
  {
    id: 6,
    name: "Mercedes AMG GT",
    category: "Luxury",
    price: 290,
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1400&q=90",
    seats: 2,
    fuel: "Petrol",
    transmission: "Automatic",
    speed: "315 km/h",
  },
  {
    id: 7,
    name: "Audi R8",
    category: "Supercar",
    price: 310,
    image:
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1400&q=90",
    seats: 2,
    fuel: "Petrol",
    transmission: "Automatic",
    speed: "316 km/h",
  },
  {
    id: 8,
    name: "BMW X5",
    category: "SUV",
    price: 195,
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=90",
    seats: 5,
    fuel: "Hybrid",
    transmission: "Automatic",
    speed: "235 km/h",
  },
  {
    id: 9,
    name: "Lamborghini Huracán",
    category: "Supercar",
    price: 480,
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1400&q=90",
    seats: 2,
    fuel: "Petrol",
    transmission: "Automatic",
    speed: "325 km/h",
  },
  {
    id: 10,
    name: "Range Rover Sport",
    category: "SUV",
    price: 240,
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1400&q=90",
    seats: 5,
    fuel: "Hybrid",
    transmission: "Automatic",
    speed: "225 km/h",
  },
  {
    id: 11,
    name: "Ferrari 488",
    category: "Supercar",
    price: 520,
    image:
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1400&q=90",
    seats: 2,
    fuel: "Petrol",
    transmission: "Automatic",
    speed: "340 km/h",
  },
  {
    id: 12,
    name: "Tesla Model S",
    category: "Electric",
    price: 170,
    image:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1400&q=90",
    seats: 5,
    fuel: "Electric",
    transmission: "Automatic",
    speed: "250 km/h",
  },
];

const Stats = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [activeCar, setActiveCar] = useState(0);
  const [showAllCars, setShowAllCars] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  /* ============================================================
     REVEAL
  ============================================================ */

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  /* ============================================================
     MOUSE
  ============================================================ */

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (window.innerWidth < 1024) return;

      const x =
        (event.clientX / window.innerWidth - 0.5) * 2;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 2;

      setMouse({
        x,
        y,
      });
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, []);

  const currentCar = cars[activeCar];

  const nextCar = () => {
    setActiveCar((prev) =>
      prev === cars.length - 1 ? 0 : prev + 1
    );
  };

  const previousCar = () => {
    setActiveCar((prev) =>
      prev === 0 ? cars.length - 1 : prev - 1
    );
  };

  return (
    <section
      ref={sectionRef}
      className="
        relative
        w-full
        overflow-hidden
        bg-[#f7f9fc]
        font-plus-jakarta
        transition-colors
        duration-500
        dark:bg-[#020811]
      "
    >
      {/* ==========================================================
          BACKGROUND
      ========================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          top-20
          h-[500px]
          w-[500px]
          rounded-full
          bg-blue-500/[0.08]
          blur-[150px]
          dark:bg-blue-500/[0.12]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-20
          h-[500px]
          w-[500px]
          rounded-full
          bg-cyan-400/[0.07]
          blur-[150px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.025]
          [background-image:linear-gradient(rgba(37,99,235,1)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,1)_1px,transparent_1px)]
          [background-size:55px_55px]
        "
      />

      {/* ==========================================================
          PAGE SWITCHER
      ========================================================== */}

      <div
        className={`
          relative
          transition-all
          duration-700

          ${
            showAllCars
              ? "translate-x-0 opacity-100"
              : "translate-x-0 opacity-100"
          }
        `}
      >
        {!showAllCars ? (
          /* ======================================================
             FIRST VIEW
          ====================================================== */

          <div
            className="
              mx-auto
              max-w-7xl
              px-4
              py-16
              sm:px-6
              sm:py-20
              lg:px-8
              lg:py-28
            "
          >
            {/* HEADER */}

            <div
              className={`
                mb-9
                flex
                flex-col
                gap-5
                transition-all
                duration-1000

                sm:flex-row
                sm:items-end
                sm:justify-between

                ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }
              `}
            >
              <div>
                <div
                  className="
                    mb-4
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-blue-200/80
                    bg-white/70
                    px-3
                    py-1.5
                    backdrop-blur-xl
                    dark:border-blue-400/20
                    dark:bg-white/[0.05]
                  "
                >
                  <span
                    className="
                      flex
                      h-5
                      w-5
                      items-center
                      justify-center
                      rounded-full
                      bg-blue-600
                      text-white
                    "
                  >
                    <Sparkles size={11} />
                  </span>

                  <span
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.16em]
                      text-blue-600
                      dark:text-blue-400
                    "
                  >
                    Premium collection
                  </span>
                </div>

                <h2
                  className="
                    text-3xl
                    font-black
                    leading-none
                    tracking-[-0.055em]
                    text-slate-900
                    dark:text-white
                    sm:text-4xl
                    lg:text-[50px]
                  "
                >
                  Find your next

                  <span
                    className="
                      ml-2
                      bg-gradient-to-r
                      from-blue-600
                      via-blue-500
                      to-cyan-400
                      bg-clip-text
                      text-transparent
                    "
                  >
                    drive.
                  </span>
                </h2>

                <p
                  className="
                    mt-3
                    max-w-xl
                    text-xs
                    leading-6
                    text-slate-500
                    dark:text-slate-400
                    sm:text-sm
                  "
                >
                  Explore premium vehicles selected for
                  performance, comfort and everyday luxury.
                </p>
              </div>

              {/* VIEW ALL */}

              <button
                type="button"
                onClick={() => {
                  setShowAllCars(true);

                  window.scrollTo({
                    top: sectionRef.current?.offsetTop ?? 0,
                    behavior: "smooth",
                  });
                }}
                className="
                  group
                  hidden
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-blue-500/20
                  bg-white/70
                  px-5
                  py-3
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-blue-600
                  shadow-sm
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-blue-500/40
                  hover:bg-blue-600
                  hover:text-white
                  hover:shadow-lg
                  dark:border-white/10
                  dark:bg-white/[0.04]
                  dark:text-blue-400
                  dark:hover:bg-blue-600
                  dark:hover:text-white

                  sm:flex
                "
              >
                View all cars

                <ArrowRight
                  size={14}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </button>
            </div>

            {/* ====================================================
                FEATURED CAR
            ==================================================== */}

            <div
              className="
                relative
                overflow-hidden
                rounded-[32px]
                border
                border-slate-200/70
                bg-white/60
                p-3
                shadow-[0_35px_100px_rgba(15,23,42,0.10)]
                backdrop-blur-2xl
                dark:border-white/[0.08]
                dark:bg-white/[0.035]
                dark:shadow-[0_35px_100px_rgba(0,0,0,0.4)]
                sm:p-4
              "
            >
              <div
                className="
                  group
                  relative
                  min-h-[440px]
                  overflow-hidden
                  rounded-[27px]
                  bg-[#07111e]
                  shadow-[0_30px_80px_rgba(0,0,0,0.3)]
                  sm:min-h-[520px]
                  lg:min-h-[570px]
                "
              >
                {/* IMAGE */}

                <img
                  key={currentCar.id}
                  src={currentCar.image}
                  alt={currentCar.name}
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    animate-mainCar
                  "
                />

                {/* OVERLAYS */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-r
                    from-[#020811]/95
                    via-[#020811]/45
                    to-transparent
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#020811]
                    via-transparent
                    to-transparent
                  "
                />

                {/* 3D LIGHT */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    right-[10%]
                    top-[10%]
                    hidden
                    h-52
                    w-52
                    rounded-full
                    bg-blue-400/10
                    blur-[90px]
                    lg:block
                  "
                  style={{
                    transform: `
                      translate(
                        ${mouse.x * 40}px,
                        ${mouse.y * 30}px
                      )
                    `,
                    transition:
                      "transform 0.5s ease-out",
                  }}
                />

                {/* INFO */}

                <div
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    z-20
                    p-6
                    sm:p-8
                    lg:p-11
                  "
                >
                  <div className="max-w-xl">
                    <span
                      className="
                        inline-flex
                        rounded-full
                        border
                        border-blue-400/20
                        bg-blue-500/15
                        px-3
                        py-1.5
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.14em]
                        text-blue-300
                        backdrop-blur-md
                      "
                    >
                      {currentCar.category}
                    </span>

                    <h3
                      key={currentCar.name}
                      className="
                        mt-3
                        text-4xl
                        font-black
                        leading-none
                        tracking-[-0.06em]
                        text-white
                        animate-carText
                        sm:text-5xl
                        lg:text-6xl
                      "
                    >
                      {currentCar.name}
                    </h3>

                    <div className="mt-4 flex items-end gap-2">
                      <span
                        className="
                          text-2xl
                          font-black
                          text-white
                          sm:text-3xl
                        "
                      >
                        ${currentCar.price}
                      </span>

                      <span
                        className="
                          mb-1
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.12em]
                          text-white/40
                        "
                      >
                        / month
                      </span>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <Spec
                        icon={<Users size={13} />}
                        text={`${currentCar.seats} Seats`}
                      />

                      <Spec
                        icon={<Fuel size={13} />}
                        text={currentCar.fuel}
                      />

                      <Spec
                        icon={<Gauge size={13} />}
                        text={currentCar.speed}
                      />

                      <Spec
                        text={currentCar.transmission}
                      />
                    </div>
                  </div>
                </div>

                {/* ARROWS */}

                <div
                  className="
                    absolute
                    right-5
                    top-5
                    z-30
                    flex
                    gap-2
                    sm:right-7
                    sm:top-7
                  "
                >
                  <button
                    type="button"
                    onClick={previousCar}
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/15
                      bg-black/25
                      text-white
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:bg-blue-600
                    "
                  >
                    <ArrowLeft size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={nextCar}
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/15
                      bg-black/25
                      text-white
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:bg-blue-600
                    "
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* ==================================================
                  MINI CAR SELECTOR
              ================================================== */}

              <div
                className="
                  mt-3
                  grid
                  grid-cols-2
                  gap-2
                  sm:grid-cols-4
                "
              >
                {cars.slice(0, 4).map((car, index) => (
                  <button
                    key={car.id}
                    type="button"
                    onMouseEnter={() =>
                      setActiveCar(index)
                    }
                    onClick={() =>
                      setActiveCar(index)
                    }
                    className={`
                      group
                      relative
                      overflow-hidden
                      rounded-2xl
                      border
                      p-2
                      text-left
                      transition-all
                      duration-500

                      ${
                        activeCar === index
                          ? "border-blue-500/30 bg-blue-600 shadow-lg shadow-blue-600/20"
                          : "border-slate-200/70 bg-white/60 hover:-translate-y-1 dark:border-white/[0.07] dark:bg-white/[0.035]"
                      }
                    `}
                  >
                    <div className="relative h-20 overflow-hidden rounded-xl sm:h-24">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-500
                          group-hover:scale-110
                        "
                      />

                      <div
                        className="
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black/50
                          to-transparent
                        "
                      />
                    </div>

                    <div className="px-1 pb-1 pt-2">
                      <p
                        className={`
                          truncate
                          text-[10px]
                          font-extrabold
                          ${
                            activeCar === index
                              ? "text-white"
                              : "text-slate-800 dark:text-white"
                          }
                        `}
                      >
                        {car.name}
                      </p>

                      <p
                        className={`
                          mt-0.5
                          text-[8px]
                          font-semibold
                          ${
                            activeCar === index
                              ? "text-white/55"
                              : "text-slate-400"
                          }
                        `}
                      >
                        ${car.price} / month
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* MOBILE VIEW ALL */}

            <div className="mt-6 flex justify-center sm:hidden">
              <button
                type="button"
                onClick={() => {
                  setShowAllCars(true);

                  window.scrollTo({
                    top:
                      sectionRef.current?.offsetTop ??
                      0,
                    behavior: "smooth",
                  });
                }}
                className="
                  group
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-blue-600
                  px-6
                  py-3
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-white
                  shadow-lg
                  shadow-blue-600/20
                  transition-all
                  duration-300
                  active:scale-95
                "
              >
                View all cars

                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        ) : (
          /* ======================================================
             SECOND VIEW — ALL CARS
          ====================================================== */

          <div
            className="
              min-h-screen
              animate-pageReveal
              px-4
              py-16
              sm:px-6
              sm:py-20
              lg:px-8
              lg:py-28
            "
          >
            <div className="mx-auto max-w-7xl">

              {/* TOP */}

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
                  <button
                    type="button"
                    onClick={() => {
                      setShowAllCars(false);

                      window.scrollTo({
                        top:
                          sectionRef.current?.offsetTop ??
                          0,
                        behavior: "smooth",
                      });
                    }}
                    className="
                      group
                      mb-5
                      flex
                      items-center
                      gap-2
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.14em]
                      text-blue-600
                      transition-all
                      hover:text-blue-500
                      dark:text-blue-400
                    "
                  >
                    <ArrowLeft
                      size={14}
                      className="transition-transform group-hover:-translate-x-1"
                    />

                    Back to featured
                  </button>

                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-blue-200/80
                      bg-white/70
                      px-3
                      py-1.5
                      backdrop-blur-xl
                      dark:border-blue-400/20
                      dark:bg-white/[0.05]
                    "
                  >
                    <Sparkles
                      size={12}
                      className="text-blue-500"
                    />

                    <span
                      className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.15em]
                        text-blue-600
                        dark:text-blue-400
                      "
                    >
                      Complete collection
                    </span>
                  </div>

                  <h2
                    className="
                      mt-4
                      text-4xl
                      font-black
                      leading-none
                      tracking-[-0.06em]
                      text-slate-900
                      dark:text-white

                      sm:text-5xl

                      lg:text-[64px]
                    "
                  >
                    All available
                    <span
                      className="
                        ml-2
                        bg-gradient-to-r
                        from-blue-600
                        via-blue-500
                        to-cyan-400
                        bg-clip-text
                        text-transparent
                      "
                    >
                      cars.
                    </span>
                  </h2>

                  <p
                    className="
                      mt-4
                      max-w-2xl
                      text-sm
                      leading-6
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Browse our complete collection of premium
                    vehicles available for monthly rental.
                  </p>
                </div>

                <div
                  className="
                    rounded-2xl
                    border
                    border-slate-200/70
                    bg-white/60
                    px-5
                    py-3
                    backdrop-blur-xl
                    dark:border-white/[0.08]
                    dark:bg-white/[0.035]
                  "
                >
                  <p
                    className="
                      text-2xl
                      font-black
                      text-slate-900
                      dark:text-white
                    "
                  >
                    {cars.length}
                  </p>

                  <p
                    className="
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.14em]
                      text-slate-400
                    "
                  >
                    Vehicles available
                  </p>
                </div>
              </div>

              {/* ==================================================
                  ALL CAR GRID
              ================================================== */}

              <div
                className="
                  grid
                  grid-cols-1
                  gap-4

                  sm:grid-cols-2

                  lg:grid-cols-3

                  xl:grid-cols-4
                "
              >
                {cars.map((car, index) => (
                  <AllCarCard
                    key={car.id}
                    car={car}
                    index={index}
                  />
                ))}
              </div>

              {/* BOTTOM */}

              <div
                className="
                  mt-12
                  flex
                  justify-center
                "
              >
                <button
                  type="button"
                  onClick={() => {
                    setShowAllCars(false);

                    window.scrollTo({
                      top:
                        sectionRef.current?.offsetTop ??
                        0,
                      behavior: "smooth",
                    });
                  }}
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-blue-500/20
                    bg-white/70
                    px-6
                    py-3
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-blue-600
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-blue-600
                    hover:text-white
                    dark:border-white/10
                    dark:bg-white/[0.04]
                    dark:text-blue-400
                  "
                >
                  <ArrowLeft
                    size={14}
                    className="transition-transform group-hover:-translate-x-1"
                  />

                  Back to featured
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ==========================================================
          ANIMATIONS
      ========================================================== */}

      <style>{`
        @keyframes mainCar {
          0% {
            opacity: 0;
            transform:
              scale(1.08)
              translateX(30px);
          }

          100% {
            opacity: 1;
            transform:
              scale(1)
              translateX(0);
          }
        }

        @keyframes carText {
          0% {
            opacity: 0;
            transform:
              translateY(18px)
              scale(0.98);
          }

          100% {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
          }
        }

        @keyframes pageReveal {
          0% {
            opacity: 0;
            transform:
              translateY(35px)
              scale(0.985);
          }

          100% {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
          }
        }

        .animate-mainCar {
          animation:
            mainCar
            800ms
            cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-carText {
          animation:
            carText
            600ms
            cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-pageReveal {
          animation:
            pageReveal
            700ms
            cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Completely hide scrollbar */

        html {
          scrollbar-width: none;
        }

        body {
          scrollbar-width: none;
        }

        body::-webkit-scrollbar {
          display: none;
          width: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-mainCar,
          .animate-carText,
          .animate-pageReveal {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

/* ============================================================
   ALL CAR CARD
============================================================ */

interface AllCarCardProps {
  car: Car;
  index: number;
}

const AllCarCard = ({
  car,
  index,
}: AllCarCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [rotate, setRotate] = useState({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (window.innerWidth < 1024) return;

    const element = cardRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();

    const x =
      event.clientX -
      rect.left -
      rect.width / 2;

    const y =
      event.clientY -
      rect.top -
      rect.height / 2;

    setRotate({
      x: -(y / rect.height) * 7,
      y: (x / rect.width) * 7,
    });
  };

  const handleMouseLeave = () => {
    setRotate({
      x: 0,
      y: 0,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="
        group
        relative
        overflow-hidden
        rounded-[24px]
        border
        border-slate-200/70
        bg-white/65
        shadow-[0_15px_50px_rgba(15,23,42,0.07)]
        backdrop-blur-xl
        transition-all
        duration-500
        hover:border-blue-400/30
        hover:shadow-[0_25px_70px_rgba(37,99,235,0.14)]
        dark:border-white/[0.08]
        dark:bg-white/[0.035]
        dark:shadow-none
      "
      style={{
        transform: `
          perspective(1000px)
          rotateX(${rotate.x}deg)
          rotateY(${rotate.y}deg)
        `,
        transition:
          "transform 0.15s ease-out, box-shadow 0.4s ease",
        animationDelay: `${index * 70}ms`,
      }}
    >
      {/* IMAGE */}

      <div
        className="
          relative
          h-[220px]
          overflow-hidden

          sm:h-[230px]
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
            from-black/65
            via-transparent
            to-transparent
          "
        />

        {/* Category */}

        <span
          className="
            absolute
            left-3
            top-3
            rounded-full
            border
            border-white/15
            bg-black/30
            px-3
            py-1.5
            text-[8px]
            font-bold
            uppercase
            tracking-[0.12em]
            text-white
            backdrop-blur-xl
          "
        >
          {car.category}
        </span>

        {/* Price */}

        <div
          className="
            absolute
            bottom-3
            right-3
            rounded-2xl
            border
            border-white/15
            bg-black/35
            px-3
            py-2
            text-white
            backdrop-blur-xl
          "
        >
          <span className="text-lg font-black">
            ${car.price}
          </span>

          <span className="ml-1 text-[8px] text-white/45">
            /mo
          </span>
        </div>
      </div>

      {/* CONTENT */}

      <div className="p-4">
        <h3
          className="
            text-base
            font-black
            tracking-[-0.03em]
            text-slate-900
            dark:text-white
          "
        >
          {car.name}
        </h3>

        <p
          className="
            mt-1
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.1em]
            text-slate-400
          "
        >
          Premium monthly rental
        </p>

        {/* SPECS */}

        <div
          className="
            mt-4
            flex
            flex-wrap
            gap-1.5
            border-t
            border-slate-200/70
            pt-3
            dark:border-white/[0.07]
          "
        >
          <MiniSpec
            icon={<Users size={11} />}
            text={`${car.seats}`}
          />

          <MiniSpec
            icon={<Fuel size={11} />}
            text={car.fuel}
          />

          <MiniSpec
            icon={<Gauge size={11} />}
            text={car.speed}
          />

          <MiniSpec
            text={car.transmission}
          />
        </div>

        {/* BUTTON */}

        <button
          type="button"
          className="
            group/button
            mt-4
            flex
            w-full
            items-center
            justify-between
            rounded-xl
            border
            border-blue-500/15
            bg-blue-500/[0.06]
            px-3
            py-2.5
            text-[9px]
            font-bold
            uppercase
            tracking-[0.1em]
            text-blue-600
            transition-all
            duration-300
            hover:bg-blue-600
            hover:text-white
            dark:text-blue-400
            dark:hover:text-white
          "
        >
          View vehicle

          <span
            className="
              flex
              h-6
              w-6
              items-center
              justify-center
              rounded-full
              bg-blue-600
              text-white
              transition-transform
              duration-300
              group-hover/button:translate-x-0.5
            "
          >
            <ArrowRight size={11} />
          </span>
        </button>
      </div>
    </div>
  );
};

/* ============================================================
   FEATURE SPEC
============================================================ */

interface SpecProps {
  icon?: React.ReactNode;
  text: string;
}

const Spec = ({
  icon,
  text,
}: SpecProps) => {
  return (
    <div
      className="
        flex
        items-center
        gap-1.5
        rounded-full
        border
        border-white/10
        bg-white/[0.06]
        px-3
        py-1.5
        text-[9px]
        font-semibold
        text-white/65
        backdrop-blur-md
      "
    >
      {icon}
      <span>{text}</span>
    </div>
  );
};

/* ============================================================
   MINI SPEC
============================================================ */

interface MiniSpecProps {
  icon?: React.ReactNode;
  text: string;
}

const MiniSpec = ({
  icon,
  text,
}: MiniSpecProps) => {
  return (
    <div
      className="
        flex
        items-center
        gap-1
        rounded-lg
        bg-slate-100
        px-2
        py-1.5
        text-[8px]
        font-semibold
        text-slate-500
        dark:bg-white/[0.05]
        dark:text-slate-400
      "
    >
      {icon}
      {text}
    </div>
  );
};

export default Stats;