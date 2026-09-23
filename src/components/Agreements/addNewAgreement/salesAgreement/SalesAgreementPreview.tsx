import { AgreementPreviewIcon } from "../../../utils/Icons";
// import { useState } from "react";

export default function SalesAgreementPreview({
  form,
  searchResults,
  searchTradeInVehicle,
  preview,
  isCreating,
  handlePrint,
}: {
  form: any;
  searchResults: {
    vehicle: { data?: any[] } | null;
    person: { data?: any[] } | null;
    org: { data?: any[] } | null;
  };
  searchTradeInVehicle: { vehicle: { data?: any[] } | null };
  preview: { tradeInVehicle?: string };
  isCreating: boolean;
  handlePrint: () => void;
}) {
  // const [formData, setFormData] = useState({
  //   registrationNumber: "",
  // });

  // const handleChange = (
  //   e: React.ChangeEvent<
  //     HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  //   >
  // ) => {
  //   const { name, value } = e.target;

  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  console.log(searchResults);

  return (
    <div>
      <div className="bg-white rounded-lg p-6 shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[15px] text-gray-700">
            Försäljningsavtal{" "}
            <span className="text-gray-400 text-sm">
              (Förhandsgranska i realtid)
            </span>
          </h2>
          <button
            className="text-[#012F7A] hover:text-blue-700"
            onClick={handlePrint}
            disabled={isCreating}
          >
            <AgreementPreviewIcon />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="bg-[#F0F7FF] px-6 py-4">
            Fordonsinformation
          </h3>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-y-3">
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Registreringsnummer
              </div>

              <div className="text-[16px] font-normal text-[#2E343E]">
                {searchResults.vehicle?.data?.[0]?.registrationData
                  ?.registrationNumber || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Fordonsmärke
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {searchResults?.vehicle?.data?.[0]?.detail?.vehicleBrand &&
                searchResults?.vehicle?.data?.[0]?.detail?.vehicleModelRaw
                  ? `${searchResults.vehicle.data[0].detail.vehicleBrand}`
                  : "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Fordonsmodell
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {searchResults?.vehicle?.data?.[0]?.detail?.vehicleBrand &&
                searchResults?.vehicle?.data?.[0]?.detail?.vehicleModelRaw
                  ? `${searchResults.vehicle.data[0].detail.vehicleModel}`
                  : "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Färg
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {searchResults.vehicle?.data?.[0]?.detail?.color || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Chassinummer
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {searchResults.vehicle?.data?.[0]?.detail?.chassisNumber ||
                  "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Fordons år
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {searchResults.vehicle?.data?.[0]?.detail?.vehicleYear || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Växellåda
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {searchResults.vehicle?.data?.[0]?.technicalData?.gearbox ||
                  "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Bränsletyp
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {searchResults.vehicle?.data?.[0]?.technicalData?.fuelCodes?.join(
                  ", "
                ) || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Försäljningsdatum
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.salesDate || "N/A"}
              </div>
            </div>
          </div>
        </div>

        {(form.customerType === "company" ||
          form.customerType === "private individual") && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[16px] font-semibold text-gray-900 mb-0">
                Kundinformation
              </h3>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  form.customerType === "company"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {form.customerType === "company"
                  ? "Company"
                  : "Private Individual"}
              </span>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-y-2">
              {form.customerType === "company" ? (
                <>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Kundtyp
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.customerType || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Organisationsnummer
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {searchResults.org?.data?.[0]?.legalId || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Company Name
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {searchResults.org?.data?.[0]?.orgName?.name || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Adress
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {searchResults.org?.data?.[0]?.addresses?.[0]?.street &&
                      searchResults.org?.data?.[0]?.addresses?.[0]?.number
                        ? `${searchResults.org?.data?.[0]?.addresses?.[0]?.street} ${searchResults.org?.data?.[0]?.addresses?.[0]?.number}`
                        : "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Postnummer
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {searchResults.org?.data?.[0]?.addresses?.[0]?.zip ||
                        "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Stad
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {searchResults.org?.data?.[0]?.addresses?.[0]?.city
                        ? `${searchResults.org?.data?.[0]?.addresses?.[0]?.zip} ${searchResults.org?.data?.[0]?.addresses?.[0]?.city}`
                        : "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Telefon
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.phone || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      E-postadress
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.email || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Kontroll
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.verification || "N/A"}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Kundtyp
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.customerType || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Namn
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {searchResults.person?.data?.[0]?.name?.givenName ||
                        "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Personnummer
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {searchResults.person?.data?.[0]?.legalId || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Adress
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {searchResults.person?.data?.[0]?.addresses?.[0]
                        ?.street &&
                      searchResults.person?.data?.[0]?.addresses?.[0]?.number
                        ? `${searchResults.person?.data?.[0]?.addresses?.[0]?.street} ${searchResults.person?.data?.[0]?.addresses?.[0]?.number}`
                        : "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      E-post
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.email || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Telefon
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.phone || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Postnummer
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {searchResults.person?.data?.[0]?.addresses?.[0]?.zip
                        ? searchResults.person?.data?.[0]?.addresses?.[0]?.zip
                        : "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Stad
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {searchResults.person?.data?.[0]?.addresses?.[0]?.city
                        ? searchResults.person?.data?.[0]?.addresses?.[0]?.city
                        : "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      E-postadress
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.email || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      PEP
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.pep || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Kontroll
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.verification || "N/A"}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {preview.tradeInVehicle && (
          <div className="mb-4">
            <h3 className="text-[16px] font-semibold text-gray-900 mb-2">
              Information om inbytesfordon
            </h3>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-y-2">
              <div>
                <div className="text-[14px] font-medium text-[#91959A]">
                  Inbytesfordon:
                </div>
                <div className="text-[16px] font-normal text-[#2E343E]">
                  {preview.tradeInVehicle === "yes" ? "Yes" : "No"}
                </div>
              </div>
              {preview.tradeInVehicle === "yes" && (
                <>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Registreringsnummer:
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {searchTradeInVehicle.vehicle?.data?.[0]?.registrationData
                        ?.registrationNumber || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Fordonsmärke:
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {searchTradeInVehicle.vehicle?.data?.[0]?.detail?.vehicleBrand || "N/A"}
                    </div>

                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Fordonsmodell:
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {searchTradeInVehicle.vehicle?.data?.[0]?.detail?.vehicleModel || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Inköpsdatum:
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.tradeInPurchaseDate || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Inköpspris:
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.tradeInPurchasePrice || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                     Miltal:
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.tradeInMileage || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#91959A]">
                      Kreditmärkning:
                    </div>
                    <div className="text-[16px] font-normal text-[#2E343E]">
                      {form.tradeInCreditMaking || "N/A"}
                    </div>
                  </div>
                  {form.tradeInRestAmount && (
                    <div>
                      <div className="text-[14px] font-medium text-[#91959A]">
                        Restbelopp:
                      </div>
                      <div className="text-[16px] font-normal text-[#2E343E]">
                        {form.tradeInRestAmount || "N/A"}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-[18px] font-semibold text-gray-900 mb-3">
            Försäljningsinformation
          </h3>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-y-3">
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Försäljningspris (SEK)
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.salesPriceSEK || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Betalningsmetod
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.paymentMethod || "N/A"}
              </div>
            </div>
            {(form.paymentMethod === "financing_down" ||
              form.paymentMethod === "leasing" ||
              form.paymentMethod === "financing_no_down") && (
              <>
                <div>
                  <div className="text-[14px] font-medium text-[#91959A]">
                    Finansiellt företag
                  </div>
                  <div className="text-[16px] font-normal text-[#2E343E]">
                    {form.financialCompany || "N/A"}
                  </div>
                </div>
                <div>
                  <div className="text-[14px] font-medium text-[#91959A]">
                    Kreditbelopp Försäljning
                  </div>
                  <div className="text-[16px] font-normal text-[#2E343E]">
                    {form.creditAmountSales || "N/A"}
                  </div>
                </div>
                <div>
                  <div className="text-[14px] font-medium text-[#91959A]">
                    Kontantstapel
                  </div>
                  <div className="text-[16px] font-normal text-[#2E343E]">
                    {form.cashStack || "N/A"}
                  </div>
                </div>
                <div>
                  <div className="text-[14px] font-medium text-[#91959A]">
                    Lånetid
                  </div>
                  <div className="text-[16px] font-normal text-[#2E343E]">
                    {form.loanPeriod || "N/A"}
                  </div>
                </div>
              </>
            )}
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Betalningsdatum
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.paymentDate || "N/A"}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-[18px] font-semibold text-gray-900 mb-3">
            Fordonsspecifikationer
          </h3>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-y-3">
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
               momstyp
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.vatType || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Körsträcka (km)
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.mileage || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">Keys</div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.numberOfKeys || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Däck
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.deck || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Försäkringsgivare
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.insurer || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Typ av försäkring
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.insuranceType || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Garantileverantör
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.warrantyProvider || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Garantiprodukt
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.warrantyProduct || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Senaste tjänsten
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.latestServiceDate || "N/A"}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-[18px] font-semibold text-gray-900 mb-3">
            Leveransinformation
          </h3>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-y-3">
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Leveransinformation
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.deliveryDate || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Leveransplats
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.deliveryLocation || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#91959A]">
                Leveransvillkor
              </div>
              <div className="text-[16px] font-normal text-[#2E343E]">
                {form.deliveryTerms || "N/A"}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-[18px] font-semibold text-gray-900 mb-3">
            Betalningsinformation
          </h3>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-y-3">
            <div className="text-[14px] font-medium text-[#91959A]">
              Gratis SMS (Betalning)
            </div>
            <div className="text-[16px] font-normal text-[#2E343E]">
              {form.freeTextMessage || "N/A"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
