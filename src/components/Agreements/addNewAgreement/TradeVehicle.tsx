import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  AlertCircle,
  Banknote,
  CalendarDays,
  CarFront,
  CheckCircle2,
  ChevronDown,
  Gauge,
  Search,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

type Props = {
  form: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  onSearch: (type: "VEHICLE", query: string) => void;
};

const TradeVehicle: React.FC<Props> = ({
  form,
  handleChange,
  onSearch,
}) => {
  const [regInput, setRegInput] = useState("");
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const location = useLocation();

  if (location.pathname !== "/add-new-sales-agreement") {
    return null;
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#101D31] dark:text-white dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:border-blue-500 dark:focus:bg-[#101D31]";

  const selectClass =
    "w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-11 text-sm font-medium text-slate-800 outline-none transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#101D31] dark:text-white dark:hover:border-slate-600 dark:focus:border-blue-500 dark:focus:bg-[#101D31]";

  const searchButtonClass =
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-3 text-xs font-bold text-white shadow-sm shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-800 hover:shadow-md hover:shadow-blue-600/25 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0";

  const handleVehicleSearch = async () => {
    const registrationNumber =
      String(
        form.tradeInRegistrationNumber || regInput || ""
      ).trim();

    if (!registrationNumber) {
      setError("Trade-in registration number is required");
      return;
    }

    setError("");
    setIsSearching(true);

    handleChange({
      target: {
        name: "tradeInRegistrationNumber",
        value: registrationNumber,
      },
    } as React.ChangeEvent<HTMLInputElement>);

    try {
      await onSearch("VEHICLE", registrationNumber);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section className="mb-5 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0B1628]">
      {/* Top accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500" />

      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <CarFront className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Trade-In Vehicle
              </h2>

              <p className="mt-0.5 text-[11px] font-medium text-slate-400 dark:text-slate-500">
                Add the vehicle being traded in as part of this sale
              </p>
            </div>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 dark:border-slate-700 dark:bg-[#101D31]">
            <CarFront className="h-3.5 w-3.5 text-blue-500" />

            <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Optional
            </span>
          </div>
        </div>

        {/* Trade-in selection */}
        <FieldWrapper
          icon={<CarFront className="h-4 w-4" />}
          label="Trade-In Vehicle"
        >
          <SelectWrapper>
            <select
              name="tradeInVehicle"
              value={form.tradeInVehicle || ""}
              onChange={(e) => {
                setError("");
                handleChange(e);
              }}
              className={selectClass}
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </SelectWrapper>
        </FieldWrapper>

        {/* Trade-in details */}
        {form.tradeInVehicle === "yes" && (
          <div className="mt-6">
            {/* Details header */}
            <div className="mb-5 flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/60 p-4 dark:border-blue-500/15 dark:bg-blue-500/5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <WalletCards className="h-4 w-4" />
              </div>

              <div>
                <p className="text-[11px] font-extrabold text-blue-900 dark:text-blue-300">
                  Trade-In Details
                </p>

                <p className="mt-1 text-[9px] font-medium text-blue-700/70 dark:text-blue-300/60">
                  Enter the vehicle details and financial information
                  for the trade-in.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {/* Registration */}
              <FieldWrapper
                icon={<CarFront className="h-4 w-4" />}
                label="Registration Number"
                required
              >
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="text"
                    name="tradeInRegistrationNumber"
                    value={
                      form.tradeInRegistrationNumber ||
                      regInput ||
                      ""
                    }
                    onChange={(e) => {
                      setRegInput(e.target.value);
                      setError("");
                      handleChange(e);
                    }}
                    placeholder="ABC123"
                    className={inputClass}
                  />

                  <button
                    type="button"
                    onClick={handleVehicleSearch}
                    disabled={isSearching}
                    className={searchButtonClass}
                  >
                    {isSearching ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Searching
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4" />
                        Fetch
                      </>
                    )}
                  </button>
                </div>

                {error && (
                  <div className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold text-red-600 dark:text-red-400">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {error}
                  </div>
                )}
              </FieldWrapper>

              {/* Purchase Date */}
              <FieldWrapper
                icon={<CalendarDays className="h-4 w-4" />}
                label="Purchase Date"
              >
                <input
                  type="date"
                  name="tradeInPurchaseDate"
                  value={form.tradeInPurchaseDate || ""}
                  onChange={handleChange}
                  className={`${inputClass} cursor-pointer`}
                />
              </FieldWrapper>

              {/* Purchase Price */}
              <FieldWrapper
                icon={<Banknote className="h-4 w-4" />}
                label="Purchase Price"
              >
                <div className="relative">
                  <input
                    type="number"
                    name="tradeInPurchasePrice"
                    value={form.tradeInPurchasePrice || ""}
                    onChange={handleChange}
                    placeholder="0.00"
                    className={`${inputClass} pr-16`}
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 dark:text-slate-500">
                    SEK
                  </span>
                </div>
              </FieldWrapper>

              {/* Mileage */}
              <FieldWrapper
                icon={<Gauge className="h-4 w-4" />}
                label="Mileage"
              >
                <div className="relative">
                  <input
                    type="number"
                    name="tradeInMileage"
                    value={form.tradeInMileage || ""}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    className={`${inputClass} pr-16`}
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 dark:text-slate-500">
                    KM
                  </span>
                </div>
              </FieldWrapper>

              {/* Credit Marking */}
              <FieldWrapper
                icon={<ShieldCheck className="h-4 w-4" />}
                label="Credit Marking"
              >
                <SelectWrapper>
                  <select
                    name="tradeInCreditMaking"
                    value={form.tradeInCreditMaking || ""}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="">
                      Select credit status
                    </option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </SelectWrapper>
              </FieldWrapper>

              {/* Remaining Debt */}
              {form.tradeInCreditMaking === "yes" && (
                <FieldWrapper
                  icon={<Banknote className="h-4 w-4" />}
                  label="Remaining Debt"
                  required
                >
                  <div className="relative">
                    <input
                      type="number"
                      name="tradeInRestAmount"
                      value={form.tradeInRestAmount || ""}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      className={`${inputClass} pr-16`}
                    />

                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 dark:text-slate-500">
                      SEK
                    </span>
                  </div>
                </FieldWrapper>
              )}
            </div>

            {/* Credit warning */}
            {form.tradeInCreditMaking === "yes" && (
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-500/20 dark:bg-amber-500/5">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />

                <div>
                  <p className="text-[10px] font-bold text-amber-900 dark:text-amber-300">
                    Outstanding credit detected
                  </p>

                  <p className="mt-1 text-[9px] leading-5 text-amber-700/70 dark:text-amber-400/60">
                    Please verify the remaining debt amount before
                    completing the trade-in information.
                  </p>
                </div>
              </div>
            )}

            {/* Completion indicator */}
            <div className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3 dark:border-emerald-500/15 dark:bg-emerald-500/5">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />

              <p className="text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
                Trade-in information can be updated at any time before
                the agreement is submitted.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

/* =========================================================
   Field Wrapper
========================================================= */

function FieldWrapper({
  icon,
  label,
  required = false,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label className="mb-2 flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        <span className="text-blue-500 dark:text-blue-400">
          {icon}
        </span>

        {label}

        {required && (
          <span className="text-red-500">*</span>
        )}
      </label>

      {children}
    </div>
  );
}

/* =========================================================
   Select Wrapper
========================================================= */

function SelectWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {children}

      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
    </div>
  );
}

export default TradeVehicle;