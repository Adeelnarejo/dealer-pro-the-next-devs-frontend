import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { makeGetRequest } from "../../api/Api";
import { ArrowRightIcon } from "../utils/Icons";
import { useNavigate } from "react-router-dom";

interface Vehicle {
  id: string;
  registrationNumber: string;
  registrationDate: string;
  price: number;
  mileage: number;
  daysInStock: number;
  brand: string;
  vehicleName: string;
  model: string;
  type: string;
  fuelType: string;
  gearbox: string;
  year: number;
  drive: string;
  horsepower: string;
  color: string;
  importOrigin: string;
  status: string;
  updatedAt: string;
}

const statusColors: { [key: string]: string } = {
  Available: "bg-green-100 text-green-700",
  Sold: "bg-red-100 text-red-700",
  Reserved: "bg-yellow-100 text-yellow-700",
  "Sold Out": "bg-blue-100 text-blue-700",
};

const VehiclesTable = ({
  setShowAddModal,
  showAddModal
}: {
  setShowAddModal: (show: boolean) => void;
  showAddModal: boolean;
}) => {
  // const [expandedId, setExpandedId] = useState<string | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  // const handleExpand = (id: string) => {
  //   setExpandedId(expandedId === id ? null : id);
  // };
  const fetchVehicles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await makeGetRequest("searchVehicle/SearchgetAllVehicles");
        if (response.data && response.data.success) {
          setVehicles(response.data.data.reverse());
        } else {
          setError(response.data?.message || "Failed to fetch vehicles.");
        }
      } catch (err) {
        setError("An error occurred while fetching vehicles.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

  useEffect(() => {
    
    fetchVehicles();
  }, [showAddModal]);

  const filteredVehicles = vehicles.filter((vehicle) => {
    const searchLower = search.toLowerCase();
    return (
      vehicle.registrationNumber.toLowerCase().includes(searchLower) ||
      vehicle.vehicleName.toLowerCase().includes(searchLower) ||
      vehicle.model.toLowerCase().includes(searchLower)
    );
  });

  const navigate = useNavigate();

  const handleSearchNewVehicle = () => {
    setShowAddModal(true);
    // navigate("/add-new-vehicle");
  };

  return (
    <div className="font-plus-jakarta bg-white p-6 rounded-lg shadow-md">
      <div className="flex lg:flex-row flex-col justify-between lg:items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Fordonssökning</h2>
        <div className="flex sm:flex-row flex-col gap-3 sm:items-center lg:mt-0 mt-4">
          <div className="relative w-fit">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Söka"
              className="w-64 pl-10 pr-12 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors w-fit"
            onClick={handleSearchNewVehicle}
          >
            <span className="text-lg leading-none mb-1">+</span>
            Sök fordon
          </button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200 md:max-h-[600px] max-h-[500px] overflow-y-auto">
        <table className="min-w-full">
          <thead className="bg-[#F0F7FF] sticky top-0 z-10">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Reg nummer
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Fordonets namn
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Modell
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Ursprungsmarknad
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Datum
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Handling
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="py-6 text-center">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : filteredVehicles.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-gray-500">
                 Inga fordon hittades
                </td>
              </tr>
            ) : (
              filteredVehicles.map((vehicle) => (
                <React.Fragment key={vehicle.id}>
                  <tr
                    className={`hover:bg-gray-50`}
                    // className={`hover:bg-gray-50 ${
                    //   expandedId === vehicle.id ? "bg-[#E9EEF640]" : ""
                    // }`}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {/* <button
                          onClick={() => handleExpand(vehicle.id)}
                          className="flex items-center justify-center w-6 h-6 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                        >
                          <ArrowCollapseIcon
                            className={`text-gray-400 text-xs transition-transform ${
                              expandedId === vehicle.id
                                ? "rotate-90"
                                : "rotate-270"
                            }`}
                          />
                        </button> */}
                        <span className="inline-flex items-center gap-2 border border-[rgb(232,234,238)] rounded pr-1">
                          <span className="bg-gradient-to-b from-[#1F7BF4] to-[#015DD6] text-white rounded-tl rounded-bl px-2 py-2 text-xs font-bold">
                            S
                          </span>
                          <span className="font-medium text-gray-900">
                            {vehicle.registrationNumber || "N/A"}
                          </span>
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {vehicle.vehicleName || "N/A"}
                    </td>
                    <td className="py-4 px-4">{vehicle.model || "N/A"}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          statusColors[vehicle.status] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {vehicle.status || "N/A"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {vehicle.importOrigin || "N/A"}
                    </td>
                    <td className="py-4 px-4">
                      {formatDate(vehicle.updatedAt) || "N/A"}
                    </td>
                    <td className="py-4 px-4">
                      <button
                        className="border border-blue-600 text-blue-600 px-4 py-1 cursor-pointer rounded font-medium flex items-center gap-2 hover:bg-blue-50"
                        onClick={() =>
                          navigate(
                            `/vehicle-details2/${vehicle.registrationNumber}`
                          )
                        }
                      >
                        Detaljer <ArrowRightIcon className="w-[13px] h-[10px]" />
                      </button>
                    </td>
                  </tr>
                  {/* {expandedId === vehicle.id && (
                    <tr>
                      <td
                        colSpan={7}
                        className="bg-[#E9EEF640] border-t border-gray-200"
                      >
                        <div className="p-6">
                          <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                            <div className="dashboard-cards p-4 rounded-[12px]">
                              <div className="flex justify-between items-center mb-4">
                                <h3 className="text-base font-semibold text-gray-900">
                                  {vehicle.vehicleName || "N/A"}
                                </h3>
                                <span className="font-semibold text-blue-900">
                                  {vehicle.registrationNumber || "N/A"}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-6">
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Type
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {vehicle.type || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Status
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {vehicle.status || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Price
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {vehicle.price || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Registration Date
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {formatDate(vehicle.registrationDate) ||
                                      "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Mileage
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {vehicle.mileage || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Days in Stock
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {vehicle.daysInStock || "N/A"}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="dashboard-cards p-4 rounded-[12px]">
                              <div className="flex justify-between items-center mb-4">
                                <h3 className="text-base font-semibold text-gray-900">
                                  Vehicle Information
                                </h3>
                              </div>
                              <div className="grid grid-cols-2 gap-6">
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Fuel
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {vehicle.fuelType || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Gearbox
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {vehicle.gearbox || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Model Year
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {vehicle.year || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Driving
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {vehicle.drive || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    HorsePower
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {vehicle.horsepower || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Color
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {vehicle.color || "N/A"}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="dashboard-cards p-4 rounded-[12px]">
                              <div className="flex justify-between items-center mb-4">
                                <h3 className="text-base font-semibold text-gray-900">
                                  Equipment
                                </h3>
                              </div>
                              <div className="grid grid-cols-2 gap-2.5">
                                <div className="text-sm text-gray-500 mb-1">
                                  Backstart help
                                  <div className="text-sm text-gray-900 mt-1">
                                    {"N/A"}
                                  </div>
                                </div>
                                <div className="text-sm text-gray-500 mb-1">
                                  Rear ISOFIX mounts
                                  <div className="text-sm text-gray-900 mt-1">
                                    {"N/A"}
                                  </div>
                                </div>
                                <div className="text-sm text-gray-500 mb-1">
                                  Start stop
                                  <div className="text-sm text-gray-900 mt-1">
                                    {"N/A"}
                                  </div>
                                </div>
                                <div className="text-sm text-gray-500 mb-1">
                                  Makeup mirror
                                  <div className="text-sm text-gray-900 mt-1">
                                    {"N/A"}
                                  </div>
                                </div>
                                <div className="text-sm text-gray-500 mb-1">
                                  Outdoor temperature meter
                                  <div className="text-sm text-gray-900 mt-1">
                                    {"N/A"}
                                  </div>
                                </div>
                                <div className="text-sm text-gray-500 mb-1">
                                  Taklucka
                                  <div className="text-sm text-gray-900 mt-1">
                                    {"N/A"}
                                  </div>
                                </div>
                                <div className="text-sm text-gray-500 mb-1">
                                  Back camera
                                  <div className="text-sm text-gray-900 mt-1">
                                    {"N/A"}
                                  </div>
                                </div>
                                <div className="text-sm text-gray-500 mb-1">
                                  Engine heater (with timer)
                                  <div className="text-sm text-gray-900 mt-1">
                                    {"N/A"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )} */}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehiclesTable;
