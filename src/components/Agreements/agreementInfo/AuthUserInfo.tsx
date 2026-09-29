import React from "react";
import {
  Building2,
  Globe2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export default function AuthUserInfo({
  user,
  agreementData,
}: {
  user: any;
  agreementData: any;
}) {
  const companyName =
    user?.first || user?.last
      ? `${user?.first ?? ""} ${user?.last ?? ""}`.trim()
      : "N/A";

  const address =
    agreementData?.address ||
    user?.company_mailaddress ||
    "N/A";

  const organizationNumber =
    user?.organizationNumber || "N/A";

  const website = user?.website || "N/A";
  const postalCode = user?.postalCode || "N/A";
  const city = user?.city || "N/A";

  const sellerName =
    agreementData?.dataValues?.name || "N/A";

  const email = user?.email || "N/A";
  const phone = user?.phone || "N/A";

  return (
    <section className="mt-1 w-full overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-[#101D31]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-3 py-2 dark:border-slate-700 dark:bg-[#0B1628]">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <Building2 className="h-3.5 w-3.5" />
          </div>

          <div>
            <h3 className="text-[10px] font-extrabold text-slate-800 dark:text-white">
              Authorized Seller Information
            </h3>

            <p className="text-[8px] font-medium text-slate-400 dark:text-slate-500">
              Company and seller details
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 dark:border-emerald-500/20 dark:bg-emerald-500/10">
          <ShieldCheck className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />

          <span className="text-[7px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
            Verified
          </span>
        </div>
      </div>

      {/* Information grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3">
        <InfoCell
          icon={<Building2 className="h-3 w-3" />}
          label="Company Name"
          value={companyName}
        />

        <InfoCell
          icon={<ShieldCheck className="h-3 w-3" />}
          label="Organization Number"
          value={organizationNumber}
        />

        <InfoCell
          icon={<Globe2 className="h-3 w-3" />}
          label="Website"
          value={website}
        />

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
          icon={<UserRound className="h-3 w-3" />}
          label="Seller Name"
          value={sellerName}
        />

        <InfoCell
          icon={<Mail className="h-3 w-3" />}
          label="Email Address"
          value={email}
        />

        <InfoCell
          icon={<Phone className="h-3 w-3" />}
          label="Phone Number"
          value={phone}
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
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div
      className={`min-w-0 border-b border-slate-200 px-3 py-2.5 last:border-b-0 dark:border-slate-700 ${
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

      <p className="truncate text-[9px] font-semibold text-slate-700 dark:text-slate-200">
        {value}
      </p>
    </div>
  );
}