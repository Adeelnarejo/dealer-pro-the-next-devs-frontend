import React, { useState } from "react";
import {
  X,
  SlidersHorizontal,
  FileText,
  Users,
  CalendarDays,
  Wallet,
  ArrowDownUp,
} from "lucide-react";
import { DropdownArrowIcon } from "../utils/Icons";

interface InvoiceFilters {
  status?: string;
  customerType?: string;
  fromDate?: string;
  toDate?: string;
  minAmount?: string;
  maxAmount?: string;
  sortBy?: "date-desc" | "date-asc" | "amount-desc" | "amount-asc";
}

interface FilterInvoicesProps {
  open: boolean;
  onClose: () => void;
  onApplyFilters: (filters: InvoiceFilters) => void;
  currentFilters: InvoiceFilters;
}

const initialFilters: InvoiceFilters = {
  status: "",
  customerType: "",
  fromDate: "",
  toDate: "",
  minAmount: "",
  maxAmount: "",
  sortBy: "date-desc",
};

const FilterInvoices: React.FC<FilterInvoicesProps> = ({
  open,
  onClose,
  onApplyFilters,
  currentFilters,
}) => {
  const [filters, setFilters] =
    useState<InvoiceFilters>(currentFilters);

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
    const resetFilters: InvoiceFilters = {
      ...initialFilters,
    };

    setFilters(resetFilters);
    onApplyFilters(resetFilters);
  };

  const hasActiveFilters =
    !!filters.status ||
    !!filters.customerType ||
    !!filters.fromDate ||
    !!filters.toDate ||
    !!filters.minAmount ||
    !!filters.maxAmount ||
    filters.sortBy !== "date-desc";

  return (
    <div className="fixed inset-0 z-[999] flex justify-end bg-black/40 backdrop-blur-sm font-plus-jakarta">
      {/* Drawer */}
      <div
        className="
          flex h-full w-full max-w-[520px] flex-col
          border-l border-slate-200 bg-white shadow-2xl
          dark:border-slate-800 dark:bg-[#0b1120]
          animate-[slideIn_.25s_ease-out]
        "
      >
        {/* Header */}
        <div
          className="
            flex items-center justify-between
            border-b border-slate-200 px-5 py-5
            sm:px-6
            dark:border-slate-800
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-11 w-11 items-center justify-center
                rounded-xl bg-blue-50 text-blue-600
                dark:bg-blue-500/10 dark:text-blue-400
              "
            >
              <SlidersHorizontal className="h-5 w-5" />
            </div>

            <div>
              <h2
                className="
                  text-[17px] font-semibold text-slate-900
                  dark:text-white
                "
              >
                Invoice Filters
              </h2>

              <p
                className="
                  mt-0.5 text-xs text-slate-500
                  dark:text-slate-400
                "
              >
                Refine and organize your invoices
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close filters"
            className="
              flex h-9 w-9 items-center justify-center rounded-lg
              text-slate-400 transition
              hover:bg-slate-100 hover:text-slate-700
              dark:hover:bg-slate-800 dark:hover:text-white
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="scrollbar-hide flex-1 overflow-y-auto px-5 py-6 sm:px-6">
          {/* Invoice Type */}
          <div className="mb-7">
            <div className="mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" />

              <div>
                <h3
                  className="
                    text-sm font-semibold text-slate-900
                    dark:text-white
                  "
                >
                  Invoice Type
                </h3>

                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Select the document type
                </p>
              </div>
            </div>

            <div className="relative">
              <select
                name="status"
                value={filters.status || ""}
                onChange={handleChange}
                className="
                  w-full appearance-none rounded-xl
                  border border-slate-200 bg-slate-50
                  px-4 py-3 pr-10 text-sm text-slate-800
                  outline-none transition
                  focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
                  dark:border-slate-700 dark:bg-slate-900
                  dark:text-slate-200
                "
              >
                <option value="">All Types</option>
                <option value="paid">Invoice</option>
                <option value="pending">Receipt</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                <DropdownArrowIcon className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Customer Type */}
          <div className="mb-7">
            <div className="mb-3 flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />

              <div>
                <h3
                  className="
                    text-sm font-semibold text-slate-900
                    dark:text-white
                  "
                >
                  Customer Type
                </h3>

                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Filter invoices by customer category
                </p>
              </div>
            </div>

            <div className="relative">
              <select
                name="customerType"
                value={filters.customerType || ""}
                onChange={handleChange}
                className="
                  w-full appearance-none rounded-xl
                  border border-slate-200 bg-slate-50
                  px-4 py-3 pr-10 text-sm text-slate-800
                  outline-none transition
                  focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
                  dark:border-slate-700 dark:bg-slate-900
                  dark:text-slate-200
                "
              >
                <option value="">All Customer Types</option>
                <option value="individual">Individual</option>
                <option value="business">Business</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                <DropdownArrowIcon className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Date Range */}
          <div className="mb-7">
            <div className="mb-3 flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-blue-500" />

              <div>
                <h3
                  className="
                    text-sm font-semibold text-slate-900
                    dark:text-white
                  "
                >
                  Date Range
                </h3>

                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Choose the invoice date period
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  className="
                    mb-2 block text-xs font-medium
                    text-slate-600 dark:text-slate-300
                  "
                >
                  From Date
                </label>

                <input
                  type="date"
                  name="fromDate"
                  value={filters.fromDate || ""}
                  onChange={handleChange}
                  className="
                    w-full rounded-xl border border-slate-200
                    bg-slate-50 px-4 py-3 text-sm text-slate-800
                    outline-none transition
                    focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
                    dark:border-slate-700 dark:bg-slate-900
                    dark:text-slate-200
                  "
                />
              </div>

              <div>
                <label
                  className="
                    mb-2 block text-xs font-medium
                    text-slate-600 dark:text-slate-300
                  "
                >
                  To Date
                </label>

                <input
                  type="date"
                  name="toDate"
                  value={filters.toDate || ""}
                  onChange={handleChange}
                  className="
                    w-full rounded-xl border border-slate-200
                    bg-slate-50 px-4 py-3 text-sm text-slate-800
                    outline-none transition
                    focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
                    dark:border-slate-700 dark:bg-slate-900
                    dark:text-slate-200
                  "
                />
              </div>
            </div>
          </div>

          {/* Amount Range */}
          <div className="mb-7">
            <div className="mb-3 flex items-center gap-2">
              <Wallet className="h-4 w-4 text-blue-500" />

              <div>
                <h3
                  className="
                    text-sm font-semibold text-slate-900
                    dark:text-white
                  "
                >
                  Amount Range
                </h3>

                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Set a minimum and maximum amount
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  className="
                    mb-2 block text-xs font-medium
                    text-slate-600 dark:text-slate-300
                  "
                >
                  Minimum Amount
                </label>

                <div className="relative">
                  <input
                    type="number"
                    name="minAmount"
                    value={filters.minAmount || ""}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    className="
                      w-full rounded-xl border border-slate-200
                      bg-slate-50 px-4 py-3 text-sm text-slate-800
                      outline-none transition
                      placeholder:text-slate-400
                      focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
                      dark:border-slate-700 dark:bg-slate-900
                      dark:text-slate-200 dark:placeholder:text-slate-600
                    "
                  />
                </div>
              </div>

              <div>
                <label
                  className="
                    mb-2 block text-xs font-medium
                    text-slate-600 dark:text-slate-300
                  "
                >
                  Maximum Amount
                </label>

                <input
                  type="number"
                  name="maxAmount"
                  value={filters.maxAmount || ""}
                  onChange={handleChange}
                  placeholder="No limit"
                  min="0"
                  className="
                    w-full rounded-xl border border-slate-200
                    bg-slate-50 px-4 py-3 text-sm text-slate-800
                    outline-none transition
                    placeholder:text-slate-400
                    focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
                    dark:border-slate-700 dark:bg-slate-900
                    dark:text-slate-200 dark:placeholder:text-slate-600
                  "
                />
              </div>
            </div>
          </div>

          {/* Sort */}
          <div className="mb-7">
            <div className="mb-3 flex items-center gap-2">
              <ArrowDownUp className="h-4 w-4 text-blue-500" />

              <div>
                <h3
                  className="
                    text-sm font-semibold text-slate-900
                    dark:text-white
                  "
                >
                  Sort Results
                </h3>

                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Choose how invoices should be displayed
                </p>
              </div>
            </div>

            <div className="relative">
              <select
                name="sortBy"
                value={filters.sortBy || "date-desc"}
                onChange={handleChange}
                className="
                  w-full appearance-none rounded-xl
                  border border-slate-200 bg-slate-50
                  px-4 py-3 pr-10 text-sm text-slate-800
                  outline-none transition
                  focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
                  dark:border-slate-700 dark:bg-slate-900
                  dark:text-slate-200
                "
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="amount-desc">Amount: High to Low</option>
                <option value="amount-asc">Amount: Low to High</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                <DropdownArrowIcon className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div
              className="
                rounded-xl border border-blue-100
                bg-blue-50/70 p-4
                dark:border-blue-500/20 dark:bg-blue-500/5
              "
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500" />

                <p
                  className="
                    text-xs font-medium text-blue-700
                    dark:text-blue-400
                  "
                >
                  Filters are active
                </p>
              </div>

              <p
                className="
                  mt-1 text-[11px] leading-5
                  text-blue-600/80 dark:text-blue-400/70
                "
              >
                Your invoice list will be updated when you apply
                these filters.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="
            mt-auto border-t border-slate-200
            bg-white/95 p-5 backdrop-blur
            sm:p-6
            dark:border-slate-800 dark:bg-[#0b1120]/95
          "
        >
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="
                flex-1 rounded-xl border border-slate-200
                bg-white px-4 py-3 text-sm font-semibold
                text-slate-700 transition
                hover:bg-slate-50
                dark:border-slate-700 dark:bg-slate-900
                dark:text-slate-200 dark:hover:bg-slate-800
              "
            >
              Reset
            </button>

            <button
              onClick={handleApply}
              className="
                flex-1 rounded-xl bg-blue-600
                px-4 py-3 text-sm font-semibold text-white
                shadow-lg shadow-blue-600/20 transition
                hover:bg-blue-700 hover:shadow-blue-600/30
                active:scale-[0.98]
              "
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Local styles */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0.8;
          }
          to {
            transform: translateX(0);
            opacity: 1;
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

        .dark input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          opacity: 0.55;
        }
      `}</style>
    </div>
  );
};

export default FilterInvoices;