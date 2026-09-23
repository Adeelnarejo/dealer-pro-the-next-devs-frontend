import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";
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
import AddNewSalesAgreement from "../pages/addNewSalesAgreement/AddNewSalesAgreement";
import AddNewPurchaseAgreement from "../pages/addNewPurchaseAgreement/AddNewPurchaseAgreement";
import AddNewAgencyAgreement from "../pages/addNewAgencyAgreement/AddNewAgencyAgreement";
import EditSalesAgreement from "../pages/editSalesAgreement/EditSalesAgreement";
import EditPurchaseAgreement from "../pages/editPurchaseAgreement/EditPurchaseAgreement";
import EditAgencyAgreement from "../pages/editAgencyAgreement/EditAgencyAgreement";
import AddPayments from "../pages/addPayments/AddPayments";
import AddInvoice from "../pages/addInvoice/AddInvoice";
import AddAdvertise from "../components/Vehicles/addAdvertise/AddAdvertise";
import LandingPage from "../pages/landingPage/LandingPage";
import SuperAdminDashboard from "../superAdmin/SuperAdminDashboard";
import SuperAdminVehicle from "../superAdmin/SuperAdminCompany";
import VehicleDetails2 from "../pages/vehicleDetails/VehicleDetails2";
import AddReceipt from "../pages/addInvoice/AddReceipt";

const role = localStorage.getItem("role");

export const publicRoutes = [
  { path: "/", component: LandingPage },
  { path: "/login", component: Login },
  { path: "/signup", component: SignUp },
  { path: "/agreement-sign/:agreementID", component: AgreementSign }, // Public access route - no authentication required
  { path: "*", component: Login }, // Wildcard should be LAST to catch unmatched routes
];

export const privateRoutes = [
  { path: "*", component: role === "Admin" ? Dashboard : SuperAdminDashboard }, // Fallback route
  ...(role === "Admin"
    ? [{ path: "/dashboard", component: Dashboard }]
    : [{ path: "/admin-dashboard", component: SuperAdminDashboard }]), // Fallback route
  { path: "/customers", component: Customers },
  ...(role === "Admin"
    ? [{ path: "/vehicles", component: Vehicles }]
    : [{ path: "/vehicle-company", component: SuperAdminVehicle }]),
  { path: "/vehicles-search", component: VehicleSearch },
  { path: "/agreements", component: Agreements },
  { path: "/sign-agreement/:agreementID", component: AgreementSign },
  { path: "/swish", component: Payments },
  { path: "/invoices", component: Invoices },
  { path: "/users-management", component: UserManagement },
  { path: "/roles-management", component: RoleManagement },
  { path: "/profile", component: Profile },
  { path: "/vehicle-details/:registrationNumber", component: VehicleDetails },
  { path: "/vehicle-details2/:registrationNumber", component: VehicleDetails2 },
  { path: "/add-new-sales-agreement", component: AddNewSalesAgreement },
  { path: "/add-new-purchase-agreement", component: AddNewPurchaseAgreement },
  { path: "/add-new-agency-agreement", component: AddNewAgencyAgreement },
  { path: "/edit-sales-agreement", component: EditSalesAgreement },
  { path: "/edit-purchase-agreement", component: EditPurchaseAgreement },
  { path: "/edit-agency-agreement", component: EditAgencyAgreement },
  { path: "/add-new-payment", component: AddPayments },
  { path: "/add-new-invoice", component: AddInvoice },
  { path: "/add-new-receipt", component: AddReceipt },
  { path: "/add-new-advertise/:registrationNumber", component: AddAdvertise },
];
