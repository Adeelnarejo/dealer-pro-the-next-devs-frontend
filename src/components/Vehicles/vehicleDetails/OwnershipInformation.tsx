import type { Vehicle } from "./types";
import {
  UserRound,
  CalendarDays,
  UsersRound,
  Building2,
} from "lucide-react";

interface Props {
  vehicle: Vehicle;
}

interface OwnershipItemProps {
  label: string;
  value?: string | number | null;
  icon: React.ReactNode;
}

const formatDate = (
  dateString?: string
): string => {
  if (!dateString) {
    return "Not available";
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString.split("T")[0] || "Not available";
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const OwnershipItem = ({
  label,
  value,
  icon,
}: OwnershipItemProps) => {
  const hasValue =
    value !== undefined &&
    value !== null &&
    String(value).trim() !== "";

  return (
    <div
      className="
        group rounded-xl
        border border-slate-200
        bg-white p-4
        transition-all duration-300
        hover:border-blue-200
        hover:shadow-sm
        dark:border-slate-800
        dark:bg-slate-900/70
        dark:hover:border-blue-900
      "
    >
      <div className="flex items-start gap-3">
        <div
          className="
            flex h-9 w-9 shrink-0
            items-center justify-center
            rounded-lg
            bg-blue-50
            text-[#002147]
            transition-colors duration-300
            group-hover:bg-blue-100
            dark:bg-blue-500/10
            dark:text-blue-400
            dark:group-hover:bg-blue-500/15
          "
        >
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <p
            className="
              mb-1 text-xs font-medium
              text-slate-500
              dark:text-slate-400
            "
          >
            {label}
          </p>

          <p
            className="
              break-words text-sm font-semibold
              text-slate-900
              dark:text-white
            "
          >
            {hasValue ? String(value) : "Not available"}
          </p>
        </div>
      </div>
    </div>
  );
};

const OwnershipInformation = ({
  vehicle,
}: Props) => {
  return (
    <section
      className="
        w-full overflow-hidden rounded-2xl
        border border-slate-200
        bg-white
        shadow-sm
        transition-all duration-300
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      {/* Header */}
      <div
        className="
          flex items-center gap-4
          border-b border-slate-200
          bg-slate-50
          px-5 py-4
          sm:px-6
          dark:border-slate-800
          dark:bg-slate-950/60
        "
      >
        <div
          className="
            flex h-10 w-10 shrink-0
            items-center justify-center
            rounded-xl
            bg-blue-50
            text-[#002147]
            dark:bg-blue-500/10
            dark:text-blue-400
          "
        >
          <UserRound
            size={20}
            strokeWidth={2}
          />
        </div>

        <div className="min-w-0">
          <h2
            className="
              text-base font-semibold
              text-slate-900
              sm:text-lg
              dark:text-white
            "
          >
            Ownership Information
          </h2>

          <p
            className="
              mt-0.5 text-xs text-slate-500
              sm:text-sm
              dark:text-slate-400
            "
          >
            Current ownership and acquisition details
          </p>
        </div>
      </div>

      {/* Ownership Details */}
      <div
        className="
          grid grid-cols-1 gap-3
          p-4
          sm:grid-cols-2
          sm:gap-4
          sm:p-6
        "
      >
        <OwnershipItem
          label="Current Owner"
          value={vehicle.currentOwner}
          icon={
            <UserRound size={17} />
          }
        />

        <OwnershipItem
          label="Acquisition Date"
          value={
            vehicle.acquisitionDate
              ? formatDate(
                  vehicle.acquisitionDate
                )
              : undefined
          }
          icon={
            <CalendarDays size={17} />
          }
        />

        <OwnershipItem
          label="Total Owners"
          value={vehicle.totalOwners}
          icon={
            <UsersRound size={17} />
          }
        />

        <OwnershipItem
          label="Organization Owner"
          value={vehicle.organizationOwner}
          icon={
            <Building2 size={17} />
          }
        />
      </div>
    </section>
  );
};

export default OwnershipInformation;

