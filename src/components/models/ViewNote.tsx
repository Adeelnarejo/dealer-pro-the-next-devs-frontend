import React from "react";
import {
  X,
  FileText,
  CalendarDays,
  MessageSquareText,
} from "lucide-react";

interface ViewNoteProps {
  note: {
    id: string | number;
    text: string;
    date: string;
  };
  onClose: () => void;
}

const ViewNote: React.FC<ViewNoteProps> = ({ note, onClose }) => {
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
              <FileText className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <h2 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
                Note Details
              </h2>

              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                View the complete note information
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
          {/* Date */}
          <div
            className="
              mb-5 flex items-center gap-3
              rounded-xl
              border border-slate-200
              bg-slate-50
              px-4 py-3
              dark:border-slate-800
              dark:bg-slate-900/60
            "
          >
            <div
              className="
                flex h-9 w-9 shrink-0
                items-center justify-center
                rounded-lg
                bg-white
                text-slate-500
                shadow-sm
                dark:bg-slate-800
                dark:text-slate-400
              "
            >
              <CalendarDays className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Created
              </p>

              <p className="mt-0.5 truncate text-sm font-semibold text-slate-700 dark:text-slate-200">
                {note.date}
              </p>
            </div>
          </div>

          {/* Note */}
          <div>
            <div className="mb-2.5 flex items-center gap-2">
              <MessageSquareText className="h-4 w-4 text-blue-600 dark:text-blue-400" />

              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Note
              </h3>
            </div>

            <div
              className="
                min-h-[150px]
                rounded-2xl
                border border-slate-200
                bg-white
                p-5
                dark:border-slate-800
                dark:bg-slate-900/50
              "
            >
              {note.text ? (
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
                  {note.text}
                </p>
              ) : (
                <div className="flex min-h-[110px] items-center justify-center text-center">
                  <div>
                    <FileText className="mx-auto mb-2 h-7 w-7 text-slate-300 dark:text-slate-600" />

                    <p className="text-sm text-slate-400 dark:text-slate-500">
                      No note content available.
                    </p>
                  </div>
                </div>
              )}
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

export default ViewNote;