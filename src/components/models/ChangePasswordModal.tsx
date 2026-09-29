import { useState } from "react";
import {
  X,
  LockKeyhole,
  ShieldCheck,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { makePutRequest } from "../../api/Api";
import toast from "react-hot-toast";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
}

const ChangePasswordModal = ({
  isOpen,
  onClose,
  userId,
}: ChangePasswordModalProps) => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  const [isUpdating, setIsUpdating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
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

  const validateForm = () => {
    const newErrors: {
      [key: string]: string;
    } = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsUpdating(true);

    try {
      const response = await makePutRequest(
        `user/changeUserPassword/${userId}/password`,
        {
          password: formData.password,
        }
      );

      if (response.data.success) {
        toast.success(
          "Password changed successfully"
        );

        onClose();

        setFormData({
          password: "",
          confirmPassword: "",
        });

        setErrors({});
      } else {
        throw new Error(
          response.data.message ||
            "Failed to change password"
        );
      }
    } catch (error: any) {
      toast.error(
        error.message ||
          "An error occurred while changing password"
      );
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isOpen) return null;

  const passwordLength = formData.password.length;
  const passwordStrong = passwordLength >= 8;

  return (
    <div
      className="
        fixed inset-0 z-[999]
        flex items-center justify-center
        bg-black/50
        px-3 py-4
        backdrop-blur-sm
        font-plus-jakarta
        sm:px-5
      "
    >
      <div
        className="
          relative flex w-full max-w-[500px]
          max-h-[95vh]
          flex-col
          overflow-hidden
          rounded-2xl
          border border-slate-200
          bg-white
          shadow-2xl
          animate-[modalIn_.25s_ease-out]
          dark:border-slate-800
          dark:bg-[#0b1120]
        "
      >
        {/* Header */}
        <div
          className="
            flex shrink-0
            items-center justify-between
            border-b border-slate-200
            px-5 py-4
            sm:px-6 sm:py-5
            dark:border-slate-800
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-11 w-11 shrink-0
                items-center justify-center
                rounded-xl
                bg-blue-50
                text-blue-600
                dark:bg-blue-500/10
                dark:text-blue-400
              "
            >
              <LockKeyhole className="h-5 w-5" />
            </div>

            <div>
              <h2
                className="
                  text-[17px] font-semibold
                  text-slate-900
                  dark:text-white
                "
              >
                Change Password
              </h2>

              <p
                className="
                  mt-0.5 text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Create a new secure password
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-lg
              text-slate-400
              transition-all duration-200
              hover:bg-slate-100
              hover:text-slate-700
              dark:hover:bg-slate-800
              dark:hover:text-white
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div
          className="
            scrollbar-hide
            flex-1 overflow-y-auto
            px-5 py-5
            sm:px-6 sm:py-6
          "
        >
          <form
            id="change-password-form"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Security Intro */}
            <div
              className="
                flex items-start gap-3
                rounded-xl
                border border-blue-100
                bg-blue-50/60
                p-4
                dark:border-blue-500/20
                dark:bg-blue-500/5
              "
            >
              <div
                className="
                  flex h-9 w-9 shrink-0
                  items-center justify-center
                  rounded-lg
                  bg-white
                  text-blue-600
                  shadow-sm
                  dark:bg-slate-800
                  dark:text-blue-400
                "
              >
                <ShieldCheck className="h-4 w-4" />
              </div>

              <div>
                <p
                  className="
                    text-xs font-semibold
                    text-blue-700
                    dark:text-blue-400
                  "
                >
                  Keep your account secure
                </p>

                <p
                  className="
                    mt-1 text-[11px]
                    leading-5
                    text-blue-600/80
                    dark:text-blue-400/70
                  "
                >
                  Use a strong password that is at least
                  8 characters long and avoid using
                  easily guessed information.
                </p>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label
                htmlFor="password"
                className="
                  mb-2 block
                  text-xs font-semibold
                  text-slate-700
                  dark:text-slate-300
                "
              >
                New Password
                <span className="ml-1 text-red-500">*</span>
              </label>

              <div className="relative">
                <LockKeyhole
                  className="
                    pointer-events-none
                    absolute left-3.5 top-1/2
                    h-4 w-4
                    -translate-y-1/2
                    text-slate-400
                    dark:text-slate-500
                  "
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter new password..."
                  autoComplete="new-password"
                  className={`
                    w-full rounded-xl
                    border
                    bg-slate-50
                    py-3 pl-10 pr-11
                    text-sm
                    text-slate-800
                    outline-none
                    transition-all duration-200
                    placeholder:text-slate-400
                    focus:ring-4
                    focus:ring-blue-500/10
                    dark:bg-slate-900
                    dark:text-slate-200
                    dark:placeholder:text-slate-600
                    ${
                      errors.password
                        ? "border-red-500 focus:border-red-500"
                        : "border-slate-200 focus:border-blue-500 dark:border-slate-700"
                    }
                  `}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="
                    absolute right-3
                    top-1/2
                    flex h-7 w-7
                    -translate-y-1/2
                    items-center justify-center
                    rounded-md
                    text-slate-400
                    transition-colors
                    hover:bg-slate-200
                    hover:text-slate-600
                    dark:hover:bg-slate-800
                    dark:hover:text-slate-300
                  "
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Password Status */}
              <div className="mt-2 flex items-center justify-between">
                {errors.password ? (
                  <div className="flex items-center gap-1.5">
                    <AlertCircle className="h-3.5 w-3.5 text-red-500" />

                    <p className="text-[11px] text-red-500">
                      {errors.password}
                    </p>
                  </div>
                ) : (
                  <p
                    className="
                      text-[11px]
                      text-slate-400
                      dark:text-slate-500
                    "
                  >
                    Minimum 8 characters
                  </p>
                )}

                {formData.password && (
                  <span
                    className={`
                      text-[11px] font-medium
                      ${
                        passwordStrong
                          ? "text-emerald-500"
                          : "text-amber-500"
                      }
                    `}
                  >
                    {passwordStrong
                      ? "Valid password"
                      : `${passwordLength}/8 characters`}
                  </span>
                )}
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="
                  mb-2 block
                  text-xs font-semibold
                  text-slate-700
                  dark:text-slate-300
                "
              >
                Confirm Password
                <span className="ml-1 text-red-500">*</span>
              </label>

              <div className="relative">
                <ShieldCheck
                  className="
                    pointer-events-none
                    absolute left-3.5 top-1/2
                    h-4 w-4
                    -translate-y-1/2
                    text-slate-400
                    dark:text-slate-500
                  "
                />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm new password..."
                  autoComplete="new-password"
                  className={`
                    w-full rounded-xl
                    border
                    bg-slate-50
                    py-3 pl-10 pr-11
                    text-sm
                    text-slate-800
                    outline-none
                    transition-all duration-200
                    placeholder:text-slate-400
                    focus:ring-4
                    focus:ring-blue-500/10
                    dark:bg-slate-900
                    dark:text-slate-200
                    dark:placeholder:text-slate-600
                    ${
                      errors.confirmPassword
                        ? "border-red-500 focus:border-red-500"
                        : "border-slate-200 focus:border-blue-500 dark:border-slate-700"
                    }
                  `}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (prev) => !prev
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="
                    absolute right-3
                    top-1/2
                    flex h-7 w-7
                    -translate-y-1/2
                    items-center justify-center
                    rounded-md
                    text-slate-400
                    transition-colors
                    hover:bg-slate-200
                    hover:text-slate-600
                    dark:hover:bg-slate-800
                    dark:hover:text-slate-300
                  "
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {errors.confirmPassword ? (
                <div className="mt-2 flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5 text-red-500" />

                  <p className="text-[11px] text-red-500">
                    {errors.confirmPassword}
                  </p>
                </div>
              ) : (
                formData.confirmPassword &&
                formData.password ===
                  formData.confirmPassword && (
                  <div className="mt-2 flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />

                    <p className="text-[11px] text-emerald-500">
                      Passwords match
                    </p>
                  </div>
                )
              )}
            </div>
          </form>
        </div>

        {/* Footer */}
        <div
          className="
            shrink-0
            border-t border-slate-200
            bg-white/95
            px-5 py-4
            backdrop-blur
            sm:px-6 sm:py-5
            dark:border-slate-800
            dark:bg-[#0b1120]/95
          "
        >
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isUpdating}
              className="
                w-full rounded-xl
                border border-slate-200
                bg-white
                px-5 py-3
                text-sm font-semibold
                text-slate-700
                transition-all duration-200
                hover:bg-slate-50
                disabled:cursor-not-allowed
                disabled:opacity-50
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-slate-200
                dark:hover:bg-slate-800
                sm:w-auto
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              form="change-password-form"
              disabled={
                isUpdating ||
                !formData.password ||
                !formData.confirmPassword
              }
              className="
                flex w-full
                items-center justify-center
                gap-2
                rounded-xl
                bg-[#012F7A]
                px-5 py-3
                text-sm font-semibold
                text-white
                shadow-lg
                shadow-blue-900/20
                transition-all duration-200
                hover:bg-blue-700
                hover:shadow-blue-600/30
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-40
                disabled:shadow-none
                sm:w-auto
              "
            >
              {isUpdating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <LockKeyhole className="h-4 w-4" />
                  Change Password
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
      `}</style>
    </div>
  );
};

export default ChangePasswordModal;