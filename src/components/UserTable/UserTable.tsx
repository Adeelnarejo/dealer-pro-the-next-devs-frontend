import React, { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Pencil,
  Trash2,
  Users,
  UserPlus,
  Search,
  Mail,
  ShieldCheck,
  CalendarDays,
  RefreshCw,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { makeGetRequest } from "../../api/Api";
import {
  PaginationLeftIcon,
  PaginationRightIcon,
} from "../utils/Icons";
import DeletePopup from "../models/DeletePopup";
import toast from "react-hot-toast";

interface User {
  id: number;
  first: string;
  last: string;
  email: string;
  type: string;
  active: boolean;
  name?: string;
  role?: string;
  avatar?: string;
  joined?: string;
  status?: string;
}

const statusColors: Record<string, string> = {
  Active:
    "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
  Inactive:
    "bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
};

const UserTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const [users, setUsers] = useState<User[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [addUserOpen, setAddUserOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [deletePopupId, setDeletePopupId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await makeGetRequest(
          `user/getAllUsers?page=${page}&limit=${pageSize}`
        );

        if (response.data.success) {
          const transformedUsers = response.data.data.map(
            (user: User) => ({
              ...user,
              name: `${user.first} ${user.last}`,
              role: user.type,
              avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
                `${user.first} ${user.last}`
              )}&background=0f172a&color=ffffff`,
              joined: new Date().toISOString(),
              status: user.active ? "Active" : "Inactive",
            })
          );

          setUsers(transformedUsers);
          setTotalItems(response.data.totalItems);
        } else {
          if (response.data.message === "User corporation not found") {
            setError(
              "You need to be assigned to a corporation to view users"
            );
            toast.error("You're not assigned to any corporation");
          } else {
            setError(
              response.data.message || "Failed to fetch users"
            );
          }
        }
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message ||
          "An error occurred while fetching users";

        setError(errorMessage);

        if (err.response?.status === 401) {
          toast.error("Please login to access this resource");
        } else {
          toast.error(errorMessage);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [page, pageSize]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return users;

    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query) ||
        u.role?.toLowerCase().includes(query) ||
        u.type.toLowerCase().includes(query) ||
        u.status?.toLowerCase().includes(query)
    );
  }, [users, search]);

  const totalPages = Math.ceil(totalItems / pageSize);

  const paginated = filtered.slice(0, pageSize);

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  ).length;

  const handlePageSizeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newPageSize = Number(e.target.value);

    setPageSize(newPageSize);
    setPage(1);
  };

  const handleDeleteUser = async () => {
    if (deletePopupId === null) return;

    try {
      // TODO: Implement actual delete API call
      // await makeDeleteRequest(`/users/${deletePopupId}`);

      setUsers((currentUsers) =>
        currentUsers.filter((user) => user.id !== deletePopupId)
      );

      setTotalItems((current) => Math.max(0, current - 1));

      toast.success("User deleted successfully");
      setDeletePopupId(null);
    } catch (err) {
      toast.error("Failed to delete user");
      console.error("Delete error:", err);
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <>
      {deletePopupId !== null && (
        <DeletePopup
          entityName="User"
          onCancel={() => setDeletePopupId(null)}
          onDelete={handleDeleteUser}
        />
      )}

      <div className="w-full font-plus-jakarta">
        {/* =========================================================
            MAIN CONTAINER
        ========================================================= */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1120]">
          {/* =======================================================
              HEADER
          ======================================================= */}
          <div className="border-b border-slate-200 px-4 py-5 sm:px-6 lg:px-7 dark:border-slate-800">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <Users className="h-6 w-6" />
                </div>

                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
                    User Management
                  </h2>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Manage users, roles, access, and account status.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setAddUserOpen(true)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#012F7A] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-[0.98] sm:w-auto"
              >
                <UserPlus className="h-4 w-4" />
                Add New User
              </button>
            </div>
          </div>

          {/* =======================================================
              SUMMARY CARDS
          ======================================================= */}
          <div className="grid grid-cols-1 gap-3 border-b border-slate-200 p-4 sm:grid-cols-3 sm:p-5 lg:p-6 dark:border-slate-800">
            {/* Total */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Total Users
                  </p>

                  <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                    {totalItems}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <Users className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Active */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Active
                  </p>

                  <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                    {activeUsers}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Inactive */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Inactive
                  </p>

                  <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                    {inactiveUsers}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                  <Users className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>

          {/* =======================================================
              TABLE SECTION
          ======================================================= */}
          <div className="p-4 sm:p-5 lg:p-6">
            {/* Section Header */}
            <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                  All Users
                </h3>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
                  View and manage all registered users.
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full lg:w-[320px]">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  placeholder="Search users..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500 dark:focus:bg-slate-900"
                />
              </div>
            </div>

            {/* =====================================================
                DESKTOP TABLE
            ===================================================== */}
            <div className="hidden overflow-hidden rounded-xl border border-slate-200 md:block dark:border-slate-800">
              <div className="overflow-x-auto">
                <table className="min-w-[900px] w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/80">
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        User
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Role
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Type
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Joined
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Status
                      </th>

                      <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-[#0b1120]">
                    {isLoading ? (
                      <tr>
                        <td colSpan={6} className="py-16">
                          <div className="flex flex-col items-center justify-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-500/10">
                              <Loader2 className="h-5 w-5 animate-spin text-blue-600 dark:text-blue-400" />
                            </div>

                            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                              Loading users...
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td colSpan={6} className="py-16">
                          <div className="mx-auto flex max-w-md flex-col items-center justify-center px-5 text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400">
                              <AlertCircle className="h-5 w-5" />
                            </div>

                            <p className="mt-4 text-sm font-semibold text-slate-800 dark:text-white">
                              Unable to load users
                            </p>

                            <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                              {error}
                            </p>

                            {error.includes("corporation") && (
                              <button
                                type="button"
                                onClick={handleRetry}
                                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                              >
                                <RefreshCw className="h-4 w-4" />
                                Try Again
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ) : paginated.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-16">
                          <div className="flex flex-col items-center justify-center text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                              <Users className="h-5 w-5" />
                            </div>

                            <p className="mt-4 text-sm font-semibold text-slate-800 dark:text-white">
                              {search
                                ? "No matching users found"
                                : "No users available"}
                            </p>

                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                              {search
                                ? "Try a different search term."
                                : "Users will appear here once they are added."}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      paginated.map((user) => (
                        <tr
                          key={user.id}
                          className="group transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-900/60"
                        >
                          {/* User */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="h-10 w-10 rounded-full border border-slate-200 object-cover shadow-sm dark:border-slate-700"
                              />

                              <div className="min-w-0">
                                <div className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                                  {user.name}
                                </div>

                                <div className="mt-0.5 flex items-center gap-1.5 truncate text-xs text-slate-500 dark:text-slate-400">
                                  <Mail className="h-3 w-3 shrink-0" />
                                  <span className="truncate">
                                    {user.email}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Role */}
                          <td className="px-5 py-4">
                            <span className="inline-flex items-center rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                              {user.role || "User"}
                            </span>
                          </td>

                          {/* Type */}
                          <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                            {user.type}
                          </td>

                          {/* Joined */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                              <CalendarDays className="h-4 w-4 text-slate-400" />

                              {new Date(
                                user.joined || new Date()
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                                statusColors[
                                  user.status || "Inactive"
                                ] ||
                                "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  user.status === "Active"
                                    ? "bg-emerald-500"
                                    : "bg-slate-400"
                                }`}
                              />

                              {user.status}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="px-5 py-4">
                            <div className="flex justify-end gap-1">
                              <button
                                type="button"
                                title="Edit user"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setEditUserOpen(true);
                                }}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-all hover:bg-blue-50 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                              >
                                <Pencil className="h-4 w-4" />
                              </button>

                              <button
                                type="button"
                                title="Delete user"
                                onClick={() =>
                                  setDeletePopupId(user.id)
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-all hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* =====================================================
                MOBILE USER CARDS
            ===================================================== */}
            <div className="space-y-3 md:hidden">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 py-14 dark:border-slate-800">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-600 dark:text-blue-400" />

                  <p className="mt-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                    Loading users...
                  </p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50/50 px-5 py-12 text-center dark:border-red-500/20 dark:bg-red-500/5">
                  <AlertCircle className="h-6 w-6 text-red-500" />

                  <p className="mt-3 text-sm font-semibold text-slate-800 dark:text-white">
                    Unable to load users
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    {error}
                  </p>

                  {error.includes("corporation") && (
                    <button
                      type="button"
                      onClick={handleRetry}
                      className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Try Again
                    </button>
                  )}
                </div>
              ) : paginated.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 py-14 text-center dark:border-slate-800">
                  <Users className="h-6 w-6 text-slate-400" />

                  <p className="mt-3 text-sm font-semibold text-slate-800 dark:text-white">
                    {search
                      ? "No matching users found"
                      : "No users available"}
                  </p>
                </div>
              ) : (
                paginated.map((user) => (
                  <div
                    key={user.id}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-11 w-11 shrink-0 rounded-full border border-slate-200 object-cover dark:border-slate-700"
                        />

                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                            {user.name}
                          </p>

                          <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                          statusColors[user.status || "Inactive"] ||
                          "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            user.status === "Active"
                              ? "bg-emerald-500"
                              : "bg-slate-400"
                          }`}
                        />
                        {user.status}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          Role
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-700 dark:text-slate-200">
                          {user.role || "User"}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          Type
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-700 dark:text-slate-200">
                          {user.type}
                        </p>
                      </div>

                      <div className="col-span-2">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          Joined
                        </p>

                        <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
                          <CalendarDays className="h-3.5 w-3.5 text-slate-400" />

                          {new Date(
                            user.joined || new Date()
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedUser(user);
                          setEditUserOpen(true);
                        }}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeletePopupId(user.id)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-100 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-500/20 dark:text-red-400 dark:hover:bg-red-500/10"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* =====================================================
                PAGINATION
            ===================================================== */}
            <div className="mt-5 flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
              {/* Page size */}
              <div className="flex items-center gap-2 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
                <span>Show</span>

                <div className="relative">
                  <select
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    className="h-9 appearance-none rounded-lg border border-slate-200 bg-white py-1 pl-3 pr-8 text-xs font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  >
                    <option value={8}>8</option>
                    <option value={16}>16</option>
                    <option value={24}>24</option>
                    <option value={32}>32</option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                </div>

                <span>
                  of{" "}
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {totalItems}
                  </span>{" "}
                  users
                </span>
              </div>

              {/* Pagination */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1">
                <button
                  type="button"
                  onClick={() =>
                    setPage((p) => Math.max(1, p - 1))
                  }
                  disabled={page === 1 || isLoading}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  <PaginationLeftIcon />
                </button>

                {totalPages > 0 &&
                  [...Array(Math.min(7, totalPages))].map(
                    (_, i) => {
                      const pageNum = i + 1;

                      return (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => setPage(pageNum)}
                          disabled={isLoading}
                          className={`flex h-9 min-w-9 shrink-0 items-center justify-center rounded-lg border px-2 text-xs font-semibold transition ${
                            page === pageNum
                              ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                              : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                          } disabled:cursor-not-allowed disabled:opacity-50`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                  )}

                {totalPages > 7 && (
                  <>
                    <span className="px-1 text-xs text-slate-400">
                      ...
                    </span>

                    <button
                      type="button"
                      onClick={() => setPage(totalPages)}
                      disabled={isLoading}
                      className={`flex h-9 min-w-9 shrink-0 items-center justify-center rounded-lg border px-2 text-xs font-semibold transition ${
                        page === totalPages
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                      } disabled:cursor-not-allowed disabled:opacity-50`}
                    >
                      {totalPages}
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() =>
                    setPage((p) =>
                      Math.min(totalPages, p + 1)
                    )
                  }
                  disabled={
                    page === totalPages ||
                    isLoading ||
                    totalPages === 0
                  }
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  <PaginationRightIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserTable;