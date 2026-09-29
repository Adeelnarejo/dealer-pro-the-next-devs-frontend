import React from "react";
import {
  X,
  ShieldCheck,
  UserPlus,
  FileText,
} from "lucide-react";

interface AddNewRoleProps {
  open: boolean;
  onClose: () => void;
}

const AddNewRole: React.FC<AddNewRoleProps> = ({
  open,
  onClose,
}) => {
  if (!open) return null;

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
          flex h-full w-full max-w-[520px]
          flex-col
          border-l border-slate-200
          bg-white
          shadow-2xl
          animate-[slideIn_.25s_ease-out]
          dark:border-slate-800
          dark:bg-[#0b1120]
        "
      >
        {/* Header */}
        <div
          className="
            flex items-center justify-between
            border-b border-slate-200
            px-5 py-4
            sm:px-6 sm:py-5
            dark:border-slate-800
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-11 w-11 shrink-0
                items-center justify-center
                rounded-xl
                bg-blue-50
                text-blue-600
                dark:bg-blue-500/10
                dark:text-blue-400
              "
            >
              <UserPlus className="h-5 w-5" />
            </div>

            <div>
              <h2
                className="
                  text-[17px] font-semibold
                  text-slate-900
                  dark:text-white
                "
              >
                Create New Role
              </h2>

              <p
                className="
                  mt-0.5 text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Add a new role to your team
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="
              flex h-9 w-9 items-center justify-center
              rounded-lg
              text-slate-400
              transition-all duration-200
              hover:bg-slate-100
              hover:text-slate-700
              dark:hover:bg-slate-800
              dark:hover:text-white
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Content */}
        <form
          className="
            scrollbar-hide
            flex-1 overflow-y-auto
            px-5 py-6
            sm:px-6
          "
        >
          {/* Role Information */}
          <div className="mb-7">
            <div className="mb-4 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-blue-500" />

              <div>
                <h3
                  className="
                    text-sm font-semibold
                    text-slate-900
                    dark:text-white
                  "
                >
                  Role Information
                </h3>

                <p
                  className="
                    mt-0.5 text-[11px]
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Define the basic details of this role
                </p>
              </div>
            </div>

            {/* Role Name */}
            <div className="mb-5">
              <label
                htmlFor="role-name"
                className="
                  mb-2 block text-xs font-semibold
                  text-slate-700
                  dark:text-slate-300
                "
              >
                Role Name
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                id="role-name"
                type="text"
                placeholder="Enter role name..."
                className="
                  w-full rounded-xl
                  border border-slate-200
                  bg-slate-50
                  px-4 py-3
                  text-sm text-slate-800
                  outline-none
                  transition-all duration-200
                  placeholder:text-slate-400
                  focus:border-blue-500
                  focus:ring-4 focus:ring-blue-500/10
                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-slate-200
                  dark:placeholder:text-slate-600
                "
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="role-description"
                className="
                  mb-2 block text-xs font-semibold
                  text-slate-700
                  dark:text-slate-300
                "
              >
                Description
              </label>

              <textarea
                id="role-description"
                placeholder="Describe the responsibilities and purpose of this role..."
                rows={6}
                className="
                  w-full resize-none rounded-xl
                  border border-slate-200
                  bg-slate-50
                  px-4 py-3
                  text-sm leading-6
                  text-slate-800
                  outline-none
                  transition-all duration-200
                  placeholder:text-slate-400
                  focus:border-blue-500
                  focus:ring-4 focus:ring-blue-500/10
                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-slate-200
                  dark:placeholder:text-slate-600
                "
              />
            </div>
          </div>

          {/* Permissions Preview */}
          <div
            className="
              rounded-xl
              border border-blue-100
              bg-blue-50/60
              p-4
              dark:border-blue-500/20
              dark:bg-blue-500/5
            "
          >
            <div className="flex items-start gap-3">
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
                <FileText className="h-4 w-4" />
              </div>

              <div>
                <p
                  className="
                    text-xs font-semibold
                    text-blue-700
                    dark:text-blue-400
                  "
                >
                  Role permissions
                </p>

                <p
                  className="
                    mt-1 text-[11px] leading-5
                    text-blue-600/80
                    dark:text-blue-400/70
                  "
                >
                  You can configure the permissions and access
                  levels for this role after creating it.
                </p>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div
          className="
            mt-auto
            border-t border-slate-200
            bg-white/95
            px-5 py-4
            backdrop-blur
            sm:px-6 sm:py-5
            dark:border-slate-800
            dark:bg-[#0b1120]/95
          "
        >
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="
                flex-1 rounded-xl
                border border-slate-200
                bg-white
                px-4 py-3
                text-sm font-semibold
                text-slate-700
                transition-all duration-200
                hover:bg-slate-50
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-slate-200
                dark:hover:bg-slate-800
              "
            >
              Cancel
            </button>

            <button
              type="button"
              className="
                flex-1 rounded-xl
                bg-[#012F7A]
                px-4 py-3
                text-sm font-semibold
                text-white
                shadow-lg shadow-blue-900/20
                transition-all duration-200
                hover:bg-blue-700
                hover:shadow-blue-600/30
                active:scale-[0.98]
              "
            >
              Create Role
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0.8;
          }

          to {
            transform: translateX(0);
            opacity: 1;
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
      `}</style>
    </div>
  );
};

export default AddNewRole;