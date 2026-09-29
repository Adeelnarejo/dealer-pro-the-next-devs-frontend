import {
  Users,
  ArrowRight,
  ShieldCheck,
  UserRound,
  RefreshCw,
  AlertCircle,
  Clock3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRecentUsers } from "../../../hooks/useRecentUsers";
import {
  getProfileInitials,
  getRandomColor,
} from "../../../utils/profileUtils";

const RecentUsers = () => {
  const { users, loading, error } = useRecentUsers();
  const navigate = useNavigate();

  return (
    <div
      className="
        w-full
        rounded-[24px]
        border border-slate-200
        bg-white
        p-4 sm:p-5 lg:p-6
        shadow-[0_8px_30px_rgba(15,23,42,0.04)]
        transition-colors
        dark:border-slate-800
        dark:bg-[#0b1120]
        dark:shadow-none
        font-plus-jakarta
      "
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="
              flex h-11 w-11 shrink-0 items-center justify-center
              rounded-[14px]
              bg-blue-50
              text-blue-600
              dark:bg-blue-500/10
              dark:text-blue-400
            "
          >
            <Users className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-[17px] font-bold text-slate-900 dark:text-white sm:text-[19px]">
              Recent Users
            </h2>

            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
              Latest users and activity
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/users")}
          className="
            group
            flex shrink-0 items-center gap-1.5
            rounded-lg
            px-2.5 py-2
            text-xs font-semibold
            text-blue-600
            transition-all
            hover:bg-blue-50
            dark:text-blue-400
            dark:hover:bg-blue-500/10
            sm:text-sm
            cursor-pointer
          "
        >
          <span>View all</span>

          <ArrowRight
            className="
              h-4 w-4
              transition-transform
              group-hover:translate-x-0.5
            "
          />
        </button>
      </div>

      {/* Table */}
      <div
        className="
          overflow-hidden
          rounded-[16px]
          border border-slate-200
          dark:border-slate-800
        "
      >
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full min-w-[720px]">
            {/* Table Header */}
            <thead>
              <tr
                className="
                  border-b border-slate-200
                  bg-slate-50
                  dark:border-slate-800
                  dark:bg-slate-900/70
                "
              >
                <th className="px-4 py-3.5 text-left">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    User
                  </span>
                </th>

                <th className="px-4 py-3.5 text-left">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Role
                  </span>
                </th>

                <th className="px-4 py-3.5 text-left">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Status
                  </span>
                </th>

                <th className="px-4 py-3.5 text-left">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Last Login
                  </span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {/* Loading */}
              {loading &&
                [...Array(5)].map((_, index) => (
                  <tr key={`loading-${index}`}>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />

                        <div className="space-y-2">
                          <div className="h-3.5 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                          <div className="h-2.5 w-24 animate-pulse rounded bg-slate-100 dark:bg-slate-800/70" />
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <div className="h-3.5 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                    </td>

                    <td className="px-4 py-4">
                      <div className="h-6 w-16 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                    </td>

                    <td className="px-4 py-4">
                      <div className="h-3.5 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                    </td>
                  </tr>
                ))}

              {/* Error */}
              {!loading && error && (
                <tr>
                  <td colSpan={4} className="px-4 py-10">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div
                        className="
                          mb-3 flex h-12 w-12 items-center justify-center
                          rounded-full
                          bg-red-50
                          text-red-500
                          dark:bg-red-500/10
                          dark:text-red-400
                        "
                      >
                        <AlertCircle className="h-5 w-5" />
                      </div>

                      <p className="text-sm font-semibold text-slate-800 dark:text-white">
                        Unable to load users
                      </p>

                      <p className="mt-1 max-w-sm text-xs text-slate-500 dark:text-slate-400">
                        {error}
                      </p>

                      <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="
                          mt-4
                          flex items-center gap-2
                          rounded-lg
                          bg-blue-600
                          px-4 py-2
                          text-xs font-semibold text-white
                          transition
                          hover:bg-blue-700
                          cursor-pointer
                        "
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                        Try again
                      </button>
                    </div>
                  </td>
                </tr>
              )}

              {/* Empty */}
              {!loading && !error && users.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-12">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div
                        className="
                          mb-3 flex h-12 w-12 items-center justify-center
                          rounded-full
                          bg-slate-100
                          text-slate-400
                          dark:bg-slate-800
                          dark:text-slate-500
                        "
                      >
                        <UserRound className="h-5 w-5" />
                      </div>

                      <p className="text-sm font-semibold text-slate-800 dark:text-white">
                        No users found
                      </p>

                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Recently registered users will appear here.
                      </p>
                    </div>
                  </td>
                </tr>
              )}

              {/* Users */}
              {!loading &&
                !error &&
                users.map((user) => {
                  const fullName =
                    `${user.first || ""} ${user.last || ""}`.trim() ||
                    "Unknown User";

                  const initials = getProfileInitials(
                    user.first,
                    user.last
                  );

                  const color = getRandomColor(user.id);

                  return (
                    <tr
                      key={user.id}
                      className="
                        group
                        transition-colors
                        hover:bg-slate-50
                        dark:hover:bg-slate-900/60
                      "
                    >
                      {/* User */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="
                              flex h-10 w-10 shrink-0
                              items-center justify-center
                              rounded-full
                              text-xs font-bold text-white
                              shadow-sm
                              ring-2 ring-white
                              dark:ring-slate-900
                            "
                            style={{
                              backgroundColor: color,
                            }}
                          >
                            {initials}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                              {fullName}
                            </p>

                            <p className="mt-0.5 max-w-[220px] truncate text-xs text-slate-500 dark:text-slate-400">
                              {user.email || "No email available"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="
                              flex h-8 w-8 shrink-0 items-center justify-center
                              rounded-lg
                              bg-violet-50
                              text-violet-600
                              dark:bg-violet-500/10
                              dark:text-violet-400
                            "
                          >
                            <ShieldCheck className="h-3.5 w-3.5" />
                          </div>

                          <span className="text-sm font-medium capitalize text-slate-700 dark:text-slate-300">
                            {user.role || "N/A"}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <span
                          className={`
                            inline-flex items-center gap-1.5
                            rounded-full
                            px-2.5 py-1
                            text-[11px] font-bold
                            ${
                              user.active
                                ? `
                                  bg-emerald-50
                                  text-emerald-700
                                  dark:bg-emerald-500/10
                                  dark:text-emerald-400
                                `
                                : `
                                  bg-red-50
                                  text-red-700
                                  dark:bg-red-500/10
                                  dark:text-red-400
                                `
                            }
                          `}
                        >
                          <span
                            className={`
                              h-1.5 w-1.5 rounded-full
                              ${
                                user.active
                                  ? "bg-emerald-500"
                                  : "bg-red-500"
                              }
                            `}
                          />

                          {user.active ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* Last Login */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <Clock3 className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" />

                          <span className="whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                            {user.last_Login || "Never"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      {!loading && !error && users.length > 0 && (
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Showing {users.length} recent{" "}
            {users.length === 1 ? "user" : "users"}
          </p>

          <button
            type="button"
            onClick={() => navigate("/users")}
            className="
              flex items-center gap-1.5
              text-xs font-semibold
              text-blue-600
              transition-colors
              hover:text-blue-700
              dark:text-blue-400
              dark:hover:text-blue-300
              cursor-pointer
            "
          >
            Manage users
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentUsers;