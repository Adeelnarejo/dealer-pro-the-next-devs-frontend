import React, { useEffect, useMemo, useState } from "react";
import { Download, FileText } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import AgreementPDF from "../../SignAgreement/AgreementPDF";

import {
  TrashIcon,
  ArrowLeftIcon,
  ArrowLeftDoubleIcon,
  ArrowCollapseIcon,
  EditAgreementIcon,
  ViewAgreementIcon,
  EnvelopeAgreementIcon,
} from "../../utils/Icons";

import DeletePopup from "../../models/DeletePopup";

import {
  makeGetRequest,
  makeDeleteRequest,
} from "../../../api/Api";

import toast from "react-hot-toast";
import type { PaymentFilters } from "../../models/FilterPayments";

interface AmountItem {
  amount: number;
  description: string;
}

interface Payment {
  id: number;
  customer_reference: string;
  customer_name: string;
  payment_category: string;
  bank_id: number;
  description: string;
  email: string;
  social_security_number: string;
  telephone_number: string;
  amount_items: AmountItem[];
  total_amount: number;
  createdAt: string;
  updatedAt: string;
  status?: string;
}

interface PaymentsTableProps {
  search: string;
  expandedId: string | null;
  setExpandedId: (id: string | null) => void;
  filters: PaymentFilters;
  setFilteredCount: (count: number) => void;
}

/* =========================================================
   EMAIL MODAL
========================================================= */

const EmailModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onSend: (email: string) => void;
}> = ({ open, onClose, onSend }) => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!open) {
      setEmail("");
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/50
        backdrop-blur-sm
        p-4
      "
    >
      <div
        className="
          w-full max-w-md
          rounded-2xl
          p-6
          bg-white dark:bg-[#111827]
          border border-gray-200 dark:border-slate-700
          shadow-2xl
        "
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Send Email
        </h2>

        <p className="text-sm text-gray-500 dark:text-slate-400 mb-5">
          Enter the email address where the payment information should be sent.
        </p>

        <input
          type="email"
          className="
            w-full
            border border-gray-300 dark:border-slate-700
            bg-white dark:bg-slate-900
            text-gray-900 dark:text-white
            placeholder-gray-400 dark:placeholder-slate-500
            rounded-lg
            px-3 py-2.5
            mb-5
            outline-none
            focus:ring-2
            focus:ring-blue-500/30
            focus:border-blue-500
          "
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="
              px-4 py-2
              rounded-lg
              bg-gray-100 dark:bg-slate-800
              text-gray-700 dark:text-slate-200
              hover:bg-gray-200 dark:hover:bg-slate-700
              transition
            "
            onClick={onClose}
          >
            Close
          </button>

          <button
            type="button"
            className="
              px-4 py-2
              rounded-lg
              bg-blue-600
              text-white
              hover:bg-blue-700
              transition
            "
            onClick={() => {
              if (!email.trim()) {
                toast.error("Please enter an email address.");
                return;
              }

              onSend(email);
              onClose();
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   PDF PREVIEW
========================================================= */

const PDFPreview: React.FC<{
  agreement: Payment;
}> = ({ agreement }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    if (!agreement) {
      toast.error("Agreement data not available");
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

      link.download = `Payment-${agreement.id}-${timestamp}.pdf`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      URL.revokeObjectURL(url);

      toast.success("PDF downloaded successfully!", {
        id: "pdf-generation",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);

      toast.error(
        "Failed to generate PDF. Please try again.",
        {
          id: "pdf-generation",
        }
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div
      className="
        bg-gray-50 dark:bg-slate-900/70
        border border-gray-200 dark:border-slate-700
        rounded-xl
        p-4
      "
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />

          <span className="font-medium text-gray-800 dark:text-white">
            Payment PDF
          </span>
        </div>

        <button
          type="button"
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className="
            flex items-center justify-center gap-2
            px-3 py-2
            bg-blue-600
            text-white
            rounded-lg
            hover:bg-blue-700
            disabled:opacity-50
            disabled:cursor-not-allowed
            text-sm
            transition
          "
        >
          {isGenerating ? (
            <>
              <div
                className="
                  w-4 h-4
                  border-2
                  border-white
                  border-t-transparent
                  rounded-full
                  animate-spin
                "
              />

              <span>Generating...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Download</span>
            </>
          )}
        </button>
      </div>

      <div
        className="
          bg-white dark:bg-slate-950
          border border-gray-200 dark:border-slate-700
          rounded-xl
          overflow-hidden
        "
      >
        <div
          className="
            h-48
            bg-gradient-to-br
            from-blue-50 to-gray-50
            dark:from-blue-950/30 dark:to-slate-900
            flex items-center justify-center
          "
        >
          <div className="text-center px-4">
            <FileText className="w-12 h-12 text-blue-400 mx-auto mb-2" />

            <p className="text-sm text-gray-700 dark:text-slate-200 mb-1">
              Payment #{agreement.id}
            </p>

            <p className="text-xs text-gray-500 dark:text-slate-400">
              {agreement.customer_reference || "N/A"}
            </p>

            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
              {agreement.payment_category || "N/A"}
            </p>
          </div>
        </div>

        <div
          className="
            p-3
            bg-white dark:bg-slate-950
            border-t border-gray-100 dark:border-slate-800
          "
        >
          <div className="flex justify-between items-center text-xs text-gray-500 dark:text-slate-400">
            <span>PDF Document</span>

            <span>
              {new Date(
                agreement.createdAt || Date.now()
              ).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   PAYMENTS TABLE
========================================================= */

const PaymentsTable: React.FC<PaymentsTableProps> = ({
  search,
  expandedId,
  setExpandedId,
  filters,
  setFilteredCount,
}) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [deletePopupId, setDeletePopupId] =
    useState<string | null>(null);

  const [showEmailModal, setShowEmailModal] =
    useState(false);

  /* =========================================================
     FETCH PAYMENTS
  ========================================================= */

  useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await makeGetRequest(
          "payments/getAllPayments"
        );

        if (
          response.data &&
          response.data.success
        ) {
          setPayments(response.data.data || []);
        } else {
          setError(
            response.data?.message ||
              "Failed to fetch payments."
          );
        }
      } catch (err) {
        console.error(err);

        setError(
          "An error occurred while fetching payments."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, []);

  /* =========================================================
     FILTER
  ========================================================= */

  const filtered = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return payments.filter((p) => {
      const searchMatch =
        !searchValue ||
        String(p.customer_reference || "")
          .toLowerCase()
          .includes(searchValue) ||
        String(p.customer_name || "")
          .toLowerCase()
          .includes(searchValue) ||
        String(p.payment_category || "")
          .toLowerCase()
          .includes(searchValue) ||
        String(p.description || "")
          .toLowerCase()
          .includes(searchValue);

      if (!searchMatch) return false;

      if (
        filters.category &&
        p.payment_category !== filters.category
      ) {
        return false;
      }

      if (filters.status) {
        const paymentStatus =
          p.status?.toLowerCase() || "completed";

        if (
          paymentStatus !==
          filters.status.toLowerCase()
        ) {
          return false;
        }
      }

      const paymentDate = new Date(p.createdAt);

      if (filters.fromDate) {
        const fromDate = new Date(filters.fromDate);
        fromDate.setHours(0, 0, 0, 0);

        if (paymentDate < fromDate) {
          return false;
        }
      }

      if (filters.toDate) {
        const toDate = new Date(filters.toDate);

        toDate.setHours(23, 59, 59, 999);

        if (paymentDate > toDate) {
          return false;
        }
      }

      if (
        filters.minAmount &&
        p.total_amount <
          Number(filters.minAmount)
      ) {
        return false;
      }

      if (
        filters.maxAmount &&
        p.total_amount >
          Number(filters.maxAmount)
      ) {
        return false;
      }

      return true;
    });
  }, [payments, search, filters]);

  useEffect(() => {
    setFilteredCount(filtered.length);
  }, [filtered.length, setFilteredCount]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / pageSize)
  );

  const paginated = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  useEffect(() => {
    setPage(1);
  }, [pageSize, search, filters]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  /* =========================================================
     HELPERS
  ========================================================= */

  const handleExpand = (id: string) => {
    setExpandedId(
      expandedId === id ? null : id
    );
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "N/A";
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatAmount = (amount: number) => {
    return Number(amount || 0).toLocaleString(
      "en-US"
    );
  };

  const handlePageSizeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPageSize(Number(e.target.value));
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDeletePayment = async () => {
    if (!deletePopupId) return;

    setIsDeleting(true);

    try {
      const response =
        await makeDeleteRequest(
          `payments/deletePayment/${deletePopupId}`
        );

      if (
        response.data &&
        response.data.success
      ) {
        setPayments((current) =>
          current.filter(
            (p) =>
              p.id.toString() !==
              deletePopupId
          )
        );

        toast.success(
          "Payment deleted successfully!"
        );

        setDeletePopupId(null);
      } else {
        toast.error(
          response.data?.message ||
            "Failed to delete payment."
        );
      }
    } catch (err) {
      console.error(err);

      toast.error(
        "An error occurred while deleting the payment."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      {deletePopupId !== null && (
        <DeletePopup
          entityName="Payment"
          onCancel={() =>
            setDeletePopupId(null)
          }
          onDelete={handleDeletePayment}
          isDeleting={isDeleting}
        />
      )}

      <EmailModal
        open={showEmailModal}
        onClose={() =>
          setShowEmailModal(false)
        }
        onSend={(email) => {
          console.log(
            "Email requested:",
            email
          );

          toast.success(
            "Email action selected."
          );
        }}
      />

      {/* TABLE WRAPPER */}
      <div
        className="
          w-full
          overflow-hidden
          rounded-xl
          border
          border-gray-200 dark:border-slate-700
          font-plus-jakarta
          bg-white dark:bg-[#0b1220]
        "
      >
        {/* HORIZONTAL SCROLL */}
        <div className="overflow-x-auto">
          <table className="min-w-[1050px] w-full">
            <thead
              className="
                bg-[#F0F7FF]
                dark:bg-slate-900
                sticky top-0
                z-10
              "
            >
              <tr>
                {[
                  "Reference",
                  "Name",
                  "Amount",
                  "Date",
                  "Status",
                  "Bank-ID",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="
                      py-3
                      px-4
                      text-left
                      text-xs
                      sm:text-sm
                      font-semibold
                      text-gray-700
                      dark:text-slate-300
                      whitespace-nowrap
                    "
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody
              className="
                divide-y
                divide-gray-200
                dark:divide-slate-800
              "
            >
              {/* LOADING */}
              {isLoading && (
                <tr>
                  <td
                    colSpan={7}
                    className="py-12 text-center"
                  >
                    <div className="flex justify-center">
                      <div
                        className="
                          animate-spin
                          rounded-full
                          h-8 w-8
                          border-2
                          border-blue-500
                          border-t-transparent
                        "
                      />
                    </div>
                  </td>
                </tr>
              )}

              {/* ERROR */}
              {!isLoading && error && (
                <tr>
                  <td
                    colSpan={7}
                    className="
                      py-12
                      text-center
                      text-red-500
                      dark:text-red-400
                    "
                  >
                    {error}
                  </td>
                </tr>
              )}

              {/* EMPTY */}
              {!isLoading &&
                !error &&
                filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="
                        py-12
                        text-center
                        text-gray-500
                        dark:text-slate-400
                      "
                    >
                      No payments found
                    </td>
                  </tr>
                )}

              {/* DATA */}
              {!isLoading &&
                !error &&
                paginated.map((payment) => {
                  const paymentId =
                    payment.id.toString();

                  const isExpanded =
                    expandedId === paymentId;

                  return (
                    <React.Fragment
                      key={payment.id}
                    >
                      <tr
                        className={`
                          transition-colors
                          hover:bg-gray-50
                          dark:hover:bg-slate-900/60
                          ${
                            isExpanded
                              ? "bg-blue-50/40 dark:bg-blue-950/20"
                              : "bg-white dark:bg-[#0b1220]"
                          }
                        `}
                      >
                        {/* REFERENCE */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() =>
                                handleExpand(
                                  paymentId
                                )
                              }
                              className="
                                flex items-center
                                justify-center
                                w-7 h-7
                                rounded-md
                                hover:bg-gray-200
                                dark:hover:bg-slate-700
                                transition
                                cursor-pointer
                              "
                            >
                              <ArrowCollapseIcon
                                className={`
                                  transition-transform
                                  ${
                                    isExpanded
                                      ? "rotate-90"
                                      : "-rotate-90"
                                  }
                                `}
                              />
                            </button>

                            <span
                              className="
                                font-semibold
                                text-blue-900
                                dark:text-blue-400
                                whitespace-nowrap
                              "
                            >
                              {payment.customer_reference ||
                                "N/A"}
                            </span>
                          </div>
                        </td>

                        {/* NAME */}
                        <td
                          className="
                            py-4 px-4
                            text-sm
                            text-gray-700
                            dark:text-slate-300
                            whitespace-nowrap
                          "
                        >
                          {payment.customer_name ||
                            "N/A"}
                        </td>

                        {/* AMOUNT */}
                        <td
                          className="
                            py-4 px-4
                            text-sm
                            font-medium
                            text-gray-900
                            dark:text-white
                            whitespace-nowrap
                          "
                        >
                          {formatAmount(
                            payment.total_amount
                          )}
                        </td>

                        {/* DATE */}
                        <td
                          className="
                            py-4 px-4
                            text-sm
                            text-gray-700
                            dark:text-slate-300
                            whitespace-nowrap
                          "
                        >
                          {formatDate(
                            payment.createdAt
                          )}
                        </td>

                        {/* STATUS */}
                        <td className="py-4 px-4">
                          <span
                            className="
                              inline-flex
                              px-3 py-1
                              rounded-full
                              text-xs
                              font-medium
                              bg-green-100
                              dark:bg-green-950/40
                              text-green-700
                              dark:text-green-400
                              whitespace-nowrap
                            "
                          >
                            Paid
                          </span>
                        </td>

                        {/* BANK ID */}
                        <td className="py-4 px-4">
                          <button
                            type="button"
                            className="
                              px-3 py-1.5
                              rounded-md
                              text-xs
                              font-medium
                              bg-blue-600
                              hover:bg-blue-700
                              text-white
                              transition
                              cursor-pointer
                              whitespace-nowrap
                            "
                          >
                            BankID
                          </button>
                        </td>

                        {/* ACTIONS */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() =>
                                setDeletePopupId(
                                  paymentId
                                )
                              }
                              className="
                                text-red-500
                                hover:text-red-700
                                dark:hover:text-red-400
                                hover:bg-red-50
                                dark:hover:bg-red-950/30
                                p-2
                                rounded-md
                                transition
                                cursor-pointer
                              "
                              title="Delete payment"
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* EXPANDED ROW */}
                      {isExpanded && (
                        <tr>
                          <td
                            colSpan={7}
                            className="
                              bg-[#E9EEF640]
                              dark:bg-slate-900/40
                              border-t
                              border-gray-200
                              dark:border-slate-800
                            "
                          >
                            <div className="p-4 sm:p-6">
                              <div className="flex flex-col gap-6">

                                {/* PAYMENT INFO */}
                                <div
                                  className="
                                    bg-white
                                    dark:bg-slate-950
                                    rounded-xl
                                    border
                                    border-gray-200
                                    dark:border-slate-700
                                    overflow-hidden
                                  "
                                >
                                  <h3
                                    className="
                                      bg-[#F0F7FF]
                                      dark:bg-slate-900
                                      px-5 sm:px-6
                                      py-4
                                      text-sm sm:text-base
                                      font-semibold
                                      text-gray-900
                                      dark:text-white
                                    "
                                  >
                                    Payment Information
                                  </h3>

                                  <div
                                    className="
                                      p-5 sm:p-6
                                      grid
                                      grid-cols-1
                                      sm:grid-cols-2
                                      lg:grid-cols-4
                                      gap-5
                                    "
                                  >
                                    {[
                                      [
                                        "Reference",
                                        payment.customer_reference,
                                      ],
                                      [
                                        "Name",
                                        payment.customer_name,
                                      ],
                                      [
                                        "Total Amount",
                                        formatAmount(
                                          payment.total_amount
                                        ),
                                      ],
                                      [
                                        "Date",
                                        formatDate(
                                          payment.createdAt
                                        ),
                                      ],
                                      [
                                        "Category",
                                        payment.payment_category,
                                      ],
                                      [
                                        "Email",
                                        payment.email,
                                      ],
                                      [
                                        "Transaction ID",
                                        payment.id,
                                      ],
                                      [
                                        "Phone",
                                        payment.telephone_number,
                                      ],
                                    ].map(
                                      ([label, value]) => (
                                        <div
                                          key={String(
                                            label
                                          )}
                                        >
                                          <div className="text-xs text-gray-500 dark:text-slate-500 mb-1">
                                            {label}
                                          </div>

                                          <div className="text-sm text-gray-900 dark:text-slate-200 break-words">
                                            {value ||
                                              "N/A"}
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>

                                {/* AMOUNT ITEMS */}
                                <div>
                                  <h4
                                    className="
                                      text-sm
                                      font-semibold
                                      text-gray-900
                                      dark:text-white
                                      mb-3
                                    "
                                  >
                                    Amount Breakdown
                                  </h4>

                                  <div
                                    className="
                                      bg-white
                                      dark:bg-slate-950
                                      rounded-xl
                                      border
                                      border-gray-200
                                      dark:border-slate-700
                                      overflow-x-auto
                                    "
                                  >
                                    <table className="min-w-full">
                                      <thead
                                        className="
                                          bg-gray-50
                                          dark:bg-slate-900
                                        "
                                      >
                                        <tr>
                                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase">
                                            Description
                                          </th>

                                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase">
                                            Amount
                                          </th>
                                        </tr>
                                      </thead>

                                      <tbody
                                        className="
                                          divide-y
                                          divide-gray-200
                                          dark:divide-slate-800
                                        "
                                      >
                                        {(
                                          payment.amount_items ||
                                          []
                                        ).map(
                                          (
                                            item,
                                            index
                                          ) => (
                                            <tr
                                              key={
                                                index
                                              }
                                            >
                                              <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-200">
                                                {item.description ||
                                                  "N/A"}
                                              </td>

                                              <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-200 text-right font-medium">
                                                {formatAmount(
                                                  item.amount
                                                )}
                                              </td>
                                            </tr>
                                          )
                                        )}

                                        <tr className="bg-gray-50 dark:bg-slate-900">
                                          <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                                            Total
                                          </td>

                                          <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white text-right">
                                            {formatAmount(
                                              payment.total_amount
                                            )}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>

                                {/* DOCUMENT */}
                                <div
                                  className="
                                    bg-white
                                    dark:bg-slate-950
                                    rounded-xl
                                    border
                                    border-gray-200
                                    dark:border-slate-700
                                    overflow-hidden
                                  "
                                >
                                  <div
                                    className="
                                      bg-[#F0F7FF]
                                      dark:bg-slate-900
                                      px-5 sm:px-6
                                      py-4
                                    "
                                  >
                                    <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                                      Document
                                    </h2>
                                  </div>

                                  <div className="p-4 sm:p-6">
                                    <PDFPreview
                                      agreement={
                                        payment
                                      }
                                    />
                                  </div>
                                </div>

                                {/* ACTIONS */}
                                <div
                                  className="
                                    flex
                                    flex-wrap
                                    justify-end
                                    items-center
                                    gap-3
                                  "
                                >
                                  <button
                                    type="button"
                                    className="
                                      px-4 py-2
                                      text-[#012F7A]
                                      dark:text-blue-400
                                      border
                                      border-blue-600
                                      dark:border-blue-800
                                      rounded-lg
                                      hover:bg-blue-50
                                      dark:hover:bg-blue-950/30
                                      flex items-center
                                      gap-2
                                      cursor-pointer
                                      transition
                                    "
                                  >
                                    <EditAgreementIcon />
                                    Edit
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      const button =
                                        document.querySelector(
                                          `[data-pdf-payment="${payment.id}"]`
                                        ) as HTMLButtonElement | null;

                                      button?.click();
                                    }}
                                    className="
                                      px-4 py-2
                                      text-[#012F7A]
                                      dark:text-blue-400
                                      border
                                      border-blue-600
                                      dark:border-blue-800
                                      rounded-lg
                                      hover:bg-blue-50
                                      dark:hover:bg-blue-950/30
                                      flex items-center
                                      gap-2
                                      cursor-pointer
                                      transition
                                    "
                                  >
                                    <ViewAgreementIcon />
                                    Download
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      setShowEmailModal(
                                        true
                                      )
                                    }
                                    className="
                                      px-4 py-2
                                      text-[#012F7A]
                                      dark:text-blue-400
                                      border
                                      border-blue-600
                                      dark:border-blue-800
                                      rounded-lg
                                      hover:bg-blue-50
                                      dark:hover:bg-blue-950/30
                                      flex items-center
                                      gap-2
                                      cursor-pointer
                                      transition
                                    "
                                  >
                                    <EnvelopeAgreementIcon />
                                    Email
                                  </button>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      {!isLoading &&
        !error &&
        filtered.length > 0 && (
          <div
            className="
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-4
              mt-5
            "
          >
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
              <span>Show</span>

              <select
                value={pageSize}
                onChange={handlePageSizeChange}
                className="
                  border
                  border-gray-300
                  dark:border-slate-700
                  bg-white
                  dark:bg-slate-900
                  text-gray-700
                  dark:text-slate-200
                  rounded-md
                  px-2 py-1
                  text-sm
                  cursor-pointer
                  outline-none
                "
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>

              <span>
                out of {filtered.length} payments
              </span>
            </div>

            <div className="flex items-center gap-1 overflow-x-auto">
              <button
                type="button"
                onClick={() =>
                  setPage((p) =>
                    Math.max(1, p - 1)
                  )
                }
                disabled={page === 1}
                className="
                  px-3 py-2.5
                  text-sm
                  border
                  border-gray-300
                  dark:border-slate-700
                  rounded-md
                  disabled:opacity-40
                  hover:bg-gray-50
                  dark:hover:bg-slate-800
                  cursor-pointer
                "
              >
                <ArrowLeftIcon className="w-[6px] h-[10px]" />
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              )
                .filter(
                  (pageNum) =>
                    pageNum <= 5
                )
                .map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() =>
                      setPage(pageNum)
                    }
                    className={`
                      min-w-9
                      px-3 py-2
                      text-sm
                      border
                      rounded-md
                      cursor-pointer
                      ${
                        page === pageNum
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800"
                      }
                    `}
                  >
                    {pageNum}
                  </button>
                ))}

              {totalPages > 5 && (
                <>
                  <span className="px-1 text-gray-500">
                    ...
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setPage(totalPages)
                    }
                    className="
                      min-w-9
                      px-3 py-2
                      text-sm
                      border
                      border-gray-300
                      dark:border-slate-700
                      rounded-md
                      hover:bg-gray-50
                      dark:hover:bg-slate-800
                      cursor-pointer
                    "
                  >
                    {totalPages}
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() =>
                  setPage((p) =>
                    Math.min(
                      totalPages,
                      p + 1
                    )
                  )
                }
                disabled={
                  page === totalPages
                }
                className="
                  px-3 py-2.5
                  text-sm
                  border
                  border-gray-300
                  dark:border-slate-700
                  rounded-md
                  disabled:opacity-40
                  hover:bg-gray-50
                  dark:hover:bg-slate-800
                  cursor-pointer
                "
              >
                <ArrowLeftDoubleIcon className="w-[6px] h-[10px] rotate-180" />
              </button>
            </div>
          </div>
        )}
    </>
  );
};

export default PaymentsTable;