import React, { useState, useEffect } from "react";
import {
  Trash2,
  Edit,
  ChevronDown,
  SearchX,
} from "lucide-react";

import DeletePopup from "../../models/DeletePopup";

import {
  ArrowLeftIcon,
  ArrowLeftDoubleIcon,
} from "../../utils/Icons";

import {
  makeGetRequest,
  makeDeleteRequest,
} from "../../../api/Api";

import toast from "react-hot-toast";

interface Customer {
  id: number;
  customerId: string;
  corpId: string;
  userId: string;
  name: string;
  telephone: string;
  email: string;
  address: string;
  type: string;
  status: string;
  numberOfOrders: number;
  totalSpent: number;
  latestPurchase: string | null;
  agreementType: string;
  socialSecurityNumber: string;
  createdAt: string;
  updatedAt: string;
  postalCode?: string;
  customerNumber?: string;
  location?: string;
}

interface CustomersTableProps {
  search: string;
  expandedId: number | null;
  setExpandedId: React.Dispatch<
    React.SetStateAction<number | null>
  >;
  filters: {
    type?: string;
    status?: string;
    fromDate?: string;
    toDate?: string;
    agreementType?: string;
  };
  setFilteredCount?: (count: number) => void;
}

const agreementColors: Record<string, string> = {
  Client:
    "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-300 dark:border-orange-900/40",

  Owner:
    "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-900/40",

  Agency:
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900/40",

  "N/A":
    "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
};

const statusColors: Record<string, string> = {
  Active:
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900/40",

  Inactive:
    "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-900/40",

  Pending:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900/40",
};

const CustomersTable: React.FC<CustomersTableProps> = ({
  search,
  expandedId,
  setExpandedId,
  filters,
  setFilteredCount,
}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [deletePopupId, setDeletePopupId] =
    useState<number | null>(null);

  const [deleteCustomerId, setDeleteCustomerId] =
    useState<string | null>(null);

  const [isDeleting, setIsDeleting] = useState(false);

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [stats, setStats] = useState({
    privateCustomers: 0,
    companyCustomers: 0,
    totalCustomers: 0,
    purchaseAgreements: 0,
    salesAgreements: 0,
    otherAgreements: 0,
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await makeGetRequest(
          "customer/getAllCustomers"
        );

        if (response.data && response.data.success) {
          setCustomers(response.data.data || []);

          setStats(
            response.data.stats || {
              privateCustomers: 0,
              companyCustomers: 0,
              totalCustomers: 0,
              purchaseAgreements: 0,
              salesAgreements: 0,
              otherAgreements: 0,
            }
          );
        } else {
          setError(
            response.data?.message ||
              "Failed to fetch customers"
          );
        }
      } catch (err) {
        setError(
          "An error occurred while fetching customers"
        );

        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const filtered = customers.filter((customer) => {
    const searchLower = search.toLowerCase();

    const searchMatch =
      (customer.name?.toLowerCase() || "").includes(
        searchLower
      ) ||
      (customer.email?.toLowerCase() || "").includes(
        searchLower
      ) ||
      (customer.address?.toLowerCase() || "").includes(
        searchLower
      ) ||
      (customer.telephone?.toLowerCase() || "").includes(
        searchLower
      );

    if (!searchMatch) return false;

    if (
      filters.type &&
      customer.type !== filters.type
    ) {
      return false;
    }

    if (
      filters.status &&
      customer.status !== filters.status
    ) {
      return false;
    }

    if (
      filters.agreementType &&
      customer.agreementType !==
        filters.agreementType
    ) {
      return false;
    }

    const customerDate = new Date(
      customer.createdAt
    );

    if (filters.fromDate) {
      const fromDate = new Date(filters.fromDate);

      if (customerDate < fromDate) return false;
    }

    if (filters.toDate) {
      const toDate = new Date(filters.toDate);

      toDate.setHours(23, 59, 59, 999);

      if (customerDate > toDate) return false;
    }

    return true;
  });

  useEffect(() => {
    setFilteredCount?.(filtered.length);
  }, [filtered.length, setFilteredCount]);

  const totalPages = Math.ceil(
    filtered.length / pageSize
  );

  const paginated = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handleExpand = (id: number) => {
    setExpandedId(
      expandedId === id ? null : id
    );
  };

  useEffect(() => {
    if (
      (page - 1) * pageSize >=
      filtered.length
    ) {
      setPage(1);
    }
  }, [page, pageSize, filtered.length]);

  const handlePageSizeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newPageSize = Number(e.target.value);

    setPageSize(newPageSize);
    setPage(1);
  };

  const handleDeleteCustomer = async () => {
    if (
      !deletePopupId ||
      !deleteCustomerId
    ) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await makeDeleteRequest(
        `customer/deleteCustomer/${deleteCustomerId}`
      );

      if (
        response.data &&
        response.data.success
      ) {
        const deletedCustomer = customers.find(
          (customer) =>
            customer.id === deletePopupId
        );

        setCustomers((prev) =>
          prev.filter(
            (customer) =>
              customer.id !== deletePopupId
          )
        );

        setStats((prev) => ({
          ...prev,
          totalCustomers:
            prev.totalCustomers - 1,

          privateCustomers:
            deletedCustomer?.type === "Private"
              ? prev.privateCustomers - 1
              : prev.privateCustomers,

          companyCustomers:
            deletedCustomer?.type === "Company"
              ? prev.companyCustomers - 1
              : prev.companyCustomers,
        }));

        toast.success(
          "Customer deleted successfully!"
        );

        setDeletePopupId(null);
        setDeleteCustomerId(null);
      } else {
        toast.error(
          response.data?.message ||
            "Failed to delete customer"
        );
      }
    } catch (err) {
      toast.error(
        "An error occurred while deleting the customer"
      );

      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteClick = (
    customerId: number,
    customerUuid: string
  ) => {
    setDeletePopupId(customerId);
    setDeleteCustomerId(customerUuid);
  };

  return (
    <>
      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      {deletePopupId !== null && (
        <DeletePopup
          entityName="Customer"
          onCancel={() => {
            setDeletePopupId(null);
            setDeleteCustomerId(null);
          }}
          onDelete={handleDeleteCustomer}
          isDeleting={isDeleting}
        />
      )}

      {/* =====================================================
          TABLE WRAPPER
      ===================================================== */}

      <div
        className="
          overflow-hidden
          rounded-2xl
          border border-slate-200
          bg-white
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        <div className="max-h-[500px] overflow-x-auto overflow-y-auto">
          <table className="min-w-[950px] w-full">
            {/* =================================================
                HEADER
            ================================================= */}

            <thead
              className="
                sticky top-0 z-10
                border-b border-slate-200
                bg-slate-50
                dark:border-slate-800
                dark:bg-slate-950
              "
            >
              <tr>
                <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Customer
                </th>

                <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Address
                </th>

                <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Phone
                </th>

                <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Date
                </th>

                <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Agreement
                </th>

                <th className="px-4 py-3.5 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
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
                <tr>
                  <td
                    colSpan={6}
                    className="py-14 text-center"
                  >
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div
                        className="
                          h-8 w-8 animate-spin
                          rounded-full
                          border-2
                          border-slate-200
                          border-t-blue-600
                          dark:border-slate-700
                          dark:border-t-blue-400
                        "
                      />

                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        Loading customers...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                /* Error */
                <tr>
                  <td
                    colSpan={6}
                    className="py-14 text-center"
                  >
                    <div className="mx-auto max-w-sm">
                      <p className="text-sm font-medium text-red-500 dark:text-red-400">
                        {error}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                /* Empty */
                <tr>
                  <td
                    colSpan={6}
                    className="py-14 text-center"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div
                        className="
                          mb-3 flex h-12 w-12
                          items-center justify-center
                          rounded-full
                          bg-slate-100
                          text-slate-400
                          dark:bg-slate-800
                          dark:text-slate-500
                        "
                      >
                        <SearchX size={21} />
                      </div>

                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                        No customers found
                      </p>

                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Try changing your search or filters.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((customer) => (
                  <React.Fragment key={customer.id}>
                    {/* =================================================
                        CUSTOMER ROW
                    ================================================= */}

                    <tr
                      className={`
                        group
                        transition-colors duration-200
                        ${
                          expandedId === customer.id
                            ? "bg-blue-50/60 dark:bg-blue-950/20"
                            : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        }
                      `}
                    >
                      {/* Customer */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              handleExpand(customer.id)
                            }
                            className="
                              flex h-7 w-7 shrink-0
                              items-center justify-center
                              rounded-lg
                              text-slate-400
                              transition-all duration-200
                              hover:bg-slate-200
                              hover:text-slate-700
                              dark:hover:bg-slate-700
                              dark:hover:text-slate-200
                              cursor-pointer
                            "
                          >
                            <ChevronDown
                              size={15}
                              className={`
                                transition-transform duration-200
                                ${
                                  expandedId ===
                                  customer.id
                                    ? "rotate-180"
                                    : ""
                                }
                              `}
                            />
                          </button>

                          <div
                            className="
                              flex h-10 w-10 shrink-0
                              items-center justify-center
                              rounded-full
                              bg-gradient-to-br
                              from-blue-500
                              to-indigo-600
                              text-xs font-bold text-white
                              shadow-sm
                            "
                          >
                            {customer.name
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase() ||
                              "NA"}
                          </div>

                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                              {customer.name || "N/A"}
                            </div>

                            <div className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                              {customer.email || "N/A"}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Address */}
                      <td className="max-w-[220px] px-4 py-4">
                        <span className="block truncate text-sm text-slate-600 dark:text-slate-300">
                          {customer.address || "N/A"}
                        </span>
                      </td>

                      {/* Phone */}
                      <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-300">
                        {customer.telephone || "N/A"}
                      </td>

                      {/* Date */}
                      <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-300">
                        {customer.latestPurchase || "N/A"}
                      </td>

                      {/* Agreement */}
                      <td className="px-4 py-4">
                        <span
                          className={`
                            inline-flex
                            rounded-full
                            border
                            px-2.5 py-1
                            text-[11px]
                            font-semibold
                            ${
                              agreementColors[
                                customer.agreementType
                              ] ||
                              agreementColors["N/A"]
                            }
                          `}
                        >
                          {customer.agreementType ||
                            "N/A"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4 text-center">
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteClick(
                              customer.id,
                              customer.customerId
                            )
                          }
                          className="
                            inline-flex h-9 w-9
                            items-center justify-center
                            rounded-lg
                            text-red-500
                            transition-all duration-200
                            hover:bg-red-50
                            hover:text-red-600
                            dark:text-red-400
                            dark:hover:bg-red-950/30
                            dark:hover:text-red-300
                            cursor-pointer
                          "
                          title="Delete customer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>

                    {/* =================================================
                        EXPANDED DETAILS
                    ================================================= */}

                    {expandedId === customer.id && (
                      <tr>
                        <td
                          colSpan={6}
                          className="
                            border-t
                            border-slate-200
                            bg-slate-50/70
                            px-4 py-5
                            dark:border-slate-800
                            dark:bg-slate-950/60
                          "
                        >
                          <div
                            className="
                              rounded-xl
                              border
                              border-slate-200
                              bg-white
                              p-5
                              dark:border-slate-800
                              dark:bg-slate-900
                            "
                          >
                            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                  Customer Information
                                </h3>

                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                  Detailed customer information
                                </p>
                              </div>

                              <button
                                type="button"
                                className="
                                  inline-flex items-center
                                  justify-center gap-2
                                  rounded-lg
                                  border border-blue-200
                                  bg-blue-50
                                  px-3.5 py-2
                                  text-xs font-semibold
                                  text-blue-600
                                  transition-colors
                                  hover:bg-blue-100

                                  dark:border-blue-900/50
                                  dark:bg-blue-950/30
                                  dark:text-blue-400
                                  dark:hover:bg-blue-950/50
                                "
                              >
                                <Edit size={14} />
                                Edit Customer
                              </button>
                            </div>

                            <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
                              <InfoItem
                                label="Customer Name"
                                value={customer.name}
                              />

                              <InfoItem
                                label="Customer Number"
                                value={customer.customerNumber}
                              />

                              <InfoItem
                                label="Customer Type"
                                value={customer.type}
                              />

                              <InfoItem
                                label="Email"
                                value={customer.email}
                              />

                              <InfoItem
                                label="Phone"
                                value={customer.telephone}
                              />

                              <InfoItem
                                label="Address"
                                value={customer.address}
                              />

                              <InfoItem
                                label="SSN"
                                value={
                                  customer.socialSecurityNumber
                                }
                              />

                              <InfoItem
                                label="Postal Code"
                                value={customer.postalCode}
                              />

                              <InfoItem
                                label="Location"
                                value={customer.location}
                              />

                              <InfoItem
                                label="Latest Purchase"
                                value={
                                  customer.latestPurchase
                                }
                              />

                              <InfoItem
                                label="Agreement"
                                value={
                                  customer.agreementType
                                }
                              />

                              <div>
                                <p className="mb-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                                  Status
                                </p>

                                <span
                                  className={`
                                    inline-flex
                                    rounded-full
                                    border
                                    px-2.5 py-1
                                    text-[11px]
                                    font-semibold
                                    ${
                                      statusColors[
                                        customer.status
                                      ] ||
                                      statusColors.Active
                                    }
                                  `}
                                >
                                  {customer.status ||
                                    "N/A"}
                                </span>
                              </div>

                              <InfoItem
                                label="Total Orders"
                                value={
                                  customer.numberOfOrders
                                    ?.toString()
                                }
                              />

                              <InfoItem
                                label="Total Spent"
                                value={
                                  customer.totalSpent
                                    ? `${customer.totalSpent.toLocaleString()} kr`
                                    : "N/A"
                                }
                              />
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
      </div>

      {/* =====================================================
          PAGINATION
      ===================================================== */}

      {!isLoading &&
        !error &&
        filtered.length > 0 && (
          <div
            className="
              mt-5
              flex flex-col gap-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <span>Show</span>

              <select
                value={pageSize}
                onChange={handlePageSizeChange}
                className="
                  rounded-lg
                  border border-slate-200
                  bg-white
                  px-2 py-1.5
                  text-xs text-slate-700
                  outline-none
                  focus:border-blue-500
                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-slate-200
                "
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>

              <span>
                of {filtered.length} customers
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() =>
                  setPage((p) => Math.max(1, p - 1))
                }
                disabled={page === 1}
                className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-lg
                  border border-slate-200
                  bg-white
                  text-slate-600
                  transition-colors
                  hover:bg-slate-50
                  disabled:cursor-not-allowed
                  disabled:opacity-40

                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-slate-300
                  dark:hover:bg-slate-800
                "
              >
                <ArrowLeftIcon className="h-3 w-2" />
              </button>

              {[...Array(Math.min(5, totalPages)).keys()].map(
                (i) => {
                  let pageNum = i + 1;

                  if (
                    page > 3 &&
                    totalPages > 5
                  ) {
                    pageNum =
                      page - 2 + i;
                  }

                  if (
                    pageNum < 1 ||
                    pageNum > totalPages
                  ) {
                    return null;
                  }

                  return (
                    <button
                      type="button"
                      key={pageNum}
                      onClick={() =>
                        setPage(pageNum)
                      }
                      className={`
                        flex h-9 min-w-9
                        items-center justify-center
                        rounded-lg
                        border
                        px-2
                        text-xs font-semibold
                        transition-colors
                        ${
                          page === pageNum
                            ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                        }
                      `}
                    >
                      {pageNum}
                    </button>
                  );
                }
              )}

              {totalPages > 5 &&
                page < totalPages - 2 && (
                  <span className="px-1 text-slate-400">
                    ...
                  </span>
                )}

              {totalPages > 1 &&
                page < totalPages - 1 &&
                totalPages > 5 && (
                  <button
                    type="button"
                    onClick={() =>
                      setPage(totalPages)
                    }
                    className="
                      flex h-9 min-w-9
                      items-center justify-center
                      rounded-lg
                      border
                      border-slate-200
                      bg-white
                      px-2
                      text-xs font-semibold
                      text-slate-600
                      hover:bg-slate-50

                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-slate-300
                      dark:hover:bg-slate-800
                    "
                  >
                    {totalPages}
                  </button>
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
                  flex h-9 w-9
                  items-center justify-center
                  rounded-lg
                  border border-slate-200
                  bg-white
                  text-slate-600
                  transition-colors
                  hover:bg-slate-50
                  disabled:cursor-not-allowed
                  disabled:opacity-40

                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-slate-300
                  dark:hover:bg-slate-800
                "
              >
                <ArrowLeftDoubleIcon className="h-3 w-2 rotate-180" />
              </button>
            </div>
          </div>
        )}
    </>
  );
};

/* =========================================================
   INFO ITEM
========================================================= */

interface InfoItemProps {
  label: string;
  value?: string | null;
}

const InfoItem: React.FC<InfoItemProps> = ({
  label,
  value,
}) => {
  return (
    <div className="min-w-0">
      <p className="mb-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
        {label}
      </p>

      <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
        {value || "N/A"}
      </p>
    </div>
  );
};

export default CustomersTable;