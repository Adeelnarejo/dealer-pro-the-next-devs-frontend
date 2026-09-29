import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleUserRound,
  FileText,
  Mail,
  MapPin,
  Phone,
  Plus,
  Printer,
  Receipt,
  Search,
  Trash2,
  UserRound,
  Wallet,
} from "lucide-react";

import { makeGetRequest, makePostRequest } from "../../api/Api";
import { BACKEND_API_ENDPOINT } from "../../api/config";

interface ProductLine {
  productName: string;
  quantity: number;
  unit: string;
  price: number;
  vatRate: number;
  description: string;
  lineTotal?: number;
}

const defaultProductLine = (): ProductLine => ({
  productName: "",
  quantity: 1,
  unit: "hr",
  price: 0,
  vatRate: 25,
  description: "",
  lineTotal: 0,
});

interface InvoiceForm {
  invoiceNumber: string;
  customerType: string;
  invoiceDate: string;
  dueDate: string;
  inReference: string;
  ourReference: string;
  email: string;
  telephone: string;
  customerName: string;
  orgNumber: string;
  socialSecurityNumber: string;
  currency: string;
  language: string;

  address: string;
  postalCode: string;
  city: string;
  country: string;
  birthDate: string;
  gender: string;
  vatNumber: string;
}

interface PersonName {
  country: string;
  names: string[];
  lastName: string;
  givenName: string;
}

interface Address {
  _type: string;
  kind: string;
  country: string;
  street: string;
  number?: string;
  numberSuffix?: string;
  flat?: string;
  zip: string;
  city: string;
  county?: string;
  municipality?: string;
  id?: string;
}

interface OrgName {
  name: string;
  rawName: string;
}

interface Phone {
  _type: string;
  number: string;
  areaCode: string;
  kind: string;
  registeredSince: string;
}

interface SearchResponse {
  success: boolean;
  type: "PERSON" | "ORG";
  keyword: string;
  count: number;
  data: PersonData[] | OrgData[];
}

interface PersonData {
  _type: "SE_PERSON";
  id: string;
  country: string;
  legalId: string;
  birthDate: string;
  gender: string;
  name: PersonName;
  addresses: Address[];
  addressHistory: {
    addresses: Array<{
      address: Address;
      actualTo: string;
    }>;
    officialAddressChangeCount: number;
    foreignAddressChangeCount: number;
  };
  phones: Phone[];
  registrationStatus: string;
}

interface OrgData {
  _type: "SE_ORG";
  id: string;
  country: string;
  legalId: string;
  addresses: Address[];
  phones: Phone[];
  orgName: OrgName;
  lifecycle: {
    status: {
      value: string;
    };
    establishedInYear: number;
    establishedOn: string;
  };
  taxInfo: {
    vatNumber: string;
    fskattPayer: boolean;
    vatPayer: boolean;
    employer: boolean;
  };
}

interface CompanyData {
  [key: string]: any;
}

const getToday = () => new Date().toISOString().split("T")[0];

const getDueDate = () =>
  new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

const AddReceipt = () => {
  const navigate = useNavigate();
  const receiptRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<InvoiceForm>({
    invoiceNumber: "",
    customerType: "Business",
    invoiceDate: getToday(),
    dueDate: getDueDate(),
    inReference: "",
    ourReference: "",
    email: "",
    telephone: "",
    customerName: "",
    orgNumber: "",
    socialSecurityNumber: "",
    currency: "SEK",
    language: "English",

    address: "",
    postalCode: "",
    city: "",
    country: "",
    birthDate: "",
    gender: "",
    vatNumber: "",
  });

  const [orgOrSsn, setOrgOrSsn] = useState("");
  const [error, setError] = useState<Record<string, string>>({});
  const [searchError, setSearchError] = useState("");
  const [searchResult, setSearchResult] =
    useState<SearchResponse | null>(null);

  const [company, setCompany] = useState<CompanyData | null>(null);
  const [companyLoading, setCompanyLoading] = useState(true);

  const [productLines, setProductLines] = useState<ProductLine[]>([
    defaultProductLine(),
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showPrintView, setShowPrintView] = useState(false);

  /*
   * Keep the receipt number stable during the entire page session.
   * The previous implementation generated a new number on every render.
   */
  const [receiptNumber] = useState(() => generateReceiptNumber());

  function generateReceiptNumber() {
    const date = new Date();
    const randomNum = Math.floor(Math.random() * 1000);

    return `RCP-${date.getFullYear()}${String(
      date.getMonth() + 1
    ).padStart(2, "0")}${String(randomNum).padStart(3, "0")}`;
  }

  const net = useMemo(
    () =>
      productLines.reduce(
        (sum, line) =>
          sum +
          (Number(line.price) || 0) * (Number(line.quantity) || 0),
        0
      ),
    [productLines]
  );

  const moms = useMemo(
    () =>
      productLines.reduce(
        (sum, line) =>
          sum +
          ((Number(line.price) || 0) *
            (Number(line.quantity) || 0) *
            (Number(line.vatRate) || 0)) /
            100,
        0
      ),
    [productLines]
  );

  const total = useMemo(() => net + moms, [net, moms]);

  const formatMoney = (value: number) =>
    `${value.toFixed(2)} ${form.currency}`;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.customerName.trim()) {
      newErrors.customerName = "Customer name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.telephone.trim()) {
      newErrors.telephone = "Telephone number is required";
    }

    if (!form.invoiceDate) {
      newErrors.invoiceDate = "Receipt date is required";
    }

    if (!form.dueDate) {
      newErrors.dueDate = "Due date is required";
    }

    const hasValidProduct = productLines.some(
      (line) =>
        line.productName.trim() &&
        Number(line.price) > 0 &&
        Number(line.quantity) > 0
    );

    if (!hasValidProduct) {
      newErrors.productLines =
        "At least one valid product/service is required";
    }

    setError(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error[name]) {
      setError((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSearch = async (
    type: "ORG" | "PERSON",
    query: string
  ) => {
    setIsSearching(true);
    setSearchError("");
    setSearchResult(null);

    try {
      /*
       * Do NOT put the external API bearer token directly in this file.
       *
       * Recommended .env:
       * VITE_EXTERNAL_API_TOKEN=your_token_here
       *
       * As a fallback, localStorage can be used while developing.
       */
      const externalToken =
        import.meta.env.VITE_EXTERNAL_API_TOKEN ||
        localStorage.getItem("externalApiToken") ||
        "";

      if (!externalToken) {
        throw new Error(
          "External API token is missing. Add VITE_EXTERNAL_API_TOKEN to your .env file."
        );
      }

      const response = await fetch(
        `${BACKEND_API_ENDPOINT}agreements/external/agreements`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${externalToken}`,
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

      const data: SearchResponse = await response.json();

      setSearchResult(data);

      if (data.success && data.count > 0) {
        const result = data.data[0];

        if (type === "PERSON") {
          const personData = result as PersonData;
          const primaryAddress = personData.addresses?.[0];
          const primaryPhone = personData.phones?.[0];

          const address = primaryAddress
            ? `${primaryAddress.street || ""} ${
                primaryAddress.number || ""
              }${
                primaryAddress.numberSuffix
                  ? primaryAddress.numberSuffix
                  : ""
              }, ${primaryAddress.zip || ""} ${
                primaryAddress.city || ""
              }`
            : "";

          setForm((prev) => ({
            ...prev,
            customerName: `${personData.name.givenName || ""} ${
              personData.name.lastName || ""
            }`.trim(),
            address,
            postalCode: primaryAddress?.zip || "",
            city: primaryAddress?.city || "",
            country: primaryAddress?.country || personData.country || "",
            birthDate: personData.birthDate || "",
            gender: personData.gender || "",
            socialSecurityNumber: personData.legalId || prev.socialSecurityNumber,
            telephone: primaryPhone?.number || prev.telephone,
          }));
        } else {
          const orgData = result as OrgData;

          const primaryAddress =
            orgData.addresses?.find(
              (address) => address.kind === "VISIT"
            ) || orgData.addresses?.[0];

          const primaryPhone =
            orgData.phones?.find(
              (phone) => phone.kind === "OFFICIAL"
            ) || orgData.phones?.[0];

          const address = primaryAddress
            ? `${primaryAddress.street || ""} ${
                primaryAddress.number || ""
              }, ${primaryAddress.zip || ""} ${
                primaryAddress.city || ""
              }`
            : "";

          setForm((prev) => ({
            ...prev,
            customerName: orgData.orgName?.name || "",
            address,
            postalCode: primaryAddress?.zip || "",
            city: primaryAddress?.city || "",
            country:
              primaryAddress?.country || orgData.country || "",
            telephone: primaryPhone?.number || prev.telephone,
            orgNumber: orgData.legalId || "",
            vatNumber: orgData.taxInfo?.vatNumber || "",
          }));
        }

        toast.success("Customer information found");
      } else {
        setSearchError(
          `No results found for ${
            type === "ORG" ? "organization" : "individual"
          }`
        );
      }
    } catch (err) {
      console.error(`Error searching ${type}:`, err);

      const message =
        err instanceof Error
          ? err.message
          : `Failed to search ${
              type === "ORG" ? "organization" : "individual"
            }`;

      setSearchError(message);
    } finally {
      setIsSearching(false);
    }
  };

  const handleOrgOrPersonSearch = () => {
    const value = orgOrSsn.trim();

    if (!value) {
      setSearchError(
        form.customerType === "Business"
          ? "Organization number is required"
          : "Social Security number is required"
      );
      return;
    }

    setSearchError("");

    if (form.customerType === "Business") {
      setForm((prev) => ({
        ...prev,
        orgNumber: value,
      }));

      handleSearch("ORG", value);
    } else {
      setForm((prev) => ({
        ...prev,
        socialSecurityNumber: value,
      }));

      handleSearch("PERSON", value);
    }
  };

  const handleProductLineChange = (
    idx: number,
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;

    let value: string | number = e.target.value;

    if (e.target instanceof HTMLInputElement && e.target.type === "number") {
      value = e.target.value === "" ? 0 : parseFloat(e.target.value);
    }

    setProductLines((prev) => {
      const newLines = [...prev];

      const updatedLine = {
        ...newLines[idx],
        [name]: value,
      };

      const price = Number(updatedLine.price) || 0;
      const quantity = Number(updatedLine.quantity) || 0;
      const vat = Number(updatedLine.vatRate) || 0;

      updatedLine.lineTotal =
        price * quantity * (1 + vat / 100);

      newLines[idx] = updatedLine;

      return newLines;
    });

    if (error.productLines) {
      setError((prev) => {
        const updated = { ...prev };
        delete updated.productLines;
        return updated;
      });
    }
  };

  const addProductLine = () => {
    setProductLines((prev) => [
      ...prev,
      defaultProductLine(),
    ]);
  };

  const removeProductLine = (idx: number) => {
    if (productLines.length <= 1) return;

    setProductLines((prev) =>
      prev.filter((_, index) => index !== idx)
    );
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);
    setError({});

    try {
      const invoiceData = {
        ...form,

        invoiceNumber: receiptNumber,

        telephoneNumber: form.telephone,

        items: productLines.map((line) => ({
          productName: line.productName,
          quantity: line.quantity,
          unit: line.unit,
          price: Number(line.price),
          vatRate: Number(line.vatRate),
          description: line.description,
          lineTotal:
            Number(line.price) *
            Number(line.quantity) *
            (1 + Number(line.vatRate) / 100),
        })),

        net,
        moms,
        amount: total,
        status: "Pending",
        currency: form.currency,
        language: form.language,
      };

      const response = await makePostRequest(
        "invoices/create",
        invoiceData
      );

      if (response.data && response.data.success) {
        toast.success("Receipt created successfully");
        navigate(-1);
      } else {
        toast.error(
          response.data?.message || "Failed to create receipt"
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while creating the receipt");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await makeGetRequest(
          "companyDetail/getCompanyDetailByUser"
        );

        setCompany(response.data?.data || null);
      } catch (err) {
        console.error("Error fetching company:", err);
      } finally {
        setCompanyLoading(false);
      }
    };

    fetchCompany();
  }, []);

  useEffect(() => {
    if (!showPrintView) return;

    const timer = window.setTimeout(() => {
      window.print();
      setShowPrintView(false);
    }, 350);

    return () => window.clearTimeout(timer);
  }, [showPrintView]);

  const handlePrint = () => {
    setShowPrintView(true);
  };

  const customerTypeIcon =
    form.customerType === "Business" ? (
      <Building2 size={18} />
    ) : (
      <UserRound size={18} />
    );

  /*
   * PRINT VIEW
   */
  if (showPrintView) {
    return (
      <div className="printable-area min-h-screen bg-white p-4 font-plus-jakarta text-slate-900 sm:p-8">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-8 flex items-start justify-between gap-6 border-b border-slate-200 pb-6">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#002147] text-white">
                  <Receipt size={20} />
                </div>

                <span className="text-xl font-extrabold tracking-tight text-[#002147]">
                  DealerPro
                </span>
              </div>

              <h1 className="text-2xl font-bold">
                Receipt
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Receipt #{receiptNumber}
              </p>
            </div>

            {company?.attachments ? (
              <img
                src={company.attachments}
                alt="Company"
                className="h-24 w-24 rounded-xl object-cover"
              />
            ) : null}
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-4">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
                Customer
              </h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">
                    Name
                  </span>
                  <span className="text-right font-semibold">
                    {form.customerName || "-"}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">
                    Type
                  </span>
                  <span className="font-semibold">
                    {form.customerType}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">
                    Email
                  </span>
                  <span className="break-all text-right font-semibold">
                    {form.email || "-"}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">
                    Phone
                  </span>
                  <span className="font-semibold">
                    {form.telephone || "-"}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">
                    Address
                  </span>
                  <span className="max-w-[60%] text-right font-semibold">
                    {form.address || "-"}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
                Receipt Information
              </h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">
                    Receipt Number
                  </span>
                  <span className="font-semibold">
                    {receiptNumber}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">
                    Receipt Date
                  </span>
                  <span className="font-semibold">
                    {form.invoiceDate}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">
                    Due Date
                  </span>
                  <span className="font-semibold">
                    {form.dueDate}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">
                    Currency
                  </span>
                  <span className="font-semibold">
                    {form.currency}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">
                    Reference
                  </span>
                  <span className="font-semibold">
                    {form.inReference || "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 overflow-hidden rounded-xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-sm">
                <thead>
                  <tr className="bg-[#002147] text-white">
                    <th className="px-4 py-3 text-left">
                      Product / Service
                    </th>
                    <th className="px-4 py-3 text-right">
                      Qty
                    </th>
                    <th className="px-4 py-3 text-right">
                      Price
                    </th>
                    <th className="px-4 py-3 text-right">
                      VAT
                    </th>
                    <th className="px-4 py-3 text-right">
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {productLines.map((line, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="px-4 py-3">
                        <div className="font-semibold">
                          {line.productName || "-"}
                        </div>

                        {line.description ? (
                          <div className="mt-1 text-xs text-slate-500">
                            {line.description}
                          </div>
                        ) : null}
                      </td>

                      <td className="px-4 py-3 text-right">
                        {line.quantity}
                      </td>

                      <td className="px-4 py-3 text-right">
                        {Number(line.price).toFixed(2)}
                      </td>

                      <td className="px-4 py-3 text-right">
                        {line.vatRate}%
                      </td>

                      <td className="px-4 py-3 text-right font-semibold">
                        {Number(line.lineTotal || 0).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="ml-auto w-full max-w-sm space-y-2">
            <div className="flex justify-between border-b border-slate-100 py-2">
              <span className="text-slate-500">
                Subtotal
              </span>

              <span className="font-semibold">
                {formatMoney(net)}
              </span>
            </div>

            <div className="flex justify-between border-b border-slate-100 py-2">
              <span className="text-slate-500">
                VAT
              </span>

              <span className="font-semibold">
                {formatMoney(moms)}
              </span>
            </div>

            <div className="flex justify-between rounded-xl bg-[#002147] px-4 py-4 text-white">
              <span className="font-bold">
                Amount Due
              </span>

              <span className="text-lg font-extrabold">
                {formatMoney(total)}
              </span>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-200 pt-5 text-xs text-slate-500">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="font-bold text-slate-700">
                  {company?.company_name || "DealerPro"}
                </p>

                <p>
                  {company?.visiting_address ||
                    company?.mailingAddress ||
                    "-"}
                </p>

                <p>
                  {company?.postalCode || "-"}{" "}
                  {company?.city || "-"}
                </p>

                <p>
                  {company?.phoneNumber || "-"}
                </p>
              </div>

              <div className="sm:text-right">
                <p>
                  Registration No:{" "}
                  {company?.registrationNumber || "-"}
                </p>

                <p>
                  VAT: {company?.vatNumber || "-"}
                </p>

                <p>
                  Bank:{" "}
                  {company?.bankAccountNumber || "-"}
                </p>

                <p>
                  IBAN/BIC:{" "}
                  {company?.iban_Bic || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /*
   * NORMAL UI
   */
  return (
    <div className="min-h-screen w-full bg-[#F5F7FA] px-3 py-4 font-plus-jakarta transition-colors duration-300 dark:bg-[#07111F] sm:px-5 sm:py-5 lg:px-7 lg:py-7">
      <div className="mx-auto w-full max-w-[1700px]">
        {/* PAGE HEADER */}
        <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#002147] dark:border-slate-800 dark:bg-[#0B1728] dark:text-slate-300 dark:hover:bg-[#10253D] dark:hover:text-white"
              aria-label="Go back"
            >
              <ArrowLeft size={19} />
            </button>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                DealerPro
              </p>

              <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
                Create Receipt
              </h1>

              <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
                Create and review a professional customer receipt.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#002147] to-[#0759A8] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/10 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-7"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Saving...
              </>
            ) : (
              <>
                <CheckCircle2 size={17} />
                Save Receipt
              </>
            )}
          </button>
        </div>

        {/* ERRORS */}
        {Object.keys(error).length > 0 && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-500/20 dark:bg-red-500/10">
            <div className="mb-2 font-bold text-red-700 dark:text-red-300">
              Please fix the following:
            </div>

            <div className="space-y-1 text-sm text-red-600 dark:text-red-300">
              {Object.values(error).map((err, index) => (
                <p key={index}>• {err}</p>
              ))}
            </div>
          </div>
        )}

        {/* MAIN GRID */}
        <div className="grid w-full grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] xl:gap-6">
          {/* LEFT SIDE */}
          <div className="flex min-w-0 flex-col gap-5">
            {/* CUSTOMER INFORMATION */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0B1728]">
              <div className="border-b border-slate-100 px-4 py-4 dark:border-slate-800 sm:px-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#002147] dark:bg-blue-500/10 dark:text-blue-300">
                    {customerTypeIcon}
                  </div>

                  <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">
                      Customer Information
                    </h2>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Add customer details and search existing records.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* CUSTOMER TYPE */}
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Customer Type
                    </label>

                    <div className="relative">
                      <select
                        name="customerType"
                        value={form.customerType}
                        onChange={(e) => {
                          handleFormChange(e);
                          setOrgOrSsn("");
                          setSearchError("");
                          setSearchResult(null);
                        }}
                        className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-3 pr-10 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0E1C2D] dark:text-white"
                      >
                        <option value="Business">
                          Business
                        </option>

                        <option value="Individual">
                          Individual
                        </option>
                      </select>

                      <ChevronDown
                        size={17}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                    </div>
                  </div>

                  {/* SEARCH FIELD */}
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      {form.customerType === "Business"
                        ? "Organization Number"
                        : "Social Security Number"}
                    </label>

                    <div className="flex flex-col gap-2 sm:flex-row">
                      <input
                        type="text"
                        value={orgOrSsn}
                        onChange={(e) => {
                          setOrgOrSsn(e.target.value);
                          setSearchError("");
                        }}
                        placeholder={
                          form.customerType === "Business"
                            ? "Enter organization number"
                            : "Enter social security number"
                        }
                        className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0E1C2D] dark:text-white dark:placeholder:text-slate-500"
                      />

                      <button
                        type="button"
                        onClick={handleOrgOrPersonSearch}
                        disabled={isSearching}
                        className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#002147] to-[#0759A8] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSearching ? (
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        ) : (
                          <Search size={16} />
                        )}

                        {isSearching ? "Searching..." : "Search"}
                      </button>
                    </div>
                  </div>

                  {/* SEARCH RESULT */}
                  {searchResult?.success && searchResult.count > 0 && (
                    <div className="sm:col-span-2">
                      <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                        <CheckCircle2 size={17} />

                        <span>
                          Customer information loaded successfully.
                        </span>
                      </div>
                    </div>
                  )}

                  {/* SEARCH ERROR */}
                  {searchError && (
                    <div className="sm:col-span-2">
                      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
                        {searchError}
                      </div>
                    </div>
                  )}

                  {/* CUSTOMER NAME */}
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Customer Name
                    </label>

                    <div className="relative">
                      <UserRound
                        size={17}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="text"
                        name="customerName"
                        value={form.customerName}
                        onChange={handleFormChange}
                        placeholder="Enter customer name..."
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0E1C2D] dark:text-white dark:placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  {/* ADDRESS */}
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Address
                    </label>

                    <div className="relative">
                      <MapPin
                        size={17}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleFormChange}
                        placeholder="Customer address..."
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0E1C2D] dark:text-white dark:placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Email Address
                    </label>

                    <div className="relative">
                      <Mail
                        size={17}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleFormChange}
                        placeholder="customer@email.com"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0E1C2D] dark:text-white dark:placeholder:text-slate-500"
                      />
                    </div>

                    {error.email && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {error.email}
                      </p>
                    )}
                  </div>

                  {/* PHONE */}
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Phone Number
                    </label>

                    <div className="relative">
                      <Phone
                        size={17}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="tel"
                        name="telephone"
                        value={form.telephone}
                        onChange={handleFormChange}
                        placeholder="Enter phone number..."
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0E1C2D] dark:text-white dark:placeholder:text-slate-500"
                      />
                    </div>

                    {error.telephone && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {error.telephone}
                      </p>
                    )}
                  </div>

                  {/* DATE */}
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Receipt Date
                    </label>

                    <div className="relative">
                      <CalendarDays
                        size={17}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="date"
                        name="invoiceDate"
                        value={form.invoiceDate}
                        onChange={handleFormChange}
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0E1C2D] dark:text-white"
                      />
                    </div>
                  </div>

                  {/* DUE DATE */}
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Due Date
                    </label>

                    <div className="relative">
                      <CalendarDays
                        size={17}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="date"
                        name="dueDate"
                        value={form.dueDate}
                        onChange={handleFormChange}
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0E1C2D] dark:text-white"
                      />
                    </div>
                  </div>

                  {/* CLIENT REFERENCE */}
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Client Reference
                    </label>

                    <input
                      type="text"
                      name="inReference"
                      value={form.inReference}
                      onChange={handleFormChange}
                      placeholder="Client reference..."
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0E1C2D] dark:text-white dark:placeholder:text-slate-500"
                    />
                  </div>

                  {/* OUR REFERENCE */}
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Our Reference
                    </label>

                    <input
                      type="text"
                      name="ourReference"
                      value={form.ourReference}
                      onChange={handleFormChange}
                      placeholder="Our reference..."
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0E1C2D] dark:text-white dark:placeholder:text-slate-500"
                    />
                  </div>

                  {/* ORG / SSN */}
                  {form.customerType === "Business" ? (
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Organization Number
                      </label>

                      <input
                        type="text"
                        name="orgNumber"
                        value={form.orgNumber}
                        onChange={handleFormChange}
                        placeholder="Organization number..."
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0E1C2D] dark:text-white dark:placeholder:text-slate-500"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Social Security Number
                      </label>

                      <input
                        type="text"
                        name="socialSecurityNumber"
                        value={form.socialSecurityNumber}
                        onChange={handleFormChange}
                        placeholder="Social security number..."
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0E1C2D] dark:text-white dark:placeholder:text-slate-500"
                      />
                    </div>
                  )}

                  {/* CURRENCY */}
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Currency
                    </label>

                    <select
                      name="currency"
                      value={form.currency}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0E1C2D] dark:text-white"
                    >
                      <option value="SEK">SEK</option>
                      <option value="EUR">EUR</option>
                      <option value="USD">USD</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* PRODUCTS */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0B1728]">
              <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#002147] dark:bg-blue-500/10 dark:text-blue-300">
                    <Wallet size={18} />
                  </div>

                  <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">
                      Receipt Items
                    </h2>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Add products or services and calculate VAT.
                    </p>
                  </div>
                </div>

                <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500 dark:bg-[#101F33] dark:text-slate-300">
                  {productLines.length}{" "}
                  {productLines.length === 1 ? "item" : "items"}
                </span>
              </div>

              <div className="p-4 sm:p-5">
                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                  <table className="min-w-[760px] w-full text-sm">
                    <thead>
                      <tr className="bg-[#F4F7FB] dark:bg-[#102139]">
                        <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                          Product / Service
                        </th>

                        <th className="w-24 px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                          Qty
                        </th>

                        <th className="w-32 px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                          Price
                        </th>

                        <th className="w-28 px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                          VAT
                        </th>

                        <th className="w-32 px-3 py-3 text-right text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                          Amount
                        </th>

                        <th className="w-16 px-3 py-3 text-center text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {productLines.map((line, idx) => (
                        <tr
                          key={idx}
                          className="border-t border-slate-100 dark:border-slate-800"
                        >
                          <td className="p-2">
                            <input
                              type="text"
                              name="productName"
                              value={line.productName}
                              onChange={(e) =>
                                handleProductLineChange(idx, e)
                              }
                              placeholder="Product / service..."
                              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#101F33] dark:text-white dark:placeholder:text-slate-500"
                            />

                            <input
                              type="text"
                              name="description"
                              value={line.description}
                              onChange={(e) =>
                                handleProductLineChange(idx, e)
                              }
                              placeholder="Optional description..."
                              className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#101F33] dark:text-white dark:placeholder:text-slate-500"
                            />
                          </td>

                          <td className="p-2">
                            <input
                              type="number"
                              name="quantity"
                              value={line.quantity}
                              onChange={(e) =>
                                handleProductLineChange(idx, e)
                              }
                              min="0"
                              step="1"
                              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#101F33] dark:text-white"
                            />
                          </td>

                          <td className="p-2">
                            <input
                              type="number"
                              name="price"
                              value={line.price}
                              onChange={(e) =>
                                handleProductLineChange(idx, e)
                              }
                              min="0"
                              step="0.01"
                              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#101F33] dark:text-white"
                            />
                          </td>

                          <td className="p-2">
                            <select
                              name="vatRate"
                              value={line.vatRate}
                              onChange={(e) =>
                                handleProductLineChange(idx, e)
                              }
                              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#101F33] dark:text-white"
                            >
                              <option value="25">25%</option>
                              <option value="12">12%</option>
                              <option value="6">6%</option>
                              <option value="0">0%</option>
                            </select>
                          </td>

                          <td className="p-3 text-right font-bold text-slate-800 dark:text-white">
                            {Number(
                              line.lineTotal || 0
                            ).toFixed(2)}
                          </td>

                          <td className="p-2 text-center">
                            <button
                              type="button"
                              onClick={() =>
                                removeProductLine(idx)
                              }
                              disabled={productLines.length <= 1}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-30 dark:hover:bg-red-500/10"
                              aria-label="Remove product"
                            >
                              <Trash2 size={17} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {error.productLines && (
                  <p className="mt-3 text-xs font-medium text-red-500">
                    {error.productLines}
                  </p>
                )}

                <button
                  type="button"
                  onClick={addProductLine}
                  className="mt-4 flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-bold text-[#002147] transition hover:bg-blue-100 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300 dark:hover:bg-blue-500/20"
                >
                  <Plus size={16} />
                  Add Product Line
                </button>

                {/* TOTALS */}
                <div className="mt-6 ml-auto w-full max-w-md">
                  <div className="flex justify-between border-b border-slate-100 px-2 py-3 dark:border-slate-800">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Subtotal
                    </span>

                    <span className="text-sm font-semibold text-slate-800 dark:text-white">
                      {formatMoney(net)}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-slate-100 px-2 py-3 dark:border-slate-800">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      VAT
                    </span>

                    <span className="text-sm font-semibold text-slate-800 dark:text-white">
                      {formatMoney(moms)}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between rounded-xl bg-gradient-to-r from-[#002147] to-[#0759A8] px-4 py-4 text-white">
                    <span className="font-bold">
                      Total Amount
                    </span>

                    <span className="text-lg font-extrabold">
                      {formatMoney(total)}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT SIDE — LIVE PREVIEW */}
          <section
            ref={receiptRef}
            className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0B1728]"
          >
            {/* PREVIEW HEADER */}
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 dark:border-slate-800 sm:px-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#002147] dark:bg-blue-500/10 dark:text-blue-300">
                  <FileText size={18} />
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    Receipt Preview
                  </h2>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Live preview
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePrint}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#002147] transition hover:bg-blue-50 dark:border-slate-700 dark:bg-[#101F33] dark:text-blue-300 dark:hover:bg-blue-500/10"
                aria-label="Print receipt"
              >
                <Printer size={17} />
              </button>
            </div>

            {/* RECEIPT PAPER */}
            <div className="p-4 sm:p-5 lg:p-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-[#0D1929] sm:p-6">
                {/* RECEIPT TOP */}
                <div className="mb-6 flex flex-col gap-4 border-b border-slate-100 pb-5 dark:border-slate-800 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#002147] text-white">
                        <Receipt size={17} />
                      </div>

                      <span className="font-extrabold tracking-tight text-[#002147] dark:text-white">
                        DealerPro
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                      Receipt
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      #{receiptNumber}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Receipt Date
                    </div>

                    <div className="mt-1 text-sm font-bold text-slate-800 dark:text-white">
                      {form.invoiceDate || "N/A"}
                    </div>
                  </div>
                </div>

                {/* CUSTOMER */}
                <div className="mb-6">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Customer
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <PreviewItem
                      label="Customer Name"
                      value={form.customerName}
                    />

                    <PreviewItem
                      label="Customer Type"
                      value={form.customerType}
                    />

                    <PreviewItem
                      label="Organization No."
                      value={
                        form.orgNumber ||
                        form.socialSecurityNumber
                      }
                    />

                    <PreviewItem
                      label="Email"
                      value={form.email}
                    />

                    <PreviewItem
                      label="Phone"
                      value={form.telephone}
                    />

                    <PreviewItem
                      label="Address"
                      value={form.address}
                    />

                    <PreviewItem
                      label="Postal Code"
                      value={form.postalCode}
                    />

                    <PreviewItem
                      label="City"
                      value={form.city}
                    />
                  </div>
                </div>

                {/* INFORMATION */}
                <div className="mb-6">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Receipt Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <PreviewItem
                      label="Receipt Number"
                      value={receiptNumber}
                    />

                    <PreviewItem
                      label="Due Date"
                      value={form.dueDate}
                    />

                    <PreviewItem
                      label="Client Reference"
                      value={form.inReference}
                    />

                    <PreviewItem
                      label="Our Reference"
                      value={form.ourReference}
                    />

                    <PreviewItem
                      label="Currency"
                      value={form.currency}
                    />

                    <PreviewItem
                      label="Language"
                      value={form.language}
                    />
                  </div>
                </div>

                {/* ITEMS */}
                <div className="mb-6">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Items
                    </h3>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                    <table className="min-w-[580px] w-full text-xs">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-[#101F33]">
                          <th className="px-3 py-3 text-left font-bold text-slate-500 dark:text-slate-300">
                            Description
                          </th>

                          <th className="px-3 py-3 text-right font-bold text-slate-500 dark:text-slate-300">
                            Qty
                          </th>

                          <th className="px-3 py-3 text-right font-bold text-slate-500 dark:text-slate-300">
                            Price
                          </th>

                          <th className="px-3 py-3 text-right font-bold text-slate-500 dark:text-slate-300">
                            VAT
                          </th>

                          <th className="px-3 py-3 text-right font-bold text-slate-500 dark:text-slate-300">
                            Amount
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {productLines.map((line, index) => (
                          <tr
                            key={index}
                            className="border-t border-slate-100 dark:border-slate-800"
                          >
                            <td className="px-3 py-3">
                              <div className="font-semibold text-slate-800 dark:text-white">
                                {line.productName || "-"}
                              </div>

                              {line.description && (
                                <div className="mt-1 text-[10px] text-slate-400">
                                  {line.description}
                                </div>
                              )}
                            </td>

                            <td className="px-3 py-3 text-right text-slate-600 dark:text-slate-300">
                              {line.quantity}
                            </td>

                            <td className="px-3 py-3 text-right text-slate-600 dark:text-slate-300">
                              {Number(line.price).toFixed(2)}
                            </td>

                            <td className="px-3 py-3 text-right text-slate-600 dark:text-slate-300">
                              {line.vatRate}%
                            </td>

                            <td className="px-3 py-3 text-right font-bold text-slate-800 dark:text-white">
                              {Number(
                                line.lineTotal || 0
                              ).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* TOTALS */}
                <div className="mb-6 ml-auto w-full max-w-sm space-y-2">
                  <div className="flex justify-between border-b border-slate-100 py-2 dark:border-slate-800">
                    <span className="text-xs text-slate-500">
                      Subtotal
                    </span>

                    <span className="text-xs font-bold text-slate-800 dark:text-white">
                      {formatMoney(net)}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-slate-100 py-2 dark:border-slate-800">
                    <span className="text-xs text-slate-500">
                      VAT
                    </span>

                    <span className="text-xs font-bold text-slate-800 dark:text-white">
                      {formatMoney(moms)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-[#002147] px-4 py-3 text-white">
                    <span className="text-sm font-bold">
                      Amount Due
                    </span>

                    <span className="text-base font-extrabold">
                      {formatMoney(total)}
                    </span>
                  </div>
                </div>

                {/* COMPANY FOOTER */}
                <div className="border-t border-slate-100 pt-5 text-center text-[10px] leading-5 text-slate-400 dark:border-slate-800">
                  <p className="font-bold text-slate-600 dark:text-slate-300">
                    {companyLoading
                      ? "Loading company information..."
                      : company?.company_name || "DealerPro"}
                  </p>

                  {!companyLoading && (
                    <>
                      <p>
                        {company?.visiting_address ||
                          company?.mailingAddress ||
                          "N/A"}
                        {company?.city
                          ? `, ${company.city}`
                          : ""}
                        {company?.postalCode
                          ? `, ${company.postalCode}`
                          : ""}
                      </p>

                      <p>
                        Phone:{" "}
                        {company?.phoneNumber || "N/A"}
                        {" • "}
                        Org:{" "}
                        {company?.registrationNumber ||
                          "N/A"}
                      </p>

                      <p>
                        VAT:{" "}
                        {company?.vatNumber || "N/A"}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* PRINT STYLES */}
      <style>{`
        @media print {
          body {
            background: white !important;
          }

          body * {
            visibility: hidden;
          }

          .printable-area,
          .printable-area * {
            visibility: visible;
          }

          .printable-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            min-height: 100vh;
            background: white !important;
          }

          @page {
            size: A4;
            margin: 12mm;
          }
        }
      `}</style>
    </div>
  );
};

interface PreviewItemProps {
  label: string;
  value?: string;
}

const PreviewItem = ({
  label,
  value,
}: PreviewItemProps) => {
  return (
    <div className="min-w-0">
      <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </div>

      <div className="mt-1 break-words text-xs font-semibold text-slate-800 dark:text-slate-200">
        {value?.trim() || "N/A"}
      </div>
    </div>
  );
};

export default AddReceipt;
