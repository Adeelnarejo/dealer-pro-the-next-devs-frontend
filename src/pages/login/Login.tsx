import { useState } from "react";
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { makePostRequest } from "../../api/Api";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [validationErrors, setValidationErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "email":
        if (!value) return "E-postadress krävs";
        if (!validateEmail(value)) return "Ange en giltig e-postadress";
        return "";
      case "password":
        if (!value) return "Lösenord krävs";
        if (!validatePassword(value))
          return "Lösenordet måste vara minst 6 tecken långt";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: fieldValue,
    }));

    if (validationErrors[name]) {
      setValidationErrors((prev: any) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev: any) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setValidationErrors((prev: any) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const errors: any = {};
    const fieldsToValidate: ("email" | "password")[] = ["email", "password"];

    fieldsToValidate.forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) errors[key] = error;
    });

    setValidationErrors(errors);
    setTouched({ email: true, password: true });

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        const response = await makePostRequest("auth/login", {
          email: formData.email,
          password: formData.password,
        });
        console.log("Login successful:", response);
        if (response.data.data.tokens.accessToken) {
          localStorage.setItem("token", response.data.data.tokens.accessToken);
          // Store user ID in localStorage
          localStorage.setItem("userId", response.data.data.user.id);
          localStorage.setItem("role", response.data.data.user.type);
          navigate("/");
        }
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
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">DealerPro</h1>
          <p className="mt-2 text-sm text-gray-500">
            Välkommen tillbaka! Logga in på ditt konto
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-red-800">
                Inloggningen misslyckades
              </h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={`w-full px-4 py-3 text-gray-900 bg-white border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                touched.email && validationErrors.email
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isLoading}
            />
            {touched.email && validationErrors.email && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {validationErrors.email}
              </p>
            )}
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={passwordVisible ? "text" : "password"}
              autoComplete="current-password"
              required
              className={`w-full px-4 py-3 text-gray-900 bg-white border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                touched.password && validationErrors.password
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
              disabled={isLoading}
            >
              {passwordVisible ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {touched.password && validationErrors.password && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {validationErrors.password}
            </p>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                checked={formData.rememberMe}
                onChange={handleChange}
                disabled={isLoading}
              />
              <label
                htmlFor="rememberMe"
                className="block ml-2 text-sm text-gray-700"
              >
                Kom ihåg mig
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-gray-700 hover:text-black"
              >
                Glömt lösenord?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center px-4 py-3 font-semibold text-white bg-[#002147] rounded-md hover:bg-[#001a38] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  <span>Logga in...</span>
                </>
              ) : (
                "Logga in"
              )}
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-500">
          Har du inget konto? Skapa ett{" "}
          <a href="/signup" className="font-medium text-black hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
