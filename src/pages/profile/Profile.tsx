import EditProfile from "../../components/Profile/editProfile/EditProfile";
import { useEffect, useState } from "react";
import { DeleteAccountIcon } from "../../components/utils/Icons";
import DeletePopup from "../../components/models/DeletePopup";
import { useUserProfile } from "../../utils/useUserProfile";

import {
  getProfileInitials,
  getRandomColor,
} from "../../utils/profileUtils";

import {
  Loader2,
  User,
  Building2,
  MapPin,
  Phone,
  CreditCard,
  FileText,
  ClipboardList,
  ShieldCheck,
  Trash2,
  ChevronRight,
} from "lucide-react";

import { makeDeleteRequest } from "../../api/Api";
import { useNavigate } from "react-router-dom";
import type { SectionKey } from "../../components/Profile/editProfile/EditProfile";

// =========================================================
// USER TYPE
// =========================================================

interface StoredUser {
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

  type?: string;
  role?: string;
}

// =========================================================
// PROFILE
// =========================================================

const Profile = () => {
  const [showDeletePopup, setShowDeletePopup] =
    useState(false);

  const [isDeleting, setIsDeleting] =
    useState(false);

  const [deleteError, setDeleteError] =
    useState<string | null>(null);

  const [storedUser, setStoredUser] =
    useState<StoredUser | null>(null);

  const {
    user,
    loading,
    error,
    refetch,
  } = useUserProfile();

  const navigate = useNavigate();

  // =========================================================
  // LOAD USER FROM SESSION STORAGE
  // =========================================================

  const loadStoredUser = () => {
    try {
      const userData =
        sessionStorage.getItem("user");

      if (!userData) {
        setStoredUser(null);
        return;
      }

      const parsedUser =
        JSON.parse(userData);

      console.log(
        "PROFILE SESSION USER:",
        parsedUser
      );

      setStoredUser(parsedUser);
    } catch (err) {
      console.error(
        "Failed to read session user:",
        err
      );

      setStoredUser(null);
    }
  };

  useEffect(() => {
    loadStoredUser();

    const handleAuthChange = () => {
      loadStoredUser();
    };

    window.addEventListener(
      "auth-change",
      handleAuthChange
    );

    return () => {
      window.removeEventListener(
        "auth-change",
        handleAuthChange
      );
    };
  }, []);

  // =========================================================
  // FIRST NAME
  // =========================================================

  const firstName =
    storedUser?.first_name ||
    storedUser?.firstName ||
    storedUser?.first ||
    (user as any)?.first_name ||
    (user as any)?.firstName ||
    (user as any)?.first ||
    "";

  // =========================================================
  // LAST NAME
  // =========================================================

  const lastName =
    storedUser?.last_name ||
    storedUser?.lastName ||
    storedUser?.last ||
    (user as any)?.last_name ||
    (user as any)?.lastName ||
    (user as any)?.last ||
    "";

  // =========================================================
  // EMAIL
  // =========================================================

  const email =
    storedUser?.email ||
    (user as any)?.email ||
    "";

  // =========================================================
  // FULL NAME
  // =========================================================

  let fullName =
    `${firstName} ${lastName}`.trim();

  // If first/last are not directly available,
  // try full_name / fullName / name.

  if (!fullName) {
    fullName =
      storedUser?.full_name ||
      storedUser?.fullName ||
      storedUser?.name ||
      (user as any)?.full_name ||
      (user as any)?.fullName ||
      (user as any)?.name ||
      "Guest";
  }

  // =========================================================
  // USER ID
  // =========================================================

  const userId =
    storedUser?.user_id ||
    storedUser?.id ||
    (user as any)?.user_id ||
    (user as any)?.id ||
    sessionStorage.getItem("userId") ||
    "profile";

  // =========================================================
  // INITIALS
  // =========================================================

  let profileInitials = "GU";

  if (firstName || lastName) {
    profileInitials =
      getProfileInitials(
        firstName,
        lastName
      );
  } else if (fullName !== "Guest") {
    profileInitials = fullName
      .split(" ")
      .filter(Boolean)
      .map((name) =>
        name.charAt(0)
      )
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  // =========================================================
  // PROFILE COLOR
  // =========================================================

  const profileColor =
    getRandomColor(userId);

  // =========================================================
  // UPDATE PROFILE
  // =========================================================

  const handleUpdateSuccess = () => {
    refetch();
    loadStoredUser();
  };

  // =========================================================
  // DELETE ACCOUNT
  // =========================================================

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    setDeleteError(null);

    try {
      const token =
        sessionStorage.getItem("token") ||
        localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "Authentication token not found."
        );
      }

      const response =
        await makeDeleteRequest(
          "auth/delete-account",
          {
            headers: {
              "Content-Type":
                "application/json",
              token,
            },
          }
        );

      if (response?.data?.success) {
        localStorage.clear();
        sessionStorage.clear();

        window.dispatchEvent(
          new Event("auth-change")
        );

        navigate("/login", {
          replace: true,
        });
      } else {
        throw new Error(
          response?.data?.message ||
            "Failed to delete account"
        );
      }
    } catch (err: any) {
      console.error(
        "Error deleting account:",
        err
      );

      setDeleteError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to delete account. Please try again."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] dark:bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-[#002147] flex items-center justify-center shadow-lg shadow-blue-900/20">
            <Loader2 className="w-7 h-7 text-white animate-spin" />
          </div>

          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Loading your profile...
          </p>

        </div>
      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error && !storedUser) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] dark:bg-slate-950 flex items-center justify-center px-4">

        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-red-100 dark:border-red-900/40 p-8 text-center shadow-xl">

          <div className="w-14 h-14 mx-auto rounded-2xl bg-red-50 dark:bg-red-950/40 flex items-center justify-center mb-5">
            <ShieldCheck className="w-7 h-7 text-red-500" />
          </div>

          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Unable to load profile
          </h2>

          <p className="mt-2 text-sm text-red-500">
            {error}
          </p>

          <button
            onClick={() => refetch()}
            className="
              mt-6
              px-5
              py-2.5
              rounded-xl
              bg-[#002147]
              hover:bg-[#00356f]
              text-white
              text-sm
              font-semibold
              transition-all
            "
          >
            Try Again
          </button>

        </div>
      </div>
    );
  }

  // =========================================================
  // PROFILE SECTIONS
  // =========================================================

  const sections: {
    key: SectionKey;
    title: string;
    description: string;
    icon: any;
  }[] = [
    {
      key: "company_information",
      title: "Company Information",
      description:
        "Manage your dealership and business details.",
      icon: Building2,
    },
    {
      key: "address_details",
      title: "Address Details",
      description:
        "Update your dealership location and address.",
      icon: MapPin,
    },
    {
      key: "contact_information",
      title: "Contact Information",
      description:
        "Manage your phone numbers and contact details.",
      icon: Phone,
    },
    {
      key: "payment_settings",
      title: "Payment Settings",
      description:
        "Configure your dealership payment information.",
      icon: CreditCard,
    },
    {
      key: "invoice_settings",
      title: "Invoice Settings",
      description:
        "Manage invoice and billing preferences.",
      icon: FileText,
    },
    {
      key: "contract_settings",
      title: "Contract Settings",
      description:
        "Configure your dealership agreement settings.",
      icon: ClipboardList,
    },
  ];

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-slate-950 font-plus-jakarta pb-12">

      {/* =====================================================
          DELETE POPUP
      ===================================================== */}

      {showDeletePopup && (
        <DeletePopup
          entityName="Account"
          onCancel={() =>
            setShowDeletePopup(false)
          }
          onDelete={handleDeleteAccount}
          isDeleting={isDeleting}
        />
      )}

      {/* =====================================================
          PROFILE HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#002147] dark:bg-[#020d1c]">

        {/* Background decoration */}

        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="absolute top-0 right-0 w-full h-full opacity-[0.04]">

            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize:
                  "40px 40px",
              }}
            />

          </div>

        </div>

        <div className="relative max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}

          <div className="pt-6 flex items-center gap-2 text-xs text-blue-100/70">

            <span>
              DealerPro
            </span>

            <ChevronRight className="w-3.5 h-3.5" />

            <span className="text-white">
              Profile
            </span>

          </div>

          {/* Profile content */}

          <div className="py-8 sm:py-10 flex flex-col md:flex-row md:items-center gap-6">

            {/* Avatar */}

            <div className="relative shrink-0">

              <div
                className="
                  w-24
                  h-24
                  sm:w-28
                  sm:h-28
                  rounded-3xl
                  border-4
                  border-white/20
                  shadow-2xl
                  flex
                  items-center
                  justify-center
                  text-white
                  text-3xl
                  sm:text-4xl
                  font-bold
                "
                style={{
                  backgroundColor:
                    profileColor ||
                    "#002147",
                }}
              >
                {profileInitials}
              </div>

              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-emerald-500 border-4 border-[#002147] flex items-center justify-center">

                <span className="w-2.5 h-2.5 bg-white rounded-full" />

              </div>

            </div>

            {/* =================================================
                USER INFORMATION
            ================================================= */}

            <div className="flex-1">

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-blue-100 mb-3">

                <User className="w-3.5 h-3.5" />

                Dealership Account

              </div>

              {/* FIRST NAME + LAST NAME */}

              <h1 className="
                text-2xl
                sm:text-3xl
                lg:text-4xl
                font-bold
                text-white
                tracking-tight
              ">
                {fullName}
              </h1>

              {/* EMAIL */}

              <p className="
                mt-2
                text-sm
                sm:text-base
                text-blue-100/75
              ">
                {email ||
                  "No email available"}
              </p>

            </div>

            {/* Security badge */}

            <div className="
              hidden
              lg:flex
              items-center
              gap-3
              px-4
              py-3
              rounded-2xl
              bg-white/10
              border
              border-white/10
            ">

              <div className="
                w-10
                h-10
                rounded-xl
                bg-emerald-500/15
                flex
                items-center
                justify-center
              ">
                <ShieldCheck className="w-5 h-5 text-emerald-300" />
              </div>

              <div>

                <p className="text-xs text-blue-100/60">
                  Account Status
                </p>

                <p className="text-sm font-semibold text-white">
                  Active & Secure
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="
        max-w-[1500px]
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        -mt-4
        relative
        z-10
      ">

        {/* ===================================================
            SETTINGS HEADING
        =================================================== */}

        <div className="mb-6">

          <div className="
            bg-white
            dark:bg-slate-900
            rounded-2xl
            border
            border-slate-200
            dark:border-slate-800
            shadow-sm
            px-5
            py-4
            sm:px-6
            flex
            items-center
            gap-4
          ">

            <div className="
              w-11
              h-11
              rounded-xl
              bg-blue-50
              dark:bg-blue-950/40
              flex
              items-center
              justify-center
              shrink-0
            ">
              <User className="w-5 h-5 text-[#002147] dark:text-blue-400" />
            </div>

            <div>

              <h2 className="
                text-base
                sm:text-lg
                font-bold
                text-slate-900
                dark:text-white
              ">
                Profile & Dealership Settings
              </h2>

              <p className="
                text-xs
                sm:text-sm
                text-slate-500
                dark:text-slate-400
                mt-0.5
              ">
                Keep your dealership information accurate and up to date.
              </p>

            </div>

          </div>

        </div>

        {/* ===================================================
            SETTINGS CARDS
        =================================================== */}

        <div className="space-y-4">

          {sections.map((section) => {

            const Icon = section.icon;

            return (
              <div
                key={section.key}
                className="
                  bg-white
                  dark:bg-slate-900
                  rounded-2xl
                  border
                  border-slate-200
                  dark:border-slate-800
                  shadow-sm
                  overflow-hidden
                "
              >

                {/* Section header */}

                <div className="
                  px-5
                  sm:px-6
                  py-4
                  border-b
                  border-slate-100
                  dark:border-slate-800
                  bg-slate-50/70
                  dark:bg-slate-900/70
                ">

                  <div className="flex items-center gap-3">

                    <div className="
                      w-10
                      h-10
                      rounded-xl
                      bg-[#002147]
                      dark:bg-blue-600
                      flex
                      items-center
                      justify-center
                      shrink-0
                      shadow-sm
                    ">
                      <Icon className="w-5 h-5 text-white" />
                    </div>

                    <div className="min-w-0">

                      <h3 className="
                        font-bold
                        text-sm
                        sm:text-base
                        text-slate-900
                        dark:text-white
                      ">
                        {section.title}
                      </h3>

                      <p className="
                        text-xs
                        sm:text-sm
                        text-slate-500
                        dark:text-slate-400
                        mt-0.5
                      ">
                        {section.description}
                      </p>

                    </div>

                  </div>

                </div>

                {/* Existing edit component */}

                <div className="p-0">

                  <EditProfile
                    onUpdateSuccess={
                      handleUpdateSuccess
                    }
                    section={
                      section.key
                    }
                  />

                </div>

              </div>
            );
          })}

        </div>

        {/* ===================================================
            DANGER ZONE
        =================================================== */}

        <section className="mt-8">

          <div className="
            bg-white
            dark:bg-slate-900
            rounded-2xl
            border
            border-red-200
            dark:border-red-900/40
            overflow-hidden
            shadow-sm
          ">

            {/* Header */}

            <div className="
              px-5
              sm:px-6
              py-4
              border-b
              border-red-100
              dark:border-red-900/40
              bg-red-50/60
              dark:bg-red-950/20
            ">

              <div className="flex items-center gap-3">

                <div className="
                  w-10
                  h-10
                  rounded-xl
                  bg-red-100
                  dark:bg-red-950/60
                  flex
                  items-center
                  justify-center
                ">
                  <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>

                <div>

                  <h3 className="
                    font-bold
                    text-sm
                    sm:text-base
                    text-slate-900
                    dark:text-white
                  ">
                    Danger Zone
                  </h3>

                  <p className="
                    text-xs
                    sm:text-sm
                    text-slate-500
                    dark:text-slate-400
                  ">
                    Permanent account actions
                  </p>

                </div>

              </div>

            </div>

            {/* Delete content */}

            <div className="p-5 sm:p-6">

              <div className="
                flex
                flex-col
                lg:flex-row
                lg:items-center
                lg:justify-between
                gap-5
              ">

                <div className="max-w-2xl">

                  <h4 className="
                    font-semibold
                    text-slate-900
                    dark:text-white
                  ">
                    Delete your dealership account
                  </h4>

                  <p className="
                    mt-1
                    text-sm
                    leading-6
                    text-slate-500
                    dark:text-slate-400
                  ">
                    This action permanently removes your account and
                    associated dealership data. This cannot be undone.
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowDeletePopup(true)
                  }
                  disabled={isDeleting}
                  className="
                    w-full
                    lg:w-auto
                    shrink-0
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-5
                    py-3
                    rounded-xl
                    bg-red-600
                    hover:bg-red-700
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    text-white
                    text-sm
                    font-semibold
                    transition-all
                    shadow-sm
                    hover:shadow-md
                  "
                >

                  {isDeleting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <DeleteAccountIcon className="w-5 h-5" />
                      Delete Account
                    </>
                  )}

                </button>

              </div>

              {/* Delete error */}

              {deleteError && (
                <div className="
                  mt-4
                  px-4
                  py-3
                  rounded-xl
                  bg-red-50
                  dark:bg-red-950/30
                  border
                  border-red-200
                  dark:border-red-900/40
                  text-red-600
                  dark:text-red-400
                  text-sm
                ">
                  {deleteError}
                </div>
              )}

            </div>

          </div>

        </section>

        {/* ===================================================
            FOOTER NOTE
        =================================================== */}

        <div className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-3
          py-7
          text-xs
          text-slate-400
          dark:text-slate-500
        ">

          <p>
            DealerPro • Dealership Management Platform
          </p>

          <div className="flex items-center gap-2">

            <ShieldCheck className="w-3.5 h-3.5" />

            <span>
              Your account information is protected.
            </span>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Profile;
