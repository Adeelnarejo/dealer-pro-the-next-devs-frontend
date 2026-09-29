import React, { useEffect, useRef, useState } from "react";
import {
ArrowDownRight,
ArrowRight,
BarChart3,
CarFront,
CheckCircle2,
ClipboardCheck,
CreditCard,
FileText,
Headphones,
LayoutDashboard,
Search,
ShieldCheck,
Sparkles,
Users,
Zap,
} from "lucide-react";

import Header from "../Header";
import Footer from "../Footer";

const services = [
{
number: "01",
title: "Vehicle",
accent: "Management",
description:
"Keep your entire vehicle inventory organized, visible and easy to manage from one professional workspace.",
icon: CarFront,
image:
"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=90",
},
{
number: "02",
title: "Customer",
accent: "Management",
description:
"Keep customer information, interactions and dealership activity connected throughout the sales journey.",
icon: Users,
image:
"https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=1800&q=90",
},
{
number: "03",
title: "Sales",
accent: "Operations",
description:
"Create a clearer sales workflow with agreements, transactions and important customer information together.",
icon: ClipboardCheck,
image:
"https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1800&q=90",
},
{
number: "04",
title: "Agreement",
accent: "Management",
description:
"Create, manage and track dealership agreements through a simple and structured digital workflow.",
icon: FileText,
image:
"https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1800&q=90",
},
{
number: "05",
title: "Payment",
accent: "Services",
description:
"Keep payment activity organized and make important financial information easier to follow.",
icon: CreditCard,
image:
"https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1800&q=90",
},
{
number: "06",
title: "Business",
accent: "Analytics",
description:
"Understand your dealership activity with useful visibility across vehicles, customers, sales and payments.",
icon: BarChart3,
image:
"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1800&q=90",
},
];

const Services = () => {
const [visible, setVisible] = useState<Record<string, boolean>>({});
const revealRefs = useRef<Record<string, HTMLDivElement | null>>({});

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

const reveal = (id: string) => {
return visible[id]
? "translate-y-0 opacity-100"
: "translate-y-12 opacity-0";
};

return ( <div className="min-h-screen overflow-x-hidden bg-[#f5f5f3] text-[#101214] transition-colors duration-500 dark:bg-[#02070d] dark:text-white">


  <Header />

  {/* =====================================================
      HERO
  ===================================================== */}

  <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#111]">

    {/* Image */}
    <div className="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2400&q=95"
        alt="Premium sports car"
        className="h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/35" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/10" />
    </div>

    {/* Top label */}
    <div className="absolute left-0 right-0 top-0 z-10">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-7 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-white/70">
          <span className="h-px w-8 bg-white/50" />
          DealerPro Services
        </div>

        <div className="hidden items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/60 sm:flex">
          <span>Scroll to explore</span>
          <ArrowDownRight size={15} />
        </div>
      </div>
    </div>

    {/* Hero content */}
    <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-[1500px] items-end px-5 pb-14 pt-36 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">

      <div className="w-full">

        <div className="max-w-[1000px]">

          <div className="mb-6 flex animate-[serviceFade_.9s_ease-out_forwards] items-center gap-3 opacity-0">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30">
              <Sparkles size={14} className="text-blue-400" />
            </span>

            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
              Built for modern dealerships
            </span>
          </div>

          <h1 className="animate-[serviceUp_1s_.1s_ease-out_forwards] text-[14vw] font-semibold leading-[.82] tracking-[-0.07em] text-white opacity-0 sm:text-[11vw] lg:text-[9.5vw]">
            Services
          </h1>

          <div className="mt-8 flex flex-col justify-between gap-7 border-t border-white/20 pt-7 sm:flex-row sm:items-end">

            <p className="max-w-xl animate-[serviceUp_1s_.3s_ease-out_forwards] text-sm leading-7 text-white/75 opacity-0 sm:text-base lg:text-lg">
              Everything you need to operate a modern dealership —
              vehicles, customers, sales, agreements, payments and
              business insights.
            </p>

            <a
              href="#service-list"
              className="group inline-flex w-fit animate-[serviceUp_1s_.45s_ease-out_forwards] items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white opacity-0"
            >
              Explore

              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 transition-all duration-300 group-hover:border-blue-400 group-hover:bg-blue-600">
                <ArrowDownRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                />
              </span>
            </a>

          </div>

        </div>

      </div>
    </div>

  </section>

  {/* =====================================================
      INTRO / EDITORIAL
  ===================================================== */}

  <section
    ref={(element: HTMLDivElement | null) => {
      revealRefs.current["intro"] = element;
    }}
    data-reveal="intro"
    className={`px-5 py-24 transition-all duration-1000 ease-out sm:px-8 lg:px-12 lg:py-36 ${reveal(
      "intro"
    )}`}
  >

    <div className="mx-auto max-w-[1500px]">

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">

        <div className="lg:col-span-3">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500 dark:text-white/40">
            <span className="h-px w-7 bg-blue-600" />
            What we do
          </div>
        </div>

        <div className="lg:col-span-9">

          <h2 className="max-w-5xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-7xl">
            A complete operating system for your{" "}
            <span className="text-blue-600 dark:text-blue-400">
              dealership.
            </span>
          </h2>

          <div className="mt-10 flex max-w-3xl flex-col gap-7 border-t border-slate-300 pt-7 dark:border-white/10 sm:flex-row">

            <p className="text-sm leading-7 text-slate-600 dark:text-white/55">
              DealerPro brings the important parts of your dealership
              together into one connected experience.
            </p>

            <p className="text-sm leading-7 text-slate-600 dark:text-white/55">
              Spend less time moving between systems and more time
              focusing on vehicles, customers and business growth.
            </p>

          </div>

        </div>

      </div>

    </div>

  </section>

  {/* =====================================================
      SERVICE LIST
  ===================================================== */}

  <section
    id="service-list"
    className="bg-[#111820] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28"
  >

    <div className="mx-auto max-w-[1500px]">

      {/* Section heading */}
      <div
        ref={(element: HTMLDivElement | null) => {
          revealRefs.current["service-heading"] = element;
        }}
        data-reveal="service-heading"
        className={`mb-20 grid gap-8 transition-all duration-1000 ease-out lg:grid-cols-12 ${reveal(
          "service-heading"
        )}`}
      >

        <div className="lg:col-span-4">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
            <span className="h-px w-7 bg-blue-500" />
            Our services
          </div>
        </div>

        <div className="lg:col-span-8">
          <h2 className="max-w-4xl text-4xl font-semibold leading-[1] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            Designed around how dealerships actually work.
          </h2>
        </div>

      </div>

      {/* Services */}
      <div className="space-y-0">

        {services.map((service, index) => {
          const Icon = service.icon;
          const id = `service-${index}`;

          return (
            <div
              key={service.number}
              ref={(element: HTMLDivElement | null) => {
                revealRefs.current[id] = element;
              }}
              data-reveal={id}
              className={`group border-t border-white/10 transition-all duration-1000 ease-out ${reveal(
                id
              )}`}
              style={{
                transitionDelay: `${index * 80}ms`,
              }}
            >

              <div className="grid gap-8 py-12 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-20">

                {/* Number */}
                <div className="lg:col-span-1">
                  <span className="text-xs font-bold tracking-[0.2em] text-white/30">
                    {service.number}
                  </span>
                </div>

                {/* Title */}
                <div className="lg:col-span-4">

                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-blue-400 transition-all duration-500 group-hover:border-blue-500 group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={20} />
                  </div>

                  <h3 className="text-4xl font-semibold leading-none tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                    {service.title}
                  </h3>

                  <h3 className="mt-1 text-4xl font-semibold leading-none tracking-[-0.04em] text-blue-400 sm:text-5xl lg:text-6xl">
                    {service.accent}
                  </h3>

                </div>

                {/* Image */}
                <div className="overflow-hidden lg:col-span-4">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">

                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover grayscale-[20%] transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70" />

                    <div className="absolute bottom-4 left-4">
                      <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                        DealerPro
                      </span>
                    </div>

                  </div>
                </div>

                {/* Description */}
                <div className="flex h-full flex-col justify-between lg:col-span-3">

                  <p className="max-w-sm text-sm leading-7 text-white/50 sm:text-base">
                    {service.description}
                  </p>

                  <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">

                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                      Discover service
                    </span>

                    <button
                      type="button"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-all duration-300 hover:border-blue-500 hover:bg-blue-600"
                    >
                      <ArrowRight
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </button>

                  </div>

                </div>

              </div>

            </div>
          );
        })}

        <div className="border-t border-white/10" />

      </div>

    </div>

  </section>

  {/* =====================================================
      FEATURE IMAGE
  ===================================================== */}

  <section className="relative overflow-hidden bg-[#f5f5f3] px-5 py-24 dark:bg-[#02070d] sm:px-8 lg:px-12 lg:py-36">

    <div className="mx-auto max-w-[1500px]">

      <div
        ref={(element: HTMLDivElement | null) => {
          revealRefs.current["feature"] = element;
        }}
        data-reveal="feature"
        className={`grid gap-12 transition-all duration-1000 ease-out lg:grid-cols-12 lg:items-center ${reveal(
          "feature"
        )}`}
      >

        {/* Image */}
        <div className="relative lg:col-span-7">

          <div className="overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=2000&q=90"
              alt="DealerPro premium vehicle"
              className="h-[480px] w-full object-cover transition-transform duration-[1500ms] hover:scale-105 sm:h-[600px]"
            />
          </div>

          {/* Floating label */}
          <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-auto">

            <div className="flex items-center gap-4 border border-white/20 bg-black/50 px-5 py-4 backdrop-blur-xl">

              <div className="flex h-10 w-10 items-center justify-center bg-blue-600 text-white">
                <CarFront size={18} />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/50">
                  Connected platform
                </p>

                <p className="mt-1 text-sm font-semibold text-white">
                  Built for automotive businesses
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Text */}
        <div className="lg:col-span-5 lg:pl-10">

          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
            <span className="h-px w-7 bg-blue-600 dark:bg-blue-400" />
            One connected experience
          </div>

          <h2 className="mt-6 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            Less complexity.
            <span className="mt-1 block text-blue-600 dark:text-blue-400">
              More control.
            </span>
          </h2>

          <p className="mt-7 text-sm leading-7 text-slate-600 dark:text-white/50 sm:text-base">
            Your dealership shouldn't have to depend on disconnected
            tools for every part of the business. DealerPro creates a
            more unified workflow from inventory to customer and sale.
          </p>

          <div className="mt-9 space-y-5">

            <div className="flex gap-4 border-t border-slate-300 pt-5 dark:border-white/10">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                <Search size={17} />
              </div>

              <div>
                <h3 className="font-bold">
                  Find information quickly
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-white/40">
                  Important information stays accessible when your team
                  needs it.
                </p>
              </div>
            </div>

            <div className="flex gap-4 border-t border-slate-300 pt-5 dark:border-white/10">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                <LayoutDashboard size={17} />
              </div>

              <div>
                <h3 className="font-bold">
                  Manage everything centrally
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-white/40">
                  Keep your dealership operations organized from one
                  central platform.
                </p>
              </div>
            </div>

            <div className="flex gap-4 border-t border-slate-300 pt-5 dark:border-white/10">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                <ShieldCheck size={17} />
              </div>

              <div>
                <h3 className="font-bold">
                  Keep your workflow structured
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-white/40">
                  Give your team a clear and connected way to work.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>

  </section>

  {/* =====================================================
      NUMBERS / PROCESS
  ===================================================== */}

  <section className="border-y border-slate-200 bg-white px-5 py-20 dark:border-white/10 dark:bg-[#06111b] sm:px-8 lg:px-12 lg:py-28">

    <div className="mx-auto max-w-[1500px]">

      <div
        ref={(element: HTMLDivElement | null) => {
          revealRefs.current["numbers"] = element;
        }}
        data-reveal="numbers"
        className={`transition-all duration-1000 ease-out ${reveal(
          "numbers"
        )}`}
      >

        <div className="grid gap-10 md:grid-cols-3 md:gap-0">

          <div className="border-b border-slate-200 pb-8 md:border-b-0 md:border-r md:px-10 md:first:pl-0 dark:border-white/10">

            <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
              <CarFront size={18} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Vehicles
              </span>
            </div>

            <div className="mt-5 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
              01
            </div>

            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-500 dark:text-white/40">
              Centralized vehicle and inventory management.
            </p>

          </div>

          <div className="border-b border-slate-200 pb-8 md:border-b-0 md:border-r md:px-10 dark:border-white/10">

            <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
              <Users size={18} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Customers
              </span>
            </div>

            <div className="mt-5 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
              02
            </div>

            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-500 dark:text-white/40">
              Connected customer and sales workflows.
            </p>

          </div>

          <div className="pb-0 md:px-10 md:last:pr-0">

            <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
              <BarChart3 size={18} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Business
              </span>
            </div>

            <div className="mt-5 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
              03
            </div>

            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-500 dark:text-white/40">
              Useful visibility across dealership activity.
            </p>

          </div>

        </div>

      </div>

    </div>

  </section>

  {/* =====================================================
      CTA
  ===================================================== */}

  <section
    id="contact"
    className="relative overflow-hidden bg-blue-600 px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-36"
  >

    <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-white/10" />

    <div className="absolute -bottom-60 -left-40 h-[600px] w-[600px] rounded-full border border-white/10" />

    <div className="relative z-10 mx-auto max-w-[1500px]">

      <div
        ref={(element: HTMLDivElement | null) => {
          revealRefs.current["cta"] = element;
        }}
        data-reveal="cta"
        className={`transition-all duration-1000 ease-out ${reveal(
          "cta"
        )}`}
      >

        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">

          <div className="lg:col-span-8">

            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-8 bg-white/50" />

              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">
                Get started
              </span>
            </div>

            <h2 className="max-w-5xl text-5xl font-semibold leading-[.95] tracking-[-0.055em] sm:text-6xl lg:text-8xl">
              Your dealership.
              <span className="block text-white/60">
                Connected.
              </span>
            </h2>

          </div>

          <div className="lg:col-span-4">

            <p className="text-sm leading-7 text-white/75 sm:text-base">
              Bring vehicles, customers, sales, agreements and payments
              together with a professional dealership platform.
            </p>

            <a
              href="/signup"
              className="group mt-8 inline-flex items-center gap-4 bg-white px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-blue-600 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-100"
            >
              Get Started

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white">
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </a>

          </div>

        </div>

      </div>

    </div>

  </section>

  <Footer />

  {/* =====================================================
      ANIMATIONS
  ===================================================== */}

  <style>{`
    @keyframes serviceUp {
      from {
        opacity: 0;
        transform: translateY(45px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes serviceFade {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
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

export default Services;
