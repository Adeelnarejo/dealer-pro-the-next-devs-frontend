import { useState } from "react";
import {
  Edit,
  Trash2,
  Eye,
  Plus,
  FileText,
  CalendarDays,
} from "lucide-react";

import type { Vehicle, Note } from "./types";
import AddNewNote from "../../models/AddNewNote";
import DeletePopup from "../../models/DeletePopup";
import ViewNote from "../../models/ViewNote";

interface Props {
  vehicle: Vehicle;
  onSaveNote: (data: { text: string; id?: number }) => void;
  onDelete: (noteId: number) => void;
}

const Notes = ({ vehicle, onSaveNote, onDelete }: Props) => {
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewNoteModalOpen, setIsViewNoteModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const openAddModal = () => {
    setSelectedNote(null);
    setIsNoteModalOpen(true);
  };

  const openEditModal = (note: Note) => {
    setSelectedNote(note);
    setIsNoteModalOpen(true);
  };

  const openViewModal = (note: Note) => {
    setSelectedNote(note);
    setIsViewNoteModalOpen(true);
  };

  const openDeleteModal = (note: Note) => {
    setSelectedNote(note);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsNoteModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsViewNoteModalOpen(false);
    setSelectedNote(null);
  };

  const handleSaveOrUpdate = (noteData: {
    text: string;
    id?: number;
  }) => {
    onSaveNote(noteData);
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (selectedNote) {
      onDelete(selectedNote.id);
    }

    closeModal();
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "No date";

    try {
      const date = new Date(dateString);

      if (Number.isNaN(date.getTime())) {
        return "Invalid date";
      }

      return date.toISOString().split("T")[0];
    } catch {
      return "Invalid date";
    }
  };

  const notes = vehicle.notes ?? [];
  const hasNotes = notes.length > 0;

  return (
    <>
      <section className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
        {/* Header */}
        <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-4 py-4 sm:px-6 dark:border-slate-800 dark:from-slate-900 dark:to-slate-900">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Title */}
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <FileText className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-base font-semibold text-slate-900 sm:text-lg dark:text-white">
                  Notes
                </h2>

                <p className="mt-0.5 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
                  Vehicle notes and additional information
                </p>
              </div>
            </div>

            {/* Add button */}
            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-[0.98] sm:w-auto"
            >
              <Plus className="h-4 w-4" />
              Add Note
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {hasNotes ? (
            <div className="space-y-3">
              {notes.map((note) => (
                <article
                  key={note.id}
                  className="group rounded-xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-blue-200 hover:shadow-sm dark:border-slate-800 dark:bg-slate-950/40 dark:hover:border-blue-500/30"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    {/* Note content */}
                    <div className="min-w-0 flex-1">
                      <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-700 dark:text-slate-200">
                        {note.text}
                      </p>

                      <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                        <span>{formatDate(note.date)}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex shrink-0 items-center gap-2 border-t border-slate-100 pt-3 sm:border-0 sm:pt-0 dark:border-slate-800">
                      {/* View */}
                      <button
                        type="button"
                        onClick={() => openViewModal(note)}
                        title="View note"
                        aria-label="View note"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => openEditModal(note)}
                        title="Edit note"
                        aria-label="Edit note"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                      >
                        <Edit className="h-4 w-4" />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => openDeleteModal(note)}
                        title="Delete note"
                        aria-label="Delete note"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-red-500/30 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/70 px-5 py-10 text-center dark:border-slate-700 dark:bg-slate-950/30">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm dark:bg-slate-900 dark:text-slate-500">
                <FileText className="h-6 w-6" />
              </div>

              <h3 className="text-sm font-semibold text-slate-900 sm:text-base dark:text-white">
                No notes yet
              </h3>

              <p className="mt-1.5 max-w-sm text-xs leading-5 text-slate-500 sm:text-sm dark:text-slate-400">
                Keep important vehicle information, service details, or
                internal comments here.
              </p>

              <button
                type="button"
                onClick={openAddModal}
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
              >
                <Plus className="h-4 w-4" />
                Add your first note
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {hasNotes && (
          <div className="border-t border-slate-200 bg-slate-50/70 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/30">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {notes.length} {notes.length === 1 ? "note" : "notes"}{" "}
              {notes.length === 1 ? "available" : "available"} for this
              vehicle.
            </p>
          </div>
        )}
      </section>

      {/* Add / Edit Note Modal */}
      {isNoteModalOpen && (
        <AddNewNote
          onClose={closeModal}
          onSave={handleSaveOrUpdate}
          noteToEdit={selectedNote}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedNote && (
        <DeletePopup
          entityName="Note"
          onCancel={closeModal}
          onDelete={handleDeleteConfirm}
          onClose={closeModal}
        />
      )}

      {/* View Note Modal */}
      {isViewNoteModalOpen && selectedNote && (
        <ViewNote note={selectedNote} onClose={closeModal} />
      )}
    </>
  );
};

export default Notes;