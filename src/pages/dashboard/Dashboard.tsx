import DashboardStats from "../../components/Dashboard/dashboardStats/DashboardStats";
import RecentUsers from "../../components/Dashboard/recentUsers/RecentUsers";
import RecentVehicles from "../../components/Dashboard/recentVehicles/RecentVehicles";
import RecentAgreements from "../../components/Dashboard/recentAgreements/RecentAgreements";
import RecentReceipts from "../../components/Dashboard/recentReceipts/RecentReceipts";

import { useUserProfile } from "../../utils/useUserProfile";

import {
  Loader2,
  CarFront,
  ArrowUpRight,
  Activity,
  ShieldCheck,
} from "lucide-react";

const Dashboard = () => {
  const { user, loading, error } = useUserProfile();

  // =========================================================
  // USER NAME
  // =========================================================

  const renderUserName = () => {
    if (loading) {
      return (
        <span className="inline-flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-blue-200" />
          Loading...
        </span>
      );
    }

    if (error || !user) {
      return "Dealer";
    }

    return `${user.first} ${user.last}`;
  };

  return (
    <div
      className="
        min-h-screen
        w-full
        overflow-x-hidden
        bg-[#F5F7FA]
        pb-8
        font-plus-jakarta
        transition-colors
        duration-300
        dark:bg-slate-950
        sm:pb-10
      "
    >
      {/* =====================================================
          HERO / WELCOME HEADER
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#002147]
          dark:bg-[#020d1c]
        "
      >
        {/* ===================================================
            BACKGROUND DECORATIONS
        =================================================== */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Blue glow */}
          <div
            className="
              absolute
              -right-32
              -top-40
              h-[380px]
              w-[380px]
              rounded-full
              bg-blue-500/10
              blur-3xl
              sm:-right-20
              sm:h-[500px]
              sm:w-[500px]
            "
          />

          {/* Cyan glow */}
          <div
            className="
              absolute
              -bottom-48
              left-1/3
              h-[350px]
              w-[350px]
              rounded-full
              bg-cyan-400/10
              blur-3xl
              sm:h-[450px]
              sm:w-[450px]
            "
          />

          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.035]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "42px 42px",
              }}
            />
          </div>

          {/* Decorative dots */}
          <div className="absolute right-[12%] top-10 h-2.5 w-2.5 rounded-full bg-blue-300/40 sm:h-3 sm:w-3" />

          <div className="absolute bottom-10 right-[25%] h-1.5 w-1.5 rounded-full bg-cyan-300/40 sm:bottom-12 sm:right-[30%] sm:h-2 sm:w-2" />
        </div>

        {/* ===================================================
            HERO CONTENT
        =================================================== */}

        <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb / Status */}
          <div className="flex items-center justify-between pt-5 sm:pt-6">
            <div className="flex min-w-0 items-center gap-2 text-[11px] text-blue-100/60 sm:text-xs">
              <CarFront className="h-4 w-4 shrink-0" />

              <span className="hidden xs:inline">
                DealerPro
              </span>

              <span>/</span>

              <span className="truncate text-white/90">
                Dashboard
              </span>
            </div>

            {/* System Online */}
            <div
              className="
                hidden
                shrink-0
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/10
                px-3
                py-1.5
                sm:flex
              "
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400" />

              <span className="text-xs font-medium text-blue-50">
                System Online
              </span>
            </div>
          </div>

          {/* =================================================
              WELCOME CONTENT
          ================================================= */}

          <div className="py-7 sm:py-9 lg:py-10">
            <div
              className="
                flex
                flex-col
                gap-6
                lg:flex-row
                lg:items-end
                lg:justify-between
                lg:gap-8
              "
            >
              {/* Welcome Text */}
              <div className="min-w-0">
                <div
                  className="
                    mb-3
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/10
                    bg-white/10
                    px-3
                    py-1.5
                    text-[11px]
                    font-semibold
                    text-blue-100
                    backdrop-blur-sm
                    sm:mb-4
                    sm:text-xs
                  "
                >
                  <Activity className="h-3.5 w-3.5" />

                  Dealership Overview
                </div>

                <h1
                  className="
                    text-2xl
                    font-bold
                    leading-tight
                    tracking-tight
                    text-white
                    sm:text-3xl
                    lg:text-4xl
                    xl:text-[42px]
                  "
                >
                  Welcome back,{" "}
                  <span className="text-blue-200">
                    {renderUserName()}
                  </span>{" "}
                  <span className="whitespace-nowrap">
                    👋
                  </span>
                </h1>

                <p
                  className="
                    mt-3
                    max-w-2xl
                    text-sm
                    leading-6
                    text-blue-100/70
                    sm:text-base
                  "
                >
                  Manage your vehicles, customers,
                  agreements and dealership activity
                  from one central dashboard.
                </p>
              </div>

              {/* =================================================
                  QUICK STATUS
              ================================================= */}

              <div
                className="
                  grid
                  grid-cols-1
                  gap-3
                  sm:grid-cols-2
                  lg:flex
                  lg:shrink-0
                "
              >
                {/* Account */}
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/10
                    px-4
                    py-3
                    backdrop-blur-sm
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-emerald-500/15
                    "
                  >
                    <ShieldCheck className="h-5 w-5 text-emerald-300" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] text-blue-100/55">
                      Account
                    </p>

                    <p className="truncate text-sm font-semibold text-white">
                      Active & Secure
                    </p>
                  </div>
                </div>

                {/* Platform */}
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/10
                    px-4
                    py-3
                    backdrop-blur-sm
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-400/10
                    "
                  >
                    <ArrowUpRight className="h-5 w-5 text-blue-200" />
                  </div>

                  <div>
                    <p className="text-[11px] text-blue-100/55">
                      Platform
                    </p>

                    <p className="text-sm font-semibold text-white">
                      DealerPro
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN DASHBOARD
      ===================================================== */}

      <main
        className="
          mx-auto
          w-full
          max-w-[1600px]
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* ===================================================
            STATISTICS
        =================================================== */}

        <section className="relative z-10 -mt-4 sm:-mt-5">
          <div
            className="
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-1
              shadow-sm
              transition-colors
              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            <DashboardStats />
          </div>
        </section>

        {/* ===================================================
            SECTION TITLE
        =================================================== */}

        <section className="mb-5 mt-7 sm:mt-8">
          <div
            className="
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
              <div className="flex items-center gap-2">
                <div
                  className="
                    h-5
                    w-1
                    rounded-full
                    bg-[#002147]
                    dark:bg-blue-500
                  "
                />

                <h2
                  className="
                    text-lg
                    font-bold
                    text-slate-900
                    dark:text-white
                    sm:text-xl
                  "
                >
                  Dealership Activity
                </h2>
              </div>

              <p
                className="
                  mt-1.5
                  text-sm
                  leading-5
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Keep track of your latest customers
                and vehicles.
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================
            USERS + VEHICLES
        =================================================== */}

        <section
          className="
            mb-5
            grid
            grid-cols-1
            gap-5
            xl:grid-cols-2
          "
        >
          {/* Recent Users */}
          <div
            className="
              min-w-0
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-sm
              transition-all
              duration-300
              hover:shadow-md
              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            <RecentUsers />
          </div>

          {/* Recent Vehicles */}
          <div
            className="
              min-w-0
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-sm
              transition-all
              duration-300
              hover:shadow-md
              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            <RecentVehicles />
          </div>
        </section>

        {/* ===================================================
            AGREEMENTS + RECEIPTS
        =================================================== */}

        <section
          className="
            grid
            grid-cols-1
            gap-5
            xl:grid-cols-2
          "
        >
          {/* Recent Agreements */}
          <div
            className="
              min-w-0
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-sm
              transition-all
              duration-300
              hover:shadow-md
              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            <RecentAgreements />
          </div>

          {/* Recent Receipts */}
          <div
            className="
              min-w-0
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-sm
              transition-all
              duration-300
              hover:shadow-md
              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            <RecentReceipts />
          </div>
        </section>

        {/* ===================================================
            FOOTER STATUS
        =================================================== */}

        <footer
          className="
            mt-7
            flex
            flex-col
            gap-3
            border-t
            border-slate-200
            py-5
            sm:flex-row
            sm:items-center
            sm:justify-between
            dark:border-slate-800
          "
        >
          {/* Platform */}
          <div
            className="
              flex
              min-w-0
              items-center
              gap-2
              text-xs
              text-slate-400
              dark:text-slate-500
            "
          >
            <CarFront className="h-3.5 w-3.5 shrink-0" />

            <span className="truncate">
              DealerPro • Dealership Management Platform
            </span>
          </div>

          {/* System Status */}
          <div
            className="
              flex
              items-center
              gap-2
              text-xs
              text-slate-400
              dark:text-slate-500
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

            <span>
              All systems operational
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
