import React, { useState, useEffect } from "react";
import { Trash2, Download, FileText } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import {
  ArrowCollapseIcon,
  ArrowLeftIcon,
  ArrowLeftDoubleIcon,
  EditAgreementIcon,
  ViewAgreementIcon,
  EnvelopeAgreementIcon,
  SwishaAgreementIcon,
  SignAgreementIcon,
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

const statusColors: Record<string, string> = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Overdue: "bg-red-100 text-red-700",
  Cancelled: "bg-gray-100 text-gray-700",
};

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


  useEffect(() => {
    const fetchInvoices = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await makeGetRequest("invoices/getAllInvoices");
        if (response.data && response.data.success) {
          setInvoices(response.data.invoices);
        } else {
          setError(response.data?.message || "Failed to fetch invoices");
        }
      } catch (err) {
        setError("An error occurred while fetching invoices");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const filtered = invoices.filter((inv) => {
    const searchMatch =
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.customerName.toLowerCase().includes(search.toLowerCase());

    if (!searchMatch) return false;

    if (
      filters.status &&
      inv.status.toLowerCase() !== filters.status.toLowerCase()
    ) {
      return false;
    }

    if (filters.customerType && inv.customerType !== filters.customerType) {
      return false;
    }

    const invoiceDate = new Date(inv.invoiceDate);
    if (filters.fromDate) {
      if (invoiceDate < new Date(filters.fromDate)) return false;
    }
    if (filters.toDate) {
      const toDate = new Date(filters.toDate);
      toDate.setHours(23, 59, 59, 999);
      if (invoiceDate > toDate) return false;
    }

    if (filters.minAmount && inv.amount < parseFloat(filters.minAmount)) {
      return false;
    }
    if (filters.maxAmount && inv.amount > parseFloat(filters.maxAmount)) {
      return false;
    }

    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (filters.sortBy) {
      case "date-desc":
        return (
          new Date(b.invoiceDate).getTime() - new Date(a.invoiceDate).getTime()
        );
      case "date-asc":
        return (
          new Date(a.invoiceDate).getTime() - new Date(b.invoiceDate).getTime()
        );
      case "amount-desc":
        return b.amount - a.amount;
      case "amount-asc":
        return a.amount - b.amount;
      default:
        return 0;
    }
  });

  useEffect(() => {
    setFilteredCount(sorted.length);
  }, [sorted, setFilteredCount]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [pageSize, search, sorted.length]);

  useEffect(() => {
    if ((page - 1) * pageSize >= sorted.length) {
      setPage(1);
    }
  }, [page, pageSize, sorted.length]);

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = Number(e.target.value);
    setPageSize(newPageSize);
  };

  const handleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDeleteInvoice = async () => {
    if (!deletePopupId) return;

    setIsDeleting(true);
    try {
      const response = await makeDeleteRequest(
        `invoices/delete/${deletePopupId}`
      );
      if (response.data && response.data.success) {
        setInvoices(
          invoices.filter((inv) => inv.id.toString() !== deletePopupId)
        );
        toast.success("Invoice deleted successfully!");
        setDeletePopupId(null);
      } else {
        toast.error(response.data?.message || "Failed to delete invoice");
      }
    } catch (err) {
      toast.error("An error occurred while deleting the invoice");
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };
  console.log(SwishaAgreementIcon, SignAgreementIcon);



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
            placeholder="Ange e-postadress"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => {
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


  const PDFPreview: React.FC<{
    agreement: any;
  }> = ({ agreement }) => {
    const [isGenerating, setIsGenerating] = useState(false);

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
            <span className="font-medium text-gray-800">Agreement PDF2</span>
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
          entityName="Invoice"
          onCancel={() => setDeletePopupId(null)}
          onDelete={handleDeleteInvoice}
          isDeleting={isDeleting}
        />
      )}

      <EmailModal
        open={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSend={(email) => {
          alert(`Email sent to ${email}`);
        }}
      />


      <div className="overflow-hidden rounded-lg border border-gray-200 font-plus-jakarta max-h-[500px] min-h-[500px] overflow-y-auto overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[#F0F7FF] sticky top-0 z-10">
            <tr>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Typ
              </th>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Fakturanummer
              </th>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Kund
              </th>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Belopp
              </th>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Utgivningsdatum
              </th>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Due Date
              </th>
              <th className="md:py-3 py-1.5 md:px-4 px-2 text-left text-sm font-medium text-gray-700">
                Åtgärder
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="py-6 text-center">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-gray-500">
                  Inga fakturor hittades
                </td>
              </tr>
            ) : (
              paginated.map((invoice) => (
                <React.Fragment key={invoice.id}>
                  <tr
                    className={`hover:bg-gray-50 ${expandedId === invoice.id ? "bg-[#E9EEF640]" : ""
                      }`}
                  >
                    <td className="md:py-4 py-1.5 md:px-4 px-2 flex items-center">
                      <button
                        onClick={() => handleExpand(invoice.id)}
                        className="flex items-center justify-center w-6 h-6 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                      >
                        <span
                          className={`text-gray-400 text-xs transition-transform ${expandedId === invoice.id ? "rotate-180" : ""
                            }`}
                        >
                          <ArrowCollapseIcon className="rotate-270" />
                        </span>
                      </button>
                      <span className="inline-flex px-3 py-1 rounded-full text-sm font-mediu">
                        {invoice.invoiceNumber.startsWith("INV")
                          ? "Invoice"
                          : "Receipt"}
                      </span>
                    </td>
                    <td className="md:py-4 py-1.5 md:px-4 px-2 font-semibold text-blue-900">
                      {invoice.invoiceNumber || "N/A"}
                    </td>
                    <td className="md:py-4 py-1.5 md:px-4 px-2 text-sm text-gray-700">
                      {invoice.customerName || "N/A"}
                    </td>
                    <td className="md:py-4 py-1.5 md:px-4 px-2 text-sm text-gray-700">
                      {invoice.currency || "N/A"}{" "}
                      {typeof invoice.amount === "number"
                        ? invoice.amount.toLocaleString()
                        : "N/A"}
                    </td>
                    <td className="md:py-4 py-1.5 md:px-4 px-2 text-sm text-gray-700">
                      {new Date(invoice.invoiceDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      ) || "N/A"}
                    </td>
                    <td className="md:py-4 py-1.5 md:px-4 px-2 text-sm text-gray-700">
                      {new Date(invoice.dueDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }) || "N/A"}
                    </td>

                    <td className="md:py-4 py-1.5 md:px-4 px-2">
                      <button
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-md transition-colors cursor-pointer"
                        onClick={() => setDeletePopupId(invoice.id.toString())}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                  {expandedId === invoice.id && (
                    <tr>
                      <td
                        colSpan={8}
                        className="bg-[#E9EEF640] border-t border-gray-200"
                      >
                        <div className="p-6">
                          <div className="flex flex-col gap-6">
                            <div className="mb-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
                              <h3 className="bg-[#F0F7FF] px-6 py-4">
                                Fakturadetaljer
                              </h3>
                              <div className="p-6 grid grid-cols-2 gap-6">
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Fakturanummer
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {invoice.invoiceNumber || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Kund
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {invoice.customerName || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Nettobelopp
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {invoice.currency || "N/A"}{" "}
                                    {invoice.net?.toLocaleString() || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    MOMS
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {invoice.currency || "N/A"}{" "}
                                    {invoice.moms?.toLocaleString() || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Totalt belopp
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {invoice.currency || "N/A"}{" "}
                                    {invoice.amount.toLocaleString() || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Status
                                  </div>
                                  <span
                                    className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${statusColors[invoice.status] ||
                                      "bg-gray-100 text-gray-700"
                                      }`}
                                  >
                                    {invoice.status || "N/A"}
                                  </span>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Utgivningsdatum
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {new Date(
                                      invoice.invoiceDate
                                    ).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    }) || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Förfallodatum
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {new Date(
                                      invoice.dueDate
                                    ).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    }) || "N/A"}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h3 className="text-base font-semibold text-gray-900 mb-4">
                                Föremål
                              </h3>
                              <table className="min-w-full border border-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-700 border-b">
                                      Produkt
                                    </th>
                                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-700 border-b">
                                      Kvantitet
                                    </th>
                                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-700 border-b">
                                      Enhetspris
                                    </th>
                                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-700 border-b">
                                      Total
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {invoice.items.map((item, index) => (
                                    <tr key={index} className="border-b">
                                      <td className="py-2 px-4 text-sm text-gray-700">
                                        {item.productName || "N/Assssss"}
                                        <div className="text-xs text-gray-500">
                                          {item.description || "N/A"}
                                        </div>
                                      </td>
                                      <td className="py-2 px-4 text-sm text-gray-700">
                                        {item.quantity || "N/A"}{" "}
                                        {item.unit || "N/A"}
                                      </td>
                                      <td className="py-2 px-4 text-sm text-gray-700">
                                        {invoice.currency || "N/A"}{" "}
                                        {typeof item.price === "number"
                                          ? item.price.toLocaleString()
                                          : "N/A"}
                                      </td>
                                      <td className="py-2 px-4 text-sm text-gray-700">
                                        {invoice.currency || "N/A"}{" "}
                                        {typeof item.lineTotal === "number"
                                          ? item.lineTotal.toLocaleString()
                                          : "N/A"}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>

                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                              <div className="bg-[#F0F7FF] px-6 py-4 flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-gray-900">
                                  Dokument
                                </h2>
                              </div>
                              <div className="p-6">
                                <div className="space-y-3">
                                  <PDFPreview agreement={invoice} />
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-end items-center gap-3 mt-4">
                              {/* <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-gray-100 cursor-pointer">
                                <EditAgreementIcon />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-gray-100 cursor-pointer">
                                <ViewAgreementIcon />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-gray-100 cursor-pointer">
                                <EnvelopeAgreementIcon />
                              </button> */}
                              <button className="px-4 py-2 text-[#012F7A] border border-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2 cursor-pointer">
                                <EditAgreementIcon />
                                Redigera
                              </button>
                              <button className="px-4 py-2 text-[#012F7A] border border-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2 cursor-pointer">
                                <ViewAgreementIcon />
                                Ladda ner
                              </button>
                              <button
                                onClick={() => setShowEmailModal(true)}
                                className="px-4 py-2 text-[#012F7A] border border-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2 cursor-pointer"
                              >
                                <EnvelopeAgreementIcon />
                                E-post
                              </button>

                              {/* <button className="px-4 py-2 text-[#012F7A] border border-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2 cursor-pointer">
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
            <span>poster av {sorted.length} poster</span>
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
                  className={`px-3 py-2 text-sm border rounded-md cursor-pointer ${page === pageNum
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

export default InvoiceTable;
