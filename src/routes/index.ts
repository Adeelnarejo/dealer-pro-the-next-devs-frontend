import Dashboard from "../pages/dashboard/Dashboard";
import Customers from "../pages/customers/Customers";
import Vehicles from "../pages/vehicles/Vehicles";
import VehicleSearch from "../pages/vehicleSearch/VehicleSearch";
import Agreements from "../pages/agreements/Agreements";
import AgreementSign from "../pages/agreementSign/AgreementSign";
import Payments from "../pages/payments/Payments";
import Invoices from "../pages/invoices/Invoices";
import UserManagement from "../pages/userManagement/UserManagement";
import RoleManagement from "../pages/roleManagement/RoleManagement";
import Profile from "../pages/profile/Profile";
import VehicleDetails from "../pages/vehicleDetails/VehicleDetails";
import VehicleDetails2 from "../pages/vehicleDetails/VehicleDetails2";

import AddNewSalesAgreement from "../pages/addNewSalesAgreement/AddNewSalesAgreement";
import AddNewPurchaseAgreement from "../pages/addNewPurchaseAgreement/AddNewPurchaseAgreement";
import AddNewAgencyAgreement from "../pages/addNewAgencyAgreement/AddNewAgencyAgreement";

import EditSalesAgreement from "../pages/editSalesAgreement/EditSalesAgreement";
import EditPurchaseAgreement from "../pages/editPurchaseAgreement/EditPurchaseAgreement";
import EditAgencyAgreement from "../pages/editAgencyAgreement/EditAgencyAgreement";

import AddPayments from "../pages/addPayments/AddPayments";
import AddInvoice from "../pages/addInvoice/AddInvoice";
import AddReceipt from "../pages/addInvoice/AddReceipt";

import AddAdvertise from "../components/Vehicles/addAdvertise/AddAdvertise";

import LandingPage from "../pages/landingPage/LandingPage";

import SuperAdminDashboard from "../superAdmin/SuperAdminDashboard";
import SuperAdminVehicle from "../superAdmin/SuperAdminCompany";

// =========================================================
// AUTH
// =========================================================

import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";

// =========================================================
// LANDING PAGE
// =========================================================

import Inventory from "../components/LandingPage/inventory/Inventory";
import Dealerships from "../components/LandingPage/Dealerships/Dealerships";
import Features from "../components/LandingPage/features/Features";
import Services from "../components/LandingPage/services/Services";

// =========================================================
// PUBLIC ROUTES
// =========================================================

export const publicRoutes = [
  // =======================================================
  // LANDING PAGE
  // =======================================================

  {
    path: "/",
    component: LandingPage,
  },

  // =======================================================
  // LOGIN
  // =======================================================

  {
    path: "/login",
    component: Login,
  },

    {
    path: "/signup",
    component: SignUp,
  },

  // =======================================================
  // INVENTORY
  // =======================================================

  {
    path: "/inventory",
    component: Inventory,
  },

  // =======================================================
  // DEALERSHIPS
  // =======================================================

  {
    path: "/dealerships",
    component: Dealerships,
  },

  // =======================================================
  // FEATURES
  // =======================================================

  {
    path: "/features",
    component: Features,
  },

  // =======================================================
  // SERVICES
  // =======================================================

  {
    path: "/services",
    component: Services,
  },

  // =======================================================
  // PUBLIC AGREEMENT SIGNING
  // =======================================================

  {
    path: "/agreement-sign/:agreementID",
    component: AgreementSign,
  },
];

// =========================================================
// PRIVATE ROUTES
// =========================================================

export const privateRoutes = [
  // =======================================================
  // DASHBOARD
  // =======================================================

  {
    path: "/dashboard",
    component: Dashboard,
  },

  {
    path: "/admin-dashboard",
    component: SuperAdminDashboard,
  },

  // =======================================================
  // CUSTOMERS
  // =======================================================

  {
    path: "/customers",
    component: Customers,
  },

  // =======================================================
  // VEHICLES
  // =======================================================

  {
    path: "/vehicles",
    component: Vehicles,
  },

  {
    path: "/vehicle-company",
    component: SuperAdminVehicle,
  },

  // =======================================================
  // VEHICLE SEARCH
  // =======================================================

  {
    path: "/vehicles-search",
    component: VehicleSearch,
  },

  // =======================================================
  // AGREEMENTS
  // =======================================================

  {
    path: "/agreements",
    component: Agreements,
  },

  {
    path: "/sign-agreement/:agreementID",
    component: AgreementSign,
  },

  // =======================================================
  // PAYMENTS
  // =======================================================

  {
    path: "/swish",
    component: Payments,
  },

  // =======================================================
  // INVOICES
  // =======================================================

  {
    path: "/invoices",
    component: Invoices,
  },

  // =======================================================
  // USER MANAGEMENT
  // =======================================================

  {
    path: "/users-management",
    component: UserManagement,
  },

  // =======================================================
  // ROLE MANAGEMENT
  // =======================================================

  {
    path: "/roles-management",
    component: RoleManagement,
  },

  // =======================================================
  // PROFILE
  // =======================================================

  {
    path: "/profile",
    component: Profile,
  },

  // =======================================================
  // VEHICLE DETAILS
  // =======================================================

  {
    path: "/vehicle-details/:registrationNumber",
    component: VehicleDetails,
  },

  {
    path: "/vehicle-details2/:registrationNumber",
    component: VehicleDetails2,
  },

  // =======================================================
  // SALES AGREEMENT
  // =======================================================

  {
    path: "/add-new-sales-agreement",
    component: AddNewSalesAgreement,
  },

  // =======================================================
  // PURCHASE AGREEMENT
  // =======================================================

  {
    path: "/add-new-purchase-agreement",
    component: AddNewPurchaseAgreement,
  },

  // =======================================================
  // AGENCY AGREEMENT
  // =======================================================

  {
    path: "/add-new-agency-agreement",
    component: AddNewAgencyAgreement,
  },

  // =======================================================
  // EDIT SALES AGREEMENT
  // =======================================================

  {
    path: "/edit-sales-agreement",
    component: EditSalesAgreement,
  },

  // =======================================================
  // EDIT PURCHASE AGREEMENT
  // =======================================================

  {
    path: "/edit-purchase-agreement",
    component: EditPurchaseAgreement,
  },

  // =======================================================
  // EDIT AGENCY AGREEMENT
  // =======================================================

  {
    path: "/edit-agency-agreement",
    component: EditAgencyAgreement,
  },

  // =======================================================
  // ADD PAYMENT
  // =======================================================

  {
    path: "/add-new-payment",
    component: AddPayments,
  },

  // =======================================================
  // ADD INVOICE
  // =======================================================

  {
    path: "/add-new-invoice",
    component: AddInvoice,
  },

  // =======================================================
  // ADD RECEIPT
  // =======================================================

  {
    path: "/add-new-receipt",
    component: AddReceipt,
  },

  // =======================================================
  // ADD ADVERTISEMENT
  // =======================================================

  {
    path: "/add-new-advertise/:registrationNumber",
    component: AddAdvertise,
  },

  // =======================================================
  // FALLBACK
  // =======================================================

  {
    path: "*",
    component: Dashboard,
  },
];