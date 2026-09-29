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
  email: string;
  password: string;
  rememberMe: boolean;
}

interface ValidationErrors {
  email?: string;
  password?: string;
}

interface TouchedFields {
  email?: boolean;
  password?: boolean;
}

interface LoginUser {
  id?: number | string;
  user_id?: number | string;

  first_name?: string;
  last_name?: string;

  firstName?: string;
  lastName?: string;

  first?: string;
  last?: string;

  full_name?: string;
  fullName?: string;

  name?: string;

  email?: string;
  phone?: string;

  type?: string;
  role?: string;

  [key: string]: any;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [passwordVisible, setPasswordVisible] =
    useState(false);

  const [validationErrors, setValidationErrors] =
    useState<ValidationErrors>({});

  const [touched, setTouched] =
    useState<TouchedFields>({});

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // =========================================================
  // PASSWORD VISIBILITY
  // =========================================================

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  // =========================================================
  // VALIDATION
  // =========================================================

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email.trim()
    );
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const validateField = (
    name: string,
    value: string
  ) => {
    switch (name) {
      case "email":
        if (!value.trim()) {
          return "Email address is required.";
        }

        if (!validateEmail(value)) {
          return "Please enter a valid email address.";
        }

        return "";

      case "password":
        if (!value) {
          return "Password is required.";
        }

        if (!validatePassword(value)) {
          return "Password must be at least 6 characters.";
        }

        return "";

      default:
        return "";
    }
  };

  // =========================================================
  // INPUT CHANGE
  // =========================================================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    const fieldValue =
      type === "checkbox"
        ? checked
        : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    if (
      validationErrors[
        name as keyof ValidationErrors
      ]
    ) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (error) {
      setError(null);
    }
  };

  // =========================================================
  // INPUT BLUR
  // =========================================================

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    const {
      name,
      value,
    } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const fieldError =
      validateField(name, value);

    setValidationErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  // =========================================================
  // NORMALIZE USER
  // =========================================================

  const normalizeUser = (
    rawUser: LoginUser | null | undefined
  ): LoginUser | null => {
    if (!rawUser) {
      return null;
    }

    const firstName =
      rawUser.first_name ||
      rawUser.firstName ||
      rawUser.first ||
      "";

    const lastName =
      rawUser.last_name ||
      rawUser.lastName ||
      rawUser.last ||
      "";

    const fullName =
      rawUser.full_name ||
      rawUser.fullName ||
      rawUser.name ||
      `${firstName} ${lastName}`.trim();

    const id =
      rawUser.id ??
      rawUser.user_id;

    const role =
      rawUser.type ||
      rawUser.role ||
      "";

    return {
      ...rawUser,

      id,

      user_id:
        rawUser.user_id ??
        rawUser.id,

      first_name: firstName,
      last_name: lastName,

      firstName,
      lastName,

      full_name: fullName,
      fullName,

      name: fullName,

      email:
        rawUser.email ||
        formData.email.trim(),

      type: role,
      role,
    };
  };

  // =========================================================
  // SAVE USER SESSION
  // =========================================================

  const saveLoginSession = (
    accessToken: string,
    rawUser: LoginUser | null | undefined
  ) => {
    const user = normalizeUser(rawUser);

    // Token
    sessionStorage.setItem(
      "token",
      accessToken
    );

    // User object
    if (user) {
      sessionStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      console.log(
        "LOGIN USER SAVED:",
        user
      );

      // First / Last name separately
      if (user.first_name) {
        sessionStorage.setItem(
          "firstName",
          user.first_name
        );
      }

      if (user.last_name) {
        sessionStorage.setItem(
          "lastName",
          user.last_name
        );
      }

      // Full name
      if (user.full_name) {
        sessionStorage.setItem(
          "fullName",
          user.full_name
        );
      }

      // Email
      if (user.email) {
        sessionStorage.setItem(
          "email",
          user.email
        );
      }

      // User ID
      if (user.id !== undefined) {
        sessionStorage.setItem(
          "userId",
          String(user.id)
        );
      }

      // Role
      if (user.type) {
        sessionStorage.setItem(
          "role",
          user.type
        );
      } else if (user.role) {
        sessionStorage.setItem(
          "role",
          user.role
        );
      }
    }

    // Tell application that auth changed
    window.dispatchEvent(
      new Event("auth-change")
    );
  };

  // =========================================================
  // LOGIN
  // =========================================================

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError(null);

    const errors: ValidationErrors = {};

    const fieldsToValidate: (
      | "email"
      | "password"
    )[] = [
      "email",
      "password",
    ];

    fieldsToValidate.forEach((key) => {
      const fieldError = validateField(
        key,
        formData[key]
      );

      if (fieldError) {
        errors[key] = fieldError;
      }
    });

    setValidationErrors(errors);

    setTouched({
      email: true,
      password: true,
    });

    if (Object.keys(errors).length !== 0) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await makePostRequest(
        "auth/login",
        {
          email: formData.email.trim(),
          password: formData.password,
        }
      );

      console.log(
        "LOGIN RESPONSE:",
        response
      );

      // =====================================================
      // GET TOKEN
      // =====================================================

      const accessToken =
        response?.data?.data?.tokens?.accessToken;

      // =====================================================
      // GET USER
      // =====================================================

      const rawUser =
        response?.data?.data?.user;

      console.log(
        "LOGIN USER FROM BACKEND:",
        rawUser
      );

      if (!accessToken) {
        throw new Error(
          "Login successful but access token was not returned."
        );
      }

      // =====================================================
      // SAVE SESSION
      // =====================================================

      saveLoginSession(
        accessToken,
        rawUser
      );

      // =====================================================
      // GO TO DASHBOARD
      // =====================================================

      navigate("/dashboard", {
        replace: true,
      });
    } catch (err: any) {
      console.error(
        "Login error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Unable to sign in. Please check your email and password."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================================
  // INPUT STYLE
  // =========================================================

  const inputClass = (
    field: keyof ValidationErrors
  ) =>
    `w-full rounded-xl border bg-gray-50 px-4 py-3.5 text-sm
    text-gray-900 outline-none transition
    placeholder:text-gray-400
    focus:bg-white focus:ring-4 focus:ring-blue-500/10
    dark:border-slate-700
    dark:bg-slate-800
    dark:text-white
    dark:placeholder:text-slate-500
    dark:focus:bg-slate-800
    dark:focus:ring-blue-500/10
    ${
      touched[field] &&
      validationErrors[field]
        ? "border-red-500 focus:border-red-500"
        : "border-gray-200 focus:border-blue-500 dark:focus:border-blue-500"
    }`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f5f8fc] font-plus-jakarta transition-colors duration-300 dark:bg-[#07111f]">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-900/20" />

        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-700/20" />

        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-3xl dark:bg-slate-900/40" />
      </div>

      {/* =====================================================
          TOP CONTROLS
      ===================================================== */}

      <div className="absolute right-5 top-5 z-30 sm:right-8 sm:top-8">
        <ThemeToggle />
      </div>

      {/* Back */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="absolute left-5 top-5 z-30 flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-600 shadow-sm backdrop-blur-md transition hover:bg-white hover:text-gray-900 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white sm:left-8 sm:top-8"
      >
        <ArrowLeft size={16} />
        <span>Back to home</span>
      </button>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-20 sm:px-6">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white bg-white shadow-[0_25px_80px_rgba(15,23,42,0.12)] transition-colors duration-300 dark:border-slate-800 dark:bg-[#0b1728] dark:shadow-[0_25px_80px_rgba(0,0,0,0.35)] lg:grid-cols-[0.9fr_1.1fr]">

          {/* =================================================
              LEFT BRAND PANEL
          ================================================= */}

          <div className="relative hidden overflow-hidden bg-[#002147] p-10 lg:flex lg:flex-col lg:justify-between">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />

            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-white/10" />

            <div className="absolute right-10 top-40 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl" />

            {/* Brand */}
            <div className="relative z-10">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-2xl font-extrabold tracking-tight text-white"
              >
                Dealer
                <span className="text-blue-400">
                  Pro
                </span>
              </button>

              <div className="mt-16 max-w-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-blue-300">
                  <CarFront size={25} />
                </div>

                <h2 className="text-4xl font-bold leading-tight text-white">
                  Your dealership.
                  <br />
                  <span className="text-blue-300">
                    Simplified.
                  </span>
                </h2>

                <p className="mt-5 text-sm leading-6 text-blue-100/70">
                  Manage your vehicles, customers,
                  agreements and dealership operations
                  from one powerful platform.
                </p>
              </div>
            </div>

            {/* Trust */}
            <div className="relative z-10 flex items-center gap-3 border-t border-white/10 pt-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-blue-300">
                <ShieldCheck size={18} />
              </div>

              <div>
                <p className="text-xs font-semibold text-white">
                  Secure & reliable
                </p>

                <p className="mt-0.5 text-[11px] text-blue-100/50">
                  Your dealership data is protected
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              LOGIN FORM
          ================================================= */}

          <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">

            {/* Mobile Logo */}
            <div className="mb-8 text-center lg:hidden">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-2xl font-extrabold tracking-tight text-[#002147] dark:text-white"
              >
                Dealer
                <span className="text-blue-600">
                  Pro
                </span>
              </button>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-600">
                Welcome back
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Sign in to DealerPro
              </h1>

              <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-slate-400">
                Access your dealership dashboard and
                manage your business.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/30">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />

                <div>
                  <h3 className="text-sm font-semibold text-red-800 dark:text-red-400">
                    Sign in failed
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-red-700 dark:text-red-300">
                    {error}
                  </p>
                </div>
              </div>
            )}

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5"
            >

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700 dark:text-slate-300"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isLoading}
                  className={inputClass("email")}
                />

                {touched.email &&
                  validationErrors.email && (
                    <p className="mt-2 flex items-center gap-1 text-xs text-red-600">
                      <AlertCircle size={14} />
                      {validationErrors.email}
                    </p>
                  )}
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700 dark:text-slate-300"
                  >
                    Password
                  </label>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={
                      passwordVisible
                        ? "text"
                        : "password"
                    }
                    autoComplete="current-password"
                    required
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isLoading}
                    className={`${inputClass(
                      "password"
                    )} pr-12`}
                  />

                  <button
                    type="button"
                    onClick={
                      togglePasswordVisibility
                    }
                    disabled={isLoading}
                    aria-label={
                      passwordVisible
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 transition hover:text-gray-700 dark:hover:text-white"
                  >
                    {passwordVisible ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>

                {touched.password &&
                  validationErrors.password && (
                    <p className="mt-2 flex items-center gap-1 text-xs text-red-600">
                      <AlertCircle size={14} />
                      {validationErrors.password}
                    </p>
                  )}
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between gap-4">
                <label
                  htmlFor="rememberMe"
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800"
                  />

                  <span className="text-sm text-gray-600 dark:text-slate-400">
                    Remember me
                  </span>
                </label>

                <button
                  type="button"
                  className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-[#002147] px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#002147]/15 transition-all duration-200 hover:bg-[#00305f] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            {/* Signup */}
            <p className="mt-8 text-center text-sm text-gray-500 dark:text-slate-400">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="font-bold text-blue-600 transition hover:text-blue-700 hover:underline"
              >
                Create an account
              </button>
            </p>

            {/* Security */}
            <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-gray-400 dark:text-slate-600">
              <ShieldCheck size={14} />
              <span>
                Secure login · DealerPro
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Prevent outer browser scrollbar */}
      <style>{`
        html,
        body,
        #root {
          min-height: 100%;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default Login;
