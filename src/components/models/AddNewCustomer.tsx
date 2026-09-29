import React, { useState } from "react";
import { toast } from "react-hot-toast";
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  UserPlus,
  Loader2,
} from "lucide-react";
import { makePostRequest } from "../../api/Api";

interface AddNewCustomerProps {
  open: boolean;
  onClose: () => void;
  onCustomerCreated: (newCustomer: any) => void;
}

interface FormData {
  name: string;
  email: string;
  telephone: string;
  type: string;
  address: string;
  socialSecurityNumber: string;
  postalCode: string;
  location: string;
  status: string;
  agreementType: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  telephone: "",
  type: "Client",
  address: "",
  socialSecurityNumber: "",
  postalCode: "",
  location: "",
  status: "Active",
  agreementType: "N/A",
};

const AddNewCustomer: React.FC<AddNewCustomerProps> = ({
  open,
  onClose,
  onCustomerCreated,
}) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError(null);
  };

  const handleClose = () => {
    if (isLoading) return;

    setError(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Full name is required.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email address is required.");
      return;
    }

    if (!formData.telephone.trim()) {
      setError("Phone number is required.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await makePostRequest(
        "customer/createCustomer",
        formData
      );

      if (response.data && response.data.success) {
        onCustomerCreated(response.data.data);

        setFormData(initialFormData);

        toast.success("Customer created successfully!");

        onClose();

        window.location.reload();
      } else {
        throw new Error(
          response.data?.message || "Failed to create customer"
        );
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred";

      setError(message);
      console.error(err);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full h-11 rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500 dark:focus:bg-slate-900";

  const labelClass =
    "mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300";

  return (
    <div
      className="fixed inset-0 z-[999] flex justify-end bg-slate-950/45 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className="
          relative flex h-full w-full max-w-[560px] flex-col
          border-l border-slate-200 bg-white shadow-2xl
          dark:border-slate-800 dark:bg-[#0b1120]
          animate-[slideIn_.25s_ease-out]
        "
      >
        {/* HEADER */}
        <div className="shrink-0 border-b border-slate-200 bg-white/95 px-6 py-5 backdrop-blur dark:border-slate-800 dark:bg-[#0b1120]/95">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                <UserPlus size={21} strokeWidth={2.2} />
              </div>

              <div>
                <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                  Add New Customer
                </h2>

                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  Create a new customer profile
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="
                flex h-9 w-9 shrink-0 items-center justify-center rounded-xl
                text-slate-400 transition-all
                hover:bg-slate-100 hover:text-slate-700
                dark:hover:bg-slate-800 dark:hover:text-white
                disabled:cursor-not-allowed disabled:opacity-50
              "
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* FORM */}
        <div className="flex-1 overflow-y-auto  scrollbar-hide">
          <form
            id="add-customer-form"
            onSubmit={handleSubmit}
            className="px-6 py-6"
          >
            {/* ERROR */}
            {error && (
              <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-400">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                <span>{error}</span>
              </div>
            )}

            {/* CUSTOMER INFORMATION */}
            <div className="mb-7">
              <div className="mb-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Customer Information
                </h3>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Enter the customer's basic information
                </p>
              </div>

              <div className="space-y-5">
                {/* FULL NAME */}
                <div>
                  <label className={labelClass}>
                    Full Name <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <User
                      size={17}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`${inputClass} pl-10`}
                      placeholder="Enter full name..."
                      required
                    />
                  </div>
                </div>

                {/* EMAIL + PHONE */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      Email Address <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <Mail
                        size={17}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`${inputClass} pl-10`}
                        placeholder="customer@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Phone Number <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <Phone
                        size={17}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        className={`${inputClass} pl-10`}
                        placeholder="+46 70 000 00 00"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* CUSTOMER TYPE */}
                <div>
                  <label className={labelClass}>Customer Type</label>

                  <div className="relative">
                    <Building2
                      size={17}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className={`${inputClass} cursor-pointer appearance-none pl-10 pr-10`}
                    >
                      <option value="Client">Client</option>
                      <option value="Owner">Owner</option>
                      <option value="Agency">Agency</option>
                    </select>

                    <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ADDRESS INFORMATION */}
            <div className="mb-7 border-t border-slate-100 pt-7 dark:border-slate-800">
              <div className="mb-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Address Information
                </h3>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Enter the customer's address details
                </p>
              </div>

              <div className="space-y-5">
                {/* ADDRESS */}
                <div>
                  <label className={labelClass}>Address</label>

                  <div className="relative">
                    <MapPin
                      size={17}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`${inputClass} pl-10`}
                      placeholder="Enter customer address..."
                    />
                  </div>
                </div>

                {/* POSTAL CODE + LOCATION */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Postal Code</label>

                    <input
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Enter postal code..."
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Location</label>

                    <input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Enter city/location..."
                    />
                  </div>
                </div>

                {/* SOCIAL SECURITY NUMBER */}
                <div>
                  <label className={labelClass}>
                    Social Security Number
                  </label>

                  <input
                    name="socialSecurityNumber"
                    value={formData.socialSecurityNumber}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Enter social security number..."
                  />
                </div>
              </div>
            </div>

            {/* FOOTER BUTTONS */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end dark:border-slate-800">
              <button
                type="button"
                onClick={handleClose}
                disabled={isLoading}
                className="
                  h-11 rounded-xl border border-slate-200 px-5
                  text-sm font-semibold text-slate-700
                  transition-all hover:bg-slate-50
                  dark:border-slate-700 dark:text-slate-300
                  dark:hover:bg-slate-800
                  disabled:cursor-not-allowed disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="
                  flex h-11 items-center justify-center gap-2 rounded-xl
                  bg-blue-600 px-6 text-sm font-semibold text-white
                  shadow-lg shadow-blue-600/20
                  transition-all hover:bg-blue-700 hover:shadow-blue-600/30
                  active:scale-[0.98]
                  disabled:cursor-not-allowed disabled:opacity-60
                "
              >
                {isLoading ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <UserPlus size={17} />
                    Add Customer
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Animation */}
     <style>{`
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100%);
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
`}</style>
    </div>
  );
};

export default AddNewCustomer;
