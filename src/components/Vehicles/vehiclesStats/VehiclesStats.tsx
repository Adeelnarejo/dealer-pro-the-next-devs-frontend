import React, { useEffect, useState } from "react";
import {
  AlertCircle,
  CarFront,
  Clock3,
  RefreshCw,
  TrendingUp,
} from "lucide-react";

import { makeGetRequest } from "../../../api/Api";
import {
  VehicleTotalIcon,
  VehicleSoldIcon,
  VehicleAvgDaysIcon,
} from "../../utils/Icons";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  accent: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  iconBg,
  iconColor,
  accent,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-[#0B1628] dark:shadow-none">
      {/* Accent */}
      <div
        className={`absolute left-0 top-0 h-full w-1 ${accent} opacity-80`}
      />

      {/* Decorative glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/5 blur-3xl transition-all duration-300 group-hover:bg-blue-500/10 dark:bg-blue-500/10" />

      <div className="relative flex items-start justify-between gap-4">
        {/* Content */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <div className="mt-3 flex items-end gap-2">
            <p className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-[34px]">
              {value}
            </p>

            <span className="mb-1 rounded-md bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              {subtitle}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

            <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
              Live inventory data
            </span>
          </div>
        </div>

        {/* Icon */}
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor} ring-1 ring-inset ring-black/5 transition-transform duration-300 group-hover:scale-105 dark:ring-white/5`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

interface Vehicle {
  id: number;
  registrationNumber: string;
  vehicleName: string;
  model: string;
  type: string;
  status: string;
  year: number;
  daysInStock?: number;
}

const VehiclesStats = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* =========================================================
     FETCH VEHICLES
  ========================================================= */

  const fetchVehicles = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await makeGetRequest("vehicles/getAllVehicles");

      if (response.data && response.data.success) {
        setVehicles(response.data.data || []);
      } else {
        setError(
          response.data?.message || "Failed to fetch vehicles."
        );
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching vehicles.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  /* =========================================================
     CALCULATE STATS
  ========================================================= */

  const totalVehicles = vehicles.length;

  const vehiclesSold = vehicles.filter((vehicle) => {
    const status = vehicle.status?.toLowerCase();

    return status === "sold" || status === "sold out";
  }).length;

  const availableVehicles = vehicles.filter((vehicle) => {
    const status = vehicle.status?.toLowerCase();

    return status === "available" || status === "in stock";
  });

  const totalDaysInStock = availableVehicles.reduce(
    (sum, vehicle) => sum + (Number(vehicle.daysInStock) || 0),
    0
  );

  const averageInventoryDays =
    availableVehicles.length > 0
      ? Math.round(
          totalDaysInStock / availableVehicles.length
        )
      : 0;

  /* =========================================================
     STAT CARDS
  ========================================================= */

  const statCards: StatCardProps[] = [
    {
      title: "Total Vehicles",
      value: error
        ? "00"
        : totalVehicles.toString().padStart(2, "0"),
      subtitle: "Vehicles",
      icon: <VehicleTotalIcon />,
      iconBg:
        "bg-blue-50 dark:bg-blue-500/10",
      iconColor:
        "text-blue-600 dark:text-blue-400",
      accent: "bg-blue-600",
    },
    {
      title: "Vehicles Sold",
      value: error
        ? "00"
        : vehiclesSold.toString().padStart(2, "0"),
      subtitle: "Vehicles",
      icon: <VehicleSoldIcon />,
      iconBg:
        "bg-emerald-50 dark:bg-emerald-500/10",
      iconColor:
        "text-emerald-600 dark:text-emerald-400",
      accent: "bg-emerald-500",
    },
    {
      title: "Average Inventory Days",
      value: error
        ? "00"
        : averageInventoryDays.toString().padStart(2, "0"),
      subtitle: "Days",
      icon: <VehicleAvgDaysIcon />,
      iconBg:
        "bg-violet-50 dark:bg-violet-500/10",
      iconColor:
        "text-violet-600 dark:text-violet-400",
      accent: "bg-violet-500",
    },
  ];

  /* =========================================================
     LOADING
  ========================================================= */

  if (isLoading) {
    return (
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

            <div>
              <div className="h-3 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="mt-1.5 hidden h-2.5 w-36 animate-pulse rounded bg-slate-100 dark:bg-slate-900 sm:block" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-[#0B1628] dark:shadow-none"
            >
              <div className="animate-pulse">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="h-3 w-28 rounded bg-slate-200 dark:bg-slate-700" />

                    <div className="mt-4 h-9 w-20 rounded-lg bg-slate-200 dark:bg-slate-700" />

                    <div className="mt-4 h-2.5 w-36 rounded bg-slate-100 dark:bg-slate-800" />
                  </div>

                  <div className="h-12 w-12 rounded-xl bg-slate-200 dark:bg-slate-700" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error) {
    return (
      <div className="mb-6">
        <div className="mb-3 flex items-center gap-2 px-1">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400">
            <AlertCircle className="h-3.5 w-3.5" />
          </div>

          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Inventory Overview
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500">
              Statistics unavailable
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-red-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)] dark:border-red-500/20 dark:bg-[#0B1628] dark:shadow-none">
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400">
              <AlertCircle className="h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                Unable to load vehicle statistics
              </p>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {error}
              </p>
            </div>

            <button
              type="button"
              onClick={fetchVehicles}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500/40 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Try Again
            </button>
          </div>
        </div>

        {/* Show zero cards, matching the original behavior */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {statCards.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>
      </div>
    );
  }

  /* =========================================================
     MAIN
  ========================================================= */

  return (
    <div className="mb-6">
      {/* Section heading */}
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <CarFront className="h-3.5 w-3.5" />
          </div>

          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Inventory Overview
            </p>

            <p className="hidden text-[10px] text-slate-400 dark:text-slate-500 sm:block">
              Current vehicle performance
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />

          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
            Live data
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {statCards.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default VehiclesStats;