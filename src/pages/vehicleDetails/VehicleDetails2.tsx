import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CarFront,
  Pencil,
  Trash2,
  Upload,
  FileText,
  Mail,
  CreditCard,
  FileSignature,
  CalendarDays,
  Gauge,
  ShieldCheck,
  RefreshCw,
  AlertCircle,
  Database,
  CircleCheck,
} from "lucide-react";

import {
  makeGetRequest,
  makeDeleteRequest,
} from "../../api/Api";

import type {
  Vehicle,
  Note,
  Outlay,
} from "../../components/Vehicles/vehicleDetails/types";

import BasicInformation from "../../components/Vehicles/vehicleDetails/BasicInformation";
import RegistrationDates from "../../components/Vehicles/vehicleDetails/RegistrationDates";
import TechnicalSpecifications from "../../components/Vehicles/vehicleDetails/TechnicalSpecifications";
import OwnershipInformation from "../../components/Vehicles/vehicleDetails/OwnershipInformation";
import InspectionDetails from "../../components/Vehicles/vehicleDetails/InspectionDetails";
import ImportOrigin from "../../components/Vehicles/vehicleDetails/ImportOrigin";

import DeletePopup from "../../components/models/DeletePopup";
import toast from "react-hot-toast";
import AddNewVehicle from "../../components/models/AddNewVehicle";

const VehicleDetails2 = () => {
  const { registrationNumber } = useParams<{
    registrationNumber: string;
  }>();

  const navigate = useNavigate();

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // ------------------------------------------------------------
  // Fetch vehicle
  // ------------------------------------------------------------

  const fetchVehicleDetails = async () => {
    if (!registrationNumber) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await makeGetRequest(
        `searchVehicle/getVehicleByRegistrationNumber/${registrationNumber}`
      );

      if (response.data && response.data.success) {
        const vehicleData = response.data.data;

        // --------------------------------------------------------
        // Transform notes
        // --------------------------------------------------------

        let notesArray: Note[] = [];

        if (Array.isArray(vehicleData.notes)) {
          notesArray = vehicleData.notes.map(
            (item: any, index: number) => {
              if (typeof item === "string") {
                return {
                  id: index + 1,
                  text: item,
                  date: new Date().toISOString(),
                };
              }

              if (typeof item === "object" && item.text) {
                return {
                  id: item.id || index + 1,
                  text: item.text,
                  date: item.date || new Date().toISOString(),
                };
              }

              return {
                id: index + 1,
                text: "Invalid Note",
                date: new Date().toISOString(),
              };
            }
          );
        } else if (
          typeof vehicleData.notes === "string" &&
          vehicleData.notes
        ) {
          notesArray = [
            {
              id: 1,
              text: vehicleData.notes,
              date: new Date().toISOString(),
            },
          ];
        }

        // --------------------------------------------------------
        // Transform outlays
        // --------------------------------------------------------

        const transformedOutlays: Outlay[] = vehicleData.outlay
          ? vehicleData.outlay.map(
              (outlay: any, index: number) => ({
                id: outlay.id || index + 1,
                date:
                  outlay.date || new Date().toISOString(),
                amount: outlay.amount || 0,
                description: outlay.description || "",
              })
            )
          : [];

        // --------------------------------------------------------
        // Transform documents
        // --------------------------------------------------------

        const transformedDocuments =
          Array.isArray(vehicleData.documents)
            ? vehicleData.documents.map(
                (
                  doc: {
                    url: string;
                    type: string;
                  },
                  index: number
                ) => ({
                  ...doc,
                  id: index + 1,
                  name: doc.url.substring(
                    doc.url.lastIndexOf("/") + 1
                  ),
                })
              )
            : [];

        setVehicle({
          ...vehicleData,
          notes: notesArray,
          outlay: transformedOutlays,
          documents: transformedDocuments,
        });
      } else {
        setError(
          response.data?.message ||
            "Failed to fetch vehicle details."
        );
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(
        "An error occurred while fetching vehicle details."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicleDetails();
  }, [registrationNumber]);

  // ------------------------------------------------------------
  // Delete vehicle
  // ------------------------------------------------------------

  const handleDelete = async () => {
    if (!vehicle) return;

    setIsDeleting(true);

    try {
      await makeDeleteRequest(
        `vehicles/deleteVehicle/${vehicle.registrationNumber}`
      );

      toast.success("Vehicle deleted successfully!");

      setShowDeletePopup(false);

      navigate("/vehicles");
    } catch (err: any) {
      toast.error(
        err.message || "Failed to delete vehicle."
      );

      console.error("Delete error:", err);

      setShowDeletePopup(false);
    } finally {
      setIsDeleting(false);
    }
  };

  // ------------------------------------------------------------
  // Edit success
  // ------------------------------------------------------------

  const handleUpdateSuccess = (
    shouldRedirect?: boolean
  ) => {
    setIsEditModalOpen(false);

    if (shouldRedirect) {
      navigate("/vehicles");
    } else {
      fetchVehicleDetails();
    }
  };

  // ------------------------------------------------------------
  // Helpers
  // ------------------------------------------------------------

  const vehicleAny = vehicle as any;

  const vehicleName =
    vehicleAny?.vehicleName ||
    vehicleAny?.vehicleModel ||
    vehicleAny?.model ||
    vehicleAny?.make ||
    "Vehicle";

  const vehicleYear =
    vehicleAny?.vehicleYear ||
    vehicleAny?.year ||
    vehicleAny?.modelYear ||
    "—";

  const vehicleMileage =
    vehicleAny?.mileage ||
    vehicleAny?.mileageKm ||
    vehicleAny?.kilometers ||
    vehicleAny?.km ||
    "—";

  const vehicleStatus =
    vehicleAny?.status ||
    "Active";

  const documentsCount =
    Array.isArray(vehicle?.documents)
      ? vehicle.documents.length
      : 0;

  const notesCount =
    Array.isArray(vehicle?.notes)
      ? vehicle.notes.length
      : 0;

  // ------------------------------------------------------------
  // Loading
  // ------------------------------------------------------------

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-[#F5F7FA] px-4 py-6 font-plus-jakarta dark:bg-[#07111F] sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-[1600px] items-center justify-center">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-[#0B1728]">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-500/10">
              <RefreshCw className="h-7 w-7 animate-spin text-[#012F7A] dark:text-blue-400" />
            </div>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Loading Vehicle
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Fetching the latest vehicle information...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------
  // Error
  // ------------------------------------------------------------

  if (error) {
    return (
      <div className="min-h-screen w-full bg-[#F5F7FA] px-4 py-6 font-plus-jakarta dark:bg-[#07111F] sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-[1600px] items-center justify-center">
          <div className="w-full max-w-lg rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm dark:border-red-900/40 dark:bg-[#0B1728]">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-500/10">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Unable to Load Vehicle
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
              {error}
            </p>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </button>

              <button
                onClick={fetchVehicleDetails}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#012F7A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00245d]"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------
  // Not found
  // ------------------------------------------------------------

  if (!vehicle) {
    return (
      <div className="min-h-screen w-full bg-[#F5F7FA] px-4 py-6 font-plus-jakarta dark:bg-[#07111F] sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-[1600px] items-center justify-center">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-[#0B1728]">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
              <CarFront className="h-8 w-8 text-slate-500" />
            </div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Vehicle Not Found
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              The requested vehicle could not be found in your inventory.
            </p>

            <button
              onClick={() => navigate("/vehicles")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#012F7A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00245d]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Inventory
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------
  // Main UI
  // ------------------------------------------------------------

  return (
    <div className="min-h-screen w-full bg-[#F5F7FA] px-3 py-4 font-plus-jakarta transition-colors duration-300 dark:bg-[#07111F] sm:px-5 sm:py-5 lg:px-6 lg:py-6">
      <div className="mx-auto w-full max-w-[1600px]">

        {/* ======================================================
            Edit Vehicle Modal
        ====================================================== */}

        <AddNewVehicle
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={handleUpdateSuccess}
          vehicleToEdit={vehicle}
        />

        {/* ======================================================
            Delete Popup
        ====================================================== */}

        {showDeletePopup && (
          <DeletePopup
            entityName="Vehicle"
            onCancel={() => setShowDeletePopup(false)}
            onDelete={handleDelete}
            isDeleting={isDeleting}
          />
        )}

        {/* ======================================================
            Top Navigation
        ====================================================== */}

        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={() => navigate(-1)}
            className="group inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-[#012F7A] hover:text-[#012F7A] dark:border-slate-800 dark:bg-[#0B1728] dark:text-slate-200 dark:hover:border-blue-500 dark:hover:text-blue-400"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Inventory
          </button>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-500/10 dark:text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {vehicleStatus}
            </span>

            <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold tracking-wide text-slate-600 dark:border-slate-800 dark:bg-[#0B1728] dark:text-slate-300">
              INVENTORY VEHICLE
            </span>
          </div>
        </div>

        {/* ======================================================
            Premium Vehicle Hero
        ====================================================== */}

        <section className="relative mb-6 overflow-hidden rounded-3xl bg-[#001A36] shadow-xl">
          {/* Decorative background */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div className="relative p-5 sm:p-7 lg:p-8">
            <div className="flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between">

              {/* Vehicle Identity */}
              <div className="min-w-0">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-100 backdrop-blur">
                    <CarFront className="h-3.5 w-3.5" />
                    Vehicle Details
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-bold tracking-wider text-white">
                    {vehicle.registrationNumber || "N/A"}
                  </span>
                </div>

                <h1 className="max-w-3xl truncate text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
                  {vehicleName}
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100/75 sm:text-base">
                  Complete vehicle information, registration details,
                  technical specifications and ownership records.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-[#012F7A] shadow-lg transition hover:bg-blue-50"
                >
                  <Pencil className="h-4 w-4" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() =>
                    navigate(
                      `/add-new-advertise/${vehicle.registrationNumber}`
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
                >
                  <Upload className="h-4 w-4" />
                  <span>Advertise</span>
                </button>

                <button
                  onClick={() => setShowDeletePopup(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2.5 text-sm font-bold text-red-100 transition hover:bg-red-500/20"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>

            {/* ==================================================
                Vehicle Meta
            ================================================== */}

            <div className="mt-7 grid grid-cols-2 gap-3 border-t border-white/10 pt-6 sm:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="mb-2 flex items-center gap-2 text-blue-200/70">
                  <CalendarDays className="h-4 w-4" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider">
                    Year
                  </span>
                </div>

                <p className="text-lg font-bold text-white">
                  {vehicleYear}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="mb-2 flex items-center gap-2 text-blue-200/70">
                  <Gauge className="h-4 w-4" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider">
                    Mileage
                  </span>
                </div>

                <p className="truncate text-lg font-bold text-white">
                  {vehicleMileage}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="mb-2 flex items-center gap-2 text-blue-200/70">
                  <FileText className="h-4 w-4" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider">
                    Documents
                  </span>
                </div>

                <p className="text-lg font-bold text-white">
                  {documentsCount}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="mb-2 flex items-center gap-2 text-blue-200/70">
                  <Database className="h-4 w-4" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider">
                    Notes
                  </span>
                </div>

                <p className="text-lg font-bold text-white">
                  {notesCount}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            Quick Actions
        ====================================================== */}

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-[#0B1728] sm:p-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">

            <button
              onClick={() => setIsEditModalOpen(true)}
              className="group flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-3 text-left transition hover:border-blue-200 hover:bg-blue-50 dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-blue-900 dark:hover:bg-blue-500/10"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                <Pencil className="h-4 w-4" />
              </span>

              <span className="min-w-0">
                <span className="block truncate text-xs font-bold text-slate-800 dark:text-white">
                  Edit Vehicle
                </span>
                <span className="hidden text-[10px] text-slate-500 sm:block dark:text-slate-400">
                  Update information
                </span>
              </span>
            </button>

            <button
              onClick={() =>
                navigate(
                  `/add-new-advertise/${vehicle.registrationNumber}`
                )
              }
              className="group flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-3 text-left transition hover:border-blue-200 hover:bg-blue-50 dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-blue-900 dark:hover:bg-blue-500/10"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400">
                <Upload className="h-4 w-4" />
              </span>

              <span className="min-w-0">
                <span className="block truncate text-xs font-bold text-slate-800 dark:text-white">
                  Advertise
                </span>
                <span className="hidden text-[10px] text-slate-500 sm:block dark:text-slate-400">
                  Promote vehicle
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                toast("Email action can be connected here.")
              }
              className="group flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-3 text-left transition hover:border-blue-200 hover:bg-blue-50 dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-blue-900 dark:hover:bg-blue-500/10"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400">
                <Mail className="h-4 w-4" />
              </span>

              <span className="min-w-0">
                <span className="block truncate text-xs font-bold text-slate-800 dark:text-white">
                  Email
                </span>
                <span className="hidden text-[10px] text-slate-500 sm:block dark:text-slate-400">
                  Send vehicle details
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                toast("Payment action can be connected here.")
              }
              className="group flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-3 text-left transition hover:border-blue-200 hover:bg-blue-50 dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-blue-900 dark:hover:bg-blue-500/10"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                <CreditCard className="h-4 w-4" />
              </span>

              <span className="min-w-0">
                <span className="block truncate text-xs font-bold text-slate-800 dark:text-white">
                  Payment
                </span>
                <span className="hidden text-[10px] text-slate-500 sm:block dark:text-slate-400">
                  Payment options
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                toast("Agreement action can be connected here.")
              }
              className="group col-span-2 flex items-center gap-3 rounded-xl border border-[#012F7A]/15 bg-blue-50 px-3 py-3 text-left transition hover:bg-blue-100 sm:col-span-1 dark:border-blue-900/40 dark:bg-blue-500/10 dark:hover:bg-blue-500/15"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#012F7A] text-white dark:bg-blue-600">
                <FileSignature className="h-4 w-4" />
              </span>

              <span className="min-w-0">
                <span className="block truncate text-xs font-bold text-[#012F7A] dark:text-blue-300">
                  Agreement
                </span>
                <span className="hidden text-[10px] text-blue-700/60 sm:block dark:text-blue-400/70">
                  Manage agreement
                </span>
              </span>
            </button>
          </div>
        </section>

        {/* ======================================================
            Information Header
        ====================================================== */}

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                Vehicle Information
              </span>
            </div>

            <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
              Complete Vehicle Profile
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Detailed information connected to this inventory vehicle.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-500/10 dark:text-emerald-400">
            <CircleCheck className="h-4 w-4" />
            Information Loaded
          </div>
        </div>

        {/* ======================================================
            Main Information Grid
        ====================================================== */}

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

          {/* LEFT COLUMN */}
          <div className="space-y-5">

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-[#0B1728]">
              <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/40">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                    <CarFront className="h-4 w-4" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Basic Information
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Vehicle identity and core information
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <BasicInformation vehicle={vehicle} />
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-[#0B1728]">
              <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/40">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400">
                    <CalendarDays className="h-4 w-4" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Registration Dates
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Registration and date records
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <RegistrationDates vehicle={vehicle} />
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-[#0B1728]">
              <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/40">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400">
                    <Gauge className="h-4 w-4" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Technical Specifications
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Technical and mechanical information
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <TechnicalSpecifications vehicle={vehicle} />
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-[#0B1728]">
              <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/40">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400">
                    <ShieldCheck className="h-4 w-4" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Ownership Information
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Ownership and related records
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <OwnershipInformation vehicle={vehicle} />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-5">

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-[#0B1728]">
              <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/40">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                    <ShieldCheck className="h-4 w-4" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Inspection Details
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Inspection and compliance information
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <InspectionDetails vehicle={vehicle} />
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-[#0B1728]">
              <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/40">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <Database className="h-4 w-4" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Import & Origin
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Import history and origin information
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <ImportOrigin vehicle={vehicle} />
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================
            Bottom Status
        ====================================================== */}

        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-[#0B1728] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-500/10">
              <CircleCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>

            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-white">
                Vehicle record is active
              </p>

              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Registration: {vehicle.registrationNumber || "N/A"}
              </p>
            </div>
          </div>

          <button
            onClick={fetchVehicleDetails}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails2;
