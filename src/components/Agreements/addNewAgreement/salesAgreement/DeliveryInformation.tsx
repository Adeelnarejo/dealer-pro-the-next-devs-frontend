import {
  CalendarDays,
  MapPin,
  Truck,
  ChevronDown,
} from "lucide-react";

type Props = {
  form: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
};

export default function DeliveryInformation({
  form,
  handleChange,
}: Props) {
  return (
    <section className="mb-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-[#0B1628]">
      {/* Header */}
      <div className="border-b border-slate-100 px-5 py-4 dark:border-slate-800 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
            <Truck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>

          <div>
            <h2 className="font-plus-jakarta text-sm font-extrabold text-slate-900 dark:text-white sm:text-base">
              Delivery Information
            </h2>

            <p className="mt-0.5 font-plus-jakarta text-[10px] font-medium text-slate-400 dark:text-slate-500">
              Add the delivery date, location and terms
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Delivery Date */}
          <div>
            <label
              htmlFor="deliveryDate"
              className="mb-2 block font-plus-jakarta text-xs font-bold text-slate-700 dark:text-slate-300"
            >
              Delivery Date
            </label>

            <div className="relative">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

              <input
                id="deliveryDate"
                type="date"
                name="deliveryDate"
                value={form.deliveryDate || ""}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 font-plus-jakarta text-xs font-medium text-slate-800 outline-none transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#101D31] dark:text-white dark:hover:border-slate-600 dark:focus:border-blue-500 dark:focus:bg-[#101D31]"
              />
            </div>
          </div>

          {/* Delivery Location */}
          <div>
            <label
              htmlFor="deliveryLocation"
              className="mb-2 block font-plus-jakarta text-xs font-bold text-slate-700 dark:text-slate-300"
            >
              Delivery Location
            </label>

            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

              <input
                id="deliveryLocation"
                type="text"
                name="deliveryLocation"
                value={form.deliveryLocation || ""}
                placeholder="Enter delivery location"
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 font-plus-jakarta text-xs font-medium text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#101D31] dark:text-white dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:border-blue-500 dark:focus:bg-[#101D31]"
              />
            </div>
          </div>

          {/* Delivery Terms */}
          <div className="md:col-span-2">
            <label
              htmlFor="deliveryTerms"
              className="mb-2 block font-plus-jakarta text-xs font-bold text-slate-700 dark:text-slate-300"
            >
              Delivery Terms
            </label>

            <div className="relative">
              <Truck className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

              <select
                id="deliveryTerms"
                name="deliveryTerms"
                value={form.deliveryTerms || ""}
                onChange={handleChange}
                className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 font-plus-jakarta text-xs font-medium text-slate-800 outline-none transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#101D31] dark:text-white dark:hover:border-slate-600 dark:focus:border-blue-500 dark:focus:bg-[#101D31]"
              >
                <option value="">Select delivery terms</option>
                <option value="inStore">In Store</option>
                <option value="delivery">Delivery</option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}