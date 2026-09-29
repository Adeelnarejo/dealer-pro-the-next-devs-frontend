import {
  Building2,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  CreditCard,
  FileText,
  Landmark,
  NotebookPen,
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
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 font-plus-jakarta text-xs font-medium text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#101D31] dark:text-white dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:border-blue-500 dark:focus:bg-[#101D31]";

const selectClass =
  "w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 font-plus-jakarta text-xs font-medium text-slate-800 outline-none transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#101D31] dark:text-white dark:hover:border-slate-600 dark:focus:border-blue-500 dark:focus:bg-[#101D31]";

const AgencyInformation = ({
  form,
  handleChange,
}: Props) => {
  return (
    <section className="mb-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-[#0B1628]">
      {/* Top accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400" />

      {/* Header */}
      <div className="border-b border-slate-100 px-5 py-5 dark:border-slate-800 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 dark:bg-violet-500/10">
            <Building2 className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          </div>

          <div>
            <h2 className="font-plus-jakarta text-sm font-extrabold text-slate-900 dark:text-white sm:text-base">
              Agency Information
            </h2>

            <p className="mt-0.5 font-plus-jakarta text-[10px] font-medium text-slate-400 dark:text-slate-500">
              Configure pricing, commission, payment and agency details
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Sales Price */}
          <div>
            <label
              htmlFor="salesPrice"
              className="mb-2 block font-plus-jakarta text-xs font-bold text-slate-700 dark:text-slate-300"
            >
              Sales Price{" "}
              <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <CircleDollarSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

              <input
                id="salesPrice"
                type="number"
                name="salesPrice"
                value={form.salesPrice || ""}
                onChange={handleChange}
                placeholder="0.00"
                className={inputClass}
              />
            </div>
          </div>

          {/* Commission Amount */}
          <div>
            <label
              htmlFor="commissionAmount"
              className="mb-2 block font-plus-jakarta text-xs font-bold text-slate-700 dark:text-slate-300"
            >
              Commission Amount (SEK){" "}
              <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <WalletCards className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

              <input
                id="commissionAmount"
                type="number"
                name="commissionAmount"
                value={form.commissionAmount || ""}
                onChange={handleChange}
                placeholder="0.00"
                className={inputClass}
              />
            </div>
          </div>

          {/* Agency Costs */}
          <div>
            <label
              htmlFor="agencyFee"
              className="mb-2 block font-plus-jakarta text-xs font-bold text-slate-700 dark:text-slate-300"
            >
              Agency Costs (SEK){" "}
              <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <CircleDollarSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

              <input
                id="agencyFee"
                type="number"
                name="agencyFee"
                value={form.agencyFee || ""}
                onChange={handleChange}
                placeholder="0.00"
                className={inputClass}
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label
              htmlFor="paymentMethod"
              className="mb-2 block font-plus-jakarta text-xs font-bold text-slate-700 dark:text-slate-300"
            >
              Payment Method{" "}
              <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <CreditCard className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

              <select
                id="paymentMethod"
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
                <option value="invoice">Invoice</option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            </div>
          </div>

          {/* Bank */}
          <div>
            <label
              htmlFor="bank"
              className="mb-2 block font-plus-jakarta text-xs font-bold text-slate-700 dark:text-slate-300"
            >
              Bank <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <Landmark className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

              <input
                id="bank"
                type="text"
                name="bank"
                value={form.bank || ""}
                onChange={handleChange}
                placeholder="Enter bank name"
                className={inputClass}
              />
            </div>
          </div>

          {/* Account Number */}
          <div>
            <label
              htmlFor="accountNumber"
              className="mb-2 block font-plus-jakarta text-xs font-bold text-slate-700 dark:text-slate-300"
            >
              Account Number{" "}
              <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <CreditCard className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

              <input
                id="accountNumber"
                type="text"
                name="accountNumber"
                value={form.accountNumber || ""}
                onChange={handleChange}
                placeholder="Enter account number"
                className={inputClass}
              />
            </div>
          </div>

          {/* Credit Marking */}
          <div>
            <label
              htmlFor="creditMarking"
              className="mb-2 block font-plus-jakarta text-xs font-bold text-slate-700 dark:text-slate-300"
            >
              Credit Marking{" "}
              <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <ShieldCheck className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

              <select
                id="creditMarking"
                name="creditMarking"
                value={form.creditMarking || ""}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            </div>
          </div>

          {/* Conditional Credit Fields */}
          {form.creditMarking === "yes" && (
            <>
              {/* Creditor Name */}
              <div>
                <label
                  htmlFor="creditorName"
                  className="mb-2 block font-plus-jakarta text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Creditor Name{" "}
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

                  <input
                    id="creditorName"
                    type="text"
                    name="creditorName"
                    value={form.creditorName || ""}
                    onChange={handleChange}
                    placeholder="Enter creditor name"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Credit Amount */}
              <div>
                <label
                  htmlFor="creditAmount"
                  className="mb-2 block font-plus-jakarta text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Credit Amount (SEK){" "}
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <CircleDollarSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

                  <input
                    id="creditAmount"
                    type="number"
                    name="creditAmount"
                    value={form.creditAmount || ""}
                    onChange={handleChange}
                    placeholder="0.00"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Settlement Date */}
              <div>
                <label
                  htmlFor="settlementDate"
                  className="mb-2 block font-plus-jakarta text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Settlement Date{" "}
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

                  <input
                    id="settlementDate"
                    type="date"
                    name="settlementDate"
                    value={form.settlementDate || ""}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Credit Status Info */}
        {form.creditMarking === "yes" && (
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50/70 p-4 dark:border-amber-500/20 dark:bg-amber-500/10">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-500/10">
              <ShieldCheck className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>

            <div>
              <p className="font-plus-jakarta text-xs font-bold text-amber-800 dark:text-amber-300">
                Credit information required
              </p>

              <p className="mt-0.5 font-plus-jakarta text-[10px] font-medium leading-5 text-amber-700 dark:text-amber-400">
                Please provide the creditor, credit amount and settlement
                date before completing the agreement.
              </p>
            </div>
          </div>
        )}

        {/* Notes */}
        <div className="mt-5">
          <label
            htmlFor="notes"
            className="mb-2 block font-plus-jakarta text-xs font-bold text-slate-700 dark:text-slate-300"
          >
            Notes
          </label>

          <div className="relative">
            <NotebookPen className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400 dark:text-slate-500" />

            <textarea
              id="notes"
              name="notes"
              value={form.notes || ""}
              onChange={handleChange}
              placeholder="Add any additional notes..."
              className="min-h-[120px] w-full resize-y rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 font-plus-jakarta text-xs font-medium text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#101D31] dark:text-white dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:border-blue-500 dark:focus:bg-[#101D31]"
            />
          </div>
        </div>

        {/* Required fields hint */}
        <div className="mt-5 flex items-center gap-2">
          <span className="text-xs font-bold text-red-500">*</span>

          <p className="font-plus-jakarta text-[10px] font-medium text-slate-400 dark:text-slate-500">
            Required fields
          </p>
        </div>
      </div>
    </section>
  );
};

export default AgencyInformation;