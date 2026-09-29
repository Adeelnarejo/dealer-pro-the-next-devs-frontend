import { useEffect, useState } from "react";
import {
  Menu,
  X,
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
    <>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="fixed left-0 right-0 top-0 z-[100] px-4 pt-4 sm:px-6 sm:pt-5 lg:px-10">

        <div className="mx-auto flex max-w-[1450px] items-center justify-between">

          {/* =================================================
              LOGO
          ================================================= */}

          <button
            type="button"
            onClick={() => goToPage("/")}
            className="group relative flex items-center"
          >
            {/* glow */}

            <span className="pointer-events-none absolute -inset-3 rounded-full bg-blue-500/10 opacity-0 blur-xl transition duration-500 group-hover:opacity-100" />

            <span className="relative text-[21px] font-extrabold tracking-[-0.055em] text-white drop-shadow-lg sm:text-2xl">

              Dealer
              <span className="text-blue-400">
                Pro
              </span>

            </span>
          </button>

          {/* =================================================
              DESKTOP NAV
          ================================================= */}

          <div
            className="
              hidden
              md:flex
              items-center
              rounded-full
              border
              border-white/15
              bg-white/[0.075]
              p-1.5
              shadow-[0_15px_50px_rgba(0,0,0,0.22)]
              backdrop-blur-2xl
              backdrop-saturate-150
            "
          >

            <nav className="flex items-center">

              {/* INVENTORY */}

              <NavButton
                label="Inventory"
                onClick={() => goToPage("/inventory")}
              />

              {/* DEALERSHIPS */}

              <NavButton
                label="Dealerships"
                onClick={() => goToPage("/dealerships")}
              />

              {/* FEATURES */}

              <NavButton
                label="Features"
                onClick={() => goToPage("/features")}
              />

              {/* SERVICES */}

              <NavButton
                label="Services"
                onClick={() => goToPage("/services")}
              />

              {/* LOGIN */}

              <button
                type="button"
                onClick={handleAuthButton}
                className="
                  group
                  ml-1
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-blue-600
                  px-5
                  py-2.5
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.08em]
                  text-white
                  shadow-[0_6px_25px_rgba(37,99,235,0.35)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-blue-500
                  hover:shadow-[0_10px_30px_rgba(37,99,235,0.45)]
                  active:translate-y-0
                "
              >
                {isLoggedIn ? "Dashboard" : "Login"}

                <ArrowRight
                  size={14}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                  "
                />
              </button>

            </nav>
          </div>

          {/* =================================================
              MOBILE BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            className="
              group
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-white/15
              bg-white/[0.09]
              text-white
              shadow-[0_10px_35px_rgba(0,0,0,0.25)]
              backdrop-blur-2xl
              transition-all
              duration-300
              hover:border-blue-400/40
              hover:bg-white/[0.14]
              md:hidden
            "
          >
            {isMenuOpen ? (
              <X
                size={19}
                className="transition-transform duration-300 group-hover:rotate-90"
              />
            ) : (
              <Menu
                size={20}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            )}
          </button>

        </div>

        {/* =====================================================
            MOBILE MENU
        ===================================================== */}

        <div
          className={`
            mx-auto
            mt-3
            max-w-md
            overflow-hidden
            rounded-[26px]
            border
            border-white/15
            bg-black/45
            shadow-[0_25px_80px_rgba(0,0,0,0.35)]
            backdrop-blur-2xl
            backdrop-saturate-150
            transition-all
            duration-500
            md:hidden
            ${
              isMenuOpen
                ? "visible translate-y-0 opacity-100"
                : "invisible -translate-y-3 opacity-0"
            }
          `}
        >

          <div className="p-2.5">

            {/* top glow */}

            <div className="pointer-events-none absolute h-20 w-40 rounded-full bg-blue-500/10 blur-3xl" />

            <nav className="relative flex flex-col gap-1">

              {/* INVENTORY */}

              <MobileNavButton
                label="Inventory"
                onClick={() => goToPage("/inventory")}
              />

              {/* DEALERSHIPS */}

              <MobileNavButton
                label="Dealerships"
                onClick={() => goToPage("/dealerships")}
              />

              {/* FEATURES */}

              <MobileNavButton
                label="Features"
                onClick={() => goToPage("/features")}
              />

              {/* SERVICES */}

              <MobileNavButton
                label="Services"
                onClick={() => goToPage("/services")}
              />

              {/* divider */}

              <div className="my-2 h-px bg-white/10" />

              {/* THEME */}

              <div className="px-1">
                <ThemeToggle mobile />
              </div>

              {/* LOGIN */}

              <button
                type="button"
                onClick={handleAuthButton}
                className="
                  group
                  mt-1
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-2xl
                  bg-blue-600
                  px-4
                  py-3.5
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  shadow-blue-600/20
                  transition-all
                  duration-300
                  hover:bg-blue-500
                "
              >

                <span>
                  {isLoggedIn ? "Dashboard" : "Login"}
                </span>

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>

              </button>

            </nav>

          </div>
        </div>

      </header>

      {/* =====================================================
          GLOBAL HEADER STYLE
      ===================================================== */}

      <style>{`
        @keyframes headerFloat {
          0% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-2px);
          }

          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </>
  );
};

/* ============================================================
   DESKTOP NAV BUTTON
============================================================ */

type NavButtonProps = {
  label: string;
  onClick: () => void;
};

const NavButton = ({
  label,
  onClick,
}: NavButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        relative
        rounded-full
        px-5
        py-2.5
        text-[10px]
        font-semibold
        uppercase
        tracking-[0.08em]
        text-white/65
        transition-all
        duration-300
        hover:bg-white/[0.09]
        hover:text-white
      "
    >
      <span className="relative z-10">
        {label}
      </span>

      {/* blue bottom glow */}

      <span
        className="
          absolute
          bottom-1
          left-1/2
          h-px
          w-0
          -translate-x-1/2
          bg-blue-400
          opacity-0
          shadow-[0_0_10px_rgba(96,165,250,0.9)]
          transition-all
          duration-300
          group-hover:w-5
          group-hover:opacity-100
        "
      />
    </button>
  );
};

/* ============================================================
   MOBILE NAV BUTTON
============================================================ */

type MobileNavButtonProps = {
  label: string;
  onClick: () => void;
};

const MobileNavButton = ({
  label,
  onClick,
}: MobileNavButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        flex
        w-full
        items-center
        justify-between
        rounded-2xl
        px-4
        py-3.5
        text-left
        text-sm
        font-semibold
        text-white/75
        transition-all
        duration-300
        hover:bg-white/[0.08]
        hover:text-white
      "
    >
      <span>
        {label}
      </span>

      <span
        className="
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-full
          border
          border-white/10
          bg-white/[0.04]
          transition-all
          duration-300
          group-hover:border-blue-400/30
          group-hover:bg-blue-500/10
        "
      >
        <ArrowRight
          size={13}
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        />
      </span>
    </button>
  );
};

export default Header;