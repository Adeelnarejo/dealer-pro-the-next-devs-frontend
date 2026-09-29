import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CarFront,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  RefreshCw,
  Tag,
} from "lucide-react";

import { makeGetRequest } from "../../../api/Api";

interface Vehicle {
  id: number;
  vehicleName: string;
  model: string;
  year: number;
  status: "In Stock" | "Sold" | "Agency";
  price: number;
  updatedAt: string;
}

const RecentVehicles = () => {
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecentVehicles = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await makeGetRequest(
        "vehicles/getAllVehicles"
      );

      if (response.data?.success) {
        const data = Array.isArray(response.data.data)
          ? response.data.data
          : [];

        const sortedByUpdated = [...data].sort(
          (a: Vehicle, b: Vehicle) =>
            new Date(b.updatedAt).getTime() -
            new Date(a.updatedAt).getTime()
        );

        setVehicles(sortedByUpdated.slice(0, 5));
      } else {
        setError(
          response.data?.message ||
            "Failed to fetch vehicles."
        );
      }
    } catch (err: any) {
      console.error("Recent vehicles error:", err);

      setError(
        err?.message ||
          "An error occurred while fetching vehicles."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentVehicles();
  }, []);

  const formatPrice = (price: number) => {
    if (price === null || price === undefined) {
      return "N/A";
    }

    return Number(price).toLocaleString("en-US");
  };

  const getStatusStyles = (status: string) => {
    switch (status?.toLowerCase()) {
      case "in stock":
        return {
          wrapper:
            "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
          dot: "bg-emerald-500",
        };

      case "sold":
        return {
          wrapper:
            "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
          dot: "bg-blue-500",
        };

      case "agency":
        return {
          wrapper:
            "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20",
          dot: "bg-rose-500",
        };

      default:
        return {
          wrapper:
            "bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
          dot: "bg-slate-400",
        };
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-[#0B1628]">
      {/* Top accent */}
      <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-emerald-500 via-blue-500 to-cyan-400" />

      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-500/10">
            <CarFront className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-base">
                Recent Vehicles
              </h2>

              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                Latest
              </span>
            </div>

            <p className="mt-0.5 text-[10px] font-medium text-slate-400 dark:text-slate-500">
              Recently updated inventory vehicles
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/vehicles")}
          className="group/button flex w-fit cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-bold text-blue-600 transition-all hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10"
        >
          View all

          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/button:translate-x-0.5" />
        </button>
      </div>

      {/* Table */}
      <div className="scrollbar-hide max-h-[330px] overflow-x-auto overflow-y-auto">
        <table className="w-full min-w-[700px] border-collapse">
          <thead className="sticky top-0 z-10">
            <tr className="border-b border-slate-100 bg-slate-50/95 text-left backdrop-blur-sm dark:border-slate-800 dark:bg-[#101D31]/95">
              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Vehicle
              </th>

              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Year
              </th>

              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Status
              </th>

              <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Price
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {/* Loading */}
            {isLoading &&
              [...Array(5)].map((_, index) => (
                <tr key={index}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

                      <div className="space-y-2">
                        <div className="h-3 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                        <div className="h-2.5 w-20 animate-pulse rounded bg-slate-100 dark:bg-slate-800/80" />
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="h-3 w-12 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  </td>

                  <td className="px-4 py-4">
                    <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                  </td>

                  <td className="px-5 py-4">
                    <div className="ml-auto h-3 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  </td>
                </tr>
              ))}

            {/* Error */}
            {!isLoading && error && (
              <tr>
                <td colSpan={4} className="px-5 py-10">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 dark:bg-red-500/10">
                      <CircleAlert className="h-5 w-5 text-red-500 dark:text-red-400" />
                    </div>

                    <p className="mt-3 text-sm font-bold text-slate-800 dark:text-white">
                      Unable to load vehicles
                    </p>

                    <p className="mt-1 max-w-sm text-xs text-slate-400 dark:text-slate-500">
                      {error}
                    </p>

                    <button
                      type="button"
                      onClick={fetchRecentVehicles}
                      className="mt-4 flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-blue-700"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Try again
                    </button>
                  </div>
                </td>
              </tr>
            )}

            {/* Empty */}
            {!isLoading &&
              !error &&
              vehicles.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-12">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                        <CarFront className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                      </div>

                      <p className="mt-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                        No vehicles found
                      </p>

                      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                        Recently updated vehicles will appear here.
                      </p>
                    </div>
                  </td>
                </tr>
              )}

            {/* Vehicles */}
            {!isLoading &&
              !error &&
              vehicles.map((vehicle) => {
                const status = getStatusStyles(vehicle.status);

                return (
                  <tr
                    key={vehicle.id}
                    className="group/row transition-colors duration-200 hover:bg-slate-50/80 dark:hover:bg-slate-800/30"
                  >
                    {/* Vehicle */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/10">
                          <CarFront className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-xs font-bold text-slate-800 dark:text-white">
                            {vehicle.vehicleName || "Unknown Vehicle"}
                          </p>

                          <div className="mt-0.5 flex items-center gap-1.5">
                            <span className="max-w-[130px] truncate text-[9px] font-medium text-slate-400 dark:text-slate-500">
                              {vehicle.model || "No model"}
                            </span>

                            <span className="h-1 w-1 shrink-0 rounded-full bg-slate-300 dark:bg-slate-700" />

                            <span className="text-[9px] font-medium text-slate-400 dark:text-slate-500">
                              ID {vehicle.id}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Year */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />

                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                          {vehicle.year || "N/A"}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-bold ${status.wrapper}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                        />

                        {vehicle.status || "Unknown"}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="hidden sm:flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                          <Tag className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
                        </div>

                        <div>
                          <p className="text-xs font-extrabold text-slate-800 dark:text-white">
                            {formatPrice(vehicle.price)} Kr
                          </p>

                          <div className="mt-0.5 flex items-center justify-end gap-1">
                            <CheckCircle2 className="h-2.5 w-2.5 text-emerald-500" />

                            <span className="text-[8px] font-semibold text-slate-400 dark:text-slate-500">
                              Listed
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {!isLoading && !error && vehicles.length > 0 && (
        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
              Showing {vehicles.length} recent{" "}
              {vehicles.length === 1 ? "vehicle" : "vehicles"}
            </span>
          </div>

          <button
            type="button"
            onClick={() => navigate("/vehicles")}
            className="cursor-pointer text-[10px] font-bold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Manage inventory →
          </button>
        </div>
      )}

      {/* Hidden scrollbar */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
      `}</style>
    </div>
  );
};

export default RecentVehicles;