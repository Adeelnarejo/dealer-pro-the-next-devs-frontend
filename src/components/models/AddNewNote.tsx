import { useState, useEffect } from "react";
import { X, FileText, PenLine } from "lucide-react";
import type { Note } from "../Vehicles/vehicleDetails/types";

interface AddNewNoteProps {
  onClose: () => void;
  onSave: (noteData: { text: string; id?: number }) => void;
  noteToEdit?: Note | null;
}

const AddNewNote = ({
  onClose,
  onSave,
  noteToEdit,
}: AddNewNoteProps) => {
  const [noteText, setNoteText] = useState("");
  const isEditMode = !!noteToEdit;

  useEffect(() => {
    if (noteToEdit) {
      setNoteText(noteToEdit.text);
    } else {
      setNoteText("");
    }
  }, [noteToEdit]);

  const handleSave = () => {
    if (noteText.trim()) {
      onSave({
        text: noteText.trim(),
        id: noteToEdit?.id,
      });
    }
  };

  return (
    <div
      className="
        fixed inset-0 z-[999]
        flex items-center justify-center
        bg-black/50 px-3 py-4
        backdrop-blur-sm
        font-plus-jakarta
        sm:px-5
      "
    >
      <div
        className="
          relative flex w-full max-w-[560px]
          max-h-[95vh] flex-col
          overflow-hidden
          rounded-2xl
          border border-slate-200
          bg-white
          shadow-2xl
          animate-[modalIn_.25s_ease-out]
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
              {isEditMode ? (
                <PenLine className="h-5 w-5" />
              ) : (
                <FileText className="h-5 w-5" />
              )}
            </div>

            <div>
              <h2
                className="
                  text-[17px] font-semibold
                  text-slate-900
                  dark:text-white
                "
              >
                {isEditMode ? "Edit Note" : "Add New Note"}
              </h2>

              <p
                className="
                  mt-0.5 text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >
                {isEditMode
                  ? "Update the details of your note"
                  : "Create a new note for this vehicle"}
              </p>
            </div>
          </div>

          <button
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

        {/* Content */}
        <div className="scrollbar-hide flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          {/* Note Information */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" />

              <div>
                <label
                  htmlFor="note-text"
                  className="
                    block text-sm font-semibold
                    text-slate-900
                    dark:text-white
                  "
                >
                  Note
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <p
                  className="
                    mt-0.5 text-[11px]
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Add any important information or details
                </p>
              </div>
            </div>

            <textarea
              id="note-text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Write your note here..."
              className="
                min-h-[190px]
                w-full resize-none
                rounded-xl
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

            <div className="mt-2 flex items-center justify-between">
              <p
                className="
                  text-[11px]
                  text-slate-400
                  dark:text-slate-500
                "
              >
                Keep your note clear and informative.
              </p>

              <span
                className="
                  text-[11px] font-medium
                  text-slate-400
                  dark:text-slate-500
                "
              >
                {noteText.length} characters
              </span>
            </div>
          </div>

          {/* Info Card */}
          <div
            className="
              mt-5 flex items-start gap-3
              rounded-xl
              border border-blue-100
              bg-blue-50/60
              p-3.5
              dark:border-blue-500/20
              dark:bg-blue-500/5
            "
          >
            <div
              className="
                mt-0.5 flex h-7 w-7 shrink-0
                items-center justify-center
                rounded-lg
                bg-white
                text-blue-600
                shadow-sm
                dark:bg-slate-800
                dark:text-blue-400
              "
            >
              <PenLine className="h-3.5 w-3.5" />
            </div>

            <div>
              <p
                className="
                  text-xs font-semibold
                  text-blue-700
                  dark:text-blue-400
                "
              >
                {isEditMode
                  ? "Editing existing note"
                  : "Create a useful note"}
              </p>

              <p
                className="
                  mt-0.5 text-[11px] leading-5
                  text-blue-600/80
                  dark:text-blue-400/70
                "
              >
                {isEditMode
                  ? "Your changes will replace the current note."
                  : "Notes help keep important vehicle information organized."}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="
            border-t border-slate-200
            bg-white/95
            px-5 py-4
            backdrop-blur
            sm:px-6 sm:py-5
            dark:border-slate-800
            dark:bg-[#0b1120]/95
          "
        >
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              onClick={onClose}
              className="
                w-full rounded-xl
                border border-slate-200
                bg-white
                px-5 py-3
                text-sm font-semibold
                text-slate-700
                transition-all duration-200
                hover:bg-slate-50
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-slate-200
                dark:hover:bg-slate-800
                sm:w-auto
              "
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={!noteText.trim()}
              className="
                w-full rounded-xl
                bg-blue-600
                px-5 py-3
                text-sm font-semibold
                text-white
                shadow-lg shadow-blue-600/20
                transition-all duration-200
                hover:bg-blue-700
                hover:shadow-blue-600/30
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-40
                disabled:shadow-none
                sm:w-auto
              "
            >
              {isEditMode ? "Update Note" : "Save Note"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
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

export default AddNewNote;