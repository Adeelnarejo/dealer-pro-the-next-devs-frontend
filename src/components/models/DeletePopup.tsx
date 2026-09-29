import React from "react";
import {
  Trash2,
  X,
  AlertTriangle,
  ShieldAlert,
  Loader2,
} from "lucide-react";

interface DeletePopupProps {
  entityName?: string;
  onCancel: () => void;
  onDelete: () => void;
  onClose?: () => void;
  isDeleting?: boolean;
}

const DeletePopup: React.FC<DeletePopupProps> = ({
  entityName = "Item",
  onCancel,
  onDelete,
  onClose,
  isDeleting = false,
}) => {
  const title = `Delete ${entityName}`;
  const description = `Are you sure you want to delete this ${entityName.toLowerCase()}? This action cannot be undone.`;

  const handleClose = () => {
    if (isDeleting) return;
    (onClose || onCancel)();
  };

  return (
    <div
      className="
        fixed inset-0 z-[999]
        flex items-center justify-center
        bg-black/50
        px-4 py-5
        backdrop-blur-sm
        font-plus-jakarta
      "
    >
      <div
        className="
          relative w-full max-w-[430px]
          overflow-hidden
          rounded-2xl
          border border-slate-200
          bg-white
          shadow-2xl
          animate-[deleteModalIn_.22s_ease-out]
          dark:border-slate-800
          dark:bg-[#0b1120]
        "
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          disabled={isDeleting}
          aria-label="Close"
          className="
            absolute right-4 top-4
            z-10
            flex h-9 w-9
            items-center justify-center
            rounded-lg
            text-slate-400
            transition-all duration-200
            hover:bg-slate-100
            hover:text-slate-700
            disabled:cursor-not-allowed
            disabled:opacity-40
            dark:hover:bg-slate-800
            dark:hover:text-white
          "
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="px-5 pb-5 pt-8 sm:px-7 sm:pb-7 sm:pt-9">
          {/* Warning Icon */}
          <div className="flex justify-center">
            <div
              className="
                relative flex h-[76px] w-[76px]
                items-center justify-center
                rounded-full
                bg-red-50
                ring-8 ring-red-50/50
                dark:bg-red-500/10
                dark:ring-red-500/5
              "
            >
              <div
                className="
                  flex h-14 w-14
                  items-center justify-center
                  rounded-full
                  bg-red-100
                  text-red-600
                  dark:bg-red-500/15
                  dark:text-red-400
                "
              >
                <Trash2 className="h-7 w-7" />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="mt-6 text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />

              <h2
                className="
                  text-lg font-bold
                  text-slate-900
                  dark:text-white
                  sm:text-xl
                "
              >
                {title}
              </h2>

              <AlertTriangle className="h-4 w-4 text-red-500" />
            </div>

            <p
              className="
                mx-auto max-w-[340px]
                text-sm leading-6
                text-slate-500
                dark:text-slate-400
              "
            >
              {description}
            </p>
          </div>

          {/* Warning Info */}
          <div
            className="
              mt-5 flex items-start gap-3
              rounded-xl
              border border-red-100
              bg-red-50/70
              p-3.5
              text-left
              dark:border-red-500/20
              dark:bg-red-500/5
            "
          >
            <div
              className="
                flex h-8 w-8 shrink-0
                items-center justify-center
                rounded-lg
                bg-white
                text-red-500
                shadow-sm
                dark:bg-slate-800
                dark:text-red-400
              "
            >
              <ShieldAlert className="h-4 w-4" />
            </div>

            <div>
              <p
                className="
                  text-xs font-semibold
                  text-red-700
                  dark:text-red-400
                "
              >
                Permanent action
              </p>

              <p
                className="
                  mt-0.5 text-[11px]
                  leading-5
                  text-red-600/80
                  dark:text-red-400/70
                "
              >
                This data will be permanently removed and
                cannot be recovered after deletion.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onCancel}
              disabled={isDeleting}
              className="
                w-full
                rounded-xl
                border border-slate-200
                bg-white
                px-5 py-3
                text-sm font-semibold
                text-slate-700
                transition-all duration-200
                hover:bg-slate-50
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-40
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
              onClick={onDelete}
              disabled={isDeleting}
              className="
                flex w-full
                items-center justify-center
                gap-2
                rounded-xl
                bg-gradient-to-b
                from-red-500
                to-red-600
                px-5 py-3
                text-sm font-semibold
                text-white
                shadow-lg
                shadow-red-500/20
                transition-all duration-200
                hover:from-red-600
                hover:to-red-700
                hover:shadow-red-500/30
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-50
                disabled:shadow-none
                sm:w-1/2
              "
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes deleteModalIn {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.97);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default DeletePopup;