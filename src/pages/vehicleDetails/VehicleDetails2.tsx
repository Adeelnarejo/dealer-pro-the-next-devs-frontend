import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  // Trash2,
  // FileEdit,
  // MessageSquare,
  // Upload,
  // ShoppingCart,
  // DollarSign,
  // FileChartColumn,
  // Rocket,
  // BadgeDollarSign,
} from "lucide-react";
import {
  makeGetRequest,
  makeDeleteRequest,
  // makePutRequest,
  // makePostRequest,
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
// import VehicleInformation from "../../components/Vehicles/vehicleDetails/VehicleInformation";
// import Notes from "../../components/Vehicles/vehicleDetails/Notes";
// import Documents from "../../components/Vehicles/vehicleDetails/Documents";
// import OutlayComponent from "../../components/Vehicles/vehicleDetails/Outlay";
import DeletePopup from "../../components/models/DeletePopup";
import toast from "react-hot-toast";
import AddNewVehicle from "../../components/models/AddNewVehicle";
// import {
//   EditAgreementIcon,
//   EnvelopeAgreementIcon,
//   SignAgreementIcon,
//   SwishaAgreementIcon,
//   ViewAgreementIcon,
// } from "../../components/utils/Icons";

const VehicleDetails2 = () => {
  const { registrationNumber } = useParams<{ registrationNumber: string }>();
  const navigate = useNavigate();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [isUploading, setIsUploading] = useState(false);

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

        // Transform notes - ensure we maintain the Note[] structure
        let notesArray: Note[] = [];
        if (Array.isArray(vehicleData.notes)) {
          notesArray = vehicleData.notes.map((item: any, index: number) => {
            if (typeof item === "string") {
              return {
                id: index + 1,
                text: item,
                date: new Date().toISOString(),
              };
            } else if (typeof item === "object" && item.text) {
              return {
                id: item.id || index + 1,
                text: item.text,
                date: item.date || new Date().toISOString(),
              };
            } else {
              return {
                id: index + 1,
                text: "Invalid Note",
                date: new Date().toISOString(),
              };
            }
          });
        } else if (typeof vehicleData.notes === "string" && vehicleData.notes) {
          notesArray = [
            {
              id: 1,
              text: vehicleData.notes,
              date: new Date().toISOString(),
            },
          ];
        }

        // Transform outlays
        const transformedOutlays: Outlay[] = vehicleData.outlay
          ? vehicleData.outlay.map((outlay: any, index: number) => ({
              id: outlay.id || index + 1,
              date: outlay.date || new Date().toISOString(),
              amount: outlay.amount || 0,
              description: outlay.description || "",
            }))
          : [];

        // Transform documents
        const transformedDocuments = Array.isArray(vehicleData.documents)
          ? vehicleData.documents.map(
              (doc: { url: string; type: string }, index: number) => ({
                ...doc,
                id: index + 1,
                name: doc.url.substring(doc.url.lastIndexOf("/") + 1),
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
        setError(response.data?.message || "Failed to fetch vehicle details.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("An error occurred while fetching vehicle details.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicleDetails();
  }, [registrationNumber]);

  const handleDelete = async () => {
    if (!vehicle) return;
    setIsDeleting(true);
    try {
      await makeDeleteRequest(
        `vehicles/deleteVehicle/${vehicle?.registrationNumber}`
      );
      toast.success("Vehicle deleted successfully!");
      setShowDeletePopup(false);
      navigate("/vehicles");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete vehicle.");
      console.error("Delete error:", err);
      setShowDeletePopup(false);
    } finally {
      setIsDeleting(false);
    }
  };

  // const handleSaveNote = async (noteData: { text: string; id?: number }) => {
  //   if (!vehicle) return;

  //   const currentNotesText: string[] = vehicle.notes.map((n) => n.text);
  //   let newNotesText: string[];

  //   if (noteData.id) {
  //     const noteIndex = noteData.id - 1;
  //     if (noteIndex >= 0 && noteIndex < currentNotesText.length) {
  //       newNotesText = [...currentNotesText];
  //       newNotesText[noteIndex] = noteData.text;
  //     } else {
  //       toast.error("Could not find the note to update.");
  //       return;
  //     }
  //   } else {
  //     newNotesText = [...currentNotesText, noteData.text];
  //   }

  //   try {
  //     await makePutRequest(`vehicles/${vehicle.registrationNumber}`, {
  //       notes: newNotesText,
  //       outlay: vehicle.outlay || [], // 🚨 include this
  //       documents:
  //         vehicle.documents?.map((d) => ({ type: d.type, url: d.url })) || [], // optional safeguard
  //     });
  //     toast.success("Note saved successfully!");
  //     fetchVehicleDetails();
  //   } catch (err: any) {
  //     toast.error(err.message || "Failed to save the note.");
  //     console.error("Note save error:", err);
  //   }
  // };

  // const handleDeleteNote = async (noteId: number) => {
  //   if (!vehicle) return;

  //   const currentNotesText: string[] = vehicle.notes.map((n) => n.text);
  //   const noteIndex = noteId - 1;

  //   if (noteIndex < 0 || noteIndex >= currentNotesText.length) {
  //     toast.error("Could not find the note to delete.");
  //     return;
  //   }

  //   const newNotesText = currentNotesText.filter(
  //     (_, index) => index !== noteIndex
  //   );

  //   try {
  //     await makePutRequest(`vehicles/${vehicle.registrationNumber}`, {
  //       notes: newNotesText,
  //     });
  //     toast.success("Note deleted successfully!");
  //     fetchVehicleDetails(); // Refetch details to get the latest state
  //   } catch (err: any) {
  //     toast.error(err.message || "Failed to delete the note.");
  //     console.error("Note delete error:", err);
  //   }
  // };

  // const handleSaveOutlay = async (data: {
  //   date: string;
  //   amount: number;
  //   description: string;
  //   id?: number;
  // }) => {
  //   if (!vehicle) return;

  //   // Transform the outlay data to match your API structure
  //   const newOutlay = {
  //     date: data.date,
  //     amount: data.amount,
  //     description: data.description,
  //   };

  //   try {
  //     let updatedOutlays = [...(vehicle.outlay || [])];

  //     if (data.id) {
  //       // Update existing outlay
  //       const index = updatedOutlays.findIndex((o) => o.id === data.id);
  //       if (index >= 0) {
  //         updatedOutlays[index] = { ...updatedOutlays[index], ...newOutlay };
  //       } else {
  //         toast.error("Could not find the outlay to update.");
  //         return;
  //       }
  //     } else {
  //       // Add new outlay (generate a temporary ID - API should provide real ID)
  //       const tempId =
  //         updatedOutlays.length > 0
  //           ? Math.max(...updatedOutlays.map((o) => o.id)) + 1
  //           : 1;
  //       updatedOutlays.push({ ...newOutlay, id: tempId });
  //     }

  //     // Update the vehicle with the new outlays
  //     await makePutRequest(`vehicles/${vehicle.registrationNumber}`, {
  //       outlay: updatedOutlays,
  //       notes: vehicle.notes.map((note) => note.text), // important to preserve
  //       documents: vehicle.documents.map((d) => ({
  //         type: d.type,
  //         url: d.url,
  //       })),
  //     });

  //     toast.success("Outlay saved successfully!");
  //     fetchVehicleDetails(); // Refetch details to get the latest state
  //   } catch (err: any) {
  //     toast.error(err.message || "Failed to save the outlay.");
  //     console.error("Outlay save error:", err);
  //   }
  // };

  // const handleDeleteOutlay = async (outlayId: number) => {
  //   if (!vehicle) return;

  //   try {
  //     const updatedOutlays = (vehicle.outlay || []).filter(
  //       (o) => o.id !== outlayId
  //     );

  //     await makePutRequest(`vehicles/${vehicle.registrationNumber}`, {
  //       outlay: updatedOutlays,
  //     });

  //     toast.success("Outlay deleted successfully!");
  //     fetchVehicleDetails(); // Refetch details to get the latest state
  //   } catch (err: any) {
  //     toast.error(err.message || "Failed to delete the outlay.");
  //     console.error("Outlay delete error:", err);
  //   }
  // };

  // const handleUploadDocument = async (file: File, type: string) => {
  //   if (!vehicle) return;

  //   // setIsUploading(true);
  //   toast.loading("Uploading document to Cloudinary...");

  //   const formData = new FormData();
  //   formData.append("file", file);

  //   try {
  //     // Step 1: Upload the file to Cloudinary
  //     const uploadResponse = await makePostRequest("upload", formData);

  //     if (!uploadResponse.data || !uploadResponse.data.success) {
  //       throw new Error(
  //         uploadResponse.data?.message || "File upload to Cloudinary failed."
  //       );
  //     }

  //     const cloudinaryUrl = uploadResponse.data.data.url;

  //     // Step 2: Update the vehicle with the new document URL
  //     const newDocument = { type, url: cloudinaryUrl };
  //     const currentDocuments = vehicle.documents.map((d) => ({
  //       type: d.type,
  //       url: d.url,
  //     })); // Make sure to only send what the backend expects

  //     const updatedDocuments = [...currentDocuments, newDocument];

  //     await makePutRequest(`vehicles/${vehicle.registrationNumber}`, {
  //       documents: updatedDocuments,
  //     });

  //     toast.dismiss();
  //     toast.success("Document uploaded to Cloudinary and vehicle updated!");
  //     fetchVehicleDetails(); // Refetch to show the new document
  //   } catch (err: any) {
  //     toast.dismiss();
  //     toast.error(err.message || "Failed to upload document to Cloudinary.");
  //     console.error("Document upload error:", err);
  //   } finally {
  //     // setIsUploading(false);
  //   }
  // };

  const handleUpdateSuccess = (shouldRedirect?: boolean) => {
    setIsEditModalOpen(false);
    if (shouldRedirect) {
      navigate("/vehicles");
    } else {
      fetchVehicleDetails();
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <div className="p-6 text-center">Laddar fordonsdetaljer...</div>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  if (!vehicle) {
    return <div className="p-6 text-center">Fordonet hittades inte.</div>;
  }

  return (
    <div className="lg:p-6 p-4 max-w-full mx-auto font-plus-jakarta">
      <AddNewVehicle
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={handleUpdateSuccess}
        vehicleToEdit={vehicle}
      />
      {showDeletePopup && (
        <DeletePopup
          entityName="Vehicle"
          onCancel={() => setShowDeletePopup(false)}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
      )}
      <div className="flex xl:items-center items-start xl:flex-row flex-col justify-between xl:gap-0 gap-5 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            Fordonsdetaljer
          </button>
          <span className="bg-gradient-to-b from-[#1F7BF4] to-[#015DD6] text-white rounded px-2 py-1 text-xs font-bold">
            {vehicle?.registrationNumber || "N/A"}
          </span>
        </div>
        {/* <div className="flex sm:flex-row flex-col items-center gap-3 sm:mt-0 sm:mx-0 ml-auto justify-between xl:justify-end w-full xl:w-auto">
          <div className="flex sm:gap-3 gap-1">
            <button
              title="Delete"
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer dashboard-cards"
              onClick={() => setShowDeletePopup(true)}
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              title="Edit"
              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer dashboard-cards"
              onClick={() => setIsEditModalOpen(true)}
            >
              <FileEdit className="w-5 h-5" />
            </button>
            <button
              title="Message"
              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer dashboard-cards"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
            <button
              title="Purchase"
              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer dashboard-cards"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button
              title="Sale"
              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer dashboard-cards"
            >
              <DollarSign className="w-5 h-5" />
            </button>
            <button
              title="Intermediation"
              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer dashboard-cards"
            >
              <FileChartColumn className="w-5 h-5" />
            </button>
            <button
              title="Swisha"
              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer dashboard-cards"
            >
              <Rocket className="w-5 h-5" />
            </button>
            <button
              title="Invoice"
              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer dashboard-cards"
            >
              <BadgeDollarSign className="w-5 h-5" />
            </button>
            <button
              onClick={() =>
                navigate(`/add-new-advertise/${vehicle.registrationNumber}`)
              }
              title="Advertise"
              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer dashboard-cards"
            >
              <Upload className="w-5 h-5" />
            </button>
          </div>
          <button className="px-4 py-2 text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700">
            Sign Agreement
          </button>
        </div> */}
        {/* <div className="flex justify-end items-center gap-3 mt-4">
          <button className="px-4 py-2 text-[#012F7A] border border-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2 cursor-pointer">
            <EditAgreementIcon />
            Invocie
          </button>
          <button className="px-4 py-2 text-[#012F7A] border border-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2 cursor-pointer">
            <ViewAgreementIcon />
            Advertise
          </button>
          <button className="px-4 py-2 text-[#012F7A] border border-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2 cursor-pointer">
            <EnvelopeAgreementIcon />
            Email
          </button>
          <button className="px-4 py-2 text-[#012F7A] border border-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2 cursor-pointer">
            <SwishaAgreementIcon />
            Swisha
          </button>
          <button
            className="px-4 py-2 text-white bg-[#012F7A] rounded-lg hover:bg-[#012F7A]/90 flex items-center gap-2 cursor-pointer"
            // onClick={() =>
            //   navigate(`/sign-agreement/${agreement.id}`)
            // }
          >
            <SignAgreementIcon />
            Agreement
          </button>
        </div> */}
      </div>

      <div className="w-full gap-6">
        <div className="space-y-6 grid grid-cols-2 gap-6">
          <BasicInformation vehicle={vehicle} />
          <RegistrationDates vehicle={vehicle} />
          <TechnicalSpecifications vehicle={vehicle} />
          <OwnershipInformation vehicle={vehicle} />
          <InspectionDetails vehicle={vehicle} />
          <ImportOrigin vehicle={vehicle} />
        </div>

        {/* <div className="space-y-6">
          <VehicleInformation />
          <OutlayComponent
            vehicle={vehicle}
            onSaveOutlay={handleSaveOutlay}
            onDelete={handleDeleteOutlay}
          />
          <Notes
            vehicle={vehicle}
            onSaveNote={handleSaveNote}
            onDelete={handleDeleteNote}
          />
          <Documents
            vehicle={vehicle}
            onUploadDocument={handleUploadDocument}
          />
        </div> */}
      </div>
    </div>
  );
};

export default VehicleDetails2;
