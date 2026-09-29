import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  FileCheck2,
  Mail,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  UserRound,
  CarFront,
  AlertCircle,
  Loader2,
} from "lucide-react";

type Props = {
  form: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  onSearch: (
    type: "VEHICLE" | "ORG" | "PERSON",
    query: string
  ) => void;
};

const BasicInformation: React.FC<Props> = ({
  form,
  handleChange,
  onSearch,
}) => {
  const location = useLocation();

  const [regInput, setRegInput] = useState("");
  const [orgOrSsn, setOrgOrSsn] = useState("");
  const [error, setError] = useState("");
  const [searchingVehicle, setSearchingVehicle] = useState(false);
  const [searchingCustomer, setSearchingCustomer] = useState(false);

  const isSalesAgreement =
    location.pathname === "/add-new-sales-agreement";

  const dateFieldName = isSalesAgreement
    ? "salesDate"
    : "purchaseDate";

  const dateLabel = isSalesAgreement
    ? "Sales Date"
    : "Purchase Date";

  const handleVehicleSearch = async () => {
    const query =
      regInput.trim() ||
      String(form.registrationNumber || "").trim();

    if (!query) {
      setError("Registration number is required");
      return;
    }

    setError("");
    setSearchingVehicle(true);

    handleChange({
      target: {
        name: "registrationNumber",
        value: query,
      },
    } as React.ChangeEvent<HTMLInputElement>);

    try {
      await onSearch("VEHICLE", query);
    } finally {
      setSearchingVehicle(false);
    }
  };

  const handleOrgOrPersonSearch = async () => {
    const query =
      orgOrSsn.trim() ||
      String(
        form.customerType === "company"
          ? form.organizationNumber || ""
          : form.socialSecurityNumber || ""
      ).trim();

    if (
      (form.customerType === "company" ||
        form.customerType === "private individual") &&
      !query
    ) {
      setError(
        form.customerType === "company"
          ? "Organization number is required"
          : "Social Security number is required"
      );
      return;
    }

    setError("");
    setSearchingCustomer(true);

    try {
      if (form.customerType === "company") {
        handleChange({
          target: {
            name: "organizationNumber",
            value: query,
          },
        } as React.ChangeEvent<HTMLInputElement>);

        await onSearch("ORG", query);
      } else if (form.customerType === "private individual") {
        handleChange({
          target: {
            name: "socialSecurityNumber",
            value: query,
          },
        } as React.ChangeEvent<HTMLInputElement>);

        await onSearch("PERSON", query);
      }
    } finally {
      setSearchingCustomer(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#101D31] dark:text-white dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:border-blue-500 dark:focus:bg-[#101D31]";

  const selectClass =
    "w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-11 text-sm font-medium text-slate-800 outline-none transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#101D31] dark:text-white dark:hover:border-slate-600 dark:focus:border-blue-500 dark:focus:bg-[#101D31]";

  const searchButtonClass =
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 text-xs font-bold text-white shadow-sm shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-800 hover:shadow-md hover:shadow-blue-600/25 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0";

  return (
    <section className="mb-5 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0B1628]">
      {/* Top accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500" />

      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <FileCheck2 className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Basic Information
              </h2>

              <p className="mt-0.5 text-[11px] font-medium text-slate-400 dark:text-slate-500">
                Enter vehicle, customer and agreement details
              </p>
            </div>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 dark:border-blue-500/20 dark:bg-blue-500/10">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />

            <span className="text-[9px] font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">
              Required Information
            </span>
          </div>
        </div>

        {/* Form grid */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Registration Number */}
          <FieldWrapper
            icon={<CarFront className="h-4 w-4" />}
            label="Registration Number"
            required
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                name="registrationNumber"
                value={form.registrationNumber || regInput}
                onChange={(e) => {
                  setRegInput(e.target.value);
                  setError("");
                  handleChange(e);
                }}
                placeholder="Enter registration number"
                className={inputClass}
              />

              <button
                type="button"
                onClick={handleVehicleSearch}
                disabled={searchingVehicle}
                className={searchButtonClass}
              >
                {searchingVehicle ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}

                {searchingVehicle ? "Searching..." : "Search"}
              </button>
            </div>

            {error &&
              !(
                form.customerType === "company" ||
                form.customerType === "private individual"
              ) && (
                <ErrorMessage message={error} />
              )}
          </FieldWrapper>

          {/* Date */}
          <FieldWrapper
            icon={<CalendarDays className="h-4 w-4" />}
            label={dateLabel}
            required
          >
            <input
              type="date"
              name={dateFieldName}
              value={
                isSalesAgreement
                  ? form.salesDate || ""
                  : form.purchaseDate || ""
              }
              onChange={handleChange}
              className={`${inputClass} cursor-pointer`}
            />
          </FieldWrapper>

          {/* Customer Type */}
          <FieldWrapper
            icon={<UserRound className="h-4 w-4" />}
            label="Customer Type"
            required
          >
            <SelectWrapper>
              <select
                name="customerType"
                value={form.customerType || ""}
                onChange={(e) => {
                  setError("");
                  setOrgOrSsn("");
                  handleChange(e);
                }}
                className={selectClass}
              >
                <option value="">Select customer type</option>
                <option value="company">Company</option>
                <option value="private individual">
                  Private Individual
                </option>
              </select>
            </SelectWrapper>
          </FieldWrapper>

          {/* Company fields */}
          {form.customerType === "company" && (
            <>
              <FieldWrapper
                icon={<Building2 className="h-4 w-4" />}
                label="Organization Number"
                required
              >
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="text"
                    name="organizationNumber"
                    value={
                      form.organizationNumber || orgOrSsn
                    }
                    onChange={(e) => {
                      setOrgOrSsn(e.target.value);
                      setError("");
                      handleChange(e);
                    }}
                    placeholder="Enter organization number"
                    className={inputClass}
                  />

                  <button
                    type="button"
                    onClick={handleOrgOrPersonSearch}
                    disabled={searchingCustomer}
                    className={searchButtonClass}
                  >
                    {searchingCustomer ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}

                    {searchingCustomer
                      ? "Searching..."
                      : "Search"}
                  </button>
                </div>

                {error && <ErrorMessage message={error} />}
              </FieldWrapper>

              <FieldWrapper
                icon={<ShieldCheck className="h-4 w-4" />}
                label="Verification"
              >
                <SelectWrapper>
                  <select
                    name="verification"
                    value={form.verification || ""}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="">
                      Select verification method
                    </option>
                    <option value="passport">Passport</option>
                    <option value="drivingLicense">
                      Driving License
                    </option>
                    <option value="digitalId">
                      Digital ID
                    </option>
                    <option value="id">ID Card</option>
                  </select>
                </SelectWrapper>
              </FieldWrapper>
            </>
          )}

          {/* Private individual fields */}
          {form.customerType === "private individual" && (
            <>
              <FieldWrapper
                icon={<UserRound className="h-4 w-4" />}
                label="Social Security Number"
                required
              >
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="text"
                    name="socialSecurityNumber"
                    value={
                      form.socialSecurityNumber || orgOrSsn
                    }
                    onChange={(e) => {
                      setOrgOrSsn(e.target.value);
                      setError("");
                      handleChange(e);
                    }}
                    placeholder="Enter social security number"
                    className={inputClass}
                  />

                  <button
                    type="button"
                    onClick={handleOrgOrPersonSearch}
                    disabled={searchingCustomer}
                    className={searchButtonClass}
                  >
                    {searchingCustomer ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}

                    {searchingCustomer
                      ? "Searching..."
                      : "Search"}
                  </button>
                </div>

                {error && <ErrorMessage message={error} />}
              </FieldWrapper>

              <FieldWrapper
                icon={<ShieldCheck className="h-4 w-4" />}
                label="PEP Status"
              >
                <SelectWrapper>
                  <select
                    name="pep"
                    value={form.pep || ""}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="">Select PEP status</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </SelectWrapper>
              </FieldWrapper>

              <FieldWrapper
                icon={<FileCheck2 className="h-4 w-4" />}
                label="Verification"
              >
                <SelectWrapper>
                  <select
                    name="verification"
                    value={form.verification || ""}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="">
                      Select verification method
                    </option>
                    <option value="passport">Passport</option>
                    <option value="drivingLicense">
                      Driving License
                    </option>
                    <option value="digitalId">
                      Digital ID
                    </option>
                    <option value="id">ID Card</option>
                  </select>
                </SelectWrapper>
              </FieldWrapper>
            </>
          )}

          {/* Email */}
          <FieldWrapper
            icon={<Mail className="h-4 w-4" />}
            label="Email Address"
          >
            <input
              type="email"
              name="email"
              value={form.email || ""}
              onChange={handleChange}
              placeholder="Enter email address"
              className={inputClass}
            />
          </FieldWrapper>

          {/* Phone */}
          <FieldWrapper
            icon={<Phone className="h-4 w-4" />}
            label="Phone Number"
          >
            <input
              type="tel"
              name="phone"
              value={form.phone || ""}
              onChange={handleChange}
              placeholder="Enter phone number"
              className={inputClass}
            />
          </FieldWrapper>
        </div>

        {/* Bottom info */}
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/60 p-4 dark:border-blue-500/15 dark:bg-blue-500/5">
          <div className="mt-0.5 shrink-0">
            <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>

          <div>
            <p className="text-[11px] font-bold text-blue-900 dark:text-blue-300">
              Information saved automatically
            </p>

            <p className="mt-1 text-[10px] leading-5 text-blue-700/70 dark:text-blue-300/60">
              Search the vehicle or customer to automatically retrieve
              available information and continue with the agreement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   Reusable Field Wrapper
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

/* =========================================================
   Error Message
========================================================= */

function ErrorMessage({
  message,
}: {
  message: string;
}) {
  return (
    <div className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold text-red-600 dark:text-red-400">
      <AlertCircle className="h-3.5 w-3.5" />
      {message}
    </div>
  );
}

export default BasicInformation;