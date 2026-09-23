import { NavLink } from "react-router-dom";
import {
  DashboardSidebarIcon,
  CustomersSidebarIcon,
  VehiclesSidebarIcon,
  AgreementsSidebarIcon,
  SwishSidebarIcon,
  InvoicesSidebarIcon,
} from "../utils/Icons";
import { CarFront } from "lucide-react";

const role = localStorage.getItem("role");

const navItems = [
  {
    name: "Instrumentpanel", // Dashboard
    path: "/dashboard",
    icon: <DashboardSidebarIcon className="w-5 h-5 mr-1.5" />,
  },
  {
    name: "Fordonssökning", // Vehicle Search
    path: "/vehicles-search",
    icon: <CarFront className="w-5 h-5 mr-1.5" />,
  },
  {
    name: "Lageröversikt", // Inventory Overview
    path: `${role === "Admin" ? "/vehicles" : "/vehicle-company"}`,
    icon: <VehiclesSidebarIcon className="w-5 h-5 mr-1.5" />,
  },
  {
    name: "Avtal", // Agreements
    path: "/agreements",
    icon: <AgreementsSidebarIcon className="w-5 h-5 mr-1.5" />,
  },
  {
    name: "Swish",
    path: "/swish",
    icon: <SwishSidebarIcon className="w-5 h-5 mr-1.5" />,
  },
  {
    name: "Fakturor", // Invoices
    path: "/invoices",
    icon: <InvoicesSidebarIcon className="w-5 h-5 mr-1.5" />,
  },
  {
    name: "Kunder", // Customers
    path: "/customers",
    icon: <CustomersSidebarIcon className="w-5 h-5 mr-1.5" />,
  },
];

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
  return (
    <aside
      className={`fixed left-0 top-0 flex-shrink-0 flex flex-col sidebar-back lg:z-1 z-50 transition-all duration-300 ${
        isOpen || isDesktop ? "w-[240px] h-screen" : "w-[64px] h-auto"
      }`}
    >
      <div className="flex items-center justify-between px-4 pt-4 pb-4 border-b border-white">
        {isOpen || isDesktop ? (
          <span className="font-bold text-2xl text-white font-plus-jakarta">
            DealerPro
          </span>
        ) : (
          <span className="text-white font-bold text-lg hidden lg:block">
            DP
          </span>
        )}

        <div className="flex lg:hidden items-center gap-3">
          <button
            className="block"
            aria-label="Växla sidofält" // Toggle Sidebar
            onClick={toggleSidebar}
          >
            <input
              id="checkbox2"
              type="checkbox"
              checked={isOpen}
              readOnly
              style={{ display: "none" }}
            />
            <label className="toggle toggle2" htmlFor="checkbox2">
              <div id="bar4" className="bars"></div>
              <div id="bar5" className="bars"></div>
              <div id="bar6" className="bars"></div>
            </label>
          </button>
        </div>
      </div>

      <nav className={`flex-1 ${isOpen || isDesktop ? "mt-3" : "mt-0"}`}>
        <ul className="w-full flex flex-col gap-1">
          {(isOpen || isDesktop) &&
            navItems.map((item) => (
              <li key={item.name} className="px-3">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-2 rounded-lg py-3 my-1 font-medium text-base cursor-pointer transition-colors border-l-4 ${
                      isActive
                        ? "bg-white text-[#012F7A] border-white"
                        : "text-blue-100 border-transparent hover:bg-white/10 hover:text-white"
                    }`
                  }
                  end={item.path === "/"}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
