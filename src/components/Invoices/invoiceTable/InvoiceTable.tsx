import React, { useEffect, useMemo, useState } from "react";
import {
  Trash2,
  Download,
  FileText,
  Mail,
  Pencil,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  X,
  Send,
  CalendarDays,
  User,
  Receipt,
  CircleDollarSign,
  Clock3,
  CheckCircle2,
  AlertCircle,
  Package,
} from "lucide-react";
import { pdf } from "@react-pdf/renderer";

import {
  ArrowLeftIcon,
  ArrowLeftDoubleIcon,
  EditAgreementIcon,
  ViewAgreementIcon,
  EnvelopeAgreementIcon,
} from "../../utils/Icons";

import DeletePopup from "../../models/DeletePopup";
import { makeGetRequest, makeDeleteRequest } from "../../../api/Api";
import toast from "react-hot-toast";
import AgreementPDF from "../../SignAgreement/AgreementPDF";

interface InvoiceItem {
  productName: string;
  quantity: number;
  price: number;
  lineTotal: number;
  description: string;
  unit?: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerType: string;
  amount: number;
  invoiceDate: string;
  dueDate: string;
  status: string;
  items: InvoiceItem[];
  net?: number;
  moms?: number;
  currency?: string;

  registrationNumber?: string;
  type?: string;
  createdAt?: string;
}

interface InvoiceFilters {
  status?: string;
  customerType?: string;
  fromDate?: string;
  toDate?: string;
  minAmount?: string;
  maxAmount?: string;
  sortBy?: "date-desc" | "date-asc" | "amount-desc" | "amount-asc";
}

interface InvoiceTableProps {
  search: string;
  expandedId: string | null;
  setExpandedId: React.Dispatch<React.SetStateAction<string | null>>;
  filters: InvoiceFilters;
  setFilteredCount: (count: number) => void;
}

/* =========================================================
   HELPERS
========================================================= */

const getStatusStyles = (status: string) => {
  switch (status?.toLowerCase()) {
    case "paid":
      return {
        wrapper:
          "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
        icon: <CheckCircle2 className="h-3.5 w-3.5" />,
      };

    case "pending":
      return {
        wrapper:
          "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
        icon: <Clock3 className="h-3.5 w-3.5" />,
      };

    case "overdue":
      return {
        wrapper:
          "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
        icon: <AlertCircle className="h-3.5 w-3.5" />,
      };

    case "cancelled":
      return {
        wrapper:
          "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
        icon: <X className="h-3.5 w-3.5" />,
      };

    default:
      return {
        wrapper:
          "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
        icon: <Clock3 className="h-3.5 w-3.5" />,
      };
  }
};

const formatDate = (
  value: string | undefined,
  long = false
): string => {
  if (!value) return "N/A";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: long ? "long" : "short",
    day: "numeric",
  });
};

const formatAmount = (
  amount: number | undefined,
  currency?: string
): string => {
  if (typeof amount !== "number" || Number.isNaN(amount)) {
    return "N/A";
  }

  return `${currency || ""} ${amount.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`.trim();
};

/* =========================================================
   EMAIL MODAL
========================================================= */

interface EmailModalProps {
  open: boolean;
  onClose: () => void;
  onSend: (email: string) => void;
  invoiceNumber?: string;
}

const EmailModal: React.FC<EmailModalProps> = ({
  open,
  onClose,
  onSend,
  invoiceNumber,
}) => {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!open) {
      setEmail("");
      setIsSending(false);
    }
  }, [open]);

  if (!open) return null;

  const handleSend = async () => {
    if (!email.trim()) {
      toast.error("Please enter an email address.");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSending(true);

    try {
      await onSend(email.trim());
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <Mail className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Email Invoice
              </h2>

              {invoiceNumber && (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {invoiceNumber}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
            Recipient email
          </label>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              placeholder="customer@example.com"
              autoFocus
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
            />
          </div>

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Enter the customer's email address to send this invoice.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-700 dark:bg-slate-950/40">
          <button
            type="button"
            onClick={onClose}
            disabled={isSending}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSend}
            disabled={isSending}
            className="flex items-center gap-2 rounded-xl bg-[#0A5CFF] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSending ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Invoice
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   PDF PREVIEW
========================================================= */

interface PDFPreviewProps {
  agreement: Invoice;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ agreement }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    if (!agreement) {
      toast.error("Invoice data is not available.");
      return;
    }

    try {
      setIsGenerating(true);

      toast.loading("Generating PDF...", {
        id: "pdf-generation",
      });

      const blob = await pdf(
        <AgreementPDF
          agreementData={agreement}
          agreementID={agreement.id?.toString() || "N/A"}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      const timestamp = new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/:/g, "-");

      link.download = `Invoice-${agreement.invoiceNumber || agreement.id}-${timestamp}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);

      toast.success("Invoice PDF downloaded successfully.", {
        id: "pdf-generation",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);

      toast.error("Failed to generate PDF. Please try again.", {
        id: "pdf-generation",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      {/* PDF Header */}
      <div className="flex flex-col gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-700 dark:bg-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <FileText className="h-5 w-5" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Invoice Document
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              PDF document ready to download
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#0A5CFF] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Generating...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Download PDF
            </>
          )}
        </button>
      </div>

      {/* PDF Visual */}
      <div className="p-4 sm:p-6">
        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex min-h-[210px] items-center justify-center bg-gradient-to-br from-blue-50 via-white to-slate-50 dark:from-blue-500/10 dark:via-slate-900 dark:to-slate-800">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-slate-800">
                <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>

              <p className="text-sm font-bold text-slate-800 dark:text-white">
                {agreement.invoiceNumber || `Invoice #${agreement.id}`}
              </p>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {agreement.registrationNumber || "DealerPro Invoice"}
              </p>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {agreement.type || "Invoice Document"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-slate-200 bg-white px-4 py-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
            <span>PDF Document</span>

            <span>
              Created{" "}
              {formatDate(
                agreement.createdAt || agreement.invoiceDate
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const InvoiceTable: React.FC<InvoiceTableProps> = ({
  search,
  expandedId,
  setExpandedId,
  filters,
  setFilteredCount,
}) => {
  const [page, setPage] = useState(1);
  const [deletePopupId, setDeletePopupId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [pageSize, setPageSize] = useState(10);

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailInvoice, setEmailInvoice] = useState<Invoice | null>(null);

  /* =======================================================
     FETCH INVOICES
  ======================================================= */

  const fetchInvoices = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await makeGetRequest("invoices/getAllInvoices");

      if (response.data && response.data.success) {
        setInvoices(response.data.invoices || []);
      } else {
        setError(
          response.data?.message || "Failed to fetch invoices."
        );
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching invoices.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  /* =======================================================
     FILTER + SORT
  ======================================================= */

  const sorted = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    const filtered = invoices.filter((invoice) => {
      const invoiceNumber =
        invoice.invoiceNumber?.toLowerCase() || "";

      const customerName =
        invoice.customerName?.toLowerCase() || "";

      const searchMatch =
        !searchValue ||
        invoiceNumber.includes(searchValue) ||
        customerName.includes(searchValue);

      if (!searchMatch) return false;

      if (
        filters.status &&
        invoice.status?.toLowerCase() !==
          filters.status.toLowerCase()
      ) {
        return false;
      }

      if (
        filters.customerType &&
        invoice.customerType !== filters.customerType
      ) {
        return false;
      }

      const invoiceDate = new Date(invoice.invoiceDate);

      if (filters.fromDate) {
        const fromDate = new Date(filters.fromDate);

        if (invoiceDate < fromDate) {
          return false;
        }
      }

      if (filters.toDate) {
        const toDate = new Date(filters.toDate);

        toDate.setHours(23, 59, 59, 999);

        if (invoiceDate > toDate) {
          return false;
        }
      }

      if (
        filters.minAmount &&
        invoice.amount < parseFloat(filters.minAmount)
      ) {
        return false;
      }

      if (
        filters.maxAmount &&
        invoice.amount > parseFloat(filters.maxAmount)
      ) {
        return false;
      }

      return true;
    });

    return [...filtered].sort((a, b) => {
      switch (filters.sortBy) {
        case "date-desc":
          return (
            new Date(b.invoiceDate).getTime() -
            new Date(a.invoiceDate).getTime()
          );

        case "date-asc":
          return (
            new Date(a.invoiceDate).getTime() -
            new Date(b.invoiceDate).getTime()
          );

        case "amount-desc":
          return b.amount - a.amount;

        case "amount-asc":
          return a.amount - b.amount;

        default:
          return 0;
      }
    });
  }, [invoices, search, filters]);

  useEffect(() => {
    setFilteredCount(sorted.length);
  }, [sorted.length, setFilteredCount]);

  /* =======================================================
     PAGINATION
  ======================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(sorted.length / pageSize)
  );

  const paginated = sorted.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  useEffect(() => {
    setPage(1);
  }, [pageSize, search, filters]);

  useEffect(() => {
    if ((page - 1) * pageSize >= sorted.length && page !== 1) {
      setPage(1);
    }
  }, [page, pageSize, sorted.length]);

  /* =======================================================
     DELETE
  ======================================================= */

  const handleDeleteInvoice = async () => {
    if (!deletePopupId) return;

    setIsDeleting(true);

    try {
      const response = await makeDeleteRequest(
        `invoices/delete/${deletePopupId}`
      );

      if (response.data && response.data.success) {
        setInvoices((current) =>
          current.filter(
            (invoice) =>
              invoice.id.toString() !== deletePopupId
          )
        );

        if (expandedId === deletePopupId) {
          setExpandedId(null);
        }

        toast.success("Invoice deleted successfully.");

        setDeletePopupId(null);
      } else {
        toast.error(
          response.data?.message ||
            "Failed to delete invoice."
        );
      }
    } catch (err) {
      console.error(err);

      toast.error(
        "An error occurred while deleting the invoice."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  /* =======================================================
     PDF DOWNLOAD FROM ACTION
  ======================================================= */

  const handleDownloadInvoice = async (invoice: Invoice) => {
    try {
      toast.loading("Generating invoice PDF...", {
        id: "invoice-action-pdf",
      });

      const blob = await pdf(
        <AgreementPDF
          agreementData={invoice}
          agreementID={invoice.id?.toString() || "N/A"}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `Invoice-${invoice.invoiceNumber || invoice.id}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);

      toast.success("Invoice PDF downloaded.", {
        id: "invoice-action-pdf",
      });
    } catch (error) {
      console.error(error);

      toast.error("Failed to generate invoice PDF.", {
        id: "invoice-action-pdf",
      });
    }
  };

  /* =======================================================
     EMAIL
  ======================================================= */

  const handleEmailInvoice = (invoice: Invoice) => {
    setEmailInvoice(invoice);
    setShowEmailModal(true);
  };

  const handleSendEmail = async (email: string) => {
    /*
      Your original implementation only displayed an alert.
      Keep the same behavior here because no email API endpoint
      was provided in the existing InvoiceTable.
    */

    if (!email) return;

    alert(
      `Email sent to ${email}\n\nInvoice: ${
        emailInvoice?.invoiceNumber || "N/A"
      }`
    );

    setShowEmailModal(false);
    setEmailInvoice(null);
  };

  /* =======================================================
     EXPAND
  ======================================================= */

  const handleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  /* =======================================================
     PAGE SIZE
  ======================================================= */

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPageSize(Number(event.target.value));
  };

  /* =======================================================
     PAGINATION NUMBERS
  ======================================================= */

  const pageNumbers = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    if (page <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (page >= totalPages - 2) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [page - 2, page - 1, page, page + 1, page + 2];
  }, [page, totalPages]);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      {/* Delete Modal */}
      {deletePopupId !== null && (
        <DeletePopup
          entityName="Invoice"
          onCancel={() => setDeletePopupId(null)}
          onDelete={handleDeleteInvoice}
          isDeleting={isDeleting}
        />
      )}

      {/* Email Modal */}
      <EmailModal
        open={showEmailModal}
        onClose={() => {
          setShowEmailModal(false);
          setEmailInvoice(null);
        }}
        onSend={handleSendEmail}
        invoiceNumber={emailInvoice?.invoiceNumber}
      />

      {/* ===================================================
          TABLE CONTAINER
      =================================================== */}

      <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="max-h-[560px] overflow-auto">
          <table className="min-w-[1000px] w-full">
            {/* =================================================
                HEADER
            ================================================= */}

            <thead className="sticky top-0 z-20 bg-slate-50 dark:bg-slate-800">
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="w-[220px] px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Type
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Invoice Number
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Customer
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Amount
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Issue Date
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Due Date
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>

            {/* =================================================
                BODY
            ================================================= */}

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {/* Loading */}
              {isLoading ? (
                <>
                  {[...Array(6)].map((_, index) => (
                    <tr key={index}>
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
                          <div className="h-4 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                        </div>
                      </td>

                      {[...Array(6)].map((__, cellIndex) => (
                        <td key={cellIndex} className="px-5 py-5">
                          <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              ) : error ? (
                /* Error */
                <tr>
                  <td colSpan={7} className="px-6 py-16">
                    <div className="mx-auto flex max-w-md flex-col items-center text-center">
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400">
                        <AlertCircle className="h-7 w-7" />
                      </div>

                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Unable to load invoices
                      </h3>

                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {error}
                      </p>

                      <button
                        type="button"
                        onClick={fetchInvoices}
                        className="mt-5 rounded-xl bg-[#0A5CFF] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        Try Again
                      </button>
                    </div>
                  </td>
                </tr>
              ) : sorted.length === 0 ? (
                /* Empty */
                <tr>
                  <td colSpan={7} className="px-6 py-16">
                    <div className="mx-auto flex max-w-md flex-col items-center text-center">
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                        <Receipt className="h-7 w-7" />
                      </div>

                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        No invoices found
                      </h3>

                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Try changing your search or filter criteria.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                /* Data */
                paginated.map((invoice) => {
                  const isExpanded = expandedId === invoice.id;

                  const isInvoice =
                    invoice.invoiceNumber
                      ?.toUpperCase()
                      .startsWith("INV");

                  const status = getStatusStyles(invoice.status);

                  return (
                    <React.Fragment key={invoice.id}>
                      {/* =================================================
                          MAIN ROW
                      ================================================= */}

                      <tr
                        className={`group transition-colors ${
                          isExpanded
                            ? "bg-blue-50/40 dark:bg-blue-500/[0.04]"
                            : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        }`}
                      >
                        {/* Type */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() =>
                                handleExpand(invoice.id)
                              }
                              aria-label={
                                isExpanded
                                  ? "Collapse invoice"
                                  : "Expand invoice"
                              }
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition ${
                                isExpanded
                                  ? "border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400"
                                  : "border-slate-200 bg-white text-slate-400 hover:border-blue-200 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500 dark:hover:border-blue-500/30 dark:hover:text-blue-400"
                              }`}
                            >
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </button>

                            <div className="flex items-center gap-2">
                              <div
                                className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                                  isInvoice
                                    ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                                    : "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"
                                }`}
                              >
                                <Receipt className="h-4 w-4" />
                              </div>

                              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                {isInvoice ? "Invoice" : "Receipt"}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Invoice Number */}
                        <td className="px-5 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900 dark:text-white">
                              {invoice.invoiceNumber || "N/A"}
                            </span>

                            <span className="mt-0.5 text-xs text-slate-400">
                              ID #{invoice.id}
                            </span>
                          </div>
                        </td>

                        {/* Customer */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                              <User className="h-4 w-4" />
                            </div>

                            <div className="min-w-0">
                              <p className="max-w-[180px] truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
                                {invoice.customerName || "N/A"}
                              </p>

                              <p className="mt-0.5 text-xs text-slate-400">
                                {invoice.customerType || "Customer"}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Amount */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <CircleDollarSign className="h-4 w-4 text-blue-500" />

                            <span className="text-sm font-bold text-slate-900 dark:text-white">
                              {formatAmount(
                                invoice.amount,
                                invoice.currency
                              )}
                            </span>
                          </div>
                        </td>

                        {/* Issue Date */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                            <CalendarDays className="h-4 w-4 text-slate-400" />
                            {formatDate(invoice.invoiceDate)}
                          </div>
                        </td>

                        {/* Due Date */}
                        <td className="px-5 py-4">
                          <div className="flex flex-col gap-1">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              {formatDate(invoice.dueDate)}
                            </span>

                            <span
                              className={`inline-flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${status.wrapper}`}
                            >
                              {status.icon}
                              {invoice.status || "Unknown"}
                            </span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4">
                          <button
                            type="button"
                            onClick={() =>
                              setDeletePopupId(
                                invoice.id.toString()
                              )
                            }
                            title="Delete invoice"
                            className="rounded-xl p-2.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>

                      {/* =================================================
                          EXPANDED ROW
                      ================================================= */}

                      {isExpanded && (
                        <tr>
                          <td
                            colSpan={7}
                            className="bg-slate-50/70 px-0 dark:bg-slate-950/30"
                          >
                            <div className="border-t border-blue-100 p-4 sm:p-6 dark:border-blue-500/10">
                              <div className="mx-auto max-w-[1400px] space-y-6">
                                {/* =================================================
                                    DETAILS CARD
                                ================================================= */}

                                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
                                  <div className="flex flex-col gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-700 dark:bg-slate-800/60">
                                    <div>
                                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                        Invoice Details
                                      </h3>

                                      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                        Complete invoice information
                                      </p>
                                    </div>

                                    <span
                                      className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${status.wrapper}`}
                                    >
                                      {status.icon}
                                      {invoice.status || "Unknown"}
                                    </span>
                                  </div>

                                  <div className="grid grid-cols-1 gap-px bg-slate-100 sm:grid-cols-2 lg:grid-cols-4 dark:bg-slate-800">
                                    {/* Invoice Number */}
                                    <div className="bg-white p-5 dark:bg-slate-900">
                                      <p className="mb-1 text-xs font-medium text-slate-400">
                                        Invoice Number
                                      </p>

                                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                                        {invoice.invoiceNumber ||
                                          "N/A"}
                                      </p>
                                    </div>

                                    {/* Customer */}
                                    <div className="bg-white p-5 dark:bg-slate-900">
                                      <p className="mb-1 text-xs font-medium text-slate-400">
                                        Customer
                                      </p>

                                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                                        {invoice.customerName ||
                                          "N/A"}
                                      </p>
                                    </div>

                                    {/* Net */}
                                    <div className="bg-white p-5 dark:bg-slate-900">
                                      <p className="mb-1 text-xs font-medium text-slate-400">
                                        Net Amount
                                      </p>

                                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                                        {formatAmount(
                                          invoice.net,
                                          invoice.currency
                                        )}
                                      </p>
                                    </div>

                                    {/* Tax */}
                                    <div className="bg-white p-5 dark:bg-slate-900">
                                      <p className="mb-1 text-xs font-medium text-slate-400">
                                        Tax
                                      </p>

                                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                                        {formatAmount(
                                          invoice.moms,
                                          invoice.currency
                                        )}
                                      </p>
                                    </div>

                                    {/* Total */}
                                    <div className="bg-white p-5 dark:bg-slate-900">
                                      <p className="mb-1 text-xs font-medium text-slate-400">
                                        Total Amount
                                      </p>

                                      <p className="text-base font-extrabold text-blue-600 dark:text-blue-400">
                                        {formatAmount(
                                          invoice.amount,
                                          invoice.currency
                                        )}
                                      </p>
                                    </div>

                                    {/* Customer Type */}
                                    <div className="bg-white p-5 dark:bg-slate-900">
                                      <p className="mb-1 text-xs font-medium text-slate-400">
                                        Customer Type
                                      </p>

                                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                                        {invoice.customerType ||
                                          "N/A"}
                                      </p>
                                    </div>

                                    {/* Issue Date */}
                                    <div className="bg-white p-5 dark:bg-slate-900">
                                      <p className="mb-1 text-xs font-medium text-slate-400">
                                        Issue Date
                                      </p>

                                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                                        {formatDate(
                                          invoice.invoiceDate,
                                          true
                                        )}
                                      </p>
                                    </div>

                                    {/* Due Date */}
                                    <div className="bg-white p-5 dark:bg-slate-900">
                                      <p className="mb-1 text-xs font-medium text-slate-400">
                                        Due Date
                                      </p>

                                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                                        {formatDate(
                                          invoice.dueDate,
                                          true
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* =================================================
                                    ITEMS
                                ================================================= */}

                                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
                                  <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4 dark:border-slate-700">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                      <Package className="h-4 w-4" />
                                    </div>

                                    <div>
                                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                        Invoice Items
                                      </h3>

                                      <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Products and services included
                                      </p>
                                    </div>
                                  </div>

                                  <div className="overflow-x-auto">
                                    <table className="min-w-[700px] w-full">
                                      <thead>
                                        <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
                                          <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                            Product
                                          </th>

                                          <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                            Quantity
                                          </th>

                                          <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                            Unit Price
                                          </th>

                                          <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                            Total
                                          </th>
                                        </tr>
                                      </thead>

                                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {invoice.items &&
                                        invoice.items.length > 0 ? (
                                          invoice.items.map(
                                            (item, index) => (
                                              <tr
                                                key={index}
                                                className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
                                              >
                                                <td className="px-5 py-4">
                                                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                                    {item.productName ||
                                                      "N/A"}
                                                  </p>

                                                  {item.description && (
                                                    <p className="mt-1 max-w-md text-xs text-slate-400">
                                                      {
                                                        item.description
                                                      }
                                                    </p>
                                                  )}
                                                </td>

                                                <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                                                  {item.quantity || 0}{" "}
                                                  {item.unit || ""}
                                                </td>

                                                <td className="px-5 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                                                  {formatAmount(
                                                    item.price,
                                                    invoice.currency
                                                  )}
                                                </td>

                                                <td className="px-5 py-4 text-sm font-bold text-slate-900 dark:text-white">
                                                  {formatAmount(
                                                    item.lineTotal,
                                                    invoice.currency
                                                  )}
                                                </td>
                                              </tr>
                                            )
                                          )
                                        ) : (
                                          <tr>
                                            <td
                                              colSpan={4}
                                              className="px-5 py-10 text-center text-sm text-slate-500"
                                            >
                                              No invoice items available.
                                            </td>
                                          </tr>
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>

                                {/* =================================================
                                    DOCUMENT
                                ================================================= */}

                                <PDFPreview agreement={invoice} />

                                {/* =================================================
                                    ACTIONS
                                ================================================= */}

                                <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end dark:border-slate-700">
                                  {/* Edit */}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      toast("Edit functionality is not connected yet.")
                                    }
                                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                                  >
                                    <EditAgreementIcon />
                                    Edit
                                  </button>

                                  {/* Download */}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDownloadInvoice(invoice)
                                    }
                                    className="flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
                                  >
                                    <Download className="h-4 w-4" />
                                    Download
                                  </button>

                                  {/* Email */}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleEmailInvoice(invoice)
                                    }
                                    className="flex items-center justify-center gap-2 rounded-xl bg-[#0A5CFF] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700"
                                  >
                                    <Mail className="h-4 w-4" />
                                    Email Invoice
                                  </button>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* =====================================================
          PAGINATION
      ===================================================== */}

      {!isLoading && !error && sorted.length > 0 && (
        <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-700 dark:bg-slate-900">
          {/* Results */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span>Show</span>

            <select
              value={pageSize}
              onChange={handlePageSizeChange}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>

            <span>
              of{" "}
              <strong className="text-slate-800 dark:text-slate-200">
                {sorted.length}
              </strong>{" "}
              invoices
            </span>
          </div>

          {/* Pages */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() =>
                setPage((current) =>
                  Math.max(1, current - 1)
                )
              }
              disabled={page === 1}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setPage(pageNumber)}
                className={`flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm font-semibold transition ${
                  page === pageNumber
                    ? "border-[#0A5CFF] bg-[#0A5CFF] text-white shadow-md shadow-blue-500/20"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {pageNumber}
              </button>
            ))}

            <button
              type="button"
              onClick={() =>
                setPage((current) =>
                  Math.min(totalPages, current + 1)
                )
              }
              disabled={page === totalPages}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InvoiceTable;