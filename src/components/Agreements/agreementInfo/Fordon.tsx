import React from "react";
import {
  CalendarDays,
  CarFront,
  CheckCircle2,
  Gauge,
  Hash,
  KeyRound,
  Palette,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

export default function Fordon({ agreementData }: any) {
  const data = agreementData?.dataValues || {};

  const isSalesAgreement =
    agreementData?.type === "Sales Agreement";

  const vehicle = {
    model: data?.vehicleModel || "N/A",
    registration: data?.registrationNumber || "N/A",
    chassis: data?.chassisNumber || "N/A",
    date:
      data?.type === "Sales Agreement"
        ? data?.salesDate || "N/A"
        : data?.purchaseDate || "N/A",
    vatType: data?.vatType || "N/A",
    mileage: data?.mileage || "N/A",
    inspection:
      data?.inspectionDateUpToAndIncluding || "N/A",
    service: data?.latestServiceDate || "N/A",
    directImport: data?.diretImport ? "Yes" : "No",
    tyres: data?.deck
      ? data.deck.replace(/_/g, " ")
      : "N/A",
    year: data?.vehicleYear || "N/A",
    color: data?.color || "N/A",
    keys: data?.numberOfKeys || "N/A",
    extraInfo:
      agreementData?.freeTextMessage ||
      agreementData?.notes ||
      "N/A",
  };

  return (
    <>
      <VehicleSection
        title="Vehicle"
        vehicle={vehicle}
        isSalesAgreement={isSalesAgreement}
        showExtraInfo
        showPower={!isSalesAgreement}
      />

      {isSalesAgreement && (
        <VehicleSection
          title="Trade-In Vehicle"
          vehicle={vehicle}
          isSalesAgreement
          showExtraInfo={false}
          showPower={false}
          isTradeIn
        />
      )}
    </>
  );
}

/* =========================================================
   Vehicle Section
========================================================= */

function VehicleSection({
  title,
  vehicle,
  isSalesAgreement,
  showExtraInfo,
  showPower,
  isTradeIn = false,
}: {
  title: string;
  vehicle: {
    model: string;
    registration: string;
    chassis: string;
    date: string;
    vatType: string;
    mileage: string | number;
    inspection: string;
    service: string;
    directImport: string;
    tyres: string;
    year: string | number;
    color: string;
    keys: string | number;
    extraInfo: string;
  };
  isSalesAgreement: boolean;
  showExtraInfo: boolean;
  showPower: boolean;
  isTradeIn?: boolean;
}) {
  return (
    <section className="mt-3 w-full overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-[#101D31]">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-3 py-2 dark:border-slate-700 dark:bg-[#0B1628]">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <CarFront className="h-3.5 w-3.5" />
          </div>

          <div>
            <h3 className="text-[10px] font-extrabold text-slate-800 dark:text-white">
              {title}
            </h3>

            <p className="text-[8px] font-medium text-slate-400 dark:text-slate-500">
              {isTradeIn
                ? "Vehicle received as part of the trade-in"
                : "Vehicle specifications and registration details"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 dark:border-emerald-500/20 dark:bg-emerald-500/10">
          <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />

          <span className="text-[7px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
            {isTradeIn ? "Trade-In" : "Vehicle"}
          </span>
        </div>
      </div>

      {/* Vehicle Identity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <InfoCell
          icon={<CarFront className="h-3 w-3" />}
          label="Make / Model"
          value={vehicle.model}
        />

        <InfoCell
          icon={<Hash className="h-3 w-3" />}
          label="Registration Number"
          value={vehicle.registration}
        />

        <InfoCell
          icon={<ShieldCheck className="h-3 w-3" />}
          label="Chassis Number"
          value={vehicle.chassis}
        />

        <InfoCell
          icon={<CalendarDays className="h-3 w-3" />}
          label={
            isSalesAgreement
              ? "Sales Date"
              : "Purchase Date"
          }
        >
          {vehicle.date}
        </InfoCell>
      </div>

      {/* Technical / Service Information */}
      <div className="grid grid-cols-1 border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-5 dark:border-slate-700">
        <InfoCell
          icon={<Sparkles className="h-3 w-3" />}
          label="VAT Type"
          value={vehicle.vatType}
          muted
        />

        <InfoCell
          icon={<Gauge className="h-3 w-3" />}
          label="Mileage"
          value={`${vehicle.mileage}${vehicle.mileage !== "N/A" ? " km" : ""}`}
          muted
        />

        <InfoCell
          icon={<ShieldCheck className="h-3 w-3" />}
          label="Inspection Valid Until"
          value={vehicle.inspection}
          muted
        />

        <InfoCell
          icon={<Wrench className="h-3 w-3" />}
          label="Latest Service"
          value={vehicle.service}
          muted
        />

        <InfoCell
          icon={<CheckCircle2 className="h-3 w-3" />}
          label="Direct Import"
          value={vehicle.directImport}
          muted
          status={
            vehicle.directImport === "Yes"
              ? "success"
              : "normal"
          }
        />
      </div>

      {/* Vehicle Details */}
      <div className="grid grid-cols-1 border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-4 dark:border-slate-700">
        <InfoCell
          icon={<Sparkles className="h-3 w-3" />}
          label="Tyres"
          value={vehicle.tyres}
        />

        <InfoCell
          icon={<CalendarDays className="h-3 w-3" />}
          label="Model Year"
          value={String(vehicle.year)}
        />

        <InfoCell
          icon={<Palette className="h-3 w-3" />}
          label="Color"
          value={String(vehicle.color)}
        />

        <InfoCell
          icon={<KeyRound className="h-3 w-3" />}
          label="Number of Keys"
          value={String(vehicle.keys)}
        />

        {showPower && (
          <InfoCell
            icon={<Gauge className="h-3 w-3" />}
            label="Power"
            value="N/A"
          />
        )}
      </div>

      {/* Additional Information */}
      {showExtraInfo && (
        <div className="border-t border-slate-200 dark:border-slate-700">
          <div className="bg-slate-50/70 px-3 py-2 dark:bg-[#0B1628]/60">
            <div className="mb-1 flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-blue-500 dark:text-blue-400" />

              <span className="text-[7px] font-extrabold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                Additional Information
              </span>
            </div>

            <p className="break-words text-[9px] font-semibold leading-4 text-slate-700 dark:text-slate-200">
              {vehicle.extraInfo}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

/* =========================================================
   Info Cell
========================================================= */

function InfoCell({
  icon,
  label,
  value,
  muted = false,
  status = "normal",
  children,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  muted?: boolean;
  status?: "normal" | "success";
  children?: React.ReactNode;
}) {
  const displayValue = children ?? value ?? "N/A";

  const valueClass =
    status === "success"
      ? "text-emerald-600 dark:text-emerald-400"
      : "text-slate-700 dark:text-slate-200";

  return (
    <div
      className={`min-w-0 border-b border-slate-200 px-3 py-2.5 dark:border-slate-700 ${
        muted
          ? "bg-slate-50/70 dark:bg-[#0B1628]/60"
          : "bg-white dark:bg-[#101D31]"
      }`}
    >
      <div className="mb-1 flex items-center gap-1.5">
        <span className="text-blue-500 dark:text-blue-400">
          {icon}
        </span>

        <span className="text-[7px] font-extrabold uppercase tracking-wide text-slate-400 dark:text-slate-500">
          {label}
        </span>
      </div>

      <p
        className={`break-words text-[9px] font-semibold ${valueClass}`}
        title={typeof displayValue === "string" ? displayValue : undefined}
      >
        {displayValue}
      </p>
    </div>
  );
}