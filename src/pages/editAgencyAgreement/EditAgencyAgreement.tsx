import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BackArrowIcon } from "../../components/utils/Icons";
import BasicInformation from "../../components/Agreements/addNewAgreement/BasicInformation";
import TradeVehicle from "../../components/Agreements/addNewAgreement/TradeVehicle";
import SalesInformation from "../../components/Agreements/addNewAgreement/SalesInformation";
import VehicleInformation from "../../components/Agreements/addNewAgreement/VehicleInformation";
import PaymentInformation from "../../components/Agreements/addNewAgreement/PaymentInformation";
import AgencyInformation from "../../components/Agreements/addNewAgreement/AgencyInformation";
import { makePutRequest } from "../../api/Api";
import { Loader2 } from "lucide-react";
import { BACKEND_API_ENDPOINT } from "../../api/config";
import toast from "react-hot-toast";
import SalesAgreementPreview from "../../components/Agreements/addNewAgreement/salesAgreement/SalesAgreementPreview";
import { getVehicle } from "../../utils/getVehicle";
import { createVehicle } from "../../utils/createVehicle";

type SearchResult = { data?: any[] } | null;

const EditAgencyAgreement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const agreementData = location.state?.agreementData;

  // Initialize form with complete field set matching AddNewAgencyAgreement
  const [form, setForm] = useState({
    registrationNumber: agreementData?.registrationNumber || "",
    purchaseDate: agreementData?.purchaseDate || "",
    customerType: agreementData?.customerType || "",
    socialSecurityNumber: agreementData?.socialSecurityNumber || "",
    organizationNumber: agreementData?.organizationNumber || "",
    email: agreementData?.email || "",
    phone: agreementData?.phone || "",
    tradeInVehicle: agreementData?.tradeInVehicle || "",
    latestService: agreementData?.latestService || "",
    salesPriceSEK:
      agreementData?.salesPriceSEK || agreementData?.salesPrice || "",
    paymentMethod: agreementData?.paymentMethod || "",
    vatType: agreementData?.vatType || "",
    mileage: agreementData?.mileage?.toString() || "",
    numberOfKeys: agreementData?.numberOfKeys?.toString() || "",
    tires: agreementData?.tires || "",
    deck: agreementData?.deck || "",
    insurer: agreementData?.insurer || "",
    insuranceType:
      agreementData?.insuranceType || agreementData?.insurerType || "",
    warrantyProvider: agreementData?.warrantyProvider || "",
    warrantyProduct: agreementData?.warrantyProduct || "",
    notes: agreementData?.notes || agreementData?.freeTextMessage || "",
    tradeInRegNumber:
      agreementData?.tradeInRegNumber ||
      agreementData?.tradeInRegistrationNumber ||
      "",
    tradeInPurchaseDate: agreementData?.tradeInPurchaseDate || "",
    tradeInPurchasePrice: agreementData?.tradeInPurchasePrice || "",
    tradeInMileage: agreementData?.tradeInMileage?.toString() || "",
    tradeInCreditMarking:
      agreementData?.tradeInCreditMarking ||
      agreementData?.tradeInCreditMaking ||
      "",
    purchasePrice: agreementData?.purchasePrice || "",
    creditMarking: agreementData?.creditMarking || "",
    creditorName: agreementData?.creditorName || agreementData?.creditor || "",
    creditAmount: agreementData?.creditAmount || "",
    depositor: agreementData?.depositor || "",
    commissionRate: agreementData?.commissionRate || "",
    commissionAmount: agreementData?.commissionAmount || "",
    agencyFee: agreementData?.agencyFee || "",
    settlementDate: agreementData?.settlementDate || "",
    bank: agreementData?.bank || "",
    accountNumber: agreementData?.accountNumber || "",
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [searchResults, setSearchResults] = useState<{
    vehicle: any;
    org: SearchResult;
    person: SearchResult;
  }>({
    vehicle: null,
    org: null,
    person: null,
  });
  const [searchTradeInVehicle, setSearchTradeInVehicle] = useState<{
    vehicle: any;
  }>({
    vehicle: null,
  });
  const [formErrors, setFormErrors] = useState({
    registrationNumber: false,
  });

  console.log(setSearchTradeInVehicle);

  const preview = {
    ...form,
    ...(searchResults.vehicle?.data?.[0] || {}),
    contractInfo: {
      ...(searchResults.org?.data || searchResults.person?.data || {}),
      customerType: form.customerType,
    },
  };

  // Redirect if no agreement data provided
  useEffect(() => {
    if (!agreementData) {
      toast.error("No agreement data provided for editing");
      navigate("/agreements");
    }
  }, [agreementData, navigate]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePrint = async () => {
    await handleUpdateAgreement();
  };

  const validateForm = () => {
    const errors = {
      registrationNumber: !(form.registrationNumber || "").trim(),
    };
    setFormErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  const handleSearch = async (
    type: "VEHICLE" | "ORG" | "PERSON",
    query: string
  ) => {
    try {
      const response = await fetch(
        `${BACKEND_API_ENDPOINT}agreements/external/agreements`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " +
              (localStorage.getItem("token") ||
                sessionStorage.getItem("token")),
          },
          body: JSON.stringify({
            type,
            query,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setSearchResults((prev) => ({
        ...prev,
        [type.toLowerCase()]: data || null,
      }));
    } catch (error) {
      console.error(`Error searching ${type}:`, error);
      setSearchResults((prev) => ({
        ...prev,
        [type.toLowerCase()]: null,
      }));
    }
  };

  const handleUpdateAgreement = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsUpdating(true);

    try {
      // Check if vehicle exists
      const vehicle = await getVehicle(form.registrationNumber);

      if (!vehicle) {
        // create a new vehicle if it doesn't exist
        const resp = await createVehicle({
          registrationNumber: form.registrationNumber,
        });
        console.log("Vehicle creation response:", resp);
      }

      const payload = {
        id: agreementData.id, // Include the agreement ID for updating
        type: "Agency Agreement",
        registrationNumber: form.registrationNumber,
        purchaseDate: form.purchaseDate,
        customerType: form.customerType,
        socialSecurityNumber: form.socialSecurityNumber,
        organizationNumber: form.organizationNumber,
        email: form.email,
        phone: form.phone,
        tradeInVehicle: form.tradeInVehicle,
        latestService: form.latestService,
        salesPriceSEK: form.salesPriceSEK,
        paymentMethod: form.paymentMethod,
        vatType: form.vatType,
        mileage: parseInt(form.mileage) || null,
        numberOfKeys: parseInt(form.numberOfKeys) || null,
        tires: form.tires,
        deck: form.deck,
        insurer: form.insurer,
        insuranceType: form.insuranceType,
        warrantyProvider: form.warrantyProvider,
        warrantyProduct: form.warrantyProduct,
        notes: form.notes,
        tradeInRegNumber: form.tradeInRegNumber || null,
        tradeInPurchaseDate: form.tradeInPurchaseDate || null,
        tradeInPurchasePrice: form.tradeInPurchasePrice || null,
        tradeInMileage: parseInt(form.tradeInMileage) || null,
        tradeInCreditMarking: form.tradeInCreditMarking || null,
        purchasePrice: form.purchasePrice || null,
        creditMarking: form.creditMarking || null,
        creditorName: form.creditorName || null,
        creditAmount: form.creditAmount || null,
        depositor: form.depositor || null,
        commissionRate: form.commissionRate || null,
        commissionAmount: form.commissionAmount || null,
        agencyFee: form.agencyFee || null,
        settlementDate: form.settlementDate || null,
        bank: form.bank || null,
        accountNumber: form.accountNumber || null,
        name:
          searchResults.org?.data?.[0]?.orgName?.name ||
          searchResults.person?.data?.[0]?.name?.names[0] ||
          null,
        address: searchResults.org?.data?.[0]?.addresses?.[0]
          ? `${searchResults.org.data[0].addresses[0].street} ${searchResults.org.data[0].addresses[0].number}`
          : searchResults.person?.data?.[0]?.addresses?.[0]
          ? `${searchResults.person.data[0].addresses[0].street} ${searchResults.person.data[0].addresses[0].number}`
          : null,
      };

      // Use PUT request for updating existing agreement
      const response = await makePutRequest(
        `agreements/updateAgreement/${agreementData.id}`,
        payload
      );

      if (response.data.success) {
        toast.success("Agency Agreement Updated Successfully.");
        navigate("/agreements");
      }
    } catch (error) {
      console.error("Error updating agreement:", error);
      toast.error("Failed to update agreement");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!agreementData) {
    return (
      <div className="lg:p-6 p-4 font-plus-jakarta">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-gray-600">Loading agreement data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:p-6 p-4 font-plus-jakarta">
      <div className="flex items-center mb-6">
        <button
          className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer"
          onClick={() => navigate("/agreements")}
        >
          <BackArrowIcon />
          <span className="ml-2">
            Redigera kommissionsavtal #{agreementData.id}
          </span>
        </button>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
        <div>
          <BasicInformation
            form={form}
            handleChange={handleChange}
            onSearch={handleSearch}
          />
          <TradeVehicle
            form={form}
            handleChange={handleChange}
            onSearch={handleSearch}
          />
          <SalesInformation form={form} handleChange={handleChange} />
          <VehicleInformation form={form} handleChange={handleChange} />
          <AgencyInformation form={form} handleChange={handleChange} />
          <PaymentInformation form={form} handleChange={handleChange} />
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <button
              type="button"
              className="px-6 py-2 border border-blue-900 text-blue-900 rounded-lg cursor-pointer hover:bg-blue-50 flex items-center justify-center"
              onClick={() => navigate("/agreements")}
            >
              Avbryt
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-gradient-to-b from-[#1F7BF4] to-[#015DD6] text-white rounded-lg cursor-pointer hover:bg-blue-800 flex items-center justify-center"
              onClick={handleUpdateAgreement}
              disabled={isUpdating || formErrors.registrationNumber}
            >
              {isUpdating ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Uppdaterar...
                </>
              ) : (
                "Uppdatera avtal"
              )}
            </button>
          </div>
        </div>
        <div>
          <SalesAgreementPreview
            preview={preview}
            handlePrint={handlePrint}
            isCreating={isUpdating}
            form={form}
            searchResults={searchResults}
            searchTradeInVehicle={searchTradeInVehicle}
          />
        </div>
      </div>
    </div>
  );
};

export default EditAgencyAgreement;
