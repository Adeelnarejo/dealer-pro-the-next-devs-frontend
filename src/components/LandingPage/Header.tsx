import { useEffect, useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../../theme/ThemeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  // =========================================================
  // CHECK LOGIN STATUS
  // =========================================================
  const checkAuth = () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      // Token expired
      if (
        payload.exp &&
        payload.exp * 1000 <= Date.now()
      ) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("role");

        setIsLoggedIn(false);
        return;
      }

      setIsLoggedIn(true);
    } catch {
      setIsLoggedIn(false);
    }
  };

  // =========================================================
  // AUTH LISTENER
  // =========================================================
  useEffect(() => {
    checkAuth();

    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener(
      "auth-change",
      handleAuthChange
    );

    window.addEventListener(
      "storage",
      handleAuthChange
    );

    return () => {
      window.removeEventListener(
        "auth-change",
        handleAuthChange
      );

      window.removeEventListener(
        "storage",
        handleAuthChange
      );
    };
  }, []);

  // =========================================================
  // NAVIGATION
  // =========================================================
  const goToPage = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  // =========================================================
  // LOGIN / DASHBOARD
  // =========================================================
  const handleAuthButton = () => {
    setIsMenuOpen(false);

    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="absolute left-0 right-0 top-0 z-50 px-5 pt-5 sm:px-8 lg:px-12 lg:pt-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between">

        {/* =====================================================
            LOGO
        ===================================================== */}
        <button
          type="button"
          onClick={() => goToPage("/")}
          className="group flex items-center"
        >
          <span className="text-xl font-extrabold tracking-[-0.04em] text-white drop-shadow-sm transition-colors sm:text-2xl">
            Dealer
            <span className="text-blue-100">
              Pro
            </span>
          </span>
        </button>

        {/* =====================================================
            DESKTOP NAVIGATION
        ===================================================== */}
        <div
          className="
            hidden
            items-center
            rounded-full
            bg-white
            p-1.5
            shadow-xl
            shadow-slate-900/10
            transition-colors
            md:flex
            dark:bg-[#0d1b2d]
            dark:shadow-black/30
          "
        >
          <nav className="flex items-center">

            {/* INVENTORY */}
            <button
              type="button"
              onClick={() => goToPage("/inventory")}
              className="
                rounded-full
                px-5
                py-3
                text-[11px]
                font-semibold
                uppercase
                tracking-wide
                text-slate-700
                transition
                hover:bg-slate-100
                dark:text-slate-200
                dark:hover:bg-[#172b44]
              "
            >
              Inventory
            </button>

            {/* DEALERSHIPS */}
            <button
              type="button"
              onClick={() => goToPage("/dealerships")}
              className="
                rounded-full
                px-5
                py-3
                text-[11px]
                font-semibold
                uppercase
                tracking-wide
                text-slate-700
                transition
                hover:bg-slate-100
                dark:text-slate-200
                dark:hover:bg-[#172b44]
              "
            >
              Dealerships
            </button>

            {/* FEATURES */}
            <button
              type="button"
              onClick={() => goToPage("/features")}
              className="
                rounded-full
                px-5
                py-3
                text-[11px]
                font-semibold
                uppercase
                tracking-wide
                text-slate-700
                transition
                hover:bg-slate-100
                dark:text-slate-200
                dark:hover:bg-[#172b44]
              "
            >
              Features
            </button>

            {/* SERVICES */}
            <button
              type="button"
              onClick={() => goToPage("/services")}
              className="
                rounded-full
                px-5
                py-3
                text-[11px]
                font-semibold
                uppercase
                tracking-wide
                text-slate-700
                transition
                hover:bg-slate-100
                dark:text-slate-200
                dark:hover:bg-[#172b44]
              "
            >
              Services
            </button>

            {/* MORE */}
            <button
              type="button"
              className="
                flex
                items-center
                gap-1
                rounded-full
                px-4
                py-3
                text-[11px]
                font-semibold
                uppercase
                tracking-wide
                text-slate-700
                transition
                hover:bg-slate-100
                dark:text-slate-200
                dark:hover:bg-[#172b44]
              "
            >
              More
              <ChevronDown size={13} />
            </button>

            {/* =================================================
                LOGIN / DASHBOARD
            ================================================= */}
            <button
              type="button"
              onClick={handleAuthButton}
              className="
                ml-1
                rounded-full
                bg-blue-600
                px-6
                py-3
                text-[11px]
                font-bold
                uppercase
                tracking-wide
                text-white
                transition
                hover:bg-blue-700
              "
            >
              {isLoggedIn ? "Dashboard" : "Login"}
            </button>

          </nav>
        </div>

        {/* =====================================================
            MOBILE MENU BUTTON
        ===================================================== */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            bg-white
            text-slate-800
            shadow-lg
            transition
            hover:bg-slate-100
            md:hidden
            dark:bg-[#0d1b2d]
            dark:text-slate-100
            dark:shadow-black/30
            dark:hover:bg-[#172b44]
          "
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X size={20} />
          ) : (
            <Menu size={20} />
          )}
        </button>

      </div>

      {/* =====================================================
          MOBILE DROPDOWN
      ===================================================== */}
      {isMenuOpen && (
        <div
          className="
            mx-auto
            mt-3
            max-w-md
            rounded-3xl
            bg-white
            p-3
            shadow-2xl
            transition-colors
            md:hidden
            dark:bg-[#0d1b2d]
            dark:shadow-black/40
          "
        >
          <nav className="flex flex-col gap-1">

            {/* INVENTORY */}
            <button
              type="button"
              onClick={() => goToPage("/inventory")}
              className="
                w-full
                rounded-2xl
                px-4
                py-3
                text-left
                text-sm
                font-semibold
                text-slate-700
                transition
                hover:bg-blue-50
                hover:text-blue-600
                dark:text-slate-200
                dark:hover:bg-[#172b44]
                dark:hover:text-blue-400
              "
            >
              Inventory
            </button>

            {/* DEALERSHIPS */}
            <button
              type="button"
              onClick={() => goToPage("/dealerships")}
              className="
                w-full
                rounded-2xl
                px-4
                py-3
                text-left
                text-sm
                font-semibold
                text-slate-700
                transition
                hover:bg-blue-50
                hover:text-blue-600
                dark:text-slate-200
                dark:hover:bg-[#172b44]
                dark:hover:text-blue-400
              "
            >
              Dealerships
            </button>

            {/* FEATURES */}
            <button
              type="button"
              onClick={() => goToPage("/features")}
              className="
                w-full
                rounded-2xl
                px-4
                py-3
                text-left
                text-sm
                font-semibold
                text-slate-700
                transition
                hover:bg-blue-50
                hover:text-blue-600
                dark:text-slate-200
                dark:hover:bg-[#172b44]
                dark:hover:text-blue-400
              "
            >
              Features
            </button>

            {/* SERVICES */}
            <button
              type="button"
              onClick={() => goToPage("/services")}
              className="
                w-full
                rounded-2xl
                px-4
                py-3
                text-left
                text-sm
                font-semibold
                text-slate-700
                transition
                hover:bg-blue-50
                hover:text-blue-600
                dark:text-slate-200
                dark:hover:bg-[#172b44]
                dark:hover:text-blue-400
              "
            >
              Services
            </button>

            {/* =================================================
                MOBILE THEME TOGGLE
            ================================================= */}
            <div className="mt-2">
              <ThemeToggle mobile />
            </div>

            {/* =================================================
                LOGIN / DASHBOARD - MOBILE
            ================================================= */}
            <button
              type="button"
              onClick={handleAuthButton}
              className="
                mt-2
                flex
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-blue-600
                px-4
                py-3.5
                text-sm
                font-bold
                text-white
                transition
                hover:bg-blue-700
              "
            >
              {isLoggedIn ? "Dashboard" : "Login"}

              <ArrowRight size={16} />
            </button>

          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
