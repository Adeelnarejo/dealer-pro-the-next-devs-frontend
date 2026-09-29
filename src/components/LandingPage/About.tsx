import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ArrowRight,
  ArrowUpRight,
  CarFront,
  Sparkles,
} from "lucide-react";

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
  const sectionRef = useRef<HTMLElement | null>(null);

  const [activeBrand, setActiveBrand] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  /* ============================================================
     SCROLL REVEAL
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
        threshold: 0.15,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  /* ============================================================
     MOUSE 3D MOVEMENT
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

  const active = brands[activeBrand];

  const totalCars = brands.reduce(
    (total, brand) => total + brand.cars,
    0
  );

  return (
    <section
      ref={sectionRef}
      id="brands"
      className="
        relative
        w-full
        overflow-hidden
        bg-[#f7f9fc]
        py-16
        font-plus-jakarta
        transition-colors
        duration-500
        dark:bg-[#020811]

        sm:py-20

        lg:py-28
      "
    >
      {/* ==========================================================
          BACKGROUND GLOW
      ========================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-[-180px]
          top-[15%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-blue-500/[0.08]
          blur-[150px]
          dark:bg-blue-500/[0.10]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-[-180px]
          bottom-[10%]
          h-[550px]
          w-[550px]
          rounded-full
          bg-cyan-400/[0.07]
          blur-[160px]
        "
      />

      {/* ==========================================================
          PREMIUM GRID
      ========================================================== */}

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

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ========================================================
            HEADER
        ======================================================== */}

        <div
          className={`
            mx-auto
            max-w-3xl
            text-center
            transition-all
            duration-[1100ms]

            ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }
          `}
        >
          {/* Badge */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-blue-200/80
              bg-white/70
              px-4
              py-2
              shadow-[0_10px_35px_rgba(37,99,235,0.08)]
              backdrop-blur-xl
              dark:border-blue-400/20
              dark:bg-white/[0.05]
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
                bg-blue-600
                text-white
                shadow-lg
                shadow-blue-600/30
              "
            >
              <CarFront size={13} />
            </span>

            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.17em]
                text-blue-600
                dark:text-blue-400
                sm:text-[10px]
              "
            >
              Automotive excellence
            </span>

            <Sparkles
              size={13}
              className="text-blue-500"
            />
          </div>

          {/* Heading */}

          <h2
            className="
              mt-5
              text-[40px]
              font-black
              leading-[0.98]
              tracking-[-0.06em]
              text-slate-900
              dark:text-white

              sm:text-5xl

              lg:text-[64px]
            "
          >
            Every name.

            <span
              className="
                block
                bg-gradient-to-r
                from-blue-600
                via-blue-500
                to-cyan-400
                bg-clip-text
                text-transparent
              "
            >
              One destination.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-sm
              leading-6
              text-slate-500
              dark:text-slate-400
              sm:text-base
              sm:leading-7
            "
          >
            Explore vehicles from legendary automotive
            brands, all brought together in one intelligent
            dealership platform.
          </p>
        </div>

        {/* ========================================================
            MAIN SHOWCASE
        ======================================================== */}

        <div
          className={`
            mt-12
            transition-all
            duration-[1200ms]
            delay-150

            ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-16 opacity-0"
            }
          `}
        >
          <div
            className="
              relative
              overflow-hidden
              rounded-[32px]
              border
              border-slate-200/80
              bg-white/75
              p-3
              shadow-[0_35px_100px_rgba(15,23,42,0.10)]
              backdrop-blur-2xl
              dark:border-white/[0.08]
              dark:bg-white/[0.035]
              dark:shadow-[0_35px_100px_rgba(0,0,0,0.35)]
              sm:p-4
              lg:p-5
            "
          >
            {/* Main glow */}

            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-[-180px]
                h-[400px]
                w-[600px]
                -translate-x-1/2
                rounded-full
                bg-blue-500/[0.10]
                blur-[100px]
              "
            />

            <div
              className="
                relative
                grid
                gap-4
                lg:grid-cols-[1.35fr_0.65fr]
              "
            >

              {/* ==================================================
                  FEATURED BRAND
              ================================================== */}

              <div
                className="
                  relative
                  min-h-[390px]
                  overflow-hidden
                  rounded-[26px]
                  border
                  border-slate-200/70
                  bg-gradient-to-br
                  from-slate-100
                  via-white
                  to-blue-50/60

                  dark:border-white/[0.08]
                  dark:from-[#081522]
                  dark:via-[#0b1b2d]
                  dark:to-[#07111e]

                  sm:min-h-[450px]
                "
              >
                {/* Decorative ring */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-20
                    h-64
                    w-64
                    rounded-full
                    border
                    border-blue-500/10
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-10
                    -top-10
                    h-44
                    w-44
                    rounded-full
                    border
                    border-blue-500/10
                  "
                />

                {/* Bottom glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    bottom-[-120px]
                    left-1/2
                    h-[300px]
                    w-[600px]
                    -translate-x-1/2
                    rounded-full
                    bg-blue-500/10
                    blur-[100px]
                  "
                />

                {/* Moving glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    right-[-10px]
                    top-[-20px]
                    hidden
                    h-[280px]
                    w-[280px]
                    rounded-full
                    bg-blue-500/[0.08]
                    blur-[80px]
                    lg:block
                  "
                  style={{
                    transform: `
                      translate(
                        ${mouse.x * 20}px,
                        ${mouse.y * 20}px
                      )
                    `,
                    transition:
                      "transform 0.5s ease-out",
                  }}
                />

                {/* Content */}

                <div
                  className="
                    relative
                    z-10
                    flex
                    h-full
                    flex-col
                    justify-between
                    p-6
                    sm:p-8
                    lg:p-10
                  "
                >

                  {/* Top */}

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >
                    <div>
                      <p
                        className="
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-[0.2em]
                          text-blue-500
                        "
                      >
                        Featured brand
                      </p>

                      <h3
                        className="
                          mt-2
                          text-2xl
                          font-black
                          tracking-[-0.04em]
                          text-slate-900
                          dark:text-white
                          sm:text-3xl
                        "
                      >
                        {active.name}
                      </h3>
                    </div>

                    {/* Logo */}

                    <div
                      className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white/80
                        shadow-lg
                        dark:border-white/10
                        dark:bg-white/[0.06]
                      "
                    >
                      <img
                        src={active.logo}
                        alt={`${active.name} logo`}
                        className="
                          h-7
                          w-7
                          object-contain
                        "
                      />
                    </div>
                  </div>

                  {/* =================================================
                      GIANT 3D LOGO
                  ================================================= */}

                  <div
                    className="
                      relative
                      flex
                      flex-1
                      items-center
                      justify-center
                    "
                  >
                    <div
                      className="
                        absolute
                        h-48
                        w-48
                        rounded-full
                        bg-blue-500/10
                        blur-[45px]
                        animate-pulse

                        sm:h-60
                        sm:w-60
                      "
                    />

                    <img
                      key={active.name}
                      src={active.logo}
                      alt={`${active.name} logo`}
                      className="
                        relative
                        z-10
                        h-32
                        w-32
                        object-contain
                        opacity-[0.12]
                        grayscale
                        transition-all
                        duration-700
                        animate-brandReveal

                        sm:h-44
                        sm:w-44

                        lg:h-52
                        lg:w-52
                      "
                      style={{
                        transform: `
                          perspective(800px)
                          rotateY(${mouse.x * 8}deg)
                          rotateX(${mouse.y * -5}deg)
                        `,
                      }}
                    />

                    {/* Floor shadow */}

                    <div
                      className="
                        absolute
                        bottom-4
                        left-1/2
                        h-4
                        w-48
                        -translate-x-1/2
                        rounded-full
                        bg-blue-600/20
                        blur-xl

                        sm:w-64
                      "
                    />
                  </div>

                  {/* =================================================
                      BOTTOM INFO
                  ================================================= */}

                  <div
                    className="
                      flex
                      items-end
                      justify-between
                      gap-4
                    "
                  >
                    <div>
                      <p
                        className="
                          text-3xl
                          font-black
                          tracking-tight
                          text-slate-900
                          dark:text-white
                        "
                      >
                        {active.cars}
                      </p>

                      <p
                        className="
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-[0.15em]
                          text-slate-400
                        "
                      >
                        Vehicles available
                      </p>
                    </div>

                    <button
                      type="button"
                      className="
                        group
                        flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-blue-500/20
                        bg-blue-600
                        px-4
                        py-2.5
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wide
                        text-white
                        shadow-lg
                        shadow-blue-600/20
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:bg-blue-500
                      "
                    >
                      Explore

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
              </div>

              {/* ==================================================
                  BRAND SELECTOR
              ================================================== */}

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[26px]
                  border
                  border-slate-200/70
                  bg-slate-50/70
                  p-3
                  dark:border-white/[0.07]
                  dark:bg-black/10
                "
              >
                {/* Selector Header */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    px-3
                    pb-3
                    pt-2
                  "
                >
                  <div>
                    <p
                      className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.17em]
                        text-slate-400
                      "
                    >
                      Select a brand
                    </p>

                    <p
                      className="
                        mt-1
                        text-sm
                        font-bold
                        text-slate-800
                        dark:text-white
                      "
                    >
                      Browse collection
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      bg-blue-600/10
                      text-blue-500
                    "
                  >
                    <Sparkles size={14} />
                  </div>
                </div>

                {/* =================================================
                    BRAND LIST

                    Scroll still works but scrollbar is hidden
                ================================================= */}

                <div
                  className="
                    brand-scroll
                    max-h-[330px]
                    space-y-1.5
                    overflow-y-auto
                    pr-1
                  "
                >
                  {brands.map((brand, index) => (
                    <button
                      key={brand.name}
                      type="button"
                      onClick={() =>
                        setActiveBrand(index)
                      }
                      className={`
                        group
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-2xl
                        border
                        p-2.5
                        text-left
                        transition-all
                        duration-300

                        ${
                          activeBrand === index
                            ? `
                              border-blue-500/30
                              bg-blue-600
                              text-white
                              shadow-lg
                              shadow-blue-600/15
                            `
                            : `
                              border-transparent
                              bg-white/70
                              text-slate-700

                              hover:-translate-y-0.5
                              hover:border-blue-500/15
                              hover:bg-white

                              dark:bg-white/[0.035]
                              dark:text-slate-300
                              dark:hover:bg-white/[0.07]
                            `
                        }
                      `}
                    >
                      {/* Logo */}

                      <span
                        className={`
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          border
                          transition-all
                          duration-300

                          ${
                            activeBrand === index
                              ? `
                                border-white/20
                                bg-white/10
                              `
                              : `
                                border-slate-200
                                bg-white

                                dark:border-white/10
                                dark:bg-white/[0.04]
                              `
                          }
                        `}
                      >
                        <img
                          src={brand.logo}
                          alt={`${brand.name} logo`}
                          className="
                            h-6
                            w-6
                            object-contain
                          "
                        />
                      </span>

                      {/* Text */}

                      <span className="min-w-0 flex-1">
                        <span
                          className="
                            block
                            truncate
                            text-[11px]
                            font-bold
                          "
                        >
                          {brand.name}
                        </span>

                        <span
                          className={`
                            mt-0.5
                            block
                            text-[9px]

                            ${
                              activeBrand === index
                                ? "text-white/60"
                                : "text-slate-400 dark:text-slate-500"
                            }
                          `}
                        >
                          {brand.cars} vehicles
                        </span>
                      </span>

                      {/* Arrow */}

                      <ArrowUpRight
                        size={13}
                        className={`
                          shrink-0
                          transition-all
                          duration-300

                          ${
                            activeBrand === index
                              ? "translate-x-0 text-white"
                              : "-translate-x-1 text-slate-300 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 dark:text-slate-600"
                          }
                        `}
                      />
                    </button>
                  ))}
                </div>

                {/* Bottom fade */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    bottom-0
                    left-0
                    right-0
                    h-8
                    rounded-b-[26px]
                    bg-gradient-to-t
                    from-slate-50
                    to-transparent
                    dark:from-[#07101a]
                  "
                />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            SMALL PREMIUM FOOT NOTE
        ======================================================== */}

        <div
          className={`
            mt-7
            flex
            flex-col
            items-center
            justify-center
            gap-2
            text-center
            transition-all
            duration-1000
            delay-300

            sm:flex-row

            ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }
          `}
        >
          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-blue-500
              shadow-[0_0_12px_rgba(59,130,246,0.8)]
            "
          />

          <span
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.15em]
              text-slate-400
            "
          >
            {brands.length} premium brands
          </span>

          <span
            className="
              hidden
              h-1
              w-1
              rounded-full
              bg-slate-300
              dark:bg-slate-700
              sm:block
            "
          />

          <span
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.15em]
              text-slate-400
            "
          >
            {totalCars}+ vehicles
          </span>
        </div>
      </div>

      {/* ==========================================================
          ANIMATIONS + HIDDEN SCROLLBAR
      ========================================================== */}

      <style>{`
        @keyframes brandReveal {
          0% {
            opacity: 0;
            transform:
              perspective(800px)
              scale(0.65)
              rotateY(-25deg);
          }

          100% {
            opacity: 0.12;
            transform:
              perspective(800px)
              scale(1)
              rotateY(0deg);
          }
        }

        .animate-brandReveal {
          animation:
            brandReveal
            700ms
            cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Hide scrollbar completely */

        .brand-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .brand-scroll::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }

        @media (max-width: 1023px) {
          .brand-scroll {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .brand-scroll::-webkit-scrollbar {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-brandReveal {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Brands;