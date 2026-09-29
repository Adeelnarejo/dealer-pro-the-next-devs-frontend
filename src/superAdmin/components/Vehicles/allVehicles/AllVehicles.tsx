import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Plus,
  CarFront,
  Sparkles,
  X,
  ListFilter,
} from "lucide-react";

import AddNewVehicle from "../../../../components/models/AddNewVehicle";
import FilterVehicle from "../../../../components/models/FilterVehicle";
import VehiclesTable from "../../../../components/Vehicles/vehiclesTable/VehiclesTable";

const AllVehicles = () => {
  const [expandedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [refetchKey, setRefetchKey] = useState(0);
  const [filteredVehicles, setFilteredVehicles] = useState<any[] | null>(
    null
  );

  const handleSuccess = () => {
    setShowAddModal(false);
    setRefetchKey((prevKey) => prevKey + 1);
    setFilteredVehicles(null);
  };

  const handleFiltersApplied = (vehicles: any[]) => {
    setFilteredVehicles(vehicles);
    setShowFilterModal(false);
  };

  const handleClearFilters = () => {
    setFilteredVehicles(null);
  };

  const hasSearch = search.trim().length > 0;
  const hasFilters = filteredVehicles !== null;

  return (
    <div className="min-h-screen w-full bg-[#F5F7FA] px-3 py-3 font-plus-jakarta transition-colors duration-300 dark:bg-[#07111F] sm:px-4 sm:py-4 lg:px-6 lg:py-6">
      <div className="mx-auto w-full max-w-[1800px]">

        {/* =========================================================
            PAGE HEADER
        ========================================================= */}
        <div className="mb-5 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.05)] transition-colors duration-300 dark:border-slate-800 dark:bg-[#0B1628] dark:shadow-none">
          <div className="relative overflow-hidden px-4 py-5 sm:px-6 sm:py-6 lg:px-7">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/10" />
            <div className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-indigo-500/5 blur-3xl" />

            <div className="relative flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

              {/* Left */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20 sm:h-12 sm:w-12">
                  <CarFront className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>

                <div>
                  <div className="mb-1.5 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                      Inventory
                    </span>

                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Live
                    </span>
                  </div>

                  <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
                    All Vehicles
                  </h1>

                  <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500 dark:text-slate-400 sm:text-sm">
                    Manage your dealership inventory, search vehicles and
                    apply advanced filters from one place.
                  </p>
                </div>
              </div>

              {/* Right status */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-900/60 sm:flex-none sm:px-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    <Sparkles className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Inventory
                    </p>
                    <p className="truncate text-xs font-semibold text-slate-700 dark:text-slate-200">
                      Smart vehicle management
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            SEARCH / ACTION BAR
        ========================================================= */}
        <div className="mb-5 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-colors duration-300 dark:border-slate-800 dark:bg-[#0B1628] dark:shadow-none sm:p-4">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">

            {/* Search */}
            <div className="relative w-full xl:max-w-[560px]">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                placeholder="Search by registration, vehicle name or model..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-10 text-sm font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500 dark:focus:bg-slate-900"
              />

              {hasSearch && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Actions */}
            <div className="flex w-full flex-col gap-2 sm:flex-row xl:w-auto">

              {/* Filter */}
              <button
                type="button"
                onClick={() => setShowFilterModal(true)}
                className={`group flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-all duration-200 sm:flex-none ${
                  hasFilters
                    ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500/50 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                }`}
              >
                <SlidersHorizontal className="h-4 w-4 transition-transform group-hover:rotate-90" />
                <span>Filter</span>

                {hasFilters && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white/20 px-1.5 text-[10px] font-bold">
                    {filteredVehicles.length}
                  </span>
                )}
              </button>

              {/* Add Vehicle */}
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue-600/30 active:translate-y-0 sm:flex-none"
              >
                <Plus className="h-4 w-4" />
                Add Vehicle
              </button>
            </div>
          </div>

          {/* =====================================================
              FILTER / SEARCH STATUS
          ===================================================== */}
          {(hasFilters || hasSearch) && (
            <div className="mt-3 flex flex-col gap-2 rounded-xl border border-blue-100 bg-blue-50/70 px-3 py-2.5 dark:border-blue-500/10 dark:bg-blue-500/5 sm:flex-row sm:items-center sm:justify-between sm:px-4">
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 dark:text-blue-400">
                  <ListFilter className="h-3.5 w-3.5 shrink-0" />

                  <span>
                    {hasFilters
                      ? `Showing ${filteredVehicles.length} filtered vehicles`
                      : "Search results are being displayed"}
                  </span>
                </div>

                {hasSearch && (
                  <span className="max-w-full truncate rounded-lg border border-blue-200 bg-white px-2.5 py-1 text-[11px] font-medium text-blue-700 dark:border-blue-500/20 dark:bg-slate-900 dark:text-blue-300">
                    Search: "{search}"
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  handleClearFilters();
                  setSearch("");
                }}
                className="shrink-0 self-start rounded-lg px-2.5 py-1.5 text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-800 dark:text-blue-400 dark:hover:bg-blue-500/10 dark:hover:text-blue-300 sm:self-auto"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* =========================================================
            VEHICLES TABLE
        ========================================================= */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.05)] transition-colors duration-300 dark:border-slate-800 dark:bg-[#0B1628] dark:shadow-none">
          <VehiclesTable
            key={refetchKey}
            search={search}
            expandedId={expandedId}
            filteredVehicles={filteredVehicles}
          />
        </div>
      </div>

      {/* ===========================================================
          ADD VEHICLE MODAL
      =========================================================== */}
      <AddNewVehicle
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleSuccess}
      />

      {/* ===========================================================
          FILTER VEHICLE MODAL
      =========================================================== */}
      <FilterVehicle
        open={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onFiltersApplied={handleFiltersApplied}
      />
    </div>
  );
};

export default AllVehicles;