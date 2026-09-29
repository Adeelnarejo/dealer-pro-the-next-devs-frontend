import AgreementStats from "../../components/Agreements/agreementStats/AgreementStats";
import AllAgreements from "../../components/Agreements/allAgreements/AllAgreements";

const Agreements = () => {
  return (
    <div className="min-h-screen  p-6">
      <AgreementStats />
      <AllAgreements />
    </div>
  );
};

export default Agreements;
