import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useUserProfile } from "../../../utils/useUserProfile";
import {
  makeGetRequest,
  makePutRequest,
} from "../../../api/Api";

import {
  Building2,
  CalendarDays,
  CreditCard,
  FileSignature,
  FileText,
  Globe2,
  KeyRound,
  Landmark,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ReceiptText,
  Save,
  Search,
  UploadCloud,
  UserRound,
  X,
} from "lucide-react";

import toast from "react-hot-toast";
import ChangePasswordModal from "../../models/ChangePasswordModal";
import { BACKEND_API_ENDPOINT } from "../../../api/config";

import Select from "react-select";

/* =========================================================
   TYPES
========================================================= */

export type SectionKey =
  | "company_information"
  | "address_details"
  | "contact_information"
  | "payment_settings"
  | "invoice_settings"
  | "contract_settings";

interface EditProfileProps {
  onUpdateSuccess?: () => void;
  section: SectionKey;
}

interface FieldOption {
  value: string;
  label: string;
}

type FieldType =
  | "text"
  | "email"
  | "tel"
  | "date"
  | "number"
  | "textarea"
  | "file"
  | "checkbox"
  | "select0";

interface SectionField {
  name: string;
  label: string;
  type: FieldType;
  multiple?: boolean;
  options?: FieldOption[];
}

interface OrgAddress {
  _type: string;
  kind: string;
  country: string;
  street: string;
  number: string;
  zip: string;
  city: string;
  county: string;
  municipality: string;
}

interface OrgPhone {
  _type: string;
  number: string;
  areaCode: string;
  kind: string;
  registeredSince: string;
}

interface OrgSearchResponse {
  success: boolean;
  type: "ORG";
  keyword: string;
  count: number;
  data: {
    _type: "SE_ORG";
    id: string;
    country: string;
    legalId: string;
    addresses: OrgAddress[];
    phones: OrgPhone[];
    orgName: {
      name: string;
      rawName: string;
    };
    lifecycle: {
      status: {
        value: string;
      };
      establishedInYear: number;
      establishedOn: string;
    };
    primaryBusinessCategory: {
      code: string;
      description: string;
    };
    taxInfo: {
      vatNumber: string;
      fskattPayer: boolean;
      vatPayer: boolean;
      employer: boolean;
    };
    legalForm: {
      code: string;
      name: string;
    };
  }[];
}

/* =========================================================
   SECTION TITLES
========================================================= */

const sectionTitles: Record<
  SectionKey,
  string
> = {
  company_information: "Company Information",
  address_details: "Address Details",
  contact_information: "Contact Information",
  payment_settings: "Payment Settings",
  invoice_settings: "Invoice Settings",
  contract_settings: "Contract Settings",
};

/* =========================================================
   SECTION FIELDS
========================================================= */

const sectionFields: Record<
  SectionKey,
  SectionField[]
> = {
  company_information: [
    {
      name: "company_name",
      label: "Company Name",
      type: "text",
    },
    {
      name: "registration_number",
      label: "Organization Number",
      type: "text",
    },
    {
      name: "company_mailadress",
      label: "Company Email",
      type: "email",
    },
    {
      name: "company_phone_number",
      label: "Company Phone",
      type: "tel",
    },
    {
      name: "legal_entity_type",
      label: "Legal Entity Type",
      type: "text",
    },
    {
      name: "date_of_registration",
      label: "Registration Date",
      type: "date",
    },
    {
      name: "vat_number",
      label: "VAT Number",
      type: "text",
    },
    {
      name: "industry_code",
      label: "Industry Code",
      type: "text",
    },
    {
      name: "visiting_address",
      label: "Visiting Address",
      type: "text",
    },
    {
      name: "mailing_address",
      label: "Mailing Address",
      type: "text",
    },
    {
      name: "postal_code",
      label: "Postal Code",
      type: "text",
    },
    {
      name: "city",
      label: "City",
      type: "text",
    },
    {
      name: "country",
      label: "Country",
      type: "text",
    },
    {
      name: "business_description",
      label: "Business Description",
      type: "textarea",
    },
    {
      name: "upload_logo",
      label: "Upload Logo",
      type: "file",
    },
    {
      name: "system_language",
      label: "System Language",
      type: "select0",
      multiple: true,
      options: [
        {
          value: "Svenska",
          label: "Swedish",
        },
        {
          value: "Engelska",
          label: "English",
        },
      ],
    },
  ],

  address_details: [],

  contact_information: [
    {
      name: "first",
      label: "First Name",
      type: "text",
    },
    {
      name: "last",
      label: "Last Name",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
    },
    {
      name: "phone",
      label: "Phone",
      type: "tel",
    },
    {
      name: "role",
      label: "Role / Title",
      type: "text",
    },
  ],

  payment_settings: [
    {
      name: "bank_account_number",
      label: "Bank Account",
      type: "text",
    },
    {
      name: "iban",
      label: "IBAN",
      type: "text",
    },
    {
      name: "bic_swift",
      label: "BIC / SWIFT",
      type: "text",
    },
    {
      name: "swish_number",
      label: "Swish Number",
      type: "text",
    },
  ],

  invoice_settings: [
    {
      name: "invoice_number_prefix",
      label: "Invoice Number Prefix",
      type: "text",
    },
    {
      name: "invoice_counter",
      label: "Invoice Counter",
      type: "number",
    },
    {
      name: "payment_terms",
      label: "Invoice Payment Terms",
      type: "text",
    },
    {
      name: "late_payment_interest_rate",
      label: "Late Payment Interest Rate",
      type: "number",
    },
    {
      name: "invoice_fee",
      label: "Invoice Fee",
      type: "number",
    },
    {
      name: "currency",
      label: "Currency",
      type: "text",
    },
    {
      name: "invoice_language",
      label: "Invoice Language",
      type: "text",
    },
    {
      name: "reference_person",
      label: "Reference Person",
      type: "text",
    },
  ],

  contract_settings: [
    {
      name: "default_invoice_message",
      label: "Default Invoice Message",
      type: "textarea",
    },
    {
      name: "default_contract_duration",
      label: "Contract Duration (Months)",
      type: "number",
    },
    {
      name: "signing_method",
      label: "Signing Method",
      type: "text",
    },
    {
      name: "contract_version_control",
      label: "Contract Version Control",
      type: "text",
    },
    {
      name: "contract_contact_person",
      label: "Contract Contact Person",
      type: "text",
    },
    {
      name: "contract_terms",
      label: "Contract Terms",
      type: "textarea",
    },
  ],
};

/* =========================================================
   SECTION ICONS
========================================================= */

const sectionIcons: Record<
  SectionKey,
  React.ElementType
> = {
  company_information: Building2,
  address_details: MapPin,
  contact_information: UserRound,
  payment_settings: CreditCard,
  invoice_settings: ReceiptText,
  contract_settings: FileSignature,
};

/* =========================================================
   COMPONENT
========================================================= */

const EditProfile = ({
  onUpdateSuccess,
  section,
}: EditProfileProps) => {
  const {
    user,
    loading: profileLoading,
  } = useUserProfile();

  const [formData, setFormData] = useState<
    Record<string, any>
  >({});

  const [isUpdating, setIsUpdating] =
    useState(false);

  const [
    showPasswordModal,
    setShowPasswordModal,
  ] = useState(false);

  const [logoFile, setLogoFile] =
    useState<File | null>(null);

  const [
    logoPreviewUrl,
    setLogoPreviewUrl,
  ] = useState<string | null>(null);

  const [isSearching, setIsSearching] =
    useState(false);

  const [searchError, setSearchError] =
    useState("");

  const [isDarkMode, setIsDarkMode] =
    useState(() => {
      if (typeof document === "undefined") {
        return false;
      }

      return document.documentElement.classList.contains(
        "dark"
      );
    });

  /* =========================================================
     WATCH GLOBAL DARK MODE
  ========================================================= */

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const root = document.documentElement;

    const observer =
      new MutationObserver(() => {
        setIsDarkMode(
          root.classList.contains("dark")
        );
      });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  /* =========================================================
     REACT SELECT STYLES
  ========================================================= */

  const selectStyles = useMemo(
    () => ({
      control: (
        base: any,
        state: any
      ) => ({
        ...base,
        minHeight: 48,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: state.isFocused
          ? "#2563eb"
          : isDarkMode
            ? "#334155"
            : "#e2e8f0",
        backgroundColor: isDarkMode
          ? "#0f172a"
          : "#f8fafc",
        boxShadow: state.isFocused
          ? "0 0 0 2px rgba(37, 99, 235, 0.15)"
          : "none",
        "&:hover": {
          borderColor: "#2563eb",
        },
      }),

      menu: (base: any) => ({
        ...base,
        zIndex: 9999,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: isDarkMode
          ? "#0f172a"
          : "#ffffff",
        border: `1px solid ${
          isDarkMode
            ? "#334155"
            : "#e2e8f0"
        }`,
      }),

      option: (
        base: any,
        state: any
      ) => ({
        ...base,
        cursor: "pointer",
        backgroundColor:
          state.isFocused
            ? "#2563eb"
            : isDarkMode
              ? "#0f172a"
              : "#ffffff",
        color: state.isFocused
          ? "#ffffff"
          : isDarkMode
            ? "#e2e8f0"
            : "#0f172a",
      }),

      singleValue: (base: any) => ({
        ...base,
        color: isDarkMode
          ? "#e2e8f0"
          : "#0f172a",
      }),

      multiValue: (base: any) => ({
        ...base,
        backgroundColor: isDarkMode
          ? "#1e3a8a"
          : "#dbeafe",
        borderRadius: 8,
      }),

      multiValueLabel: (base: any) => ({
        ...base,
        color: isDarkMode
          ? "#dbeafe"
          : "#1e40af",
      }),

      multiValueRemove: (
        base: any
      ) => ({
        ...base,
        color: isDarkMode
          ? "#bfdbfe"
          : "#1e40af",
        ":hover": {
          backgroundColor: "#2563eb",
          color: "#ffffff",
        },
      }),

      input: (base: any) => ({
        ...base,
        color: isDarkMode
          ? "#e2e8f0"
          : "#0f172a",
      }),

      placeholder: (base: any) => ({
        ...base,
        color: isDarkMode
          ? "#64748b"
          : "#94a3b8",
      }),

      indicatorSeparator: (
        base: any
      ) => ({
        ...base,
        backgroundColor: isDarkMode
          ? "#334155"
          : "#e2e8f0",
      }),

      dropdownIndicator: (
        base: any
      ) => ({
        ...base,
        color: isDarkMode
          ? "#94a3b8"
          : "#64748b",
        "&:hover": {
          color: "#2563eb",
        },
      }),
    }),
    [isDarkMode]
  );

  /* =========================================================
     LOGO FILE HANDLER
  ========================================================= */

  const handleLogoFile = (
    file: File
  ) => {
    if (!file.type.startsWith("image/")) {
      toast.error(
        "Please select a valid image file."
      );
      return;
    }

    setLogoFile(file);

    const previewUrl =
      URL.createObjectURL(file);

    setLogoPreviewUrl(previewUrl);
  };

  const handleFileDrop = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    const file =
      event.dataTransfer.files?.[0];

    if (file) {
      handleLogoFile(file);
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (file) {
      handleLogoFile(file);
    }
  };

  /* =========================================================
     CLEANUP LOGO PREVIEW
  ========================================================= */

  useEffect(() => {
    return () => {
      if (
        logoPreviewUrl?.startsWith(
          "blob:"
        )
      ) {
        URL.revokeObjectURL(
          logoPreviewUrl
        );
      }
    };
  }, [logoPreviewUrl]);

  /* =========================================================
     INPUT CHANGE
  ========================================================= */

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const {
      name,
      value,
      type,
    } = event.target;

    const checked =
      type === "checkbox"
        ? (
            event.target as HTMLInputElement
          ).checked
        : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  /* =========================================================
     ORGANIZATION SEARCH
  ========================================================= */

  const handleOrgSearch = async () => {
    const orgNumber =
      formData.registration_number;

    if (!orgNumber) {
      setSearchError(
        "Organization number is required."
      );
      return;
    }

    setIsSearching(true);
    setSearchError("");

    try {
      const token =
        sessionStorage.getItem("token") ||
        localStorage.getItem("token") ||
        "";

      const response = await fetch(
        `${BACKEND_API_ENDPOINT}agreements/external/agreements`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",

            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },
          body: JSON.stringify({
            type: "ORG",
            query: orgNumber,
          }),
        }
      );

      if (!response.ok) {
        const errorData =
          await response
            .json()
            .catch(() => ({}));

        throw new Error(
          errorData?.message ||
            "Organization search failed."
        );
      }

      const data: OrgSearchResponse =
        await response.json();

      if (
        data.success &&
        data.count > 0 &&
        data.data?.length > 0
      ) {
        const orgData =
          data.data[0];

        const primaryPhone =
          orgData.phones?.find(
            (phone) =>
              phone.kind === "OFFICIAL"
          ) ||
          orgData.phones?.[0];

        const formatAddress = (
          address?: OrgAddress
        ) => {
          if (!address) {
            return "";
          }

          return `${address.street || ""} ${
            address.number || ""
          }, ${address.zip || ""} ${
            address.city || ""
          }`.trim();
        };

        const visitingAddress =
          orgData.addresses?.find(
            (address) =>
              address.kind === "VISIT"
          );

        const mailingAddress =
          orgData.addresses?.find(
            (address) =>
              address.kind === "MAIL"
          );

        const updatedData = {
          company_name:
            orgData.orgName?.name ||
            "",

          registration_number:
            orgData.legalId || "",

          vat_number:
            orgData.taxInfo?.vatNumber ||
            "",

          legal_entity_type:
            orgData.legalForm?.name ||
            "",

          date_of_registration:
            orgData.lifecycle
              ?.establishedOn
              ?.split("T")[0] || "",

          industry_code:
            orgData
              .primaryBusinessCategory
              ?.code || "",

          business_description:
            orgData
              .primaryBusinessCategory
              ?.description || "",

          visiting_address:
            formatAddress(
              visitingAddress
            ),

          mailing_address:
            formatAddress(
              mailingAddress
            ),

          postal_code:
            visitingAddress?.zip || "",

          city:
            visitingAddress?.city || "",

          country:
            visitingAddress?.country || "",

          company_phone_number:
            primaryPhone?.number || "",
        };

        setFormData((prev) => ({
          ...prev,
          ...updatedData,
        }));

        toast.success(
          "Organization details loaded successfully."
        );
      } else {
        setSearchError(
          "No organization found with this number."
        );
      }
    } catch (error) {
      console.error(
        "Organization search error:",
        error
      );

      setSearchError(
        error instanceof Error
          ? error.message
          : "Failed to search organization. Please try again."
      );
    } finally {
      setIsSearching(false);
    }
  };

  /* =========================================================
     FETCH COMPANY DETAILS
  ========================================================= */

  useEffect(() => {
    let isMounted = true;

    const fetchCompanyDetails =
      async () => {
        try {
          const response =
            await makeGetRequest(
              "companyDetail/getCompanyDetailByUser"
            );

          if (!isMounted) {
            return;
          }

          if (response?.data?.success) {
            const company =
              response.data.data || {};

            const preferredLanguage =
              company.preferred_language;

            const languages = Array.isArray(
              preferredLanguage
            )
              ? preferredLanguage
              : preferredLanguage
                ? String(
                    preferredLanguage
                  )
                    .split(",")
                    .map(
                      (item) =>
                        item.trim()
                    )
                    .filter(Boolean)
                : [];

            const flattened = {
              company_name:
                company.company_name ||
                "",

              registration_number:
                company.registrationNumber ||
                "",

              legal_entity_type:
                company.legalEntityType ||
                "",

              date_of_registration:
                company.dateOfRegistration
                  ?.split("T")[0] ||
                "",

              vat_number:
                company.vatNumber ||
                "",

              industry_code:
                company.industry_code ||
                "",

              business_description:
                company.business_description ||
                "",

              system_language:
                languages,

              country:
                company.country || "",

              city:
                company.city || "",

              postal_code:
                company.postalCode || "",

              visiting_address:
                company.visitingAddress ||
                "",

              mailing_address:
                company.mailingAddress ||
                "",

              company_mailadress:
                company.company_mailaddress ||
                "",

              company_phone_number:
                company.company_phonenumber ||
                "",

              first:
                company.first || "",

              last:
                company.last || "",

              email:
                company.emailAddress || "",

              phone:
                company.phoneNumber || "",

              role:
                company.roleTitle || "",

              bank_account_number:
                company.bankAccountNumber ||
                "",

              iban:
                company.iban_Bic || "",

              swish_number:
                company.swish_Number ||
                "",

              bic_swift:
                company.bicSwift || "",

              payment_terms:
                company.payment_Terms ||
                "",

              late_payment_interest_rate:
                company.late_payment_interest_rate ||
                "",

              invoice_fee:
                company.invoice_Fee || "",

              invoice_number_prefix:
                company.invoice_number_prefix ||
                "",

              invoice_counter:
                company.invoice_number_counter ||
                "",

              currency:
                company.currency || "",

              invoice_language:
                company.invoice_language ||
                "",

              reference_person:
                company.reference_person ||
                "",

              default_invoice_message:
                company.default_invoice_message ||
                "",

              default_contract_duration:
                company.contract_duration ||
                "",

              signing_method:
                company.signing_method || "",

              contract_version_control:
                company.contract_version_control ||
                "",

              contract_contact_person:
                company.contract_contact_person ||
                "",

              contract_terms:
                company.contract_terms ||
                "",
            };

            setFormData(
              flattened
            );

            if (
              company.attachments
            ) {
              setLogoPreviewUrl(
                company.attachments
              );
            }
          } else {
            toast.error(
              response?.data?.message ||
                "Failed to fetch company details."
            );
          }
        } catch (error) {
          console.error(
            "Fetch company details error:",
            error
          );

          if (isMounted) {
            toast.error(
              "Failed to load company details."
            );
          }
        }
      };

    fetchCompanyDetails();

    return () => {
      isMounted = false;
    };
  }, []);

  /* =========================================================
     BUILD UPDATE DATA
  ========================================================= */

  const buildUpdateData =
    (): Record<string, any> => {
      switch (section) {
        case "company_information":
          return {
            type: "Company Information",

            company_name:
              formData.company_name,

            registrationNumber:
              formData.registration_number,

            legalEntityType:
              formData.legal_entity_type,

            dateOfRegistration:
              formData.date_of_registration,

            vatNumber:
              formData.vat_number,

            industry_code:
              formData.industry_code,

            preferred_language:
              formData.system_language,

            business_description:
              formData.business_description,

            system_language:
              formData.system_language,

            visiting_address:
              formData.visiting_address,

            mailing_address:
              formData.mailing_address,

            postalCode:
              formData.postal_code,

            city:
              formData.city,

            country:
              formData.country,

            company_mailadress:
              formData.company_mailadress,

            company_phone_number:
              formData.company_phone_number,
          };

        case "contact_information":
          return {
            type: "Contact Information",

            first:
              formData.first,

            last:
              formData.last,

            emailAddress:
              formData.email,

            phoneNumber:
              formData.phone,

            user:
              formData.role,
          };

        case "payment_settings":
          return {
            type: "Payment Settings",

            bankAccountNumber:
              formData.bank_account_number,

            iban_Bic:
              formData.iban,

            bicSwift:
              formData.bic_swift,

            swish_Number:
              formData.swish_number,

            payment_Terms:
              formData.payment_terms,

            late_payment_interest_rate:
              formData.late_payment_interest_rate,

            invoice_Fee:
              formData.invoice_fee,
          };

        case "invoice_settings":
          return {
            type: "Invoice Settings",

            invoice_number_counter:
              formData.invoice_counter,

            currency:
              formData.currency,

            invoice_language:
              formData.invoice_language,

            reference_person:
              formData.reference_person,

            invoice_number_prefix:
              formData.invoice_number_prefix,

            payment_Terms:
              formData.payment_terms,

            late_payment_interest_rate:
              formData.late_payment_interest_rate,

            invoice_Fee:
              formData.invoice_fee,
          };

        case "contract_settings":
          return {
            type: "Contract Settings",

            default_invoice_message:
              formData.default_invoice_message,

            contract_duration:
              formData.default_contract_duration,

            signing_method:
              formData.signing_method,

            contract_version_control:
              formData.contract_version_control,

            contract_contact_person:
              formData.contract_contact_person,

            contract_terms:
              formData.contract_terms,
          };

        default:
          return {};
      }
    };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!user) {
      toast.error(
        "Your user session was not found. Please log in again."
      );
      return;
    }

    setIsUpdating(true);

    try {
      const updateData =
        buildUpdateData();

      let response: any;

      if (
        section ===
        "company_information"
      ) {
        const formDataToSend =
          new FormData();

        if (logoFile) {
          formDataToSend.append(
            "file",
            logoFile
          );
        }

        Object.entries(
          updateData
        ).forEach(
          ([key, value]) => {
            if (
              value === undefined ||
              value === null
            ) {
              return;
            }

            if (
              typeof value ===
              "object"
            ) {
              formDataToSend.append(
                key,
                JSON.stringify(value)
              );
            } else {
              formDataToSend.append(
                key,
                String(value)
              );
            }
          }
        );

        response =
          await makePutRequest(
            "companyDetail/update",
            formDataToSend,
            "multipart/form-data"
          );
      } else {
        response =
          await makePutRequest(
            "companyDetail/update",
            updateData
          );
      }

      if (response?.data?.success) {
        toast.success(
          `${sectionTitles[section]} updated successfully.`
        );

        if (onUpdateSuccess) {
          onUpdateSuccess();
        }
      } else {
        throw new Error(
          response?.data?.message ||
            "Failed to update profile."
        );
      }
    } catch (error) {
      console.error(
        "Profile update error:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred while updating profile."
      );
    } finally {
      setIsUpdating(false);
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (profileLoading) {
    return (
      <div className="flex min-h-[320px] w-full items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/40">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600 dark:text-blue-400" />
          </div>

          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  /* =========================================================
     ADDRESS DETAILS EMPTY STATE
  ========================================================= */

  if (section === "address_details") {
    return (
      <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 bg-slate-50 px-5 py-5 dark:border-slate-800 dark:bg-slate-950/60 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              <MapPin className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Address Details
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Your address information is managed under Company Information.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-5 dark:border-blue-900/50 dark:bg-blue-950/20">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />

              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Address information
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Visiting address, mailing address,
                  postal code, city and country can be
                  updated from the Company Information
                  section.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     CURRENT SECTION
  ========================================================= */

  const Icon =
    sectionIcons[section];

  const fields =
    sectionFields[section];

  return (
    <>
      <div className="mb-6 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-5 py-5 dark:border-slate-800 dark:from-slate-950 dark:to-slate-900 sm:px-6">
          <div className="flex items-start gap-3 sm:items-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              <Icon className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {sectionTitles[section]}
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Manage your{" "}
                {sectionTitles[
                  section
                ].toLowerCase()}{" "}
                and keep your DealerPro account information up to date.
              </p>
            </div>
          </div>
        </div>

        {/* ===================================================
            FORM
        =================================================== */}

        <form
          onSubmit={handleSubmit}
          className="p-5 sm:p-6"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {fields.map(
              (field) => {
                const isFullWidth =
                  field.type ===
                    "textarea" ||
                  field.type === "file";

                return (
                  <div
                    key={
                      field.name
                    }
                    className={
                      isFullWidth
                        ? "md:col-span-2"
                        : ""
                    }
                  >
                    {/* =================================================
                        LABEL
                    ================================================= */}

                    <label
                      htmlFor={
                        field.name
                      }
                      className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >
                      {
                        field.label
                      }
                    </label>

                    {/* =================================================
                        ORGANIZATION NUMBER
                    ================================================= */}

                    {field.name ===
                    "registration_number" ? (
                      <div>
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <div className="relative flex-1">
                            <input
                              id={
                                field.name
                              }
                              type="text"
                              name={
                                field.name
                              }
                              value={
                                formData[
                                  field.name
                                ] ||
                                ""
                              }
                              onChange={
                                handleChange
                              }
                              placeholder="Enter organization number"
                              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500 dark:focus:bg-slate-950"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={
                              handleOrgSearch
                            }
                            disabled={
                              isSearching ||
                              !formData.registration_number
                            }
                            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                          >
                            {isSearching ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>
                                  Searching...
                                </span>
                              </>
                            ) : (
                              <>
                                <Search className="h-4 w-4" />
                                <span>
                                  Search
                                </span>
                              </>
                            )}
                          </button>
                        </div>

                        {searchError && (
                          <p className="mt-2 flex items-center gap-1 text-sm text-red-600 dark:text-red-400">
                            <X className="h-4 w-4" />
                            {
                              searchError
                            }
                          </p>
                        )}
                      </div>
                    ) : field.type ===
                      "select0" ? (
                      /* ===============================================
                         SELECT
                      =============================================== */

                      <Select
                        inputId={
                          field.name
                        }
                        isMulti={Boolean(
                          field.multiple
                        )}
                        options={
                          field.options ||
                          []
                        }
                        value={
                          field.multiple
                            ? (
                                field.options ||
                                []
                              ).filter(
                                (
                                  option
                                ) => {
                                  const currentValue =
                                    formData[
                                      field.name
                                    ];

                                  if (
                                    Array.isArray(
                                      currentValue
                                    )
                                  ) {
                                    return currentValue.includes(
                                      option.value
                                    );
                                  }

                                  if (
                                    typeof currentValue ===
                                    "string" &&
                                    currentValue
                                  ) {
                                    return currentValue
                                      .split(
                                        ","
                                      )
                                      .map(
                                        (
                                          item
                                        ) =>
                                          item.trim()
                                      )
                                      .includes(
                                        option.value
                                      );
                                  }

                                  return false;
                                }
                              )
                            : (
                                field.options ||
                                []
                              ).find(
                                (
                                  option
                                ) =>
                                  option.value ===
                                  formData[
                                    field.name
                                  ]
                              ) ||
                              null
                        }
                        onChange={(
                          selected: any
                        ) => {
                          if (
                            field.multiple
                          ) {
                            const values =
                              Array.isArray(
                                selected
                              )
                                ? selected.map(
                                    (
                                      option: FieldOption
                                    ) =>
                                      option.value
                                  )
                                : [];

                            setFormData(
                              (
                                prev
                              ) => ({
                                ...prev,
                                [field.name]:
                                  values,
                              })
                            );
                          } else {
                            const value =
                              selected &&
                              !Array.isArray(
                                selected
                              )
                                ? selected.value
                                : "";

                            setFormData(
                              (
                                prev
                              ) => ({
                                ...prev,
                                [field.name]:
                                  value,
                              })
                            );
                          }
                        }}
                        isClearable={
                          !field.multiple
                        }
                        closeMenuOnSelect={
                          !field.multiple
                        }
                        placeholder={`Select ${field.label.toLowerCase()}`}
                        classNamePrefix="dealer-select"
                        styles={
                          selectStyles
                        }
                      />
                    ) : field.type ===
                      "textarea" ? (
                      /* ===============================================
                         TEXTAREA
                      =============================================== */

                      <textarea
                        id={
                          field.name
                        }
                        name={
                          field.name
                        }
                        value={
                          formData[
                            field.name
                          ] || ""
                        }
                        onChange={
                          handleChange
                        }
                        rows={5}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500 dark:focus:bg-slate-950"
                      />
                    ) : field.type ===
                      "file" ? (
                      /* ===============================================
                         LOGO UPLOAD
                      =============================================== */

                      <div
                        onDragOver={(
                          event
                        ) =>
                          event.preventDefault()
                        }
                        onDrop={
                          handleFileDrop
                        }
                        className="relative overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 transition hover:border-blue-400 hover:bg-blue-50/30 dark:border-slate-700 dark:bg-slate-950/60 dark:hover:border-blue-600 dark:hover:bg-blue-950/10"
                      >
                        <input
                          id={
                            field.name
                          }
                          type="file"
                          accept="image/*"
                          onChange={
                            handleFileChange
                          }
                          className="hidden"
                        />

                        <label
                          htmlFor={
                            field.name
                          }
                          className="flex cursor-pointer flex-col items-center justify-center text-center"
                        >
                          {logoPreviewUrl ? (
                            <div className="mb-4">
                              <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
                                <img
                                  src={
                                    logoPreviewUrl
                                  }
                                  alt="Company logo preview"
                                  className="h-full w-full object-contain p-3"
                                />
                              </div>

                              <p className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                                {logoFile
                                  ? logoFile.name
                                  : "Current company logo"}
                              </p>
                            </div>
                          ) : (
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                              <UploadCloud className="h-6 w-6" />
                            </div>
                          )}

                          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                            {logoPreviewUrl
                              ? "Choose another logo"
                              : "Upload company logo"}
                          </span>

                          <span className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                            PNG, JPG or WEBP
                          </span>

                          <span className="mt-3 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-blue-600 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:text-blue-400 dark:ring-slate-700">
                            Browse files
                          </span>
                        </label>
                      </div>
                    ) : (
                      /* ===============================================
                         NORMAL INPUT
                      =============================================== */

                      <input
                        id={
                          field.name
                        }
                        type={
                          field.type
                        }
                        name={
                          field.name
                        }
                        value={
                          formData[
                            field.name
                          ] ?? ""
                        }
                        onChange={
                          handleChange
                        }
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500 dark:focus:bg-slate-950"
                      />
                    )}
                  </div>
                );
              }
            )}
          </div>

          {/* =========================================================
              FOOTER ACTIONS
          ========================================================= */}

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={() =>
                setShowPasswordModal(
                  true
                )
              }
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-blue-700 dark:hover:bg-blue-950/30 dark:hover:text-blue-400 sm:w-auto"
            >
              <KeyRound className="h-4 w-4" />
              Change Password
            </button>

            <button
              type="submit"
              disabled={isUpdating}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#012F7A] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-600 dark:hover:bg-blue-700 sm:w-auto"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* =========================================================
          CHANGE PASSWORD MODAL
      ========================================================= */}

      {user?.user_id && (
        <ChangePasswordModal
          isOpen={
            showPasswordModal
          }
          onClose={() =>
            setShowPasswordModal(
              false
            )
          }
          userId={
            user.user_id
          }
        />
      )}
    </>
  );
};

export default EditProfile;
