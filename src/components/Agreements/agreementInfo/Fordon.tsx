export default function Fordon({ agreementData }: any) {
  if (agreementData.type === "Sales Agreement") {
    return (
      <>
        <div className="mt-3 overflow-x-auto">
          <p>Fordon</p>
          <div>
            <table className="border-collapse border border-gray-300 w-full min-w-[600px] mt-0.5">
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Märke/Modell
                    <p>{agreementData?.dataValues?.vehicleModel || "N/A"}</p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Registernummer
                    <p>{agreementData?.dataValues?.registrationNumber || "N/A"}</p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Chassisnummer
                    <p>{agreementData?.dataValues?.chassisNumber || "N/A"}</p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Försäljningsdatum{" "}
                    <p>
                      {agreementData?.dataValues?.type === "Sales Agreement"
                        ? agreementData?.dataValues?.salesDate
                        : agreementData?.dataValues?.purchaseDate}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="border-collapse border border-gray-300 w-full min-w-[600px]">
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Momsstatus
                    <p>{agreementData?.dataValues?.vatType || "N/A"}</p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Mätarställning
                    <p>{agreementData?.dataValues?.mileage || "N/A"}</p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Besiktning . t.o.m{" "}
                    <p>
                      {agreementData?.dataValues?.inspectionDateUpToAndIncluding || "N/A"}
                    </p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Senast Service-datum{" "}
                    <p>{agreementData?.dataValues?.latestServiceDate || "N/A"}</p>
                  </td>
                  {/* <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Finansbolag /kreditgivare{" "}
                    <p>{agreementData.creditor || "N/A"}</p>
                  </td> */}
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Importerad används
                    <p>{agreementData?.dataValues?.diretImport ? "JA" : "Nej"}</p>
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="border-collapse border border-gray-300 w-full min-w-[600px]">
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Däck
                    <p>{agreementData?.dataValues?.deck ? agreementData?.dataValues?.deck.replace(/_/g, " ") : "N/A"}</p>

                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Årsmodell
                    <p>{agreementData?.dataValues?.vehicleYear || "N/A"}</p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Färg
                    <p>{agreementData?.dataValues?.color || "N/A"}</p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Nycklar <p>{agreementData?.dataValues?.numberOfKeys || "N/A"}</p>
                  </td>
                  {/* <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Utsläppsklass
                    <p>{agreementData.emissionClass || "N/A"}</p>
                  </td> */}
                  {/* <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Effekt kW <p>N/A</p>
                  </td> */}
                </tr>
              </tbody>
            </table>

            
            <table className="border-collapse border border-gray-300 w-full min-w-[600px]">
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Tillägsinformation
                    <p>
                      {agreementData.freeTextMessage ||
                        agreementData.notes ||
                        "N/A"}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-3 overflow-x-auto">
          <p>Inbytesbil</p>
          <div>
            <table className="border-collapse border border-gray-300 w-full min-w-[600px] mt-0.5">
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Märke/Modell
                    <p>{agreementData?.dataValues?.vehicleModel || "N/A"}</p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Registernummer
                    <p>{agreementData?.dataValues?.registrationNumber || "N/A"}</p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Chassisnummer
                    <p>{agreementData?.dataValues?.chassisNumber || "N/A"}</p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Försäljningsdatum{" "}
                    <p>
                      {agreementData?.dataValues?.type === "Sales Agreement"
                        ? agreementData?.dataValues?.salesDate || "N/A"
                        : agreementData?.dataValues?.purchaseDate || "N/A"}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="border-collapse border border-gray-300 w-full min-w-[600px]">
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Momsstatus
                    <p>{agreementData?.dataValues?.vatType || "N/A"}</p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Mätarställning
                    <p>{agreementData?.dataValues?.mileage || "N/A"}</p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Besiktning . t.o.m{" "}
                    <p>
                      {agreementData?.dataValues?.inspectionDateUpToAndIncluding || "N/A"}
                    </p>
                  </td>
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Senast Service-datum{" "}
                    <p>{agreementData?.dataValues?.latestServiceDate || "N/A"}</p>
                  </td>
                  {/* <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Finansbolag /kreditgivare{" "}
                    <p>{agreementData.creditor || "N/A"}</p>
                  </td> */}
                  <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                    Importerad används
                    <p>{agreementData?.dataValues?.diretImport ? "JA" : "Nej"}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="mt-3 overflow-x-auto">
      <p>Fordon</p>
      <div>
        <table className="border-collapse border border-gray-300 w-full min-w-[600px] mt-0.5">
          <tbody>
            <tr>
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Märke/Modell
                <p>{agreementData?.dataValues?.vehicleModel || "N/A"}</p>
              </td>
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Registernummer
                <p>{agreementData?.dataValues?.registrationNumber || "N/A"}</p>
              </td>
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Chassisnummer
                <p>{agreementData?.dataValues?.chassisNumber || "N/A"}</p>
              </td>
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Försäljningsdatum{" "}
                <p>
                  {agreementData?.dataValues?.type === "Sales Agreement"
                    ? agreementData?.dataValues?.salesDate || "N/A"
                    : agreementData?.dataValues?.purchaseDate || "N/A"}
                </p>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="border-collapse border border-gray-300 w-full min-w-[600px]">
          <tbody>
            <tr>
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Momsstatus
                <p>{agreementData?.dataValues?.vatType || "N/A"}</p>
              </td>
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Mätarställning
                <p>{agreementData?.dataValues?.mileage || "N/A"}</p>
              </td>
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Besiktning . t.o.m{" "}
                <p>{agreementData?.dataValues?.inspectionDateUpToAndIncluding || "N/A"}</p>
              </td>
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Senast Service-datum{" "}
                <p>{agreementData?.dataValues?.latestServiceDate || "N/A"}</p>
              </td>
              {/* <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Finansbolag /kreditgivare{" "}
                <p>{agreementData.creditor || "N/A"}</p>
              </td> */}
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Importerad används
                <p>{agreementData?.dataValues?.diretImport ? "JA" : "Nej"}</p>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="border-collapse border border-gray-300 w-full min-w-[600px]">
          <tbody>
            <tr>
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Däck
                <p>{agreementData?.dataValues?.deck ? agreementData?.dataValues?.deck.replace(/_/g, " ") : "N/A"}</p>

              </td>
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Årsmodell
                <p>{agreementData?.dataValues?.vehicleYear || "N/A"}</p>
              </td>
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Färg
                <p>{agreementData?.dataValues?.color || "N/A"}</p>
              </td>
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Nycklar <p>{agreementData?.dataValues?.numberOfKeys || "N/A"}</p>
              </td>
              {/* <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Utsläppsklass
                <p>{agreementData.emissionClass || "N/A"}</p>
              </td> */}
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Effekt kW 
                <p>N/A</p>
              </td>
            </tr>
          </tbody>
        </table>

        
        <table className="border-collapse border border-gray-300 w-full min-w-[600px]">
          <tbody>
            <tr>
              <td className="border border-gray-300 px-2 py-[1px] pb-1.5 text-[9px]">
                Tillägsinformation
                <p>
                  {agreementData.freeTextMessage ||
                    agreementData.notes ||
                    "N/A"}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
