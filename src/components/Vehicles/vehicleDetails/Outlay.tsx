import {
  Edit3,
  Trash2,
  Eye,
  Plus,
  ReceiptText,
} from "lucide-react";
import { useState } from "react";

import type { Vehicle, Outlay } from "./types";

import AddNewOutlay from "../../models/AddNewOutlay";
import DeletePopup from "../../models/DeletePopup";
import ViewOutlay from "../../models/ViewOutlay";

interface Props {
  vehicle: Vehicle;

  onSaveOutlay: (data: {
    date: string;
    amount: number;
    description: string;
    id?: number;
  }) => void;

  onDelete: (outlayId: number) => void;
}

const formatDate = (date?: string) => {
  if (!date) return "Not available";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date.split("T")[0];
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatAmount = (amount?: number) => {
  if (
    amount === undefined ||
    amount === null ||
    Number.isNaN(Number(amount))
  ) {
    return "0.00 SEK";
  }

  return `${Number(amount).toLocaleString("en-SE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} SEK`;
};

const OutlayComponent = ({
  vehicle,
  onSaveOutlay,
  onDelete,
}: Props) => {
  const [isOutlayModalOpen, setIsOutlayModalOpen] =
    useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useState(false);

  const [isViewOutlayModalOpen, setIsViewOutlayModalOpen] =
    useState(false);

  const [selectedOutlay, setSelectedOutlay] =
    useState<Outlay | null>(null);

  const openAddModal = () => {
    setSelectedOutlay(null);
    setIsOutlayModalOpen(true);
  };

  const openEditModal = (outlay: Outlay) => {
    setSelectedOutlay(outlay);
    setIsOutlayModalOpen(true);
  };

  const openViewModal = (outlay: Outlay) => {
    setSelectedOutlay(outlay);
    setIsViewOutlayModalOpen(true);
  };

  const openDeleteModal = (outlay: Outlay) => {
    setSelectedOutlay(outlay);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsOutlayModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsViewOutlayModalOpen(false);
    setSelectedOutlay(null);
  };

  const handleSaveOrUpdate = (data: {
    date: string;
    amount: number;
    description: string;
  }) => {
    if (selectedOutlay) {
      onSaveOutlay({
        ...data,
        id: selectedOutlay.id,
      });
    } else {
      onSaveOutlay(data);
    }

    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (selectedOutlay) {
      onDelete(selectedOutlay.id);
    }

    closeModal();
  };

  const outlays = vehicle.outlay || [];

  return (
    <>
      <section
        className="
          w-full overflow-hidden rounded-2xl
          border border-slate-200
          bg-white
          shadow-sm
          transition-all duration-300
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        {/* Header */}
        <div
          className="
            flex flex-col gap-3
            border-b border-slate-200
            bg-slate-50
            px-5 py-4
            sm:flex-row sm:items-center sm:justify-between
            sm:px-6
            dark:border-slate-800
            dark:bg-slate-950/60
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-xl
                bg-blue-50
                text-[#002147]
                dark:bg-blue-500/10
                dark:text-blue-400
              "
            >
              <ReceiptText
                size={20}
                strokeWidth={2}
              />
            </div>

            <div>
              <h2
                className="
                  text-base font-semibold
                  text-slate-900
                  sm:text-lg
                  dark:text-white
                "
              >
                Vehicle Outlays
              </h2>

              <p
                className="
                  mt-0.5 text-xs
                  text-slate-500
                  sm:text-sm
                  dark:text-slate-400
                "
              >
                Track expenses related to this vehicle
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="
              inline-flex items-center justify-center gap-2
              rounded-xl
              bg-[#002147]
              px-4 py-2.5
              text-sm font-semibold text-white
              shadow-sm
              transition-all duration-200
              hover:bg-[#00345F]
              hover:shadow-md
              active:scale-[0.98]
              dark:bg-blue-600
              dark:hover:bg-blue-500
            "
          >
            <Plus size={17} />

            <span>Add Outlay</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {outlays.length > 0 ? (
            <div className="space-y-3">
              {outlays.map((outlay) => (
                <div
                  key={outlay.id}
                  className="
                    group rounded-xl
                    border border-slate-200
                    bg-white p-4
                    transition-all duration-300
                    hover:border-blue-200
                    hover:shadow-sm
                    dark:border-slate-800
                    dark:bg-slate-950/40
                    dark:hover:border-blue-900
                  "
                >
                  <div
                    className="
                      flex flex-col gap-4
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >
                    {/* Outlay information */}
                    <div className="min-w-0">
                      <div className="flex items-start gap-3">
                        <div
                          className="
                            mt-0.5 flex h-9 w-9 shrink-0
                            items-center justify-center
                            rounded-lg
                            bg-slate-100
                            text-slate-500
                            dark:bg-slate-800
                            dark:text-slate-400
                          "
                        >
                          <ReceiptText size={17} />
                        </div>

                        <div className="min-w-0">
                          <p
                            className="
                              break-words
                              text-sm font-semibold
                              text-slate-900
                              dark:text-white
                            "
                          >
                            {outlay.description ||
                              "Vehicle expense"}
                          </p>

                          <div
                            className="
                              mt-2 flex flex-wrap
                              items-center gap-x-4 gap-y-1
                            "
                          >
                            <span
                              className="
                                text-xs
                                text-slate-500
                                dark:text-slate-400
                              "
                            >
                              {formatDate(outlay.date)}
                            </span>

                            <span
                              className="
                                text-sm font-bold
                                text-[#002147]
                                dark:text-blue-400
                              "
                            >
                              {formatAmount(outlay.amount)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div
                      className="
                        flex items-center
                        gap-1
                        border-t border-slate-100
                        pt-3
                        sm:border-0
                        sm:pt-0
                        dark:border-slate-800
                      "
                    >
                      <button
                        type="button"
                        onClick={() =>
                          openViewModal(outlay)
                        }
                        title="View outlay"
                        aria-label="View outlay"
                        className="
                          inline-flex h-9 w-9
                          items-center justify-center
                          rounded-lg
                          text-slate-500
                          transition-all duration-200
                          hover:bg-blue-50
                          hover:text-blue-600
                          dark:text-slate-400
                          dark:hover:bg-blue-500/10
                          dark:hover:text-blue-400
                        "
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          openEditModal(outlay)
                        }
                        title="Edit outlay"
                        aria-label="Edit outlay"
                        className="
                          inline-flex h-9 w-9
                          items-center justify-center
                          rounded-lg
                          text-slate-500
                          transition-all duration-200
                          hover:bg-blue-50
                          hover:text-blue-600
                          dark:text-slate-400
                          dark:hover:bg-blue-500/10
                          dark:hover:text-blue-400
                        "
                      >
                        <Edit3 size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          openDeleteModal(outlay)
                        }
                        title="Delete outlay"
                        aria-label="Delete outlay"
                        className="
                          inline-flex h-9 w-9
                          items-center justify-center
                          rounded-lg
                          text-slate-500
                          transition-all duration-200
                          hover:bg-red-50
                          hover:text-red-600
                          dark:text-slate-400
                          dark:hover:bg-red-500/10
                          dark:hover:text-red-400
                        "
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div
              className="
                flex min-h-[180px]
                flex-col items-center justify-center
                rounded-xl
                border border-dashed
                border-slate-300
                bg-slate-50/70
                px-5 py-8
                text-center
                dark:border-slate-700
                dark:bg-slate-950/40
              "
            >
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
                <ReceiptText size={21} />
              </div>

              <h3
                className="
                  text-sm font-semibold
                  text-slate-700
                  dark:text-slate-300
                "
              >
                No Outlays Yet
              </h3>

              <p
                className="
                  mt-1 max-w-sm
                  text-xs leading-5
                  text-slate-500
                  sm:text-sm
                  dark:text-slate-500
                "
              >
                No expenses have been added for this
                vehicle yet.
              </p>

              <button
                type="button"
                onClick={openAddModal}
                className="
                  mt-4 inline-flex
                  items-center gap-2
                  text-sm font-semibold
                  text-blue-600
                  transition-colors
                  hover:text-blue-700
                  dark:text-blue-400
                  dark:hover:text-blue-300
                "
              >
                <Plus size={16} />
                Add your first outlay
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Add / Edit Outlay */}
      {isOutlayModalOpen && (
        <AddNewOutlay
          isOpen={isOutlayModalOpen}
          onClose={closeModal}
          onSubmit={handleSaveOrUpdate}
          outlayToEdit={selectedOutlay}
        />
      )}

      {/* Delete Confirmation */}
      {isDeleteModalOpen && selectedOutlay && (
        <DeletePopup
          entityName="Outlay"
          onCancel={closeModal}
          onDelete={handleDeleteConfirm}
          onClose={closeModal}
        />
      )}

      {/* View Outlay */}
      {isViewOutlayModalOpen && selectedOutlay && (
        <ViewOutlay
          outlay={selectedOutlay}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default OutlayComponent;

