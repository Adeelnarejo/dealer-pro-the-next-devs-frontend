import React, { useEffect, useState } from "react";
import {
  Search,
  CarFront,
  Plus,
  ArrowUpRight,
  RefreshCw,
  AlertCircle,
  CalendarDays,
  MapPin,
  Gauge,
  Fuel,
  Settings2,
  X,
} from "lucide-react";
import { makeGetRequest } from "../../api/Api";
import { useNavigate } from "react-router-dom";

interface Vehicle {
  id: string;
  registrationNumber: string;
  registrationDate: string;
  price: number;
  mileage: number;
  daysInStock: number;
  brand: string;
  vehicleName: string;
  model: string;
  type: string;
  fuelType: string;
  gearbox: string;
  year: number;
  drive: string;
  horsepower: string;
  color: string;
  importOrigin: string;
  status: string;
  updatedAt: string;
}

const statusStyles: Record<string, string> = {
  Available:
    "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",

  Sold:
    "bg-red-50 text-red-700 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",

  Reserved:
    "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",

  "Sold Out":
    "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
};

interface VehiclesTableProps {
  setShowAddModal: (show: boolean) => void;
  showAddModal: boolean;
}

const VehiclesTable = ({
  setShowAddModal,
  showAddModal,
}: VehiclesTableProps) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";

    try {
      const date = new Date(dateString);

      if (Number.isNaN(date.getTime())) {
        return dateString;
      }

      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const formatNumber = (value: number | undefined) => {
    if (value === undefined || value === null) return "N/A";

    return Number(value).toLocaleString("en-US");
  };

  const fetchVehicles = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await makeGetRequest(
        "searchVehicle/SearchgetAllVehicles"
      );

      if (response.data && response.data.success) {
        const vehicleData = Array.isArray(response.data.data)
          ? [...response.data.data]
          : [];

        setVehicles(vehicleData.reverse());
      } else {
        setError(response.data?.message || "Failed to fetch vehicles.");
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
  }, [showAddModal]);

  const filteredVehicles = vehicles.filter((vehicle) => {
    const searchLower = search.trim().toLowerCase();

    if (!searchLower) return true;

    return (
      vehicle.registrationNumber?.toLowerCase().includes(searchLower) ||
      vehicle.vehicleName?.toLowerCase().includes(searchLower) ||
      vehicle.model?.toLowerCase().includes(searchLower) ||
      vehicle.brand?.toLowerCase().includes(searchLower) ||
      vehicle.status?.toLowerCase().includes(searchLower)
    );
  });

  const handleSearchNewVehicle = () => {
    setShowAddModal(true);
  };

  const handleViewDetails = (registrationNumber: string) => {
    navigate(`/vehicle-details2/${registrationNumber}`);
  };

  return (
    <div className="w-full bg-white font-plus-jakarta transition-colors duration-300 dark:bg-[#0B1728]">

      {/* =========================================================
          TABLE HEADER
      ========================================================= */}
      <div className="border-b border-slate-100 px-4 py-5 dark:border-slate-800 sm:px-6 lg:px-7">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

          {/* Title */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <CarFront size={19} />
            </div>

            <div>
              <h2 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-lg">
                Vehicle Inventory
              </h2>

              <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400 sm:text-xs">
                Browse and manage your dealership vehicles
              </p>
            </div>
          </div>

          {/* Search + Button */}
          <div className="flex w-full flex-col gap-2.5 sm:flex-row xl:w-auto">

            {/* Search */}
            <div className="relative w-full sm:min-w-[280px] sm:max-w-[360px]">
              <Search
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search vehicles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-10 text-sm font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#101F33] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500 dark:focus:bg-[#101F33]"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-md p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Search Vehicle */}
            <button
              type="button"
              onClick={handleSearchNewVehicle}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#002147] px-4 text-sm font-bold text-white shadow-lg shadow-[#002147]/15 transition-all hover:-translate-y-0.5 hover:bg-[#00305f] dark:bg-blue-600 dark:shadow-blue-600/15 dark:hover:bg-blue-700 sm:w-auto"
            >
              <Plus size={16} strokeWidth={2.5} />
              Search Vehicle
            </button>
          </div>
        </div>

        {/* Result count */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold text-slate-600 dark:border-slate-700 dark:bg-[#101F33] dark:text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {filteredVehicles.length}{" "}
            {filteredVehicles.length === 1 ? "vehicle" : "vehicles"}
          </span>

          {search && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
              <Search size={10} />
              Searching for "{search}"
            </span>
          )}
        </div>
      </div>

      {/* =========================================================
          TABLE AREA
      ========================================================= */}
      <div className="px-3 pb-4 pt-3 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6">

        <div className="scrollbar-hide max-h-[520px] overflow-auto rounded-xl border border-slate-200 dark:border-slate-800 md:max-h-[600px]">

          <table className="min-w-[1050px] w-full border-collapse">

            {/* =====================================================
                TABLE HEAD
            ===================================================== */}
            <thead className="sticky top-0 z-20 bg-slate-50 dark:bg-[#101F33]">
              <tr className="border-b border-slate-200 dark:border-slate-700">

                <th className="whitespace-nowrap px-4 py-3.5 text-left text-[10px] font-extrabold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
                  Registration
                </th>

                <th className="whitespace-nowrap px-4 py-3.5 text-left text-[10px] font-extrabold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
                  Vehicle
                </th>

                <th className="whitespace-nowrap px-4 py-3.5 text-left text-[10px] font-extrabold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
                  Model
                </th>

                <th className="whitespace-nowrap px-4 py-3.5 text-left text-[10px] font-extrabold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
                  Status
                </th>

                <th className="whitespace-nowrap px-4 py-3.5 text-left text-[10px] font-extrabold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
                  Origin
                </th>

                <th className="whitespace-nowrap px-4 py-3.5 text-left text-[10px] font-extrabold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
                  Updated
                </th>

                <th className="whitespace-nowrap px-4 py-3.5 text-right text-[10px] font-extrabold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
                  Action
                </th>
              </tr>
            </thead>

            {/* =====================================================
                TABLE BODY
            ===================================================== */}
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

              {/* Loading */}
              {isLoading ? (
                <>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      <td className="px-4 py-4">
                        <div className="h-8 w-28 rounded-lg bg-slate-100 dark:bg-slate-800" />
                      </td>

                      <td className="px-4 py-4">
                        <div className="space-y-2">
                          <div className="h-4 w-32 rounded bg-slate-100 dark:bg-slate-800" />
                          <div className="h-3 w-20 rounded bg-slate-100 dark:bg-slate-800" />
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div className="h-4 w-24 rounded bg-slate-100 dark:bg-slate-800" />
                      </td>

                      <td className="px-4 py-4">
                        <div className="h-6 w-20 rounded-full bg-slate-100 dark:bg-slate-800" />
                      </td>

                      <td className="px-4 py-4">
                        <div className="h-4 w-24 rounded bg-slate-100 dark:bg-slate-800" />
                      </td>

                      <td className="px-4 py-4">
                        <div className="h-4 w-24 rounded bg-slate-100 dark:bg-slate-800" />
                      </td>

                      <td className="px-4 py-4">
                        <div className="ml-auto h-8 w-24 rounded-lg bg-slate-100 dark:bg-slate-800" />
                      </td>
                    </tr>
                  ))}
                </>
              ) : error ? (

                /* Error */
                <tr>
                  <td colSpan={7} className="px-4 py-16">
                    <div className="mx-auto flex max-w-md flex-col items-center text-center">

                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400">
                        <AlertCircle size={22} />
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        Unable to load vehicles
                      </h3>

                      <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500 dark:text-slate-400">
                        {error}
                      </p>

                      <button
                        type="button"
                        onClick={fetchVehicles}
                        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-700"
                      >
                        <RefreshCw size={13} />
                        Try Again
                      </button>
                    </div>
                  </td>
                </tr>

              ) : filteredVehicles.length === 0 ? (

                /* Empty */
                <tr>
                  <td colSpan={7} className="px-4 py-16">
                    <div className="mx-auto flex max-w-md flex-col items-center text-center">

                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                        <CarFront size={25} />
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        No vehicles found
                      </h3>

                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {search
                          ? "Try changing your search term."
                          : "There are no vehicles available in the inventory yet."}
                      </p>

                      {search && (
                        <button
                          type="button"
                          onClick={() => setSearch("")}
                          className="mt-4 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-[#101F33] dark:text-slate-200 dark:hover:bg-slate-800"
                        >
                          Clear Search
                        </button>
                      )}
                    </div>
                  </td>
                </tr>

              ) : (

                /* Vehicles */
                filteredVehicles.map((vehicle) => {
                  const statusClass =
                    statusStyles[vehicle.status] ||
                    "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";

                  return (
                    <React.Fragment key={vehicle.id}>
                      <tr className="group bg-white transition-colors hover:bg-slate-50/80 dark:bg-[#0B1728] dark:hover:bg-[#101F33]">

                        {/* Registration */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                              <CarFront size={16} />
                            </div>

                            <div className="min-w-0">
                              <div className="inline-flex overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-[#101F33]">
                                <span className="flex items-center justify-center bg-gradient-to-b from-blue-500 to-blue-700 px-2 py-1.5 text-[10px] font-extrabold text-white">
                                  S
                                </span>

                                <span className="px-2.5 py-1.5 text-xs font-extrabold tracking-wide text-slate-800 dark:text-slate-100">
                                  {vehicle.registrationNumber || "N/A"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Vehicle */}
                        <td className="px-4 py-4">
                          <div className="min-w-[160px]">
                            <p className="truncate text-sm font-bold text-slate-800 dark:text-slate-100">
                              {vehicle.vehicleName || "N/A"}
                            </p>

                            <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
                              {vehicle.year && (
                                <span className="inline-flex items-center gap-1">
                                  <CalendarDays size={10} />
                                  {vehicle.year}
                                </span>
                              )}

                              {vehicle.fuelType && (
                                <span className="inline-flex items-center gap-1">
                                  <Fuel size={10} />
                                  {vehicle.fuelType}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Model */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <Settings2
                              size={14}
                              className="text-slate-400"
                            />

                            <div>
                              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                {vehicle.model || "N/A"}
                              </p>

                              {vehicle.gearbox && (
                                <p className="mt-0.5 text-[10px] text-slate-400">
                                  {vehicle.gearbox}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ${statusClass}`}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            {vehicle.status || "N/A"}
                          </span>
                        </td>

                        {/* Origin */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                            <MapPin
                              size={13}
                              className="shrink-0 text-slate-400"
                            />

                            <span>
                              {vehicle.importOrigin || "N/A"}
                            </span>
                          </div>
                        </td>

                        {/* Updated */}
                        <td className="px-4 py-4">
                          <div>
                            <p className="whitespace-nowrap text-xs font-semibold text-slate-700 dark:text-slate-200">
                              {formatDate(vehicle.updatedAt)}
                            </p>

                            {vehicle.mileage !== undefined && (
                              <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                                <Gauge size={10} />
                                {formatNumber(vehicle.mileage)} km
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Action */}
                        <td className="px-4 py-4 text-right">
                          <button
                            type="button"
                            onClick={() =>
                              handleViewDetails(
                                vehicle.registrationNumber
                              )
                            }
                            className="group/button inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-600 hover:text-white hover:shadow-md hover:shadow-blue-600/15 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:border-blue-600 dark:hover:bg-blue-600 dark:hover:text-white"
                          >
                            Details

                            <ArrowUpRight
                              size={14}
                              className="transition-transform group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
                            />
                          </button>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* =========================================================
            FOOTER
        ========================================================= */}
        {!isLoading && !error && filteredVehicles.length > 0 && (
          <div className="mt-3 flex flex-col gap-2 px-1 text-[10px] text-slate-400 dark:text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Showing{" "}
              <strong className="font-bold text-slate-600 dark:text-slate-300">
                {filteredVehicles.length}
              </strong>{" "}
              vehicles
              {search && " matching your search"}
            </span>

            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Inventory data synced
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehiclesTable;