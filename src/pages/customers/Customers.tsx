import CustomerStats from "../../components/Customers/customersStats/CustomerStats";
import AllCustomers from "../../components/Customers/allCustomers/AllCustomers";

const Customers = () => {
  return (
    <div className="min-h-screen  p-6">
      <CustomerStats />
      <AllCustomers />
    </div>
  );
};

export default Customers;
