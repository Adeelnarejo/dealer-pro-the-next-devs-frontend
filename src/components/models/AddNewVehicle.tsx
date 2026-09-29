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
  Settings2,
  User,
  Globe2,
  ShieldCheck,
  Wrench,
  CircleDollarSign,
  Package,
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

const AddNewVehicle: React.FC<AddNewVehicleProps> = ({
  open,
  onClose,
  onSuccess,
  vehicleToEdit,
}) => {
  const [formData, setFormData] = useState<any>(initialVehicleState);

  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
          ? new Date(vehicleToEdit.statusDate)
              .toISOString()
              .split("T")[0]
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

   directImport:
  String(vehicleToEdit.directImport).toLowerCase() === "yes",

        notes: vehicleToEdit.notes || [],
        outlay: vehicleToEdit.outlay || [],
        documents: vehicleToEdit.documents || [],
      };

      setFormData(vehicleData);
      setHasSearched(true);
      setError(null);
    } else {
      setFormData({
        ...initialVehicleState,
        registrationDate: new Date()
          .toISOString()
          .split("T")[0],
      });

      setHasSearched(false);
      setError(null);
    }
  }, [vehicleToEdit, isEditMode, open]);

  if (!open) return null;

  /* =========================================================
      SEARCH VEHICLE
  ========================================================= */

  const handleSearchVehicle = async (regNumber: string) => {
    if (!regNumber.trim()) {
      toast.error("Please enter a registration number");
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const response = await fetch(
        `${BACKEND_API_ENDPOINT}agreements/external/agreements`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",

            Authorization:
              "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXBhcnRtZW50X2lkIjoiMDAwMDA5M2UyNDY5YjNhOGJmMTQ4NGVmODA5MWEyM2MiLCJ1c2VyX25hbWUiOiIwMDA1Y2ViN2I0ZmJjNmI1YjRlMzNjMTdlNGM4NDAzZiIsImRlcGFydG1lbnRfbmFtZSI6IlZhbGl0aXZlIENyZWRpdCIsImF1dGhvcml0aWVzIjpbIlZMVFZfQ1JFRElUX1NFQVJDSF9ETyIsIlZBTElUSVZFX0FQSV9BQ0NFU1MiXSwiY2xpZW50X2lkIjoiSU5TX1BBUlRORVIiLCJhdWQiOlsiVkFMSURJVkUiXSwidXNlcl9pZCI6IjAwMDVjZWI3YjRmYmM2YjViNGUzM2MxN2U0Yzg0MDNmIiwidXNlcl9yZWFsX25hbWUiOiJTYW1pciBLYXNzZW0iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUi",
          },

          body: JSON.stringify({
            type: "VEHICLE",
            query: regNumber,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Vehicle search failed (${response.status})`
        );
      }

      const data: VehicleSearchResponse =
        await response.json();

      if (data.success && data.count > 0) {
        const vehicleData = data.data[0];

        setFormData((prev: any) => ({
          ...prev,

          registrationNumber:
            vehicleData.registrationData
              .registrationNumber || prev.registrationNumber,

          vehicleName:
            `${vehicleData.detail.vehicleBrand || ""} ${
              vehicleData.detail.vehicleModel || ""
            }`.trim(),

          model:
            vehicleData.detail.vehicleModel ||
            prev.model,

          year:
            vehicleData.detail.vehicleYear ||
            prev.year,

          color:
            vehicleData.detail.color ||
            prev.color,

          chassisNumber:
            vehicleData.detail.chassisNumber ||
            prev.chassisNumber,

          registrationDate:
            vehicleData.registrationData.registeredOn ||
            prev.registrationDate,

          preRegistrationDate:
            vehicleData.origin?.preRegistrationDate ||
            "",

          fuelType:
            vehicleData.technicalData?.fuelCodes?.[0] ||
            "Unknown",

          gearbox:
            vehicleData.technicalData?.gearbox ||
            "",

          mileage:
            vehicleData.inspection?.mileage || 0,

          passengers:
            vehicleData.technicalData?.nrOfPassengers || 0,

          serviceWeight:
            vehicleData.technicalData?.serviceWeight || 0,

          totalWeight:
            vehicleData.technicalData?.totalWeight || 0,

          vehicleWeight:
            vehicleData.technicalData?.vehicleTypeWeight || 0,

          maxSpeed:
            vehicleData.technicalData?.maxSpeed || "",

          engineVolume:
            vehicleData.technicalData?.cylinderVolume
              ?.toString() || "",

          version:
            vehicleData.technicalData?.version || "",

          type:
            vehicleData.technicalData?.type || "",

          variant:
            vehicleData.technicalData?.variant || "",

          inspectionStation:
            vehicleData.inspection?.inspectionStation || "",

          inspectionMileage:
            vehicleData.inspection?.mileage || 0,

          lastInspection:
            vehicleData.inspection?.inspectionDate || "",

          nextInspectionDue:
            vehicleData.inspection
              ?.inspectionDateUpToAndIncluding || "",

          currentOwner:
            vehicleData.ownerInfo?.owner || "",

          organizationOwner:
            vehicleData.ownerInfo?.organization
              ? "Company"
              : "Private",

          acquisitionDate:
            vehicleData.ownerInfo?.acquisitionDate || "",

          totalOwners:
            vehicleData.ownerInfo?.numberOfUsers || 1,

          directImport:
            vehicleData.origin?.directImport || false,

          importOrigin:
            vehicleData.origin?.importerId || "",

          status: "In Stock",

          ecoCertificate:
            vehicleData.environmental?.emissionClass ||
            "",

          typeCode:
            vehicleData.technicalData?.eeg || "",

          importID:
            vehicleData.origin?.importerId || "",

          category:
            vehicleData.detail.vehicleCategory || "",

          drive:
            vehicleData.technicalData?.allWheelDrive
              ? "AWD"
              : "2WD",
        }));

        setHasSearched(true);

        toast.success(
          "Vehicle details loaded successfully!"
        );
      } else {
        toast.error(
          "No vehicle found. You can still enter the vehicle details manually."
        );

        setHasSearched(false);
      }
    } catch (error) {
      console.error(
        "Error searching vehicle:",
        error
      );

      toast.error(
        "Vehicle search failed. You can still enter the details manually."
      );

      setHasSearched(false);
    } finally {
      setIsSearching(false);
    }
  };

  /* =========================================================
      SUBMIT
  ========================================================= */

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    /*
     * IMPORTANT:
     * Search is optional now.
     * User can manually enter vehicle information
     * and create the vehicle.
     */

    setIsLoading(true);
    setError(null);

    const safeToISOString = (
      dateString: string
    ) => {
      if (!dateString) return null;

      const date = new Date(dateString);

      if (Number.isNaN(date.getTime())) {
        return null;
      }

      return date.toISOString();
    };

    const payload: any = {
      ...formData,

      year:
        formData.year === "" ||
        formData.year === null
          ? null
          : Number(formData.year),

      price:
        formData.price === "" ||
        formData.price === null
          ? 0
          : Number(formData.price),

      mileage:
        formData.mileage === "" ||
        formData.mileage === null
          ? 0
          : Number(formData.mileage),

      daysInStock:
        formData.daysInStock === "" ||
        formData.daysInStock === null
          ? 0
          : Number(formData.daysInStock),

      serviceWeight:
        formData.serviceWeight === "" ||
        formData.serviceWeight === null
          ? 0
          : Number(formData.serviceWeight),

      totalWeight:
        formData.totalWeight === "" ||
        formData.totalWeight === null
          ? 0
          : Number(formData.totalWeight),

      vehicleWeight:
        formData.vehicleWeight === "" ||
        formData.vehicleWeight === null
          ? 0
          : Number(formData.vehicleWeight),

      passengers:
        formData.passengers === "" ||
        formData.passengers === null
          ? 0
          : Number(formData.passengers),

      totalOwners:
        formData.totalOwners === "" ||
        formData.totalOwners === null
          ? 0
          : Number(formData.totalOwners),

      inspectionMileage:
        formData.inspectionMileage === "" ||
        formData.inspectionMileage === null
          ? 0
          : Number(formData.inspectionMileage),

      registrationDate: safeToISOString(
        formData.registrationDate
      ),

      preRegistrationDate: safeToISOString(
        formData.preRegistrationDate
      ),

      registrationRenewed: safeToISOString(
        formData.registrationRenewed
      ),

      statusDate: safeToISOString(
        formData.statusDate
      ),

      acquisitionDate: safeToISOString(
        formData.acquisitionDate
      ),

      lastInspection: safeToISOString(
        formData.lastInspection
      ),

      nextInspectionDue: safeToISOString(
        formData.nextInspectionDue
      ),

      equipment: {
        GPS: Boolean(formData.GPS),
        Sunroof: Boolean(formData.Sunroof),
      },

      directImport: formData.directImport
        ? "Yes"
        : "No",
    };

    if (isEditMode && vehicleToEdit) {
      payload.notes =
        vehicleToEdit.notes?.map(
          (note: any) => note.text
        ) || [];

      payload.outlay =
        vehicleToEdit.outlay || [];

      payload.documents =
        vehicleToEdit.documents || [];
    }

    console.log(
      "Vehicle payload:",
      payload
    );

    try {
      /* =====================================================
          UPDATE
      ===================================================== */

      if (isEditMode && vehicleToEdit) {
        const response = await makePutRequest(
          `vehicles/updateVehicle/${vehicleToEdit.registrationNumber}`,
          payload
        );

        if (response.data.success) {
          toast.success(
            "Vehicle updated successfully!"
          );

          const needsRedirect =
            vehicleToEdit.registrationNumber !==
            payload.registrationNumber;

          onSuccess(needsRedirect);
        } else {
          const message =
            response.data.message ||
            "Unable to update vehicle.";

          toast.error(message);
          setError(message);
        }

        return;
      }

      /* =====================================================
          CREATE
      ===================================================== */

      const response = await makePostRequest(
        "vehicles/createVehicle",
        payload
      );

      if (response.data.success) {
        toast.success(
          "Vehicle created successfully!"
        );

        onSuccess();
      } else {
        const message =
          response.data.message ||
          "Unable to create vehicle.";

        toast.error(message);
        setError(message);
      }
    } catch (err: any) {
      console.error(
        `Failed to ${
          isEditMode
            ? "update"
            : "create"
        } vehicle:`,
        err
      );

      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "An unexpected error occurred.";

      toast.error(errorMessage);

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  /* =========================================================
      HANDLE CHANGE
  ========================================================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const {
      name,
      value,
      type,
    } = e.target;

    let finalValue:
      | string
      | number
      | boolean = value;

    if (type === "checkbox") {
      finalValue = (
        e.target as HTMLInputElement
      ).checked;
    }

    if (
      name === "GPS" ||
      name === "Sunroof"
    ) {
      finalValue =
        type === "checkbox"
          ? (
              e.target as HTMLInputElement
            ).checked
          : value === "Yes";
    }

    if (name === "directImport") {
      finalValue = value === "Yes";
    }

    setFormData(
      (prev: any) => ({
        ...prev,
        [name]: finalValue,
      })
    );

    /*
     * If user changes registration number manually,
     * search status is no longer treated as authoritative.
     */
    if (name === "registrationNumber") {
      setHasSearched(false);
    }
  };

  /* =========================================================
      STYLES
  ========================================================= */

  const inputClass = `
    w-full rounded-xl
    border border-slate-200
    bg-slate-50
    px-4 py-3
    text-sm text-slate-800
    outline-none
    transition-all duration-200
    placeholder:text-slate-400

    focus:border-blue-500
    focus:ring-4
    focus:ring-blue-500/10

    dark:border-slate-700
    dark:bg-slate-900
    dark:text-slate-200
    dark:placeholder:text-slate-600
  `;

  const labelClass = `
    mb-2 block
    text-xs font-semibold
    text-slate-700
    dark:text-slate-300
  `;

  /* =========================================================
      INPUT FIELD
  ========================================================= */

  const renderInputField = (
    label: string,
    name: keyof typeof formData,
    type = "text",
    placeholder = "",
    withSearch = false
  ) => (
    <div>
      <label
        htmlFor={`vehicle-${String(name)}`}
        className={labelClass}
      >
        {label}
      </label>

      <div
        className={
          withSearch
            ? "flex flex-col gap-2 sm:flex-row"
            : ""
        }
      >
        <input
          id={`vehicle-${String(name)}`}
          type={type}
          name={name as string}
          value={
            formData[name] ??
            ""
          }
          onChange={handleChange}
          placeholder={
            placeholder ||
            `Enter ${label.toLowerCase()}...`
          }
          className={inputClass}
          disabled={
            isLoading ||
            (withSearch && isEditMode)
          }
        />

        {withSearch && !isEditMode && (
          <button
            type="button"
            onClick={() =>
              handleSearchVehicle(
                formData.registrationNumber
              )
            }
            disabled={
              isSearching ||
              isLoading
            }
            className="
              flex min-h-[46px]
              w-full shrink-0
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#012F7A]
              px-5
              text-sm font-semibold
              text-white
              shadow-lg
              shadow-blue-900/20
              transition-all
              duration-200
              hover:bg-blue-700
              active:scale-[0.98]
              disabled:cursor-not-allowed
              disabled:opacity-50
              sm:w-auto
            "
          >
            {isSearching ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Searching
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                Search
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );

  /* =========================================================
      SECTION HEADER
  ========================================================= */

  const renderSectionHeader = (
    icon: React.ReactNode,
    title: string,
    subtitle: string
  ) => (
    <div className="mb-4 flex items-center gap-3">
      <div
        className="
          flex h-9 w-9 shrink-0
          items-center
          justify-center
          rounded-lg
          bg-blue-50
          text-blue-600
          dark:bg-blue-500/10
          dark:text-blue-400
        "
      >
        {icon}
      </div>

      <div>
        <h3
          className="
            text-sm font-semibold
            text-slate-900
            dark:text-white
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-0.5
            text-[11px]
            text-slate-500
            dark:text-slate-400
          "
        >
          {subtitle}
        </p>
      </div>
    </div>
  );

  /* =========================================================
      ALL FIELDS
  ========================================================= */

  const renderAllFields = () => (
    <div className="space-y-7">
      {/* =====================================================
          BASIC INFORMATION
      ===================================================== */}

      <section>
        {renderSectionHeader(
          <CarFront className="h-4 w-4" />,
          "Basic Vehicle Information",
          "Core details about the vehicle"
        )}

        <div className="grid grid-cols-1 gap-4">
          {renderInputField(
            "Registration Number",
            "registrationNumber",
            "text",
            "ABC-123",
            true
          )}

          {renderInputField(
            "Vehicle Name",
            "vehicleName",
            "text",
            "BMW 3 Series"
          )}

          {renderInputField(
            "Model",
            "model",
            "text",
            "330i"
          )}

          <div className="grid grid-cols-2 gap-3">
            {renderInputField(
              "Year",
              "year",
              "number",
              "2022"
            )}

            {renderInputField(
              "Color",
              "color",
              "text",
              "Black"
            )}
          </div>

          {renderInputField(
            "Chassis Number",
            "chassisNumber",
            "text",
            "WBA8B9C50NK123456"
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {renderInputField(
              "Category",
              "category",
              "text",
              "Sedan"
            )}

            {renderInputField(
              "Type",
              "type",
              "text",
              "Passenger Car"
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          REGISTRATION
      ===================================================== */}

      <section>
        {renderSectionHeader(
          <CalendarDays className="h-4 w-4" />,
          "Registration & Dates",
          "Registration and ownership timeline"
        )}

        <div className="grid grid-cols-1 gap-4">
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
            "Registration Renewed",
            "registrationRenewed",
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

      {/* =====================================================
          PRICING
      ===================================================== */}

      <section>
        {renderSectionHeader(
          <CircleDollarSign className="h-4 w-4" />,
          "Pricing & Usage",
          "Financial and vehicle usage details"
        )}

        <div className="grid grid-cols-1 gap-4">
          {renderInputField(
            "Price",
            "price",
            "number",
            "45000"
          )}

          {renderInputField(
            "Mileage",
            "mileage",
            "number",
            "32500"
          )}

          {renderInputField(
            "Days in Stock",
            "daysInStock",
            "number",
            "18"
          )}

          {renderInputField(
            "Horsepower",
            "horsepower",
            "text",
            "255 HP"
          )}
        </div>
      </section>

      {/* =====================================================
          ENGINE
      ===================================================== */}

      <section>
        {renderSectionHeader(
          <Settings2 className="h-4 w-4" />,
          "Engine & Technical",
          "Technical specifications and drivetrain"
        )}

        <div className="grid grid-cols-1 gap-4">
          {renderInputField(
            "Engine Volume",
            "engineVolume",
            "text",
            "1998 cc"
          )}

          {renderInputField(
            "Max Speed",
            "maxSpeed",
            "text",
            "250 km/h"
          )}

          {renderInputField(
            "Fuel Type",
            "fuelType",
            "text",
            "Petrol"
          )}

          {renderInputField(
            "Gearbox",
            "gearbox",
            "text",
            "Automatic"
          )}

          {renderInputField(
            "Drive",
            "drive",
            "text",
            "RWD"
          )}

          {renderInputField(
            "Variant",
            "variant",
            "text",
            "M Sport"
          )}

          {renderInputField(
            "Version",
            "version",
            "text",
            "G20"
          )}

          {renderInputField(
            "Type Code",
            "typeCode",
            "text",
            "3B91"
          )}

          {renderInputField(
            "Eco Certificate",
            "ecoCertificate",
            "text",
            "Euro 6"
          )}
        </div>
      </section>

      {/* =====================================================
          WEIGHT
      ===================================================== */}

      <section>
        {renderSectionHeader(
          <Gauge className="h-4 w-4" />,
          "Weight & Capacity",
          "Vehicle dimensions and passenger capacity"
        )}

        <div className="grid grid-cols-1 gap-4">
          {renderInputField(
            "Service Weight",
            "serviceWeight",
            "number",
            "1580"
          )}

          {renderInputField(
            "Total Weight",
            "totalWeight",
            "number",
            "2050"
          )}

          {renderInputField(
            "Vehicle Weight",
            "vehicleWeight",
            "number",
            "1580"
          )}

          {renderInputField(
            "Passengers",
            "passengers",
            "number",
            "5"
          )}
        </div>
      </section>

      {/* =====================================================
          INSPECTION
      ===================================================== */}

      <section>
        {renderSectionHeader(
          <Wrench className="h-4 w-4" />,
          "Inspection",
          "Inspection history and current mileage"
        )}

        <div className="grid grid-cols-1 gap-4">
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
            "number",
            "30000"
          )}

          {renderInputField(
            "Inspection Station",
            "inspectionStation",
            "text",
            "DealerPro Inspection Center"
          )}
        </div>
      </section>

      {/* =====================================================
          OWNERSHIP
      ===================================================== */}

      <section>
        {renderSectionHeader(
          <User className="h-4 w-4" />,
          "Ownership",
          "Current owner and ownership history"
        )}

        <div className="grid grid-cols-1 gap-4">
          {renderInputField(
            "Current Owner",
            "currentOwner",
            "text",
            "DealerPro Motors"
          )}

          {renderInputField(
            "Organization Owner",
            "organizationOwner",
            "text",
            "Company"
          )}

          {renderInputField(
            "Total Owners",
            "totalOwners",
            "number",
            "2"
          )}
        </div>
      </section>

      {/* =====================================================
          IMPORT
      ===================================================== */}

      <section>
        {renderSectionHeader(
          <Globe2 className="h-4 w-4" />,
          "Import Information",
          "Vehicle origin and import details"
        )}

        <div className="grid grid-cols-1 gap-4">
          {renderInputField(
            "Import Origin",
            "importOrigin",
            "text",
            "Germany"
          )}

          {renderInputField(
            "Import ID",
            "importID",
            "text",
            "IMP-2025-00125"
          )}
        </div>
      </section>

      {/* =====================================================
          EQUIPMENT
      ===================================================== */}

      <section>
        {renderSectionHeader(
          <Package className="h-4 w-4" />,
          "Equipment & Features",
          "Select available vehicle equipment"
        )}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* GPS */}

          <label
            className="
              flex cursor-pointer
              items-center justify-between
              rounded-xl
              border border-slate-200
              bg-slate-50
              px-4 py-3
              transition-all
              hover:border-blue-300
              dark:border-slate-700
              dark:bg-slate-900
              dark:hover:border-blue-500/40
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex h-8 w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-white
                  text-blue-600
                  dark:bg-slate-800
                  dark:text-blue-400
                "
              >
                <Gauge className="h-4 w-4" />
              </div>

              <span
                className="
                  text-sm font-medium
                  text-slate-700
                  dark:text-slate-300
                "
              >
                GPS
              </span>
            </div>

            <input
              type="checkbox"
              name="GPS"
              checked={!!formData.GPS}
              onChange={handleChange}
              className="
                h-4 w-4
                rounded
                border-slate-300
                text-blue-600
                focus:ring-blue-500
                dark:border-slate-600
                dark:bg-slate-800
              "
            />
          </label>

          {/* SUNROOF */}

          <label
            className="
              flex cursor-pointer
              items-center justify-between
              rounded-xl
              border border-slate-200
              bg-slate-50
              px-4 py-3
              transition-all
              hover:border-blue-300
              dark:border-slate-700
              dark:bg-slate-900
              dark:hover:border-blue-500/40
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex h-8 w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-white
                  text-blue-600
                  dark:bg-slate-800
                  dark:text-blue-400
                "
              >
                <CarFront className="h-4 w-4" />
              </div>

              <span
                className="
                  text-sm font-medium
                  text-slate-700
                  dark:text-slate-300
                "
              >
                Sunroof
              </span>
            </div>

            <input
              type="checkbox"
              name="Sunroof"
              checked={!!formData.Sunroof}
              onChange={handleChange}
              className="
                h-4 w-4
                rounded
                border-slate-300
                text-blue-600
                focus:ring-blue-500
                dark:border-slate-600
                dark:bg-slate-800
              "
            />
          </label>
        </div>
      </section>

      {/* =====================================================
          DIRECT IMPORT
      ===================================================== */}

      <section>
        {renderSectionHeader(
          <ShieldCheck className="h-4 w-4" />,
          "Import Status",
          "Specify whether the vehicle was directly imported"
        )}

        <div className="grid grid-cols-2 gap-3">
          {/* YES */}

          <label
            className={`
              flex cursor-pointer
              items-center gap-3
              rounded-xl
              border px-4 py-3
              transition-all

              ${
                formData.directImport
                  ? `
                    border-blue-500
                    bg-blue-50
                    dark:border-blue-500/50
                    dark:bg-blue-500/10
                  `
                  : `
                    border-slate-200
                    bg-slate-50
                    dark:border-slate-700
                    dark:bg-slate-900
                  `
              }
            `}
          >
            <input
              type="radio"
              name="directImport"
              value="Yes"
              checked={
                !!formData.directImport
              }
              onChange={handleChange}
              className="
                h-4 w-4
                border-slate-300
                text-blue-600
                focus:ring-blue-500
                dark:border-slate-600
              "
            />

            <span
              className="
                text-sm font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Direct Import
            </span>
          </label>

          {/* NO */}

          <label
            className={`
              flex cursor-pointer
              items-center gap-3
              rounded-xl
              border px-4 py-3
              transition-all

              ${
                !formData.directImport
                  ? `
                    border-blue-500
                    bg-blue-50
                    dark:border-blue-500/50
                    dark:bg-blue-500/10
                  `
                  : `
                    border-slate-200
                    bg-slate-50
                    dark:border-slate-700
                    dark:bg-slate-900
                  `
              }
            `}
          >
            <input
              type="radio"
              name="directImport"
              value="No"
              checked={
                !formData.directImport
              }
              onChange={handleChange}
              className="
                h-4 w-4
                border-slate-300
                text-blue-600
                focus:ring-blue-500
                dark:border-slate-600
              "
            />

            <span
              className="
                text-sm font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Not Direct
            </span>
          </label>
        </div>
      </section>
    </div>
  );

  /* =========================================================
      RETURN
  ========================================================= */

  return (
    <div
      className="
        fixed inset-0
        z-[999]
        flex justify-end
        bg-black/50
        backdrop-blur-sm
        font-plus-jakarta
      "
    >
      <div
        className="
          flex h-full
          w-full
          max-w-[680px]
          flex-col
          overflow-hidden
          border-l
          border-slate-200
          bg-white
          shadow-2xl
          animate-[slideIn_.25s_ease-out]
          dark:border-slate-800
          dark:bg-[#0b1120]
        "
      >
        {/* ===================================================
            HEADER
        =================================================== */}

        <div
          className="
            flex shrink-0
            items-center
            justify-between
            border-b
            border-slate-200
            px-5 py-4
            sm:px-6 sm:py-5
            dark:border-slate-800
          "
        >
          <div
            className="
              flex min-w-0
              items-center
              gap-3
            "
          >
            <div
              className="
                flex h-11 w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-blue-50
                text-blue-600
                dark:bg-blue-500/10
                dark:text-blue-400
              "
            >
              <CarFront className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <h2
                className="
                  truncate
                  text-[17px]
                  font-semibold
                  text-slate-900
                  dark:text-white
                "
              >
                {isEditMode
                  ? "Edit Vehicle"
                  : "Add New Vehicle"}
              </h2>

              <p
                className="
                  mt-0.5
                  truncate
                  text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >
                {isEditMode
                  ? "Update vehicle information"
                  : "Add a vehicle to your inventory"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="
              ml-3
              flex h-9 w-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              text-slate-400
              transition-all
              duration-200
              hover:bg-slate-100
              hover:text-slate-700
              dark:hover:bg-slate-800
              dark:hover:text-white
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ===================================================
            SEARCH STATUS
        =================================================== */}

        {!isEditMode && (
          <div
            className="
              shrink-0
              border-b
              border-slate-200
              bg-slate-50/80
              px-5 py-3
              dark:border-slate-800
              dark:bg-slate-900/50
            "
          >
            <div className="flex items-center gap-2">
              <div
                className={`
                  h-2 w-2
                  rounded-full

                  ${
                    hasSearched
                      ? "bg-emerald-500"
                      : "bg-slate-300 dark:bg-slate-600"
                  }
                `}
              />

              <p
                className="
                  text-[11px]
                  font-medium
                  text-slate-600
                  dark:text-slate-400
                "
              >
                {hasSearched
                  ? "Vehicle details loaded — you can review and save."
                  : "Enter vehicle details manually or search by registration number."}
              </p>
            </div>
          </div>
        )}

        {/* ===================================================
            ERROR
        =================================================== */}

        {error && (
          <div
            className="
              mx-5 mt-4
              shrink-0
              flex items-start
              gap-3
              rounded-xl
              border
              border-red-200
              bg-red-50
              p-3.5
              sm:mx-6
              dark:border-red-500/20
              dark:bg-red-500/5
            "
          >
            <AlertCircle
              className="
                mt-0.5
                h-5 w-5
                shrink-0
                text-red-500
              "
            />

            <div className="min-w-0">
              <h3
                className="
                  text-xs
                  font-semibold
                  text-red-700
                  dark:text-red-400
                "
              >
                Failed to{" "}
                {isEditMode
                  ? "update"
                  : "create"}{" "}
                vehicle
              </h3>

              <p
                className="
                  mt-1
                  break-words
                  text-[11px]
                  leading-5
                  text-red-600
                  dark:text-red-400/80
                "
              >
                {error}
              </p>
            </div>
          </div>
        )}

        {/* ===================================================
            FORM
        =================================================== */}

        <form
          id="vehicle-form"
          onSubmit={handleSubmit}
          className="
            scrollbar-hide
            flex-1
            overflow-y-auto
            px-5 py-6
            sm:px-6
          "
        >
          {renderAllFields()}

          <div className="h-4" />
        </form>

        {/* ===================================================
            FOOTER
        =================================================== */}

        <div
          className="
            shrink-0
            border-t
            border-slate-200
            bg-white/95
            px-5 py-4
            backdrop-blur
            sm:px-6 sm:py-5
            dark:border-slate-800
            dark:bg-[#0b1120]/95
          "
        >
          <div
            className="
              flex
              flex-col-reverse
              gap-3
              sm:flex-row
            "
          >
            {/* RESET */}

            <button
              type="button"
              onClick={() => {
                if (isEditMode) {
                  setFormData({
                    ...formData,
                  });
                } else {
                  setFormData({
                    ...initialVehicleState,

                    registrationDate:
                      new Date()
                        .toISOString()
                        .split("T")[0],
                  });
                }

                setHasSearched(false);
                setError(null);
              }}
              disabled={isLoading}
              className="
                flex-1
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4 py-3
                text-sm
                font-semibold
                text-slate-700
                transition-all
                duration-200
                hover:bg-slate-50
                disabled:cursor-not-allowed
                disabled:opacity-50
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-slate-200
                dark:hover:bg-slate-800
              "
            >
              Reset
            </button>

            {/* ADD / UPDATE */}

            <button
              type="submit"
              form="vehicle-form"
              disabled={isLoading}
              className="
                flex
                flex-1
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#012F7A]
                px-4 py-3
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-blue-900/20
                transition-all
                duration-200
                hover:bg-blue-700
                hover:shadow-blue-600/30
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-40
                disabled:shadow-none
              "
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />

                  {isEditMode
                    ? "Updating..."
                    : "Creating..."}
                </>
              ) : isEditMode ? (
                "Update Vehicle"
              ) : (
                "Add Vehicle"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          STYLES
      ====================================================== */}

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0.8;
          }

          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }

        .dark input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          opacity: 0.55;
        }

        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
};

export default AddNewVehicle;