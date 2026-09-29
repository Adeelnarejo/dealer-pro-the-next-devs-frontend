import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CarFront,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  Gauge,
  LayoutDashboard,
  MousePointer2,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

import Header from "../Header";
import Footer from "../Footer";

const cars = [
  {
    name: "Lamborghini",
    model: "Revuelto",
    category: "Performance",
    year: "2026",
    price: "$608,358",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1800&q=90",
  },
  {
    name: "Porsche",
    model: "911 Carrera",
    category: "Sports",
    year: "2026",
    price: "$121,250",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=90",
  },
  {
    name: "Ferrari",
    model: "Roma",
    category: "Grand Touring",
    year: "2026",
    price: "$247,310",
    image:
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1800&q=90",
  },
];

const Features = () => {
  const [activeCar, setActiveCar] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [visible, setVisible] = useState<Record<string, boolean>>({});

  const dragStart = useRef<number | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const revealRefs = useRef<Record<string, HTMLDivElement | null>>({});

  /* =========================================================
     CAR CHANGE
  ========================================================= */

  const nextCar = useCallback(() => {
    setActiveCar((current) => (current + 1) % cars.length);
  }, []);

  const previousCar = useCallback(() => {
    setActiveCar(
      (current) => (current - 1 + cars.length) % cars.length
    );
  }, []);

  /* =========================================================
     AUTO SLIDE
  ========================================================= */

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!isDragging) {
        nextCar();
      }
    }, 5500);

    return () => window.clearInterval(timer);
  }, [nextCar, isDragging]);

  /* =========================================================
     SCROLL REVEAL
  ========================================================= */

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-reveal");

            if (id) {
              setVisible((previous) => ({
                ...previous,
                [id]: true,
              }));
            }
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    Object.values(revealRefs.current).forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const reveal = (id: string) =>
    visible[id]
      ? "translate-y-0 opacity-100"
      : "translate-y-12 opacity-0";

  /* =========================================================
     MOUSE / TOUCH DRAG
  ========================================================= */

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    dragStart.current = event.clientX;
    setIsDragging(true);

    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Ignore pointer capture errors.
    }
  };

  const handlePointerUp = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (dragStart.current === null) {
      setIsDragging(false);
      return;
    }

    const difference = event.clientX - dragStart.current;

    if (Math.abs(difference) > 45) {
      if (difference < 0) {
        nextCar();
      } else {
        previousCar();
      }
    }

    dragStart.current = null;
    setIsDragging(false);

    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Ignore pointer capture errors.
    }
  };

  const handlePointerCancel = () => {
    dragStart.current = null;
    setIsDragging(false);
  };

  /* =========================================================
     CAR POSITION
  ========================================================= */

  const getPosition = (index: number) => {
    let difference = index - activeCar;

    if (difference > 1) {
      difference -= cars.length;
    }

    if (difference < -1) {
      difference += cars.length;
    }

    return difference;
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f8fa] text-slate-950 transition-colors duration-500 dark:bg-[#020b16] dark:text-white">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <Header />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#05090e] text-white">

        {/* Background glow */}

        <div className="pointer-events-none absolute left-1/2 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[130px]" />

        <div className="pointer-events-none absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-[140px]" />

        <div className="relative mx-auto max-w-[1500px] px-5 pb-10 pt-12 sm:px-8 sm:pb-14 sm:pt-16 lg:px-12 lg:pb-16 lg:pt-20">

          {/* Hero heading */}

          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">

            <div className="lg:col-span-7">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-2 backdrop-blur-xl">
                <Sparkles
                  size={14}
                  className="text-blue-400"
                />

                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/70 sm:text-[10px]">
                  DealerPro Features
                </span>
              </div>

              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.9] tracking-[-0.065em] sm:text-6xl md:text-7xl lg:text-[6.5rem]">
                Everything your
                <span className="block text-blue-400">
                  dealership needs.
                </span>
              </h1>

            </div>

            <div className="lg:col-span-5 lg:pb-2">

              <p className="max-w-lg text-sm leading-7 text-white/50 sm:text-base">
                Powerful tools for managing vehicles, customers,
                sales and your entire dealership from one
                connected platform.
              </p>

              <div className="mt-6 flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.18em] text-white/35">
                <MousePointer2 size={14} />
                Drag the car to explore
              </div>

            </div>

          </div>

          {/* =================================================
              3D CAR SHOWCASE
          ================================================= */}

          <div
            ref={heroRef}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            className={`relative mt-8 h-[390px] select-none touch-pan-y sm:mt-10 sm:h-[500px] lg:mt-8 lg:h-[570px] ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          >

            {/* floor */}

            <div className="pointer-events-none absolute bottom-12 left-1/2 h-24 w-[75%] -translate-x-1/2 rounded-[50%] bg-blue-500/10 blur-3xl" />

            {/* cars */}

            {cars.map((car, index) => {
              const position = getPosition(index);

              const isActive = position === 0;

              let transform = "";

              if (position === 0) {
                transform =
                  "translateX(-50%) translateZ(120px) rotateY(0deg) scale(1)";
              }

              if (position === -1) {
                transform =
                  "translateX(-88%) translateZ(-60px) rotateY(10deg) scale(.72)";
              }

              if (position === 1) {
                transform =
                  "translateX(-12%) translateZ(-60px) rotateY(-10deg) scale(.72)";
              }

              return (
                <div
                  key={car.name}
                  className="absolute left-1/2 top-1/2 h-[290px] w-[88%] -translate-y-1/2 sm:h-[390px] sm:w-[76%] lg:h-[470px] lg:w-[68%]"
                  style={{
                    transform,
                    opacity: isActive ? 1 : 0.35,
                    zIndex: isActive ? 30 : 10,
                    transition:
                      "transform 900ms cubic-bezier(.22,1,.36,1), opacity 700ms ease",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >

                  <div className="relative h-full w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1118] shadow-2xl shadow-black/40 sm:rounded-[36px]">

                    <img
                      src={car.image}
                      alt={`${car.name} ${car.model}`}
                      draggable={false}
                      className="h-full w-full object-cover object-center"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-9">

                      <div className="flex items-end justify-between gap-5">

                        <div>

                          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-400">
                            {car.category}
                          </p>

                          <h2 className="mt-1 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                            {car.name}
                          </h2>

                          <p className="mt-1 text-sm text-white/50">
                            {car.model} · {car.year}
                          </p>

                        </div>

                        <div className="hidden text-right sm:block">

                          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/35">
                            Starting from
                          </p>

                          <p className="mt-1 text-lg font-semibold">
                            {car.price}
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>
              );
            })}

            {/* arrows */}

            <button
              type="button"
              onClick={previousCar}
              aria-label="Previous car"
              className="absolute left-0 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-xl transition-all duration-300 hover:border-blue-400 hover:bg-blue-600 sm:left-3 sm:h-13 sm:w-13"
            >
              <ArrowLeft size={17} />
            </button>

            <button
              type="button"
              onClick={nextCar}
              aria-label="Next car"
              className="absolute right-0 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-xl transition-all duration-300 hover:border-blue-400 hover:bg-blue-600 sm:right-3 sm:h-13 sm:w-13"
            >
              <ArrowRight size={17} />
            </button>

          </div>

          {/* =================================================
              SLIDER
          ================================================= */}

          <div className="mx-auto max-w-4xl">

            <div className="flex items-center gap-4">

              <span className="text-[9px] font-bold text-white/30">
                01
              </span>

              <input
                type="range"
                min="0"
                max={cars.length - 1}
                step="1"
                value={activeCar}
                onChange={(event) =>
                  setActiveCar(Number(event.target.value))
                }
                aria-label="Select car"
                className="dealerpro-range h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/15"
              />

              <span className="text-[9px] font-bold text-white/30">
                0{cars.length}
              </span>

            </div>

            <div className="mt-4 flex items-center justify-center gap-2">

              {cars.map((car, index) => (
                <button
                  key={car.name}
                  type="button"
                  aria-label={`Show ${car.name}`}
                  onClick={() => setActiveCar(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    activeCar === index
                      ? "w-9 bg-blue-500"
                      : "w-2 bg-white/20"
                  }`}
                />
              ))}

            </div>

          </div>

        </div>

      </section>

{/* =====================================================
    INTRO
===================================================== */}

<section
  ref={(element: HTMLDivElement | null) => {
    revealRefs.current["intro"] = element;
  }}
  data-reveal="intro"
  className={`px-5 py-20 transition-all duration-1000 sm:px-8 lg:px-12 lg:py-28 ${reveal(
    "intro"
  )}`}
>
  <div className="mx-auto max-w-[1450px]">
    <div className="grid gap-8 lg:grid-cols-12 lg:items-end">

      {/* Label */}
      <div className="lg:col-span-4">
        <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.22em] text-slate-400 sm:text-[10px]">
          <span className="h-px w-8 bg-blue-600" />

          <span>Platform</span>
        </div>
      </div>

      {/* Content */}
      <div className="lg:col-span-8">

        <h2 className="max-w-5xl text-4xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-5xl md:text-6xl">
          One platform.

          <span className="text-blue-600 dark:text-blue-400">
            {" "}
            Every dealership operation.
          </span>
        </h2>

        <p className="mt-7 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
          DealerPro connects the tools your team uses every
          day, helping you keep your inventory, customers,
          agreements and payments organized.
        </p>

      </div>

    </div>
  </div>
</section>
      {/* =====================================================
          FEATURE GRID
      ===================================================== */}

      <section className="bg-white px-5 py-20 dark:bg-[#06111f] sm:px-8 lg:px-12 lg:py-28">

        <div className="mx-auto max-w-[1450px]">

          <div
            ref={(element) => {
              revealRefs.current["features"] = element;
            }}
            data-reveal="features"
            className={`transition-all duration-1000 ${reveal(
              "features"
            )}`}
          >

            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

              <div>

                <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400 sm:text-[10px]">
                  <Zap size={14} />
                  Powerful tools
                </div>

                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                  Everything connected.
                </h2>

              </div>

              <p className="max-w-md text-sm leading-7 text-slate-500 dark:text-slate-400">
                Designed around the real workflow of modern
                automotive businesses.
              </p>

            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

              {/* Vehicle */}

              <FeatureCard
                icon={<CarFront size={22} />}
                number="01"
                title="Vehicle Management"
                description="Manage your entire inventory, specifications, pricing, availability and vehicle details from one central platform."
              />

              {/* Customer */}

              <FeatureCard
                icon={<Users size={22} />}
                number="02"
                title="Customer Management"
                description="Keep customer information organized and manage every interaction throughout the sales process."
              />

              {/* Sales */}

              <FeatureCard
                icon={<CircleDollarSign size={22} />}
                number="03"
                title="Sales Management"
                description="Manage agreements, payments, transactions and your dealership sales workflow with ease."
              />

              {/* Dashboard */}

              <FeatureCard
                icon={<LayoutDashboard size={22} />}
                number="04"
                title="Smart Dashboard"
                description="Get a clear overview of vehicles, customers, agreements, payments and dealership activity."
              />

              {/* Analytics */}

              <FeatureCard
                icon={<BarChart3 size={22} />}
                number="05"
                title="Business Insights"
                description="Understand dealership activity through clear information and useful business insights."
              />

              {/* Security */}

              <FeatureCard
                icon={<ShieldCheck size={22} />}
                number="06"
                title="Secure Platform"
                description="Keep dealership information organized inside a professional and secure management environment."
              />

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FEATURE SHOWCASE
      ===================================================== */}

      <section className="overflow-hidden bg-[#0c141e] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">

        <div className="mx-auto max-w-[1450px]">

          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">

            {/* Text */}

            <div
              ref={(element) => {
                revealRefs.current["showcase-text"] = element;
              }}
              data-reveal="showcase-text"
              className={`lg:col-span-5 transition-all duration-1000 ${reveal(
                "showcase-text"
              )}`}
            >

              <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.22em] text-blue-400 sm:text-[10px]">
                <Gauge size={15} />
                Smart overview
              </div>

              <h2 className="mt-5 text-4xl font-semibold leading-[1] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                Know what's happening
                <span className="block text-blue-400">
                  at a glance.
                </span>
              </h2>

              <p className="mt-6 max-w-lg text-sm leading-7 text-white/45 sm:text-base">
                Your dealership activity stays visible from one
                simple dashboard, so your team can focus on what
                matters.
              </p>

              <div className="mt-8 space-y-4">

                {[
                  "Real-time dealership overview",
                  "Vehicle inventory tracking",
                  "Customer activity",
                  "Sales and payment visibility",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 border-t border-white/10 pt-4"
                  >
                    <CheckCircle2
                      size={17}
                      className="shrink-0 text-blue-400"
                    />

                    <span className="text-sm text-white/75">
                      {item}
                    </span>
                  </div>
                ))}

              </div>

            </div>

            {/* Dashboard */}

            <div
              ref={(element) => {
                revealRefs.current["dashboard"] = element;
              }}
              data-reveal="dashboard"
              className={`lg:col-span-7 transition-all delay-150 duration-1000 ${reveal(
                "dashboard"
              )}`}
            >

              <div className="relative">

                <div className="absolute -inset-5 rounded-[40px] bg-blue-500/10 blur-3xl" />

                <div className="relative rounded-[28px] border border-white/10 bg-[#111c29] p-4 shadow-2xl sm:rounded-[34px] sm:p-6">

                  {/* top bar */}

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/30">
                        DealerPro
                      </p>

                      <h3 className="mt-1 text-lg font-semibold">
                        Overview
                      </h3>

                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                      <LayoutDashboard size={17} />
                    </div>

                  </div>

                  {/* cards */}

                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">

                    <DashboardCard
                      icon={<CarFront size={15} />}
                      label="Vehicles"
                      value="128"
                    />

                    <DashboardCard
                      icon={<Users size={15} />}
                      label="Customers"
                      value="246"
                    />

                    <DashboardCard
                      icon={<ClipboardList size={15} />}
                      label="Agreements"
                      value="42"
                    />

                    <DashboardCard
                      icon={<CircleDollarSign size={15} />}
                      label="Payments"
                      value="86"
                    />

                  </div>

                  {/* chart */}

                  <div className="mt-4 rounded-2xl border border-white/10 bg-[#0b1521] p-5">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-[9px] uppercase tracking-[0.18em] text-white/30">
                          Sales overview
                        </p>

                        <p className="mt-1 text-xl font-semibold">
                          $284,650
                        </p>

                      </div>

                      <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-[9px] font-bold text-blue-400">
                        +18.4%
                      </span>

                    </div>

                    {/* fake chart */}

                    <div className="mt-7 flex h-32 items-end gap-2">

                      {[35, 48, 42, 65, 55, 78, 68, 92, 76, 100, 86, 108].map(
                        (height, index) => (
                          <div
                            key={index}
                            className="group relative flex-1"
                          >
                            <div
                              className="absolute bottom-0 w-full rounded-t-md bg-blue-500/30 transition-all duration-300 group-hover:bg-blue-400"
                              style={{
                                height: `${height}%`,
                              }}
                            />
                          </div>
                        )
                      )}

                    </div>

                  </div>

                  {/* status */}

                  <div className="mt-4 flex items-center justify-between rounded-2xl bg-blue-600 p-4">

                    <div>

                      <p className="text-[9px] uppercase tracking-[0.18em] text-blue-100">
                        Platform status
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        Everything is running smoothly
                      </p>

                    </div>

                    <CheckCircle2 size={21} />

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          THREE BIG FEATURES
      ===================================================== */}

      <section className="bg-[#f7f8fa] px-5 py-20 dark:bg-[#020b16] sm:px-8 lg:px-12 lg:py-28">

        <div className="mx-auto max-w-[1450px]">

          <div className="grid gap-5 lg:grid-cols-3">

            <BigFeature
              number="01"
              title="Manage every vehicle."
              text="Keep your inventory organized with vehicle details, pricing, specifications and availability."
              icon={<CarFront size={24} />}
            />

            <BigFeature
              number="02"
              title="Understand every customer."
              text="Create a smoother sales journey with organized customer information and activity."
              icon={<Users size={24} />}
            />

            <BigFeature
              number="03"
              title="Control every transaction."
              text="Manage agreements, payments and dealership sales operations from one connected workflow."
              icon={<CircleDollarSign size={24} />}
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="bg-white px-5 py-20 dark:bg-[#06111f] sm:px-8 lg:px-12 lg:py-28">

        <div className="mx-auto max-w-[1450px]">

          <div
            ref={(element) => {
              revealRefs.current["cta"] = element;
            }}
            data-reveal="cta"
            className={`relative overflow-hidden rounded-[28px] bg-blue-600 px-6 py-12 text-white transition-all duration-1000 sm:rounded-[36px] sm:px-10 sm:py-16 lg:px-14 lg:py-20 ${reveal(
              "cta"
            )}`}
          >

            <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full border border-white/10" />

            <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full border border-white/10" />

            <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-end">

              <div className="lg:col-span-8">

                <div className="mb-5 flex items-center gap-2">

                  <Sparkles size={16} />

                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/70">
                    DealerPro
                  </span>

                </div>

                <h2 className="max-w-4xl text-4xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-5xl md:text-6xl lg:text-[5.5rem]">
                  Built for the way
                  <span className="block text-white/60">
                    dealerships work.
                  </span>
                </h2>

              </div>

              <div className="lg:col-span-4">

                <p className="text-sm leading-7 text-white/75 sm:text-base">
                  Bring your vehicles, customers, sales and
                  operations together with DealerPro.
                </p>

                <button
                  type="button"
                  className="group mt-7 inline-flex items-center gap-3 bg-white px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.15em] text-blue-600 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-100 sm:px-6 sm:py-4 sm:text-xs"
                >
                  Get Started

                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />

      {/* =====================================================
          STYLES
      ===================================================== */}

      <style>{`

        .dealerpro-range::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 999px;
          background: #3b82f6;
          border: 3px solid #ffffff;
          box-shadow: 0 0 0 4px rgba(59,130,246,.15);
        }

        .dealerpro-range::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 999px;
          background: #3b82f6;
          border: 3px solid #ffffff;
          box-shadow: 0 0 0 4px rgba(59,130,246,.15);
        }

        .dealerpro-range::-webkit-slider-runnable-track {
          height: 4px;
          border-radius: 999px;
          background: rgba(255,255,255,.14);
        }

        .dealerpro-range::-moz-range-track {
          height: 4px;
          border-radius: 999px;
          background: rgba(255,255,255,.14);
        }

        html {
          scroll-behavior: smooth;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
            scroll-behavior: auto !important;
          }
        }

      `}</style>

    </div>
  );
};

/* ============================================================
   FEATURE CARD
============================================================ */

type FeatureCardProps = {
  icon: React.ReactNode;
  number: string;
  title: string;
  description: string;
};

const FeatureCard = ({
  icon,
  number,
  title,
  description,
}: FeatureCardProps) => {
  return (
    <div className="group relative min-h-[280px] overflow-hidden rounded-[24px] border border-slate-200 bg-[#f8f9fb] p-6 transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/10 dark:border-white/10 dark:bg-[#0b1a2b] dark:hover:border-blue-500/30">

      <div className="flex items-start justify-between">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-500/10 dark:text-blue-400">
          {icon}
        </div>

        <span className="text-[9px] font-bold tracking-[0.2em] text-slate-300 dark:text-white/20">
          {number}
        </span>

      </div>

      <div className="mt-12">

        <h3 className="text-xl font-semibold tracking-[-0.025em]">
          {title}
        </h3>

        <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
          {description}
        </p>

      </div>

      <div className="absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-blue-600/5 blur-2xl transition-all duration-500 group-hover:scale-150" />

    </div>
  );
};

/* ============================================================
   DASHBOARD CARD
============================================================ */

type DashboardCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

const DashboardCard = ({
  icon,
  label,
  value,
}: DashboardCardProps) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">

      <div className="flex items-center gap-2 text-white/35">
        {icon}

        <span className="text-[9px] uppercase tracking-[0.12em]">
          {label}
        </span>
      </div>

      <p className="mt-2 text-2xl font-semibold">
        {value}
      </p>

    </div>
  );
};

/* ============================================================
   BIG FEATURE
============================================================ */

type BigFeatureProps = {
  number: string;
  title: string;
  text: string;
  icon: React.ReactNode;
};

const BigFeature = ({
  number,
  title,
  text,
  icon,
}: BigFeatureProps) => {
  return (
    <div className="group rounded-[26px] border border-slate-200 bg-white p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 dark:border-white/10 dark:bg-[#081525] sm:p-9">

      <div className="flex items-center justify-between">

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
          {icon}
        </div>

        <span className="text-[9px] font-bold tracking-[0.2em] text-slate-300 dark:text-white/20">
          {number}
        </span>

      </div>

      <h3 className="mt-14 text-2xl font-semibold leading-tight tracking-[-0.035em] sm:text-3xl">
        {title}
      </h3>

      <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
        {text}
      </p>

      <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-blue-600 dark:text-blue-400">

        Explore

        <ArrowRight
          size={15}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />

      </div>

    </div>
  );
};

export default Features;