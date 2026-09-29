import PaymentStats from "../../components/Payments/paymentStats/PaymentStats";
import AllPayments from "../../components/Payments/allPayments/AllPayment";

const Payments = () => {
  return (
    <div className="min-h-screen p-6">
      <PaymentStats />
      <AllPayments />
    </div>
  );
};

export default Payments;
