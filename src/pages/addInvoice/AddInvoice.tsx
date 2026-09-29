import { useState, useRef, useEffect } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { makeGetRequest, makePostRequest } from "../../api/Api";
import {
  BackArrowIcon,
  RemoveLineIcon,
  InvoicePreviewIcon,
} from "../../components/utils/Icons";
import { BACKEND_API_ENDPOINT } from "../../api/config";
import { generateTempInvoiceNumber } from "../../utils/generateTempInvoiceNumber";

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
  address?: string;
  postalCode?: string;
  city?: string;
  country?: string;
}

interface PreviewData {
  orgNumber?: string;
  socialSecurityNumber?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  // Add any other fields you want to display in preview
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

const AddInvoice = () => {
  const [form, setForm] = useState<InvoiceForm>({
    invoiceNumber: "",
    customerType: "Business",
    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    inReference: "",
    ourReference: "",
    email: "",
    telephone: "",
    customerName: "",
    orgNumber: "",
    socialSecurityNumber: "",
    currency: "SEK",
    language: "English",
  });

  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  console.log(formData,loading);

  const [orgOrSsn, setOrgOrSsn] = useState("");
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [showPrintView, setShowPrintView] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResponse | null>(null);
  const [searchError, setSearchError] = useState("");
  const [company, setCompany] = useState<any>(null);
  const [companyLoading, setCompanyLoading] = useState(true);
  const [productLines, setProductLines] = useState<ProductLine[]>([
    { ...defaultProductLine(), lineTotal: 0 },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewData, setPreviewData] = useState<PreviewData>({});
  const receiptRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const handlePrint = () => {
    setShowPrintView(true);
  };

  useEffect(() => {
    if (showPrintView) {
      const timer = setTimeout(() => {
        window.print();
        setShowPrintView(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [showPrintView]);

  console.log("searchResult", searchResult);

  console.log("setSearchResult", setSearchResult, companyLoading);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

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
      newErrors.invoiceDate = "Invoice date is required";
    }

    if (!form.dueDate) {
      newErrors.dueDate = "Due date is required";
    }

    let hasValidProduct = false;
    productLines.forEach((line) => {
      if (line.productName.trim() && line.price > 0 && line.quantity > 0) {
        hasValidProduct = true;
      }
    });

    if (!hasValidProduct) {
      newErrors.productLines = "At least one valid product/service is required";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async (type: "ORG" | "PERSON", query: string) => {
    try {
      const response = await fetch(
        `${BACKEND_API_ENDPOINT}agreements/external/agreements`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXBhcnRtZW50X2lkIjoiMDAwMDA5M2UyNDY5YjNhOGJmMTQ4NGVmODA5MWEyM2MiLCJ1c2VyX25hbWUiOiIwMDA1Y2ViN2I0ZmJjNmI1YjRlMzNjMTdlNGM4NDAzZiIsImRlcGFydG1lbnRfbmFtZSI6IlZhbGl0aXZlIENyZWRpdCIsImF1dGhvcml0aWVzIjpbIlZMVFZfQ1JFRElUX1NFQVJDSF9ETyIsIlZBTElUSVZFX0FQSV9BQ0NFU1MiXSwiY2xpZW50X2lkIjoiSU5TX1BBUlRORVIiLCJhdWQiOlsiVkFMSVRJVkUiXSwidXNlcl9pZCI6IjAwMDVjZWI3YjRmYmM2YjViNGUzM2MxN2U0Yzg0MDNmIiwidXNlcl9yZWFsX25hbWUiOiJTYW1pciBLYXNzZW0iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUi`,
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

      if (data.success && data.count > 0) {
        const result = data.data[0];
        const preview: PreviewData = {};

        if (type === "PERSON") {
          const personData = result as PersonData;
          const primaryAddress = personData.addresses[0];

          setForm((prev) => ({
            ...prev,
            customerName: `${personData.name.givenName} ${personData.name.lastName}`,
            address: primaryAddress
              ? `${primaryAddress.street} ${primaryAddress.number || ""}${primaryAddress.numberSuffix ? primaryAddress.numberSuffix : ""
              }`
              : "",
            postalCode: primaryAddress?.zip || "",
            city: primaryAddress?.city || "",
            country: primaryAddress?.country || "",
          }));

          preview.socialSecurityNumber = personData.legalId;
          preview.address = `${primaryAddress?.street} ${primaryAddress?.number || ""
            }${primaryAddress?.numberSuffix ? primaryAddress.numberSuffix : ""}`;
          preview.postalCode = primaryAddress?.zip;
          preview.city = primaryAddress?.city;
          preview.country = primaryAddress?.country;
        } else if (type === "ORG") {
          const orgData = result as OrgData;
          const primaryAddress =
            orgData.addresses.find((a) => a.kind === "VISIT") ||
            orgData.addresses[0];
          const primaryPhone =
            orgData.phones.find((p) => p.kind === "OFFICIAL") ||
            orgData.phones[0];

          setForm((prev) => ({
            ...prev,
            customerName: orgData.orgName.name,
            address: primaryAddress
              ? `${primaryAddress.street} ${primaryAddress.number || ""}`
              : "",
            postalCode: primaryAddress?.zip || "",
            city: primaryAddress?.city || "",
            country: primaryAddress?.country || "",
            telephone: primaryPhone?.number || "",
            orgNumber: orgData.legalId,
          }));

          preview.orgNumber = orgData.legalId;
          preview.address = `${primaryAddress?.street} ${primaryAddress?.number || ""
            }`;
          preview.postalCode = primaryAddress?.zip;
          preview.city = primaryAddress?.city;
          preview.country = primaryAddress?.country;
        }

        setPreviewData(preview);
        setSearchResult(data);
        setSearchError("");
      } else {
        setSearchError(
          `No results found for ${type === "ORG" ? "organization" : "individual"
          }`
        );
      }
    } catch (error) {
      console.error(`Error searching ${type}:`, error);
      setSearchError(
        `Failed to search ${type === "ORG" ? "organization" : "individual"}`
      );
    }
  };

  const handleOrgOrPersonSearch = () => {
    if (
      (form.customerType === "Business" && !orgOrSsn) ||
      (form.customerType === "Individual" && !orgOrSsn)
    ) {
      setSearchError(
        form.customerType === "Business"
          ? "Organization number is required"
          : "Social Security number is required"
      );
      return;
    }
    setSearchError("");

    if (form.customerType === "Business") {
      handleFormChange({
        target: {
          name: "orgNumber",
          value: orgOrSsn,
        },
      } as React.ChangeEvent<HTMLInputElement>);
      handleSearch("ORG", orgOrSsn);
    } else if (form.customerType === "Individual") {
      handleFormChange({
        target: {
          name: "socialSecurityNumber",
          value: orgOrSsn,
        },
      } as React.ChangeEvent<HTMLInputElement>);
      handleSearch("PERSON", orgOrSsn);
    }
  };

  const handleProductLineChangeOLDs = (
    idx: number,
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const newLines = [...productLines];
    const value =
      e.target.type === "number"
        ? parseFloat(e.target.value) || 0
        : e.target.value;

    newLines[idx] = {
      ...newLines[idx],
      [e.target.name]: value,
    };

    if (e.target.name === "price" || e.target.name === "quantity") {
      newLines[idx].lineTotal =
        newLines[idx].price *
        newLines[idx].quantity *
        (1 + newLines[idx].vatRate / 100);
    }

    setProductLines(newLines);
  };

  console.log(handleProductLineChangeOLDs);

  const handleProductLineChange = (
    idx: number,
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const newLines = [...productLines];
    let value: string | number = e.target.value;

    if (e.target.type === "number") {
      value = e.target.value === "" ? 0 : parseFloat(e.target.value);
    }

    newLines[idx] = {
      ...newLines[idx],
      [e.target.name]: value,
    };

    if (
      e.target.name === "price" ||
      e.target.name === "quantity" ||
      e.target.name === "vatRate"
    ) {
      const price = Number(newLines[idx].price) || 0;
      const qty = Number(newLines[idx].quantity) || 1;
      const vat = Number(newLines[idx].vatRate) || 0;

      newLines[idx].lineTotal = price * qty * (1 + vat / 100);
    }

    setProductLines(newLines);
  };

  const addProductLine = () => {
    setProductLines([
      ...productLines,
      { ...defaultProductLine(), lineTotal: 0 },
    ]);
  };

  const removeProductLine = (idx: number) => {
    if (productLines.length > 1) {
      setProductLines(productLines.filter((_, i) => i !== idx));
    }
  };

  const net = productLines.reduce(
    (sum, line) => sum + line.price * line.quantity,
    0
  );
  const moms = productLines.reduce(
    (sum, line) => sum + (line.price * line.quantity * line.vatRate) / 100,
    0
  );
  const total = net + moms;

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
        invoiceNumber: generateTempInvoiceNumber(),
        telephoneNumber: form.telephone,
        items: productLines.map((line) => ({
          productName: line.productName,
          quantity: line.quantity,
          unit: line.unit,
          price: line.price,
          vatRate: line.vatRate,
          description: line.description,
          lineTotal: line.price * line.quantity * (1 + line.vatRate / 100),
        })),
        net,
        moms,
        amount: total,
        status: "Pending",
        currency: form.currency,
        language: form.language,
      };

      const response = await makePostRequest("invoices/create", invoiceData);

      if (response.data && response.data.success) {
        toast.success("Invoice created successfully");
        navigate(-1);
      } else {
        toast.error(response.data?.message || "Failed to create invoice");
      }
    } catch (err) {
      toast.error("An error occurred while creating the invoice");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await makeGetRequest("companyDetail/getCompanyDetailByUser");
        setCompany(response.data.data);
      } catch (error) {
        console.error("Error fetching company:", error);
      } finally {
        setCompanyLoading(false);
      }
    };

    fetchCompany();
  }, []);


  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await makeGetRequest("companyDetail/getCompanyDetailByUser");
        console.log("Company details response:", response);

        if (response.data.success) {
          const company = response.data.data;

          // 👇 flatten data like in EditProfile
          const flattened = {
            company_name: company.company_name || "",
            registration_number: company.registrationNumber || "",
            legal_entity_type: company.legalEntityType || "",
            date_of_registration: company.dateOfRegistration?.split("T")[0] || "",
            vat_number: company.vatNumber || "",
            industry_code: company.industry_code || "",
            business_description: company.business_description || "",
            system_language: company.preferred_language || "",
            country: company.country || "",
            city: company.city || "",
            postal_code: company.postalCode || "",
            visiting_address: company.visiting_address || "",
            mailing_address: company.mailing_address || "",
            company_mailadress: company.company_mailaddress || "",
            company_phone_number: company.company_phonenumber || "",
            bank_account_number: company.bankAccountNumber || "",
            iban: company.iban_Bic || "",
            swish_number: company.swish_Number || "",
            bic_swift: company.bicSwift || "",
            payment_terms: company.payment_Terms || "",
            late_payment_interest_rate: company.late_payment_interest_rate || "",
            invoice_fee: company.invoice_Fee || "",
            invoice_number_prefix: company.invoice_number_prefix || "",
            invoice_counter: company.invoice_number_counter || "",
            currency: company.currency || "",
            invoice_language: company.invoice_language || "",
            reference_person: company.reference_person || "",
            default_invoice_message: company.default_invoice_message || "",
            default_contract_duration: company.contract_duration || "",
            signing_method: company.signing_method || "",
            contract_version_control: company.contract_version_control || "",
            contract_contact_person: company.contract_contact_person || "",
            contract_terms: company.contract_terms || "",
          };

          setFormData(flattened);
        } else {
          toast.error(response.data.message || "Failed to fetch company details");
        }
      } catch (error: any) {
        toast.error("API error: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, []);

  console.log("formDatassss", company);

  return (
    <>
      {/* adeel  */}
      {showPrintView ? (
        <div className="printable-area font-plus-jakarta" ref={receiptRef}>
          <div className="p-6 max-w-full mx-auto bg-white">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-blue-500">Invoice</h1>
              <div className="text-blue-500 font-bold text-xl">
                {company?.attachments ? (
                  <img
                    src={company.attachments}
                    alt="Company Attachment"
                    className="w-32 h-32 object-cover rounded-md"
                  />
                ) : (
                  <div className="text-gray-500 text-sm">N/A</div>
                )}
              </div>
            </div>

            <p className="text-sm text-black font-medium mb-2">Invoice Number</p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="mb-4 border border-gray-300 rounded-md min-h-24 p-2 py-1">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <h2 className="font-medium text-[12px]">Name</h2>
                    <p className="font-normal text-[12px]">
                      {form.customerName || "-"}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <h2 className="font-medium text-[12px]">Organization</h2>
                    <p className="font-normal text-[12px]">
                      {form.orgNumber || "-"}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <h2 className="font-medium text-[12px]">Phone Number</h2>
                    <p className="font-normal text-[12px]">
                      {form.telephone || "-"}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <h2 className="font-medium text-[12px]">Email</h2>
                    <p className="font-normal text-[12px]">
                      {form.email || "-"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-4 border border-gray-300 rounded-md min-h-24 p-2 py-1">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <h2 className="font-medium text-[12px]">Invoice Date</h2>
                    <p className="font-normal text-[12px]">
                      {form.invoiceDate || "N/A"}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <h2 className="font-medium text-[12px]">Due Date</h2>
                    <p className="font-normal text-[12px]">
                      {form.dueDate || "N/A"}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <h2 className="font-medium text-[12px]">In Reference</h2>
                    <p className="font-normal text-[12px]">
                      {form.inReference || "N/A"}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <h2 className="font-medium text-[12px]">Our Reference</h2>
                    <p className="font-normal text-[12px]">
                      {form.ourReference || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            <div className="mb-2 flex max-h-[45vh] min-h-[360px] flex-col justify-between rounded-xl border border-slate-200 p-2 py-1 dark:border-slate-800 sm:min-h-[420px]">
              <div>
                <div className="text-white py-2 text-sm grid grid-cols-4">
                  <span className="text-blue-500 font-medium text-[16px] px-2">
                    Product / Service
                  </span>
                  <span className="text-blue-500 font-medium text-[16px] px-2">
                    Unit Price
                  </span>
                  <span className="text-blue-500 font-medium text-[16px] px-2">
                    Moms
                  </span>
                  <span className="text-blue-500 font-medium text-[16px] px-2">
                    Amount
                  </span>
                </div>

                {productLines.map((line, idx) => (
                  <div key={idx} className="grid min-w-[620px] grid-cols-4">
                    <span className="border-b border-slate-100 p-2.5 dark:border-slate-800">
                      {line.productName || "-"}
                    </span>
                    <span className="border-b border-slate-100 p-2.5 dark:border-slate-800">
                      {line.price}
                    </span>
                    <span className="border-b border-slate-100 p-2.5 dark:border-slate-800">
                      {line.vatRate}
                    </span>
                    <span className="border-b border-slate-100 p-2.5 dark:border-slate-800">
                      {line.lineTotal}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col">
                <div className="mb-2 flex justify-end">
                  <div className="flex gap-4">
                    <div className="text-left">
                      <p className="font-medium">Netto:</p>
                      <p className="text-sm text-gray-500">
                        VAT (calculated on {net.toFixed(2)} kr)
                      </p>
                      <p className="text-sm text-gray-500">Rounding:</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{net.toFixed(2)} kr</p>
                      <p className="text-sm text-gray-500">
                        {moms.toFixed(2)} kr
                      </p>
                      <p className="text-sm text-gray-500">0,00 kr</p>
                    </div>
                  </div>
                </div>

                <div className="text-end border-t border-gray-300 py-3">
                  <p className="text-xl font-bold">
                    Amount Due: {total.toFixed(2)} kr
                  </p>
                </div>
              </div>
            </div>

            <div className="min-h-28 border border-gray-300 rounded-md px-2 py-3">
              <h3 className="text-sm font-semibold">Company information</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex flex-col">
                  <div className="grid grid-cols-2 gap-0.5 mb-2">
                    <p className="w-20 text-xs">Address: </p>
                    <p className="text-xs">{company.mailingAddress || "N/A"}</p>

                    <p className="w-20 text-xs">Postal Code:</p>
                    <p className="text-xs">{company.postalCode || "N/A"}</p>

                    <p className="w-20 text-xs">City: </p>
                    <p className="text-xs">{company?.city || "N/A"}</p>


                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="grid grid-cols-2 gap-0.5 mb-2">
                    <p className="w-20 text-xs">Bank: </p>
                    <p className="text-xs">
                      {company.bankAccountNumber || "N/A"}
                    </p>
                    <p className="w-20 text-xs">IBAN: </p>
                    <p className="text-xs">
                      {company.iban_Bic || "N/A"}
                    </p>
                    <p className="w-20 text-xs">BIC/SWIFT: </p>
                    <p className="text-xs">
                      {company.iban_Bic || "N/A"}
                    </p>
                    <p className="w-20 text-xs">Swish: </p>
                    <p className="text-xs">
                      {company.swish_Number || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              {/* <h3 className="text-sm font-semibold">Businessets e-post</h3> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen w-full bg-[#F5F7FA] px-3 py-4 font-plus-jakarta transition-colors duration-300 dark:bg-[#07111F] sm:px-5 sm:py-5 lg:px-7 lg:py-7">
          <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <button
              className="flex w-fit items-center rounded-xl px-2 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-[#002147] dark:text-slate-300 dark:hover:bg-[#0D1D31] dark:hover:text-white"
              onClick={() => navigate(-1)}
            >
              <BackArrowIcon />
              <span className="ml-2 text-base font-bold sm:text-lg">Create Invoice</span>
              </button>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                  DealerPro
                </p>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
                  Create Invoice
                </h1>
              </div>
            </div>
            <button
              className="w-full rounded-xl bg-gradient-to-r from-[#002147] to-[#0759A8] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/10 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-7"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Invoice"}
            </button>
          </div>

          {Object.keys(error).length > 0 && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
              {Object.values(error).map((err, idx) => (
                <p key={idx}>{err}</p>
              ))}
            </div>
          )}
          <div className="grid w-full grid-cols-1 gap-5 xl:grid-cols-2 xl:gap-6">
            <div className="flex min-w-0 flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-[#0B1728] sm:gap-6 sm:p-5 lg:p-6">
              <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4 dark:border-blue-500/10 dark:bg-blue-500/5 sm:p-5">
                <h2 className="mb-4 text-base font-bold text-[#002147] dark:text-white">
                  Customer Information
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {form.customerType === "Individual" && (
                    <div className="col-span-2">
                      <label className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300 sm:text-sm">
                        Social Security Number
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          name="socialSecurityNumber"
                          placeholder="Social Security Number"
                          value={form.socialSecurityNumber || orgOrSsn}
                          onChange={(e) => {
                            setOrgOrSsn(e.target.value);
                            handleFormChange(e);
                          }}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0E1C2D] dark:text-white dark:placeholder:text-slate-500"
                        />
                        <button
                          className="shrink-0 rounded-xl bg-gradient-to-r from-[#002147] to-[#0759A8] px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
                          type="button"
                          onClick={handleOrgOrPersonSearch}
                        >
                          Search
                        </button>
                      </div>
                      {searchError && (
                        <div className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
                          {searchError}
                        </div>
                      )}
                    </div>
                  )}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300 sm:text-sm">
                      Customer Type
                    </label>
                    <select
                      name="customerType"
                      value={form.customerType}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0E1C2D] dark:text-white dark:placeholder:text-slate-500"
                    >
                      <option value="Business">Business</option>
                      <option value="Individual">Individual</option>
                    </select>

                  </div>
                  {form.customerType === "Business" && (
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300 sm:text-sm">
                        Organization Number
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          name="orgNumber"
                          placeholder="Organization number"
                          value={form.orgNumber || orgOrSsn}
                          onChange={(e) => {
                            setOrgOrSsn(e.target.value);
                            handleFormChange(e);
                          }}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0E1C2D] dark:text-white dark:placeholder:text-slate-500"
                        />
                        <button
                          className="shrink-0 rounded-xl bg-gradient-to-r from-[#002147] to-[#0759A8] px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
                          type="button"
                          onClick={handleOrgOrPersonSearch}
                        >
                          Search
                        </button>
                      </div>
                      {searchError && (
                        <div className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
                          {searchError}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300 sm:text-sm">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={form.customerName}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0E1C2D] dark:text-white dark:placeholder:text-slate-500"
                      placeholder="Enter customer name..."
                    />
                  </div>


                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300 sm:text-sm">
                      Invoice Date
                    </label>
                    <input
                      type="date"
                      name="invoiceDate"
                      value={form.invoiceDate}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0E1C2D] dark:text-white dark:placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300 sm:text-sm">
                      Due Date
                    </label>
                    <input
                      type="date"
                      name="dueDate"
                      value={form.dueDate}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0E1C2D] dark:text-white dark:placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300 sm:text-sm">
                      Client Reference
                    </label>
                    <input
                      type="text"
                      name="inReference"
                      value={form.inReference}
                      onChange={handleFormChange}
                      placeholder="Client reference..."
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0E1C2D] dark:text-white dark:placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300 sm:text-sm">
                      Our Reference
                    </label>
                    <input
                      type="text"
                      name="ourReference"
                      value={form.ourReference}
                      onChange={handleFormChange}
                      placeholder="Our reference..."
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0E1C2D] dark:text-white dark:placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300 sm:text-sm">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleFormChange}
                      placeholder="Enter email address..."
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0E1C2D] dark:text-white dark:placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300 sm:text-sm">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="telephone"
                      value={form.telephone}
                      onChange={handleFormChange}
                      placeholder="Enter telephone number..."
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0E1C2D] dark:text-white dark:placeholder:text-slate-500"
                    />
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-[#0D1D31] sm:p-5">
                <h2 className="text-blue-900 font-semibold mb-4 text-base">
                  Amount
                </h2>
                <div className="w-full overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                  <table className="min-w-[720px] text-sm border-separate border-spacing-0">
                    <thead>
                      <tr className="bg-blue-50 dark:bg-[#10253D]">
                        <th className="whitespace-nowrap border-b border-blue-100 p-3 text-start text-xs font-bold text-[#002147] dark:border-slate-700 dark:text-blue-300">
                          Product / Service
                        </th>
                        <th className="whitespace-nowrap border-b border-blue-100 p-3 text-start text-xs font-bold text-[#002147] dark:border-slate-700 dark:text-blue-300">
                          Price ({form.currency})
                        </th>
                        <th className="whitespace-nowrap border-b border-blue-100 p-3 text-start text-xs font-bold text-[#002147] dark:border-slate-700 dark:text-blue-300">
                          MOMS (%)
                        </th>
                        <th className="whitespace-nowrap border-b border-blue-100 p-3 text-start text-xs font-bold text-[#002147] dark:border-slate-700 dark:text-blue-300">
                          Amount
                        </th>
                        <th className="whitespace-nowrap border-b border-blue-100 p-3 text-start text-xs font-bold text-[#002147] dark:border-slate-700 dark:text-blue-300">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {productLines.map((line, idx) => (
                        <tr
                          key={idx}
                          className={idx % 2 === 0 ? "bg-white dark:bg-[#0B1728]" : "bg-slate-50 dark:bg-[#0E1C2D]"}
                        >
                          <td className="border-b border-slate-100 p-2.5 dark:border-slate-800">
                            {/* <input
                          type="text"
                          name="productName"
                          value={line.productName}
                          onChange={(e) => handleProductLineChange(idx, e)}
                          className="w-full rounded-lg border border-slate-200 bg-white p-2 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#101F33] dark:text-white"
                          placeholder="Product name"
                        /> */}
                            <input
                              type="text"
                              name="productName"
                              value={line.productName}
                              onChange={(e) => handleProductLineChange(idx, e)}
                              className="w-full rounded-lg border border-slate-200 bg-white p-2 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#101F33] dark:text-white"
                              placeholder="Description"
                            />
                          </td>
                          <td className="border-b border-slate-100 p-2.5 dark:border-slate-800">
                            <input
                              type="number"
                              name="price"
                              value={line.price}
                              onChange={(e) => handleProductLineChange(idx, e)}
                              className="w-full rounded-lg border border-slate-200 bg-white p-2 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#101F33] dark:text-white"
                              min="0"
                              step="0.01"
                            />
                          </td>
                          <td className="p-2 w-16 border-b border-gray-100">
                            <select
                              name="vatRate"
                              value={line.vatRate}
                              onChange={(e) => handleProductLineChange(idx, e)}
                              className="w-full rounded-lg border border-slate-200 bg-white p-2 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#101F33] dark:text-white"
                            >
                              <option value="25">25%</option>
                              <option value="12">12%</option>
                              <option value="6">6%</option>
                              <option value="0">0%</option>
                            </select>
                          </td>
                          <td className="border-b border-slate-100 p-2.5 dark:border-slate-800">
                            {line.lineTotal?.toFixed(2) || "0.00"}
                          </td>
                          <td className="border-b border-slate-100 p-2.5 dark:border-slate-800">
                            <button
                              type="button"
                              onClick={() => removeProductLine(idx)}
                              className="text-red-500 hover:text-red-700"
                              disabled={productLines.length <= 1}
                            >
                              <RemoveLineIcon />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-center mt-2">
                  <button
                    type="button"
                    onClick={addProductLine}
                    className="mt-3 flex items-center gap-1 rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#002147] shadow-sm transition hover:bg-blue-50 dark:border-slate-700 dark:bg-[#101F33] dark:text-blue-300 dark:hover:bg-[#162943]"
                  >
                    <span>+</span> Add Product Line
                  </button>
                </div>
                <div className="mt-5 flex flex-col gap-2.5 text-right">
                  <div className="flex items-center justify-between border-b border-slate-100 px-2 py-2 dark:border-slate-800">
                    <span className="text-slate-600 dark:text-slate-300">Netto:</span>{" "}
                    <span className="font-semibold">
                      {net.toFixed(2)} {form.currency}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 px-2 py-2 dark:border-slate-800">
                    <span className="text-slate-600 dark:text-slate-300">MOMS:</span>{" "}
                    <span className="font-semibold">
                      {moms.toFixed(2)} {form.currency}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between rounded-xl bg-blue-50 px-3 py-3 dark:bg-blue-500/10">
                    <span className="font-semibold">Total Amount:</span>{" "}
                    <span className="font-bold text-[#002147] dark:text-blue-300">
                      {total.toFixed(2)} {form.currency}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="printable-area flex min-w-0 flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-[#0B1728] sm:p-5 lg:p-6"
              ref={receiptRef}
            >
              <div className="mb-2 flex items-center justify-between rounded-xl border-b border-slate-100 py-4 dark:border-slate-800">
                <h2 className="text-sm font-bold text-slate-800 dark:text-white sm:text-[15px]">
                  Invoice{" "}
                  <span className="text-gray-400 text-sm font-normal">
                    (Live Preview)
                  </span>
                </h2>
                <button
                  className="rounded-lg p-2 text-[#012F7A] transition hover:bg-blue-50 hover:text-blue-700 dark:text-blue-300 dark:hover:bg-blue-500/10"
                  onClick={handlePrint}
                >
                  <InvoicePreviewIcon />
                </button>
              </div>
              <div className="mb-6">
                <h3 className="mb-3 text-base font-bold text-slate-900 dark:text-white sm:text-lg">
                  Invoice
                </h3>
                <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Invoicenummer
                    </div>
                    <div className="mt-0.5 break-words text-sm font-medium text-slate-800 dark:text-slate-200 sm:text-[15px]">
                      {generateTempInvoiceNumber()}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Customer Type
                    </div>
                    <div className="mt-0.5 break-words text-sm font-medium text-slate-800 dark:text-slate-200 sm:text-[15px]">
                      {form.customerType || "N/A"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="mb-3 text-base font-bold text-slate-900 dark:text-white sm:text-lg">
                  Invoicemottagare
                </h3>
                <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Customer Name
                    </div>
                    <div className="mt-0.5 break-words text-sm font-medium text-slate-800 dark:text-slate-200 sm:text-[15px]">
                      {form.customerName || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {form.customerType === "Business" ? "Org. Nr" : "SSN"}
                    </div>
                    <div className="mt-0.5 break-words text-sm font-medium text-slate-800 dark:text-slate-200 sm:text-[15px]">
                      {form.customerType === "Business"
                        ? previewData.orgNumber || form.orgNumber || "N/A"
                        : previewData.socialSecurityNumber ||
                        form.socialSecurityNumber ||
                        "N/A"}
                    </div>

                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      E-post
                    </div>
                    <div className="mt-0.5 break-words text-sm font-medium text-slate-800 dark:text-slate-200 sm:text-[15px]">
                      {form.email || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Phone Number
                    </div>
                    <div className="mt-0.5 break-words text-sm font-medium text-slate-800 dark:text-slate-200 sm:text-[15px]">
                      {form.telephone || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Client Reference
                    </div>
                    <div className="mt-0.5 break-words text-sm font-medium text-slate-800 dark:text-slate-200 sm:text-[15px]">
                      {form.inReference || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Adress
                    </div>
                    <div className="mt-0.5 break-words text-sm font-medium text-slate-800 dark:text-slate-200 sm:text-[15px]">
                      {previewData.address || form.address || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Postnummer
                    </div>
                    <div className="mt-0.5 break-words text-sm font-medium text-slate-800 dark:text-slate-200 sm:text-[15px]">
                      {previewData.postalCode || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Stad
                    </div>
                    <div className="mt-0.5 break-words text-sm font-medium text-slate-800 dark:text-slate-200 sm:text-[15px]">
                      {previewData.city || "N/A"}
                    </div>

                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="mb-3 text-base font-bold text-slate-900 dark:text-white sm:text-lg">
                  Invoiceinformation
                </h3>
                <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Invoice Date
                    </div>
                    <div className="mt-0.5 break-words text-sm font-medium text-slate-800 dark:text-slate-200 sm:text-[15px]">
                      {form.invoiceDate || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Due Date
                    </div>
                    <div className="mt-0.5 break-words text-sm font-medium text-slate-800 dark:text-slate-200 sm:text-[15px]">
                      {form.dueDate || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Our Reference
                    </div>
                    <div className="mt-0.5 break-words text-sm font-medium text-slate-800 dark:text-slate-200 sm:text-[15px]">
                      {form.ourReference || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Currency
                    </div>
                    <div className="mt-0.5 break-words text-sm font-medium text-slate-800 dark:text-slate-200 sm:text-[15px]">
                      {company ? (company.currency || "N/A") : "N/A"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="mb-3 text-base font-bold text-slate-900 dark:text-white sm:text-lg">
                  Description
                </h3>
                <table className="min-w-[720px] text-sm border-separate border-spacing-0">
                  <thead>
                    <tr className="bg-blue-50 dark:bg-[#10253D]">
                      <th className="whitespace-nowrap border-b border-blue-100 p-3 text-start text-xs font-bold text-[#002147] dark:border-slate-700 dark:text-blue-300">
                        Description
                      </th>
                      <th className="whitespace-nowrap border-b border-blue-100 p-3 text-start text-xs font-bold text-[#002147] dark:border-slate-700 dark:text-blue-300">
                        Price
                      </th>
                      <th className="whitespace-nowrap border-b border-blue-100 p-3 text-start text-xs font-bold text-[#002147] dark:border-slate-700 dark:text-blue-300">
                        Moms
                      </th>
                      <th className="whitespace-nowrap border-b border-blue-100 p-3 text-start text-xs font-bold text-[#002147] dark:border-slate-700 dark:text-blue-300">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {productLines.map((line, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? "bg-white" : "bg-[#F6F8FA]"}
                      >
                        <td className="border-b border-slate-100 p-2.5 dark:border-slate-800">
                          {line.productName || "-"}
                        </td>
                        <td className="border-b border-slate-100 p-2.5 dark:border-slate-800">
                          {line.price}
                        </td>
                        <td className="border-b border-slate-100 p-2.5 dark:border-slate-800">
                          {line.vatRate}
                        </td>
                        <td className="border-b border-slate-100 p-2.5 dark:border-slate-800">
                          {line.lineTotal}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mb-2 text-right flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-slate-100 px-2 py-2 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-300">Subtotal:</span>{" "}
                  <span className="font-semibold">{net.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 px-2 py-2 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-300">VAT:</span>{" "}
                  <span className="font-semibold">{moms.toFixed(2)}</span>
                </div>
                <div className="mt-2 flex items-center justify-between rounded-xl bg-blue-50 px-3 py-3 dark:bg-blue-500/10">
                  <span className="font-semibold">Amount Due:</span>{" "}
                  <span className="font-bold text-[#002147] dark:text-blue-300">
                    {total.toFixed(2)} {form.currency}
                  </span>
                </div>
              </div>
              <div className="mt-5 break-words text-center text-[11px] leading-5 text-slate-400 dark:text-slate-500">
                {company?.company_name || "N/A"} • {company?.visiting_address || "N/A"}, {company?.city || "N/A"}, {company?.postalCode || "N/A"} • {company?.phoneNumber || "N/A"}
                <br />
                Bankgiro: {company?.iban_Bic || "N/A"} • Org.nr: {company?.registrationNumber || "N/A"} • VAT: {company?.vatNumber || "N/A"}
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddInvoice;
