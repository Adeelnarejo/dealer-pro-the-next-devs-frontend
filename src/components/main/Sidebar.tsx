import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  CarFront,
  X,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";

import {
  DashboardSidebarIcon,
  CustomersSidebarIcon,
  VehiclesSidebarIcon,
  AgreementsSidebarIcon,
  SwishSidebarIcon,
  InvoicesSidebarIcon,
} from "../utils/Icons";
import ThemeToggle from "../../theme/ThemeToggle";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
}) => {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <DashboardSidebarIcon className="h-5 w-5" />,
    },
    {
      name: "Vehicle Search",
      path: "/vehicles-search",
      icon: <CarFront className="h-5 w-5" />,
    },
    {
      name: "Inventory",
      path: role === "Admin" ? "/vehicles" : "/vehicle-company",
      icon: <VehiclesSidebarIcon className="h-5 w-5" />,
    },
    {
      name: "Agreements",
      path: "/agreements",
      icon: <AgreementsSidebarIcon className="h-5 w-5" />,
    },
    {
      name: "Payments",
      path: "/swish",
      icon: <SwishSidebarIcon className="h-5 w-5" />,
    },
    {
      name: "Invoices",
      path: "/invoices",
      icon: <InvoicesSidebarIcon className="h-5 w-5" />,
    },
    {
      name: "Customers",
      path: "/customers",
      icon: <CustomersSidebarIcon className="h-5 w-5" />,
    },
  ];

  const handleBackToWebsite = () => {
    navigate("/");

    if (
      typeof window !== "undefined" &&
      window.innerWidth < 1024
    ) {
      toggleSidebar?.();
    }
  };

  const handleMobileNavClick = () => {
    if (
      typeof window !== "undefined" &&
      window.innerWidth < 1024
    ) {
      toggleSidebar?.();
    }
  };

  return (
    <>
      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={toggleSidebar}
          className="
            fixed
            inset-0
            z-40
            bg-black/50
            backdrop-blur-[2px]
            lg:hidden
          "
        />
      )}

      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          w-[250px]
          flex-col
          overflow-hidden

          border-r
          border-white/[0.08]

          bg-[#001A36]

          shadow-[10px_0_40px_rgba(0,0,0,0.18)]

          transition-transform
          duration-300
          ease-in-out

          dark:bg-[#020B16]

          lg:translate-x-0

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* =================================================
            BRAND
        ================================================== */}
        <div
          className="
            relative
            flex
            h-[76px]
            shrink-0
            items-center
            justify-between
            border-b
            border-white/[0.08]
            px-4
          "
        >
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex min-w-0 items-center gap-3 text-left"
          >
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-white
                shadow-lg
                shadow-black/10
              "
            >
              <CarFront
                className="h-5 w-5 text-[#002147]"
                strokeWidth={2.2}
              />
            </div>

            <div className="min-w-0">
              <div
                className="
                  truncate
                  text-xl
                  font-bold
                  leading-none
                  tracking-tight
                  text-white
                "
              >
                DealerPro
              </div>

              <div
                className="
                  mt-1
                  truncate
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-blue-200/50
                "
              >
                Dealership Platform
              </div>
            </div>
          </button>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              text-blue-100/70
              transition-all
              hover:bg-white/10
              hover:text-white
              lg:hidden
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* =================================================
            NAVIGATION
        ================================================== */}
        <nav
          className="
            flex-1
            overflow-y-auto
            px-3
            py-5
            scrollbar-thin
            scrollbar-thumb-white/10
            scrollbar-track-transparent
          "
        >
          <div className="mb-3 px-3">
            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-blue-200/40
              "
            >
              Main Menu
            </span>
          </div>

          <ul className="space-y-1.5">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  end
                  onClick={handleMobileNavClick}
                  className={({ isActive }) => `
                    group
                    relative
                    flex
                    h-11
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    transition-all
                    duration-200

                    ${
                      isActive
                        ? `
                          bg-white
                          text-[#002147]
                          shadow-lg
                          shadow-black/10
                        `
                        : `
                          text-blue-100/70
                          hover:bg-white/[0.07]
                          hover:text-white
                        `
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span
                          className="
                            absolute
                            left-0
                            top-2.5
                            h-6
                            w-1
                            rounded-r-full
                            bg-blue-500
                          "
                        />
                      )}

                      <span
                        className={`
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          transition-all
                          duration-200

                          ${
                            isActive
                              ? `
                                bg-blue-50
                                text-[#002147]
                              `
                              : `
                                text-blue-200/70
                                group-hover:bg-white/[0.06]
                                group-hover:text-white
                              `
                          }
                        `}
                      >
                        {item.icon}
                      </span>

                      <span
                        className="
                          min-w-0
                          flex-1
                          truncate
                          text-sm
                          font-semibold
                        "
                      >
                        {item.name}
                      </span>

                      {isActive && (
                        <span
                          className="
                            h-1.5
                            w-1.5
                            shrink-0
                            rounded-full
                            bg-blue-500
                          "
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* =================================================
            BOTTOM AREA
        ================================================== */}
        <div
          className="
            shrink-0
            border-t
            border-white/[0.08]
            p-3
          "
        >
          {/* =================================================
              MOBILE THEME TOGGLE
          ================================================== */}
         <div
  className="
    mb-2
    lg:hidden
    rounded-xl
    border
    border-white/[0.08]
    bg-white/[0.045]
    p-2
  "
>
  <ThemeToggle mobile />
</div>

          {/* =================================================
              BACK TO WEBSITE
          ================================================== */}
          <button
            type="button"
            onClick={handleBackToWebsite}
            className="
              group
              mb-2
              flex
              h-10
              w-full
              items-center
              gap-3
              rounded-xl
              border
              border-white/[0.08]
              bg-white/[0.045]
              px-3
              text-blue-100/75
              transition-all
              duration-200

              hover:border-blue-400/20
              hover:bg-white/[0.08]
              hover:text-white
            "
          >
            <span
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-white/[0.06]
                transition
                group-hover:bg-blue-500/15
              "
            >
              <ArrowLeft
                size={15}
                className="
                  transition-transform
                  duration-200
                  group-hover:-translate-x-0.5
                "
              />
            </span>

            <span className="flex-1 text-left text-xs font-semibold">
              Back to Website
            </span>

            <ExternalLink
              size={13}
              className="
                text-blue-200/30
                transition
                group-hover:text-blue-200/70
              "
            />
          </button>

          {/* =================================================
              SYSTEM STATUS
          ================================================== */}
          <div
            className="
              rounded-xl
              border
              border-white/[0.07]
              bg-white/[0.045]
              p-3
            "
          >
            <div className="flex items-center gap-2.5">
              <div
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-emerald-500/10
                "
              >
                <span
                  className="
                    h-2
                    w-2
                    animate-pulse
                    rounded-full
                    bg-emerald-400
                    shadow-[0_0_8px_rgba(52,211,153,0.7)]
                  "
                />
              </div>

              <div className="min-w-0">
                <p
                  className="
                    text-xs
                    font-semibold
                    text-white
                  "
                >
                  System Online
                </p>

                <p
                  className="
                    mt-0.5
                    truncate
                    text-[10px]
                    text-blue-200/40
                  "
                >
                  DealerPro is running normally
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;