import { useState } from "react";
import { Search, CarFront, Sparkles, ShieldCheck } from "lucide-react";

import SearchNewVehicle from "../../components/models/SearchVehicleModal";
import VehiclesTable from "../../components/vehiclesTable/VehiclesTable";

const VehicleSearch = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleSuccess = () => {
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#F5F7FA] font-plus-jakarta text-slate-900 transition-colors duration-300 dark:bg-[#07111F] dark:text-white">
      <div className="w-full px-3 py-3 sm:px-5 sm:py-5 lg:px-6 lg:py-6 xl:px-7">
        <div className="mx-auto w-full max-w-[1800px]">

          {/* =========================================================
              PAGE HEADER
          ========================================================= */}
          <section className="relative mb-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.04)] transition-all duration-300 dark:border-slate-800 dark:bg-[#0B1728] dark:shadow-none sm:mb-6">
            
            {/* Background decorations */}
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-500/[0.04] blur-3xl dark:bg-blue-500/[0.08]" />
            <div className="pointer-events-none absolute -bottom-24 left-[30%] h-52 w-52 rounded-full bg-indigo-500/[0.04] blur-3xl dark:bg-indigo-500/[0.06]" />

            {/* Top accent */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-70 dark:via-blue-500" />

            <div className="relative px-4 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-7">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

                {/* Left content */}
                <div className="flex min-w-0 items-start gap-3.5 sm:gap-4">
                  
                  {/* Icon */}
                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#002147] text-white shadow-lg shadow-[#002147]/20 dark:bg-blue-600 dark:shadow-blue-600/20 sm:h-12 sm:w-12">
                    <Search
                      size={21}
                      strokeWidth={2.2}
                      className="sm:h-[22px] sm:w-[22px]"
                    />

                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-emerald-500 dark:border-[#0B1728]">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                  </div>

                  <div className="min-w-0">
                    {/* Eyebrow */}
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#002147] dark:text-blue-400 sm:text-[11px]">
                        Inventory
                      </span>

                      <span className="inline-flex items-center gap-1 rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[9px] font-bold text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400 sm:text-[10px]">
                        <Sparkles size={9} />
                        DealerPro
                      </span>
                    </div>

                    <h1 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
                      Vehicle Search
                    </h1>

                    <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500 dark:text-slate-400 sm:text-sm">
                      Search, browse and manage vehicles available in your
                      dealership inventory.
                    </p>
                  </div>
                </div>

                {/* Right status card */}
                <div className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-3 dark:border-slate-700/80 dark:bg-[#101F33] sm:w-auto sm:min-w-[230px] sm:px-4">
                  
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                      <CarFront size={17} strokeWidth={2} />
                    </div>

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                        Inventory
                      </p>

                      <p className="mt-0.5 text-xs font-bold text-slate-700 dark:text-slate-200 sm:text-sm">
                        Vehicle Management
                      </p>
                    </div>
                  </div>

                  <div className="ml-4 flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 dark:bg-emerald-500/10">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[9px] font-bold text-emerald-700 dark:text-emerald-400">
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom feature row */}
              <div className="relative mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                <div className="flex items-center gap-2 text-[10px] font-medium text-slate-500 dark:text-slate-400 sm:text-xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    <Search size={11} />
                  </span>
                  Quick vehicle search
                </div>

                <div className="flex items-center gap-2 text-[10px] font-medium text-slate-500 dark:text-slate-400 sm:text-xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <CarFront size={11} />
                  </span>
                  Inventory management
                </div>

                <div className="flex items-center gap-2 text-[10px] font-medium text-slate-500 dark:text-slate-400 sm:text-xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                    <ShieldCheck size={11} />
                  </span>
                  Secure dealership data
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================
              VEHICLES TABLE
          ========================================================= */}
          <section className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.04)] transition-all duration-300 dark:border-slate-800 dark:bg-[#0B1728] dark:shadow-none">
            <VehiclesTable
              showAddModal={showAddModal}
              setShowAddModal={setShowAddModal}
            />
          </section>

          {/* =========================================================
              SEARCH / VEHICLE MODAL
          ========================================================= */}
          <SearchNewVehicle
            open={showAddModal}
            onClose={() => setShowAddModal(false)}
            onSuccess={handleSuccess}
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleSearch;