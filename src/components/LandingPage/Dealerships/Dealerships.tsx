import {
  ArrowRight,
  Building2,
  CheckCircle2,
  CarFront,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";

import Header from "../Header";

import Footer from "../Footer";

const Dealerships = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-[#020b16] dark:text-white">
      <Header />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-slate-950">
        {/* Temporary Dealership Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1562141961-bf0d5c2b2e1d?auto=format&fit=crop&w=2400&q=90"
            alt="Modern car dealership"
            className="h-full w-full object-cover object-center"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/55" />

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl items-center px-5 py-20 sm:px-8 lg:px-10">
          <div className="max-w-3xl">

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
              <ShieldCheck
                size={16}
                className="text-blue-400"
              />

              <span className="text-xs font-semibold uppercase tracking-wider text-white/90 sm:text-sm">
                Built for Modern Dealerships
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Run your dealership.

              <span className="mt-2 block text-blue-400">
                Smarter and simpler.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base lg:text-lg">
              Everything your dealership needs to manage vehicles,
              customers, sales and daily operations from one powerful
              platform.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <button
                type="button"
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-blue-600
                  px-6
                  py-3.5
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  shadow-blue-600/20
                  transition-all
                  duration-300
                  hover:bg-blue-700
                  hover:shadow-blue-600/30
                  active:scale-[0.98]
                "
              >
                Explore Dealerships

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <button
                type="button"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-white/25
                  bg-white/10
                  px-6
                  py-3.5
                  text-sm
                  font-bold
                  text-white
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:bg-white/20
                  active:scale-[0.98]
                "
              >
                <Building2 size={18} />

                View Dealerships
              </button>

            </div>

            {/* Trust Points */}
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3">

              <div className="flex items-center gap-2 text-sm text-white/85">
                <CheckCircle2
                  size={17}
                  className="text-blue-400"
                />
                Professional Management
              </div>

              <div className="flex items-center gap-2 text-sm text-white/85">
                <CheckCircle2
                  size={17}
                  className="text-blue-400"
                />
                Verified Businesses
              </div>

              <div className="flex items-center gap-2 text-sm text-white/85">
                <CheckCircle2
                  size={17}
                  className="text-blue-400"
                />
                Easy Operations
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          DEALERSHIP FEATURES
      ===================================================== */}

      <section
        id="features"
        className="bg-slate-50 px-5 py-20 dark:bg-[#06111f] sm:px-8 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">

          {/* Section Header */}
          <div className="max-w-2xl">

            <span className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Dealership Management
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Everything your dealership needs
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
              Keep your dealership organized, connected and ready
              to grow with powerful tools built around your business.
            </p>

          </div>

          {/* Feature Cards */}
          <div className="mt-10 grid gap-5 md:grid-cols-3">

            {/* Dealership Management */}
            <div
              className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
                dark:border-slate-800
                dark:bg-[#0b1a2b]
              "
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <Building2 size={23} />
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Dealership Management
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Manage your dealership information, operations and
                business activity from one central platform.
              </p>
            </div>

            {/* Customer Management */}
            <div
              className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
                dark:border-slate-800
                dark:bg-[#0b1a2b]
              "
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <Users size={23} />
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Customer Management
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Keep customer information organized and make it
                easier to manage every interaction.
              </p>
            </div>

            {/* Vehicle Management */}
            <div
              className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
                dark:border-slate-800
                dark:bg-[#0b1a2b]
              "
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <CarFront size={23} />
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Vehicle Management
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Manage your vehicle inventory, details and status
                with a simple and professional workflow.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="bg-white px-5 py-20 dark:bg-[#020b16] sm:px-8 lg:px-10">
        <div
          className="
            mx-auto
            max-w-7xl
            overflow-hidden
            rounded-3xl
            bg-blue-600
            px-6
            py-12
            shadow-2xl
            shadow-blue-600/20
            sm:px-10
            lg:px-14
          "
        >
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">

            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to manage your dealership better?
              </h2>

              <p className="mt-3 text-sm leading-6 text-blue-100 sm:text-base">
                Bring your vehicles, customers and dealership
                operations together in one simple platform.
              </p>
            </div>

            <button
              type="button"
              className="
                group
                inline-flex
                shrink-0
                items-center
                gap-2
                rounded-xl
                bg-white
                px-6
                py-3.5
                text-sm
                font-bold
                text-blue-600
                shadow-lg
                transition-all
                duration-300
                hover:bg-slate-50
                active:scale-[0.98]
              "
            >
              Get Started

              <ArrowRight
                size={18}
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

export default Dealerships;