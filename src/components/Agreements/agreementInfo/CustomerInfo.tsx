import React from "react";
import {
  Banknote,
  Building2,
  CheckCircle2,
  CreditCard,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export default function CustomerInfo({
  agreementData,
}: {
  agreementData: any;
}) {
  const data = agreementData?.dataValues || {};

  const customerType =
    agreementData?.customerType || data?.customerType;

  const isCompany = customerType === "company";

  const customerName = data?.name || "N/A";

  const customerNumber = isCompany
    ? data?.organizationNumber || "N/A"
    : data?.socialSecurityNumber || "N/A";

  const pep =
    data?.pep !== null && data?.pep !== undefined
      ? data.pep
        ? "Yes"
        : "No"
      : "N/A";

  const address = data?.address || "N/A";
  const postalCode = agreementData?.postalCode || "N/A";
  const city = agreementData?.city || "N/A";
  const verification = data?.verification || "N/A";

  const bank = data?.bank || "N/A";
  const accountNumber = data?.accountNumber || "N/A";
  const email = data?.email || "N/A";
  const phone = data?.phone || "N/A";

  const showBank = agreementData?.type !== "Sales Agreement";

  return (
    <section className="mt-1 w-full overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-[#101D31]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-3 py-2 dark:border-slate-700 dark:bg-[#0B1628]">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            {isCompany ? (
              <Building2 className="h-3.5 w-3.5" />
            ) : (
              <UserRound className="h-3.5 w-3.5" />
            )}
          </div>

          <div>
            <h3 className="text-[10px] font-extrabold text-slate-800 dark:text-white">
              Customer Information
            </h3>

            <p className="text-[8px] font-medium text-slate-400 dark:text-slate-500">
              Customer identity and contact details
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 dark:border-emerald-500/20 dark:bg-emerald-500/10">
          <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />

          <span className="text-[7px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
            Customer
          </span>
        </div>
      </div>

      {/* Identity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <InfoCell
          icon={
            isCompany ? (
              <Building2 className="h-3 w-3" />
            ) : (
              <UserRound className="h-3 w-3" />
            )
          }
          label="Name"
          value={customerName}
        />

        <InfoCell
          icon={<UserRound className="h-3 w-3" />}
          label="Customer Type"
          value={isCompany ? "Company" : "Private Individual"}
        />

        <InfoCell
          icon={<ShieldCheck className="h-3 w-3" />}
          label="PEP"
          value={pep}
          status={pep === "Yes" ? "warning" : "normal"}
        />

        <InfoCell
          icon={<CreditCard className="h-3 w-3" />}
          label={
            isCompany
              ? "Organization Number"
              : "Personal Number"
          }
          value={customerNumber}
        />
      </div>

      {/* Address */}
      <div className="grid grid-cols-1 border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-4 dark:border-slate-700">
        <InfoCell
          icon={<MapPin className="h-3 w-3" />}
          label="Address"
          value={address}
          muted
        />

        <InfoCell
          icon={<MapPin className="h-3 w-3" />}
          label="Postal Code"
          value={postalCode}
          muted
        />

        <InfoCell
          icon={<MapPin className="h-3 w-3" />}
          label="City"
          value={city}
          muted
        />

        <InfoCell
          icon={<ShieldCheck className="h-3 w-3" />}
          label="Verification"
          value={verification}
          muted
        />
      </div>

      {/* Payment / Contact */}
      <div className="grid grid-cols-1 border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-4 dark:border-slate-700">
        {showBank && (
          <InfoCell
            icon={<Banknote className="h-3 w-3" />}
            label="Bank"
            value={bank}
          />
        )}

        <InfoCell
          icon={<CreditCard className="h-3 w-3" />}
          label="Account Number"
          value={accountNumber}
          muted={!showBank}
        />

        <InfoCell
          icon={<Mail className="h-3 w-3" />}
          label="Email"
          value={email}
          muted={!showBank}
        />

        <InfoCell
          icon={<Phone className="h-3 w-3" />}
          label="Phone"
          value={phone}
          muted={!showBank}
        />
      </div>
    </section>
  );
}

/* =========================================================
   Information Cell
========================================================= */

function InfoCell({
  icon,
  label,
  value,
  muted = false,
  status = "normal",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  muted?: boolean;
  status?: "normal" | "warning";
}) {
  const valueClass =
    status === "warning"
      ? "text-amber-600 dark:text-amber-400"
      : "text-slate-700 dark:text-slate-200";

  return (
    <div
      className={`min-w-0 border-b border-slate-200 px-3 py-2.5 dark:border-slate-700 ${
        muted
          ? "bg-slate-50/70 dark:bg-[#0B1628]/60"
          : "bg-white dark:bg-[#101D31]"
      }`}
    >
      <div className="mb-1 flex items-center gap-1.5">
        <span className="text-blue-500 dark:text-blue-400">
          {icon}
        </span>

        <span className="text-[7px] font-extrabold uppercase tracking-wide text-slate-400 dark:text-slate-500">
          {label}
        </span>
      </div>

      <p
        className={`truncate text-[9px] font-semibold ${valueClass}`}
        title={value}
      >
        {value}
      </p>
    </div>
  );
}