import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CarFront,
  CheckCircle2,
  ChevronRight,
  MapPin,
  Navigation,
  ShieldCheck,
  Sparkles,
  Users,
  Warehouse,
} from "lucide-react";

import Header from "../Header";
import Footer from "../Footer";

const dealerships = [
  {
    name: "DealerPro Motors",
    city: "Karachi",
    country: "Pakistan",
    image:
      "mclaren-mcl-6gt-concept-2026-thumb.jpg",
    vehicles: "128+",
    type: "Premium Showroom",
  },
  {
    name: "DealerPro Auto",
    city: "Lahore",
    country: "Pakistan",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=90",
    vehicles: "94+",
    type: "Luxury & Performance",
  },
  {
    name: "DealerPro Motors",
    city: "Islamabad",
    country: "Pakistan",
    image:
      "https://images.unsplash.com/photo-1562519819-016930ada31b?auto=format&fit=crop&w=1600&q=90",
    vehicles: "76+",
    type: "Modern Dealership",
  },
];

const Dealerships = () => {
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

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
        threshold: 0.1,
      }
    );

    Object.values(refs.current).forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const reveal = (id: string) =>
    visible[id]
      ? "translate-y-0 opacity-100"
      : "translate-y-10 opacity-0";

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f7f5] text-slate-950 transition-colors duration-500 dark:bg-[#020b16] dark:text-white">
      <Header />

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative min-h-[650px] overflow-hidden bg-[#090d12] sm:min-h-[700px] lg:min-h-[calc(100vh-64px)]">
        {/* IMAGE */}
        <div className="absolute inset-0">
          <img
            src="mclaren-mcl-6gt-concept-2026-thumb.jpg"
            alt="Modern car dealership"
            className="h-full w-full object-cover object-center"
          />

          {/* overlays */}
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/25" />
        </div>

        {/* TOP LABEL */}
        <div className="absolute left-0 right-0 top-0 z-10">
          <div className="mx-auto flex max-w-[1450px] items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
            <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.24em] text-white/70 sm:text-[10px]">
              <span className="h-px w-7 bg-white/50 sm:w-9" />
              Our Dealerships
            </div>

            <div className="hidden items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 sm:flex">
              <MapPin size={14} />
              Pakistan
            </div>
          </div>
        </div>

        {/* HERO CONTENT */}
        <div className="relative z-10 mx-auto flex min-h-[650px] max-w-[1450px] items-end px-5 pb-10 pt-32 sm:min-h-[700px] sm:px-8 sm:pb-14 lg:min-h-[calc(100vh-64px)] lg:px-12 lg:pb-16">
          <div className="w-full">
            <div className="max-w-4xl">
              {/* badge */}
              <div className="mb-6 animate-[dealershipFade_.8s_ease-out_forwards] opacity-0">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 backdrop-blur-xl sm:px-4">
                  <ShieldCheck
                    size={14}
                    className="text-blue-400"
                  />

                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/90 sm:text-[10px]">
                    Trusted Automotive Network
                  </span>
                </div>
              </div>

              {/* heading */}
              <h1 className="animate-[dealershipUp_1s_.1s_ease-out_forwards] text-[17vw] font-semibold leading-[0.86] tracking-[-0.075em] text-white opacity-0 sm:text-[12vw] md:text-[10vw] lg:text-[8vw]">
                Find your
                <span className="block text-blue-400">
                  dealership.
                </span>
              </h1>

              {/* bottom content */}
              <div className="mt-7 grid gap-7 border-t border-white/20 pt-6 sm:mt-8 sm:pt-7 lg:grid-cols-12 lg:items-end">
                <p className="max-w-xl text-sm leading-6 text-white/65 sm:text-base sm:leading-7 lg:col-span-7">
                  Discover modern dealerships, explore available vehicles
                  and connect with automotive businesses through DealerPro.
                </p>

                <div className="lg:col-span-5 lg:flex lg:justify-end">
                  <a
                    href="#dealership-list"
                    className="group inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white sm:text-xs"
                  >
                    Explore locations

                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-all duration-300 group-hover:border-blue-400 group-hover:bg-blue-600 sm:h-12 sm:w-12">
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRO
      ===================================================== */}
      <section
        ref={(element: HTMLDivElement | null) => {
          refs.current["intro"] = element;
        }}
        data-reveal="intro"
        className={`px-5 py-20 transition-all duration-1000 ease-out sm:px-8 sm:py-24 lg:px-12 lg:py-28 ${reveal(
          "intro"
        )}`}
      >
        <div className="mx-auto max-w-[1450px]">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.23em] text-slate-500 dark:text-white/40 sm:text-[10px]">
                <span className="h-px w-7 bg-blue-600 sm:w-8" />
                DealerPro Network
              </div>
            </div>

            <div className="lg:col-span-8">
              <h2 className="max-w-4xl text-4xl font-semibold leading-[1.03] tracking-[-0.05em] sm:text-5xl md:text-6xl lg:text-[4.3rem]">
                A network built around
                <span className="text-blue-600 dark:text-blue-400">
                  {" "}
                  better dealerships.
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:mt-7 sm:text-base">
                DealerPro gives dealerships a connected environment to
                manage vehicles, customers and daily operations while
                presenting a professional experience to buyers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS
      ===================================================== */}
      <section className="border-y border-slate-200 bg-white dark:border-white/10 dark:bg-[#06111f]">
        <div className="mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-3">
            {/* stat */}
            <div className="border-b border-slate-200 py-9 md:border-b-0 md:border-r md:py-12 md:pr-10 dark:border-white/10">
              <Building2
                size={21}
                className="text-blue-600 dark:text-blue-400"
              />

              <div className="mt-4 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
                25+
              </div>

              <p className="mt-2 text-sm text-slate-500 dark:text-white/40">
                Dealership locations
              </p>
            </div>

            {/* stat */}
            <div className="border-b border-slate-200 py-9 md:border-b-0 md:border-r md:px-10 md:py-12 dark:border-white/10">
              <CarFront
                size={21}
                className="text-blue-600 dark:text-blue-400"
              />

              <div className="mt-4 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
                500+
              </div>

              <p className="mt-2 text-sm text-slate-500 dark:text-white/40">
                Vehicles across the network
              </p>
            </div>

            {/* stat */}
            <div className="py-9 md:py-12 md:pl-10">
              <Users
                size={21}
                className="text-blue-600 dark:text-blue-400"
              />

              <div className="mt-4 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
                10K+
              </div>

              <p className="mt-2 text-sm text-slate-500 dark:text-white/40">
                Customer interactions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          DEALERSHIP LIST
      ===================================================== */}
      <section
        id="dealership-list"
        className="bg-[#10171f] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28"
      >
        <div className="mx-auto max-w-[1450px]">
          {/* heading */}
          <div
            ref={(element: HTMLDivElement | null) => {
              refs.current["heading"] = element;
            }}
            data-reveal="heading"
            className={`mb-12 grid gap-6 transition-all duration-1000 ease-out lg:mb-14 lg:grid-cols-12 ${reveal(
              "heading"
            )}`}
          >
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.23em] text-white/40 sm:text-[10px]">
                <span className="h-px w-7 bg-blue-500 sm:w-8" />
                Locations
              </div>
            </div>

            <div className="lg:col-span-8">
              <h2 className="text-4xl font-semibold leading-[1] tracking-[-0.045em] sm:text-5xl lg:text-[4.2rem]">
                Explore our
                <span className="text-blue-400">
                  {" "}
                  dealerships.
                </span>
              </h2>
            </div>
          </div>

          {/* cards */}
          <div className="space-y-5">
            {dealerships.map((dealership, index) => {
              const id = `dealer-${index}`;

              return (
                <div
                  key={`${dealership.city}-${index}`}
                  ref={(element: HTMLDivElement | null) => {
                    refs.current[id] = element;
                  }}
                  data-reveal={id}
                  className={`group overflow-hidden border border-white/10 bg-white/[0.03] transition-all duration-1000 ease-out hover:border-white/20 hover:bg-white/[0.05] ${reveal(
                    id
                  )}`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="grid lg:grid-cols-12">
                    {/* IMAGE */}
                    <div className="relative h-[250px] overflow-hidden sm:h-[320px] lg:col-span-6 lg:h-[390px]">
                      <img
                        src={dealership.image}
                        alt={dealership.name}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                      <div className="absolute bottom-5 left-5 flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                          <MapPin size={14} />
                        </span>

                        <span className="text-xs font-semibold text-white">
                          {dealership.city}
                        </span>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="flex min-h-[350px] flex-col justify-between p-6 sm:min-h-[390px] sm:p-8 lg:col-span-6 lg:min-h-[390px] lg:p-10">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
                            0{index + 1}
                          </span>

                          <span className="rounded-full border border-white/10 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.15em] text-white/45 sm:text-[9px]">
                            {dealership.type}
                          </span>
                        </div>

                        <h3 className="mt-10 text-3xl font-semibold tracking-[-0.04em] sm:mt-12 sm:text-4xl lg:text-[2.8rem]">
                          {dealership.name}
                        </h3>

                        <div className="mt-3 flex items-center gap-2 text-sm text-white/45">
                          <MapPin
                            size={14}
                            className="text-blue-400"
                          />

                          {dealership.city}, {dealership.country}
                        </div>

                        <p className="mt-5 max-w-md text-sm leading-7 text-white/40">
                          Explore our available vehicles, dealership
                          services and automotive experience at this
                          location.
                        </p>
                      </div>

                      <div className="mt-8 border-t border-white/10 pt-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/25">
                              Available vehicles
                            </p>

                            <p className="mt-1 text-lg font-semibold">
                              {dealership.vehicles}
                            </p>
                          </div>

                          <button
                            type="button"
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white transition-all duration-300 hover:bg-blue-500 sm:h-14 sm:w-14"
                          >
                            <ArrowUpRight
                              size={19}
                              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY DEALERPRO
      ===================================================== */}
      <section className="bg-[#f7f7f5] px-5 py-20 dark:bg-[#020b16] sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1450px]">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            {/* IMAGE */}
            <div
              ref={(element: HTMLDivElement | null) => {
                refs.current["why-image"] = element;
              }}
              data-reveal="why-image"
              className={`lg:col-span-7 transition-all duration-1000 ease-out ${reveal(
                "why-image"
              )}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1562519819-016930ada31b?auto=format&fit=crop&w=1800&q=90"
                  alt="Luxury dealership showroom"
                  className="h-[380px] w-full object-cover transition-transform duration-[1500ms] hover:scale-105 sm:h-[480px] lg:h-[540px]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-auto">
                  <div className="border border-white/15 bg-black/40 p-4 backdrop-blur-xl sm:p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center bg-blue-600 text-white">
                        <Warehouse size={17} />
                      </div>

                      <div>
                        <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/45">
                          DealerPro Network
                        </p>

                        <p className="mt-1 text-sm font-semibold text-white">
                          Modern showroom experience
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div
              ref={(element: HTMLDivElement | null) => {
                refs.current["why-content"] = element;
              }}
              data-reveal="why-content"
              className={`lg:col-span-5 lg:pl-5 transition-all duration-1000 ease-out ${reveal(
                "why-content"
              )}`}
            >
              <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.23em] text-blue-600 dark:text-blue-400 sm:text-[10px]">
                <span className="h-px w-7 bg-blue-600 sm:w-8" />
                Why DealerPro
              </div>

              <h2 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-[4rem]">
                More than a
                <span className="block text-blue-600 dark:text-blue-400">
                  dealership.
                </span>
              </h2>

              <p className="mt-6 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                DealerPro is designed to help automotive businesses
                create a better connection between their physical
                showroom and digital customer experience.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Professional dealership management",
                  "Connected vehicle inventory",
                  "Organized customer workflows",
                  "Modern digital experience",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 border-t border-slate-200 pt-4 dark:border-white/10"
                  >
                    <CheckCircle2
                      size={17}
                      className="shrink-0 text-blue-600 dark:text-blue-400"
                    />

                    <span className="text-sm font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FIND DEALERSHIP
      ===================================================== */}
      <section className="border-y border-slate-200 bg-white px-5 py-16 dark:border-white/10 dark:bg-[#06111f] sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1450px]">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.23em] text-blue-600 dark:text-blue-400 sm:text-[10px]">
                <Navigation size={14} />
                Find a dealership
              </div>

              <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.03] tracking-[-0.05em] sm:text-5xl lg:text-[4rem]">
                The right car could be
                <span className="text-blue-600 dark:text-blue-400">
                  {" "}
                  closer than you think.
                </span>
              </h2>
            </div>

            <div className="lg:col-span-5 lg:flex lg:justify-end">
              <button
                type="button"
                className="group inline-flex items-center gap-3 rounded-full bg-blue-600 px-5 py-3.5 text-xs font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500 sm:px-6 sm:py-4 sm:text-sm"
              >
                Explore all locations

                <ChevronRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="relative overflow-hidden bg-blue-600 px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full border border-white/10 sm:h-96 sm:w-96" />

        <div className="absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full border border-white/10 sm:h-[500px] sm:w-[500px]" />

        <div
          ref={(element: HTMLDivElement | null) => {
            refs.current["cta"] = element;
          }}
          data-reveal="cta"
          className={`relative z-10 mx-auto max-w-[1450px] transition-all duration-1000 ease-out ${reveal(
            "cta"
          )}`}
        >
          <div className="grid gap-9 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="mb-5 flex items-center gap-3">
                <Sparkles size={16} />

                <span className="text-[9px] font-bold uppercase tracking-[0.23em] text-white/70 sm:text-[10px]">
                  DealerPro
                </span>
              </div>

              <h2 className="text-5xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-6xl lg:text-[6.5rem]">
                Build a better
                <span className="block text-white/60">
                  dealership experience.
                </span>
              </h2>
            </div>

            <div className="lg:col-span-4">
              <p className="text-sm leading-7 text-white/75 sm:text-base">
                Bring vehicles, customers and dealership operations
                together with one professional platform.
              </p>

              <button
                type="button"
                className="group mt-7 inline-flex items-center gap-3 bg-white px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-100 sm:px-6 sm:py-4 sm:text-xs"
              >
                Get Started

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white">
                  <ArrowRight
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* =====================================================
          ANIMATIONS
      ===================================================== */}
      <style>{`
        @keyframes dealershipUp {
          from {
            opacity: 0;
            transform: translateY(35px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dealershipFade {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        html {
          scroll-behavior: smooth;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Dealerships;