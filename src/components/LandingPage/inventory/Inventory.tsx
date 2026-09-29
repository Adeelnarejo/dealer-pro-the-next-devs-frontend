import {
  ArrowRight,
  CarFront,
  CheckCircle2,
  Gauge,
  ShieldCheck,
  Zap,
  Search,
  Sparkles,
  BarChart3,
  Users,
  Clock3,
} from "lucide-react";

import Header from "../Header";
import Footer from "../Footer";

const Inventory = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white font-plus-jakarta text-slate-900 transition-colors duration-300 dark:bg-[#020b16] dark:text-white">
      <Header />

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-[#020812]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2400&q=90"
            alt="Premium vehicle"
            className="h-full w-full object-cover object-center"
          />

          {/* Dark overlays */}
          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />

          {/* Blue glow */}
          <div className="absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-blue-600/20 blur-[120px]" />
          <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-blue-500/10 blur-[130px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-[1600px] items-center px-5 py-20 sm:px-8 lg:px-12 xl:px-16">
          <div className="w-full max-w-4xl">

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3.5 py-2 shadow-lg backdrop-blur-xl sm:px-4">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20">
                <ShieldCheck size={14} className="text-blue-400" />
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/90 sm:text-xs">
                Premium Vehicle Management
              </span>
            </div>

            {/* Heading */}
            <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.04] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px]">
              Everything your dealership needs.

              <span className="mt-2 block bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                All in one place.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base lg:text-lg">
              Manage your vehicles, showcase your inventory and run your
              dealership with a powerful platform designed for modern
              automotive businesses.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <button
                type="button"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue-600/30 active:scale-[0.98]"
              >
                Explore Vehicles

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <button
                type="button"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.08] px-6 text-sm font-bold text-white shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.15] active:scale-[0.98]"
              >
                <CarFront size={17} />
                View Inventory
              </button>
            </div>

            {/* Trust Points */}
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 sm:gap-x-8">
              <div className="flex items-center gap-2 text-xs font-medium text-white/80 sm:text-sm">
                <CheckCircle2 size={16} className="text-blue-400" />
                Trusted Dealers
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-white/80 sm:text-sm">
                <CheckCircle2 size={16} className="text-blue-400" />
                Verified Vehicles
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-white/80 sm:text-sm">
                <CheckCircle2 size={16} className="text-blue-400" />
                Simple Management
              </div>
            </div>

            {/* Mini stats */}
            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-md">
                <p className="text-xl font-extrabold text-white">24/7</p>
                <p className="mt-1 text-[10px] text-white/50 sm:text-xs">
                  Platform Access
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-md">
                <p className="text-xl font-extrabold text-white">100%</p>
                <p className="mt-1 text-[10px] text-white/50 sm:text-xs">
                  Digital Management
                </p>
              </div>

              <div className="col-span-2 rounded-xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-md sm:col-span-1">
                <p className="text-xl font-extrabold text-white">Smart</p>
                <p className="mt-1 text-[10px] text-white/50 sm:text-xs">
                  Dealership Tools
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#020812] to-transparent" />
      </section>

      {/* =====================================================
          INTRO / FEATURES
      ===================================================== */}
      <section
        id="features"
        className="relative overflow-hidden bg-slate-50 px-5 py-20 transition-colors duration-300 dark:bg-[#06111f] sm:px-8 lg:px-10 lg:py-24"
      >
        {/* Decorative glow */}
        <div className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-blue-500/[0.04] blur-3xl dark:bg-blue-500/[0.06]" />

        <div className="relative mx-auto max-w-7xl">

          {/* Section Heading */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
              <Sparkles size={14} />
              Built for dealerships
            </div>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              A smarter way to manage your vehicles
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
              Keep your dealership organized with everything you need to
              manage, present and grow your vehicle inventory professionally.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="mt-12 grid gap-5 md:grid-cols-3">

            {/* Card 1 */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-900/[0.06] dark:border-slate-800 dark:bg-[#0b1a2b] dark:hover:border-blue-500/20 dark:hover:shadow-black/20">
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/[0.04] blur-2xl transition-all duration-300 group-hover:bg-blue-500/[0.08]" />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-transform duration-300 group-hover:scale-105 dark:bg-blue-500/10 dark:text-blue-400">
                  <CarFront size={23} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                  Vehicle Management
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Keep all your vehicle information organized and easy to
                  manage from one central platform.
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400">
                  <span>Manage inventory</span>
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-900/[0.06] dark:border-slate-800 dark:bg-[#0b1a2b] dark:hover:border-blue-500/20 dark:hover:shadow-black/20">
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-indigo-500/[0.04] blur-2xl transition-all duration-300 group-hover:bg-indigo-500/[0.08]" />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 transition-transform duration-300 group-hover:scale-105 dark:bg-indigo-500/10 dark:text-indigo-400">
                  <Gauge size={23} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                  Complete Overview
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Get a clear overview of your dealership, vehicles, customers
                  and daily operations.
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  <span>Track performance</span>
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-900/[0.06] dark:border-slate-800 dark:bg-[#0b1a2b] dark:hover:border-blue-500/20 dark:hover:shadow-black/20">
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-500/[0.04] blur-2xl transition-all duration-300 group-hover:bg-cyan-500/[0.08]" />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 transition-transform duration-300 group-hover:scale-105 dark:bg-cyan-500/10 dark:text-cyan-400">
                  <Zap size={23} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                  Fast & Simple
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Spend less time managing your dealership and more time
                  focusing on your customers.
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-cyan-600 dark:text-cyan-400">
                  <span>Work smarter</span>
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          OPERATIONS SECTION
      ===================================================== */}
      <section className="bg-white px-5 py-20 dark:bg-[#020b16] sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
              <BarChart3 size={13} />
              One powerful platform
            </div>

            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Everything stays connected.
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
              From vehicle inventory to customer management, DealerPro gives
              your team the tools to keep daily dealership operations
              organized and efficient.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <CarFront size={17} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Centralized vehicle data
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    Keep specifications, availability and vehicle details in
                    one organized system.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  <Users size={17} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Better customer workflow
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    Connect customers, agreements and vehicles without
                    unnecessary complexity.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Clock3 size={17} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Save valuable time
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    Reduce repetitive administration and keep your dealership
                    moving faster.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative">
            <div className="absolute -inset-5 rounded-[32px] bg-blue-500/[0.04] blur-2xl dark:bg-blue-500/[0.06]" />

            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-3 shadow-xl dark:border-slate-800 dark:bg-[#0b1a2b]">
              <div className="relative h-[340px] overflow-hidden rounded-2xl sm:h-[420px]">
                <img
                  src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=85"
                  alt="Luxury car"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                {/* Floating card */}
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-black/35 p-4 backdrop-blur-xl sm:left-6 sm:right-auto sm:min-w-[280px]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                        DealerPro
                      </p>

                      <p className="mt-1 text-base font-bold text-white">
                        Smarter inventory.
                      </p>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
                      <CarFront size={17} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#002147] px-6 py-12 shadow-2xl shadow-blue-950/20 sm:px-10 lg:px-14">
          <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center gap-2 text-blue-300">
                <Sparkles size={16} />
                <span className="text-xs font-bold uppercase tracking-[0.15em]">
                  DealerPro
                </span>
              </div>

              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
                Ready to simplify your dealership?
              </h2>

              <p className="mt-3 text-sm leading-6 text-blue-100/70 sm:text-base">
                Bring your vehicles, customers and daily operations together
                in one modern dealership platform.
              </p>
            </div>

            <button
              type="button"
              className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-[#002147] shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-50 active:scale-[0.98]"
            >
              Get Started

              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Inventory;