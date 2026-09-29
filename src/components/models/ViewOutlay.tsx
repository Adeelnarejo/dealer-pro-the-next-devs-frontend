import {
  X,
  Wallet,
  CalendarDays,
  FileText,
  CircleDollarSign,
} from "lucide-react";
import type { Outlay } from "../Vehicles/vehicleDetails/types";

interface ViewOutlayProps {
  outlay: Outlay;
  onClose: () => void;
}

const ViewOutlay = ({ outlay, onClose }: ViewOutlayProps) => {
  const formattedDate = outlay.date
    ? outlay.date.split("T")[0]
    : "—";

  return (
    <div
      className="
        fixed inset-0 z-[999]
        flex items-center justify-center
        bg-black/50
        px-3 py-4
        backdrop-blur-sm
        font-plus-jakarta
        sm:px-5
      "
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="
          relative
          flex w-full max-w-[520px]
          max-h-[calc(100vh-32px)]
          flex-col
          overflow-hidden
          rounded-2xl
          border border-slate-200
          bg-white
          shadow-2xl
          dark:border-slate-800
          dark:bg-[#0b1120]
          sm:max-h-[calc(100vh-48px)]
        "
      >
        {/* Header */}
        <div
          className="
            flex shrink-0 items-start justify-between gap-4
            border-b border-slate-200
            px-5 py-5
            sm:px-6
            dark:border-slate-800
          "
        >
          <div className="flex min-w-0 items-center gap-3">
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
              <Wallet className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <h2 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
                Outlay Details
              </h2>

              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                View expense information
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-xl
              text-slate-400
              transition-all
              hover:bg-slate-100
              hover:text-slate-700
              dark:hover:bg-slate-800
              dark:hover:text-white
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="scrollbar-hide flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          <div className="space-y-4">
            {/* Date */}
            <div
              className="
                flex items-center gap-4
                rounded-2xl
                border border-slate-200
                bg-slate-50
                p-4
                dark:border-slate-800
                dark:bg-slate-900/60
              "
            >
              <div
                className="
                  flex h-10 w-10 shrink-0
                  items-center justify-center
                  rounded-xl
                  bg-white
                  text-slate-500
                  shadow-sm
                  dark:bg-slate-800
                  dark:text-slate-400
                "
              >
                <CalendarDays className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Date
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {formattedDate}
                </p>
              </div>
            </div>

            {/* Amount */}
            <div
              className="
                rounded-2xl
                border border-blue-100
                bg-blue-50
                p-5
                dark:border-blue-500/20
                dark:bg-blue-500/10
              "
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex h-10 w-10
                      items-center justify-center
                      rounded-xl
                      bg-white
                      text-blue-600
                      shadow-sm
                      dark:bg-slate-900
                      dark:text-blue-400
                    "
                  >
                    <CircleDollarSign className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400">
                      Amount
                    </p>

                    <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                      {outlay.amount} kr
                    </p>
                  </div>
                </div>

                <Wallet className="h-7 w-7 text-blue-200 dark:text-blue-500/30" />
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="mb-2.5 flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />

                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Description
                </h3>
              </div>

              <div
                className="
                  min-h-[120px]
                  rounded-2xl
                  border border-slate-200
                  bg-white
                  p-5
                  dark:border-slate-800
                  dark:bg-slate-900/50
                "
              >
                {outlay.description ? (
                  <p
                    className="
                      whitespace-pre-wrap
                      break-words
                      text-sm
                      leading-7
                      text-slate-700
                      dark:text-slate-200
                    "
                  >
                    {outlay.description}
                  </p>
                ) : (
                  <div className="flex min-h-[80px] items-center justify-center text-center">
                    <div>
                      <FileText className="mx-auto mb-2 h-6 w-6 text-slate-300 dark:text-slate-600" />

                      <p className="text-sm text-slate-400 dark:text-slate-500">
                        No description available.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="
            shrink-0
            border-t border-slate-200
            bg-white
            px-5 py-4
            dark:border-slate-800
            dark:bg-[#0b1120]
            sm:px-6
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
              flex h-11 w-full
              items-center justify-center gap-2
              rounded-xl
              bg-blue-600
              px-5
              text-sm font-semibold
              text-white
              shadow-lg
              shadow-blue-600/20
              transition-all
              hover:bg-blue-700
              active:scale-[0.99]
            "
          >
            <X className="h-4 w-4" />
            Close
          </button>
        </div>
      </div>

      <style>{`
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

export default ViewOutlay;