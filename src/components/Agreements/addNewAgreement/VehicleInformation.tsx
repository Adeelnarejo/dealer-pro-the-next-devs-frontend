import React from "react";
import { useLocation } from "react-router-dom";
import {
  CalendarDays,
  CarFront,
  CheckCircle2,
  ChevronDown,
  Gauge,
  KeyRound,
  ShieldCheck,
  Sparkles,
  Sun,
  Wrench,
} from "lucide-react";

type Props = {
  form: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
};

const VehicleInformation: React.FC<Props> = ({
  form,
  handleChange,
}) => {
  const location = useLocation();

  const isSales =
    location.pathname === "/add-new-sales-agreement";

  const isPurchaseOrAgency =
    location.pathname === "/add-new-purchase-agreement" ||
    location.pathname === "/add-new-agency-agreement";

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
              <CarFront className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Vehicle Information
              </h2>

              <p className="mt-0.5 text-[11px] font-medium text-slate-400 dark:text-slate-500">
                Vehicle specifications, tyres, insurance and warranty
              </p>
            </div>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 dark:border-emerald-500/20 dark:bg-emerald-500/10">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />

            <span className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Vehicle Details
            </span>
          </div>
        </div>

        {/* Basic vehicle details */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* VAT Type */}
          <FieldWrapper
            icon={<Sparkles className="h-4 w-4" />}
            label="VAT Type"
          >
            <SelectWrapper>
              <select
                name="vatType"
                value={form.vatType || ""}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="">Select VAT type</option>
                <option value="vbm">VBM</option>
                <option value="vat">VAT</option>
              </select>
            </SelectWrapper>
          </FieldWrapper>

          {/* Mileage */}
          <FieldWrapper
            icon={<Gauge className="h-4 w-4" />}
            label="Mileage"
          >
            <div className="relative">
              <input
                type="text"
                name="mileage"
                value={form.mileage || ""}
                onChange={handleChange}
                placeholder="Vehicle mileage"
                className={`${inputClass} pr-16`}
              />

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 dark:text-slate-500">
                KM
              </span>
            </div>
          </FieldWrapper>

          {/* Latest Service - Purchase / Agency */}
          {isPurchaseOrAgency && (
            <FieldWrapper
              icon={<Wrench className="h-4 w-4" />}
              label="Latest Service"
            >
              <input
                type="date"
                name="latestServiceDate"
                value={form.latestServiceDate || ""}
                onChange={handleChange}
                className={`${inputClass} cursor-pointer`}
              />
            </FieldWrapper>
          )}

          {/* Number of Keys */}
          <FieldWrapper
            icon={<KeyRound className="h-4 w-4" />}
            label="Number of Keys"
          >
            <SelectWrapper>
              <select
                name="numberOfKeys"
                value={form.numberOfKeys || ""}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="">Select number of keys</option>
                <option value="1">1 Key</option>
                <option value="2">2 Keys</option>
                <option value="3">3 Keys</option>
                <option value="4">4 Keys</option>
                <option value="5">5 Keys</option>
              </select>
            </SelectWrapper>
          </FieldWrapper>

          {/* Tyres */}
          <FieldWrapper
            icon={<CarFront className="h-4 w-4" />}
            label="Tyres"
          >
            <SelectWrapper>
              <select
                name="deck"
                value={form.deck || ""}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="">Select tyre type</option>
                <option value="summer_tires">
                  Summer Tyres
                </option>
                <option value="winter_tire">
                  Winter Tyres
                </option>
                <option value="summer_and_winter_tire">
                  Summer & Winter Tyres
                </option>
              </select>
            </SelectWrapper>
          </FieldWrapper>
        </div>

        {/* Sales-only information */}
        {isSales && (
          <div className="mt-7">
            {/* Section divider */}
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />

              <div className="flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 dark:border-blue-500/15 dark:bg-blue-500/5">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />

                <span className="text-[9px] font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                  Sales Protection
                </span>
              </div>

              <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {/* Insurer */}
              <FieldWrapper
                icon={<ShieldCheck className="h-4 w-4" />}
                label="Insurance Provider"
              >
                <SelectWrapper>
                  <select
                    name="insurer"
                    value={form.insurer || ""}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="">
                      Select insurance provider
                    </option>

                    <option value="ingen-försäkring">
                      No Insurance
                    </option>

                    <option value="ica-försäkring">
                      ICA Insurance
                    </option>
                  </select>
                </SelectWrapper>
              </FieldWrapper>

              {/* Insurance Type */}
              <FieldWrapper
                icon={<ShieldCheck className="h-4 w-4" />}
                label="Insurance Type"
              >
                <SelectWrapper>
                  <select
                    name="insuranceType"
                    value={form.insuranceType || ""}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="">
                      Select insurance type
                    </option>

                    <option value="ingen-försäkring">
                      No Insurance
                    </option>

                    <option value="14-dagars-prova-på">
                      14-Day Trial
                    </option>
                  </select>
                </SelectWrapper>
              </FieldWrapper>

              {/* Warranty Provider */}
              <FieldWrapper
                icon={<ShieldCheck className="h-4 w-4" />}
                label="Warranty Provider"
              >
                <input
                  type="text"
                  name="warrantyProvider"
                  value={form.warrantyProvider || ""}
                  onChange={handleChange}
                  placeholder="Warranty provider"
                  className={inputClass}
                />
              </FieldWrapper>

              {/* Warranty Product */}
              <FieldWrapper
                icon={<Sparkles className="h-4 w-4" />}
                label="Warranty Product"
              >
                <input
                  type="text"
                  name="warrantyProduct"
                  value={form.warrantyProduct || ""}
                  onChange={handleChange}
                  placeholder="Warranty product"
                  className={inputClass}
                />
              </FieldWrapper>

              {/* Latest Service */}
              <FieldWrapper
                icon={<CalendarDays className="h-4 w-4" />}
                label="Latest Service"
              >
                <input
                  type="date"
                  name="latestServiceDate"
                  value={form.latestServiceDate || ""}
                  onChange={handleChange}
                  className={`${inputClass} cursor-pointer`}
                />
              </FieldWrapper>
            </div>
          </div>
        )}

        {/* Information footer */}
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3 dark:border-slate-800 dark:bg-[#101D31]/60">
          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <CarFront className="h-3.5 w-3.5" />
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
              Vehicle specification
            </p>

            <p className="mt-0.5 text-[9px] leading-5 text-slate-400 dark:text-slate-500">
              Keep the vehicle mileage, equipment, insurance and warranty
              information accurate before submitting the agreement.
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

export default VehicleInformation;