import { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PaymentsTable from "../paymentsTable/PaymentsTable";
import FilterPayments, {
  type PaymentFilters,
} from "../../models/FilterPayments";

const initialFilterState: PaymentFilters = {
  category: "",
  status: "",
  fromDate: "",
  toDate: "",
  minAmount: "",
  maxAmount: "",
};

const AllPayment = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] =
    useState<PaymentFilters>(initialFilterState);
  const [filteredCount, setFilteredCount] = useState(0);

  const navigate = useNavigate();

  const handleApplyFilters = (newFilters: PaymentFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters(initialFilterState);
    setSearch("");
  };

  const isFiltersApplied =
    Object.values(filters).some((value) => value !== "") || search !== "";

  return (
    <div
      className="
        w-full
        rounded-2xl
        p-4 sm:p-5 lg:p-6
        mt-4
        font-sans
        font-plus-jakarta
        bg-white dark:bg-[#0f172a]
        border border-gray-100 dark:border-slate-800
        shadow-sm
        transition-colors duration-200
      "
    >
      {/* HEADER */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
            Payments
          </h2>

          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
            Manage and view all payments
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
          {/* SEARCH */}
          <div className="relative w-full sm:w-64 lg:w-72">
            <Search
              className="
                absolute left-3 top-1/2 -translate-y-1/2
                w-4 h-4
                text-gray-400 dark:text-slate-500
              "
            />

            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                pl-10 pr-4
                py-2.5
                rounded-lg
                text-sm
                outline-none
                transition
                bg-gray-50 dark:bg-slate-900
                border border-gray-200 dark:border-slate-700
                text-gray-900 dark:text-white
                placeholder-gray-400 dark:placeholder-slate-500
                focus:ring-2
                focus:ring-blue-500/30
                focus:border-blue-500
              "
            />
          </div>

          {/* FILTER */}
          <button
            type="button"
            onClick={() => setShowFilterModal(true)}
            className={`
              relative
              flex items-center justify-center gap-2
              px-4 py-2.5
              rounded-lg
              text-sm
              font-medium
              transition-all
              cursor-pointer
              ${
                isFiltersApplied
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : `
                    bg-white dark:bg-slate-900
                    text-blue-600 dark:text-blue-400
                    border border-blue-200 dark:border-blue-800
                    hover:bg-blue-50 dark:hover:bg-blue-950/40
                  `
              }
            `}
          >
            <Filter className="w-4 h-4" />

            <span>Filter</span>

            {isFiltersApplied && (
              <span
                className="
                  flex items-center justify-center
                  min-w-5 h-5
                  px-1
                  rounded-full
                  bg-white/20
                  text-xs
                  font-semibold
                "
              >
                {filteredCount}
              </span>
            )}
          </button>

          {/* ADD PAYMENT */}
          <button
            type="button"
            onClick={() => navigate("/add-new-payment")}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-4 py-2.5
              rounded-lg
              text-sm
              font-medium
              flex items-center justify-center gap-2
              transition-colors
              cursor-pointer
              whitespace-nowrap
            "
          >
            <Plus className="w-4 h-4" />

            <span>New Payment</span>
          </button>
        </div>
      </div>

      {/* FILTER STATUS */}
      {isFiltersApplied && (
        <div
          className="
            bg-blue-50 dark:bg-blue-950/30
            border border-blue-200 dark:border-blue-900
            text-blue-800 dark:text-blue-300
            rounded-lg
            px-4 py-3
            mb-6
            flex flex-col sm:flex-row
            sm:items-center
            sm:justify-between
            gap-2
            text-sm
          "
        >
          <span>
            Showing{" "}
            <strong>{filteredCount}</strong>{" "}
            filtered payments
          </span>

          <button
            type="button"
            onClick={handleClearFilters}
            className="
              font-semibold
              hover:underline
              cursor-pointer
              text-left sm:text-right
            "
          >
            Clear filters
          </button>
        </div>
      )}

      {/* TABLE */}
      <PaymentsTable
        search={search}
        expandedId={expandedId}
        setExpandedId={setExpandedId}
        filters={filters}
        setFilteredCount={setFilteredCount}
      />

      {/* FILTER MODAL */}
      <FilterPayments
        open={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={filters}
      />
    </div>
  );
};

export default AllPayment;