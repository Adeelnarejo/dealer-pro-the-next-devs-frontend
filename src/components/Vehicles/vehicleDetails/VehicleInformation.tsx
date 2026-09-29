import { CarFront, FileText } from "lucide-react";

const VehicleInformation = () => {
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
            Vehicle Information
          </h2>

          <p
            className="
              mt-0.5 text-xs text-slate-500
              sm:text-sm
              dark:text-slate-400
            "
          >
            Vehicle specifications and agreement history
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <div
          className="
            flex min-h-[150px]
            flex-col items-center justify-center
            rounded-xl
            border border-dashed
            border-slate-300
            bg-slate-50/70
            px-5 py-8
            text-center
            dark:border-slate-700
            dark:bg-slate-950/40
          "
        >
          <div
            className="
              mb-3 flex h-11 w-11
              items-center justify-center
              rounded-full
              bg-slate-100
              text-slate-400
              dark:bg-slate-800
              dark:text-slate-500
            "
          >
            <FileText size={20} />
          </div>

          <h3
            className="
              text-sm font-medium
              text-slate-700
              dark:text-slate-300
            "
          >
            No Agreement History
          </h3>

          <p
            className="
              mt-1 max-w-md
              text-xs leading-5
              text-slate-500
              sm:text-sm
              dark:text-slate-500
            "
          >
            There is currently no agreement history
            available for this vehicle.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VehicleInformation;
