import {
  feature1,
  feature2,
  feature3,
  feature4,
  feature5,
  feature6,
} from "../../assets";

const Features = () => {
  return (
    <div className="py-16 px-4 max-w-7xl mx-auto font-plus-jakarta">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Funktioner som förenklar din bilförsäljning
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Upptäck en komplett verktygslåda byggd för bilhandlare. Varje funktion
          är skapad för att spara tid och ge dig full kontroll.
        </p>
      </div>

      <div className="rounded-3xl p-8 md:py-12 py-0 md:p-12 mb-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Lageröversikt
            </h3>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Se dina lagerbilar, sålda fordon och omsättning direkt i systemet.
              Plattformen är sömlöst integrerad med både Bytbil och Blocket –
              vilket innebär att du slipper dubbelarbete och får maximal
              räckvidd med ett klick.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 text-lg">
                  Visa fordon i lager och sålda bilar
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 text-lg">
                  Annonsera enkelt direkt till Blocket och Bytbil
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 text-lg">
                  Skapa utgifter direkt från lagret
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src={feature1}
              alt="DealerPro Dashboard Interface"
              className="w-full lg:h-[457px] md:h-[360px] h-[300px] rounded-tr-2xl rounded-br-2xl object-cover"
            />
          </div>
        </div>
      </div>

      <div className="rounded-3xl p-8 md:py-12 py-0 md:p-12 mb-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative order-2 md:order-1">
            <img
              src={feature2}
              alt="Vehicle Questions Management"
              className="w-full lg:h-[457px] md:h-[360px] h-[300px] rounded-tl-2xl rounded-bl-2xl object-cover"
            />
          </div>

          <div className="order-1 md:order-2">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Information om fordon
            </h3>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Med Dealerpro får du tillgång till detaljerad fordonsdata på några
              sekunder. Hämta information om fordonets ägare, tekniska
              specifikationer, skulder och historik – allt direkt från
              Transportstyrelsens vägtrafikregister.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 text-lg">
                  Fordonsuppgifter & Teknisk Information
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 text-lg">
                  Ägar- och skuldinformation
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 text-lg">
                  Fordonskatt & Besiktningsstatus
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl p-8 md:py-12 py-0 md:p-12 mb-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Inköp, Försäljning & Förmedlingsavtal
            </h3>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Skapa, hantera och lagra alla dina bilhandlaravtal på ett och
              samma ställe. Signera enkelt med BankID eller digital underskrift
              – snabbt, säkert och juridiskt bindande.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 text-lg">
                  Digital signering med BankID eller e-underskrift.
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 text-lg">
                  Säker dokumenthantering.
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 text-lg">
                  Smidig export till bokföring
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src={feature3}
              alt="Agreements Management System"
              className="w-full lg:h-[457px] md:h-[360px] h-[300px] rounded-tr-2xl rounded-br-2xl object-cover"
            />
          </div>
        </div>
      </div>

      <div className="rounded-3xl p-8 md:py-12 py-0 md:p-12 mb-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative order-2 md:order-1">
            <img
              src={feature4}
              alt="Invoice & Receipt Management"
              className="w-full lg:h-[457px] md:h-[360px] h-[300px] rounded-tl-2xl rounded-bl-2xl object-cover"
            />
          </div>

          <div className="order-1 md:order-2">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Fakturering & kvittohantering
            </h3>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Skapa fakturor och kvittounderlag med bara några klick. Välj
              önskad valuta och språk för att enkelt anpassa underlagen till
              dina kunder – oavsett om de finns i Sverige eller inom EU.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 text-lg">
                  Fakturera på valfritt språk och valuta
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 text-lg">
                  Generera kontantkvitton smidigt
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 text-lg">
                  Smidig export till bokföring
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl p-8 md:py-12 py-0 md:p-12 mb-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Swisha vid inköp från privatpersoner
            </h3>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Gör smidiga utbetalningar till privatpersoner vid bilinköp –
              direkt via Swish. Pengarna skickas snabbt och säkert, och
              transaktionen loggas automatiskt i systemet som en del av affären.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 text-lg">
                  Snabba utbetalningar i realtid
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 text-lg">
                  Full kontroll och spårbarhet
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 text-lg">
                  Säker utbetalning med BankID
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src={feature5}
              alt="Swish Payment Integration"
              className="w-full lg:h-[457px] md:h-[360px] h-[300px] rounded-tr-2xl rounded-br-2xl object-cover"
            />
          </div>
        </div>
      </div>

      <div className="rounded-3xl p-8 md:py-12 py-0 md:p-12 mb-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative order-2 md:order-1">
            <img
              src={feature6}
              alt="Ownership Change Management"
              className="w-full lg:h-[457px] md:h-[360px] h-[300px] rounded-tl-2xl rounded-bl-2xl object-cover"
            />
          </div>

          <div className="order-1 md:order-2">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ägarbyte, kommer inom kort!
            </h3>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Hantera ägarbyten smidigt och effektivt – direkt i systemet. Inom
              kort kan ni även hantera ägarbyten direkt i plattformen.
              Uppgifterna skickas automatiskt från det signerade avtalet – det
              enda ni behöver göra är att godkänna. Enklare och snabbare än så
              blir det inte.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 text-lg">
                  Ägarbytet sker direkt från avtalet
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 text-lg">
                  Kunden kan köra iväg direkt
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 text-lg">
                  Lageröversikten uppdateras i realtid
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
