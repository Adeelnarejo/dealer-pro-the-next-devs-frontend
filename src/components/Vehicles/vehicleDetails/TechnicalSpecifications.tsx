import type { Vehicle } from "./types";
import {
  CarFront,
  Gauge,
  Settings2,
  Fuel,
  Users,
  Weight,
  Tag,
  ShieldCheck,
} from "lucide-react";

interface Props {
  vehicle: Vehicle;
}

interface SpecificationItemProps {
  label: string;
  value?: string | number | null;
  icon: React.ReactNode;
  suffix?: string;
}

const SpecificationItem = ({
  label,
  value,
  icon,
  suffix,
}: SpecificationItemProps) => {
  const hasValue =
    value !== undefined &&
    value !== null &&
    String(value).trim() !== "";

  return (
    <div
      className="
        group rounded-xl
        border border-slate-200
        bg-white p-4
        transition-all duration-300
        hover:border-blue-200
        hover:shadow-sm
        dark:border-slate-800
        dark:bg-slate-900/70
        dark:hover:border-blue-900
      "
    >
      <div className="flex items-start gap-3">
        <div
          className="
            flex h-9 w-9 shrink-0 items-center justify-center
            rounded-lg
            bg-blue-50
            text-[#002147]
            transition-colors duration-300
            group-hover:bg-blue-100
            dark:bg-blue-500/10
            dark:text-blue-400
            dark:group-hover:bg-blue-500/15
          "
        >
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <p
            className="
              mb-1 text-xs font-medium
              text-slate-500
              dark:text-slate-400
            "
          >
            {label}
          </p>

          <p
            className="
              break-words text-sm font-semibold
              text-slate-900
              dark:text-white
            "
          >
            {hasValue
              ? `${value}${suffix ? ` ${suffix}` : ""}`
              : "Not available"}
          </p>
        </div>
      </div>
    </div>
  );
};

const TechnicalSpecifications = ({ vehicle }: Props) => {
  return (
    <section
      className="
        w-full overflow-hidden rounded-2xl
        border border-slate-200
        bg-white
        shadow-sm
        transition-all duration-300
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      {/* Header */}
      <div
        className="
          flex items-center gap-4
          border-b border-slate-200
          bg-slate-50
          px-5 py-4
          sm:px-6
          dark:border-slate-800
          dark:bg-slate-950/60
        "
      >
        <div
          className="
            flex h-10 w-10 shrink-0 items-center justify-center
            rounded-xl
            bg-blue-50
            text-[#002147]
            dark:bg-blue-500/10
            dark:text-blue-400
          "
        >
          <CarFront size={20} strokeWidth={2} />
        </div>

        <div className="min-w-0">
          <h2
            className="
              text-base font-semibold
              text-slate-900
              sm:text-lg
              dark:text-white
            "
          >
            Technical Specifications
          </h2>

          <p
            className="
              mt-0.5 text-xs text-slate-500
              sm:text-sm
              dark:text-slate-400
            "
          >
            Detailed technical information about this vehicle
          </p>
        </div>
      </div>

      {/* Specifications */}
      <div
        className="
          grid grid-cols-1 gap-3
          p-4
          sm:grid-cols-2
          sm:gap-4
          sm:p-6
          lg:grid-cols-3
        "
      >
        <SpecificationItem
          label="Engine Volume"
          value={vehicle.engineVolume}
          icon={<Gauge size={17} />}
        />

        <SpecificationItem
          label="Transmission"
          value={vehicle.gearbox}
          icon={<Settings2 size={17} />}
        />

        <SpecificationItem
          label="Maximum Speed"
          value={vehicle.maxSpeed}
          icon={<Gauge size={17} />}
        />

        <SpecificationItem
          label="Service Weight"
          value={vehicle.serviceWeight}
          suffix="kg"
          icon={<Weight size={17} />}
        />

        <SpecificationItem
          label="Total Weight"
          value={vehicle.totalWeight}
          suffix="kg"
          icon={<Weight size={17} />}
        />

        <SpecificationItem
          label="Vehicle Weight"
          value={vehicle.vehicleWeight}
          suffix="kg"
          icon={<Weight size={17} />}
        />

        <SpecificationItem
          label="Passengers"
          value={vehicle.passengers}
          icon={<Users size={17} />}
        />

        <SpecificationItem
          label="Fuel Type"
          value={vehicle.fuelType}
          icon={<Fuel size={17} />}
        />

        <SpecificationItem
          label="Variant"
          value={vehicle.variant}
          icon={<Tag size={17} />}
        />

        <SpecificationItem
          label="Version"
          value={vehicle.version}
          icon={<CarFront size={17} />}
        />

        <SpecificationItem
          label="Type Code"
          value={vehicle.typeCode}
          icon={<Tag size={17} />}
        />

        <SpecificationItem
          label="ECO Certificate"
          value={vehicle.ecoCertificate}
          icon={<ShieldCheck size={17} />}
        />
      </div>
    </section>
  );
};

export default TechnicalSpecifications;
