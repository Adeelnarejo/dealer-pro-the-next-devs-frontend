import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  CreditCard,
  FileText,
  RefreshCw,
  Building2,
} from "lucide-react";

import { makeGetRequest } from "../../../api/Api";

interface Invoice {
  id: string;
  invoiceNumber: string;
  receiptNumber: string;
  agreementID: string;
  amount: number;
  updatedAt: string;
  orgNumber: string;
}

const RecentReceipts = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const fetchInvoices = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await makeGetRequest(
        "invoices/getAllInvoices"
      );

      if (response.data?.success) {
        const data = Array.isArray(response.data.invoices)
          ? response.data.invoices
          : [];

        const sortedInvoices = [...data]
          .sort(
            (a: Invoice, b: Invoice) =>
              new Date(b.updatedAt).getTime() -
              new Date(a.updatedAt).getTime()
          )
          .slice(0, 5);

        setInvoices(sortedInvoices);
      } else {
        setError(
          response.data?.message ||
            "Failed to fetch receipts"
        );
      }
    } catch (err: any) {
      console.error("Recent receipts error:", err);

      setError(
        err?.message ||
          "An error occurred while fetching receipts"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
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

  const formatAmount = (amount: number) => {
    return Number(amount || 0).toLocaleString("en-US");
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-[#0B1628]">
      {/* Top accent */}
      <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400" />

      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 dark:bg-violet-500/10">
            <CreditCard className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-base">
                Recent Receipts
              </h2>

              <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                Latest
              </span>
            </div>

            <p className="mt-0.5 text-[10px] font-medium text-slate-400 dark:text-slate-500">
              Recently generated payment receipts
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/invoices")}
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
                Receipt
              </th>

              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Organization
              </th>

              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Amount
              </th>

              <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Updated
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {/* Loading */}
            {isLoading &&
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
                    <div className="h-3 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  </td>

                  <td className="px-4 py-4">
                    <div className="h-3 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  </td>

                  <td className="px-5 py-4">
                    <div className="ml-auto h-3 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  </td>
                </tr>
              ))}

            {/* Error */}
            {!isLoading && error && (
              <tr>
                <td colSpan={4} className="px-5 py-10">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 dark:bg-red-500/10">
                      <CircleAlert className="h-5 w-5 text-red-500 dark:text-red-400" />
                    </div>

                    <p className="mt-3 text-sm font-bold text-slate-800 dark:text-white">
                      Unable to load receipts
                    </p>

                    <p className="mt-1 max-w-sm text-xs text-slate-400 dark:text-slate-500">
                      {error}
                    </p>

                    <button
                      type="button"
                      onClick={fetchInvoices}
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
            {!isLoading &&
              !error &&
              invoices.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-12">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                        <FileText className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                      </div>

                      <p className="mt-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                        No receipts found
                      </p>

                      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                        Your recent receipts will appear here.
                      </p>
                    </div>
                  </td>
                </tr>
              )}

            {/* Data */}
            {!isLoading &&
              !error &&
              invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="group/row transition-colors duration-200 hover:bg-slate-50/80 dark:hover:bg-slate-800/30"
                >
                  {/* Receipt */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-500/10">
                        <FileText className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-slate-800 dark:text-white">
                          {invoice.receiptNumber ||
                            invoice.invoiceNumber ||
                            "N/A"}
                        </p>

                        <div className="mt-0.5 flex items-center gap-1.5">
                          <span className="text-[9px] font-medium text-slate-400 dark:text-slate-500">
                            {invoice.invoiceNumber
                              ? `Invoice ${invoice.invoiceNumber}`
                              : `Receipt ${invoice.id}`}
                          </span>

                          <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />

                          <span className="text-[9px] font-medium text-emerald-500">
                            Paid
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Organization */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                        <Building2 className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
                      </div>

                      <span className="max-w-[180px] truncate text-xs font-semibold text-slate-600 dark:text-slate-300">
                        {invoice.orgNumber || "N/A"}
                      </span>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-500/10">
                        <CreditCard className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      </div>

                      <div>
                        <p className="text-xs font-extrabold text-slate-800 dark:text-white">
                          SEK {formatAmount(invoice.amount)}
                        </p>

                        <p className="text-[9px] font-medium text-slate-400 dark:text-slate-500">
                          Total amount
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Updated */}
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <CheckCircle2 className="hidden h-3.5 w-3.5 text-emerald-500 sm:block" />

                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="h-3 w-3 text-slate-400 dark:text-slate-500" />

                        <span className="whitespace-nowrap text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                          {formatDate(invoice.updatedAt)}
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
      {!isLoading && !error && invoices.length > 0 && (
        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />

            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
              Showing {invoices.length} recent{" "}
              {invoices.length === 1
                ? "receipt"
                : "receipts"}
            </span>
          </div>

          <button
            type="button"
            onClick={() => navigate("/invoices")}
            className="cursor-pointer text-[10px] font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Manage receipts →
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

export default RecentReceipts;