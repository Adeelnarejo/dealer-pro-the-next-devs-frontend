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
import { BackArrowIcon } from "../../components/utils/Icons";
import BasicInformation from "../../components/Agreements/addNewAgreement/BasicInformation";
import TradeVehicle from "../../components/Agreements/addNewAgreement/TradeVehicle";
import SalesInformation from "../../components/Agreements/addNewAgreement/SalesInformation";
import VehicleInformation from "../../components/Agreements/addNewAgreement/VehicleInformation";
import PaymentInformation from "../../components/Agreements/addNewAgreement/PaymentInformation";
import AgencyInformation from "../../components/Agreements/addNewAgreement/AgencyInformation";
import { makePutRequest } from "../../api/Api";
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

  const preview = {
    ...form,
    ...(searchResults.vehicle?.data?.[0] || {}),
    contractInfo: {
      ...(searchResults.org?.data || searchResults.person?.data || {}),
      customerType: form.customerType,
    },
  };

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
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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
      const vehicle = await getVehicle(form.registrationNumber);

      if (!vehicle) {
        const resp = await createVehicle({
          registrationNumber: form.registrationNumber,
        });

        console.log("Vehicle creation response:", resp);
      }

      const payload = {
        id: agreementData.id,
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
      <div className="min-h-[60vh] w-full bg-slate-50 p-4 font-plus-jakarta dark:bg-[#070d19] sm:p-6">
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
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

  return (
    <div className="min-h-full w-full bg-slate-50 p-3 font-plus-jakarta sm:p-4 lg:p-6 dark:bg-[#070d19]">
      {/* ============================================================
          PAGE HEADER
      ============================================================ */}
      <div className="mb-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1120]">
        <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 sm:py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/agreements")}
              className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
              title="Back to agreements"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            </button>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <FilePenLine className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate text-lg font-bold tracking-tight text-slate-900 sm:text-xl dark:text-white">
                  Edit Agency Agreement
                </h1>

                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                  #{agreementData.id}
                </span>
              </div>

              <p className="mt-0.5 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
                Update agreement details and review the final document.
              </p>
            </div>
          </div>

          {/* Status */}
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

      {/* ============================================================
          MAIN CONTENT
      ============================================================ */}
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(420px,0.92fr)] 2xl:gap-6">
        {/* ==========================================================
            LEFT - FORM
        ========================================================== */}
        <div className="min-w-0 space-y-5">
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

          <SalesInformation
            form={form}
            handleChange={handleChange}
          />

          <VehicleInformation
            form={form}
            handleChange={handleChange}
          />

          <AgencyInformation
            form={form}
            handleChange={handleChange}
          />

          <PaymentInformation
            form={form}
            handleChange={handleChange}
          />

          {/* ========================================================
              ACTIONS
          ======================================================== */}
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
              <button
                type="button"
                onClick={() => navigate("/agreements")}
                disabled={isUpdating}
                className="flex min-h-[46px] items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Cancel
              </button>

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

        {/* ==========================================================
            RIGHT - PREVIEW
        ========================================================== */}
        <div className="min-w-0 xl:sticky xl:top-5">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1120]">
            {/* Preview header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-5 dark:border-slate-800">
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Agreement Preview
                </p>

                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  Live preview of your agreement
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                <FilePenLine className="h-4 w-4" />
              </div>
            </div>

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

export default EditAgencyAgreement;