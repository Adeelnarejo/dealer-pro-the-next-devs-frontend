import type { Vehicle } from "./types";

interface Props {
  vehicle: Vehicle;
}




const BasicInformation = ({ vehicle }: Props) => {
  const statusColors: { [key: string]: string } = {
    Available: "bg-green-100 text-green-700",
    "Sold Out": "bg-blue-100 text-blue-700",
    Sold: "bg-red-100 text-red-700",
    Reserved: "bg-yellow-100 text-yellow-700",
  };

  console.log("____________________________________");
  console.log("vehicle", vehicle);  
  console.log("____________________________________");

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-[#F0F7FF] px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Grundläggande information
        </h2>
      </div>
      <div className="p-6 grid grid-cols-2 gap-6">
        <div>
          <div className="text-sm text-gray-500 mb-1">Modell</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.model || "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">År</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.year || "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Typ</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.type || "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Kategori</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.category || "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Färg</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.color || "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Status</div>
          <span
            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
              statusColors[vehicle.status] || "bg-gray-100 text-gray-700"
            }`}
          >
            {vehicle.status || "N/A"}
          </span>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Chassinummer</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.chassisNumber || "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Dagar i lager</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.daysInStock || "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
