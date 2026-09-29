import { useState, useEffect } from "react";
import {
  X,
  Wallet,
  CalendarDays,
  FileText,
  AlertCircle,
} from "lucide-react";
import type { Outlay } from "../Vehicles/vehicleDetails/types";

interface AddNewOutlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: {
    date: string;
    amount: number;
    description: string;
    id?: number;
  }) => void;
  outlayToEdit?: Outlay | null;
}

const AddNewOutlay = ({
  isOpen,
  onClose,
  onSubmit,
  outlayToEdit,
}: AddNewOutlayProps) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    amount: "",
    description: "",
  });

  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  const isEditMode = !!outlayToEdit;

  useEffect(() => {
    if (outlayToEdit) {
      setFormData({
        date: outlayToEdit.date.split("T")[0],
        amount: outlayToEdit.amount.toString(),
        description: outlayToEdit.description,
      });
    } else {
      setFormData({
        date: new Date().toISOString().split("T")[0],
        amount: "",
        description: "",
      });
    }

    setErrors({});
  }, [outlayToEdit]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (!formData.amount) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(Number(formData.amount))) {
      newErrors.amount = "Please enter a valid number";
    } else if (Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const outlayData = {
        date: formData.date,
        amount: Number(formData.amount),
        description: formData.description.trim(),
        id: outlayToEdit?.id,
      };

      onSubmit?.(outlayData);
    }
  };

  if (!isOpen) return null;

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
                flex h-11 w-11 shrink-0 items-center justify-center
                rounded-xl
                bg-blue-50 text-blue-600
                dark:bg-blue-500/10 dark:text-blue-400
              "
            >
              <Wallet className="h-5 w-5" />
            </div>

            <div>
              <h2
                className="
                  text-[17px] font-semibold
                  text-slate-900
                  dark:text-white
                "
              >
                {isEditMode ? "Edit Outlay" : "Add New Outlay"}
              </h2>

              <p
                className="
                  mt-0.5 text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >
                {isEditMode
                  ? "Update the expense information"
                  : "Record a new vehicle-related expense"}
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

        {/* Content */}
        <div className="scrollbar-hide flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          <form
            id="outlay-form"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Date */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-blue-500" />

                <div>
                  <label
                    htmlFor="date"
                    className="
                      block text-sm font-semibold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    Outlay Date
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <p
                    className="
                      mt-0.5 text-[11px]
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Select when this expense occurred
                  </p>
                </div>
              </div>

              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className={`
                  w-full rounded-xl
                  border
                  bg-slate-50
                  px-4 py-3
                  text-sm text-slate-800
                  outline-none
                  transition-all duration-200
                  focus:ring-4 focus:ring-blue-500/10
                  dark:bg-slate-900
                  dark:text-slate-200
                  ${
                    errors.date
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-200 focus:border-blue-500 dark:border-slate-700"
                  }
                `}
              />

              {errors.date && (
                <div className="mt-2 flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                  <p className="text-xs text-red-500">
                    {errors.date}
                  </p>
                </div>
              )}
            </div>

            {/* Amount */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Wallet className="h-4 w-4 text-blue-500" />

                <div>
                  <label
                    htmlFor="amount"
                    className="
                      block text-sm font-semibold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    Amount
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <p
                    className="
                      mt-0.5 text-[11px]
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Enter the total outlay amount
                  </p>
                </div>
              </div>

              <div className="relative">
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className={`
                    w-full rounded-xl
                    border
                    bg-slate-50
                    px-4 py-3
                    text-sm text-slate-800
                    outline-none
                    transition-all duration-200
                    placeholder:text-slate-400
                    focus:ring-4 focus:ring-blue-500/10
                    dark:bg-slate-900
                    dark:text-slate-200
                    dark:placeholder:text-slate-600
                    ${
                      errors.amount
                        ? "border-red-500 focus:border-red-500"
                        : "border-slate-200 focus:border-blue-500 dark:border-slate-700"
                    }
                  `}
                />
              </div>

              {errors.amount && (
                <div className="mt-2 flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                  <p className="text-xs text-red-500">
                    {errors.amount}
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-500" />

                <div>
                  <label
                    htmlFor="description"
                    className="
                      block text-sm font-semibold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    Description
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <p
                    className="
                      mt-0.5 text-[11px]
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Describe what this expense was for
                  </p>
                </div>
              </div>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="e.g. Vehicle repair, insurance, parts, cleaning..."
                rows={5}
                className={`
                  w-full resize-none rounded-xl
                  border
                  bg-slate-50
                  px-4 py-3
                  text-sm leading-6
                  text-slate-800
                  outline-none
                  transition-all duration-200
                  placeholder:text-slate-400
                  focus:ring-4 focus:ring-blue-500/10
                  dark:bg-slate-900
                  dark:text-slate-200
                  dark:placeholder:text-slate-600
                  ${
                    errors.description
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-200 focus:border-blue-500 dark:border-slate-700"
                  }
                `}
              />

              <div className="mt-2 flex items-center justify-between">
                {errors.description ? (
                  <div className="flex items-center gap-1.5">
                    <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                    <p className="text-xs text-red-500">
                      {errors.description}
                    </p>
                  </div>
                ) : (
                  <p
                    className="
                      text-[11px]
                      text-slate-400
                      dark:text-slate-500
                    "
                  >
                    Keep the description clear and informative.
                  </p>
                )}

                <span
                  className="
                    text-[11px] font-medium
                    text-slate-400
                    dark:text-slate-500
                  "
                >
                  {formData.description.length} characters
                </span>
              </div>
            </div>

            {/* Info */}
            <div
              className="
                flex items-start gap-3
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
                  flex h-8 w-8 shrink-0 items-center justify-center
                  rounded-lg bg-white
                  text-blue-600 shadow-sm
                  dark:bg-slate-800
                  dark:text-blue-400
                "
              >
                <Wallet className="h-4 w-4" />
              </div>

              <div>
                <p
                  className="
                    text-xs font-semibold
                    text-blue-700
                    dark:text-blue-400
                  "
                >
                  Expense tracking
                </p>

                <p
                  className="
                    mt-0.5 text-[11px] leading-5
                    text-blue-600/80
                    dark:text-blue-400/70
                  "
                >
                  This outlay will be added to the vehicle's
                  financial records.
                </p>
              </div>
            </div>
          </form>
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
              type="button"
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
              type="submit"
              form="outlay-form"
              disabled={
                !formData.date ||
                !formData.amount ||
                !formData.description.trim()
              }
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
              {isEditMode ? "Update Outlay" : "Save Outlay"}
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

        .dark input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          opacity: 0.55;
        }
      `}</style>
    </div>
  );
};

export default AddNewOutlay;