import React, { useState, useEffect } from "react";
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
  makePostRequest,
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
}

interface PaymentsTableProps {
  search: string;
  expandedId: string | null;
  setExpandedId: (id: string | null) => void;
  filters: PaymentFilters;
  setFilteredCount: (count: number) => void;
}

const EmailModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onSend: (email: string) => void;
}> = ({ open, onClose, onSend }) => {
  const [email, setEmail] = useState("");
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90vw] max-w-sm">
        <h2 className="text-lg font-semibold mb-4">Skicka e-post</h2>
        <input
          type="email"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={onClose}
          >
            Nära
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => {
              onSend(email);
              onClose();
            }}
          >
            Skicka
          </button>
        </div>
      </div>
    </div>
  );
};

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
  const [deletePopupId, setDeletePopupId] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState(10);
  const [showEmailModal, setShowEmailModal] = useState(false);
  

  useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await makeGetRequest("payments/getAllPayments");
        if (response.data && response.data.success) {
          setPayments(response.data.data);
        } else {
          setError(response.data?.message || "Failed to fetch payments.");
        }
      } catch (err) {
        setError("An error occurred while fetching payments.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const filtered = payments.filter((p) => {
    const searchMatch =
      p.customer_reference.toLowerCase().includes(search.toLowerCase()) ||
      p.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      (p.payment_category &&
        p.payment_category.toLowerCase().includes(search.toLowerCase())) ||
      (p.description &&
        p.description.toLowerCase().includes(search.toLowerCase()));

    if (!searchMatch) return false;

    if (filters.category && p.payment_category !== filters.category) {
      return false;
    }

    if (filters.status) {
      const paymentStatus = "completed";
      if (paymentStatus !== filters.status.toLowerCase()) {
        return false;
      }
    }

    const paymentDate = new Date(p.createdAt);
    if (filters.fromDate) {
      if (paymentDate < new Date(filters.fromDate)) return false;
    }
    if (filters.toDate) {
      const toDate = new Date(filters.toDate);
      toDate.setHours(23, 59, 59, 999);
      if (paymentDate > toDate) return false;
    }

    if (filters.minAmount && p.total_amount < parseFloat(filters.minAmount)) {
      return false;
    }
    if (filters.maxAmount && p.total_amount > parseFloat(filters.maxAmount)) {
      return false;
    }

    return true;
  });

  useEffect(() => {
    setFilteredCount(filtered.length);
  }, [filtered, setFilteredCount]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    setPage(1);
  }, [pageSize, search, filtered.length]);

  useEffect(() => {
    if ((page - 1) * pageSize >= filtered.length) {
      setPage(1);
    }
  }, [page, pageSize, filtered.length]);

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = Number(e.target.value);
    setPageSize(newPageSize);
  };

  const handleDeletePayment = async () => {
    if (!deletePopupId) return;

    setIsDeleting(true);
    try {
      const response = await makeDeleteRequest(
        `payments/deletePayment/${deletePopupId}`
      );
      if (response.data && response.data.success) {
        setPayments(payments.filter((p) => p.id.toString() !== deletePopupId));
        toast.success("Payment deleted successfully!");
        setDeletePopupId(null);
      } else {
        toast.error(response.data?.message || "Failed to delete payment.");
      }
    } catch (err) {
      toast.error("An error occurred while deleting the payment.");
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSwishPayment = async (payment: Payment) => {
    try {
      // Create a UUID for the payout instruction
      const payoutInstructionUUID = `${Date.now()}-${payment.id}`;

      const payload = {
        payoutInstructionUUID,
        payerPaymentReference:
          payment.customer_reference || `Payment-${payment.id}`,
        payerAlias: "1231181189", // This should be your Swish number
        payeeAlias: payment.telephone_number || "0700000000", // Customer's phone number
        payeeSSN: payment.social_security_number || "0000000000", // Customer's SSN
        amount: payment.total_amount,
        currency: "SEK",
        payoutType: "PAYOUT",
        instructionDate: new Date().toISOString(),
        message: `Payment for ${payment.customer_reference || "order"}`,
      };

      const swishPayload = {
        payload,
        callbackUrl: "https://dealer.clubpadel.se/api/swish-callback", // Your callback URL
        callbackIdentifier: payoutInstructionUUID,
      };

      const response = await makePostRequest(
        "payouts/swish-cpcapi/api/v1/payouts",
        swishPayload
      );

      if (response.data && response.data.success) {
        toast.success("Swish payment initiated successfully!");
      } else {
        toast.error(
          response.data?.message || "Failed to initiate Swish payment"
        );
      }
    } catch (error: any) {
      console.error("Error initiating Swish payment:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to initiate Swish payment";
      toast.error(errorMessage);
    }
  };

  console.log(handleSwishPayment);

  const PDFPreview: React.FC<{
  agreement: any;
  }> = ({ agreement }) => {
    const [isGenerating, setIsGenerating] = useState(false);
    console.log("--------------------")
    console.log(agreement)
    console.log("--------------------")
    const handleDownloadPDF = async () => {
      if (!agreement) {
        toast.error("Agreement data not available");
        return;
      }

      try {
        setIsGenerating(true);
        toast.loading("Generating PDF...", { id: "pdf-generation" });

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
        link.download = `Agreement-${agreement.id}-${timestamp}.pdf`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success("PDF downloaded successfully!", { id: "pdf-generation" });
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
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-800">Agreement PDF</span>
          </div>
          <button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="h-48 bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center">
            <div className="text-center">
              <FileText className="w-12 h-12 text-blue-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">
                Agreement #{agreement.id}
              </p>
              <p className="text-xs text-gray-500">
                {agreement.registrationNumber || "N/A"}
              </p>
              <p className="text-xs text-gray-500">{agreement.type || "N/A"}</p>
            </div>
          </div>
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>PDF Document</span>
              <span>
                {new Date(agreement.createdAt || Date.now()).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {deletePopupId !== null && (
        <DeletePopup
          entityName="Payment"
          onCancel={() => setDeletePopupId(null)}
          onDelete={handleDeletePayment}
          isDeleting={isDeleting}
        />
      )}
      <EmailModal
        open={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSend={() => {
          alert("button clicked");
        }}
      />
      <div className="overflow-hidden rounded-lg border border-gray-200 font-plus-jakarta max-h-[500px] min-h-[500px] overflow-y-auto overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[#F0F7FF] sticky top-0 z-10">
            <tr>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Hänvisning
              </th>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Namn
              </th>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Belopp
              </th>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Datum
              </th>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Bank-ID
              </th>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700 flex items-center justify-center">
                Åtgärder
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={8} className="py-6 text-center">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={8} className="py-6 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-6 text-center text-gray-500">
                  Inga betalningar hittades
                </td>
              </tr>
            ) : (
              paginated.map((payment) => (
                <React.Fragment key={payment.id}>
                  <tr
                    className={`hover:bg-gray-50 ${
                      expandedId === payment.id.toString()
                        ? "bg-[#E9EEF640]"
                        : ""
                    }`}
                  >
                    <td className="md:py-4 py-1.5 md:px-4 px-2">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleExpand(payment.id.toString())}
                          className="flex items-center justify-center w-6 h-6 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                        >
                          <span
                            className={`text-gray-400 text-xs transition-transform ${
                              expandedId === payment.id.toString()
                                ? "rotate-180"
                                : ""
                            }`}
                          >
                            <ArrowCollapseIcon className="rotate-270" />
                          </span>
                        </button>
                        <span className="font-semibold text-blue-900">
                          {payment.customer_reference || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="md:py-4 py-1.5 md:px-4 px-2 text-sm text-gray-700">
                      {payment.customer_name || "N/A"}
                    </td>
                    <td className="md:py-4 py-1.5 md:px-4 px-2 text-sm text-gray-900">
                      {payment.total_amount.toLocaleString() || "N/A"}
                    </td>
                    <td className="md:py-4 py-1.5 md:px-4 px-2 text-sm text-gray-700">
                      {formatDate(payment.createdAt) || "N/A"}
                    </td>
                    <td className="md:py-4 py-1.5 md:px-4 px-2">
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Utbetalt
                      </span>
                    </td>
                    <td className="md:py-4 py-1.5 md:px-4 px-2">
                      <button
                        className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm transition-colors cursor-pointer bg-blue-600 text-white hover:bg-blue-700`}
                        onClick={() => {}}
                      >
                        BankID
                      </button>
                    </td>
                    <td className="md:py-4 py-1.5 md:px-4 px-2 flex items-center justify-center gap-1">
                      <button
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-md transition-colors cursor-pointer"
                        onClick={() => setDeletePopupId(payment.id.toString())}
                      >
                        <TrashIcon />
                      </button>
                      
                    </td>
                  </tr>
                  {expandedId === payment.id.toString() && (
                    <tr>
                      <td
                        colSpan={8}
                        className="bg-[#E9EEF640] border-t border-gray-200"
                      >
                        <div className="p-6">
                          <div className="flex flex-col gap-6">
                            <div className="mb-6  bg-white rounded-lg border border-gray-200 overflow-hidden">
                              <h3 className="bg-[#F0F7FF] px-6 py-4 flex justify-between">
                                Betalningsinformation
                              </h3>
                              <div className="p-6 grid grid-cols-2 gap-6">
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Hänvisning
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {payment.customer_reference || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Namn
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {payment.customer_name || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Totalt belopp
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {payment.total_amount.toLocaleString() ||
                                      "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Datum
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {formatDate(payment.createdAt) || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Kategori
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {payment.payment_category || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    E-post
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {payment.email || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Transaktions-ID
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {payment.id || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Telefon
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {payment.telephone_number || "N/A"}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Amount Items Section */}
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                                Beloppsfördelning
                              </h4>
                              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                <table className="min-w-full">
                                  <thead className="bg-gray-50">
                                    <tr>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Beskrivning
                                      </th>
                                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Belopp
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-200">
                                    {payment.amount_items.map((item, index) => (
                                      <tr key={index}>
                                        <td className="px-4 py-3 text-sm text-gray-900">
                                          {item.description || "N/A"}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">
                                          {item.amount.toLocaleString() ||
                                            "N/A"}
                                        </td>
                                      </tr>
                                    ))}
                                    <tr className="bg-gray-50">
                                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                                        Total
                                      </td>
                                      <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">
                                        {payment.total_amount.toLocaleString() ||
                                          "N/A"}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>


                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                              <div className="bg-[#F0F7FF] px-6 py-4 flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-gray-900">
                                  Dokument
                                </h2>
                              </div>
                              <div className="p-6">
                                <div className="space-y-3">
                                  <PDFPreview agreement={payment} />
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-end items-center gap-3 mt-4">
                              <button className="px-4 py-2 text-[#012F7A] border border-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2 cursor-pointer">
                                <EditAgreementIcon />
                                Redigera
                              </button>
                              <button className="px-4 py-2 text-[#012F7A] border border-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2 cursor-pointer">
                                <ViewAgreementIcon />
                                Ladda ner
                              </button>
                              <button
                                className="px-4 py-2 text-[#012F7A] border border-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2 cursor-pointer"
                                onClick={() => setShowEmailModal(true)}
                              >
                                <EnvelopeAgreementIcon />
                                E-post
                              </button>
                              {/* <button
                                className="px-4 py-2 text-[#012F7A] border border-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2 cursor-pointer"
                                onClick={() => handleSwishPayment(payment)}
                              >
                                <SwishaAgreementIcon />
                                Swisha
                              </button>
                              <button className="px-4 py-2 text-white bg-[#012F7A] rounded-lg hover:bg-[#012F7A]/90 flex items-center gap-2 cursor-pointer">
                                <SignAgreementIcon />
                                Sign Agreement
                              </button> */}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
      {!isLoading && !error && filtered.length > 0 && (
        <div className="flex justify-between md:flex-row flex-col md:items-center items-start mt-6 md:gap-0 gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Visa</span>
            <select
              className="border border-gray-300 rounded px-2 py-1 text-sm cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>poster av {filtered.length} poster</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-3 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
            >
              <ArrowLeftIcon className="w-[6px] h-[10px]" />
            </button>
            {[...Array(Math.min(5, totalPages)).keys()].map((i) => {
              let pageNum = i + 1;
              if (page > 3 && totalPages > 5) {
                pageNum = page - 2 + i;
              }
              if (pageNum < 1 || pageNum > totalPages) return null;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-3 py-2 text-sm border rounded-md cursor-pointer ${
                    page === pageNum
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > 5 && page < totalPages - 2 && (
              <span className="px-2 text-gray-500">...</span>
            )}
            {totalPages > 1 && page < totalPages - 1 && totalPages > 5 && (
              <button
                onClick={() => setPage(totalPages)}
                className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
              >
                {totalPages}
              </button>
            )}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-3 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
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
