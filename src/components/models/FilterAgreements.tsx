import React, { useState } from "react";
import {
  X,
  SlidersHorizontal,
  FileSignature,
  CalendarDays,
  Wallet,
  ArrowDownUp,
  RotateCcw,
} from "lucide-react";
import { DropdownArrowIcon } from "../utils/Icons";

interface AgreementFilters {
  status?: string;
  agreementType?: string;
  fromDate?: string;
  toDate?: string;
  minAmount?: string;
  maxAmount?: string;
  sortBy?: "date-desc" | "date-asc" | "amount-desc" | "amount-asc";
}

interface FilterAgreementsProps {
  open: boolean;
  onClose: () => void;
  onApplyFilters: (filters: AgreementFilters) => void;
  currentFilters: AgreementFilters;
}

const FilterAgreements: React.FC<FilterAgreementsProps> = ({
  open,
  onClose,
  onApplyFilters,
  currentFilters,
}) => {
  const [filters, setFilters] =
    useState<AgreementFilters>(currentFilters);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: AgreementFilters = {
      status: "",
      agreementType: "",
      fromDate: "",
      toDate: "",
      minAmount: "",
      maxAmount: "",
      sortBy: "date-desc",
    };

    setFilters(resetFilters);
    onApplyFilters(resetFilters);
  };

  return (
    <div
      className="
        fixed inset-0 z-[999]
        flex justify-end
        bg-black/50
        backdrop-blur-sm
        font-plus-jakarta
      "
    >
      <div
        className="
          flex h-full w-full max-w-[520px]
          flex-col
          overflow-hidden
          border-l border-slate-200
          bg-white
          shadow-2xl
          animate-[filterDrawerIn_.25s_ease-out]
          dark:border-slate-800
          dark:bg-[#0b1120]
        "
      >
        {/* Header */}
        <div
          className="
            shrink-0
            border-b border-slate-200
            bg-white/95
            px-5 py-5
            backdrop-blur
            dark:border-slate-800
            dark:bg-[#0b1120]/95
            sm:px-6
          "
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex h-11 w-11 shrink-0
                  items-center justify-center
                  rounded-xl
                  bg-blue-50
                  text-[#012F7A]
                  dark:bg-blue-500/10
                  dark:text-blue-400
                "
              >
                <SlidersHorizontal className="h-5 w-5" />
              </div>

              <div>
                <h2
                  className="
                    text-lg font-bold
                    text-slate-900
                    dark:text-white
                  "
                >
                  Agreement Filters
                </h2>

                <p
                  className="
                    mt-0.5 text-xs
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Refine agreements by status, date and amount
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="
                flex h-9 w-9 shrink-0
                items-center justify-center
                rounded-lg
                text-slate-400
                transition-all
                hover:bg-slate-100
                hover:text-slate-700
                dark:hover:bg-slate-800
                dark:hover:text-white
              "
              aria-label="Close filters"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Active Filter Count */}
          <div className="mt-5 flex items-center justify-between">
            <span
              className="
                text-[11px] font-medium
                text-slate-500
                dark:text-slate-400
              "
            >
              Filter your agreements
            </span>

            <button
              type="button"
              onClick={handleReset}
              className="
                flex items-center gap-1.5
                text-[11px] font-semibold
                text-blue-600
                transition-colors
                hover:text-blue-700
                dark:text-blue-400
                dark:hover:text-blue-300
              "
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset all
            </button>
          </div>
        </div>

        {/* Filter Body */}
        <div
          className="
            scrollbar-hide
            flex-1
            overflow-y-auto
            px-5 py-5
            sm:px-6 sm:py-6
          "
        >
          {/* Status */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <div
                className="
                  flex h-8 w-8
                  items-center justify-center
                  rounded-lg
                  bg-blue-50
                  text-blue-600
                  dark:bg-blue-500/10
                  dark:text-blue-400
                "
              >
                <FileSignature className="h-4 w-4" />
              </div>

              <div>
                <h3
                  className="
                    text-sm font-semibold
                    text-slate-900
                    dark:text-white
                  "
                >
                  Agreement Status
                </h3>

                <p
                  className="
                    text-[11px]
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Select the current agreement status
                </p>
              </div>
            </div>

            <div className="relative">
              <select
                name="status"
                value={filters.status || ""}
                onChange={handleChange}
                className="
                  h-11 w-full
                  appearance-none
                  rounded-xl
                  border border-slate-200
                  bg-slate-50
                  px-3 pr-10
                  text-sm
                  text-slate-900
                  outline-none
                  transition-all
                  focus:border-blue-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-blue-500/10
                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-white
                  dark:focus:border-blue-500
                  dark:focus:bg-slate-900
                "
              >
                <option value="">All statuses</option>
                <option value="active">Created</option>
                <option value="inactive">Signed</option>
              </select>

              <div
                className="
                  pointer-events-none
                  absolute inset-y-0 right-3
                  flex items-center
                "
              >
                <DropdownArrowIcon
                  className="h-4 w-4 text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Date Range */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <div
                className="
                  flex h-8 w-8
                  items-center justify-center
                  rounded-lg
                  bg-indigo-50
                  text-indigo-600
                  dark:bg-indigo-500/10
                  dark:text-indigo-400
                "
              >
                <CalendarDays className="h-4 w-4" />
              </div>

              <div>
                <h3
                  className="
                    text-sm font-semibold
                    text-slate-900
                    dark:text-white
                  "
                >
                  Date Range
                </h3>

                <p
                  className="
                    text-[11px]
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Filter agreements by creation date
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* From Date */}
              <div>
                <label
                  className="
                    mb-2 block text-xs font-semibold
                    text-slate-600
                    dark:text-slate-300
                  "
                >
                  From date
                </label>

                <input
                  type="date"
                  name="fromDate"
                  value={filters.fromDate || ""}
                  onChange={handleChange}
                  className="
                    h-11 w-full
                    rounded-xl
                    border border-slate-200
                    bg-slate-50
                    px-3
                    text-sm
                    text-slate-900
                    outline-none
                    transition-all
                    focus:border-blue-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-blue-500/10
                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:text-white
                    dark:focus:border-blue-500
                    dark:[color-scheme:dark]
                  "
                />
              </div>

              {/* To Date */}
              <div>
                <label
                  className="
                    mb-2 block text-xs font-semibold
                    text-slate-600
                    dark:text-slate-300
                  "
                >
                  To date
                </label>

                <input
                  type="date"
                  name="toDate"
                  value={filters.toDate || ""}
                  onChange={handleChange}
                  className="
                    h-11 w-full
                    rounded-xl
                    border border-slate-200
                    bg-slate-50
                    px-3
                    text-sm
                    text-slate-900
                    outline-none
                    transition-all
                    focus:border-blue-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-blue-500/10
                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:text-white
                    dark:focus:border-blue-500
                    dark:[color-scheme:dark]
                  "
                />
              </div>
            </div>
          </div>

          {/* Amount Range */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <div
                className="
                  flex h-8 w-8
                  items-center justify-center
                  rounded-lg
                  bg-emerald-50
                  text-emerald-600
                  dark:bg-emerald-500/10
                  dark:text-emerald-400
                "
              >
                <Wallet className="h-4 w-4" />
              </div>

              <div>
                <h3
                  className="
                    text-sm font-semibold
                    text-slate-900
                    dark:text-white
                  "
                >
                  Amount Range
                </h3>

                <p
                  className="
                    text-[11px]
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Set a minimum and maximum amount
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Minimum */}
              <div>
                <label
                  className="
                    mb-2 block text-xs font-semibold
                    text-slate-600
                    dark:text-slate-300
                  "
                >
                  Minimum amount
                </label>

                <div className="relative">
                  <span
                    className="
                      pointer-events-none
                      absolute left-3 top-1/2
                      -translate-y-1/2
                      text-xs font-medium
                      text-slate-400
                    "
                  >
                    $
                  </span>

                  <input
                    type="number"
                    name="minAmount"
                    value={filters.minAmount || ""}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    className="
                      h-11 w-full
                      rounded-xl
                      border border-slate-200
                      bg-slate-50
                      pl-8 pr-3
                      text-sm
                      text-slate-900
                      outline-none
                      transition-all
                      placeholder:text-slate-400
                      focus:border-blue-500
                      focus:bg-white
                      focus:ring-4
                      focus:ring-blue-500/10
                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-white
                      dark:focus:border-blue-500
                      dark:focus:bg-slate-900
                    "
                  />
                </div>
              </div>

              {/* Maximum */}
              <div>
                <label
                  className="
                    mb-2 block text-xs font-semibold
                    text-slate-600
                    dark:text-slate-300
                  "
                >
                  Maximum amount
                </label>

                <div className="relative">
                  <span
                    className="
                      pointer-events-none
                      absolute left-3 top-1/2
                      -translate-y-1/2
                      text-xs font-medium
                      text-slate-400
                    "
                  >
                    $
                  </span>

                  <input
                    type="number"
                    name="maxAmount"
                    value={filters.maxAmount || ""}
                    onChange={handleChange}
                    placeholder="No limit"
                    min="0"
                    className="
                      h-11 w-full
                      rounded-xl
                      border border-slate-200
                      bg-slate-50
                      pl-8 pr-3
                      text-sm
                      text-slate-900
                      outline-none
                      transition-all
                      placeholder:text-slate-400
                      focus:border-blue-500
                      focus:bg-white
                      focus:ring-4
                      focus:ring-blue-500/10
                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-white
                      dark:focus:border-blue-500
                      dark:focus:bg-slate-900
                    "
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sort */}
          <div className="mb-2">
            <div className="mb-3 flex items-center gap-2">
              <div
                className="
                  flex h-8 w-8
                  items-center justify-center
                  rounded-lg
                  bg-violet-50
                  text-violet-600
                  dark:bg-violet-500/10
                  dark:text-violet-400
                "
              >
                <ArrowDownUp className="h-4 w-4" />
              </div>

              <div>
                <h3
                  className="
                    text-sm font-semibold
                    text-slate-900
                    dark:text-white
                  "
                >
                  Sort Results
                </h3>

                <p
                  className="
                    text-[11px]
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Choose how agreements should appear
                </p>
              </div>
            </div>

            <div className="relative">
              <select
                name="sortBy"
                value={filters.sortBy || "date-desc"}
                onChange={handleChange}
                className="
                  h-11 w-full
                  appearance-none
                  rounded-xl
                  border border-slate-200
                  bg-slate-50
                  px-3 pr-10
                  text-sm
                  text-slate-900
                  outline-none
                  transition-all
                  focus:border-blue-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-blue-500/10
                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-white
                  dark:focus:border-blue-500
                  dark:focus:bg-slate-900
                "
              >
                <option value="date-desc">
                  Newest first
                </option>
                <option value="date-asc">
                  Oldest first
                </option>
                <option value="amount-desc">
                  Amount: High to Low
                </option>
                <option value="amount-asc">
                  Amount: Low to High
                </option>
              </select>

              <div
                className="
                  pointer-events-none
                  absolute inset-y-0 right-3
                  flex items-center
                "
              >
                <DropdownArrowIcon
                  className="h-4 w-4 text-slate-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="
            shrink-0
            border-t border-slate-200
            bg-white/95
            p-4
            backdrop-blur
            dark:border-slate-800
            dark:bg-[#0b1120]/95
            sm:p-5
          "
        >
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleReset}
              className="
                flex w-full
                items-center justify-center
                gap-2
                rounded-xl
                border border-slate-200
                bg-white
                px-5 py-3
                text-sm font-semibold
                text-slate-700
                transition-all
                hover:bg-slate-50
                active:scale-[0.98]
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-slate-200
                dark:hover:bg-slate-800
                sm:w-1/2
              "
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>

            <button
              type="button"
              onClick={handleApply}
              className="
                flex w-full
                items-center justify-center
                gap-2
                rounded-xl
                bg-gradient-to-b
                from-[#1F7BF4]
                to-[#015DD6]
                px-5 py-3
                text-sm font-semibold
                text-white
                shadow-lg
                shadow-blue-500/20
                transition-all
                hover:from-[#176FE5]
                hover:to-[#0053C4]
                hover:shadow-blue-500/30
                active:scale-[0.98]
                sm:w-1/2
              "
            >
              <SlidersHorizontal className="h-4 w-4" />
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes filterDrawerIn {
          from {
            opacity: 0;
            transform: translateX(24px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }

        select option {
          background: white;
          color: #0f172a;
        }

        @media (prefers-color-scheme: dark) {
          select option {
            background: #0f172a;
            color: white;
          }
        }
      `}</style>
    </div>
  );
};

export default FilterAgreements;