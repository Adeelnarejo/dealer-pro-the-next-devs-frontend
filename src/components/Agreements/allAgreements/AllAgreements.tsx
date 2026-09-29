import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  ChevronDown,
  FileText,
  ShoppingCart,
  Handshake,
  SlidersHorizontal,
  X,
  Sparkles,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import AgreementsTable from "../agreementsTable/AgreementsTable";
import FilterAgreements from "../../models/FilterAgreements";

interface AgreementFilters {
  status?: string;
  agreementType?: string;
  fromDate?: string;
  toDate?: string;
  minAmount?: string;
  maxAmount?: string;
  sortBy?: "date-desc" | "date-asc" | "amount-desc" | "amount-asc";
}

const initialFilterState: AgreementFilters = {
  status: "",
  agreementType: "",
  fromDate: "",
  toDate: "",
  minAmount: "",
  maxAmount: "",
  sortBy: "date-desc",
};

const AllAgreements = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const [agreementFilters, setAgreementFilters] =
    useState<AgreementFilters>(initialFilterState);

  const [filteredCount, setFilteredCount] = useState(0);

  const navigate = useNavigate();

  const handleClearFilters = () => {
    setAgreementFilters(initialFilterState);
    setSearch("");
  };

  const isFiltersApplied =
    Object.values(agreementFilters).some(
      (value) => value !== "" && value !== "date-desc"
    ) || search !== "";

  return (
    <div className="min-h-screen w-full bg-[#F5F7FA] px-3 py-3 font-plus-jakarta text-slate-900 transition-colors duration-300 dark:bg-[#06101D] dark:text-white sm:px-5 sm:py-5 lg:px-6 lg:py-6">
      <div className="mx-auto w-full max-w-[1800px]">
        <div className="relative overflow-hidden rounded-[22px] border border-slate-200/80 bg-white shadow-[0_8px_40px_rgba(15,23,42,0.055)] transition-colors duration-300 dark:border-slate-800 dark:bg-[#0A1626] dark:shadow-[0_10px_45px_rgba(0,0,0,0.22)]">

          {/* Background glow */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-500/[0.045] blur-3xl dark:bg-blue-500/[0.09]" />
          <div className="pointer-events-none absolute -bottom-32 left-[35%] h-72 w-72 rounded-full bg-indigo-500/[0.035] blur-3xl dark:bg-indigo-500/[0.055]" />

          {/* Top accent */}
          <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400" />

          {/* =====================================================
              HEADER
          ===================================================== */}
          <div className="relative border-b border-slate-100 dark:border-slate-800">
            <div className="px-4 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-7">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">

                {/* Heading */}
                <div className="flex min-w-0 items-start gap-3.5 sm:gap-4">
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-[15px] bg-[#002147] text-white shadow-xl shadow-[#002147]/15 dark:bg-blue-600 dark:shadow-blue-600/20 sm:h-14 sm:w-14">
                    <FileText size={23} strokeWidth={2} />

                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-blue-500 dark:border-[#0A1626]">
                      <Sparkles size={9} />
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-400 sm:text-[11px]">
                        Agreement Management
                      </span>

                      <span className="inline-flex items-center gap-1 rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[9px] font-bold text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
                        <Sparkles size={9} />
                        DealerPro
                      </span>
                    </div>

                    <h1 className="text-xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-2xl lg:text-[27px]">
                      All Agreements
                    </h1>

                    <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500 dark:text-slate-400 sm:text-sm">
                      Search, filter and manage your dealership agreements
                      from one centralized workspace.
                    </p>
                  </div>
                </div>

                {/* Status Card */}
                <div className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 dark:border-slate-700/80 dark:bg-[#101F33] sm:w-auto sm:min-w-[250px] sm:p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                      <Handshake size={18} />
                    </div>

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                        Workspace
                      </p>

                      <p className="mt-0.5 text-sm font-extrabold text-slate-800 dark:text-white">
                        Agreement Center
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[9px] font-extrabold text-emerald-700 dark:border-emerald-500/15 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              TOOLBAR
          ===================================================== */}
          <div className="relative border-b border-slate-100 bg-slate-50/35 px-4 py-4 dark:border-slate-800 dark:bg-[#081321]/60 sm:px-6 lg:px-7">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">

              {/* Search */}
              <div className="relative w-full xl:max-w-[470px]">
                <Search
                  size={17}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by customer, vehicle, agreement..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 text-sm font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#101F33] dark:text-white dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:border-blue-500"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-white"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Actions */}
              <div className="flex w-full flex-col gap-2 sm:flex-row xl:w-auto">

                {/* Filter */}
                <button
                  type="button"
                  onClick={() => setShowFilterModal(true)}
                  className={`group relative flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border px-5 text-sm font-bold transition-all duration-200 sm:flex-none ${
                    isFiltersApplied
                      ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
                      : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-[#101F33] dark:text-slate-200 dark:hover:border-blue-500/40 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                  }`}
                >
                  <SlidersHorizontal
                    size={16}
                    className="transition-transform group-hover:rotate-12"
                  />

                  <span>Filters</span>

                  {isFiltersApplied && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white/20 px-1.5 text-[10px] font-extrabold">
                      {filteredCount}
                    </span>
                  )}
                </button>

                {/* New Agreement */}
                <div className="relative w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setShowDropdown((prev) => !prev)}
                    className="group flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#002147] px-5 text-sm font-bold text-white shadow-lg shadow-[#002147]/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#00305f] dark:bg-blue-600 dark:shadow-blue-600/20 dark:hover:bg-blue-700 sm:w-auto"
                  >
                    <Plus
                      size={17}
                      strokeWidth={2.6}
                      className="transition-transform duration-200 group-hover:rotate-90"
                    />

                    <span>New Agreement</span>

                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        showDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showDropdown && (
                    <>
                      <div
                        className="fixed inset-0 z-40 bg-slate-950/10 backdrop-blur-[1px] sm:hidden"
                        onClick={() => setShowDropdown(false)}
                      />

                      <div className="absolute right-0 top-full z-50 mt-2 w-[calc(100vw-2rem)] max-w-[310px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/15 dark:border-slate-700 dark:bg-[#101F33] dark:shadow-black/40 sm:w-[310px]">

                        <div className="flex items-center justify-between px-3 pb-2.5 pt-2">
                          <div>
                            <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-slate-400">
                              Create New
                            </p>

                            <p className="mt-0.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                              Choose agreement type
                            </p>
                          </div>

                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                            <FileText size={13} />
                          </div>
                        </div>

                        {/* Sales */}
                        <button
                          type="button"
                          onClick={() => {
                            setShowDropdown(false);
                            navigate("/add-new-sales-agreement");
                          }}
                          className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all hover:bg-blue-50 dark:hover:bg-blue-500/10"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-transform group-hover:scale-105 dark:bg-blue-500/10 dark:text-blue-400">
                            <FileText size={17} />
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="flex items-center justify-between gap-2">
                              <span className="block text-sm font-extrabold text-slate-800 dark:text-slate-100">
                                Sales Agreement
                              </span>

                              <ArrowUpRight
                                size={14}
                                className="text-slate-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-500"
                              />
                            </span>

                            <span className="mt-0.5 block text-[10px] leading-4 text-slate-400">
                              Create a vehicle sale agreement
                            </span>
                          </span>
                        </button>

                        {/* Purchase */}
                        <button
                          type="button"
                          onClick={() => {
                            setShowDropdown(false);
                            navigate("/add-new-purchase-agreement");
                          }}
                          className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all hover:bg-emerald-50 dark:hover:bg-emerald-500/10"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-transform group-hover:scale-105 dark:bg-emerald-500/10 dark:text-emerald-400">
                            <ShoppingCart size={17} />
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="flex items-center justify-between gap-2">
                              <span className="block text-sm font-extrabold text-slate-800 dark:text-slate-100">
                                Purchase Agreement
                              </span>

                              <ArrowUpRight
                                size={14}
                                className="text-slate-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-500"
                              />
                            </span>

                            <span className="mt-0.5 block text-[10px] leading-4 text-slate-400">
                              Record a vehicle purchase
                            </span>
                          </span>
                        </button>

                        {/* Agency */}
                        <button
                          type="button"
                          onClick={() => {
                            setShowDropdown(false);
                            navigate("/add-new-agency-agreement");
                          }}
                          className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all hover:bg-violet-50 dark:hover:bg-violet-500/10"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 transition-transform group-hover:scale-105 dark:bg-violet-500/10 dark:text-violet-400">
                            <Handshake size={17} />
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="flex items-center justify-between gap-2">
                              <span className="block text-sm font-extrabold text-slate-800 dark:text-slate-100">
                                Agency Agreement
                              </span>

                              <ArrowUpRight
                                size={14}
                                className="text-slate-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-500"
                              />
                            </span>

                            <span className="mt-0.5 block text-[10px] leading-4 text-slate-400">
                              Create an agency agreement
                            </span>
                          </span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              ACTIVE FILTER BAR
          ===================================================== */}
          {isFiltersApplied && (
            <div className="relative border-b border-blue-100 bg-blue-50/70 px-4 py-3 dark:border-blue-500/10 dark:bg-blue-500/[0.055] sm:px-6 lg:px-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    <Filter size={15} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-extrabold text-blue-950 dark:text-blue-300">
                        Active filters
                      </p>

                      <span className="rounded-full bg-blue-600 px-1.5 py-0.5 text-[9px] font-extrabold text-white">
                        Active
                      </span>
                    </div>

                    <p className="mt-0.5 text-[10px] text-blue-700/70 dark:text-blue-400/70 sm:text-xs">
                      Showing{" "}
                      <strong className="font-extrabold">
                        {filteredCount}
                      </strong>{" "}
                      matching agreements
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="flex w-fit items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-bold text-blue-700 transition hover:bg-blue-100 hover:text-blue-900 dark:text-blue-400 dark:hover:bg-blue-500/10 dark:hover:text-blue-300"
                >
                  <X size={13} />
                  Clear filters
                </button>
              </div>
            </div>
          )}

          {/* =====================================================
              TABLE
          ===================================================== */}
          <div className="relative min-w-0">
            <AgreementsTable
              search={search}
              expandedId={expandedId}
              setExpandedId={setExpandedId}
              filters={agreementFilters}
              setFilteredCount={setFilteredCount}
            />
          </div>

          {/* Bottom security strip */}
          <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/50 px-4 py-3 dark:border-slate-800 dark:bg-[#081321]/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-7">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <ShieldCheck size={14} />
              </div>

              <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 sm:text-xs">
                Agreement data is securely managed in DealerPro.
              </p>
            </div>

            <span className="text-[10px] font-bold text-slate-400">
              Secure workspace
            </span>
          </div>
        </div>

        {/* =========================================================
            FILTER MODAL
        ========================================================= */}
        <FilterAgreements
          open={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          onApplyFilters={setAgreementFilters}
          currentFilters={agreementFilters}
        />
      </div>
    </div>
  );
};

export default AllAgreements;