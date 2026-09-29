import {
  CalendarCheck2,
  Gauge,
  MapPin,
  ClipboardCheck,
} from "lucide-react";

import type { Vehicle } from "./types";

interface Props {
  vehicle: Vehicle;
}

const InspectionDetails = ({ vehicle }: Props) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not available";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "Not available";
    }

    return date.toISOString().split("T")[0];
  };

  const inspectionItems = [
    {
      label: "Last Inspection",
      value: formatDate(vehicle.lastInspection),
      icon: CalendarCheck2,
    },
    {
      label: "Next Inspection Due",
      value: formatDate(vehicle.nextInspectionDue),
      icon: ClipboardCheck,
    },
    {
      label: "Inspection Mileage",
      value: vehicle.inspectionMileage || "Not available",
      icon: Gauge,
    },
    {
      label: "Inspection Station",
      value: vehicle.inspectionStation || "Not available",
      icon: MapPin,
    },
  ];

  return (
    <section className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-4 py-4 sm:px-6 dark:border-slate-800 dark:from-slate-900 dark:to-slate-900">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <ClipboardCheck className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h2 className="text-base font-semibold text-slate-900 sm:text-lg dark:text-white">
              Inspection Details
            </h2>

            <p className="mt-0.5 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
              Vehicle inspection and compliance information
            </p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:gap-4 sm:p-6">
        {inspectionItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="group rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/30 dark:border-slate-800 dark:bg-slate-950/30 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/5"
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm transition-colors group-hover:text-blue-600 dark:bg-slate-900 dark:text-slate-400 dark:group-hover:text-blue-400">
                  <Icon className="h-4.5 w-4.5" />
                </div>

                {/* Content */}
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
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 bg-slate-50/70 px-4 py-3 sm:px-6 dark:border-slate-800 dark:bg-slate-950/30">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <span>Inspection information for this vehicle</span>
        </div>
      </div>
    </section>
  );
};

export default InspectionDetails;