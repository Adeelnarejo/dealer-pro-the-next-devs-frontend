import React, { useEffect, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  CircleAlert,
  CreditCard,
  FileCheck2,
  RefreshCw,
  TrendingUp,
  UsersRound,
  CarFront,
} from "lucide-react";

import { makeGetRequest } from "../../../api/Api";
import {
  UsersIcon,
  VehiclesIcon,
  RevenueIcon,
  AgreementsIcon,
} from "../../utils/Icons";

interface Vehicle {
  status: string;
}

interface Payment {
  total_amount: number;
  createdAt: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  accent: string;
  iconBackground: string;
  error?: boolean;
  loading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  accent,
  iconBackground,
  error = false,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#0B1628]">
        <div className="animate-pulse">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="h-3 w-28 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="mt-4 h-8 w-20 rounded-lg bg-slate-200 dark:bg-slate-700" />
              <div className="mt-3 h-2.5 w-24 rounded bg-slate-100 dark:bg-slate-800" />
            </div>

            <div className="h-11 w-11 rounded-xl bg-slate-200 dark:bg-slate-700" />
          </div>

          <div className="mt-5 h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:bg-[#0B1628] ${
        error
          ? "border-red-200 dark:border-red-500/20"
          : "border-slate-200 dark:border-slate-800"
      }`}
    >
      {/* Top accent */}
      <div
        className={`absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r ${accent} opacity-70`}
      />

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-xs font-semibold text-slate-500 dark:text-slate-400">
              {title}
            </p>

            {!error && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <Activity className="h-2.5 w-2.5" />
              </span>
            )}
          </div>

          {error ? (
            <div className="mt-3 flex items-center gap-2">
              <CircleAlert className="h-4 w-4 text-red-500 dark:text-red-400" />

              <p className="text-sm font-semibold text-red-500 dark:text-red-400">
                Failed to load
              </p>
            </div>
          ) : (
            <>
              <div className="mt-3 flex items-end gap-2">
                <p className="truncate text-[30px] font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-[32px]">
                  {value}
                </p>

                {subtitle && (
                  <p className="mb-1.5 truncate text-[10px] font-bold text-blue-600 dark:text-blue-400">
                    {subtitle}
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBackground} transition-transform duration-300 group-hover:scale-105`}
        >
          {error ? (
            <CircleAlert className="h-5 w-5 text-red-500 dark:text-red-400" />
          ) : (
            icon
          )}
        </div>
      </div>

      {!error && (
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Live data
            </span>
          </div>

          <ArrowUpRight className="h-3.5 w-3.5 text-slate-300 transition-colors group-hover:text-blue-500 dark:text-slate-600 dark:group-hover:text-blue-400" />
        </div>
      )}

      {/* Bottom glow */}
      <div className="pointer-events-none absolute -bottom-12 -right-12 h-24 w-24 rounded-full bg-blue-500/5 blur-2xl transition-opacity group-hover:opacity-100" />
    </div>
  );
};

interface DashboardStat {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  accent: string;
  iconBackground: string;
  loading: boolean;
  error: boolean;
  key: "payments" | "vehicles" | "revenue" | "agreements";
}

const DashboardStats = () => {
  const [stats, setStats] = useState<DashboardStat[]>([
    {
      title: "Total Payments",
      value: "0",
      subtitle: "This Month",
      accent: "from-blue-500 to-cyan-400",
      iconBackground:
        "bg-blue-50 dark:bg-blue-500/10",
      icon: (
        <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      ),
      loading: true,
      error: false,
      key: "payments",
    },
    {
      title: "Total Vehicles",
      value: "0",
      subtitle: "0% Active",
      accent: "from-emerald-500 to-teal-400",
      iconBackground:
        "bg-emerald-50 dark:bg-emerald-500/10",
      icon: (
        <CarFront className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
      ),
      loading: true,
      error: false,
      key: "vehicles",
    },
    {
      title: "Total Revenue",
      value: "0",
      subtitle: "This Month",
      accent: "from-violet-500 to-purple-400",
      iconBackground:
        "bg-violet-50 dark:bg-violet-500/10",
      icon: (
        <TrendingUp className="h-5 w-5 text-violet-600 dark:text-violet-400" />
      ),
      loading: true,
      error: false,
      key: "revenue",
    },
    {
      title: "Pending Agreements",
      value: "0",
      subtitle: "Awaiting Action",
      accent: "from-amber-500 to-orange-400",
      iconBackground:
        "bg-amber-50 dark:bg-amber-500/10",
      icon: (
        <FileCheck2 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
      ),
      loading: true,
      error: false,
      key: "agreements",
    },
  ]);

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchStats = async () => {
      try {
        const [
          paymentsRes,
          vehiclesRes,
          paymentsForRevenueRes,
          agreementsRes,
        ] = await Promise.allSettled([
          makeGetRequest("payments/getAllPayments"),
          makeGetRequest("vehicles/getAllVehicles"),
          makeGetRequest("payments/getAllPayments"),
          makeGetRequest("banksign/getallagreementstatus"),
        ]);

        if (!mounted) return;

        /* =====================================================
           PAYMENTS
        ===================================================== */

        if (
          paymentsRes.status === "fulfilled" &&
          paymentsRes.value.data?.success
        ) {
          const payments: Payment[] =
            paymentsRes.value.data.data || [];

          const totalPayments = payments.length;

          const currentMonth = new Date().getMonth();
          const currentYear = new Date().getFullYear();

          const monthlyPayments = payments.filter((payment) => {
            const paymentDate = new Date(payment.createdAt);

            return (
              paymentDate.getMonth() === currentMonth &&
              paymentDate.getFullYear() === currentYear
            );
          }).length;

          setStats((previous) =>
            previous.map((stat) =>
              stat.key === "payments"
                ? {
                    ...stat,
                    value: totalPayments.toString(),
                    subtitle: `${monthlyPayments} This Month`,
                    loading: false,
                    error: false,
                  }
                : stat
            )
          );
        } else {
          setStats((previous) =>
            previous.map((stat) =>
              stat.key === "payments"
                ? {
                    ...stat,
                    loading: false,
                    error: true,
                  }
                : stat
            )
          );
        }

        /* =====================================================
           VEHICLES
        ===================================================== */

        if (
          vehiclesRes.status === "fulfilled" &&
          vehiclesRes.value.data?.success
        ) {
          const vehicles: Vehicle[] =
            vehiclesRes.value.data.data || [];

          const totalVehicles = vehicles.length;

          const availableVehicles = vehicles.filter(
            (vehicle) =>
              vehicle.status?.toLowerCase() === "available" ||
              vehicle.status?.toLowerCase() === "in stock"
          ).length;

          const activePercentage =
            totalVehicles > 0
              ? Math.round(
                  (availableVehicles / totalVehicles) * 100
                )
              : 0;

          setStats((previous) =>
            previous.map((stat) =>
              stat.key === "vehicles"
                ? {
                    ...stat,
                    value: totalVehicles.toString(),
                    subtitle: `${activePercentage}% Active`,
                    loading: false,
                    error: false,
                  }
                : stat
            )
          );
        } else {
          setStats((previous) =>
            previous.map((stat) =>
              stat.key === "vehicles"
                ? {
                    ...stat,
                    loading: false,
                    error: true,
                  }
                : stat
            )
          );
        }

        /* =====================================================
           REVENUE
        ===================================================== */

        if (
          paymentsForRevenueRes.status === "fulfilled" &&
          paymentsForRevenueRes.value.data?.success
        ) {
          const payments: Payment[] =
            paymentsForRevenueRes.value.data.data || [];

          const currentMonth = new Date().getMonth();
          const currentYear = new Date().getFullYear();

          const monthlyTotal = payments
            .filter((payment) => {
              const paymentDate = new Date(payment.createdAt);

              return (
                paymentDate.getMonth() === currentMonth &&
                paymentDate.getFullYear() === currentYear
              );
            })
            .reduce(
              (sum, payment) =>
                sum + Number(payment.total_amount || 0),
              0
            );

          setStats((previous) =>
            previous.map((stat) =>
              stat.key === "revenue"
                ? {
                    ...stat,
                    value: Math.round(
                      monthlyTotal
                    ).toLocaleString(),
                    subtitle: "This Month",
                    loading: false,
                    error: false,
                  }
                : stat
            )
          );
        } else {
          setStats((previous) =>
            previous.map((stat) =>
              stat.key === "revenue"
                ? {
                    ...stat,
                    loading: false,
                    error: true,
                  }
                : stat
            )
          );
        }

        /* =====================================================
           AGREEMENTS
        ===================================================== */

        if (
          agreementsRes.status === "fulfilled" &&
          agreementsRes.value.data?.grouped?.pending
        ) {
          const pendingAgreements =
            agreementsRes.value.data.grouped.pending.length;

          setStats((previous) =>
            previous.map((stat) =>
              stat.key === "agreements"
                ? {
                    ...stat,
                    value: pendingAgreements.toString(),
                    loading: false,
                    error: false,
                  }
                : stat
            )
          );
        } else {
          setStats((previous) =>
            previous.map((stat) =>
              stat.key === "agreements"
                ? {
                    ...stat,
                    loading: false,
                    error: true,
                  }
                : stat
            )
          );
        }
      } catch (error) {
        console.error("Error in dashboard stats:", error);

        if (!mounted) return;

        setStats((previous) =>
          previous.map((stat) => ({
            ...stat,
            loading: false,
            error: true,
          }))
        );
      } finally {
        if (mounted) {
          setIsInitialLoading(false);
        }
      }
    };

    fetchStats();

    return () => {
      mounted = false;
    };
  }, []);

  /* ===========================================================
     INITIAL LOADING
  =========================================================== */

  if (isInitialLoading) {
    return (
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <StatCard
            key={item}
            title=""
            value=""
            subtitle=""
            icon={null}
            accent="from-blue-500 to-cyan-400"
            iconBackground="bg-slate-100 dark:bg-slate-800"
            loading
          />
        ))}
      </div>
    );
  }

  /* ===========================================================
     MAIN
  =========================================================== */

  return (
    <div className="mb-8 font-plus-jakarta">
      {/* Small section header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <UsersRound className="h-3.5 w-3.5" />
          </div>

          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-white">
              Business Overview
            </p>

            <p className="hidden text-[9px] text-slate-400 dark:text-slate-500 sm:block">
              Real-time dealership performance
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 dark:border-emerald-500/20 dark:bg-emerald-500/10">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />

          <span className="text-[9px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
            Live
          </span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.key}
            title={stat.title}
            value={stat.error ? "-" : stat.value}
            subtitle={stat.error ? "" : stat.subtitle}
            icon={stat.icon}
            accent={stat.accent}
            iconBackground={stat.iconBackground}
            error={stat.error}
            loading={stat.loading}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;