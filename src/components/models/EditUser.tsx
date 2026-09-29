import React, { useState } from "react";
import {
  X,
  UserRound,
  Mail,
  Phone,
  LockKeyhole,
  ShieldCheck,
  BriefcaseBusiness,
  Eye,
  EyeOff,
  UserCog,
} from "lucide-react";
import { DropdownArrowIcon } from "../utils/Icons";

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  type: string;
  joined: string;
  status: string;
  phone?: string;
  password?: string;
}

interface EditUserProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
}

const EditUser: React.FC<EditUserProps> = ({
  open,
  onClose,
  user,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  if (!open || !user) return null;

  return (
    <div
      className="
        fixed inset-0 z-[999]
        flex justify-end
        bg-black/50
        backdrop-blur-sm
        font-plus-jakarta
      "
    >
      <div
        className="
          flex h-full w-full max-w-[540px]
          flex-col
          overflow-hidden
          border-l border-slate-200
          bg-white
          shadow-2xl
          animate-[drawerIn_.25s_ease-out]
          dark:border-slate-800
          dark:bg-[#0b1120]
        "
      >
        {/* Header */}
        <div
          className="
            shrink-0
            border-b border-slate-200
            bg-white/95
            px-5 py-5
            backdrop-blur
            dark:border-slate-800
            dark:bg-[#0b1120]/95
            sm:px-6
          "
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex h-11 w-11 shrink-0
                  items-center justify-center
                  rounded-xl
                  bg-blue-50
                  text-[#012F7A]
                  dark:bg-blue-500/10
                  dark:text-blue-400
                "
              >
                <UserCog className="h-5 w-5" />
              </div>

              <div>
                <h2
                  className="
                    text-lg font-bold
                    text-slate-900
                    dark:text-white
                  "
                >
                  Edit User
                </h2>

                <p
                  className="
                    mt-0.5 text-xs
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Update account details and permissions
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="
                flex h-9 w-9 shrink-0
                items-center justify-center
                rounded-lg
                text-slate-400
                transition-all
                hover:bg-slate-100
                hover:text-slate-700
                dark:hover:bg-slate-800
                dark:hover:text-white
              "
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* User Preview */}
          <div
            className="
              mt-5 flex items-center gap-3
              rounded-xl
              border border-slate-200
              bg-slate-50
              p-3
              dark:border-slate-800
              dark:bg-slate-900/60
            "
          >
            <div
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                overflow-hidden
                rounded-full
                bg-gradient-to-br
                from-blue-600
                to-blue-800
                text-sm font-bold
                text-white
              "
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                user.name.charAt(0).toUpperCase()
              )}
            </div>

            <div className="min-w-0">
              <p
                className="
                  truncate text-sm font-semibold
                  text-slate-900
                  dark:text-white
                "
              >
                {user.name}
              </p>

              <p
                className="
                  truncate text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >
                {user.email}
              </p>
            </div>

            <div className="ml-auto shrink-0">
              <span
                className="
                  rounded-full
                  bg-emerald-50
                  px-2.5 py-1
                  text-[10px] font-semibold
                  text-emerald-600
                  dark:bg-emerald-500/10
                  dark:text-emerald-400
                "
              >
                {user.status}
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          id="edit-user-form"
          className="
            scrollbar-hide
            flex-1
            overflow-y-auto
            px-5 py-5
            sm:px-6 sm:py-6
          "
        >
          {/* Account Information */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div
                className="
                  flex h-8 w-8
                  items-center justify-center
                  rounded-lg
                  bg-blue-50
                  text-blue-600
                  dark:bg-blue-500/10
                  dark:text-blue-400
                "
              >
                <UserRound className="h-4 w-4" />
              </div>

              <div>
                <h3
                  className="
                    text-sm font-semibold
                    text-slate-900
                    dark:text-white
                  "
                >
                  Account Information
                </h3>

                <p
                  className="
                    text-[11px]
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Basic information for this user
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label
                  className="
                    mb-2 block text-xs font-semibold
                    text-slate-700
                    dark:text-slate-300
                  "
                >
                  Full Name
                </label>

                <div className="relative">
                  <UserRound
                    className="
                      pointer-events-none
                      absolute left-3 top-1/2
                      h-4 w-4 -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    type="text"
                    defaultValue={user.name}
                    placeholder="Enter full name..."
                    className="
                      h-11 w-full
                      rounded-xl
                      border border-slate-200
                      bg-slate-50
                      pl-10 pr-3
                      text-sm
                      text-slate-900
                      outline-none
                      transition-all
                      placeholder:text-slate-400
                      focus:border-blue-500
                      focus:bg-white
                      focus:ring-4
                      focus:ring-blue-500/10
                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-white
                      dark:focus:border-blue-500
                      dark:focus:bg-slate-900
                    "
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  className="
                    mb-2 block text-xs font-semibold
                    text-slate-700
                    dark:text-slate-300
                  "
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    className="
                      pointer-events-none
                      absolute left-3 top-1/2
                      h-4 w-4 -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    type="email"
                    defaultValue={user.email}
                    placeholder="Enter email address..."
                    className="
                      h-11 w-full
                      rounded-xl
                      border border-slate-200
                      bg-slate-50
                      pl-10 pr-3
                      text-sm
                      text-slate-900
                      outline-none
                      transition-all
                      placeholder:text-slate-400
                      focus:border-blue-500
                      focus:bg-white
                      focus:ring-4
                      focus:ring-blue-500/10
                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-white
                      dark:focus:border-blue-500
                      dark:focus:bg-slate-900
                    "
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  className="
                    mb-2 block text-xs font-semibold
                    text-slate-700
                    dark:text-slate-300
                  "
                >
                  Phone Number
                </label>

                <div className="relative">
                  <Phone
                    className="
                      pointer-events-none
                      absolute left-3 top-1/2
                      h-4 w-4 -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    type="tel"
                    defaultValue={user.phone || ""}
                    placeholder="Enter phone number..."
                    className="
                      h-11 w-full
                      rounded-xl
                      border border-slate-200
                      bg-slate-50
                      pl-10 pr-3
                      text-sm
                      text-slate-900
                      outline-none
                      transition-all
                      placeholder:text-slate-400
                      focus:border-blue-500
                      focus:bg-white
                      focus:ring-4
                      focus:ring-blue-500/10
                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-white
                      dark:focus:border-blue-500
                      dark:focus:bg-slate-900
                    "
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  className="
                    mb-2 block text-xs font-semibold
                    text-slate-700
                    dark:text-slate-300
                  "
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    className="
                      pointer-events-none
                      absolute left-3 top-1/2
                      h-4 w-4 -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    defaultValue={user.password || ""}
                    placeholder="Enter new password..."
                    className="
                      h-11 w-full
                      rounded-xl
                      border border-slate-200
                      bg-slate-50
                      pl-10 pr-11
                      text-sm
                      text-slate-900
                      outline-none
                      transition-all
                      placeholder:text-slate-400
                      focus:border-blue-500
                      focus:bg-white
                      focus:ring-4
                      focus:ring-blue-500/10
                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-white
                      dark:focus:border-blue-500
                      dark:focus:bg-slate-900
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    className="
                      absolute right-2 top-1/2
                      flex h-8 w-8
                      -translate-y-1/2
                      items-center justify-center
                      rounded-lg
                      text-slate-400
                      transition
                      hover:bg-slate-200
                      hover:text-slate-700
                      dark:hover:bg-slate-800
                      dark:hover:text-white
                    "
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <p
                  className="
                    mt-1.5 text-[11px]
                    text-slate-400
                  "
                >
                  Leave unchanged if you do not want to
                  update the password.
                </p>
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div className="mt-7">
            <div className="mb-4 flex items-center gap-2">
              <div
                className="
                  flex h-8 w-8
                  items-center justify-center
                  rounded-lg
                  bg-indigo-50
                  text-indigo-600
                  dark:bg-indigo-500/10
                  dark:text-indigo-400
                "
              >
                <ShieldCheck className="h-4 w-4" />
              </div>

              <div>
                <h3
                  className="
                    text-sm font-semibold
                    text-slate-900
                    dark:text-white
                  "
                >
                  Access & Permissions
                </h3>

                <p
                  className="
                    text-[11px]
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Configure the user's access level
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* User Type */}
              <div>
                <label
                  className="
                    mb-2 block text-xs font-semibold
                    text-slate-700
                    dark:text-slate-300
                  "
                >
                  User Type
                </label>

                <div className="relative">
                  <BriefcaseBusiness
                    className="
                      pointer-events-none
                      absolute left-3 top-1/2
                      h-4 w-4 -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <select
                    defaultValue={user.type.toLowerCase()}
                    className="
                      h-11 w-full
                      appearance-none
                      rounded-xl
                      border border-slate-200
                      bg-slate-50
                      pl-10 pr-10
                      text-sm
                      text-slate-900
                      outline-none
                      transition-all
                      focus:border-blue-500
                      focus:bg-white
                      focus:ring-4
                      focus:ring-blue-500/10
                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-white
                      dark:focus:border-blue-500
                      dark:focus:bg-slate-900
                    "
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>

                  <div
                    className="
                      pointer-events-none
                      absolute inset-y-0 right-3
                      flex items-center
                    "
                  >
                    <DropdownArrowIcon
                      className="
                        h-4 w-4
                        text-slate-400
                      "
                    />
                  </div>
                </div>
              </div>

              {/* User Role */}
              <div>
                <label
                  className="
                    mb-2 block text-xs font-semibold
                    text-slate-700
                    dark:text-slate-300
                  "
                >
                  User Role
                </label>

                <div className="relative">
                  <UserCog
                    className="
                      pointer-events-none
                      absolute left-3 top-1/2
                      h-4 w-4 -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <select
                    defaultValue={user.role.toLowerCase()}
                    className="
                      h-11 w-full
                      appearance-none
                      rounded-xl
                      border border-slate-200
                      bg-slate-50
                      pl-10 pr-10
                      text-sm
                      text-slate-900
                      outline-none
                      transition-all
                      focus:border-blue-500
                      focus:bg-white
                      focus:ring-4
                      focus:ring-blue-500/10
                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-white
                      dark:focus:border-blue-500
                      dark:focus:bg-slate-900
                    "
                  >
                    <option value="">
                      Select User Role
                    </option>
                    <option value="manager">Manager</option>
                    <option value="sales">Sales</option>
                    <option value="support">Support</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>

                  <div
                    className="
                      pointer-events-none
                      absolute inset-y-0 right-3
                      flex items-center
                    "
                  >
                    <DropdownArrowIcon
                      className="
                        h-4 w-4
                        text-slate-400
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Note */}
          <div
            className="
              mt-7 flex items-start gap-3
              rounded-xl
              border border-blue-100
              bg-blue-50/70
              p-3.5
              dark:border-blue-500/20
              dark:bg-blue-500/5
            "
          >
            <div
              className="
                flex h-8 w-8 shrink-0
                items-center justify-center
                rounded-lg
                bg-white
                text-blue-600
                shadow-sm
                dark:bg-slate-800
                dark:text-blue-400
              "
            >
              <ShieldCheck className="h-4 w-4" />
            </div>

            <div>
              <p
                className="
                  text-xs font-semibold
                  text-blue-700
                  dark:text-blue-400
                "
              >
                Account security
              </p>

              <p
                className="
                  mt-0.5 text-[11px]
                  leading-5
                  text-blue-600/80
                  dark:text-blue-400/70
                "
              >
                Make sure the assigned role matches this
                user's responsibilities.
              </p>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div
          className="
            shrink-0
            border-t border-slate-200
            bg-white/95
            p-4
            backdrop-blur
            dark:border-slate-800
            dark:bg-[#0b1120]/95
            sm:p-5
          "
        >
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="
                w-full
                rounded-xl
                border border-slate-200
                bg-white
                px-5 py-3
                text-sm font-semibold
                text-slate-700
                transition-all
                hover:bg-slate-50
                active:scale-[0.98]
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-slate-200
                dark:hover:bg-slate-800
                sm:w-1/2
              "
            >
              Cancel
            </button>

            <button
              type="button"
              className="
                w-full
                rounded-xl
                bg-gradient-to-b
                from-[#1F7BF4]
                to-[#015DD6]
                px-5 py-3
                text-sm font-semibold
                text-white
                shadow-lg
                shadow-blue-500/20
                transition-all
                hover:from-[#176FE5]
                hover:to-[#0053C4]
                hover:shadow-blue-500/30
                active:scale-[0.98]
                sm:w-1/2
              "
            >
              Update User
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes drawerIn {
          from {
            opacity: 0;
            transform: translateX(24px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }

        select option {
          background: white;
          color: #0f172a;
        }

        @media (prefers-color-scheme: dark) {
          select option {
            background: #0f172a;
            color: white;
          }
        }
      `}</style>
    </div>
  );
};

export default EditUser;