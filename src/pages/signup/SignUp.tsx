import { useState } from "react";
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { makePostRequest } from "../../api/Api";

const SignUp = () => {
  const [formData, setFormData] = useState({
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
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [validationErrors, setValidationErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible(!confirmPasswordVisible);

  const validateField = (name: string, value: any) => {
    switch (name) {
      case "firstName":
        return !value ? "Förnamn krävs" : "";
      case "lastName":
        return !value ? "Efternamn krävs" : "";
      case "email":
        if (!value) return "E-postadress krävs";
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Ange en giltig e-postadress"
          : "";
      case "phone":
        if (!value) return "Telefonnummer krävs";
        return !/^\+?[0-9\s]+$/.test(value)
          ? "Ange ett giltigt telefonnummer"
          : "";
      case "organizationNumber":
        return !value ? "Organisationsnummer krävs" : "";
      case "companyName":
        return !value ? "Företagsnamn krävs" : "";
      case "password":
        if (!value) return "Lösenord krävs";
        return value.length < 6 ? "Lösenordet måste vara minst 6 tecken" : "";
      case "confirmPassword":
        if (!value) return "Bekräfta lösenord krävs";
        return value !== formData.password ? "Lösenorden matchar inte" : "";
      case "agreeToTerms":
        return !value ? "Du måste godkänna villkoren" : "";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prevState) => ({ ...prevState, [name]: fieldValue }));
    if (touched[name]) {
      setValidationErrors((prev: any) => ({
        ...prev,
        [name]: validateField(name, fieldValue),
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev: any) => ({ ...prev, [name]: true }));
    setValidationErrors((prev: any) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const errors: any = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) errors[key] = error;
    });

    setValidationErrors(errors);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
      agreeToTerms: true,
    });

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        await makePostRequest("auth/signup", {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          organization_number: formData.organizationNumber,
          corp_name: formData.companyName,
          street_address: "",
          registered_city: "",
          postal_code: "",
          city: "",
          company_email: "",
          company_phone: "",
          resourceId: "",
        });

        navigate("/login");
      } catch (err: any) {
        setError(
          err.response?.data?.message || "An unexpected error occurred."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white py-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">DealerPro</h1>
        <p className="mt-2 text-md text-gray-500">
          Skapa ditt konto för att komma igång
        </p>
      </div>

      <div className="w-full max-w-4xl p-8 mx-auto">
        <div className="p-8 border border-gray-200 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Företagsuppgifter
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3 mb-6">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-red-800">
                  Signup failed
                </h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Organization Number */}
              <div>
                <label
                  htmlFor="organizationNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Organisationsnummer  *
                </label>
                <input
                  id="organizationNumber"
                  name="organizationNumber"
                  type="text"
                  required
                  className={`w-full px-4 py-3 text-gray-900 bg-white border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    touched.organizationNumber &&
                    validationErrors.organizationNumber
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                  value={formData.organizationNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.organizationNumber &&
                  validationErrors.organizationNumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {validationErrors.organizationNumber}
                    </p>
                  )}
              </div>

              {/* Company Name */}
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Företagsnamn *
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  required
                  className={`w-full px-4 py-3 text-gray-900 bg-white border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    touched.companyName && validationErrors.companyName
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                  value={formData.companyName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.companyName && validationErrors.companyName && (
                  <p className="mt-1 text-sm text-red-600">
                    {validationErrors.companyName}
                  </p>
                )}
              </div>

              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Förnamn  *
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className={`w-full px-4 py-3 text-gray-900 bg-white border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    touched.firstName && validationErrors.firstName
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // disabled={isLoading}
                />
                {touched.firstName && validationErrors.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {validationErrors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="mt-5">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Efternamn  *
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className={`w-full px-4 py-3 text-gray-900 bg-white border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    touched.lastName && validationErrors.lastName
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // disabled={isLoading}
                />
                {touched.lastName && validationErrors.lastName && (
                  <p className="mt-1 text-sm text-red-600">
                    {validationErrors.lastName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  E-postadress *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`w-full px-4 py-3 text-gray-900 bg-white border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    touched.email && validationErrors.email
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // disabled={isLoading}
                />
                {touched.email && validationErrors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {validationErrors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Telefonnummer *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className={`w-full px-4 py-3 text-gray-900 bg-white border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    touched.phone && validationErrors.phone
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // disabled={isLoading}
                />
                {touched.phone && validationErrors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {validationErrors.phone}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Lösenord *
                </label>
                <input
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  required
                  className={`w-full px-4 py-3 text-gray-900 bg-white border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    touched.password && validationErrors.password
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute bottom-9 right-0 flex items-center pr-3 text-gray-400"
                >
                  {passwordVisible ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
                {touched.password && validationErrors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {validationErrors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Bekräfta lösenord *
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={confirmPasswordVisible ? "text" : "password"}
                  required
                  className={`w-full px-4 py-3 text-gray-900 bg-white border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    touched.confirmPassword && validationErrors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute bottom-9 right-0 flex items-center pr-3 text-gray-400"
                >
                  {confirmPasswordVisible ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
                {touched.confirmPassword &&
                  validationErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {validationErrors.confirmPassword}
                    </p>
                  )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mt-6">
              <div className="flex items-center">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  // disabled={isLoading}
                />
                <label
                  htmlFor="agreeToTerms"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Jag samtycker{" "}
                  <a href="#" className="font-medium hover:underline">
                    till användarvillkoren
                  </a>
                </label>
              </div>
              {touched.agreeToTerms && validationErrors.agreeToTerms && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.agreeToTerms}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full flex justify-center items-center px-4 py-3.5 font-semibold text-white bg-[#002147] rounded-md hover:bg-[#001a38] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    <span>Skapa konto...</span>
                  </>
                ) : (
                  "Skapa konto"
                )}
              </button>
            </div>
          </form>
        </div>

        <p className="mt-8 text-sm text-center text-gray-500">
          Har du redan ett konto?{" "}
          <a
            href="/login"
            className="font-medium text-black hover:underline"
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          >
             Logga in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
