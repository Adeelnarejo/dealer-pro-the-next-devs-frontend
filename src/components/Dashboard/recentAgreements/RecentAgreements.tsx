import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  FileText,
  RefreshCw,
  UserRound,
  CarFront,
  AlertCircle,
} from "lucide-react";

import { makeGetRequest } from "../../../api/Api";

interface Agreement {
  id: number;
  registrationNumber: string;
  name: string;
  purchaseDate: string;
  updatedAt: string;
  creditMarking: string;
}

const RecentAgreements = () => {
  const [agreements, setAgreements] = useState<Agreement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const fetchRecentAgreements = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await makeGetRequest(
        "agreements/getAllAgreements"
      );

      if (response.data?.success) {
        const data = Array.isArray(response.data.data)
          ? response.data.data
          : [];

        const recentAgreements = [...data]
          .sort(
            (a: Agreement, b: Agreement) =>
              new Date(b.updatedAt).getTime() -
              new Date(a.updatedAt).getTime()
          )
          .slice(0, 5);

        setAgreements(recentAgreements);
      } else {
        throw new Error(
          response.data?.message ||
            "Failed to fetch agreements"
        );
      }
    } catch (err: any) {
      console.error("Recent agreements error:", err);

      setError(
        err?.message ||
          "An error occurred while fetching agreements"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentAgreements();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) return "N/A";

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-[#0B1628]">
      {/* Top accent */}
      <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400" />

      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-base">
                Recent Agreements
              </h2>

              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                Latest
              </span>
            </div>

            <p className="mt-0.5 text-[10px] font-medium text-slate-400 dark:text-slate-500">
              Recently updated dealership agreements
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/agreements")}
          className="group/button flex w-fit cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-bold text-blue-600 transition-all hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10"
        >
          View all
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/button:translate-x-0.5" />
        </button>
      </div>

      {/* Table */}
      <div className="scrollbar-hide max-h-[330px] overflow-x-auto overflow-y-auto">
        <table className="w-full min-w-[700px] border-collapse">
          <thead className="sticky top-0 z-10">
            <tr className="border-b border-slate-100 bg-slate-50/95 text-left backdrop-blur-sm dark:border-slate-800 dark:bg-[#101D31]/95">
              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Agreement
              </th>

              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Customer
              </th>

              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Vehicle
              </th>

              <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Updated
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {/* Loading */}
            {loading &&
              [...Array(5)].map((_, index) => (
                <tr key={index}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

                      <div className="space-y-2">
                        <div className="h-3 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                        <div className="h-2.5 w-20 animate-pulse rounded bg-slate-100 dark:bg-slate-800/80" />
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="h-3 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  </td>

                  <td className="px-4 py-4">
                    <div className="h-3 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  </td>

                  <td className="px-5 py-4">
                    <div className="ml-auto h-3 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  </td>
                </tr>
              ))}

            {/* Error */}
            {!loading && error && (
              <tr>
                <td colSpan={4} className="px-5 py-10">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 dark:bg-red-500/10">
                      <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
                    </div>

                    <p className="mt-3 text-sm font-bold text-slate-800 dark:text-white">
                      Unable to load agreements
                    </p>

                    <p className="mt-1 max-w-sm text-xs text-slate-400 dark:text-slate-500">
                      {error}
                    </p>

                    <button
                      type="button"
                      onClick={fetchRecentAgreements}
                      className="mt-4 flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-blue-700"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Try again
                    </button>
                  </div>
                </td>
              </tr>
            )}

            {/* Empty */}
            {!loading &&
              !error &&
              agreements.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-12">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                        <FileText className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                      </div>

                      <p className="mt-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                        No agreements found
                      </p>

                      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                        Your recent agreements will appear here.
                      </p>
                    </div>
                  </td>
                </tr>
              )}

            {/* Data */}
            {!loading &&
              !error &&
              agreements.map((agreement) => (
                <tr
                  key={agreement.id}
                  className="group/row transition-colors duration-200 hover:bg-slate-50/80 dark:hover:bg-slate-800/30"
                >
                  {/* Agreement */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/10">
                        <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-slate-800 dark:text-white">
                          {agreement.registrationNumber ||
                            `AG-${agreement.id}`}
                        </p>

                        <div className="mt-0.5 flex items-center gap-1.5">
                          <span className="text-[9px] font-medium text-slate-400 dark:text-slate-500">
                            AG-{agreement.id}
                          </span>

                          <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />

                          <span className="text-[9px] font-medium text-emerald-500">
                            Active
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Customer */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                        <UserRound className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
                      </div>

                      <span className="max-w-[160px] truncate text-xs font-semibold text-slate-600 dark:text-slate-300">
                        {agreement.name || "N/A"}
                      </span>
                    </div>
                  </td>

                  {/* Vehicle */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                        <CarFront className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
                      </div>

                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                        {agreement.registrationNumber || "N/A"}
                      </span>
                    </div>
                  </td>

                  {/* Updated */}
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="hidden sm:block">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="h-3 w-3 text-slate-400 dark:text-slate-500" />

                        <span className="whitespace-nowrap text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                          {formatDate(agreement.updatedAt)}
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {!loading && !error && agreements.length > 0 && (
        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />

            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
              Showing {agreements.length} recent{" "}
              {agreements.length === 1
                ? "agreement"
                : "agreements"}
            </span>
          </div>

          <button
            type="button"
            onClick={() => navigate("/agreements")}
            className="cursor-pointer text-[10px] font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Manage agreements →
          </button>
        </div>
      )}

      {/* Hidden scrollbar */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
      `}</style>
    </div>
  );
};

export default RecentAgreements;