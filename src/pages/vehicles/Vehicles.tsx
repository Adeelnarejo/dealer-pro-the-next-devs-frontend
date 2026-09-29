import VehiclesStats from "../../components/Vehicles/vehiclesStats/VehiclesStats";
import AllVehicles from "../../components/Vehicles/allVehicles/AllVehicles";

const Vehicles = () => {
  return (
    <div className="p-6  min-h-screen">
      <VehiclesStats />
      <AllVehicles />
    </div>
  );
};

export default Vehicles;
