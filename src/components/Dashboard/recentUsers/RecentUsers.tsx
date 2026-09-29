import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  CreditCard,
  RefreshCw,
  UserRound,
} from "lucide-react";

import { useRecentPayments } from "../../../hooks/useRecentUsers";

const RecentPayments = () => {
  const { payments, loading, error } = useRecentPayments();

  const formatAmount = (amount: number) => {
    return Number(amount || 0).toLocaleString("en-US");
  };

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

  const isPending = (category: string) =>
    category?.toUpperCase() === "PENDING";

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-[#0B1628]">
      {/* Top accent */}
      <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400" />

      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
            <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-base">
                Recent Payments
              </h2>

              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                Latest
              </span>
            </div>

            <p className="mt-0.5 text-[10px] font-medium text-slate-400 dark:text-slate-500">
              Latest payment activity across your dealership
            </p>
          </div>
        </div>

        <button
          type="button"
          className="group/button flex w-fit cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-bold text-blue-600 transition-all hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10"
        >
          View all
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/button:translate-x-0.5" />
        </button>
      </div>

      {/* Table */}
      <div className="scrollbar-hide max-h-[330px] overflow-x-auto overflow-y-auto">
        <table className="w-full min-w-[720px] border-collapse">
          <thead className="sticky top-0 z-10">
            <tr className="border-b border-slate-100 bg-slate-50/95 text-left backdrop-blur-sm dark:border-slate-800 dark:bg-[#101D31]/95">
              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Customer
              </th>

              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Amount
              </th>

              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Status
              </th>

              <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Payment Date
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
                        <div className="h-3 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                        <div className="h-2.5 w-20 animate-pulse rounded bg-slate-100 dark:bg-slate-800/80" />
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="h-3 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  </td>

                  <td className="px-4 py-4">
                    <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
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
                      <CircleAlert className="h-5 w-5 text-red-500 dark:text-red-400" />
                    </div>

                    <p className="mt-3 text-sm font-bold text-slate-800 dark:text-white">
                      Unable to load payments
                    </p>

                    <p className="mt-1 max-w-sm text-xs text-slate-400 dark:text-slate-500">
                      {error}
                    </p>

                    <button
                      type="button"
                      onClick={() => window.location.reload()}
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
              payments.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-12">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                        <CreditCard className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                      </div>

                      <p className="mt-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                        No payments found
                      </p>

                      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                        Recent payment activity will appear here.
                      </p>
                    </div>
                  </td>
                </tr>
              )}

            {/* Payments */}
            {!loading &&
              !error &&
              payments.map((payment) => {
                const pending = isPending(
                  payment.payment_category
                );

                return (
                  <tr
                    key={payment.id}
                    className="group/row transition-colors duration-200 hover:bg-slate-50/80 dark:hover:bg-slate-800/30"
                  >
                    {/* Customer */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                          <UserRound className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-xs font-bold text-slate-800 dark:text-white">
                            {payment.customer_name || "Unknown Customer"}
                          </p>

                          <div className="mt-0.5 flex items-center gap-1.5">
                            <span className="text-[9px] font-medium text-slate-400 dark:text-slate-500">
                              Payment #{payment.id}
                            </span>

                            <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />

                            <span
                              className={`text-[9px] font-medium ${
                                pending
                                  ? "text-amber-500"
                                  : "text-emerald-500"
                              }`}
                            >
                              {pending ? "Pending" : "Processed"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/10">
                          <CreditCard className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                        </div>

                        <div>
                          <p className="text-xs font-extrabold text-slate-800 dark:text-white">
                            SEK{" "}
                            {formatAmount(payment.total_amount)}
                          </p>

                          <p className="text-[9px] font-medium text-slate-400 dark:text-slate-500">
                            Payment amount
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-bold ${
                          pending
                            ? "border-amber-100 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400"
                            : "border-emerald-100 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            pending
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                          }`}
                        />

                        {payment.payment_category || "Completed"}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <CheckCircle2
                          className={`hidden h-3.5 w-3.5 sm:block ${
                            pending
                              ? "text-amber-500"
                              : "text-emerald-500"
                          }`}
                        />

                        <div className="flex items-center gap-1.5">
                          <CalendarDays className="h-3 w-3 text-slate-400 dark:text-slate-500" />

                          <span className="whitespace-nowrap text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                            {formatDate(payment.createdAt)}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {!loading && !error && payments.length > 0 && (
        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />

            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
              Showing {payments.length} recent{" "}
              {payments.length === 1
                ? "payment"
                : "payments"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500">
            <span>Payment activity</span>
            <span className="h-1 w-1 rounded-full bg-emerald-500" />
            <span className="text-emerald-500">Live</span>
          </div>
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

export default RecentPayments;