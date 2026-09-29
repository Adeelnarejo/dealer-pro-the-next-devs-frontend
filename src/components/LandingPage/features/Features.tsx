import {
  ArrowRight,
  BarChart3,
  CarFront,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  Gauge,
  LayoutDashboard,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";

import Header from "../Header";
import Footer from "../Footer";

const Features = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-[#020b16] dark:text-white">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <Header />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-[calc(100vh-0px)] overflow-hidden bg-slate-950">

        {/* Background Image */}

        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=2400&q=90"
            alt="Modern dealership vehicles"
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

              <Zap
                size={16}
                className="text-blue-400"
              />

              <span className="text-xs font-semibold uppercase tracking-wider text-white/90 sm:text-sm">
                Powerful Dealership Features
              </span>

            </div>

            {/* Heading */}

            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">

              Everything you need to
              <span className="mt-2 block text-blue-400">
                run your dealership.
              </span>

            </h1>

            {/* Description */}

            <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base lg:text-lg">
              Powerful tools designed to help you manage vehicles,
              customers, sales and dealership operations from one
              simple and professional platform.
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
                Explore Features

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
                <LayoutDashboard size={18} />

                View Platform

              </button>

            </div>

            {/* Trust Points */}

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3">

              <div className="flex items-center gap-2 text-sm text-white/85">
                <CheckCircle2
                  size={17}
                  className="text-blue-400"
                />
                Simple Management
              </div>

              <div className="flex items-center gap-2 text-sm text-white/85">
                <CheckCircle2
                  size={17}
                  className="text-blue-400"
                />
                Real-Time Overview
              </div>

              <div className="flex items-center gap-2 text-sm text-white/85">
                <CheckCircle2
                  size={17}
                  className="text-blue-400"
                />
                Built for Dealers
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FEATURES INTRO
      ===================================================== */}

      <section
        id="features"
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
              Platform Features
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Everything is connected in one place
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
              DealerPro brings the essential tools of your dealership
              together so your team can work faster, stay organized
              and make better decisions.
            </p>

          </div>

          {/* Feature Cards */}

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

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
                  dark:bg-blue-500/10
                  dark:text-blue-400
                "
              >
                <CarFront size={23} />
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Vehicle Management
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Manage your complete vehicle inventory, specifications,
                pricing and availability from one central platform.
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
                  dark:bg-blue-500/10
                  dark:text-blue-400
                "
              >
                <Users size={23} />
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Customer Management
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Keep customer information organized and manage every
                interaction throughout the sales process.
              </p>

            </div>

            {/* Sales Management */}

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
                  dark:bg-blue-500/10
                  dark:text-blue-400
                "
              >
                <CircleDollarSign size={23} />
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Sales Management
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Manage sales agreements, payments and transactions
                with a streamlined dealership workflow.
              </p>

            </div>

            {/* Dashboard */}

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
                  dark:bg-blue-500/10
                  dark:text-blue-400
                "
              >
                <LayoutDashboard size={23} />
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Smart Dashboard
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Get a clear overview of your vehicles, customers,
                agreements, payments and dealership activity.
              </p>

            </div>

            {/* Analytics */}

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
                  dark:bg-blue-500/10
                  dark:text-blue-400
                "
              >
                <BarChart3 size={23} />
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Business Insights
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Understand your dealership activity with clear
                information and useful business insights.
              </p>

            </div>

            {/* Secure Platform */}

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
                  dark:bg-blue-500/10
                  dark:text-blue-400
                "
              >
                <ShieldCheck size={23} />
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Secure Platform
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Keep your dealership data organized with secure
                access and a professional management environment.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          WORKFLOW SECTION
      ===================================================== */}

      <section className="bg-white px-5 py-20 dark:bg-[#020b16] sm:px-8 lg:px-10">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            {/* Left */}

            <div>

              <span className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Simple Workflow
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Built to keep your dealership moving
              </h2>

              <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-400">
                From adding vehicles to managing customers and
                completing sales, DealerPro keeps your daily
                dealership workflow simple and connected.
              </p>

              <div className="mt-8 space-y-5">

                {/* Step 1 */}

                <div className="flex gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
                    01
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      Add and manage vehicles
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      Keep your inventory accurate and up to date.
                    </p>
                  </div>

                </div>

                {/* Step 2 */}

                <div className="flex gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
                    02
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      Manage your customers
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      Keep customer details and sales activity organized.
                    </p>
                  </div>

                </div>

                {/* Step 3 */}

                <div className="flex gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
                    03
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      Complete your sales
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      Manage agreements, payments and transactions.
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* Right Card */}

            <div className="relative">

              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-2xl dark:border-slate-800 dark:bg-[#0b1a2b]">

                <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-[#102238]">

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        Dealership Overview
                      </p>

                      <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                        Today's Activity
                      </h3>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                      <Gauge size={20} />
                    </div>

                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">

                    <div className="rounded-2xl bg-slate-50 p-4 dark:bg-[#0b1a2b]">

                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <CarFront size={16} />

                        <span className="text-xs">
                          Vehicles
                        </span>
                      </div>

                      <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                        128
                      </p>

                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4 dark:bg-[#0b1a2b]">

                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <Users size={16} />

                        <span className="text-xs">
                          Customers
                        </span>
                      </div>

                      <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                        246
                      </p>

                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4 dark:bg-[#0b1a2b]">

                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <ClipboardList size={16} />

                        <span className="text-xs">
                          Agreements
                        </span>
                      </div>

                      <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                        42
                      </p>

                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4 dark:bg-[#0b1a2b]">

                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <CircleDollarSign size={16} />

                        <span className="text-xs">
                          Payments
                        </span>
                      </div>

                      <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                        86
                      </p>

                    </div>

                  </div>

                  <div className="mt-5 rounded-2xl bg-blue-600 p-4">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-xs text-blue-100">
                          Platform Status
                        </p>

                        <p className="mt-1 text-sm font-bold text-white">
                          Everything is running smoothly
                        </p>

                      </div>

                      <CheckCircle2
                        size={22}
                        className="text-white"
                      />

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

                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Ready to simplify your dealership?
                </h2>

                <p className="mt-3 text-sm leading-6 text-blue-100 sm:text-base">
                  Bring vehicles, customers, sales and daily
                  operations together in one powerful platform.
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

export default Features;