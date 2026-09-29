import React, { useState } from "react";
import {
  X,
  SlidersHorizontal,
  Users,
  CalendarDays,
} from "lucide-react";
import { DropdownArrowIcon } from "../utils/Icons";

type CustomerFilters = {
  type?: string;
  status?: string;
  agreementType?: string;
  fromDate?: string;
  toDate?: string;
};

interface FilterCustomerProps {
  open: boolean;
  onClose: () => void;
  onApplyFilters: (filters: CustomerFilters) => void;
  currentFilters: CustomerFilters;
}

const initialFilterState: CustomerFilters = {
  type: "",
  status: "",
  agreementType: "",
  fromDate: "",
  toDate: "",
};

const FilterCustomer: React.FC<FilterCustomerProps> = ({
  open,
  onClose,
  onApplyFilters,
  currentFilters,
}) => {
  const [filters, setFilters] =
    useState<CustomerFilters>(currentFilters);

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
    setFilters(initialFilterState);
    onApplyFilters(initialFilterState);
  };

  const inputClass = `
    w-full h-11 rounded-xl
    border border-slate-200
    bg-slate-50/80
    px-3.5
    text-sm text-slate-800
    outline-none
    transition-all
    placeholder:text-slate-400
    focus:border-blue-500
    focus:bg-white
    focus:ring-4
    focus:ring-blue-500/10
    dark:border-slate-700
    dark:bg-slate-900/70
    dark:text-white
    dark:placeholder:text-slate-500
    dark:focus:border-blue-500
    dark:focus:bg-slate-900
  `;

  const labelClass = `
    mb-2 block text-[13px] font-semibold
    text-slate-700
    dark:text-slate-300
  `;

  return (
    <div
      className="
        fixed inset-0 z-[999]
        flex justify-end
        bg-slate-950/45
        backdrop-blur-sm
        font-plus-jakarta
      "
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* DRAWER */}
      <div
        className="
          relative flex h-full w-full max-w-[500px]
          flex-col
          border-l border-slate-200
          bg-white
          shadow-2xl
          dark:border-slate-800
          dark:bg-[#0b1120]
          animate-[slideIn_.25s_ease-out]
        "
      >
        {/* ================= HEADER ================= */}
        <div
          className="
            shrink-0
            border-b border-slate-200
            bg-white/95
            px-6 py-5
            backdrop-blur
            dark:border-slate-800
            dark:bg-[#0b1120]/95
          "
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div
                className="
                  flex h-11 w-11 items-center justify-center
                  rounded-xl
                  bg-blue-600
                  text-white
                  shadow-lg shadow-blue-600/20
                "
              >
                <SlidersHorizontal
                  size={20}
                  strokeWidth={2.2}
                />
              </div>

              <div>
                <h2
                  className="
                    text-lg font-bold tracking-tight
                    text-slate-900
                    dark:text-white
                  "
                >
                  Customer Filters
                </h2>

                <p
                  className="
                    mt-0.5 text-xs
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Refine your customer search
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="
                flex h-9 w-9 shrink-0
                items-center justify-center
                rounded-xl
                text-slate-400
                transition-all
                hover:bg-slate-100
                hover:text-slate-700
                dark:hover:bg-slate-800
                dark:hover:text-white
              "
              aria-label="Close filters"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="px-6 py-6">

            {/* CUSTOMER TYPE */}
            <div className="mb-7">
              <div className="mb-4 flex items-center gap-2">
                <Users
                  size={17}
                  className="text-blue-600"
                />

                <div>
                  <h3
                    className="
                      text-sm font-bold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    Customer Information
                  </h3>

                  <p
                    className="
                      mt-1 text-xs
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Filter customers by their type
                  </p>
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  Customer Type
                </label>

                <div className="relative">
                  <select
                    name="type"
                    value={filters.type || ""}
                    onChange={handleChange}
                    className={`
                      ${inputClass}
                      cursor-pointer
                      appearance-none
                      pr-10
                    `}
                  >
                    <option value="">
                      All Types
                    </option>
                    <option value="Client">
                      Client
                    </option>
                    <option value="Owner">
                      Owner
                    </option>
                    <option value="Agency">
                      Agency
                    </option>
                  </select>

                  <div
                    className="
                      pointer-events-none
                      absolute inset-y-0 right-0
                      flex items-center px-3
                      text-slate-400
                    "
                  >
                    <DropdownArrowIcon className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* DATE RANGE */}
            <div
              className="
                border-t border-slate-100
                pt-7
                dark:border-slate-800
              "
            >
              <div className="mb-4 flex items-center gap-2">
                <CalendarDays
                  size={17}
                  className="text-blue-600"
                />

                <div>
                  <h3
                    className="
                      text-sm font-bold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    Date Range
                  </h3>

                  <p
                    className="
                      mt-1 text-xs
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Select the customer registration period
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* FROM DATE */}
                <div>
                  <label className={labelClass}>
                    From Date
                  </label>

                  <input
                    type="date"
                    name="fromDate"
                    value={filters.fromDate || ""}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {/* TO DATE */}
                <div>
                  <label className={labelClass}>
                    To Date
                  </label>

                  <input
                    type="date"
                    name="toDate"
                    value={filters.toDate || ""}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* ACTIVE FILTER PREVIEW */}
            {(filters.type ||
              filters.status ||
              filters.agreementType ||
              filters.fromDate ||
              filters.toDate) && (
              <div
                className="
                  mt-7 rounded-xl
                  border border-blue-100
                  bg-blue-50/70
                  p-4
                  dark:border-blue-900/40
                  dark:bg-blue-950/20
                "
              >
                <p
                  className="
                    text-xs font-semibold
                    text-blue-700
                    dark:text-blue-400
                  "
                >
                  Active filters
                </p>

                <p
                  className="
                    mt-1 text-xs
                    text-blue-600/80
                    dark:text-blue-400/70
                  "
                >
                  Your selected filters will be applied when you
                  click "Apply Filters".
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div
          className="
            shrink-0
            border-t border-slate-200
            bg-white
            px-6 py-5
            dark:border-slate-800
            dark:bg-[#0b1120]
          "
        >
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="
                flex h-11 flex-1
                items-center justify-center
                rounded-xl
                border border-slate-200
                bg-white
                px-4
                text-sm font-semibold
                text-slate-700
                transition-all
                hover:bg-slate-50
                active:scale-[0.98]
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-slate-300
                dark:hover:bg-slate-800
              "
            >
              Reset
            </button>

            <button
              type="button"
              onClick={handleApply}
              className="
                flex h-11 flex-1
                items-center justify-center
                rounded-xl
                bg-blue-600
                px-4
                text-sm font-semibold
                text-white
                shadow-lg shadow-blue-600/20
                transition-all
                hover:bg-blue-700
                hover:shadow-blue-600/30
                active:scale-[0.98]
              "
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* ================= ANIMATION + HIDDEN SCROLLBAR ================= */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
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

        input[type="date"]::-webkit-calendar-picker-indicator {
          opacity: 0.55;
          cursor: pointer;
        }

        .dark input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          opacity: 0.55;
        }
      `}</style>
    </div>
  );
};

export default FilterCustomer;
