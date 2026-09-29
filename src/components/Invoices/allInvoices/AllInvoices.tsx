import { useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  FileText,
  Receipt,
  X,
  Plus,
  SlidersHorizontal,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import InvoiceTable from "../invoiceTable/InvoiceTable";
import FilterInvoices from "../../models/FilterInvoices";

interface InvoiceFilters {
  status?: string;
  customerType?: string;
  fromDate?: string;
  toDate?: string;
  minAmount?: string;
  maxAmount?: string;
  sortBy?: "date-desc" | "date-asc" | "amount-desc" | "amount-asc";
}

const initialFilterState: InvoiceFilters = {
  status: "",
  customerType: "",
  fromDate: "",
  toDate: "",
  minAmount: "",
  maxAmount: "",
  sortBy: "date-desc",
};

const AllInvoices = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [invoiceFilters, setInvoiceFilters] =
    useState<InvoiceFilters>(initialFilterState);

  const [filteredCount, setFilteredCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const handleClearFilters = () => {
    setInvoiceFilters(initialFilterState);
    setSearch("");
  };

  const handleCreateInvoice = () => {
    setShowDropdown(false);
    navigate("/add-new-invoice");
  };

  const handleCreateReceipt = () => {
    setShowDropdown(false);
    navigate("/add-new-receipt");
  };

  const isFiltersApplied =
    Object.values(invoiceFilters).some(
      (value) => value !== "" && value !== "date-desc"
    ) || search !== "";

  const activeFilterCount = Object.entries(invoiceFilters).filter(
    ([key, value]) => {
      if (key === "sortBy") {
        return value !== "" && value !== "date-desc";
      }

      return value !== "";
    }
  ).length;

  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-[#F5F7FA] px-3 py-4 font-plus-jakarta transition-colors duration-300 sm:px-5 lg:px-6 lg:py-6 dark:bg-[#07111F]">
      <div className="mx-auto w-full max-w-[1800px]">
        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-colors duration-300 dark:border-white/10 dark:bg-[#0B1726]">
          
          {/* Header */}
          <div className="border-b border-gray-100 px-4 py-5 dark:border-white/10 sm:px-6 lg:px-7">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              
              {/* Title */}
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#001A36] text-white shadow-sm dark:bg-[#123C69]">
                  <FileText size={21} strokeWidth={2} />
                </div>

                <div>
                  <h1 className="text-xl font-bold tracking-tight text-[#001A36] sm:text-2xl dark:text-white">
                    All Invoices
                  </h1>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Manage, search and organize your dealership invoices
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-auto">
                
                {/* Search */}
                <div className="relative min-w-0 flex-1 sm:min-w-[250px] xl:w-[300px]">
                  <Search
                    size={17}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search invoices..."
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-10 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-[#123C69] focus:bg-white focus:ring-2 focus:ring-[#123C69]/10 dark:border-white/10 dark:bg-[#07111F] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500 dark:focus:bg-[#07111F]"
                  />

                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-white/10 dark:hover:text-white"
                      aria-label="Clear search"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>

                {/* Filter */}
                <button
                  type="button"
                  onClick={() => setShowFilterModal(true)}
                  className={`relative flex h-11 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-all ${
                    isFiltersApplied
                      ? "border-[#001A36] bg-[#001A36] text-white hover:bg-[#00264D] dark:border-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
                      : "border-gray-200 bg-white text-[#001A36] hover:border-[#123C69] hover:bg-gray-50 dark:border-white/10 dark:bg-[#0F1E2F] dark:text-gray-200 dark:hover:bg-white/10"
                  }`}
                >
                  <SlidersHorizontal size={16} />

                  <span>Filters</span>

                  {activeFilterCount > 0 && (
                    <span
                      className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold ${
                        isFiltersApplied
                          ? "bg-white/20 text-white"
                          : "bg-[#001A36] text-white dark:bg-blue-600"
                      }`}
                    >
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {/* Create Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowDropdown((prev) => !prev)}
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#001A36] px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#00264D] hover:shadow-md sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    <Plus size={17} />

                    <span>Create</span>

                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        showDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showDropdown && (
                    <>
                      {/* Mobile backdrop */}
                      <button
                        type="button"
                        aria-label="Close create menu"
                        onClick={() => setShowDropdown(false)}
                        className="fixed inset-0 z-40 cursor-default bg-transparent"
                      />

                      <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-full min-w-[230px] overflow-hidden rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl dark:border-white/10 dark:bg-[#101E2E]">
                        <button
                          type="button"
                          onClick={handleCreateInvoice}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition hover:bg-gray-50 dark:hover:bg-white/5"
                        >
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                            <FileText size={17} />
                          </span>

                          <span>
                            <span className="block text-sm font-semibold text-gray-800 dark:text-white">
                              New Invoice
                            </span>

                            <span className="block text-xs text-gray-400">
                              Create a customer invoice
                            </span>
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={handleCreateReceipt}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition hover:bg-gray-50 dark:hover:bg-white/5"
                        >
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                            <Receipt size={17} />
                          </span>

                          <span>
                            <span className="block text-sm font-semibold text-gray-800 dark:text-white">
                              New Receipt
                            </span>

                            <span className="block text-xs text-gray-400">
                              Create a payment receipt
                            </span>
                          </span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Active Filters Banner */}
          {isFiltersApplied && (
            <div className="border-b border-blue-100 bg-blue-50/70 px-4 py-3 dark:border-blue-500/10 dark:bg-blue-500/5 sm:px-6 lg:px-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    <Filter size={15} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-blue-900 dark:text-blue-300">
                      Filters are active
                    </p>

                    <p className="mt-0.5 text-xs text-blue-700/80 dark:text-blue-400/80">
                      Showing{" "}
                      <strong className="font-bold">
                        {filteredCount}
                      </strong>{" "}
                      matching invoices
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="flex items-center justify-center gap-1.5 self-start rounded-lg px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100 sm:self-auto dark:text-blue-400 dark:hover:bg-blue-500/10"
                >
                  <X size={14} />
                  Clear filters
                </button>
              </div>
            </div>
          )}

          {/* Table Area */}
          <div className="p-3 sm:p-4 lg:p-6">
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-white/10">
              <InvoiceTable
                search={search}
                expandedId={expandedId}
                setExpandedId={setExpandedId}
                filters={invoiceFilters}
                setFilteredCount={setFilteredCount}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <FilterInvoices
          open={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          onApplyFilters={setInvoiceFilters}
          currentFilters={invoiceFilters}
        />
      )}
    </div>
  );
};

export default AllInvoices;
