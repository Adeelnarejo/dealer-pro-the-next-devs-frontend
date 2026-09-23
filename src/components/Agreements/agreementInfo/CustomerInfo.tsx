export default function CustomerInfo({
  agreementData,
}: // user,
{
  agreementData: any;
  // user: any;
}) {

  return (
    <>
      <table className="border-collapse border border-gray-300 w-full min-w-[600px] mt-0.5">
        <tbody>
          <tr>
            <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
              Name
              <p>{agreementData?.dataValues?.name || "N/A"}</p>
            </td>
            <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
              Konsument/Näringsidkare
              <p>
                {agreementData.customerType === "company"
                  ? "Company"
                  : "Private Individual"}
              </p>
            </td>
            <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
              PEP{" "}
              <p>
                {agreementData?.dataValues?.pep !== null && agreementData?.dataValues?.pep !== undefined
                  ? agreementData.dataValues.pep
                    ? "Yes"
                    : "No"
                  : "N/A"}
              </p>
            </td>
            <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
              Person- eller organisationsnummer{" "}
              <p>
                {agreementData?.dataValues?.customerType === "company"
                  ? agreementData.dataValues.organizationNumber || "N/A"
                  : agreementData?.dataValues?.socialSecurityNumber || "N/A"}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <table className="border-collapse border border-gray-300 w-full min-w-[600px]">
        <tbody>
          <tr className="bg-gray-50">
            <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
              Adress
              <p>{agreementData?.dataValues?.address || "N/A"}</p>
            </td>
            <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
              Postnummer
              <p>{agreementData.postalCode || "N/A"}</p>
            </td>
            <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
              Stad
              <p>{agreementData.city || "N/A"}</p>
            </td>
            <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
              Verification <p>{agreementData?.dataValues?.verification || "N/A"}</p>
            </td>
          </tr>
        </tbody>
      </table>
      <table className="border-collapse border border-gray-300 w-full min-w-[600px]">
        <tbody>
          <tr>
            {agreementData.type !== "Sales Agreement" && (
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Bank
                <p>{agreementData?.dataValues?.bank || "N/A"}</p>
              </td>
            )}
            <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
              Kontonr
              <p>{agreementData?.dataValues?.accountNumber || "N/A"}</p>
            </td>
            <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
              E-post
              <p>{agreementData?.dataValues?.email || "N/A"}</p>
            </td>
            <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
              Telefon
              <p>{agreementData?.dataValues?.phone || "N/A"}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
