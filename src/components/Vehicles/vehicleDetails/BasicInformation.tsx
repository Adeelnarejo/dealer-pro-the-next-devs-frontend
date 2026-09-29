import {
  CarFront,
  Palette,
  Tag,
  CalendarDays,
  CircleDot,
  Hash,
  Clock3,
  Layers3,
} from "lucide-react";

import type { Vehicle } from "./types";

interface Props {
  vehicle: Vehicle;
}

const BasicInformation = ({ vehicle }: Props) => {
  const statusStyles: Record<string, string> = {
    Available:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",

    "Sold Out":
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",

    Sold: "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",

    Reserved:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
  };

  const getValue = (value: unknown) => {
    if (value === null || value === undefined || value === "") {
      return "Not available";
    }

    return String(value);
  };

  const informationItems = [
    {
      label: "Model",
      value: getValue(vehicle.model),
      icon: CarFront,
    },
    {
      label: "Year",
      value: getValue(vehicle.year),
      icon: CalendarDays,
    },
    {
      label: "Type",
      value: getValue(vehicle.type),
      icon: Layers3,
    },
    {
      label: "Category",
      value: getValue(vehicle.category),
      icon: Tag,
    },
    {
      label: "Color",
      value: getValue(vehicle.color),
      icon: Palette,
    },
    {
      label: "Chassis Number",
      value: getValue(vehicle.chassisNumber),
      icon: Hash,
    },
    {
      label: "Days in Stock",
      value: getValue(vehicle.daysInStock),
      icon: Clock3,
    },
  ];

  const status = vehicle.status || "Not available";

  return (
    <section className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-4 py-4 sm:px-6 dark:border-slate-800 dark:from-slate-900 dark:to-slate-900">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <CarFront className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h2 className="text-base font-semibold text-slate-900 sm:text-lg dark:text-white">
              Basic Information
            </h2>

            <p className="mt-0.5 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
              Core vehicle details and inventory status
            </p>
          </div>
        </div>
      </div>

      {/* Information Grid */}
      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:gap-4 sm:p-6">
        {informationItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="group rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/30 dark:border-slate-800 dark:bg-slate-950/30 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/5"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm transition-colors group-hover:text-blue-600 dark:bg-slate-900 dark:text-slate-400 dark:group-hover:text-blue-400">
                  <Icon className="h-4 w-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {item.label}
                  </p>

                  <p className="mt-1.5 break-words text-sm font-semibold text-slate-900 dark:text-white">
                    {item.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Status */}
        <div className="group rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/30 dark:border-slate-800 dark:bg-slate-950/30 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm transition-colors group-hover:text-blue-600 dark:bg-slate-900 dark:text-slate-400 dark:group-hover:text-blue-400">
              <CircleDot className="h-4 w-4" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Status
              </p>

              <div className="mt-2">
                <span
                  className={`inline-flex max-w-full items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[status] || "border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"}`}
                >
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                      status === "Available"
                        ? "bg-emerald-500"
                        : status === "Sold"
                          ? "bg-red-500"
                          : status === "Sold Out"
                            ? "bg-blue-500"
                            : status === "Reserved"
                              ? "bg-amber-500"
                              : "bg-slate-400"
                    }`}
                  />

                  <span className="truncate">{status}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 bg-slate-50/70 px-4 py-3 sm:px-6 dark:border-slate-800 dark:bg-slate-950/30">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <span>Vehicle information and inventory details</span>
        </div>
      </div>
    </section>
  );
};

export default BasicInformation;