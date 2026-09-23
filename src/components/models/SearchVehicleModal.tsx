import React, { useState, useEffect } from "react";
import { makePostRequest, makePutRequest } from "../../api/Api";
import { AlertCircle, Loader2 } from "lucide-react";
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
  //   onSuccess,
  vehicleToEdit,
}) => {
  const [formData, setFormData] = useState<any>(initialVehicleState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEditMode = !!vehicleToEdit;
  const [searchedVehicle, setSearchedVehicle] = useState<any | null>(null);

  useEffect(() => {
    if (isEditMode && vehicleToEdit) {
      const vehicleData = {
        ...initialVehicleState,
        ...vehicleToEdit,
        registrationDate: vehicleToEdit.registrationDate
          ? new Date(vehicleToEdit.registrationDate).toISOString().split("T")[0]
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
          ? new Date(vehicleToEdit.acquisitionDate).toISOString().split("T")[0]
          : "",
        lastInspection: vehicleToEdit.lastInspection
          ? new Date(vehicleToEdit.lastInspection).toISOString().split("T")[0]
          : "",
        nextInspectionDue: vehicleToEdit.nextInspectionDue
          ? new Date(vehicleToEdit.nextInspectionDue)
              .toISOString()
              .split("T")[0]
          : "",
        GPS: vehicleToEdit.equipment?.GPS || false,
        Sunroof: vehicleToEdit.equipment?.Sunroof || false,
        directImport: vehicleToEdit.directImport === "Yes",
        // Ensure notes are preserved in the correct format
        notes: vehicleToEdit.notes || [],
        outlay: vehicleToEdit.outlay || [],
        documents: vehicleToEdit.documents || [],
      };
      setFormData(vehicleData);
    } else {
      setFormData(initialVehicleState);
    }
  }, [vehicleToEdit, isEditMode, open]);

  if (!open) return null;

  // const handleSearchVehicle = async (regNumber: string) => {
  //   try {
  //     const response = await fetch(
  //       `${BACKEND_API_ENDPOINT}agreements/external/agreements`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer <your-token>",
  //         },
  //         body: JSON.stringify({
  //           type: "VEHICLE",
  //           query: regNumber,
  //         }),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data: VehicleSearchResponse = await response.json();
  //     const vehicle = data.data[0];

  //     console.log("Search Vehicle Response:", vehicle);

  //     if (data.success && data.count > 0) {
  //       setSearchedVehicle(vehicle); // <-- yahan state update karo
  //       toast.success("Vehicle found! Proceeding with creation...");
  //       return true;
  //     } else {
  //       toast.error("No vehicle found with this registration number");
  //       return false;
  //     }
  //   } catch (error) {
  //     console.error("Error searching vehicle:", error);
  //     toast.error("Failed to search vehicle. Please try again.");
  //     return false;
  //   }
  // };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setError(null);

  //   // If not in edit mode, first search for the vehicle
  //   if (!isEditMode) {
  //     if (!formData.registrationNumber) {
  //       toast.error("Please enter a registration number");
  //       setIsLoading(false);
  //       return;
  //     }

  //     // Search for vehicle first
  //     const vehicleFound = await handleSearchVehicle(
  //       formData.registrationNumber
  //     );
  //     if (!vehicleFound) {
  //       setIsLoading(false);
  //       return;
  //     }
  //   }

  //   const safeToISOString = (dateString: string) => {
  //     return dateString ? new Date(dateString).toISOString() : null;
  //   };

    
  //   if (!searchedVehicle) {
  //     toast.error("No vehicle data found in state");
  //     setIsLoading(false);
  //     return;
  //   }

  //   const payload = {
  //     year: Number(searchedVehicle.detail?.vehicleYear ?? 0),
  //     price: Number(searchedVehicle.detail?.price ?? 0),
  //     mileage: Number(searchedVehicle.inspection?.mileage ?? 0),
  //     daysInStock: 0,
  //     serviceWeight: Number(searchedVehicle.technicalData?.serviceWeight ?? 0),
  //     totalWeight: Number(searchedVehicle.technicalData?.totalWeight ?? 0),
  //     vehicleWeight: Number(searchedVehicle.technicalData?.vehicleWeight ?? 0),
  //     passengers: Number(searchedVehicle.technicalData?.nrOfPassengers ?? 0),
  //     totalOwners: Number(searchedVehicle.ownerInfo?.numberOfUsers ?? 0),
  //     inspectionMileage: Number(searchedVehicle.inspection?.mileage ?? 0),
  //     registrationDate: safeToISOString(searchedVehicle.detail?.registrationDate),
  //     preRegistrationDate: safeToISOString(searchedVehicle.origin?.preRegistrationDate),
  //     registrationRenewed: safeToISOString(searchedVehicle.status?.date),
  //     statusDate: safeToISOString(searchedVehicle.status?.date),
  //     acquisitionDate: safeToISOString(searchedVehicle.ownerInfo?.acquisitionDate),
  //     lastInspection: safeToISOString(searchedVehicle.inspection?.inspectionDate),
  //     nextInspectionDue: safeToISOString(searchedVehicle.inspection?.inspectionDateUpToAndIncluding),

  //     equipment: {
  //       GPS: searchedVehicle.equipment?.includes("GPS") ?? false,
  //       Sunroof: searchedVehicle.equipment?.includes("Sunroof") ?? false,
  //     },

  //     directImport: searchedVehicle.origin?.directImport ? "Yes" : "No",
  //   };


  //   if (isEditMode && vehicleToEdit) {
  //     payload.notes = vehicleToEdit.notes.map((note) => note.text);
  //     payload.outlay = vehicleToEdit.outlay || [];
  //     payload.documents = vehicleToEdit.documents || [];
  //   }

  //   try {
  //     if (isEditMode) {
  //       const response = await makePutRequest(
  //         `vehicles/${vehicleToEdit?.registrationNumber}`,
  //         payload
  //       );
  //       if (response.data.success) {
  //         toast.success("Vehicle updated successfully!");
  //         const needsRedirect =
  //           vehicleToEdit?.registrationNumber !== payload.registrationNumber;

  //           console.log(needsRedirect);

  //         // onSuccess(needsRedirect);
  //       } else {
  //         toast.error(response.data.message || "An unknown error occurred.");
  //         setError(response.data.message || "An unknown error occurred.");
  //       }
  //     } else {
  //       const response = await makePostRequest(
  //         "searchVehicle/SearchcreateVehicle",
  //         payload
  //       );
  //       if (response.data.success) {
  //         toast.success("Vehicle created successfully!");
  //         // onSuccess();
  //       } else {
  //         toast.error(response.data.message || "An unknown error occurred.");
  //         setError(response.data.message || "An unknown error occurred.");
  //       }
  //     }
  //   } catch (err: any) {
  //     console.error(
  //       `Failed to ${isEditMode ? "update" : "create"} vehicle:`,
  //       err
  //     );
  //     const errorMessage =
  //       err.response?.data?.message ||
  //       err.message ||
  //       "An unexpected error occurred.";
  //     toast.error(errorMessage);
  //     setError(errorMessage);
  //   } finally {
  //     setIsLoading(false);
  //   }
  //   onClose?.();
  //   setIsLoading(false);
  // };


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
        setSearchedVehicle(vehicle); // state update bhi kar do (for later use)
        toast.success("Vehicle found! Proceeding with creation...");
        return vehicle; // <-- yahan return kar diya
      } else {
        toast.error("No vehicle found with this registration number");
        return null;
      }
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

      // Search for vehicle first
      vehicleData = await handleSearchVehicle(formData.registrationNumber);

      if (!vehicleData) {
        setIsLoading(false);
        return;
      }
    }

    const safeToISOString = (dateString: string) => {
      return dateString ? new Date(dateString).toISOString() : null;
    };

    // const payload = {
    //   year: Number(vehicleData.detail?.vehicleYear ?? 0),
    //   price: Number(vehicleData.detail?.price ?? 0),
    //   mileage: Number(vehicleData.inspection?.mileage ?? 0),
    //   daysInStock: 0,
    //   serviceWeight: Number(vehicleData.technicalData?.serviceWeight ?? 0),
    //   totalWeight: Number(vehicleData.technicalData?.totalWeight ?? 0),
    //   vehicleWeight: Number(vehicleData.technicalData?.vehicleWeight ?? 0),
    //   passengers: Number(vehicleData.technicalData?.nrOfPassengers ?? 0),
    //   totalOwners: Number(vehicleData.ownerInfo?.numberOfUsers ?? 0),
    //   inspectionMileage: Number(vehicleData.inspection?.mileage ?? 0),
    //   registrationDate: safeToISOString(vehicleData.detail?.registrationDate),
    //   preRegistrationDate: safeToISOString(vehicleData.origin?.preRegistrationDate),
    //   registrationRenewed: safeToISOString(vehicleData.status?.date),
    //   statusDate: safeToISOString(vehicleData.status?.date),
    //   acquisitionDate: safeToISOString(vehicleData.ownerInfo?.acquisitionDate),
    //   lastInspection: safeToISOString(vehicleData.inspection?.inspectionDate),
    //   nextInspectionDue: safeToISOString(vehicleData.inspection?.inspectionDateUpToAndIncluding),
    //   equipment: {
    //     GPS: vehicleData.equipment?.includes("GPS") ?? false,
    //     Sunroof: vehicleData.equipment?.includes("Sunroof") ?? false,
    //   },
    //   directImport: vehicleData.origin?.directImport ? "Yes" : "No",
    // };


    const payload = {
  registrationNumber:
    vehicleData.registrationData?.registrationNumber ||
    formData.registrationNumber,

  // model aur vehicleName combine karke
  model: vehicleData.detail?.vehicleModel || null,
  vehicleName: `${vehicleData.detail?.vehicleBrand || ""} ${
    vehicleData.detail?.vehicleModel || ""
  }`.trim(),

  year: Number(vehicleData.detail?.vehicleYear ?? 0),

  // category mapping (agar directly category hai to wo, warna fallback)
  category: vehicleData.detail?.vehicleCategory || null,

  status: "Available", // default set karna hai

  importOrigin: vehicleData.country || null,

  registrationDate: safeToISOString(
    vehicleData.registrationData?.registeredOn
  ),

  price: Number(vehicleData.detail?.price ?? 0),
  mileage: Number(vehicleData.inspection?.mileage ?? 0),
  daysInStock: 0,

  fuelType: vehicleData.detail?.fuelType || null,
  gearbox: vehicleData.detail?.gearbox || null,
  drive: vehicleData.detail?.drive || null,
  color: vehicleData.detail?.color || null,
  horsepower: vehicleData.technicalData?.horsePower
    ? `${vehicleData.technicalData.horsePower} Hk`
    : null,

  notes: ["Clean condition"], // default ya user input se aa sakta hai

  outlay: [], // agar form se extra costs aa rahi hain

  equipment: {
    interior: vehicleData.detail?.interior || null,
    audio: vehicleData.detail?.audio || null,
    safety: vehicleData.detail?.safety || [],
  },

  documents: [], // agar upload ke option honge

  type: vehicleData.detail?.bodyType || null,
  chassisNumber: vehicleData.technicalData?.chassisNumber || null,

  preRegistrationDate: safeToISOString(vehicleData.origin?.preRegistrationDate),
  registrationRenewed: safeToISOString(vehicleData.status?.date),
  statusDate: safeToISOString(vehicleData.status?.date),

  engineVolume: vehicleData.technicalData?.engineVolume
    ? `${vehicleData.technicalData.engineVolume}L`
    : null,
  maxSpeed: vehicleData.technicalData?.maxSpeed
    ? `${vehicleData.technicalData.maxSpeed} km/h`
    : null,

  serviceWeight: Number(vehicleData.technicalData?.serviceWeight ?? 0),
  totalWeight: Number(vehicleData.technicalData?.totalWeight ?? 0),
  vehicleWeight: Number(vehicleData.technicalData?.vehicleWeight ?? 0),
  passengers: Number(vehicleData.technicalData?.nrOfPassengers ?? 0),

  variant: vehicleData.technicalData?.variant || null,
  version: vehicleData.technicalData?.version || null,
  typeCode: vehicleData.technicalData?.type || null,

  ecoCertificate: vehicleData.environmental?.emissionClass || null,

  currentOwner: vehicleData.ownerInfo?.ownerName || null,
  acquisitionDate: safeToISOString(vehicleData.ownerInfo?.acquisitionDate),
  totalOwners: Number(vehicleData.ownerInfo?.numberOfUsers ?? 0),
  organizationOwner: vehicleData.ownerInfo?.organizationName || null,

  lastInspection: safeToISOString(vehicleData.inspection?.inspectionDate),
  nextInspectionDue: safeToISOString(
    vehicleData.inspection?.inspectionDateUpToAndIncluding
  ),
  inspectionMileage: Number(vehicleData.inspection?.mileage ?? 0),
  inspectionStation: vehicleData.inspection?.inspectionStation || null,

  importID: vehicleData.origin?.importerId || null,
  directImport: vehicleData.origin?.directImport ? "Yes" : "No",
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
          toast.error(response.data.message || "An unknown error occurred.");
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
          toast.error(response.data.message || "An unknown error occurred.");
        }
      }
    } catch (err: any) {
      console.error(
        `Failed to ${isEditMode ? "update" : "create"} vehicle:`,
        err
      );
      toast.error(err.response?.data?.message || err.message);
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
      finalValue = (e.target as HTMLInputElement).checked;
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
    placeholder = ""
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name as string}
        value={formData[name] as string | number}
        onChange={handleChange}
        placeholder={placeholder || `Skriva in ${label.toLowerCase()}...`}
        className="w-full border rounded-lg px-3 py-2 text-sm"
        disabled={isLoading}
      />
    </div>
  );

  const renderAllFields = () => (
    <>
      <div className="grid grid-cols-1 gap-4">
        {renderInputField("Registration Number", "registrationNumber")}
        {renderInputField("Vehicle Name", "vehicleName")}
        {renderInputField("Model", "model")}
        {renderInputField("Year", "year", "number")}
        {renderInputField("Color", "color")}
        {renderInputField("Chassis Number", "chassisNumber")}
        {renderInputField("Registration Date", "registrationDate", "date")}
        {renderInputField(
          "Pre-Registration Date",
          "preRegistrationDate",
          "date"
        )}
        {renderInputField("Status Date", "statusDate", "date")}
        {renderInputField("Acquisition Date", "acquisitionDate", "date")}
        {renderInputField("Last Inspection", "lastInspection", "date")}
        {renderInputField("Next Inspection Due", "nextInspectionDue", "date")}
        {renderInputField("Mileage", "mileage", "number")}
        {renderInputField("Price", "price", "number")}
        {renderInputField("Horsepower", "horsepower")}
        {renderInputField("Engine Volume", "engineVolume")}
        {renderInputField("Max Speed", "maxSpeed")}
        {renderInputField("Service Weight", "serviceWeight", "number")}
        {renderInputField("Total Weight", "totalWeight", "number")}
        {renderInputField("Vehicle Weight", "vehicleWeight", "number")}
        {renderInputField("Passengers", "passengers", "number")}
        {renderInputField("Total Owners", "totalOwners", "number")}
        {renderInputField("Inspection Mileage", "inspectionMileage", "number")}
        {renderInputField("Current Owner", "currentOwner")}
        {renderInputField("Organization Owner", "organizationOwner")}
        {renderInputField("Import Origin", "importOrigin")}
        {renderInputField("Import ID", "importID")}
        {renderInputField("Type Code", "typeCode")}
        {renderInputField("Eco Certificate", "ecoCertificate")}
        {renderInputField("Variant", "variant")}
        {renderInputField("Version", "version")}
        {renderInputField("Type", "type")}
        {renderInputField("Category", "category")}

        {/* Equipment checkboxes */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="GPS"
              checked={formData.GPS}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            GPS
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="Sunroof"
              checked={formData.Sunroof}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            Soltak
          </label>
        </div>

        {/* Direct Import radio buttons */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="directImport"
              value="Yes"
              checked={formData.directImport}
              onChange={handleChange}
              className="rounded-full border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            Direkt import
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="directImport"
              value="No"
              checked={!formData.directImport}
              onChange={handleChange}
              className="rounded-full border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
           Inte direktimport
          </label>
        </div>
      </div>
    </>
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm font-plus-jakarta">
      <div className="w-full max-w-[460px] h-full bg-white shadow-xl p-8 overflow-y-auto relative animate-slide-in-right">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl cursor-pointer"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-6">
          {isEditMode ? "Redigera fordon" : "Sök fordon"}
        </h2>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3 mb-4">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-red-800">
                Misslyckades {isEditMode ? "update" : "add"} fordon
              </h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className={`flex flex-col justify-between ${
            error ? "min-h-[80%] max-h-[80%]" : "min-h-[90%] max-h-[90%]"
          } overflow-y-auto`}
        >
          <div className="space-y-6">
            {isEditMode ? (
              renderAllFields()
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {renderInputField("Registreringsnummer", "registrationNumber")}
              </div>
            )}
          </div>
          <div className="flex gap-3 pt-6 sticky bottom-0 bg-white">
            <button
              type="reset"
              onClick={() =>
                setFormData(isEditMode ? formData : initialVehicleState)
              }
              className="w-full bg-transparent border border-blue-700 text-blue-700 font-semibold cursor-pointer py-2.5 rounded-lg"
              disabled={isLoading}
            >
              Återställa
            </button>
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold cursor-pointer py-2.5 rounded-lg flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : isEditMode ? (
                "Uppdatera fordon"
              ) : (
                "Sök fordon"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchNewVehicle;
