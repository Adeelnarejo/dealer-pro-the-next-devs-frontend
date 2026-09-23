import React, { useState } from "react";
import { makeGetRequest } from "../../api/Api";
import { Loader2 } from "lucide-react";
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
      if (formData.priceFrom && vehicle.price < Number(formData.priceFrom)) {
        return false;
      }
      if (formData.priceTo && vehicle.price > Number(formData.priceTo)) {
        return false;
      }

      if (
        formData.mileageFrom &&
        vehicle.mileage < Number(formData.mileageFrom)
      ) {
        return false;
      }
      if (formData.mileageTo && vehicle.mileage > Number(formData.mileageTo)) {
        return false;
      }

      if (formData.yearFrom && vehicle.year < Number(formData.yearFrom)) {
        return false;
      }
      if (formData.yearTo && vehicle.year > Number(formData.yearTo)) {
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
      const url = queryString ? `vehicles/filter?${queryString}` : "vehicles";

      console.log("Filtering vehicles with URL:", url);

      const response = await makeGetRequest(url);

      if (response.data.success) {
        let filteredVehicles = response.data.data || [];

        filteredVehicles = applyClientSideFilters(filteredVehicles);

        onFiltersApplied(filteredVehicles);
        toast.success(
          `Found ${filteredVehicles.length} vehicles matching your criteria!`
        );
        onClose();
      } else {
        toast.error(response.data.message || "Failed to apply filters");
      }
    } catch (error: any) {
      console.error("Error applying filters:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to apply filters";
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
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm font-plus-jakarta">
      <div className="w-full max-w-md h-full bg-white shadow-xl p-8 overflow-y-auto relative animate-slide-in-right">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl cursor-pointer"
          onClick={onClose}
          aria-label="Stäng"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-6">Sökfilter</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between h-[85vh]"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fordonstyp
              </label>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Alla typer</option>
                <option value="SUV, Sedan">SUV, Sedan</option>
                <option value="Hardtop">Hardtop</option>
                <option value="Muscle car">Muskelbil</option>
                <option value="Convertible">Cabriolet</option>
                <option value="Pickup Truck">Pickup</option>
                <option value="Hot hatch">Hot hatch</option>
                <option value="Light truck">Lätt lastbil</option>
                <option value="Electric vehicle">Elbil</option>
                <option value="Full-size car">Fullstor bil</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Alla statusar</option>
                <option value="Available">Tillgänglig</option>
                <option value="Sold">Såld</option>
                <option value="Reserved">Reserverad</option>
                <option value="In Stock">I lager</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pris från
                </label>
                <input
                  type="number"
                  name="priceFrom"
                  value={formData.priceFrom}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="Min pris"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pris till
                </label>
                <input
                  type="number"
                  name="priceTo"
                  value={formData.priceTo}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="Max pris"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Miltal från
                </label>
                <input
                  type="number"
                  name="mileageFrom"
                  value={formData.mileageFrom}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="Min miltal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Miltal till
                </label>
                <input
                  type="number"
                  name="mileageTo"
                  value={formData.mileageTo}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="Max miltal"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  År från
                </label>
                <input
                  type="number"
                  name="yearFrom"
                  value={formData.yearFrom}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="Min år"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  År till
                </label>
                <input
                  type="number"
                  name="yearTo"
                  value={formData.yearTo}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="Max år"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Växellåda
              </label>
              <select
                name="gearbox"
                value={formData.gearbox}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Alla växellådor</option>
                <option value="Manual">Manuell</option>
                <option value="Automatic">Automat</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bränsletyp
              </label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Alla bränsletyper</option>
                <option value="Gasoline">Bensin</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">El</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="w-full bg-transparent border border-blue-700 text-blue-700 font-semibold cursor-pointer py-2.5 rounded-lg mt-4"
              disabled={isLoading}
            >
              Återställ
            </button>
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold cursor-pointer py-2.5 rounded-lg mt-4 flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                "Tillämpa filter"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterVehicle;
