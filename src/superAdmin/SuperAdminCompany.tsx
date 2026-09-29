import AllVehicles from "./components/Vehicles/allVehicles/AllVehicles";
import VehiclesStats from "./components/Vehicles/vehiclesStats/VehiclesStats";

const SuperAdminVehicle = () => {
  return (
    <div className="p-6  min-h-screen">
      <VehiclesStats />
      <AllVehicles />
    </div>
  );
};

export default SuperAdminVehicle;
