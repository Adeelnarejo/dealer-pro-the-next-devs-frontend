import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BackArrowIcon } from "../../components/utils/Icons";
import BasicInformation from "../../components/Agreements/addNewAgreement/BasicInformation";
import TradeVehicle from "../../components/Agreements/addNewAgreement/TradeVehicle";
import SalesInformation from "../../components/Agreements/addNewAgreement/SalesInformation";
import VehicleInformation from "../../components/Agreements/addNewAgreement/VehicleInformation";
import PaymentInformation from "../../components/Agreements/addNewAgreement/PaymentInformation";
import { makePutRequest } from "../../api/Api";
import { Loader2 } from "lucide-react";
import { BACKEND_API_ENDPOINT } from "../../api/config";
import toast from "react-hot-toast";
import SalesAgreementPreview from "../../components/Agreements/addNewAgreement/salesAgreement/SalesAgreementPreview";
import { getVehicle } from "../../utils/getVehicle";
import { createVehicle } from "../../utils/createVehicle";
import DeliveryInformation from "../../components/Agreements/addNewAgreement/salesAgreement/DeliveryInformation";

type SearchResult = { data?: any[] } | null;
type SearchTradeInVehicle = { data?: any[] } | null;

const EditSalesAgreement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const agreementData = location.state?.agreementData;

  // Initialize form with complete field set matching AddNewSalesAgreement
  const [form, setForm] = useState({
    registrationNumber: agreementData?.registrationNumber || "",
    purchaseDate: agreementData?.purchaseDate || "",
    email: agreementData?.email || "",
    phone: agreementData?.phone || "",
    salesPriceSEK:
      agreementData?.salesPriceSEK || agreementData?.salesPrice || "",
    paymentMethod: agreementData?.paymentMethod || "",
    vatType: agreementData?.vatType || "",
    creditMarking: agreementData?.creditMarking || "",
    mileage: agreementData?.mileage?.toString() || "",
    latestService: agreementData?.latestService || "",
    numberOfKeys: agreementData?.numberOfKeys?.toString() || "",
    deck: agreementData?.deck || "",
    freeTextMessage:
      agreementData?.freeTextMessage || agreementData?.notes || "",
    creditor: agreementData?.creditor || "",
    depositor: agreementData?.depositor || "",
    creditAmount: agreementData?.creditAmount || "",
    customerType: agreementData?.customerType || "",
    address: agreementData?.address || "",
    birthDate: agreementData?.birthDate || "",
    gender: agreementData?.gender || "",
    salesDate: agreementData?.salesDate || "",
    commissionRate: agreementData?.commissionRate || "",
    commissionAmount: agreementData?.commissionAmount || "",
    agencyFee: agreementData?.agencyFee || "",
    insurer: agreementData?.insurer || "",
    insuranceType:
      agreementData?.insuranceType || agreementData?.insurerType || "",
    warrantyProvider: agreementData?.warrantyProvider || "",
    warrantyProduct: agreementData?.warrantyProduct || "",
    socialSecurityNumber: agreementData?.socialSecurityNumber || "",
    organizationNumber: agreementData?.organizationNumber || "",
    tradeInType: agreementData?.tradeInType || "",
    tradeInRegistrationNumber: agreementData?.tradeInRegistrationNumber || "",
    tradeInPurchaseDate: agreementData?.tradeInPurchaseDate || "",
    tradeInPurchasePrice: agreementData?.tradeInPurchasePrice || "",
    tradeInMileage: agreementData?.tradeInMileage?.toString() || "",
    tradeInCreditMaking:
      agreementData?.tradeInCreditMaking ||
      agreementData?.tradeInCreditMarking ||
      "",
    tradeInRestAmount: agreementData?.tradeInRestAmount || "",
    creditAmountSales: agreementData?.creditAmountSales || "",
    cashStack: agreementData?.cashStack || "",
    loanPeriod: agreementData?.loanPeriod || "",
    deliveryDate: agreementData?.deliveryDate || "",
    deliveryLocation: agreementData?.deliveryLocation || "",
    deliveryTerms: agreementData?.deliveryTerms || "",
    pep: agreementData?.pep || "",
    verification: agreementData?.verification || "",
    latestServiceDate: agreementData?.latestServiceDate || "",
    paymentDate: agreementData?.paymentDate || "",
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
    vehicle: SearchTradeInVehicle;
  }>({
    vehicle: null,
  });
  const [formErrors, setFormErrors] = useState({
    registrationNumber: false,
  });

  const preview = {
    ...form,
    ...(searchResults.vehicle?.data?.[0] || {}),
    ...(searchTradeInVehicle.vehicle?.data?.[0] || {}),
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

  const handleSearchTradeVehicle = async (type: "VEHICLE", query: string) => {
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

      setSearchTradeInVehicle((prev) => ({
        ...prev,
        [type.toLowerCase()]: data || null,
      }));
    } catch (error) {
      console.error(`Error searching ${type}:`, error);
      setSearchTradeInVehicle((prev) => ({
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
        type: "Sales Agreement",
        registrationNumber: form.registrationNumber,
        purchaseDate: form.purchaseDate,
        email: form.email,
        phone: form.phone,
        salesPriceSEK: form.salesPriceSEK,
        paymentMethod: form.paymentMethod,
        vatType: form.vatType,
        creditMarking: form.creditMarking,
        mileage: parseInt(form.mileage) || null,
        latestService: form.latestService,
        numberOfKeys: parseInt(form.numberOfKeys) || null,
        deck: form.deck,
        freeTextMessage: form.freeTextMessage,
        creditor: form.creditor,
        depositor: form.depositor,
        creditAmount: form.creditAmount,
        customerType: form.customerType,
        socialSecurityNumber: form.socialSecurityNumber,
        organizationNumber: form.organizationNumber,
        verification: form.verification,
        birthDate: form.birthDate,
        gender: form.gender,
        salesDate: form.salesDate,
        commissionRate: form.commissionRate,
        commissionAmount: form.commissionAmount,
        agencyFee: form.agencyFee,
        insurer: form.insurer,
        insuranceType: form.insuranceType,
        warrantyProvider: form.warrantyProvider,
        warrantyProduct: form.warrantyProduct,
        tradeInType: form.tradeInType,
        tradeInRegistrationNumber: form.tradeInRegistrationNumber || null,
        tradeInPurchaseDate: form.tradeInPurchaseDate || null,
        tradeInPurchasePrice: form.tradeInPurchasePrice || null,
        tradeInMileage: parseInt(form.tradeInMileage) || null,
        tradeInCreditMaking: form.tradeInCreditMaking || null,
        tradeInRestAmount: form.tradeInRestAmount || null,
        creditAmountSales: form.creditAmountSales || null,
        cashStack: form.cashStack || null,
        loanPeriod: form.loanPeriod || null,
        deliveryDate: form.deliveryDate || null,
        deliveryLocation: form.deliveryLocation || null,
        deliveryTerms: form.deliveryTerms || null,
        pep: form.pep || null,
        latestServiceDate: form.latestServiceDate || null,
        paymentDate: form.paymentDate || null,
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
        toast.success("Sales Agreement Updated Successfully.");
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
            Redigera försäljningsavtal #{agreementData.id}
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
            onSearch={handleSearchTradeVehicle}
          />
          <SalesInformation form={form} handleChange={handleChange} />
          <VehicleInformation form={form} handleChange={handleChange} />
          <DeliveryInformation form={form} handleChange={handleChange} />
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

export default EditSalesAgreement;
