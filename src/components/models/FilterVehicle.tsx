import React, { useState } from "react";
import {
  X,
  SlidersHorizontal,
  CarFront,
  CircleCheck,
  Wallet,
  Gauge,
  CalendarDays,
  Settings2,
  Fuel,
  RotateCcw,
  Loader2,
} from "lucide-react";
import { makeGetRequest } from "../../api/Api";
import toast from "react-hot-toast";

interface FilterVehicleProps {
  open: boolean;
  onClose: () => void;
  onFiltersApplied: (vehicles: any[]) => void;
}

interface FilterFormData {
  vehicleType: string;
  status: string;
  priceFrom: string;
  priceTo: string;
  mileageFrom: string;
  mileageTo: string;
  yearFrom: string;
  yearTo: string;
  gearbox: string;
  fuelType: string;
}

const FilterVehicle: React.FC<FilterVehicleProps> = ({
  open,
  onClose,
  onFiltersApplied,
}) => {
  const [formData, setFormData] = useState<FilterFormData>({
    vehicleType: "",
    status: "",
    priceFrom: "",
    priceTo: "",
    mileageFrom: "",
    mileageTo: "",
    yearFrom: "",
    yearTo: "",
    gearbox: "",
    fuelType: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  if (!open) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const buildFilterQuery = (): string => {
    const params = new URLSearchParams();

    Object.entries(formData).forEach(([key, value]) => {
      if (value && value.trim() !== "") {
        if (
          ![
            "priceFrom",
            "priceTo",
            "mileageFrom",
            "mileageTo",
            "yearFrom",
            "yearTo",
          ].includes(key)
        ) {
          const paramKey = key === "vehicleType" ? "vehicleType" : key;
          params.append(paramKey, value);
        }
      }
    });

    return params.toString();
  };

  const applyClientSideFilters = (vehicles: any[]): any[] => {
    return vehicles.filter((vehicle) => {
      if (
        formData.priceFrom &&
        vehicle.price < Number(formData.priceFrom)
      ) {
        return false;
      }

      if (
        formData.priceTo &&
        vehicle.price > Number(formData.priceTo)
      ) {
        return false;
      }

      if (
        formData.mileageFrom &&
        vehicle.mileage < Number(formData.mileageFrom)
      ) {
        return false;
      }

      if (
        formData.mileageTo &&
        vehicle.mileage > Number(formData.mileageTo)
      ) {
        return false;
      }

      if (
        formData.yearFrom &&
        vehicle.year < Number(formData.yearFrom)
      ) {
        return false;
      }

      if (
        formData.yearTo &&
        vehicle.year > Number(formData.yearTo)
      ) {
        return false;
      }

      return true;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const queryString = buildFilterQuery();

      const url = queryString
        ? `vehicles/filter?${queryString}`
        : "vehicles";

      console.log("Filtering vehicles with URL:", url);

      const response = await makeGetRequest(url);

      if (response.data.success) {
        let filteredVehicles = response.data.data || [];

        filteredVehicles =
          applyClientSideFilters(filteredVehicles);

        onFiltersApplied(filteredVehicles);

        toast.success(
          `Found ${filteredVehicles.length} vehicles matching your criteria!`
        );

        onClose();
      } else {
        toast.error(
          response.data.message || "Failed to apply filters"
        );
      }
    } catch (error: any) {
      console.error("Error applying filters:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to apply filters";

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      vehicleType: "",
      status: "",
      priceFrom: "",
      priceTo: "",
      mileageFrom: "",
      mileageTo: "",
      yearFrom: "",
      yearTo: "",
      gearbox: "",
      fuelType: "",
    });
  };

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
          flex h-full w-full max-w-[560px]
          flex-col
          overflow-hidden
          border-l border-slate-200
          bg-white
          shadow-2xl
          animate-[vehicleFilterIn_.25s_ease-out]
          dark:border-slate-800
          dark:bg-[#0b1120]
        "
      >
        {/* =====================================================
            HEADER
        ====================================================== */}
        <div
          className="
            shrink-0
            border-b border-slate-200
            bg-white/95
            px-5 py-5
            backdrop-blur
            dark:border-slate-800
            dark:bg-[#0b1120]/95
            sm:px-6
          "
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex h-11 w-11 shrink-0
                  items-center justify-center
                  rounded-xl
                  bg-blue-50
                  text-[#012F7A]
                  dark:bg-blue-500/10
                  dark:text-blue-400
                "
              >
                <SlidersHorizontal className="h-5 w-5" />
              </div>

              <div>
                <h2
                  className="
                    text-lg font-bold
                    text-slate-900
                    dark:text-white
                  "
                >
                  Vehicle Filters
                </h2>

                <p
                  className="
                    mt-0.5 text-xs
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Find vehicles using your preferred criteria
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="
                flex h-9 w-9 shrink-0
                items-center justify-center
                rounded-lg
                text-slate-400
                transition-all
                hover:bg-slate-100
                hover:text-slate-700
                disabled:cursor-not-allowed
                disabled:opacity-40
                dark:hover:bg-slate-800
                dark:hover:text-white
              "
              aria-label="Close filters"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            className="
              mt-5 flex items-center justify-between
            "
          >
            <span
              className="
                text-[11px] font-medium
                text-slate-500
                dark:text-slate-400
              "
            >
              Vehicle search preferences
            </span>

            <button
              type="button"
              onClick={handleReset}
              disabled={isLoading}
              className="
                flex items-center gap-1.5
                text-[11px] font-semibold
                text-blue-600
                transition-colors
                hover:text-blue-700
                disabled:opacity-40
                dark:text-blue-400
                dark:hover:text-blue-300
              "
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset all
            </button>
          </div>
        </div>

        {/* =====================================================
            FORM
        ====================================================== */}
        <form
          onSubmit={handleSubmit}
          className="
            scrollbar-hide
            flex-1
            overflow-y-auto
          "
        >
          <div className="px-5 py-5 sm:px-6 sm:py-6">

            {/* =================================================
                VEHICLE TYPE
            ================================================== */}
            <div className="mb-6">
              <div className="mb-3 flex items-center gap-2">
                <div
                  className="
                    flex h-8 w-8
                    items-center justify-center
                    rounded-lg
                    bg-blue-50
                    text-blue-600
                    dark:bg-blue-500/10
                    dark:text-blue-400
                  "
                >
                  <CarFront className="h-4 w-4" />
                </div>

                <div>
                  <h3
                    className="
                      text-sm font-semibold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    Vehicle Type
                  </h3>

                  <p
                    className="
                      text-[11px]
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Choose the type of vehicle
                  </p>
                </div>
              </div>

              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleInputChange}
                className="
                  h-11 w-full
                  rounded-xl
                  border border-slate-200
                  bg-slate-50
                  px-3
                  text-sm
                  text-slate-900
                  outline-none
                  transition-all
                  focus:border-blue-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-blue-500/10
                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-white
                  dark:focus:border-blue-500
                  dark:focus:bg-slate-900
                "
              >
                <option value="">All vehicle types</option>
                <option value="SUV, Sedan">SUV, Sedan</option>
                <option value="Hardtop">Hardtop</option>
                <option value="Muscle car">Muscle Car</option>
                <option value="Convertible">Convertible</option>
                <option value="Pickup Truck">Pickup Truck</option>
                <option value="Hot hatch">Hot Hatch</option>
                <option value="Light truck">Light Truck</option>
                <option value="Electric vehicle">
                  Electric Vehicle
                </option>
                <option value="Full-size car">
                  Full-size Car
                </option>
              </select>
            </div>

            {/* =================================================
                STATUS
            ================================================== */}
            <div className="mb-6">
              <div className="mb-3 flex items-center gap-2">
                <div
                  className="
                    flex h-8 w-8
                    items-center justify-center
                    rounded-lg
                    bg-emerald-50
                    text-emerald-600
                    dark:bg-emerald-500/10
                    dark:text-emerald-400
                  "
                >
                  <CircleCheck className="h-4 w-4" />
                </div>

                <div>
                  <h3
                    className="
                      text-sm font-semibold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    Vehicle Status
                  </h3>

                  <p
                    className="
                      text-[11px]
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Filter by current availability
                  </p>
                </div>
              </div>

              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="
                  h-11 w-full
                  rounded-xl
                  border border-slate-200
                  bg-slate-50
                  px-3
                  text-sm
                  text-slate-900
                  outline-none
                  transition-all
                  focus:border-blue-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-blue-500/10
                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-white
                  dark:focus:border-blue-500
                  dark:focus:bg-slate-900
                "
              >
                <option value="">All statuses</option>
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
                <option value="Reserved">Reserved</option>
                <option value="In Stock">In Stock</option>
              </select>
            </div>

            {/* =================================================
                PRICE RANGE
            ================================================== */}
            <div className="mb-6">
              <div className="mb-3 flex items-center gap-2">
                <div
                  className="
                    flex h-8 w-8
                    items-center justify-center
                    rounded-lg
                    bg-amber-50
                    text-amber-600
                    dark:bg-amber-500/10
                    dark:text-amber-400
                  "
                >
                  <Wallet className="h-4 w-4" />
                </div>

                <div>
                  <h3
                    className="
                      text-sm font-semibold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    Price Range
                  </h3>

                  <p
                    className="
                      text-[11px]
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Set your preferred vehicle price
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label
                    className="
                      mb-2 block text-xs font-semibold
                      text-slate-600
                      dark:text-slate-300
                    "
                  >
                    Minimum price
                  </label>

                  <div className="relative">
                    <span
                      className="
                        pointer-events-none
                        absolute left-3 top-1/2
                        -translate-y-1/2
                        text-xs font-medium
                        text-slate-400
                      "
                    >
                      $
                    </span>

                    <input
                      type="number"
                      name="priceFrom"
                      value={formData.priceFrom}
                      onChange={handleInputChange}
                      min="0"
                      placeholder="0"
                      className="
                        h-11 w-full
                        rounded-xl
                        border border-slate-200
                        bg-slate-50
                        pl-8 pr-3
                        text-sm
                        text-slate-900
                        outline-none
                        transition-all
                        placeholder:text-slate-400
                        focus:border-blue-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-blue-500/10
                        dark:border-slate-700
                        dark:bg-slate-900
                        dark:text-white
                        dark:focus:border-blue-500
                        dark:focus:bg-slate-900
                      "
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="
                      mb-2 block text-xs font-semibold
                      text-slate-600
                      dark:text-slate-300
                    "
                  >
                    Maximum price
                  </label>

                  <div className="relative">
                    <span
                      className="
                        pointer-events-none
                        absolute left-3 top-1/2
                        -translate-y-1/2
                        text-xs font-medium
                        text-slate-400
                      "
                    >
                      $
                    </span>

                    <input
                      type="number"
                      name="priceTo"
                      value={formData.priceTo}
                      onChange={handleInputChange}
                      min="0"
                      placeholder="No limit"
                      className="
                        h-11 w-full
                        rounded-xl
                        border border-slate-200
                        bg-slate-50
                        pl-8 pr-3
                        text-sm
                        text-slate-900
                        outline-none
                        transition-all
                        placeholder:text-slate-400
                        focus:border-blue-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-blue-500/10
                        dark:border-slate-700
                        dark:bg-slate-900
                        dark:text-white
                        dark:focus:border-blue-500
                        dark:focus:bg-slate-900
                      "
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                MILEAGE RANGE
            ================================================== */}
            <div className="mb-6">
              <div className="mb-3 flex items-center gap-2">
                <div
                  className="
                    flex h-8 w-8
                    items-center justify-center
                    rounded-lg
                    bg-purple-50
                    text-purple-600
                    dark:bg-purple-500/10
                    dark:text-purple-400
                  "
                >
                  <Gauge className="h-4 w-4" />
                </div>

                <div>
                  <h3
                    className="
                      text-sm font-semibold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    Mileage Range
                  </h3>

                  <p
                    className="
                      text-[11px]
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Filter vehicles by mileage
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label
                    className="
                      mb-2 block text-xs font-semibold
                      text-slate-600
                      dark:text-slate-300
                    "
                  >
                    Minimum mileage
                  </label>

                  <input
                    type="number"
                    name="mileageFrom"
                    value={formData.mileageFrom}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="0"
                    className="
                      h-11 w-full
                      rounded-xl
                      border border-slate-200
                      bg-slate-50
                      px-3
                      text-sm
                      text-slate-900
                      outline-none
                      transition-all
                      placeholder:text-slate-400
                      focus:border-blue-500
                      focus:bg-white
                      focus:ring-4
                      focus:ring-blue-500/10
                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-white
                      dark:focus:border-blue-500
                      dark:focus:bg-slate-900
                    "
                  />
                </div>

                <div>
                  <label
                    className="
                      mb-2 block text-xs font-semibold
                      text-slate-600
                      dark:text-slate-300
                    "
                  >
                    Maximum mileage
                  </label>

                  <input
                    type="number"
                    name="mileageTo"
                    value={formData.mileageTo}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="No limit"
                    className="
                      h-11 w-full
                      rounded-xl
                      border border-slate-200
                      bg-slate-50
                      px-3
                      text-sm
                      text-slate-900
                      outline-none
                      transition-all
                      placeholder:text-slate-400
                      focus:border-blue-500
                      focus:bg-white
                      focus:ring-4
                      focus:ring-blue-500/10
                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-white
                      dark:focus:border-blue-500
                      dark:focus:bg-slate-900
                    "
                  />
                </div>
              </div>
            </div>

            {/* =================================================
                YEAR RANGE
            ================================================== */}
            <div className="mb-6">
              <div className="mb-3 flex items-center gap-2">
                <div
                  className="
                    flex h-8 w-8
                    items-center justify-center
                    rounded-lg
                    bg-cyan-50
                    text-cyan-600
                    dark:bg-cyan-500/10
                    dark:text-cyan-400
                  "
                >
                  <CalendarDays className="h-4 w-4" />
                </div>

                <div>
                  <h3
                    className="
                      text-sm font-semibold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    Model Year
                  </h3>

                  <p
                    className="
                      text-[11px]
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Select the preferred model year
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label
                    className="
                      mb-2 block text-xs font-semibold
                      text-slate-600
                      dark:text-slate-300
                    "
                  >
                    From year
                  </label>

                  <input
                    type="number"
                    name="yearFrom"
                    value={formData.yearFrom}
                    onChange={handleInputChange}
                    min="1900"
                    max="2100"
                    placeholder="e.g. 2020"
                    className="
                      h-11 w-full
                      rounded-xl
                      border border-slate-200
                      bg-slate-50
                      px-3
                      text-sm
                      text-slate-900
                      outline-none
                      transition-all
                      placeholder:text-slate-400
                      focus:border-blue-500
                      focus:bg-white
                      focus:ring-4
                      focus:ring-blue-500/10
                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-white
                      dark:focus:border-blue-500
                      dark:focus:bg-slate-900
                    "
                  />
                </div>

                <div>
                  <label
                    className="
                      mb-2 block text-xs font-semibold
                      text-slate-600
                      dark:text-slate-300
                    "
                  >
                    To year
                  </label>

                  <input
                    type="number"
                    name="yearTo"
                    value={formData.yearTo}
                    onChange={handleInputChange}
                    min="1900"
                    max="2100"
                    placeholder="e.g. 2026"
                    className="
                      h-11 w-full
                      rounded-xl
                      border border-slate-200
                      bg-slate-50
                      px-3
                      text-sm
                      text-slate-900
                      outline-none
                      transition-all
                      placeholder:text-slate-400
                      focus:border-blue-500
                      focus:bg-white
                      focus:ring-4
                      focus:ring-blue-500/10
                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-white
                      dark:focus:border-blue-500
                      dark:focus:bg-slate-900
                    "
                  />
                </div>
              </div>
            </div>

            {/* =================================================
                TRANSMISSION
            ================================================== */}
            <div className="mb-6">
              <div className="mb-3 flex items-center gap-2">
                <div
                  className="
                    flex h-8 w-8
                    items-center justify-center
                    rounded-lg
                    bg-orange-50
                    text-orange-600
                    dark:bg-orange-500/10
                    dark:text-orange-400
                  "
                >
                  <Settings2 className="h-4 w-4" />
                </div>

                <div>
                  <h3
                    className="
                      text-sm font-semibold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    Transmission
                  </h3>

                  <p
                    className="
                      text-[11px]
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Select the gearbox type
                  </p>
                </div>
              </div>

              <select
                name="gearbox"
                value={formData.gearbox}
                onChange={handleInputChange}
                className="
                  h-11 w-full
                  rounded-xl
                  border border-slate-200
                  bg-slate-50
                  px-3
                  text-sm
                  text-slate-900
                  outline-none
                  transition-all
                  focus:border-blue-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-blue-500/10
                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-white
                  dark:focus:border-blue-500
                  dark:focus:bg-slate-900
                "
              >
                <option value="">All transmissions</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>

            {/* =================================================
                FUEL TYPE
            ================================================== */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div
                  className="
                    flex h-8 w-8
                    items-center justify-center
                    rounded-lg
                    bg-rose-50
                    text-rose-600
                    dark:bg-rose-500/10
                    dark:text-rose-400
                  "
                >
                  <Fuel className="h-4 w-4" />
                </div>

                <div>
                  <h3
                    className="
                      text-sm font-semibold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    Fuel Type
                  </h3>

                  <p
                    className="
                      text-[11px]
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Choose the preferred fuel
                  </p>
                </div>
              </div>

              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleInputChange}
                className="
                  h-11 w-full
                  rounded-xl
                  border border-slate-200
                  bg-slate-50
                  px-3
                  text-sm
                  text-slate-900
                  outline-none
                  transition-all
                  focus:border-blue-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-blue-500/10
                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-white
                  dark:focus:border-blue-500
                  dark:focus:bg-slate-900
                "
              >
                <option value="">All fuel types</option>
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          {/* =================================================
              FOOTER
          ================================================== */}
          <div
            className="
              sticky bottom-0
              border-t border-slate-200
              bg-white/95
              p-4
              backdrop-blur
              dark:border-slate-800
              dark:bg-[#0b1120]/95
              sm:p-5
            "
          >
            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleReset}
                disabled={isLoading}
                className="
                  flex w-full
                  items-center justify-center
                  gap-2
                  rounded-xl
                  border border-slate-200
                  bg-white
                  px-5 py-3
                  text-sm font-semibold
                  text-slate-700
                  transition-all
                  hover:bg-slate-50
                  active:scale-[0.98]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-slate-200
                  dark:hover:bg-slate-800
                  sm:w-1/2
                "
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="
                  flex w-full
                  items-center justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-b
                  from-[#1F7BF4]
                  to-[#015DD6]
                  px-5 py-3
                  text-sm font-semibold
                  text-white
                  shadow-lg
                  shadow-blue-500/20
                  transition-all
                  hover:from-[#176FE5]
                  hover:to-[#0053C4]
                  hover:shadow-blue-500/30
                  active:scale-[0.98]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  disabled:shadow-none
                  sm:w-1/2
                "
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Applying...
                  </>
                ) : (
                  <>
                    <SlidersHorizontal className="h-4 w-4" />
                    Apply Filters
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes vehicleFilterIn {
          from {
            opacity: 0;
            transform: translateX(24px);
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

        select option {
          background: white;
          color: #0f172a;
        }

        @media (prefers-color-scheme: dark) {
          select option {
            background: #0f172a;
            color: white;
          }
        }
      `}</style>
    </div>
  );
};

export default FilterVehicle;