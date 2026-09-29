import {
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
} from "lucide-react";

import Header from "../Header";
import Footer from "../Footer";

const Services = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-[#020b16] dark:text-white">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <Header />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-screen overflow-hidden bg-slate-950">

        {/* Background */}

        <div className="absolute inset-0">

          <img
            src="https://images.unsplash.com/photo-1562141961-bf0d5c2b2e1d?auto=format&fit=crop&w=2400&q=90"
            alt="Professional car dealership"
            className="h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-black/60" />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />

        </div>

        {/* Hero Content */}

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-5 py-24 sm:px-8 lg:px-10">

          <div className="max-w-3xl">

            {/* Badge */}

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">

              <Sparkles
                size={16}
                className="text-blue-400"
              />

              <span className="text-xs font-semibold uppercase tracking-wider text-white/90 sm:text-sm">
                Complete Dealership Services
              </span>

            </div>

            {/* Heading */}

            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">

              Services designed for
              <span className="mt-2 block text-blue-400">
                modern dealerships.
              </span>

            </h1>

            {/* Description */}

            <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base lg:text-lg">
              From vehicle management to customer relationships,
              sales and payments, DealerPro gives your dealership
              the tools it needs to operate smoothly every day.
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
                Explore Services

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
                <Headphones size={18} />

                Contact Support

              </button>

            </div>

            {/* Trust Points */}

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3">

              <div className="flex items-center gap-2 text-sm text-white/85">

                <CheckCircle2
                  size={17}
                  className="text-blue-400"
                />

                Professional Tools

              </div>

              <div className="flex items-center gap-2 text-sm text-white/85">

                <CheckCircle2
                  size={17}
                  className="text-blue-400"
                />

                Simple Workflow

              </div>

              <div className="flex items-center gap-2 text-sm text-white/85">

                <CheckCircle2
                  size={17}
                  className="text-blue-400"
                />

                Dealer Focused

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          SERVICES INTRO
      ===================================================== */}

      <section
        id="services"
        className="
          bg-slate-50
          px-5
          py-20
          dark:bg-[#06111f]
          sm:px-8
          lg:px-10
        "
      >

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">

            <span className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              What We Provide
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Everything your dealership needs
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
              Manage the important parts of your dealership with
              services built around vehicles, customers, agreements
              and business operations.
            </p>

          </div>

          {/* Service Grid */}

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {/* =================================================
                VEHICLE SERVICE
            ================================================= */}

            <div
              className="
                group
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

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-100
                  text-blue-600
                  transition
                  group-hover:bg-blue-600
                  group-hover:text-white
                  dark:bg-blue-500/10
                  dark:text-blue-400
                "
              >
                <CarFront size={23} />
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Vehicle Services
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Manage vehicle information, inventory, availability,
                pricing and status from one organized platform.
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span>Learn more</span>
                <ArrowRight size={14} />
              </div>

            </div>

            {/* =================================================
                CUSTOMER SERVICE
            ================================================= */}

            <div
              className="
                group
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

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-100
                  text-blue-600
                  transition
                  group-hover:bg-blue-600
                  group-hover:text-white
                  dark:bg-blue-500/10
                  dark:text-blue-400
                "
              >
                <Users size={23} />
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Customer Services
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Organize customer information and keep every customer
                interaction connected to your dealership workflow.
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span>Learn more</span>
                <ArrowRight size={14} />
              </div>

            </div>

            {/* =================================================
                SALES SERVICE
            ================================================= */}

            <div
              className="
                group
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

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-100
                  text-blue-600
                  transition
                  group-hover:bg-blue-600
                  group-hover:text-white
                  dark:bg-blue-500/10
                  dark:text-blue-400
                "
              >
                <ClipboardCheck size={23} />
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Sales Management
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Handle sales agreements, customer transactions and
                dealership sales activity with a clear workflow.
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span>Learn more</span>
                <ArrowRight size={14} />
              </div>

            </div>

            {/* =================================================
                AGREEMENT SERVICE
            ================================================= */}

            <div
              className="
                group
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

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-100
                  text-blue-600
                  transition
                  group-hover:bg-blue-600
                  group-hover:text-white
                  dark:bg-blue-500/10
                  dark:text-blue-400
                "
              >
                <FileText size={23} />
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Agreement Management
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Create, manage and track dealership agreements with
                organized information and simple digital workflows.
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span>Learn more</span>
                <ArrowRight size={14} />
              </div>

            </div>

            {/* =================================================
                PAYMENT SERVICE
            ================================================= */}

            <div
              className="
                group
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

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-100
                  text-blue-600
                  transition
                  group-hover:bg-blue-600
                  group-hover:text-white
                  dark:bg-blue-500/10
                  dark:text-blue-400
                "
              >
                <CreditCard size={23} />
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Payment Services
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Keep payment activity organized and make it easier
                to track financial transactions across your business.
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span>Learn more</span>
                <ArrowRight size={14} />
              </div>

            </div>

            {/* =================================================
                ANALYTICS SERVICE
            ================================================= */}

            <div
              className="
                group
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

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-100
                  text-blue-600
                  transition
                  group-hover:bg-blue-600
                  group-hover:text-white
                  dark:bg-blue-500/10
                  dark:text-blue-400
                "
              >
                <BarChart3 size={23} />
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Business Analytics
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Get useful visibility into vehicles, customers,
                agreements, payments and dealership activity.
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span>Learn more</span>
                <ArrowRight size={14} />
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          SERVICE EXPERIENCE
      ===================================================== */}

      <section className="bg-white px-5 py-20 dark:bg-[#020b16] sm:px-8 lg:px-10">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            {/* Left Content */}

            <div>

              <span className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                A Better Experience
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Less complexity.
                <span className="block text-blue-600 dark:text-blue-400">
                  More control.
                </span>
              </h2>

              <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-400">
                DealerPro brings your dealership operations into
                one connected experience, helping your team spend
                less time switching between systems.
              </p>

              <div className="mt-8 space-y-5">

                {/* Item 1 */}

                <div className="flex gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    <Search size={20} />
                  </div>

                  <div>

                    <h3 className="font-bold text-slate-900 dark:text-white">
                      Find information quickly
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      Access important vehicle and customer information
                      without unnecessary steps.
                    </p>

                  </div>

                </div>

                {/* Item 2 */}

                <div className="flex gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    <LayoutDashboard size={20} />
                  </div>

                  <div>

                    <h3 className="font-bold text-slate-900 dark:text-white">
                      Manage everything centrally
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      Keep your dealership operations organized from
                      one central dashboard.
                    </p>

                  </div>

                </div>

                {/* Item 3 */}

                <div className="flex gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    <ShieldCheck size={20} />
                  </div>

                  <div>

                    <h3 className="font-bold text-slate-900 dark:text-white">
                      Work with confidence
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      Keep your dealership information structured and
                      accessible to the right people.
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* Right Visual */}

            <div className="relative">

              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-2xl dark:border-slate-800 dark:bg-[#0b1a2b]">

                <div className="relative overflow-hidden rounded-2xl">

                  <img
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=85"
                    alt="Premium vehicle"
                    className="h-[420px] w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6">

                    <div className="rounded-2xl border border-white/20 bg-black/35 p-5 backdrop-blur-md">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                          <CarFront size={19} />
                        </div>

                        <div>

                          <p className="text-xs text-white/60">
                            Dealership Operations
                          </p>

                          <p className="mt-1 text-sm font-bold text-white">
                            Everything connected in one place
                          </p>

                        </div>

                      </div>

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

      <section className="bg-slate-50 px-5 py-20 dark:bg-[#06111f] sm:px-8 lg:px-10">

        <div className="mx-auto max-w-7xl">

          <div className="overflow-hidden rounded-3xl bg-blue-600 px-6 py-12 shadow-2xl shadow-blue-600/20 sm:px-10 lg:px-14">

            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">

              <div className="max-w-2xl">

                <div className="mb-4 flex items-center gap-2 text-blue-100">

                  <Sparkles size={18} />

                  <span className="text-xs font-bold uppercase tracking-widest">
                    Get Started
                  </span>

                </div>

                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Ready to improve your dealership workflow?
                </h2>

                <p className="mt-3 text-sm leading-6 text-blue-100 sm:text-base">
                  Bring vehicles, customers, sales, agreements and
                  payments together with one professional platform.
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

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />

    </div>
  );
};

export default Services;