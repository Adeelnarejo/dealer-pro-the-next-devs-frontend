import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  FileText,
  Mail,
  MapPin,
  Phone,
  Plus,
  ReceiptText,
  Search,
  Trash2,
  UserRound,
  WalletCards,
} from "lucide-react";
import toast from "react-hot-toast";

import { makeGetRequest, makePostRequest } from "../../api/Api";

interface AmountRow {
  amount: string;
  description: string;
}

interface PersonAddress {
  street?: string;
  address?: string;
  zip?: string;
  postalCode?: string;
  postal_code?: string;
  city?: string;
}

interface PersonName {
  firstName?: string;
  lastName?: string;
  first_name?: string;
  last_name?: string;
  name?: string;
}

interface PersonResult {
  id?: string | number;
  personId?: string | number;
  ssn?: string;
  socialSecurityNumber?: string;
  social_security_number?: string;
  email?: string;
  phone?: string;
  telephone?: string;
  telephoneNumber?: string;
  name?: string;
  personName?: PersonName;
  address?: PersonAddress | string;
}

interface SearchResponse {
  data?: PersonResult[];
  results?: PersonResult[];
  persons?: PersonResult[];
  agreements?: PersonResult[];
  message?: string;
}

interface Company {
  company_name?: string;
  registrationNumber?: string;
  phoneNumber?: string;
  mailingAddress?: string;
  postalCode?: string;
  city?: string;
  bankAccountNumber?: string;
  iban_Bic?: string;
  bicSwift?: string;
  swish_Number?: string;
  attachments?: string[];
}

interface PaymentForm {
  reference: string;
  name: string;
  email: string;
  category: string;
  ssn: string;
  telephone: string;
  description: string;
  amounts: AmountRow[];
}

const BACKEND_API_ENDPOINT =
  import.meta.env.VITE_BACKEND_API_ENDPOINT || "http://localhost:5000/api/";

const initialAmount: AmountRow = {
  amount: "",
  description: "",
};

const initialForm: PaymentForm = {
  reference: "",
  name: "",
  email: "",
  category: "",
  ssn: "",
  telephone: "",
  description: "",
  amounts: [{ ...initialAmount }],
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-400 dark:focus:bg-slate-900 dark:focus:ring-blue-400/10";

const labelClass =
  "mb-2 block text-[12px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400";

const cardClass =
  "rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-[#0d1422]";

const getPersonName = (person?: PersonResult | null) => {
  if (!person) return "";

  if (person.name) return person.name;

  if (typeof person.personName === "string") {
    return person.personName;
  }

  const first =
    person.personName?.firstName || person.personName?.first_name || "";

  const last =
    person.personName?.lastName || person.personName?.last_name || "";

  return `${first} ${last}`.trim();
};

const getPersonAddress = (person?: PersonResult | null) => {
  if (!person?.address) return "";

  if (typeof person.address === "string") {
    return person.address;
  }

  return (
    person.address.street ||
    person.address.address ||
    ""
  );
};

const getPersonZip = (person?: PersonResult | null) => {
  if (!person?.address || typeof person.address === "string") {
    return "";
  }

  return (
    person.address.zip ||
    person.address.postalCode ||
    person.address.postal_code ||
    ""
  );
};

const getPersonCity = (person?: PersonResult | null) => {
  if (!person?.address || typeof person.address === "string") {
    return "";
  }

  return person.address.city || "";
};

function AddPayments() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showPrintView, setShowPrintView] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [company, setCompany] = useState<Company | null>(null);
  const [companyLoading, setCompanyLoading] = useState(true);

  const [person, setPerson] = useState<PersonResult | null>(null);

  const [form, setForm] = useState<PaymentForm>(initialForm);

  useEffect(() => {
    const savedForm = sessionStorage.getItem("paymentFormData");

    if (savedForm) {
      try {
        const parsed = JSON.parse(savedForm);

        setForm({
          ...initialForm,
          ...parsed,
          amounts:
            parsed.amounts?.length > 0
              ? parsed.amounts
              : [{ ...initialAmount }],
        });
      } catch {
        sessionStorage.removeItem("paymentFormData");
      }
    }
  }, []);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setCompanyLoading(true);

        const response = await makeGetRequest(
          "companyDetail/getCompanyDetailByUser"
        );

        const companyData =
          response?.data?.data ||
          response?.data ||
          response;

        setCompany(companyData || null);
      } catch (error) {
        console.error("Failed to load company details:", error);
      } finally {
        setCompanyLoading(false);
      }
    };

    fetchCompany();
  }, []);

  useEffect(() => {
    if (!showPrintView) return;

    const timer = setTimeout(() => {
      window.print();

      setTimeout(() => {
        setShowPrintView(false);
      }, 500);
    }, 300);

    return () => clearTimeout(timer);
  }, [showPrintView]);

  const total = useMemo(() => {
    return form.amounts.reduce((sum, item) => {
      const amount = Number.parseFloat(
        String(item.amount).replace(",", ".")
      );

      return sum + (Number.isFinite(amount) ? amount : 0);
    }, 0);
  }, [form.amounts]);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-SE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleAmountChange = (
    index: number,
    field: keyof AmountRow,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      amounts: prev.amounts.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      ),
    }));

    if (errors.amounts) {
      setErrors((prev) => ({
        ...prev,
        amounts: "",
      }));
    }
  };

  const addAmountRow = () => {
    setForm((prev) => ({
      ...prev,
      amounts: [
        ...prev.amounts,
        {
          ...initialAmount,
        },
      ],
    }));
  };

  const removeAmountRow = (index: number) => {
    if (form.amounts.length === 1) return;

    setForm((prev) => ({
      ...prev,
      amounts: prev.amounts.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.ssn.trim()) {
      newErrors.ssn = "SSN is required";
    }

    if (!form.telephone.trim()) {
      newErrors.telephone = "Phone number is required";
    } else if (form.telephone.trim().length < 6) {
      newErrors.telephone = "Enter a valid phone number";
    }

    if (!form.category) {
      newErrors.category = "Select a payment category";
    }

    const hasValidAmount = form.amounts.some((item) => {
      const amount = Number.parseFloat(
        String(item.amount).replace(",", ".")
      );

      return Number.isFinite(amount) && amount > 0;
    });

    if (!hasValidAmount) {
      newErrors.amounts = "At least one valid amount is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const searchPerson = async () => {
    const cleanQuery = form.ssn.trim();

    if (!cleanQuery) {
      setErrors((prev) => ({
        ...prev,
        ssn: "Enter an SSN",
      }));

      return;
    }

    try {
      setIsSearching(true);

      const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token") ||
        "";

      const response = await fetch(
        `${BACKEND_API_ENDPOINT}agreements/external/agreements`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },
          body: JSON.stringify({
            type: "PERSON",
            query: cleanQuery,
          }),
        }
      );

      const result: SearchResponse = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Person search failed");
      }

      const results =
        result.data ||
        result.results ||
        result.persons ||
        result.agreements ||
        [];

      const foundPerson = results[0];

      if (!foundPerson) {
        setPerson(null);

        toast.error("No person found");

        return;
      }

      setPerson(foundPerson);

      setForm((prev) => ({
        ...prev,
        name: getPersonName(foundPerson) || prev.name,
        telephone:
          foundPerson.telephone ||
          foundPerson.telephoneNumber ||
          foundPerson.phone ||
          prev.telephone,
        email: foundPerson.email || prev.email,
        ssn:
          foundPerson.ssn ||
          foundPerson.socialSecurityNumber ||
          foundPerson.social_security_number ||
          prev.ssn,
      }));

      setErrors((prev) => ({
        ...prev,
        ssn: "",
      }));

      toast.success("Person found successfully");
    } catch (error) {
      console.error("Person search failed:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to search for person"
      );
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please check the required fields");

      return;
    }

    try {
      setIsLoading(true);

      const amountItems = form.amounts
        .filter((item) => {
          const amount = Number.parseFloat(
            String(item.amount).replace(",", ".")
          );

          return Number.isFinite(amount) && amount > 0;
        })
        .map((item) => ({
          amount: Number.parseFloat(
            String(item.amount).replace(",", ".")
          ),
          description: item.description || "",
        }));

      const payload = {
        customer_reference:
          form.reference ||
          form.amounts[0]?.description ||
          "Payment",

        customer_name: form.name,

        payment_category: form.category,

        description: form.description,

        email: form.email,

        social_security_number: form.ssn,

        telephone_number: form.telephone,

        amount_items: amountItems,

        total_amount: total,
      };

      await makePostRequest("payments/createPayment", payload);

      toast.success("Payment registered successfully!");

      sessionStorage.removeItem("paymentFormData");

      navigate(-1);
    } catch (error) {
      console.error("Payment creation failed:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to register payment"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    setShowPrintView(true);
  };

  if (showPrintView) {
    return (
      <div className="print-receipt min-h-screen bg-white p-8 text-black">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-start justify-between border-b border-gray-300 pb-6">
            <div>
              <h1 className="text-2xl font-bold">
                {company?.company_name || "Company"}
              </h1>

              {company?.registrationNumber && (
                <p className="mt-1 text-sm text-gray-600">
                  Registration No: {company.registrationNumber}
                </p>
              )}

              {company?.mailingAddress && (
                <p className="mt-1 text-sm text-gray-600">
                  {company.mailingAddress}
                </p>
              )}

              {(company?.postalCode || company?.city) && (
                <p className="text-sm text-gray-600">
                  {company?.postalCode} {company?.city}
                </p>
              )}
            </div>

            <div className="text-right">
              <h2 className="text-xl font-bold">
                Swish Receipt
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                Payment Receipt
              </p>

              <p className="mt-2 text-sm">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 border-b border-gray-300 pb-6">
            <div>
              <p className="mb-2 text-xs font-bold uppercase text-gray-500">
                Payer
              </p>

              <p className="font-semibold">{form.name || "-"}</p>

              <p className="text-sm">
                SSN: {form.ssn || "-"}
              </p>

              <p className="text-sm">
                Phone: {form.telephone || "-"}
              </p>

              <p className="text-sm">
                Email: {form.email || "-"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs font-bold uppercase text-gray-500">
                Recipient
              </p>

              <p className="font-semibold">
                {company?.company_name || "-"}
              </p>

              <p className="text-sm">
                {company?.mailingAddress || "-"}
              </p>

              <p className="text-sm">
                {company?.postalCode} {company?.city}
              </p>
            </div>
          </div>

          <div className="py-6">
            <div className="mb-4 grid grid-cols-2 border-b border-gray-200 pb-2 text-xs font-bold uppercase text-gray-500">
              <span>Reference</span>
              <span className="text-right">Amount</span>
            </div>

            {form.amounts.map((item, index) => {
              const amount = Number.parseFloat(
                String(item.amount).replace(",", ".")
              );

              return (
                <div
                  key={index}
                  className="mb-3 grid grid-cols-2 text-sm"
                >
                  <span>
                    {item.description || form.reference || "Payment"}
                  </span>

                  <span className="text-right">
                    {Number.isFinite(amount)
                      ? `${formatAmount(amount)}`
                      : "0.00"}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="border-t-2 border-black pt-5">
            <div className="flex items-center justify-between text-xl font-bold">
              <span>Total Amount</span>
              <span>{formatAmount(total)}</span>
            </div>
          </div>

          {form.description && (
            <div className="mt-8 border-t border-gray-300 pt-5">
              <p className="mb-2 text-xs font-bold uppercase text-gray-500">
                Description
              </p>

              <p className="text-sm">{form.description}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-900 transition-colors dark:bg-[#070b14] dark:text-white">
      {/* TOP BAR */}
      <div className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-[#080d17]/90">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500/40 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
          >
            <ArrowLeft
              size={17}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Back
          </button>

          <div className="hidden items-center gap-3 sm:flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <ReceiptText size={18} />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Payment Management
              </p>

              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Create and manage payments
              </p>
            </div>
          </div>

          <div className="h-9 w-9" />
        </div>
      </div>

      <main className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* HEADER */}
        <div className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
              <WalletCards size={14} />
              New Payment
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              Create a new payment
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              Enter the customer details, payment category and amount
              information below.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-[#0d1422]">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Current total
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              {formatAmount(total)}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(350px,0.8fr)]">
            {/* LEFT */}
            <div className="space-y-6">
              {/* CUSTOMER */}
              <section className={cardClass}>
                <div className="border-b border-slate-100 px-5 py-5 dark:border-slate-800 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                      <UserRound size={19} />
                    </div>

                    <div>
                      <h2 className="font-bold text-slate-900 dark:text-white">
                        Customer Information
                      </h2>

                      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                        Search or enter customer details
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {/* SSN */}
                    <div className="md:col-span-2">
                      <label className={labelClass}>
                        SSN <span className="text-red-500">*</span>
                      </label>

                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Search
                            size={17}
                            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                          />

                          <input
                            name="ssn"
                            value={form.ssn}
                            onChange={handleChange}
                            placeholder="Enter an SSN"
                            className={`${inputClass} pl-10 ${
                              errors.ssn
                                ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                                : ""
                            }`}
                          />
                        </div>

                        <button
                          type="button"
                          onClick={searchPerson}
                          disabled={isSearching}
                          className="inline-flex min-w-[100px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Search size={16} />

                          {isSearching ? "Searching..." : "Search"}
                        </button>
                      </div>

                      {errors.ssn && (
                        <p className="mt-1.5 text-xs font-medium text-red-500">
                          {errors.ssn}
                        </p>
                      )}

                      {person && (
                        <div className="mt-3 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-xs font-medium text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                          <CheckCircle2 size={15} />
                          Customer information found and populated.
                        </div>
                      )}
                    </div>

                    {/* NAME */}
                    <div>
                      <label className={labelClass}>
                        Customer Name
                      </label>

                      <div className="relative">
                        <UserRound
                          size={16}
                          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Enter customer name"
                          className={`${inputClass} pl-10`}
                        />
                      </div>
                    </div>

                    {/* PHONE */}
                    <div>
                      <label className={labelClass}>
                        Phone <span className="text-red-500">*</span>
                      </label>

                      <div className="relative">
                        <Phone
                          size={16}
                          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          name="telephone"
                          value={form.telephone}
                          onChange={handleChange}
                          placeholder="Enter phone number..."
                          className={`${inputClass} pl-10 ${
                            errors.telephone
                              ? "border-red-400 focus:border-red-500"
                              : ""
                          }`}
                        />
                      </div>

                      {errors.telephone && (
                        <p className="mt-1.5 text-xs font-medium text-red-500">
                          {errors.telephone}
                        </p>
                      )}
                    </div>

                    {/* EMAIL */}
                    <div>
                      <label className={labelClass}>
                        Email
                      </label>

                      <div className="relative">
                        <Mail
                          size={16}
                          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="Enter email address..."
                          className={`${inputClass} pl-10`}
                        />
                      </div>
                    </div>

                    {/* REFERENCE */}
                    <div>
                      <label className={labelClass}>
                        Reference
                      </label>

                      <div className="relative">
                        <FileText
                          size={16}
                          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          name="reference"
                          value={form.reference}
                          onChange={handleChange}
                          placeholder="Payment reference"
                          className={`${inputClass} pl-10`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* PAYMENT */}
              <section className={cardClass}>
                <div className="border-b border-slate-100 px-5 py-5 dark:border-slate-800 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                      <CreditCard size={19} />
                    </div>

                    <div>
                      <h2 className="font-bold text-slate-900 dark:text-white">
                        Payment Details
                      </h2>

                      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                        Define the payment category and amounts
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="grid grid-cols-1 gap-5">
                    {/* CATEGORY */}
                    <div>
                      <label className={labelClass}>
                        Payment Category{" "}
                        <span className="text-red-500">*</span>
                      </label>

                      <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className={`${inputClass} ${
                          errors.category
                            ? "border-red-400 focus:border-red-500"
                            : ""
                        }`}
                      >
                        <option value="">
                          Select payment category...
                        </option>

                        <option value="CarPurchase">
                          Car Purchase
                        </option>

                        <option value="TirePurchase">
                          Tire Purchase
                        </option>

                        <option value="Service&Workshop">
                          Service & Workshop
                        </option>

                        <option value="Fuel">Fuel</option>

                        <option value="Expenses">Expenses</option>

                        <option value="other">Other</option>
                      </select>

                      {errors.category && (
                        <p className="mt-1.5 text-xs font-medium text-red-500">
                          {errors.category}
                        </p>
                      )}
                    </div>

                    {/* AMOUNTS */}
                    <div>
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div>
                          <label className={`${labelClass} mb-0`}>
                            Amounts{" "}
                            <span className="text-red-500">*</span>
                          </label>

                          <p className="mt-1 text-xs text-slate-400">
                            Add one or more payment lines.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={addAmountRow}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-100 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/15"
                        >
                          <Plus size={14} />
                          Add amount
                        </button>
                      </div>

                      <div className="space-y-3">
                        {form.amounts.map((item, index) => (
                          <div
                            key={index}
                            className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 dark:border-slate-700 dark:bg-slate-900/50"
                          >
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_180px_auto]">
                              <div>
                                <label className="mb-1.5 block text-[11px] font-semibold text-slate-400">
                                  Description
                                </label>

                                <input
                                  value={item.description}
                                  onChange={(e) =>
                                    handleAmountChange(
                                      index,
                                      "description",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Payment description"
                                  className={inputClass}
                                />
                              </div>

                              <div>
                                <label className="mb-1.5 block text-[11px] font-semibold text-slate-400">
                                  Amount
                                </label>

                                <div className="relative">
                                  <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={item.amount}
                                    onChange={(e) =>
                                      handleAmountChange(
                                        index,
                                        "amount",
                                        e.target.value
                                      )
                                    }
                                    placeholder="0.00"
                                    className={`${inputClass} pr-14`}
                                  />

                                  <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                                    SEK
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-end">
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeAmountRow(index)
                                  }
                                  disabled={form.amounts.length === 1}
                                  className="flex h-[46px] w-full items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-red-500/30 dark:hover:bg-red-500/10 dark:hover:text-red-400 sm:w-[46px]"
                                >
                                  <Trash2 size={17} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {errors.amounts && (
                        <p className="mt-2 text-xs font-medium text-red-500">
                          {errors.amounts}
                        </p>
                      )}
                    </div>

                    {/* DESCRIPTION */}
                    <div>
                      <label className={labelClass}>
                        Description
                      </label>

                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Add additional payment information..."
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {/* TOTAL */}
                    <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-5 dark:border-blue-500/20 dark:from-blue-500/10 dark:to-indigo-500/10">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                            Total Payment
                          </p>

                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            Calculated from all payment lines
                          </p>
                        </div>

                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                          {formatAmount(total)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* COMPANY */}
              <section className={cardClass}>
                <div className="border-b border-slate-100 px-5 py-5 dark:border-slate-800 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                      <MapPin size={19} />
                    </div>

                    <div>
                      <h2 className="font-bold text-slate-900 dark:text-white">
                        Company Information
                      </h2>

                      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                        Registered company details
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  {companyLoading ? (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {[1, 2, 3, 4].map((item) => (
                        <div
                          key={item}
                          className="h-16 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900/60">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                          Company
                        </p>

                        <p className="mt-1 font-semibold text-slate-800 dark:text-slate-100">
                          {company?.company_name || "-"}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900/60">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                          Registration Number
                        </p>

                        <p className="mt-1 font-semibold text-slate-800 dark:text-slate-100">
                          {company?.registrationNumber || "-"}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900/60">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                          Address
                        </p>

                        <p className="mt-1 font-semibold text-slate-800 dark:text-slate-100">
                          {company?.mailingAddress || "-"}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900/60">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                          City
                        </p>

                        <p className="mt-1 font-semibold text-slate-800 dark:text-slate-100">
                          {company?.postalCode || ""}{" "}
                          {company?.city || "-"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* ACTIONS */}
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <CheckCircle2 size={17} />

                  {isLoading
                    ? "Registering..."
                    : "Register Payment"}
                </button>
              </div>
            </div>

            {/* RIGHT PREVIEW */}
            <aside className="xl:sticky xl:top-[86px] xl:self-start">
              <div className={cardClass}>
                <div className="border-b border-slate-100 px-5 py-5 dark:border-slate-800">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                        <ReceiptText size={19} />
                      </div>

                      <div>
                        <h2 className="font-bold text-slate-900 dark:text-white">
                          Payment Receipt
                        </h2>

                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Real-time preview
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handlePrint}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      Print
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  {/* RECEIPT HEADER */}
                  <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-900/70">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">
                          {company?.company_name || "Company"}
                        </p>

                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          Payment Receipt
                        </p>
                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm dark:bg-slate-800 dark:text-blue-400">
                        <ReceiptText size={18} />
                      </div>
                    </div>

                    <div className="mt-5 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <CalendarDays size={14} />

                      {new Date().toLocaleDateString()}
                    </div>
                  </div>

                  {/* CATEGORY */}
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-slate-200 p-3.5 dark:border-slate-800">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Category
                      </p>

                      <p className="mt-1.5 text-sm font-semibold text-slate-800 dark:text-slate-100">
                        {form.category
                          ? form.category === "CarPurchase"
                            ? "Car Purchase"
                            : form.category === "TirePurchase"
                            ? "Tire Purchase"
                            : form.category ===
                              "Service&Workshop"
                            ? "Service & Workshop"
                            : form.category === "Fuel"
                            ? "Fuel"
                            : form.category === "Expenses"
                            ? "Expenses"
                            : "Other"
                          : "-"}
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 p-3.5 dark:border-slate-800">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Reference
                      </p>

                      <p className="mt-1.5 truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                        {form.reference || "-"}
                      </p>
                    </div>
                  </div>

                  {/* CUSTOMER */}
                  <div className="mt-5">
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Payment Recipient
                    </p>

                    <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                          <UserRound size={16} />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-semibold text-slate-900 dark:text-white">
                            {form.name || "Customer Name"}
                          </p>

                          <div className="mt-2 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                            <p className="flex items-center gap-2">
                              <Phone size={13} />
                              {form.telephone || "-"}
                            </p>

                            <p className="flex min-w-0 items-center gap-2">
                              <Mail size={13} />

                              <span className="truncate">
                                {form.email || "-"}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {person && (
                        <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Address
                          </p>

                          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                            {getPersonAddress(person) || "-"}
                          </p>

                          <p className="text-xs text-slate-600 dark:text-slate-300">
                            {getPersonZip(person)}{" "}
                            {getPersonCity(person)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* PAYMENT INFORMATION */}
                  <div className="mt-5">
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Payment Information
                    </p>

                    <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
                      {form.amounts.map((item, index) => {
                        const amount = Number.parseFloat(
                          String(item.amount).replace(",", ".")
                        );

                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-3 last:border-0 dark:border-slate-800"
                          >
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">
                                {item.description ||
                                  "Payment item"}
                              </p>
                            </div>

                            <p className="shrink-0 text-sm font-semibold text-slate-900 dark:text-white">
                              {Number.isFinite(amount)
                                ? formatAmount(amount)
                                : "0.00"}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  {form.description && (
                    <div className="mt-5 rounded-xl bg-slate-50 p-4 dark:bg-slate-900/60">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Description
                      </p>

                      <p className="text-xs leading-5 text-slate-600 dark:text-slate-300">
                        {form.description}
                      </p>
                    </div>
                  )}

                  {/* TOTAL */}
                  <div className="mt-5 rounded-2xl bg-slate-900 p-5 text-white dark:bg-blue-600">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-blue-100">
                          Total
                        </p>

                        <p className="mt-1 text-xs text-slate-400 dark:text-blue-100">
                          Amount to pay
                        </p>
                      </div>

                      <p className="text-2xl font-bold">
                        {formatAmount(total)}
                      </p>
                    </div>
                  </div>

                  {/* COMPANY INFO */}
                  <div className="mt-5 border-t border-slate-100 pt-5 dark:border-slate-800">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        <MapPin size={14} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                          {company?.company_name || "Company"}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                          {company?.mailingAddress || "-"}
                          <br />
                          {company?.postalCode || ""}{" "}
                          {company?.city || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </form>
      </main>

      <style>{`
        @media print {
          body {
            background: white !important;
          }

          body * {
            visibility: hidden;
          }

          .print-receipt,
          .print-receipt * {
            visibility: visible;
          }

          .print-receipt {
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
}

export default AddPayments;