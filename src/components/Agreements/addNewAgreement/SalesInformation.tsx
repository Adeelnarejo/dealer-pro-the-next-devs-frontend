import React from "react";
import { useLocation } from "react-router-dom";
import {
  Banknote,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  CreditCard,
  Landmark,
  Percent,
  WalletCards,
} from "lucide-react";

type Props = {
  form: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
};

const SalesInformation: React.FC<Props> = ({
  form,
  handleChange,
}) => {
  const location = useLocation();

  if (location.pathname !== "/add-new-sales-agreement") {
    return null;
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#101D31] dark:text-white dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:border-blue-500 dark:focus:bg-[#101D31]";

  const selectClass =
    "w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-11 text-sm font-medium text-slate-800 outline-none transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#101D31] dark:text-white dark:hover:border-slate-600 dark:focus:border-blue-500 dark:focus:bg-[#101D31]";

  const isFinancing =
    form.paymentMethod === "financing_down" ||
    form.paymentMethod === "financing_no_down" ||
    form.paymentMethod === "leasing";

  const showDownPayment =
    form.paymentMethod === "financing_down" ||
    form.paymentMethod === "leasing";

  return (
    <section className="mb-5 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0B1628]">
      {/* Top accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500" />

      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <WalletCards className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Sales Information
              </h2>

              <p className="mt-0.5 text-[11px] font-medium text-slate-400 dark:text-slate-500">
                Configure pricing, payment and financing details
              </p>
            </div>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 dark:border-emerald-500/20 dark:bg-emerald-500/10">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />

            <span className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Sales Details
            </span>
          </div>
        </div>

        {/* Main fields */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Sales Price */}
          <FieldWrapper
            icon={<CircleDollarSign className="h-4 w-4" />}
            label="Sales Price"
          >
            <div className="relative">
              <input
                type="text"
                name="salesPriceSEK"
                value={form.salesPriceSEK || ""}
                onChange={handleChange}
                placeholder="0.00"
                className={`${inputClass} pr-16`}
              />

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 dark:text-slate-500">
                SEK
              </span>
            </div>
          </FieldWrapper>

          {/* Payment Method */}
          <FieldWrapper
            icon={<CreditCard className="h-4 w-4" />}
            label="Payment Method"
          >
            <SelectWrapper>
              <select
                name="paymentMethod"
                value={form.paymentMethod || ""}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="">
                  Select payment method
                </option>

                <option value="bank_transfer">
                  Bank Transfer
                </option>

                <option value="swish">
                  Swish
                </option>

                <option value="invoice">
                  Invoice
                </option>

                <option value="financing_down">
                  Financing with Down Payment
                </option>

                <option value="financing_no_down">
                  Financing without Down Payment
                </option>

                <option value="leasing">
                  Leasing
                </option>
              </select>
            </SelectWrapper>
          </FieldWrapper>

          {/* Financing section */}
          {isFinancing && (
            <>
              {/* Financial Company */}
              <FieldWrapper
                icon={<Building2 className="h-4 w-4" />}
                label="Financial Company"
              >
                <input
                  type="text"
                  name="financialCompany"
                  value={form.financialCompany || ""}
                  onChange={handleChange}
                  placeholder="Bank / finance company"
                  className={inputClass}
                />
              </FieldWrapper>

              {/* Credit Amount */}
              <FieldWrapper
                icon={<Banknote className="h-4 w-4" />}
                label="Credit Amount"
              >
                <div className="relative">
                  <input
                    type="number"
                    name="creditAmountSales"
                    value={form.creditAmountSales || ""}
                    onChange={handleChange}
                    placeholder="0.00"
                    className={`${inputClass} pr-16`}
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 dark:text-slate-500">
                    SEK
                  </span>
                </div>
              </FieldWrapper>

              {/* Down Payment */}
              {showDownPayment && (
                <FieldWrapper
                  icon={<Percent className="h-4 w-4" />}
                  label="Down Payment"
                >
                  <SelectWrapper>
                    <select
                      name="cashStack"
                      value={form.cashStack ?? "0"}
                      onChange={handleChange}
                      className={selectClass}
                    >
                      <option value="0">0 percent</option>
                      <option value="5">5 percent</option>
                      <option value="10">10 percent</option>
                      <option value="15">15 percent</option>
                      <option value="20">20 percent</option>
                      <option value="25">25 percent</option>
                      <option value="30">30 percent</option>
                    </select>
                  </SelectWrapper>
                </FieldWrapper>
              )}

              {/* Loan Period */}
              <FieldWrapper
                icon={<CalendarDays className="h-4 w-4" />}
                label="Loan Period"
              >
                <div className="relative">
                  <input
                    type="number"
                    name="loanPeriod"
                    value={form.loanPeriod || ""}
                    onChange={handleChange}
                    placeholder="Number of months"
                    min="0"
                    className={`${inputClass} pr-24`}
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 dark:text-slate-500">
                    MONTHS
                  </span>
                </div>
              </FieldWrapper>
            </>
          )}

          {/* Payment Date */}
          <FieldWrapper
            icon={<CalendarDays className="h-4 w-4" />}
            label="Payment Date"
          >
            <input
              type="date"
              name="paymentDate"
              value={form.paymentDate || ""}
              onChange={handleChange}
              className={`${inputClass} cursor-pointer`}
            />
          </FieldWrapper>
        </div>

        {/* Financing summary */}
        {isFinancing && (
          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/60 p-4 dark:border-blue-500/15 dark:bg-blue-500/5">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <Landmark className="h-4 w-4" />
              </div>

              <div>
                <p className="text-[11px] font-extrabold text-blue-900 dark:text-blue-300">
                  Financing Information
                </p>

                <p className="mt-1 text-[9px] leading-5 text-blue-700/70 dark:text-blue-300/60">
                  Make sure the financing company, credit amount and loan
                  period match the customer's financing agreement.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom status */}
        <div className="mt-5 flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3 dark:border-slate-800 dark:bg-[#101D31]/60">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />

          <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
            Payment method determines which additional financing details
            are required.
          </p>
        </div>
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

export default SalesInformation;