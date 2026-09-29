import React, { useState, useEffect } from "react";
import { makePostRequest, makePutRequest } from "../../api/Api";
import {
  AlertCircle,
  Loader2,
  X,
  CarFront,
  Search,
  CalendarDays,
  Gauge,
  UserRound,
  Settings2,
  FileText,
  ShieldCheck,
  MapPin,
  Fuel,
  Weight,
  PackageCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import type { Vehicle } from "../Vehicles/vehicleDetails/types";
import { BACKEND_API_ENDPOINT } from "../../api/config";

interface AddNewVehicleProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (shouldRedirect?: boolean) => void;
  vehicleToEdit?: Vehicle | null;
}

interface VehicleSearchResponse {
  success: boolean;
  type: string;
  keyword: string;
  count: number;
  data: {
    _type: string;
    id: string;
    country: string;
    legalId: string;
    registrationData: {
      registrationNumber: string;
      registeredOn: string;
    };
    detail: {
      vehicleType: string;
      vehicleCategory: string;
      vehicleBrand: string;
      vehicleModel: string;
      color: string;
      chassisNumber: string;
      registrationDate: string;
      registrationNumberReused: boolean;
      vehicleImpactClass: string;
      vehicleBrandRaw: string;
      vehicleModelRaw: string;
      vehicleYear: string;
    };
    ownerInfo: {
      identityNumber: string;
      acquisitionDate: string;
      organization: boolean;
      numberOfUsers: number;
      previousUserIdentityNumber: string;
      previousUserAcquisitionDate: string;
      beforePreviousUserIdentityNumber: string;
      beforePreviousUserAcquisitionDate: string;
      owner: string;
      ownerAcquisitionDate: string;
      userReference: {
        _type: string;
        id: string;
        country: string;
        addresses: any[];
      };
      ownerReference: {
        _type: string;
        id: string;
        country: string;
        addresses: any[];
      };
    };
    status: {
      registrationType: string;
      date: string;
      leased: boolean;
      methodsOfUse: string[];
      creditPurchase: boolean;
      code: string;
      insuranceType: string;
    };
    origin: {
      importerId: string;
      preRegistrationDate: string;
      directImport: boolean;
    };
    technicalData: {
      variant: string;
      version: string;
      type: string;
      bodyCode1: string;
      nrOfPassengers: number;
      eeg: string;
      cylinderVolume: number;
      gearbox: string;
      couplingDevices: string[];
      serviceWeight: number;
      vehicleTypeWeight: number;
      totalWeight: number;
      allWheelDrive: boolean;
      maxSpeed: string;
      fuelCodes: string[];
    };
    equipment: any[];
    environmental: {
      environmentalClassEuro: string;
      emissionClass: string;
      superGreenCar: boolean;
    };
    inspection: {
      inspectionDate: string;
      inspectionDateUpToAndIncluding: string;
      mileage: number;
      inspectionStation: string;
    };
    vehicleId: string;
  }[];
}

const initialVehicleState = {
  registrationNumber: "",
  model: "",
  vehicleName: "",
  year: "",
  importOrigin: "",
  price: "",
  mileage: "",
  daysInStock: 0,
  color: "",
  horsepower: "",
  chassisNumber: "",
  registrationDate: new Date().toISOString().split("T")[0],
  preRegistrationDate: "",
  registrationRenewed: "",
  statusDate: "",
  engineVolume: "",
  maxSpeed: "",
  serviceWeight: 0,
  totalWeight: 0,
  vehicleWeight: 0,
  passengers: 0,
  version: "",
  typeCode: "",
  ecoCertificate: "",
  currentOwner: "",
  acquisitionDate: "",
  organizationOwner: "",
  lastInspection: "",
  nextInspectionDue: "",
  inspectionMileage: 0,
  inspectionStation: "",
  importID: "",
  category: "",
  status: "",
  fuelType: "",
  gearbox: "",
  drive: "",
  GPS: true,
  Sunroof: true,
  type: "",
  variant: "",
  totalOwners: 0,
  directImport: true,
};

const SearchNewVehicle: React.FC<AddNewVehicleProps> = ({
  open,
  onClose,
  vehicleToEdit,
}) => {
  const [formData, setFormData] = useState<any>(initialVehicleState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchedVehicle, setSearchedVehicle] = useState<any | null>(null);

  const isEditMode = !!vehicleToEdit;

  useEffect(() => {
    if (isEditMode && vehicleToEdit) {
      const vehicleData = {
        ...initialVehicleState,
        ...vehicleToEdit,

        registrationDate: vehicleToEdit.registrationDate
          ? new Date(vehicleToEdit.registrationDate)
              .toISOString()
              .split("T")[0]
          : "",

        preRegistrationDate: vehicleToEdit.preRegistrationDate
          ? new Date(vehicleToEdit.preRegistrationDate)
              .toISOString()
              .split("T")[0]
          : "",

        registrationRenewed: vehicleToEdit.registrationRenewed
          ? new Date(vehicleToEdit.registrationRenewed)
              .toISOString()
              .split("T")[0]
          : "",

        statusDate: vehicleToEdit.statusDate
          ? new Date(vehicleToEdit.statusDate).toISOString().split("T")[0]
          : "",

        acquisitionDate: vehicleToEdit.acquisitionDate
          ? new Date(vehicleToEdit.acquisitionDate)
              .toISOString()
              .split("T")[0]
          : "",

        lastInspection: vehicleToEdit.lastInspection
          ? new Date(vehicleToEdit.lastInspection)
              .toISOString()
              .split("T")[0]
          : "",

        nextInspectionDue: vehicleToEdit.nextInspectionDue
          ? new Date(vehicleToEdit.nextInspectionDue)
              .toISOString()
              .split("T")[0]
          : "",

        GPS: vehicleToEdit.equipment?.GPS || false,
        Sunroof: vehicleToEdit.equipment?.Sunroof || false,
        directImport: vehicleToEdit.directImport === "Yes",

        notes: vehicleToEdit.notes || [],
        outlay: vehicleToEdit.outlay || [],
        documents: vehicleToEdit.documents || [],
      };

      setFormData(vehicleData);
    } else {
      setFormData(initialVehicleState);
      setSearchedVehicle(null);
      setError(null);
    }
  }, [vehicleToEdit, isEditMode, open]);

  if (!open) return null;

  const handleSearchVehicle = async (regNumber: string) => {
    try {
      const response = await fetch(
        `${BACKEND_API_ENDPOINT}agreements/external/agreements`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer <your-token>",
          },
          body: JSON.stringify({
            type: "VEHICLE",
            query: regNumber,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: VehicleSearchResponse = await response.json();
      const vehicle = data.data[0];

      console.log("Search Vehicle Response:", vehicle);

      if (data.success && data.count > 0) {
        setSearchedVehicle(vehicle);

        toast.success("Vehicle found! Proceeding with creation...");

        return vehicle;
      }

      toast.error("No vehicle found with this registration number");
      return null;
    } catch (error) {
      console.error("Error searching vehicle:", error);
      toast.error("Failed to search vehicle. Please try again.");
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    let vehicleData = searchedVehicle;

    if (!isEditMode) {
      if (!formData.registrationNumber) {
        toast.error("Please enter a registration number");
        setIsLoading(false);
        return;
      }

      vehicleData = await handleSearchVehicle(
        formData.registrationNumber
      );

      if (!vehicleData) {
        setIsLoading(false);
        return;
      }
    }

    const safeToISOString = (dateString: string) => {
      return dateString ? new Date(dateString).toISOString() : null;
    };

    const payload = {
      registrationNumber:
        vehicleData.registrationData?.registrationNumber ||
        formData.registrationNumber,

      model: vehicleData.detail?.vehicleModel || null,

      vehicleName: `${vehicleData.detail?.vehicleBrand || ""} ${
        vehicleData.detail?.vehicleModel || ""
      }`.trim(),

      year: Number(vehicleData.detail?.vehicleYear ?? 0),

      category: vehicleData.detail?.vehicleCategory || null,

      status: "Available",

      importOrigin: vehicleData.country || null,

      registrationDate: safeToISOString(
        vehicleData.registrationData?.registeredOn
      ),

      price: Number(vehicleData.detail?.price ?? 0),

      mileage: Number(
        vehicleData.inspection?.mileage ?? 0
      ),

      daysInStock: 0,

      fuelType: vehicleData.detail?.fuelType || null,

      gearbox: vehicleData.detail?.gearbox || null,

      drive: vehicleData.detail?.drive || null,

      color: vehicleData.detail?.color || null,

      horsepower: vehicleData.technicalData?.horsePower
        ? `${vehicleData.technicalData.horsePower} Hk`
        : null,

      notes: ["Clean condition"],

      outlay: [],

      equipment: {
        interior: vehicleData.detail?.interior || null,
        audio: vehicleData.detail?.audio || null,
        safety: vehicleData.detail?.safety || [],
      },

      documents: [],

      type: vehicleData.detail?.bodyType || null,

      chassisNumber:
        vehicleData.technicalData?.chassisNumber || null,

      preRegistrationDate: safeToISOString(
        vehicleData.origin?.preRegistrationDate
      ),

      registrationRenewed: safeToISOString(
        vehicleData.status?.date
      ),

      statusDate: safeToISOString(
        vehicleData.status?.date
      ),

      engineVolume: vehicleData.technicalData?.engineVolume
        ? `${vehicleData.technicalData.engineVolume}L`
        : null,

      maxSpeed: vehicleData.technicalData?.maxSpeed
        ? `${vehicleData.technicalData.maxSpeed} km/h`
        : null,

      serviceWeight: Number(
        vehicleData.technicalData?.serviceWeight ?? 0
      ),

      totalWeight: Number(
        vehicleData.technicalData?.totalWeight ?? 0
      ),

      vehicleWeight: Number(
        vehicleData.technicalData?.vehicleWeight ?? 0
      ),

      passengers: Number(
        vehicleData.technicalData?.nrOfPassengers ?? 0
      ),

      variant: vehicleData.technicalData?.variant || null,

      version: vehicleData.technicalData?.version || null,

      typeCode: vehicleData.technicalData?.type || null,

      ecoCertificate:
        vehicleData.environmental?.emissionClass || null,

      currentOwner:
        vehicleData.ownerInfo?.ownerName || null,

      acquisitionDate: safeToISOString(
        vehicleData.ownerInfo?.acquisitionDate
      ),

      totalOwners: Number(
        vehicleData.ownerInfo?.numberOfUsers ?? 0
      ),

      organizationOwner:
        vehicleData.ownerInfo?.organizationName || null,

      lastInspection: safeToISOString(
        vehicleData.inspection?.inspectionDate
      ),

      nextInspectionDue: safeToISOString(
        vehicleData.inspection?.inspectionDateUpToAndIncluding
      ),

      inspectionMileage: Number(
        vehicleData.inspection?.mileage ?? 0
      ),

      inspectionStation:
        vehicleData.inspection?.inspectionStation || null,

      importID:
        vehicleData.origin?.importerId || null,

      directImport:
        vehicleData.origin?.directImport ? "Yes" : "No",
    };

    try {
      if (isEditMode && vehicleToEdit) {
        const response = await makePutRequest(
          `vehicles/${vehicleToEdit?.registrationNumber}`,
          payload
        );

        if (response.data.success) {
          toast.success("Vehicle updated successfully!");
          onClose();
        } else {
          const message =
            response.data.message ||
            "An unknown error occurred.";

          toast.error(message);
          setError(message);
        }
      } else {
        const response = await makePostRequest(
          "searchVehicle/SearchcreateVehicle",
          payload
        );

        if (response.data.success) {
          toast.success("Vehicle created successfully!");
          onClose();
        } else {
          const message =
            response.data.message ||
            "An unknown error occurred.";

          toast.error(message);
          setError(message);
        }
      }
    } catch (err: any) {
      console.error(
        `Failed to ${isEditMode ? "update" : "create"} vehicle:`,
        err
      );

      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An unexpected error occurred.";

      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    let finalValue: string | number | boolean = value;

    if (type === "checkbox") {
      finalValue = (
        e.target as HTMLInputElement
      ).checked;
    } else if (
      name === "GPS" ||
      name === "Sunroof" ||
      name === "directImport"
    ) {
      finalValue = value === "Yes";
    }

    setFormData((prev: any) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const renderInputField = (
    label: string,
    name: keyof typeof formData,
    type = "text",
    placeholder = "",
    icon?: React.ReactNode
  ) => (
    <div className="space-y-1.5">
      <label className="block text-[12px] sm:text-[13px] font-semibold text-slate-600 dark:text-slate-300">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
            {icon}
          </span>
        )}

        <input
          type={type}
          name={name as string}
          value={formData[name] ?? ""}
          onChange={handleChange}
          placeholder={
            placeholder ||
            `Enter ${label.toLowerCase()}...`
          }
          disabled={isLoading}
          className={`
            w-full h-11 rounded-xl
            border border-slate-200
            bg-slate-50
            text-slate-900
            placeholder:text-slate-400
            outline-none
            transition-all
            focus:border-blue-500
            focus:bg-white
            focus:ring-4
            focus:ring-blue-500/10
            disabled:cursor-not-allowed
            disabled:opacity-60
            dark:border-slate-700
            dark:bg-slate-900
            dark:text-white
            dark:placeholder:text-slate-500
            dark:focus:border-blue-500
            dark:focus:bg-slate-950
            ${icon ? "pl-10 pr-3" : "px-3"}
          `}
        />
      </div>
    </div>
  );

  const SectionHeader = ({
    icon,
    title,
    description,
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }) => (
    <div className="flex items-start gap-3 mb-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          {title}
        </h3>

        <p className="mt-0.5 text-[11px] leading-4 text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );

  const renderEditFields = () => (
    <div className="space-y-6">

      {/* Basic Information */}
      <section>
        <SectionHeader
          icon={<CarFront className="h-4.5 w-4.5" />}
          title="Vehicle Information"
          description="Basic details and identification"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {renderInputField(
            "Registration Number",
            "registrationNumber",
            "text",
            "e.g. ABC123",
            <CarFront className="h-4 w-4" />
          )}

          {renderInputField(
            "Vehicle Name",
            "vehicleName",
            "text",
            "Enter vehicle name"
          )}

          {renderInputField(
            "Model",
            "model",
            "text",
            "Enter model"
          )}

          {renderInputField(
            "Year",
            "year",
            "number",
            "e.g. 2024"
          )}

          {renderInputField(
            "Color",
            "color",
            "text",
            "Enter color"
          )}

          {renderInputField(
            "Chassis Number",
            "chassisNumber",
            "text",
            "Enter chassis number"
          )}

          {renderInputField(
            "Category",
            "category",
            "text",
            "Enter category"
          )}

          {renderInputField(
            "Type",
            "type",
            "text",
            "Enter vehicle type"
          )}

          {renderInputField(
            "Variant",
            "variant",
            "text",
            "Enter variant"
          )}

          {renderInputField(
            "Version",
            "version",
            "text",
            "Enter version"
          )}
        </div>
      </section>

      {/* Registration */}
      <section>
        <SectionHeader
          icon={<CalendarDays className="h-4.5 w-4.5" />}
          title="Registration & Dates"
          description="Registration and vehicle timeline"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {renderInputField(
            "Registration Date",
            "registrationDate",
            "date"
          )}

          {renderInputField(
            "Pre-Registration Date",
            "preRegistrationDate",
            "date"
          )}

          {renderInputField(
            "Status Date",
            "statusDate",
            "date"
          )}

          {renderInputField(
            "Acquisition Date",
            "acquisitionDate",
            "date"
          )}
        </div>
      </section>

      {/* Inspection */}
      <section>
        <SectionHeader
          icon={<ShieldCheck className="h-4.5 w-4.5" />}
          title="Inspection"
          description="Inspection and compliance information"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {renderInputField(
            "Last Inspection",
            "lastInspection",
            "date"
          )}

          {renderInputField(
            "Next Inspection Due",
            "nextInspectionDue",
            "date"
          )}

          {renderInputField(
            "Inspection Mileage",
            "inspectionMileage",
            "number"
          )}

          {renderInputField(
            "Inspection Station",
            "inspectionStation",
            "text",
            "Enter inspection station"
          )}

          {renderInputField(
            "Eco Certificate",
            "ecoCertificate",
            "text",
            "Enter certificate"
          )}
        </div>
      </section>

      {/* Technical */}
      <section>
        <SectionHeader
          icon={<Settings2 className="h-4.5 w-4.5" />}
          title="Technical Details"
          description="Engine, performance and transmission"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {renderInputField(
            "Mileage",
            "mileage",
            "number",
            "Enter mileage",
            <Gauge className="h-4 w-4" />
          )}

          {renderInputField(
            "Price",
            "price",
            "number",
            "Enter price"
          )}

          {renderInputField(
            "Horsepower",
            "horsepower",
            "text",
            "e.g. 250 Hk"
          )}

          {renderInputField(
            "Engine Volume",
            "engineVolume",
            "text",
            "e.g. 2.0L"
          )}

          {renderInputField(
            "Max Speed",
            "maxSpeed",
            "text",
            "e.g. 220 km/h"
          )}

          {renderInputField(
            "Fuel Type",
            "fuelType",
            "text",
            "e.g. Gasoline",
            <Fuel className="h-4 w-4" />
          )}

          {renderInputField(
            "Gearbox",
            "gearbox",
            "text",
            "e.g. Automatic"
          )}

          {renderInputField(
            "Drive",
            "drive",
            "text",
            "e.g. AWD"
          )}

          {renderInputField(
            "Type Code",
            "typeCode",
            "text",
            "Enter type code"
          )}
        </div>
      </section>

      {/* Weight */}
      <section>
        <SectionHeader
          icon={<Weight className="h-4.5 w-4.5" />}
          title="Weight & Capacity"
          description="Vehicle dimensions and passenger capacity"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {renderInputField(
            "Service Weight",
            "serviceWeight",
            "number"
          )}

          {renderInputField(
            "Total Weight",
            "totalWeight",
            "number"
          )}

          {renderInputField(
            "Vehicle Weight",
            "vehicleWeight",
            "number"
          )}

          {renderInputField(
            "Passengers",
            "passengers",
            "number"
          )}
        </div>
      </section>

      {/* Ownership */}
      <section>
        <SectionHeader
          icon={<UserRound className="h-4.5 w-4.5" />}
          title="Ownership"
          description="Current and previous ownership details"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {renderInputField(
            "Current Owner",
            "currentOwner",
            "text",
            "Enter current owner"
          )}

          {renderInputField(
            "Organization Owner",
            "organizationOwner",
            "text",
            "Enter organization"
          )}

          {renderInputField(
            "Total Owners",
            "totalOwners",
            "number"
          )}

          {renderInputField(
            "Import Origin",
            "importOrigin",
            "text",
            "Enter import origin"
          )}

          {renderInputField(
            "Import ID",
            "importID",
            "text",
            "Enter import ID"
          )}
        </div>
      </section>

      {/* Equipment */}
      <section>
        <SectionHeader
          icon={<PackageCheck className="h-4.5 w-4.5" />}
          title="Equipment"
          description="Select available vehicle equipment"
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label
            className={`
              flex cursor-pointer items-center justify-between
              rounded-xl border p-4
              transition-all
              ${
                formData.GPS
                  ? "border-blue-300 bg-blue-50 dark:border-blue-500/40 dark:bg-blue-500/10"
                  : "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900"
              }
            `}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm dark:bg-slate-800 dark:text-blue-400">
                <MapPin className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-white">
                  GPS
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Navigation system
                </p>
              </div>
            </div>

            <input
              type="checkbox"
              name="GPS"
              checked={!!formData.GPS}
              onChange={handleChange}
              disabled={isLoading}
              className="h-4.5 w-4.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600"
            />
          </label>

          <label
            className={`
              flex cursor-pointer items-center justify-between
              rounded-xl border p-4
              transition-all
              ${
                formData.Sunroof
                  ? "border-blue-300 bg-blue-50 dark:border-blue-500/40 dark:bg-blue-500/10"
                  : "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900"
              }
            `}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm dark:bg-slate-800 dark:text-blue-400">
                <CarFront className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-white">
                  Sunroof
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Panoramic roof option
                </p>
              </div>
            </div>

            <input
              type="checkbox"
              name="Sunroof"
              checked={!!formData.Sunroof}
              onChange={handleChange}
              disabled={isLoading}
              className="h-4.5 w-4.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600"
            />
          </label>
        </div>
      </section>

      {/* Import */}
      <section>
        <SectionHeader
          icon={<FileText className="h-4.5 w-4.5" />}
          title="Import Status"
          description="Vehicle import information"
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label
            className={`
              flex cursor-pointer items-center gap-3
              rounded-xl border p-4
              ${
                formData.directImport
                  ? "border-blue-300 bg-blue-50 dark:border-blue-500/40 dark:bg-blue-500/10"
                  : "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900"
              }
            `}
          >
            <input
              type="radio"
              name="directImport"
              value="Yes"
              checked={!!formData.directImport}
              onChange={handleChange}
              disabled={isLoading}
              className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-500"
            />

            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-white">
                Direct Import
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Vehicle was directly imported
              </p>
            </div>
          </label>

          <label
            className={`
              flex cursor-pointer items-center gap-3
              rounded-xl border p-4
              ${
                !formData.directImport
                  ? "border-blue-300 bg-blue-50 dark:border-blue-500/40 dark:bg-blue-500/10"
                  : "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900"
              }
            `}
          >
            <input
              type="radio"
              name="directImport"
              value="No"
              checked={!formData.directImport}
              onChange={handleChange}
              disabled={isLoading}
              className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-500"
            />

            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-white">
                Not Direct Import
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Vehicle was imported indirectly
              </p>
            </div>
          </label>
        </div>
      </section>
    </div>
  );

  return (
    <div
      className="
        fixed inset-0 z-[999]
        flex justify-end
        bg-black/50
        backdrop-blur-sm
        font-plus-jakarta
      "
    >
      <div
        className="
          flex h-full w-full
          max-w-[760px]
          flex-col
          overflow-hidden
          border-l border-slate-200
          bg-white
          shadow-2xl
          dark:border-slate-800
          dark:bg-[#0b1120]
        "
      >
        {/* Header */}
        <div
          className="
            shrink-0
            border-b border-slate-200
            bg-white/95
            px-4 py-4
            backdrop-blur
            sm:px-6 sm:py-5
            dark:border-slate-800
            dark:bg-[#0b1120]/95
          "
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div
                className="
                  flex h-11 w-11 shrink-0
                  items-center justify-center
                  rounded-xl
                  bg-blue-600
                  text-white
                  shadow-lg shadow-blue-600/20
                "
              >
                {isEditMode ? (
                  <Settings2 className="h-5 w-5" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                  {isEditMode
                    ? "Edit Vehicle"
                    : "Search Vehicle"}
                </h2>

                <p className="mt-0.5 text-[11px] leading-4 text-slate-500 sm:text-xs dark:text-slate-400">
                  {isEditMode
                    ? "Update vehicle information and details"
                    : "Enter a registration number to find vehicle details"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              aria-label="Close"
              className="
                flex h-9 w-9 shrink-0
                items-center justify-center
                rounded-xl
                text-slate-400
                transition
                hover:bg-slate-100
                hover:text-slate-700
                disabled:opacity-50
                dark:hover:bg-slate-800
                dark:hover:text-white
              "
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="shrink-0 px-4 pt-4 sm:px-6">
            <div
              className="
                flex items-start gap-3
                rounded-xl
                border border-red-200
                bg-red-50
                p-3.5
                dark:border-red-500/20
                dark:bg-red-500/10
              "
            >
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 dark:bg-red-500/10">
                <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-red-800 dark:text-red-300">
                  {isEditMode
                    ? "Vehicle update failed"
                    : "Vehicle search failed"}
                </p>

                <p className="mt-1 break-words text-[11px] leading-4 text-red-700 dark:text-red-400">
                  {error}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        <form
          id="vehicle-form"
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="scrollbar-hide flex-1 overflow-y-auto px-4 py-5 sm:px-6">
            {!isEditMode ? (
              <div className="mx-auto max-w-xl">
                <div
                  className="
                    rounded-2xl
                    border border-slate-200
                    bg-slate-50
                    p-5
                    dark:border-slate-800
                    dark:bg-slate-900/60
                    sm:p-6
                  "
                >
                  <div className="mb-6 flex flex-col items-center text-center">
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                      <CarFront className="h-7 w-7" />
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Find Vehicle Details
                    </h3>

                    <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500 dark:text-slate-400">
                      Enter the vehicle registration number.
                      We will retrieve the available vehicle
                      information automatically.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Registration Number
                    </label>

                    <div className="relative">
                      <CarFront className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                      <input
                        type="text"
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleChange}
                        placeholder="e.g. ABC123"
                        disabled={isLoading}
                        autoFocus
                        className="
                          h-14 w-full
                          rounded-xl
                          border border-slate-200
                          bg-white
                          pl-12 pr-4
                          text-base font-semibold
                          uppercase
                          tracking-wide
                          text-slate-900
                          outline-none
                          transition
                          placeholder:normal-case
                          placeholder:tracking-normal
                          placeholder:text-slate-400
                          focus:border-blue-500
                          focus:ring-4
                          focus:ring-blue-500/10
                          dark:border-slate-700
                          dark:bg-slate-950
                          dark:text-white
                          dark:placeholder:text-slate-500
                        "
                      />
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">
                      <Search className="mb-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        Search
                      </p>
                      <p className="mt-0.5 text-[10px] text-slate-400">
                        Find registration
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">
                      <CarFront className="mb-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        Vehicle
                      </p>
                      <p className="mt-0.5 text-[10px] text-slate-400">
                        Retrieve details
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">
                      <ShieldCheck className="mb-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        Secure
                      </p>
                      <p className="mt-0.5 text-[10px] text-slate-400">
                        Verified data
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              renderEditFields()
            )}
          </div>

          {/* Footer */}
          <div
            className="
              shrink-0
              border-t border-slate-200
              bg-white
              px-4 py-4
              dark:border-slate-800
              dark:bg-[#0b1120]
              sm:px-6
            "
          >
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="
                  h-11 w-full
                  rounded-xl
                  border border-slate-200
                  bg-white
                  px-5
                  text-sm font-semibold
                  text-slate-700
                  transition
                  hover:bg-slate-50
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-slate-200
                  dark:hover:bg-slate-800
                  sm:w-auto
                "
              >
                Cancel
              </button>

              {isEditMode && (
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() =>
                    setFormData({
                      ...initialVehicleState,
                      ...vehicleToEdit,
                    })
                  }
                  className="
                    h-11 w-full
                    rounded-xl
                    border border-blue-200
                    bg-blue-50
                    px-5
                    text-sm font-semibold
                    text-blue-700
                    transition
                    hover:bg-blue-100
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    dark:border-blue-500/20
                    dark:bg-blue-500/10
                    dark:text-blue-400
                    dark:hover:bg-blue-500/20
                    sm:w-auto
                  "
                >
                  Reset
                </button>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="
                  flex h-11 w-full
                  items-center justify-center gap-2
                  rounded-xl
                  bg-blue-600
                  px-6
                  text-sm font-semibold
                  text-white
                  shadow-lg
                  shadow-blue-600/20
                  transition
                  hover:bg-blue-700
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  sm:w-auto
                "
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>
                      {isEditMode
                        ? "Updating..."
                        : "Searching..."}
                    </span>
                  </>
                ) : (
                  <>
                    {isEditMode ? (
                      <Settings2 className="h-4 w-4" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}

                    <span>
                      {isEditMode
                        ? "Update Vehicle"
                        : "Search Vehicle"}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }

        input[type="date"]::-webkit-calendar-picker-indicator {
          opacity: 0.55;
          cursor: pointer;
        }

        .dark input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          opacity: 0.55;
        }
      `}</style>
    </div>
  );
};

export default SearchNewVehicle;