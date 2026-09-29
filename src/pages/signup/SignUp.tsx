import { useState } from "react";
import {
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  ArrowLeft,
  ShieldCheck,
  CarFront,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { makePostRequest } from "../../api/Api";
import ThemeToggle from "../../theme/ThemeToggle";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  organizationNumber: string;
  companyName: string;
  agreeToTerms: boolean;
}

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  organizationNumber?: string;
  companyName?: string;
  agreeToTerms?: string;
}

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    organizationNumber: "",
    companyName: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const updateField = (
    field: keyof FormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));

    setServerError("");
  };

  const validate = () => {
    const newErrors: ValidationErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s-]+$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.organizationNumber.trim()) {
      newErrors.organizationNumber =
        "Organization number is required";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms =
        "Please accept the terms and conditions";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setServerError("");

    try {
      const response = await makePostRequest("auth/signup", {
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        organization_number:
          formData.organizationNumber.trim(),
        corp_name: formData.companyName.trim(),

        // Existing backend fields
        street_address: "",
        registered_city: "",
        postal_code: "",
        city: "",
        company_email: "",
        company_phone: "",
        resourceId: "",
      });

      console.log("Signup response:", response);

      navigate("/login", {
        replace: true,
      });
    } catch (error: any) {
      console.error("Signup error:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Unable to create your account. Please try again.";

      setServerError(message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (hasError?: boolean) => `
    h-[42px]
    w-full
    rounded-xl
    border
    px-3.5
    text-[13px]
    outline-none
    transition-all
    ${
      hasError
        ? "border-red-400 bg-red-50/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/10 dark:border-red-500/60 dark:bg-red-950/10"
        : "border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900/70 dark:focus:border-blue-500"
    }
    text-slate-900
    placeholder:text-slate-400
    dark:text-white
    dark:placeholder:text-slate-500
  `;

  const labelClass =
    "mb-1.5 block text-[11px] font-bold uppercase tracking-[0.04em] text-slate-600 dark:text-slate-300";

  const errorClass =
    "mt-1 text-[10px] font-medium text-red-500";

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#f5f7fb] font-plus-jakarta dark:bg-[#060b14]">
      {/* Theme */}
      <ThemeToggle />

      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="absolute left-1/2 top-0 h-px w-[65%] -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      </div>

      {/* Main container */}
      <div className="relative flex h-full w-full items-center justify-center p-3 sm:p-5 lg:p-6">
        <div className="flex h-full max-h-[720px] w-full max-w-[1080px] overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_25px_70px_rgba(15,23,42,0.12)] dark:border-slate-800 dark:bg-[#0b1220] dark:shadow-black/40">

          {/* LEFT BRAND PANEL */}
          <div className="relative hidden w-[38%] overflow-hidden bg-[#002147] lg:flex">
            <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full border border-white/[0.08]" />

            <div className="absolute -bottom-32 -left-28 h-80 w-80 rounded-full border border-white/[0.08]" />

            <div className="relative z-10 flex h-full w-full flex-col justify-between p-9">
              <div>
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="mb-8 flex items-center gap-2 text-xs font-semibold text-blue-100/65 transition hover:text-white"
                >
                  <ArrowLeft size={15} />
                  Back to website
                </button>

                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                  <CarFront
                    size={22}
                    className="text-white"
                  />
                </div>

                <h1 className="max-w-xs text-[30px] font-extrabold leading-[1.15] tracking-tight text-white">
                  Grow your dealership with DealerPro.
                </h1>

                <p className="mt-4 max-w-xs text-[13px] leading-6 text-blue-100/65">
                  Manage vehicles, customers, agreements,
                  payments and invoices from one powerful
                  platform.
                </p>
              </div>

              <div>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                    <ShieldCheck
                      size={17}
                      className="text-blue-200"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-white">
                      Secure & reliable
                    </p>

                    <p className="mt-0.5 text-[10px] text-blue-100/45">
                      Built for modern dealerships.
                    </p>
                  </div>
                </div>

                <div className="h-px w-full bg-white/10" />

                <p className="mt-4 text-[10px] text-blue-100/35">
                  © {new Date().getFullYear()} DealerPro
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

            {/* Mobile Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800 lg:hidden">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300"
              >
                <ArrowLeft size={15} />
                Back
              </button>

              <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900 dark:text-white">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#002147] text-white">
                  <CarFront size={14} />
                </div>

                DealerPro
              </div>
            </div>

            {/* Form */}
            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center px-5 py-6 sm:px-8 lg:px-10">
                <div className="w-full max-w-[600px]">

                  {/* Heading */}
                  <div className="mb-5">
                    <p className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                      DealerPro Account
                    </p>

                    <h2 className="text-[26px] font-extrabold tracking-tight text-slate-900 dark:text-white">
                      Create your account
                    </h2>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Set up your dealership account in a few
                      simple steps.
                    </p>
                  </div>

                  {/* Server Error */}
                  {serverError && (
                    <div className="mb-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-300">
                      <AlertCircle
                        size={16}
                        className="mt-0.5 shrink-0"
                      />

                      <span>{serverError}</span>
                    </div>
                  )}

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-3.5"
                  >

                    {/* NAME */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                      {/* First Name */}
                      <div>
                        <label className={labelClass}>
                          First name
                        </label>

                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) =>
                            updateField(
                              "firstName",
                              e.target.value
                            )
                          }
                          placeholder="John"
                          autoComplete="given-name"
                          className={inputClass(
                            !!errors.firstName
                          )}
                        />

                        {errors.firstName && (
                          <p className={errorClass}>
                            {errors.firstName}
                          </p>
                        )}
                      </div>

                      {/* Last Name */}
                      <div>
                        <label className={labelClass}>
                          Last name
                        </label>

                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) =>
                            updateField(
                              "lastName",
                              e.target.value
                            )
                          }
                          placeholder="Doe"
                          autoComplete="family-name"
                          className={inputClass(
                            !!errors.lastName
                          )}
                        />

                        {errors.lastName && (
                          <p className={errorClass}>
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* CONTACT */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                      {/* Email */}
                      <div>
                        <label className={labelClass}>
                          Email address
                        </label>

                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            updateField(
                              "email",
                              e.target.value
                            )
                          }
                          placeholder="john@company.com"
                          autoComplete="email"
                          className={inputClass(
                            !!errors.email
                          )}
                        />

                        {errors.email && (
                          <p className={errorClass}>
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className={labelClass}>
                          Phone number
                        </label>

                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            updateField(
                              "phone",
                              e.target.value
                            )
                          }
                          placeholder="+46 70 123 45 67"
                          autoComplete="tel"
                          className={inputClass(
                            !!errors.phone
                          )}
                        />

                        {errors.phone && (
                          <p className={errorClass}>
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* COMPANY */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                      {/* Company */}
                      <div>
                        <label className={labelClass}>
                          Company name
                        </label>

                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) =>
                            updateField(
                              "companyName",
                              e.target.value
                            )
                          }
                          placeholder="DealerPro Motors"
                          autoComplete="organization"
                          className={inputClass(
                            !!errors.companyName
                          )}
                        />

                        {errors.companyName && (
                          <p className={errorClass}>
                            {errors.companyName}
                          </p>
                        )}
                      </div>

                      {/* Organization */}
                      <div>
                        <label className={labelClass}>
                          Organization number
                        </label>

                        <input
                          type="text"
                          value={
                            formData.organizationNumber
                          }
                          onChange={(e) =>
                            updateField(
                              "organizationNumber",
                              e.target.value
                            )
                          }
                          placeholder="556123-4567"
                          className={inputClass(
                            !!errors.organizationNumber
                          )}
                        />

                        {errors.organizationNumber && (
                          <p className={errorClass}>
                            {errors.organizationNumber}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* PASSWORD */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                      {/* Password */}
                      <div>
                        <label className={labelClass}>
                          Password
                        </label>

                        <div className="relative">
                          <input
                            type={
                              showPassword
                                ? "text"
                                : "password"
                            }
                            value={formData.password}
                            onChange={(e) =>
                              updateField(
                                "password",
                                e.target.value
                              )
                            }
                            placeholder="••••••••"
                            autoComplete="new-password"
                            className={`${inputClass(
                              !!errors.password
                            )} pr-10`}
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowPassword(
                                (prev) => !prev
                              )
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700 dark:hover:text-white"
                            aria-label={
                              showPassword
                                ? "Hide password"
                                : "Show password"
                            }
                          >
                            {showPassword ? (
                              <EyeOff size={16} />
                            ) : (
                              <Eye size={16} />
                            )}
                          </button>
                        </div>

                        {errors.password && (
                          <p className={errorClass}>
                            {errors.password}
                          </p>
                        )}
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <label className={labelClass}>
                          Confirm password
                        </label>

                        <div className="relative">
                          <input
                            type={
                              showConfirmPassword
                                ? "text"
                                : "password"
                            }
                            value={
                              formData.confirmPassword
                            }
                            onChange={(e) =>
                              updateField(
                                "confirmPassword",
                                e.target.value
                              )
                            }
                            placeholder="••••••••"
                            autoComplete="new-password"
                            className={`${inputClass(
                              !!errors.confirmPassword
                            )} pr-10`}
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(
                                (prev) => !prev
                              )
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700 dark:hover:text-white"
                            aria-label={
                              showConfirmPassword
                                ? "Hide confirm password"
                                : "Show confirm password"
                            }
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={16} />
                            ) : (
                              <Eye size={16} />
                            )}
                          </button>
                        </div>

                        {errors.confirmPassword && (
                          <p className={errorClass}>
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* TERMS */}
                    <div className="pt-0.5">
                      <label className="flex cursor-pointer items-start gap-2">
                        <input
                          type="checkbox"
                          checked={formData.agreeToTerms}
                          onChange={(e) =>
                            updateField(
                              "agreeToTerms",
                              e.target.checked
                            )
                          }
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 cursor-pointer rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />

                        <span className="text-[11px] leading-4.5 text-slate-500 dark:text-slate-400">
                          I agree to the{" "}
                          <span className="font-bold text-blue-600 dark:text-blue-400">
                            Terms & Conditions
                          </span>{" "}
                          and{" "}
                          <span className="font-bold text-blue-600 dark:text-blue-400">
                            Privacy Policy
                          </span>
                          .
                        </span>
                      </label>

                      {errors.agreeToTerms && (
                        <p className={errorClass}>
                          {errors.agreeToTerms}
                        </p>
                      )}
                    </div>

                    {/* BUTTON */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex h-[43px] w-full items-center justify-center gap-2 rounded-xl bg-[#002147] text-xs font-bold text-white shadow-lg shadow-blue-950/15 transition-all hover:bg-[#00305f] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-600 dark:hover:bg-blue-500"
                    >
                      {loading ? (
                        <>
                          <Loader2
                            size={16}
                            className="animate-spin"
                          />
                          Creating account...
                        </>
                      ) : (
                        "Create account"
                      )}
                    </button>
                  </form>

                  {/* LOGIN */}
                  <p className="mt-4 text-center text-[11px] text-slate-500 dark:text-slate-400">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => navigate("/login")}
                      className="font-bold text-blue-600 transition hover:text-blue-700 hover:underline dark:text-blue-400"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prevent outer browser scrollbar */}
      <style>{`
        html,
        body,
        #root {
          height: 100%;
          margin: 0;
        }

        body {
          overflow: hidden;
        }

        * {
          scrollbar-width: none;
        }

        *::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
      `}</style>
    </div>
  );
};

export default SignUp;
