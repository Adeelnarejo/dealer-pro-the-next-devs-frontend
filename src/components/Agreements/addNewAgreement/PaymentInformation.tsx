import React from "react";
import { useLocation } from "react-router-dom";
import {
  Banknote,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  FileText,
  Landmark,
  MessageSquareText,
  Smartphone,
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

const PaymentInformation: React.FC<Props> = ({
  form,
  handleChange,
}) => {
  const location = useLocation();

  const isSalesAgreement =
    location.pathname === "/add-new-sales-agreement";

  const isPurchaseAgreement =
    location.pathname === "/add-new-purchase-agreement";

  if (!isSalesAgreement && !isPurchaseAgreement) {
    return null;
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#101D31] dark:text-white dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:border-blue-500 dark:focus:bg-[#101D31]";

  const selectClass =
    "w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-11 text-sm font-medium text-slate-800 outline-none transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#101D31] dark:text-white dark:hover:border-slate-600 dark:focus:border-blue-500 dark:focus:bg-[#101D31]";

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
                {isSalesAgreement
                  ? "Additional Information"
                  : "Purchase Information"}
              </h2>

              <p className="mt-0.5 text-[11px] font-medium text-slate-400 dark:text-slate-500">
                {isSalesAgreement
                  ? "Add payment-related notes and agreement details"
                  : "Enter purchase, payment and settlement details"}
              </p>
            </div>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 dark:border-blue-500/20 dark:bg-blue-500/10">
            <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />

            <span className="text-[9px] font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">
              Payment Details
            </span>
          </div>
        </div>

        {/* Purchase fields */}
        {isPurchaseAgreement && (
          <>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {/* Purchase Price */}
              <FieldWrapper
                icon={<Banknote className="h-4 w-4" />}
                label="Purchase Price"
                required
              >
                <div className="relative">
                  <input
                    type="number"
                    name="purchasePrice"
                    value={form.purchasePrice || ""}
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
                required
              >
                <SelectWrapper>
                  <select
                    name="paymentMethod"
                    value={form.paymentMethod || ""}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="">Select payment method</option>
                    <option value="bank_transfer">
                      Bank Transfer
                    </option>
                    <option value="swish">Swish</option>
                    <option value="cash">Cash</option>
                    <option value="check">Check</option>
                  </select>
                </SelectWrapper>
              </FieldWrapper>

              {/* Credit Marking */}
              <FieldWrapper
                icon={<Landmark className="h-4 w-4" />}
                label="Credit Marking"
                required
              >
                <SelectWrapper>
                  <select
                    name="creditMarking"
                    value={form.creditMarking || ""}
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

              {/* Payout Date */}
              <FieldWrapper
                icon={<CalendarDays className="h-4 w-4" />}
                label="Payout Date"
                required
              >
                <input
                  type="date"
                  name="payoutDate"
                  value={form.payoutDate || ""}
                  onChange={handleChange}
                  className={`${inputClass} cursor-pointer`}
                />
              </FieldWrapper>
            </div>

            {/* Credit information */}
            {form.creditMarking === "yes" && (
              <div className="mt-6 overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/70 dark:border-amber-500/20 dark:bg-amber-500/5">
                <div className="flex items-center gap-3 border-b border-amber-200 px-4 py-3 dark:border-amber-500/20">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                    <Landmark className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-[11px] font-extrabold text-amber-900 dark:text-amber-300">
                      Credit Information
                    </p>

                    <p className="text-[9px] font-medium text-amber-700/70 dark:text-amber-400/60">
                      Additional details are required for the credit
                      arrangement.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 p-4 lg:grid-cols-2">
                  {/* Creditor */}
                  <FieldWrapper
                    icon={<Building2 className="h-4 w-4" />}
                    label="Creditor Name"
                    required
                  >
                    <input
                      type="text"
                      name="creditorName"
                      value={form.creditorName || ""}
                      onChange={handleChange}
                      placeholder="Enter creditor name"
                      className={inputClass}
                    />
                  </FieldWrapper>

                  {/* Credit Amount */}
                  <FieldWrapper
                    icon={<Banknote className="h-4 w-4" />}
                    label="Credit Amount"
                    required
                  >
                    <div className="relative">
                      <input
                        type="number"
                        name="creditAmount"
                        value={form.creditAmount || ""}
                        onChange={handleChange}
                        placeholder="0.00"
                        className={`${inputClass} pr-16`}
                      />

                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 dark:text-slate-500">
                        SEK
                      </span>
                    </div>
                  </FieldWrapper>

                  {/* Settlement Date */}
                  <FieldWrapper
                    icon={<CalendarDays className="h-4 w-4" />}
                    label="Settlement Date"
                    required
                  >
                    <input
                      type="date"
                      name="settlementDate"
                      value={form.settlementDate || ""}
                      onChange={handleChange}
                      className={`${inputClass} cursor-pointer`}
                    />
                  </FieldWrapper>
                </div>
              </div>
            )}

            {/* Payment method details */}
            {form.paymentMethod === "bank_transfer" && (
              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/50 p-4 dark:border-blue-500/15 dark:bg-blue-500/5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    <Landmark className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-[11px] font-extrabold text-slate-800 dark:text-white">
                      Bank Transfer Details
                    </p>

                    <p className="text-[9px] font-medium text-slate-400 dark:text-slate-500">
                      Provide the bank and account information.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  <FieldWrapper
                    icon={<Building2 className="h-4 w-4" />}
                    label="Bank"
                    required
                  >
                    <input
                      type="text"
                      name="bank"
                      value={form.bank || ""}
                      onChange={handleChange}
                      placeholder="Enter bank name"
                      className={inputClass}
                    />
                  </FieldWrapper>

                  <FieldWrapper
                    icon={<CreditCard className="h-4 w-4" />}
                    label="Account Number"
                    required
                  >
                    <input
                      type="text"
                      name="accountNumber"
                      value={form.accountNumber || ""}
                      onChange={handleChange}
                      placeholder="Enter account number"
                      className={inputClass}
                    />
                  </FieldWrapper>
                </div>
              </div>
            )}

            {/* Swish details */}
            {form.paymentMethod === "swish" && (
              <div className="mt-6 rounded-2xl border border-violet-100 bg-violet-50/50 p-4 dark:border-violet-500/15 dark:bg-violet-500/5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                    <Smartphone className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-[11px] font-extrabold text-slate-800 dark:text-white">
                      Swish Payment Details
                    </p>

                    <p className="text-[9px] font-medium text-slate-400 dark:text-slate-500">
                      Enter the Swish number used for the payment.
                    </p>
                  </div>
                </div>

                <FieldWrapper
                  icon={<Smartphone className="h-4 w-4" />}
                  label="Swish Number"
                  required
                >
                  <input
                    type="text"
                    name="swishNumber"
                    value={form.swishNumber || ""}
                    onChange={handleChange}
                    placeholder="Enter Swish number"
                    className={inputClass}
                  />
                </FieldWrapper>
              </div>
            )}
          </>
        )}

        {/* Notes / Free Text */}
        <div className={isPurchaseAgreement ? "mt-6" : ""}>
          <FieldWrapper
            icon={<MessageSquareText className="h-4 w-4" />}
            label={
              isSalesAgreement
                ? "Free Text Message (Payment)"
                : "Notes"
            }
          >
            <div className="relative">
              <textarea
                name="freeTextMessage"
                value={form.freeTextMessage || ""}
                onChange={handleChange}
                placeholder={
                  isSalesAgreement
                    ? "Enter any specific payment details or comments here..."
                    : "Add any additional notes or payment information..."
                }
                className={`${inputClass} min-h-[120px] resize-y pr-4 leading-6`}
              />

              <div className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-white/80 px-2 py-1 text-[8px] font-bold text-slate-400 dark:bg-[#101D31]/80 dark:text-slate-500">
                Optional
              </div>
            </div>
          </FieldWrapper>
        </div>

        {/* Footer hint */}
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-[#101D31]/60">
          <div className="mt-0.5 shrink-0">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
              Payment information
            </p>

            <p className="mt-1 text-[9px] leading-5 text-slate-400 dark:text-slate-500">
              Make sure all payment and settlement details are accurate
              before submitting the agreement.
            </p>
          </div>
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

export default PaymentInformation;