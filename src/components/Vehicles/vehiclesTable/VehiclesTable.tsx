import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  CarFront,
  ChevronLeft,
  ChevronRight,
  Edit,
  MoreHorizontal,
  RefreshCw,
  SearchX,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { makeDeleteRequest, makeGetRequest } from "../../../api/Api";
import toast from "react-hot-toast";

import DeletePopup from "../../models/DeletePopup";

interface Vehicle {
  id: number;
  registrationNumber: string;
  brand: string;
  vehicleName: string;
  model: string;
  type: string;
  status: string;
  year: number;
}

interface VehiclesTableProps {
  search: string;
  expandedId: number | null;
  filteredVehicles?: any[] | null;
}

const getStatusStyles = (status?: string) => {
  const normalized = status?.toLowerCase().trim();

  switch (normalized) {
    case "in stock":
    case "available":
      return {
        wrapper:
          "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400",
        dot: "bg-emerald-500",
      };

    case "sold":
    case "sold out":
      return {
        wrapper:
          "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400",
        dot: "bg-blue-500",
      };

    case "agency":
      return {
        wrapper:
          "border-red-200 bg-red-50 text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400",
        dot: "bg-red-500",
      };

    case "reserved":
      return {
        wrapper:
          "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400",
        dot: "bg-amber-500",
      };

    default:
      return {
        wrapper:
          "border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
        dot: "bg-slate-400",
      };
  }
};

const VehiclesTable: React.FC<VehiclesTableProps> = ({
  search,
  expandedId,
  filteredVehicles,
}) => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deletePopupRegistrationNumber, setDeletePopupRegistrationNumber] =
    useState<string | null>(null);

  const [isDeleting, setIsDeleting] = useState(false);
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
        const data = response.data.data || [];

        setVehicles([...data].reverse());
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
    if (filteredVehicles === null) {
      fetchVehicles();
    } else {
      setIsLoading(false);
      setError(null);
    }
  }, [filteredVehicles]);

  /* =========================================================
     DELETE VEHICLE
  ========================================================= */

  const handleDelete = async () => {
    if (!deletePopupRegistrationNumber) return;

    setIsDeleting(true);

    try {
      await makeDeleteRequest(
        `vehicles/deleteVehicle/${deletePopupRegistrationNumber}`
      );

      toast.success("Vehicle deleted successfully!");

      setVehicles((currentVehicles) =>
        currentVehicles.filter(
          (vehicle) =>
            vehicle.registrationNumber !==
            deletePopupRegistrationNumber
        )
      );

      setDeletePopupRegistrationNumber(null);
      setShowDeletePopup(false);
    } catch (err: any) {
      toast.error(
        err?.message || "Failed to delete vehicle."
      );

      console.error("Delete error:", err);
    } finally {
      setIsDeleting(false);
      setShowDeletePopup(false);
    }
  };

  /* =========================================================
     FILTER + SEARCH
  ========================================================= */

  const allVehicles =
    filteredVehicles !== null
      ? filteredVehicles || []
      : vehicles;

  const filtered = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    return [...allVehicles]
      .reverse()
      .filter((vehicle) => {
        if (!searchTerm) return true;

        return (
          (vehicle.registrationNumber?.toLowerCase() || "").includes(
            searchTerm
          ) ||
          (vehicle.vehicleName?.toLowerCase() || "").includes(
            searchTerm
          ) ||
          (vehicle.model?.toLowerCase() || "").includes(
            searchTerm
          ) ||
          (vehicle.type?.toLowerCase() || "").includes(
            searchTerm
          ) ||
          (vehicle.status?.toLowerCase() || "").includes(
            searchTerm
          ) ||
          (vehicle.year?.toString() || "").includes(
            searchTerm
          )
        );
      });
  }, [allVehicles, search]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / pageSize)
  );

  const paginated = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  useEffect(() => {
    setPage(1);
  }, [pageSize, search, filteredVehicles]);

  useEffect(() => {
    if ((page - 1) * pageSize >= filtered.length && page !== 1) {
      setPage(1);
    }
  }, [page, pageSize, filtered.length]);

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPageSize(Number(event.target.value));
  };

  const getPageNumbers = () => {
    const pages: number[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    if (page <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (page >= totalPages - 2) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [page - 2, page - 1, page, page + 1, page + 2];
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0B1628]">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <div className="animate-pulse">
            <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mt-2 h-2.5 w-48 rounded bg-slate-100 dark:bg-slate-800" />
          </div>

          <div className="h-9 w-24 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
        </div>

        <div className="space-y-0">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="flex items-center gap-4 border-b border-slate-100 px-5 py-5 last:border-0 dark:border-slate-800/70"
            >
              <div className="h-9 w-20 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />

              <div className="flex-1">
                <div className="h-3 w-32 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
                <div className="mt-2 h-2.5 w-20 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
              </div>

              <div className="hidden h-3 w-24 animate-pulse rounded bg-slate-100 dark:bg-slate-800 sm:block" />
              <div className="hidden h-6 w-20 animate-pulse rounded-full bg-slate-100 dark:bg-slate-800 sm:block" />
              <div className="h-8 w-20 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
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
      <div className="overflow-hidden rounded-2xl border border-red-200 bg-white dark:border-red-500/20 dark:bg-[#0B1628]">
        <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400">
            <RefreshCw className="h-5 w-5" />
          </div>

          <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">
            Unable to load vehicles
          </h3>

          <p className="mt-1 max-w-md text-xs text-slate-500 dark:text-slate-400">
            {error}
          </p>

          <button
            type="button"
            onClick={fetchVehicles}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* =======================================================
          DELETE POPUP
      ======================================================= */}
      {showDeletePopup && (
        <DeletePopup
          entityName="Vehicle"
          onCancel={() => {
            if (isDeleting) return;

            setDeletePopupRegistrationNumber(null);
            setShowDeletePopup(false);
          }}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
      )}

      {/* =======================================================
          TABLE CARD
      ======================================================= */}
      <div className="overflow-hidden font-plus-jakarta">

        {/* Table top info */}
        <div className="flex flex-col gap-3 border-b border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-[#0B1628] sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <CarFront className="h-4 w-4" />
            </div>

            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Vehicle Inventory
              </h2>

              <p className="mt-0.5 text-[10px] text-slate-400 dark:text-slate-500">
                {filtered.length}{" "}
                {filtered.length === 1 ? "vehicle" : "vehicles"} found
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {search.trim() && (
              <div className="max-w-[220px] truncate rounded-lg border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-semibold text-blue-600 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
                Search: "{search}"
              </div>
            )}

            <div className="hidden items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1.5 dark:bg-emerald-500/10 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
                Live
              </span>
            </div>
          </div>
        </div>

        {/* =====================================================
            EMPTY STATE
        ===================================================== */}
        {filtered.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center px-6 py-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
              <SearchX className="h-6 w-6" />
            </div>

            <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">
              No vehicles found
            </h3>

            <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500 dark:text-slate-400">
              Try changing your search term or clearing the active
              filters.
            </p>
          </div>
        ) : (
          <>
            {/* =================================================
                TABLE
            ================================================= */}
            <div className="max-h-[520px] overflow-x-auto overflow-y-auto scrollbar-hide">
              <table className="min-w-[950px] w-full">
                <thead className="sticky top-0 z-20 border-b border-slate-200 bg-slate-50/95 backdrop-blur-md dark:border-slate-800 dark:bg-[#0B1628]/95">
                  <tr>
                    <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                      Registration
                    </th>

                    <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                      Vehicle
                    </th>

                    <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                      Model
                    </th>

                    <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                      Type
                    </th>

                    <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                      Status
                    </th>

                    <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                      Year
                    </th>

                    <th className="px-5 py-3.5 text-right text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
                  {paginated.map((vehicle) => {
                    const status = getStatusStyles(vehicle.status);

                    return (
                      <React.Fragment key={vehicle.id}>
                        <tr
                          className={`group transition-colors duration-200 ${
                            expandedId === vehicle.id
                              ? "bg-blue-50/60 dark:bg-blue-500/5"
                              : "bg-white hover:bg-slate-50/80 dark:bg-[#0B1628] dark:hover:bg-slate-900/60"
                          }`}
                        >
                          {/* Registration */}
                          <td className="px-5 py-4">
                            <div className="inline-flex items-center overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
                              <span className="flex h-8 w-8 items-center justify-center bg-gradient-to-b from-blue-500 to-blue-700 text-[10px] font-black text-white">
                                S
                              </span>

                              <span className="px-2.5 text-xs font-bold tracking-wide text-slate-800 dark:text-slate-200">
                                {vehicle.registrationNumber || "N/A"}
                              </span>
                            </div>
                          </td>

                          {/* Vehicle */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                <CarFront className="h-4 w-4" />
                              </div>

                              <div className="min-w-0">
                                <p className="max-w-[180px] truncate text-xs font-bold text-slate-900 dark:text-white">
                                  {vehicle.vehicleName || "N/A"}
                                </p>

                                {vehicle.brand && (
                                  <p className="mt-0.5 text-[10px] text-slate-400 dark:text-slate-500">
                                    {vehicle.brand}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Model */}
                          <td className="px-5 py-4 text-xs font-medium text-slate-600 dark:text-slate-300">
                            {vehicle.model || "N/A"}
                          </td>

                          {/* Type */}
                          <td className="px-5 py-4">
                            <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                              {vehicle.type || "N/A"}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[10px] font-bold ${status.wrapper}`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                              />

                              {vehicle.status || "N/A"}
                            </span>
                          </td>

                          {/* Year */}
                          <td className="px-5 py-4">
                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                              {vehicle.year || "N/A"}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="px-5 py-4">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() =>
                                  navigate(
                                    `/vehicle-details/${vehicle.registrationNumber}`
                                  )
                                }
                                className="group/details inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-[10px] font-bold text-blue-600 transition-all hover:border-blue-300 hover:bg-blue-600 hover:text-white dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:border-blue-500 dark:hover:bg-blue-600 dark:hover:text-white"
                              >
                                Details
                                <ArrowUpRight className="h-3 w-3 transition-transform group-hover/details:-translate-y-0.5 group-hover/details:translate-x-0.5" />
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setDeletePopupRegistrationNumber(
                                    vehicle.registrationNumber
                                  );
                                  setShowDeletePopup(true);
                                }}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-slate-400 transition-all hover:border-red-100 hover:bg-red-50 hover:text-red-600 dark:hover:border-red-500/20 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                                title="Delete vehicle"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>

                              <button
                                type="button"
                                className="hidden h-8 w-8 items-center justify-center rounded-lg border border-transparent text-slate-400 transition-all hover:border-slate-200 hover:bg-slate-100 hover:text-slate-700 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white sm:flex"
                                title="More actions"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* =================================================
                            EXPANDED VEHICLE
                        ================================================= */}
                        {expandedId === vehicle.id && (
                          <tr>
                            <td
                              colSpan={7}
                              className="border-t border-blue-100 bg-blue-50/40 px-5 py-5 dark:border-blue-500/10 dark:bg-blue-500/5"
                            >
                              <div className="rounded-xl border border-blue-100 bg-white p-5 dark:border-blue-500/10 dark:bg-slate-900/50">
                                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                                  <div className="flex-1">
                                    <div className="mb-4 flex items-center gap-2">
                                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                        <CarFront className="h-4 w-4" />
                                      </div>

                                      <div>
                                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                          Vehicle Information
                                        </h3>

                                        <p className="text-[10px] text-slate-400 dark:text-slate-500">
                                          Detailed vehicle overview
                                        </p>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
                                      <div>
                                        <p className="text-[10px] font-medium text-slate-400">
                                          Registration
                                        </p>
                                        <p className="mt-1 text-xs font-bold text-slate-800 dark:text-slate-200">
                                          {vehicle.registrationNumber || "N/A"}
                                        </p>
                                      </div>

                                      <div>
                                        <p className="text-[10px] font-medium text-slate-400">
                                          Vehicle
                                        </p>
                                        <p className="mt-1 text-xs font-bold text-slate-800 dark:text-slate-200">
                                          {vehicle.vehicleName || "N/A"}
                                        </p>
                                      </div>

                                      <div>
                                        <p className="text-[10px] font-medium text-slate-400">
                                          Model
                                        </p>
                                        <p className="mt-1 text-xs font-bold text-slate-800 dark:text-slate-200">
                                          {vehicle.model || "N/A"}
                                        </p>
                                      </div>

                                      <div>
                                        <p className="text-[10px] font-medium text-slate-400">
                                          Type
                                        </p>
                                        <p className="mt-1 text-xs font-bold text-slate-800 dark:text-slate-200">
                                          {vehicle.type || "N/A"}
                                        </p>
                                      </div>

                                      <div>
                                        <p className="text-[10px] font-medium text-slate-400">
                                          Year
                                        </p>
                                        <p className="mt-1 text-xs font-bold text-slate-800 dark:text-slate-200">
                                          {vehicle.year || "N/A"}
                                        </p>
                                      </div>

                                      <div>
                                        <p className="text-[10px] font-medium text-slate-400">
                                          Status
                                        </p>

                                        <span
                                          className={`mt-1 inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[9px] font-bold ${status.wrapper}`}
                                        >
                                          <span
                                            className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                                          />
                                          {vehicle.status || "N/A"}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-xs font-bold text-blue-600 transition-all hover:bg-blue-50 dark:border-blue-500/20 dark:bg-slate-900 dark:text-blue-400 dark:hover:bg-blue-500/10"
                                  >
                                    <Edit className="h-3.5 w-3.5" />
                                    Edit Vehicle
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* =================================================
                PAGINATION
            ================================================= */}
            <div className="flex flex-col gap-4 border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-[#0B1628] sm:px-5 md:flex-row md:items-center md:justify-between">
              {/* Page size */}
              <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                <span>Show</span>

                <select
                  value={pageSize}
                  onChange={handlePageSizeChange}
                  className="cursor-pointer rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>

                <span>
                  of {filtered.length}{" "}
                  {filtered.length === 1 ? "vehicle" : "vehicles"}
                </span>
              </div>

              {/* Pagination */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    setPage((current) => Math.max(1, current - 1))
                  }
                  disabled={page === 1}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {getPageNumbers().map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    className={`flex h-8 min-w-8 items-center justify-center rounded-lg border px-2 text-xs font-bold transition-all ${
                      page === pageNumber
                        ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20"
                        : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setPage((current) =>
                      Math.min(totalPages, current + 1)
                    )
                  }
                  disabled={page === totalPages}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default VehiclesTable;