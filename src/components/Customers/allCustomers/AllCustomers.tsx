import { useState } from "react";
import { Search, Filter, Users, X, Plus } from "lucide-react";
import CustomersTable from "../customersTable/CustomersTable";
import AddNewCustomer from "../../models/AddNewCustomer";
import FilterCustomer from "../../models/FilterCustomer";

interface Customer {
  id: number;
  name: string;
}

interface CustomerFilters {
  type?: string;
  status?: string;
  fromDate?: string;
  toDate?: string;
  agreementType?: string;
}

const initialFilterState: CustomerFilters = {
  type: "",
  fromDate: "",
  toDate: "",
};

const AllCustomers = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filters, setFilters] = useState<CustomerFilters>({});
  const [filteredCount, setFilteredCount] = useState(0);

  const handleCustomerCreated = (newCustomer: Customer) => {
    setCustomers((prev) => [...prev, newCustomer]);
  };

  const handleApplyFilters = (newFilters: CustomerFilters) => {
    setFilters(newFilters);
    setShowFilterModal(false);
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
        border border-slate-200
        bg-white
        p-4 sm:p-5 lg:p-6
        shadow-sm
        transition-colors duration-300
        dark:border-slate-800
        dark:bg-slate-900
        dark:shadow-black/20
        font-plus-jakarta
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-6 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-11 w-11 shrink-0 items-center justify-center
              rounded-xl bg-blue-50 text-blue-600
              dark:bg-blue-950/40 dark:text-blue-400
            "
          >
            <Users size={21} />
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Customers
            </h2>

            <p className="mt-0.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Manage and view all your customers
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-auto">
          {/* Search */}
          <div className="relative w-full sm:min-w-[260px] sm:max-w-[340px]">
            <Search
              className="
                pointer-events-none absolute left-3.5 top-1/2
                h-4 w-4 -translate-y-1/2
                text-slate-400 dark:text-slate-500
              "
            />

            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                h-11 w-full rounded-xl
                border border-slate-200
                bg-slate-50
                pl-10 pr-4
                text-sm text-slate-900
                placeholder:text-slate-400
                outline-none
                transition-all duration-200
                focus:border-blue-500
                focus:bg-white
                focus:ring-4 focus:ring-blue-500/10

                dark:border-slate-700
                dark:bg-slate-950
                dark:text-white
                dark:placeholder:text-slate-500
                dark:focus:border-blue-500
                dark:focus:bg-slate-950
              "
            />
          </div>

          {/* Filter */}
          <button
            type="button"
            onClick={() => setShowFilterModal(true)}
            className={`
              relative flex h-11 items-center justify-center gap-2
              rounded-xl px-4
              text-sm font-semibold
              transition-all duration-200
              cursor-pointer
              ${
                isFiltersApplied
                  ? `
                    bg-blue-600 text-white
                    shadow-sm shadow-blue-600/20
                    hover:bg-blue-700
                  `
                  : `
                    border border-slate-200
                    bg-white text-slate-700
                    hover:border-blue-300
                    hover:bg-blue-50
                    hover:text-blue-600

                    dark:border-slate-700
                    dark:bg-slate-950
                    dark:text-slate-200
                    dark:hover:border-blue-700
                    dark:hover:bg-blue-950/30
                    dark:hover:text-blue-400
                  `
              }
            `}
            title="Filter customers"
          >
            <Filter size={16} />

            <span>Filters</span>

            {isFiltersApplied && (
              <span
                className="
                  flex h-5 min-w-5 items-center justify-center
                  rounded-full bg-white/20 px-1
                  text-[10px] font-bold text-white
                "
              >
                {filteredCount}
              </span>
            )}
          </button>

          {/* Add Customer */}
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="
              flex h-11 items-center justify-center gap-2
              rounded-xl bg-blue-600 px-4
              text-sm font-semibold text-white
              shadow-sm shadow-blue-600/20
              transition-all duration-200
              hover:bg-blue-700
              hover:shadow-md
              cursor-pointer
            "
          >
            <Plus size={17} />
            <span>New Customer</span>
          </button>
        </div>
      </div>

      {/* =====================================================
          ACTIVE FILTER BAR
      ===================================================== */}

      {isFiltersApplied && (
        <div
          className="
            mb-6 flex flex-col gap-3
            rounded-xl border
            border-blue-100
            bg-blue-50/70
            px-4 py-3
            sm:flex-row sm:items-center sm:justify-between

            dark:border-blue-900/40
            dark:bg-blue-950/20
          "
        >
          <div className="flex items-center gap-2 text-sm text-blue-800 dark:text-blue-300">
            <Filter size={15} />

            <span>
              Showing{" "}
              <strong className="font-bold">
                {filteredCount}
              </strong>{" "}
              filtered customers
            </span>
          </div>

          <button
            type="button"
            onClick={handleClearFilters}
            className="
              flex items-center gap-1.5
              text-sm font-semibold
              text-blue-700
              hover:text-blue-900
              hover:underline
              dark:text-blue-400
              dark:hover:text-blue-300
              cursor-pointer
            "
          >
            <X size={14} />
            Clear filters
          </button>
        </div>
      )}

      {/* =====================================================
          TABLE
      ===================================================== */}

      <CustomersTable
        search={search}
        expandedId={expandedId}
        setExpandedId={setExpandedId}
        filters={filters}
        setFilteredCount={setFilteredCount}
      />

      {/* =====================================================
          MODALS
      ===================================================== */}

      <AddNewCustomer
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onCustomerCreated={handleCustomerCreated}
      />

      <FilterCustomer
        open={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={filters}
      />
    </div>
  );
};

export default AllCustomers;