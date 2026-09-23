import type { Vehicle } from "./types";

interface Props {
  vehicle: Vehicle;
}

const TechnicalSpecifications = ({ vehicle }: Props) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-[#F0F7FF] px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Tekniska specifikationer
        </h2>
      </div>
      <div className="p-6 grid grid-cols-2 gap-6">
        <div>
          <div className="text-sm text-gray-500 mb-1">Motorvolym</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.engineVolume || "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Växellåda</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.gearbox || "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Max hastighet</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.maxSpeed || "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Servicevikt</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.serviceWeight ? `${vehicle.serviceWeight} kg` : "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Total vikt</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.totalWeight ? `${vehicle.totalWeight} kg` : "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Fordonets vikt</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.vehicleWeight ? `${vehicle.vehicleWeight} kg` : "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Passagerare</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.passengers || "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Bränsletyp</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.fuelType || "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Variant</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.variant || "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Version</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.version || "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Typ kod</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.typeCode || "N/A"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">ECO-certifikat</div>
          <div className="text-sm font-medium text-gray-900">
            {vehicle.ecoCertificate || "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalSpecifications;
