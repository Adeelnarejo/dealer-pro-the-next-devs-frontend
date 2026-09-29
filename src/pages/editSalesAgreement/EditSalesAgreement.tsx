import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  FilePenLine,
  Save,
  Loader2,
  ShieldCheck,
  ClipboardCheck,
} from "lucide-react";

import BasicInformation from "../../components/Agreements/addNewAgreement/BasicInformation";
import TradeVehicle from "../../components/Agreements/addNewAgreement/TradeVehicle";
import SalesInformation from "../../components/Agreements/addNewAgreement/SalesInformation";
import VehicleInformation from "../../components/Agreements/addNewAgreement/VehicleInformation";
import PaymentInformation from "../../components/Agreements/addNewAgreement/PaymentInformation";
import DeliveryInformation from "../../components/Agreements/addNewAgreement/salesAgreement/DeliveryInformation";

import { makePutRequest } from "../../api/Api";
import { BACKEND_API_ENDPOINT } from "../../api/config";
import toast from "react-hot-toast";

import SalesAgreementPreview from "../../components/Agreements/addNewAgreement/salesAgreement/SalesAgreementPreview";

import { getVehicle } from "../../utils/getVehicle";
import { createVehicle } from "../../utils/createVehicle";

type SearchResult = { data?: any[] } | null;
type SearchTradeInVehicle = { data?: any[] } | null;

const EditSalesAgreement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const agreementData = location.state?.agreementData;

  // ============================================================
  // FORM STATE
  // ============================================================
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
    tradeInRegistrationNumber:
      agreementData?.tradeInRegistrationNumber || "",

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

  // ============================================================
  // LIVE PREVIEW
  // ============================================================
  const preview = {
    ...form,

    ...(searchResults.vehicle?.data?.[0] || {}),

    ...(searchTradeInVehicle.vehicle?.data?.[0] || {}),

    contractInfo: {
      ...(searchResults.org?.data ||
        searchResults.person?.data ||
        {}),

      customerType: form.customerType,
    },
  };

  // ============================================================
  // REDIRECT IF AGREEMENT IS MISSING
  // ============================================================
  useEffect(() => {
    if (!agreementData) {
      toast.error("No agreement data provided for editing");
      navigate("/agreements");
    }
  }, [agreementData, navigate]);

  // ============================================================
  // FORM CHANGE
  // ============================================================
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ============================================================
  // PRINT
  // ============================================================
  const handlePrint = async () => {
    await handleUpdateAgreement();
  };

  // ============================================================
  // VALIDATION
  // ============================================================
  const validateForm = () => {
    const errors = {
      registrationNumber: !(form.registrationNumber || "").trim(),
    };

    setFormErrors(errors);

    return !Object.values(errors).some((error) => error);
  };

  // ============================================================
  // SEARCH CUSTOMER / VEHICLE
  // ============================================================
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

  // ============================================================
  // SEARCH TRADE-IN VEHICLE
  // ============================================================
  const handleSearchTradeVehicle = async (
    type: "VEHICLE",
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

  // ============================================================
  // UPDATE AGREEMENT
  // ============================================================
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
        const resp = await createVehicle({
          registrationNumber: form.registrationNumber,
        });

        console.log("Vehicle creation response:", resp);
      }

      const payload = {
        id: agreementData.id,

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

        tradeInRegistrationNumber:
          form.tradeInRegistrationNumber || null,

        tradeInPurchaseDate:
          form.tradeInPurchaseDate || null,

        tradeInPurchasePrice:
          form.tradeInPurchasePrice || null,

        tradeInMileage:
          parseInt(form.tradeInMileage) || null,

        tradeInCreditMaking:
          form.tradeInCreditMaking || null,

        tradeInRestAmount:
          form.tradeInRestAmount || null,

        creditAmountSales:
          form.creditAmountSales || null,

        cashStack:
          form.cashStack || null,

        loanPeriod:
          form.loanPeriod || null,

        deliveryDate:
          form.deliveryDate || null,

        deliveryLocation:
          form.deliveryLocation || null,

        deliveryTerms:
          form.deliveryTerms || null,

        pep:
          form.pep || null,

        latestServiceDate:
          form.latestServiceDate || null,

        paymentDate:
          form.paymentDate || null,

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

  // ============================================================
  // LOADING STATE
  // ============================================================
  if (!agreementData) {
    return (
      <div className="min-h-[60vh] w-full bg-slate-50 p-4 font-plus-jakarta sm:p-6 dark:bg-[#070d19]">
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>

            <p className="mt-4 text-sm font-semibold text-slate-700 dark:text-slate-200">
              Loading agreement data...
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Please wait while the agreement is being prepared.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // MAIN PAGE
  // ============================================================
  return (
    <div className="min-h-full w-full bg-slate-50 p-3 font-plus-jakarta sm:p-4 lg:p-6 dark:bg-[#070d19]">
      {/* ========================================================
          HEADER
      ======================================================== */}
      <div className="mb-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1120]">
        <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 sm:py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            {/* Back button */}
            <button
              type="button"
              onClick={() => navigate("/agreements")}
              title="Back to agreements"
              className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            </button>

            {/* Header icon */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <FilePenLine className="h-5 w-5" />
            </div>

            {/* Heading */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate text-lg font-bold tracking-tight text-slate-900 sm:text-xl dark:text-white">
                  Edit Sales Agreement
                </h1>

                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                  #{agreementData.id}
                </span>
              </div>

              <p className="mt-0.5 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
                Update sales information and review the agreement preview.
              </p>
            </div>
          </div>

          {/* Editing status */}
          <div className="flex w-fit items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 dark:border-emerald-500/20 dark:bg-emerald-500/10">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Editing Mode
              </p>

              <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                Changes are ready to save
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          MAIN GRID
      ======================================================== */}
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(420px,0.92fr)] 2xl:gap-6">
        {/* ======================================================
            LEFT SIDE — FORM
        ====================================================== */}
        <div className="min-w-0 space-y-5">
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

          <SalesInformation
            form={form}
            handleChange={handleChange}
          />

          <VehicleInformation
            form={form}
            handleChange={handleChange}
          />

          <DeliveryInformation
            form={form}
            handleChange={handleChange}
          />

          <PaymentInformation
            form={form}
            handleChange={handleChange}
          />

          {/* ====================================================
              SAVE CARD
          ==================================================== */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 dark:border-slate-800 dark:bg-[#0b1120]">
            <div className="mb-4 flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <ClipboardCheck className="h-4 w-4" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Save Agreement
                </h3>

                <p className="mt-0.5 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  Review the information and save your changes when ready.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Cancel */}
              <button
                type="button"
                onClick={() => navigate("/agreements")}
                disabled={isUpdating}
                className="flex min-h-[46px] items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Cancel
              </button>

              {/* Update */}
              <button
                type="button"
                onClick={handleUpdateAgreement}
                disabled={
                  isUpdating || formErrors.registrationNumber
                }
                className="flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1F7BF4] to-[#015DD6] px-5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Updating Agreement...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Update Agreement
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================
            RIGHT SIDE — PREVIEW
        ====================================================== */}
        <div className="min-w-0 xl:sticky xl:top-5">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1120]">
            {/* Preview header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-5 dark:border-slate-800">
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Agreement Preview
                </p>

                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  Live preview of your sales agreement
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                <FilePenLine className="h-4 w-4" />
              </div>
            </div>

            {/* Preview body */}
            <div className="p-2 sm:p-3">
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
      </div>
    </div>
  );
};

export default EditSalesAgreement;