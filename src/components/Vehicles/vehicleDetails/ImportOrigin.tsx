import { Globe2, Hash, PackageCheck } from "lucide-react";
import type { Vehicle } from "./types";

interface Props {
  vehicle: Vehicle;
}

const ImportOrigin = ({ vehicle }: Props) => {
  const importId = vehicle.importID || "Not available";
  const directImport = vehicle.directImport || "Not available";

  const hasImportData =
    Boolean(vehicle.importID) || Boolean(vehicle.directImport);

  return (
    <section className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-4 py-4 sm:px-6 dark:border-slate-800 dark:from-slate-900 dark:to-slate-900">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <Globe2 className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h2 className="text-base font-semibold text-slate-900 sm:text-lg dark:text-white">
              Import & Origin
            </h2>

            <p className="mt-0.5 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
              Import identification and vehicle origin information
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      {hasImportData ? (
        <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:gap-4 sm:p-6">
          {/* Import ID */}
          <div className="group rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/30 dark:border-slate-800 dark:bg-slate-950/30 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm transition-colors group-hover:text-blue-600 dark:bg-slate-900 dark:text-slate-400 dark:group-hover:text-blue-400">
                <Hash className="h-4 w-4" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Import ID
                </p>

                <p className="mt-1.5 break-all text-sm font-semibold text-slate-900 dark:text-white">
                  {importId}
                </p>
              </div>
            </div>
          </div>

          {/* Direct Import */}
          <div className="group rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/30 dark:border-slate-800 dark:bg-slate-950/30 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm transition-colors group-hover:text-blue-600 dark:bg-slate-900 dark:text-slate-400 dark:group-hover:text-blue-400">
                <PackageCheck className="h-4 w-4" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Direct Import
                </p>

                <p className="mt-1.5 break-words text-sm font-semibold text-slate-900 dark:text-white">
                  {directImport}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="p-4 sm:p-6">
          <div className="flex min-h-[180px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/70 px-5 py-8 text-center dark:border-slate-700 dark:bg-slate-950/30">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm dark:bg-slate-900 dark:text-slate-500">
              <Globe2 className="h-5 w-5" />
            </div>

            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              No import information
            </h3>

            <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500 sm:text-sm dark:text-slate-400">
              Import origin and identification details are not available for
              this vehicle.
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      {hasImportData && (
        <div className="border-t border-slate-200 bg-slate-50/70 px-4 py-3 sm:px-6 dark:border-slate-800 dark:bg-slate-950/30">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            <span>Import and origin information for this vehicle</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default ImportOrigin;