import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CarFront,
  FileText,
  Mail,
  Megaphone,
  Pencil,
  Receipt,
  RefreshCw,
  Send,
  ShieldCheck,
  Smartphone,
  Trash2,
  Wrench,
  XCircle,
} from "lucide-react";
import {
  makeGetRequest,
  makeDeleteRequest,
  makePutRequest,
  makePostRequest,
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
import VehicleInformation from "../../components/Vehicles/vehicleDetails/VehicleInformation";
import Notes from "../../components/Vehicles/vehicleDetails/Notes";
import Documents from "../../components/Vehicles/vehicleDetails/Documents";
import OutlayComponent from "../../components/Vehicles/vehicleDetails/Outlay";

import DeletePopup from "../../components/models/DeletePopup";
import AddNewVehicle from "../../components/models/AddNewVehicle";

import {
  EditAgreementIcon,
  EnvelopeAgreementIcon,
  SignAgreementIcon,
  SwishaAgreementIcon,
  ViewAgreementIcon,
} from "../../components/utils/Icons";

import toast from "react-hot-toast";

const VehicleDetails = () => {
  const { registrationNumber } = useParams<{
    registrationNumber: string;
  }>();

  const navigate = useNavigate();

  const [showDeletePopup, setShowDeletePopup] =
    useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] =
    useState(false);

  const [vehicle, setVehicle] =
    useState<Vehicle | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [activeAction, setActiveAction] =
    useState<string | null>(null);

  const fetchVehicleDetails = useCallback(async () => {
    if (!registrationNumber) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await makeGetRequest(
        `vehicles/getVehicleByRegistrationNumber/${registrationNumber}`
      );

      if (response.data && response.data.success) {
        const vehicleData = response.data.data;

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

              if (
                typeof item === "object" &&
                item.text
              ) {
                return {
                  id: item.id || index + 1,
                  text: item.text,
                  date:
                    item.date ||
                    new Date().toISOString(),
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

        const transformedOutlays: Outlay[] =
          vehicleData.outlay
            ? vehicleData.outlay.map(
                (outlay: any, index: number) => ({
                  id: outlay.id || index + 1,
                  date:
                    outlay.date ||
                    new Date().toISOString(),
                  amount: outlay.amount || 0,
                  description:
                    outlay.description || "",
                })
              )
            : [];

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
  }, [registrationNumber]);

  useEffect(() => {
    fetchVehicleDetails();
  }, [fetchVehicleDetails]);

  const handleDelete = async () => {
    if (!vehicle) return;

    setIsDeleting(true);

    try {
      await makeDeleteRequest(
        `vehicles/deleteVehicle/${vehicle.registrationNumber}`
      );

      toast.success(
        "Vehicle deleted successfully!"
      );

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

  const handleSaveNote = async (noteData: {
    text: string;
    id?: number;
  }) => {
    if (!vehicle) return;

    const currentNotesText: string[] =
      vehicle.notes.map((note) => note.text);

    let newNotesText: string[];

    if (noteData.id) {
      const noteIndex = noteData.id - 1;

      if (
        noteIndex >= 0 &&
        noteIndex < currentNotesText.length
      ) {
        newNotesText = [...currentNotesText];

        newNotesText[noteIndex] = noteData.text;
      } else {
        toast.error(
          "Could not find the note to update."
        );

        return;
      }
    } else {
      newNotesText = [
        ...currentNotesText,
        noteData.text,
      ];
    }

    try {
      await makePutRequest(
        `vehicles/updateVehicle/${vehicle.registrationNumber}`,
        {
          notes: newNotesText,
          outlay: vehicle.outlay || [],
          documents:
            vehicle.documents?.map((document) => ({
              type: document.type,
              url: document.url,
            })) || [],
        }
      );

      toast.success("Note saved successfully!");

      fetchVehicleDetails();
    } catch (err: any) {
      toast.error(
        err.message || "Failed to save the note."
      );

      console.error("Note save error:", err);
    }
  };

  const handleDeleteNote = async (noteId: number) => {
    if (!vehicle) return;

    const currentNotesText: string[] =
      vehicle.notes.map((note) => note.text);

    const noteIndex = noteId - 1;

    if (
      noteIndex < 0 ||
      noteIndex >= currentNotesText.length
    ) {
      toast.error(
        "Could not find the note to delete."
      );

      return;
    }

    const newNotesText = currentNotesText.filter(
      (_, index) => index !== noteIndex
    );

    try {
      await makePutRequest(
        `vehicles/updateVehicle/${vehicle.registrationNumber}`,
        {
          notes: newNotesText,
        }
      );

      toast.success(
        "Note deleted successfully!"
      );

      fetchVehicleDetails();
    } catch (err: any) {
      toast.error(
        err.message || "Failed to delete the note."
      );

      console.error("Note delete error:", err);
    }
  };

  const handleSaveOutlay = async (data: {
    date: string;
    amount: number;
    description: string;
    id?: number;
  }) => {
    if (!vehicle) return;

    const newOutlay = {
      date: data.date,
      amount: data.amount,
      description: data.description,
    };

    try {
      const updatedOutlays = [
        ...(vehicle.outlay || []),
      ];

      if (data.id) {
        const index = updatedOutlays.findIndex(
          (outlay) => outlay.id === data.id
        );

        if (index >= 0) {
          updatedOutlays[index] = {
            ...updatedOutlays[index],
            ...newOutlay,
          };
        } else {
          toast.error(
            "Could not find the outlay to update."
          );

          return;
        }
      } else {
        const tempId =
          updatedOutlays.length > 0
            ? Math.max(
                ...updatedOutlays.map(
                  (outlay) => outlay.id
                )
              ) + 1
            : 1;

        updatedOutlays.push({
          ...newOutlay,
          id: tempId,
        });
      }

      await makePutRequest(
        `vehicles/updateVehicle/${vehicle.registrationNumber}`,
        {
          outlay: updatedOutlays,

          notes: vehicle.notes.map(
            (note) => note.text
          ),

          documents: vehicle.documents.map(
            (document) => ({
              type: document.type,
              url: document.url,
            })
          ),
        }
      );

      toast.success(
        "Outlay saved successfully!"
      );

      fetchVehicleDetails();
    } catch (err: any) {
      toast.error(
        err.message || "Failed to save the outlay."
      );

      console.error("Outlay save error:", err);
    }
  };

  const handleDeleteOutlay = async (
    outlayId: number
  ) => {
    if (!vehicle) return;

    try {
      const updatedOutlays = (
        vehicle.outlay || []
      ).filter(
        (outlay) => outlay.id !== outlayId
      );

      await makePutRequest(
        `vehicles/updateVehicle/${vehicle.registrationNumber}`,
        {
          outlay: updatedOutlays,
        }
      );

      toast.success(
        "Outlay deleted successfully!"
      );

      fetchVehicleDetails();
    } catch (err: any) {
      toast.error(
        err.message || "Failed to delete the outlay."
      );

      console.error(
        "Outlay delete error:",
        err
      );
    }
  };

  const handleUploadDocument = async (
    file: File,
    type: string
  ) => {
    if (!vehicle) return;

    const loadingToast = toast.loading(
      "Uploading document..."
    );

    const formData = new FormData();

    formData.append("file", file);

    try {
      const uploadResponse = await makePostRequest(
        "upload",
        formData
      );

      if (
        !uploadResponse.data ||
        !uploadResponse.data.success
      ) {
        throw new Error(
          uploadResponse.data?.message ||
            "File upload failed."
        );
      }

      const cloudinaryUrl =
        uploadResponse.data.data.url;

      const newDocument = {
        type,
        url: cloudinaryUrl,
      };

      const currentDocuments =
        vehicle.documents.map((document) => ({
          type: document.type,
          url: document.url,
        }));

      const updatedDocuments = [
        ...currentDocuments,
        newDocument,
      ];

      await makePutRequest(
        `vehicles/updateVehicle/${vehicle.registrationNumber}`,
        {
          documents: updatedDocuments,
        }
      );

      toast.dismiss(loadingToast);

      toast.success(
        "Document uploaded successfully!"
      );

      fetchVehicleDetails();
    } catch (err: any) {
      toast.dismiss(loadingToast);

      toast.error(
        err.message ||
          "Failed to upload document."
      );

      console.error(
        "Document upload error:",
        err
      );
    }
  };

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

  const handleAction = (
    action: string,
    callback?: () => void
  ) => {
    setActiveAction(action);

    if (callback) {
      callback();
    }

    window.setTimeout(() => {
      setActiveAction(null);
    }, 700);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] px-4 py-10 font-plus-jakarta dark:bg-[#07111F]">
        <div className="flex min-h-[60vh] flex-col items-center justify-center">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#001A36] shadow-lg">
            <CarFront
              size={28}
              className="text-blue-300"
            />

            <div className="absolute -inset-1 animate-spin rounded-2xl border-2 border-transparent border-t-blue-500" />
          </div>

          <h2 className="mt-5 text-base font-bold text-slate-800 dark:text-white">
            Loading vehicle details
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Please wait while we load the vehicle information.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] px-4 py-10 font-plus-jakarta dark:bg-[#07111F]">
        <div className="mx-auto flex min-h-[60vh] max-w-xl items-center justify-center">
          <div className="w-full rounded-2xl border border-red-200 bg-white p-6 text-center shadow-sm dark:border-red-900/50 dark:bg-[#0B1728]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500 dark:bg-red-950/30">
              <XCircle size={27} />
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
              Unable to load vehicle
            </h2>

            <p className="mt-2 text-sm text-red-500">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchVehicleDetails}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#012F7A] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#001f52]"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] px-4 py-10 font-plus-jakarta dark:bg-[#07111F]">
        <div className="mx-auto flex min-h-[60vh] max-w-xl items-center justify-center">
          <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-[#0B1728]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              <CarFront size={27} />
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
              Vehicle not found
            </h2>

            <button
              type="button"
              onClick={() => navigate("/vehicles")}
              className="mt-5 rounded-xl bg-[#012F7A] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Back to Vehicles
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F5F7FA] px-3 py-4 font-plus-jakarta transition-colors duration-300 dark:bg-[#07111F] sm:px-5 sm:py-5 lg:px-6 lg:py-6">
      <div className="mx-auto w-full max-w-[1700px]">

        {/* =====================================================
            EDIT MODAL
        ====================================================== */}
        <AddNewVehicle
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={handleUpdateSuccess}
          vehicleToEdit={vehicle}
        />

        {/* =====================================================
            DELETE POPUP
        ====================================================== */}
        {showDeletePopup && (
          <DeletePopup
            entityName="Vehicle"
            onCancel={() =>
              setShowDeletePopup(false)
            }
            onDelete={handleDelete}
            isDeleting={isDeleting}
          />
        )}

        {/* =====================================================
            HERO HEADER
        ====================================================== */}
        <div className="relative mb-5 overflow-hidden rounded-2xl bg-[#001A36] shadow-xl shadow-blue-950/10">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-blue-500/15 blur-3xl" />

            <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          <div className="relative p-5 sm:p-6 lg:p-7">

            {/* Top navigation */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                <ArrowLeft size={15} />
                Back
              </button>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                  <ShieldCheck size={12} />
                  Vehicle Active
                </span>
              </div>
            </div>

            {/* Vehicle identity */}
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex min-w-0 items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-blue-300 ring-1 ring-white/10">
                  <CarFront size={28} />
                </div>

                <div className="min-w-0">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-300">
                    DealerPro Vehicle
                  </p>

                  <h1 className="truncate text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl">
                    {vehicle.registrationNumber ||
                      "Vehicle Details"}
                  </h1>

                  <p className="mt-1 truncate text-sm text-slate-300">
                    {vehicle.vehicleName ||
                      vehicle.model ||
                      "Vehicle information and management"}
                  </p>
                </div>
              </div>

              {/* Desktop quick stats */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:min-w-[500px]">
                <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                    Year
                  </p>

                  <p className="mt-1 text-sm font-bold text-white">
                    {vehicle.year || "N/A"}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                    Mileage
                  </p>

                  <p className="mt-1 text-sm font-bold text-white">
                    {vehicle.mileage || "N/A"}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                    Fuel
                  </p>

                  <p className="mt-1 truncate text-sm font-bold text-white">
                    {vehicle.fuelType || "N/A"}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                    Gearbox
                  </p>

                  <p className="mt-1 truncate text-sm font-bold text-white">
                    {vehicle.gearbox || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            ACTION BAR
        ====================================================== */}
        <div className="mb-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0B1728]">
          <div className="flex flex-col gap-3 p-3 sm:p-4 xl:flex-row xl:items-center xl:justify-between">

            <div className="flex min-w-0 items-center gap-3">
              <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 sm:flex">
                <Wrench size={19} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Vehicle Actions
                </p>

                <p className="mt-0.5 truncate text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Manage this vehicle
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end">

              <button
                type="button"
                onClick={() =>
                  handleAction(
                    "edit",
                    () => setIsEditModalOpen(true)
                  )
                }
                className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-bold text-[#012F7A] transition hover:border-blue-300 hover:bg-blue-100 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-300 dark:hover:bg-blue-950/50 sm:px-4"
              >
                <Pencil size={15} />
                <span>Edit</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleAction(
                    "invoice"
                  )
                }
                className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#012F7A] dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:border-blue-900 dark:hover:bg-blue-950/30 dark:hover:text-blue-300 sm:px-4"
              >
                <Receipt size={15} />
                <span>Invoice</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleAction(
                    "advertise",
                    () =>
                      navigate(
                        `/add-new-advertise/${vehicle.registrationNumber}`
                      )
                  )
                }
                className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#012F7A] dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:border-blue-900 dark:hover:bg-blue-950/30 dark:hover:text-blue-300 sm:px-4"
              >
                <Megaphone size={15} />
                <span>Advertise</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleAction("email")
                }
                className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#012F7A] dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:border-blue-900 dark:hover:bg-blue-950/30 dark:hover:text-blue-300 sm:px-4"
              >
                <Mail size={15} />
                <span>Email</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleAction("swish")
                }
                className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#012F7A] dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:border-blue-900 dark:hover:bg-blue-950/30 dark:hover:text-blue-300 sm:px-4"
              >
                <Smartphone size={15} />
                <span>Swish</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleAction("agreement")
                }
                className="col-span-2 inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1F7BF4] to-[#015DD6] px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition hover:-translate-y-0.5 hover:shadow-lg sm:col-span-1"
              >
                <FileText size={15} />
                <span>Agreement</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setShowDeletePopup(true)
                }
                className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/40 sm:px-4"
              >
                <Trash2 size={15} />
                <span>Delete</span>
              </button>
            </div>
          </div>

          {activeAction && (
            <div className="border-t border-slate-100 bg-blue-50/60 px-4 py-2 text-center text-xs font-medium text-blue-600 dark:border-slate-800 dark:bg-blue-950/20 dark:text-blue-300">
              {activeAction === "edit"
                ? "Opening vehicle editor..."
                : activeAction === "advertise"
                  ? "Opening advertisement..."
                  : `${activeAction.charAt(0).toUpperCase()}${activeAction.slice(1)} action selected.`}
            </div>
          )}
        </div>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">

          {/* LEFT COLUMN */}
          <div className="min-w-0 space-y-5">

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0B1728]">
              <BasicInformation vehicle={vehicle} />
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0B1728]">
              <RegistrationDates vehicle={vehicle} />
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0B1728]">
              <TechnicalSpecifications vehicle={vehicle} />
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0B1728]">
              <OwnershipInformation vehicle={vehicle} />
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0B1728]">
              <InspectionDetails vehicle={vehicle} />
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0B1728]">
              <ImportOrigin vehicle={vehicle} />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="min-w-0 space-y-5">

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0B1728]">
              <VehicleInformation />
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0B1728]">
              <OutlayComponent
                vehicle={vehicle}
                onSaveOutlay={handleSaveOutlay}
                onDelete={handleDeleteOutlay}
              />
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0B1728]">
              <Notes
                vehicle={vehicle}
                onSaveNote={handleSaveNote}
                onDelete={handleDeleteNote}
              />
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0B1728]">
              <Documents
                vehicle={vehicle}
                onUploadDocument={handleUploadDocument}
              />
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM SUMMARY
        ====================================================== */}
        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0B1728]">
          <div className="grid grid-cols-2 divide-x divide-slate-100 dark:divide-slate-800 sm:grid-cols-4">

            <div className="p-4 sm:p-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Registration
              </p>

              <p className="mt-1 truncate text-sm font-bold text-slate-900 dark:text-white">
                {vehicle.registrationNumber ||
                  "N/A"}
              </p>
            </div>

            <div className="p-4 sm:p-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Documents
              </p>

              <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                {vehicle.documents?.length || 0}
              </p>
            </div>

            <div className="p-4 sm:p-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Notes
              </p>

              <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                {vehicle.notes?.length || 0}
              </p>
            </div>

            <div className="p-4 sm:p-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Outlays
              </p>

              <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                {vehicle.outlay?.length || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Footer status */}
        <div className="mt-4 flex flex-col items-center justify-between gap-2 px-1 pb-2 text-[11px] text-slate-400 sm:flex-row">
          <span>
            DealerPro Vehicle Management
          </span>

          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Vehicle data synchronized
          </span>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
