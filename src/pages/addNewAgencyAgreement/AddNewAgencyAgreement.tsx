import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CarFront,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  FileSignature,
  Info,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Printer,
  ShieldCheck,
  UserRound,
  WalletCards,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";

import BasicInformation from "../../components/Agreements/addNewAgreement/BasicInformation";
import TradeVehicle from "../../components/Agreements/addNewAgreement/TradeVehicle";
import SalesInformation from "../../components/Agreements/addNewAgreement/SalesInformation";
import VehicleInformation from "../../components/Agreements/addNewAgreement/VehicleInformation";
import PaymentInformation from "../../components/Agreements/addNewAgreement/PaymentInformation";
import AgencyInformation from "../../components/Agreements/addNewAgreement/AgencyInformation";

import { makePostRequest } from "../../api/Api";
import { BACKEND_API_ENDPOINT } from "../../api/config";
import { generateRegularSigningLink } from "../../utils/publicSigningUtils";
import { getVehicle } from "../../utils/getVehicle";
import { createVehicle } from "../../utils/createVehicle";

type SearchResult = {
  data?: any[];
} | null;

type FormState = {
  registrationNumber: string;
  purchaseDate: string;
  customerType: string;
  socialSecurityNumber: string;
  organizationNumber: string;
  email: string;
  phone: string;

  tradeInVehicle: string;
  latestService: string;

  salesPriceSEK: string;
  paymentMethod: string;
  vatType: string;

  mileage: string;
  numberOfKeys: string;
  tires: string;
  deck: string;

  insurer: string;
  insuranceType: string;

  warrantyProvider: string;
  warrantyProduct: string;

  notes: string;

  tradeInRegNumber: string;
  tradeInPurchaseDate: string;
  tradeInPurchasePrice: string;
  tradeInMileage: string;
  tradeInCreditMarking: string;

  purchasePrice: string;
  creditMarking: string;
  creditorName: string;
  creditAmount: string;
  depositor: string;

  commissionRate: string;
  commissionAmount: string;
  agencyFee: string;

  settlementDate: string;
  bank: string;
  accountNumber: string;
};

const initialForm: FormState = {
  registrationNumber: "",
  purchaseDate: "",
  customerType: "",
  socialSecurityNumber: "",
  organizationNumber: "",
  email: "",
  phone: "",

  tradeInVehicle: "",
  latestService: "",

  salesPriceSEK: "",
  paymentMethod: "",
  vatType: "",

  mileage: "",
  numberOfKeys: "",
  tires: "",
  deck: "",

  insurer: "",
  insuranceType: "",

  warrantyProvider: "",
  warrantyProduct: "",

  notes: "",

  tradeInRegNumber: "",
  tradeInPurchaseDate: "",
  tradeInPurchasePrice: "",
  tradeInMileage: "",
  tradeInCreditMarking: "",

  purchasePrice: "",
  creditMarking: "",
  creditorName: "",
  creditAmount: "",
  depositor: "",

  commissionRate: "",
  commissionAmount: "",
  agencyFee: "",

  settlementDate: "",
  bank: "",
  accountNumber: "",
};

const AddNewAgencyAgreement = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>(initialForm);

  const [isCreating, setIsCreating] = useState(false);

  const [searchResults, setSearchResults] = useState<{
    vehicle: SearchResult;
    org: SearchResult;
    person: SearchResult;
  }>({
    vehicle: null,
    org: null,
    person: null,
  });

  const [formErrors, setFormErrors] = useState({
    registrationNumber: false,
  });

  const [createdAgreementData, setCreatedAgreementData] = useState<any>(null);

  const [activePreviewSection, setActivePreviewSection] =
    useState("vehicle");

  const [searchingType, setSearchingType] = useState<string | null>(null);

  /*
   * External API token
   *
   * Do NOT put the real token directly inside the source code.
   *
   * Add this to your .env:
   *
   * VITE_EXTERNAL_API_TOKEN=your_token_here
   */
  const externalApiToken =
    import.meta.env.VITE_EXTERNAL_API_TOKEN ||
    localStorage.getItem("externalApiToken") ||
    "";

  useEffect(() => {
    /*
     * Kept intentionally because the original page loads
     * AllAgreements.json.
     */
    fetch("/src/assets/data/AllAgreements.json").catch((error) => {
      console.warn("Could not load agreements data:", error);
    });
  }, []);

  const vehicleData = searchResults.vehicle?.data?.[0];
  const orgData = searchResults.org?.data?.[0];
  const personData = searchResults.person?.data?.[0];

  const vehicleModel = useMemo(() => {
    if (!vehicleData?.detail) return "N/A";

    const brand = vehicleData.detail.vehicleBrand || "";
    const model =
      vehicleData.detail.vehicleModelRaw ||
      vehicleData.detail.vehicleModel ||
      "";

    return `${brand} ${model}`.trim() || "N/A";
  }, [vehicleData]);

  const customerName = useMemo(() => {
    if (form.customerType === "company") {
      return orgData?.orgName?.name || "N/A";
    }

    return (
      personData?.name?.givenName ||
      personData?.name?.names?.[0] ||
      "N/A"
    );
  }, [form.customerType, orgData, personData]);

  const customerAddress = useMemo(() => {
    const address =
      form.customerType === "company"
        ? orgData?.addresses?.[0]
        : personData?.addresses?.[0];

    if (!address) return "N/A";

    const street = [address.street, address.number]
      .filter(Boolean)
      .join(" ");

    const city = [address.zip, address.city]
      .filter(Boolean)
      .join(" ");

    return [street, city].filter(Boolean).join(", ") || "N/A";
  }, [form.customerType, orgData, personData]);

  const validateForm = () => {
    const errors = {
      registrationNumber: !form.registrationNumber.trim(),
    };

    setFormErrors(errors);

    return !Object.values(errors).some(Boolean);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (name === "registrationNumber" && value.trim()) {
      setFormErrors((previous) => ({
        ...previous,
        registrationNumber: false,
      }));
    }
  };

  const handleSearch = async (
    type: "VEHICLE" | "ORG" | "PERSON",
    query: string
  ) => {
    const cleanQuery = query.trim();

    if (!cleanQuery) {
      return;
    }

    if (!externalApiToken) {
      toast.error(
        "External search is not configured. Add VITE_EXTERNAL_API_TOKEN to your .env file."
      );
      return;
    }

    setSearchingType(type);

    try {
      const response = await fetch(
        `${BACKEND_API_ENDPOINT}agreements/external/agreements`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${externalApiToken}`,
          },
          body: JSON.stringify({
            type,
            query: cleanQuery,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Search failed with status ${response.status}`);
      }

      const data = await response.json();

      setSearchResults((previous) => ({
        ...previous,
        [type.toLowerCase()]: data || null,
      }));

      toast.success(
        type === "VEHICLE"
          ? "Vehicle information found"
          : type === "ORG"
            ? "Company information found"
            : "Customer information found"
      );
    } catch (error) {
      console.error(`Error searching ${type}:`, error);

      setSearchResults((previous) => ({
        ...previous,
        [type.toLowerCase()]: null,
      }));

      toast.error(
        type === "VEHICLE"
          ? "Could not find vehicle information"
          : "Could not find customer information"
      );
    } finally {
      setSearchingType(null);
    }
  };

  const createVehicleIfNeeded = async () => {
    const vehicle = await getVehicle(form.registrationNumber);

    if (vehicle) {
      return true;
    }

    const response = await createVehicle({
      registrationNumber: form.registrationNumber,
      model: vehicleData?.detail?.vehicleModel || "",
      vehicleName: vehicleData?.detail?.vehicleBrand || "",
      year: vehicleData?.detail?.vehicleYear || "",
      chassisNumber: vehicleData?.detail?.chassisNumber || "",
      color: vehicleData?.detail?.color || "",
      fuelType: vehicleData?.technicalData?.fuelCodes?.join(", ") || "",
      gearbox: vehicleData?.technicalData?.gearbox || "",
    });

    return Boolean(response);
  };

  const buildAgreementPayload = (status: "created" | "signed") => {
    return {
      registrationNumber: form.registrationNumber || null,

      status,

      type: "Agency Agreement",

      purchaseDate: form.purchaseDate || null,

      email: form.email || null,

      phone: form.phone || null,

      purchasePrice:
        form.purchasePrice.replace(/[^0-9.]/g, "") || "0",

      paymentMethod: form.paymentMethod || null,

      vatType: form.vatType || null,

      creditMarking: form.creditMarking || null,

      latestService: form.latestService || null,

      mileage: form.mileage || null,

      numberOfKeys: form.numberOfKeys || null,

      deck: form.deck || null,

      notes: form.notes || null,

      creditor: form.creditorName || null,

      depositor: form.depositor || null,

      creditAmount: form.creditAmount || "0",

      customerType: form.customerType || null,

      insurer: form.insurer || null,

      warrantyProvider: form.warrantyProvider || null,

      warrantyProduct: form.warrantyProduct || null,

      socialSecurityNumber:
        form.socialSecurityNumber || null,

      organizationNumber:
        form.organizationNumber || null,

      tradeInType: form.tradeInVehicle || null,

      tradeInRegistrationNumber:
        form.tradeInRegNumber || null,

      tradeInPurchaseDate:
        form.tradeInPurchaseDate || null,

      tradeInPurchasePrice:
        form.tradeInPurchasePrice || null,

      tradeInMileage:
        form.tradeInMileage || null,

      tradeInCreditMaking:
        form.tradeInCreditMarking || null,

      commissionRate:
        form.commissionRate || null,

      commissionAmount:
        form.commissionAmount || null,

      agencyFee:
        form.agencyFee || null,

      vehicleModel:
        vehicleData?.detail?.vehicleBrand &&
        vehicleData?.detail?.vehicleModelRaw
          ? `${vehicleData.detail.vehicleBrand} ${vehicleData.detail.vehicleModelRaw}`
          : null,

      chassisNumber:
        vehicleData?.detail?.chassisNumber || null,

      color:
        vehicleData?.detail?.color || null,

      vehicleYear:
        vehicleData?.detail?.vehicleYear || null,

      fuelType:
        vehicleData?.technicalData?.fuelCodes?.join(", ") || null,

      gearbox:
        vehicleData?.technicalData?.gearbox || null,

      directImport:
        vehicleData?.origin?.directImport || null,

      emissionClass:
        vehicleData?.environmental?.emissionClass || null,

      inspectionDateUpToAndIncluding:
        vehicleData?.inspection
          ?.inspectionDateUpToAndIncluding || null,

      salesPriceSEK:
        form.salesPriceSEK || null,

      name:
        orgData?.orgName?.name ||
        personData?.name?.names?.[0] ||
        null,

      address: customerAddress === "N/A" ? null : customerAddress,

      settlementDate:
        form.settlementDate || null,

      bank:
        form.bank || null,

      accountNumber:
        form.accountNumber || null,
    };
  };

  const handleCreateAgreement = async () => {
    if (!validateForm()) {
      toast.error("Please enter the registration number");
      return;
    }

    setIsCreating(true);

    try {
      const vehicleCreated = await createVehicleIfNeeded();

      if (!vehicleCreated) {
        toast.error(
          "The vehicle does not exist and could not be created."
        );
        return;
      }

      const payload = buildAgreementPayload("created");

      const response = await makePostRequest(
        "agreements/createAgreement",
        payload
      );

      setCreatedAgreementData(response?.data);

      toast.success("Agency agreement created successfully.");
    } catch (error) {
      console.error("Error creating agreement:", error);

      toast.error("Failed to create agency agreement.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleCreateAndSignAgreement = async () => {
    if (!validateForm()) {
      toast.error("Please enter the registration number");
      return;
    }

    setIsCreating(true);

    try {
      const vehicleCreated = await createVehicleIfNeeded();

      if (!vehicleCreated) {
        toast.error(
          "The vehicle does not exist and could not be created."
        );
        return;
      }

      const payload = buildAgreementPayload("signed");

      const response = await makePostRequest(
        "agreements/createAgreement",
        payload
      );

      if (!response?.data?.success) {
        throw new Error("Agreement creation failed");
      }

      toast.success("Agency agreement created successfully.");

      setCreatedAgreementData(response.data);

      const agreementId =
        response.data?.data?.agreement?.id;

      if (!agreementId) {
        toast.error(
          "Agreement was created but no agreement ID was returned."
        );
        return;
      }

      navigate(generateRegularSigningLink(agreementId));
    } catch (error) {
      console.error(
        "Error creating agency agreement:",
        error
      );

      toast.error("Failed to create agency agreement.");
    } finally {
      setIsCreating(false);
    }
  };

  const handlePrint = async () => {
    await handleCreateAndSignAgreement();
  };

  const previewValue = (
    label: string,
    value: any,
    icon?: React.ReactNode
  ) => (
    <div className="group rounded-xl border border-slate-100 bg-slate-50/80 p-3.5 transition-all duration-200 hover:border-blue-100 hover:bg-blue-50/40 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-blue-900/60 dark:hover:bg-blue-950/20">
      <div className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400 dark:text-slate-500">
        {icon && (
          <span className="text-blue-500">
            {icon}
          </span>
        )}
        {label}
      </div>

      <div className="break-words text-sm font-semibold text-slate-800 dark:text-slate-100">
        {value || "N/A"}
      </div>
    </div>
  );

  const SectionHeader = ({
    icon,
    title,
    subtitle,
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
  }) => (
    <div className="mb-5 flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
        {icon}
      </div>

      <div>
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );

  const customerFound =
    form.customerType === "company"
      ? Boolean(orgData)
      : Boolean(personData);

  return (
    <div className="min-h-screen w-full bg-[#F5F7FA] px-3 py-4 font-plus-jakarta transition-colors duration-300 dark:bg-[#07111F] sm:px-5 sm:py-5 lg:px-6 lg:py-6">
      <div className="mx-auto w-full max-w-[1700px]">

        {/* =====================================================
            PAGE HEADER
        ====================================================== */}
        <div className="relative mb-5 overflow-hidden rounded-2xl bg-[#001A36] shadow-xl shadow-blue-950/10 dark:border dark:border-slate-800">
          {/* Decorative background */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-blue-500/15 blur-3xl" />
            <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          <div className="relative flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:p-7">
            <div>
              <button
                type="button"
                onClick={() => navigate("/agreements")}
                className="mb-4 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                <ArrowLeft size={15} />
                Back to Agreements
              </button>

              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-blue-300 ring-1 ring-white/10">
                  <FileSignature size={24} />
                </div>

                <div>
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-blue-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-300">
                      DealerPro Agreements
                    </span>

                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                      <ShieldCheck size={12} />
                      Secure
                    </span>
                  </div>

                  <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl">
                    Create Agency Agreement
                  </h1>

                  <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-300 sm:text-sm">
                    Create, review and sign an agency agreement
                    with your vehicle and customer information.
                  </p>
                </div>
              </div>
            </div>

            {/* Header status */}
            <div className="flex shrink-0 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-300">
                <CheckCircle2 size={19} />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Agreement Type
                </p>

                <p className="text-sm font-semibold text-white">
                  Agency Agreement
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            MAIN GRID
        ====================================================== */}
        <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(480px,0.95fr)]">

          {/* ===================================================
              LEFT - FORM
          ==================================================== */}
          <div className="min-w-0 space-y-5">

            {/* Basic Information */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-[#0B1728]">
              <div className="border-b border-slate-100 px-5 py-5 dark:border-slate-800 sm:px-6">
                <SectionHeader
                  icon={<ClipboardList size={20} />}
                  title="Basic Information"
                  subtitle="Enter customer and vehicle identification details."
                />
              </div>

              <div className="p-4 sm:p-6">
                <BasicInformation
                  form={form}
                  handleChange={handleChange}
                  onSearch={handleSearch}
                />

                {searchingType === "ORG" ||
                searchingType === "PERSON" ? (
                  <div className="mt-4 flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-300">
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                    Searching customer information...
                  </div>
                ) : customerFound ? (
                  <div className="mt-4 flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/20">
                    <CheckCircle2
                      size={19}
                      className="mt-0.5 shrink-0 text-emerald-500"
                    />

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                        Customer information found
                      </p>

                      <p className="mt-0.5 break-words text-xs text-emerald-700/80 dark:text-emerald-400/80">
                        {customerName}
                        {customerAddress !== "N/A"
                          ? ` • ${customerAddress}`
                          : ""}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            </section>

            {/* Trade Vehicle */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-[#0B1728]">
              <div className="border-b border-slate-100 px-5 py-5 dark:border-slate-800 sm:px-6">
                <SectionHeader
                  icon={<CarFront size={20} />}
                  title="Trade-In Vehicle"
                  subtitle="Add the vehicle being traded into the agreement."
                />
              </div>

              <div className="p-4 sm:p-6">
                <TradeVehicle
                  form={form}
                  handleChange={handleChange}
                  onSearch={handleSearch}
                />
              </div>
            </section>

            {/* Sales Information */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-[#0B1728]">
              <div className="border-b border-slate-100 px-5 py-5 dark:border-slate-800 sm:px-6">
                <SectionHeader
                  icon={<WalletCards size={20} />}
                  title="Sales Information"
                  subtitle="Configure pricing and sales-related details."
                />
              </div>

              <div className="p-4 sm:p-6">
                <SalesInformation
                  form={form}
                  handleChange={handleChange}
                />
              </div>
            </section>

            {/* Vehicle Information */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-[#0B1728]">
              <div className="border-b border-slate-100 px-5 py-5 dark:border-slate-800 sm:px-6">
                <SectionHeader
                  icon={<CarFront size={20} />}
                  title="Vehicle Information"
                  subtitle="Vehicle specifications and condition details."
                />
              </div>

              <div className="p-4 sm:p-6">
                <VehicleInformation
                  form={form}
                  handleChange={handleChange}
                />
              </div>
            </section>

            {/* Payment Information */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-[#0B1728]">
              <div className="border-b border-slate-100 px-5 py-5 dark:border-slate-800 sm:px-6">
                <SectionHeader
                  icon={<CreditCard size={20} />}
                  title="Payment Information"
                  subtitle="Configure payment, credit and settlement details."
                />
              </div>

              <div className="p-4 sm:p-6">
                <PaymentInformation
                  form={form}
                  handleChange={handleChange}
                />
              </div>
            </section>

            {/* Agency Information */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-[#0B1728]">
              <div className="border-b border-slate-100 px-5 py-5 dark:border-slate-800 sm:px-6">
                <SectionHeader
                  icon={<Building2 size={20} />}
                  title="Agency Information"
                  subtitle="Commission, agency fees and settlement information."
                />
              </div>

              <div className="p-4 sm:p-6">
                <AgencyInformation
                  form={form}
                  handleChange={handleChange}
                />
              </div>
            </section>

            {/* Validation notice */}
            {formErrors.registrationNumber && (
              <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/20">
                <XCircle
                  size={19}
                  className="mt-0.5 shrink-0 text-red-500"
                />

                <div>
                  <p className="text-sm font-semibold text-red-700 dark:text-red-300">
                    Registration number required
                  </p>

                  <p className="mt-1 text-xs text-red-600/80 dark:text-red-400/80">
                    Please enter a vehicle registration number
                    before creating the agreement.
                  </p>
                </div>
              </div>
            )}

            {/* =================================================
                ACTION BUTTONS
            ================================================== */}
            <div className="sticky bottom-3 z-20 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-xl shadow-slate-900/10 backdrop-blur-xl dark:border-slate-800 dark:bg-[#0B1728]/95 dark:shadow-black/30 sm:p-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                <button
                  type="button"
                  onClick={handleCreateAgreement}
                  disabled={
                    isCreating ||
                    formErrors.registrationNumber
                  }
                  className="group flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#012F7A] bg-white px-5 text-sm font-bold text-[#012F7A] transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-500/60 dark:bg-transparent dark:text-blue-300 dark:hover:bg-blue-950/30"
                >
                  {isCreating ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />
                      Creating...
                    </>
                  ) : (
                    <>
                      <FileSignature size={17} />
                      Create Agreement
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCreateAndSignAgreement}
                  disabled={
                    isCreating ||
                    formErrors.registrationNumber
                  }
                  className="group flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1F7BF4] to-[#015DD6] px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-blue-600/30 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isCreating ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />
                      Creating...
                    </>
                  ) : (
                    <>
                      Create & Sign Agreement
                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </>
                  )}
                </button>
              </div>

              <p className="mt-3 text-center text-[11px] text-slate-400 dark:text-slate-500">
                Make sure all required information is correct
                before creating the agreement.
              </p>
            </div>
          </div>

          {/* ===================================================
              RIGHT - LIVE PREVIEW
          ==================================================== */}
          <div className="min-w-0 xl:sticky xl:top-5">

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-[#0B1728]">

              {/* Preview Header */}
              <div className="relative overflow-hidden bg-[#001A36] p-5 sm:p-6">
                <div className="absolute -right-10 -top-16 h-40 w-40 rounded-full bg-blue-500/15 blur-2xl" />

                <div className="relative flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-blue-300 ring-1 ring-white/10">
                      <FileSignature size={21} />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="truncate text-base font-bold text-white">
                          Agency Agreement
                        </h2>

                        <span className="hidden rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold uppercase text-emerald-300 sm:inline-flex">
                          Live
                        </span>
                      </div>

                      <p className="mt-0.5 text-xs text-slate-400">
                        Real-time document preview
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handlePrint}
                    disabled={isCreating}
                    title="Create and sign"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isCreating ? (
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                    ) : (
                      <Printer size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Preview Tabs */}
              <div className="flex overflow-x-auto border-b border-slate-100 bg-slate-50/70 p-1.5 dark:border-slate-800 dark:bg-slate-900/50">
                {[
                  {
                    id: "vehicle",
                    label: "Vehicle",
                    icon: <CarFront size={14} />,
                  },
                  {
                    id: "customer",
                    label: "Customer",
                    icon: <UserRound size={14} />,
                  },
                  {
                    id: "agency",
                    label: "Agency",
                    icon: <Building2 size={14} />,
                  },
                  {
                    id: "notes",
                    label: "Notes",
                    icon: <Info size={14} />,
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() =>
                      setActivePreviewSection(tab.id)
                    }
                    className={`flex min-w-max flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                      activePreviewSection === tab.id
                        ? "bg-white text-[#012F7A] shadow-sm dark:bg-[#0B1728] dark:text-blue-300"
                        : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Preview Body */}
              <div className="p-4 sm:p-6">

                {/* Vehicle Preview */}
                {activePreviewSection === "vehicle" && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-blue-500">
                          Vehicle Details
                        </p>

                        <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                          Vehicle Information
                        </h3>
                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                        <CarFront size={19} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {previewValue(
                        "Registration Number",
                        vehicleData?.registrationData
                          ?.registrationNumber ||
                          form.registrationNumber,
                        <CarFront size={12} />
                      )}

                      {previewValue(
                        "Vehicle Model",
                        vehicleModel,
                        <CarFront size={12} />
                      )}

                      {previewValue(
                        "Color",
                        vehicleData?.detail?.color,
                        <Info size={12} />
                      )}

                      {previewValue(
                        "Chassis Number",
                        vehicleData?.detail?.chassisNumber,
                        <ClipboardList size={12} />
                      )}

                      {previewValue(
                        "Vehicle Year",
                        vehicleData?.detail?.vehicleYear,
                        <Info size={12} />
                      )}

                      {previewValue(
                        "Gearbox",
                        vehicleData?.technicalData
                          ?.gearbox,
                        <CarFront size={12} />
                      )}

                      {previewValue(
                        "Fuel Type",
                        vehicleData?.technicalData?.fuelCodes?.join(
                          ", "
                        ),
                        <CarFront size={12} />
                      )}

                      {previewValue(
                        "Agreement Date",
                        form.purchaseDate,
                        <Info size={12} />
                      )}
                    </div>

                    <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-slate-50 p-4 dark:border-blue-900/40 dark:from-blue-950/30 dark:to-slate-900">
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
                          <CarFront size={17} />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                            Selected Vehicle
                          </p>

                          <p className="mt-1 break-words text-sm font-bold text-slate-900 dark:text-white">
                            {vehicleModel}
                          </p>

                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            {form.registrationNumber ||
                              "No registration number entered"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Customer Preview */}
                {activePreviewSection === "customer" && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-blue-500">
                          Customer Details
                        </p>

                        <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                          Customer Information
                        </h3>
                      </div>

                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                          form.customerType === "company"
                            ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                            : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
                        }`}
                      >
                        {form.customerType === "company" ? (
                          <Building2 size={19} />
                        ) : (
                          <UserRound size={19} />
                        )}
                      </div>
                    </div>

                    {!form.customerType ? (
                      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-7 text-center dark:border-slate-700 dark:bg-slate-900/40">
                        <UserRound
                          size={28}
                          className="mx-auto text-slate-400"
                        />

                        <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                          No customer selected
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Select a customer type and search for
                          the customer.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="rounded-xl bg-gradient-to-r from-[#001A36] to-[#012F7A] p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                              {form.customerType ===
                              "company" ? (
                                <Building2 size={20} />
                              ) : (
                                <UserRound size={20} />
                              )}
                            </div>

                            <div className="min-w-0">
                              <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-200">
                                {form.customerType ===
                                "company"
                                  ? "Company"
                                  : "Private Individual"}
                              </p>

                              <p className="mt-0.5 truncate text-sm font-bold text-white">
                                {customerName}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {previewValue(
                            "Customer Type",
                            form.customerType ===
                              "company"
                              ? "Company"
                              : "Private Individual",
                            <UserRound size={12} />
                          )}

                          {previewValue(
                            form.customerType ===
                              "company"
                              ? "Organization Number"
                              : "Personal Number",
                            form.customerType ===
                              "company"
                              ? orgData?.legalId
                              : personData?.legalId,
                            <ClipboardList size={12} />
                          )}

                          {previewValue(
                            "Name",
                            customerName,
                            <UserRound size={12} />
                          )}

                          {previewValue(
                            "Address",
                            customerAddress,
                            <MapPin size={12} />
                          )}

                          {previewValue(
                            "Phone",
                            orgData?.phones?.[0]
                              ?.number ||
                              form.phone,
                            <Phone size={12} />
                          )}

                          {previewValue(
                            "Email",
                            form.email,
                            <Mail size={12} />
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Agency Preview */}
                {activePreviewSection === "agency" && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-blue-500">
                          Financial Details
                        </p>

                        <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                          Agency Information
                        </h3>
                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                        <WalletCards size={19} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {previewValue(
                        "Sales Price",
                        form.salesPriceSEK,
                        <WalletCards size={12} />
                      )}

                      {previewValue(
                        "Commission Rate",
                        form.commissionRate,
                        <Info size={12} />
                      )}

                      {previewValue(
                        "Commission Amount",
                        form.commissionAmount,
                        <WalletCards size={12} />
                      )}

                      {previewValue(
                        "Agency Fee",
                        form.agencyFee,
                        <WalletCards size={12} />
                      )}

                      {previewValue(
                        "Payment Method",
                        form.paymentMethod,
                        <CreditCard size={12} />
                      )}

                      {previewValue(
                        "VAT Type",
                        form.vatType,
                        <Info size={12} />
                      )}

                      {previewValue(
                        "Bank",
                        form.bank,
                        <Building2 size={12} />
                      )}

                      {previewValue(
                        "Account Number",
                        form.accountNumber,
                        <CreditCard size={12} />
                      )}

                      {previewValue(
                        "Credit Marking",
                        form.creditMarking,
                        <Info size={12} />
                      )}

                      {previewValue(
                        "Creditor",
                        form.creditorName,
                        <Building2 size={12} />
                      )}

                      {previewValue(
                        "Credit Amount",
                        form.creditAmount,
                        <CreditCard size={12} />
                      )}

                      {previewValue(
                        "Settlement Date",
                        form.settlementDate,
                        <Info size={12} />
                      )}
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
                      <div className="mb-2 flex items-center gap-2">
                        <ClipboardList
                          size={15}
                          className="text-blue-500"
                        />

                        <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                          Vehicle Specification
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {previewValue(
                          "Mileage",
                          form.mileage,
                          <CarFront size={12} />
                        )}

                        {previewValue(
                          "Keys",
                          form.numberOfKeys,
                          <CarFront size={12} />
                        )}

                        {previewValue(
                          "Tires",
                          form.tires || form.deck,
                          <CarFront size={12} />
                        )}

                        {previewValue(
                          "Latest Service",
                          form.latestService,
                          <Info size={12} />
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Notes Preview */}
                {activePreviewSection === "notes" && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-blue-500">
                          Additional Information
                        </p>

                        <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                          Agreement Notes
                        </h3>
                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                        <Info size={19} />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/50">
                      <div className="mb-3 flex items-center gap-2">
                        <ClipboardList
                          size={16}
                          className="text-blue-500"
                        />

                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Notes
                        </span>
                      </div>

                      <p className="min-h-[130px] whitespace-pre-wrap break-words text-sm leading-6 text-slate-700 dark:text-slate-300">
                        {form.notes ||
                          "No notes have been added to this agreement yet."}
                      </p>
                    </div>

                    <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-950/20">
                      <div className="flex gap-3">
                        <Info
                          size={17}
                          className="mt-0.5 shrink-0 text-blue-500"
                        />

                        <p className="text-xs leading-5 text-blue-700 dark:text-blue-300">
                          The information shown here updates
                          automatically as you complete the agreement
                          form.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Preview Footer */}
              <div className="border-t border-slate-100 bg-slate-50/70 px-4 py-4 dark:border-slate-800 dark:bg-slate-900/40 sm:px-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.10)]" />

                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Live preview enabled
                    </span>
                  </div>

                  <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    DealerPro
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            SUCCESS NOTICE
        ====================================================== */}
        {createdAgreementData && (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/20">
            <CheckCircle2
              size={20}
              className="mt-0.5 shrink-0 text-emerald-500"
            />

            <div>
              <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                Agreement created successfully
              </p>

              <p className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-400/80">
                Your agency agreement has been created and is
                available in the Agreements section.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddNewAgencyAgreement;
