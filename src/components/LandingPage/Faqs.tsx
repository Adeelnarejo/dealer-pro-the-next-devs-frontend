import { useState } from "react";

const Faqs = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0); // First FAQ is open by default

  //   Kan jag hantera ägarbyten i plattformen?

  // Ägarbyte är på väg att lanseras i Dealerpro! Inom kort kan du sköta ägarbyten direkt från det signerade avtalet – allt du behöver göra är att godkänna, så sköts resten automatiskt.

  // Shape

  //  Kan jag använda Swish för betalningar och utbetalningar?

  // Ja, du kan både ta emot och skicka Swish-betalningar via Dealerpro. Det är ett snabbt och säkert sätt att hantera transaktioner, till exempel vid inköp från privatpersoner.

  // Shape

  // Kan jag annonsera mina bilar direkt på Blocket?

  // Absolut! Dealerpro gör det möjligt att publicera annonser på Blocket och Bytbil direkt från plattformen, vilket sparar tid och eliminerar dubbelarbete.

  // Shape

  //  Kan jag skapa fakturor och kvitton i olika valutor och språk?

  // Ja, du kan enkelt skapa fakturor och kvittounderlag på valfritt språk och i önskad valuta, vilket gör det enkelt att hantera affärer med kunder både i Sverige och inom EU.

  // Är Dealerpro kostnadsfritt för bilhandlare?

  // Ja! Dealerpro är helt kostnadsfritt för bilhandlare att använda. Vi finansierar plattformen genom vårt unika poängsystem som ger dig värde tillbaka för varje affär du gör, samt samarbeten med branschpartners. Det innebär att du kan använda alla funktioner utan några fasta avgifter eller dolda kostnader.

  // Vad är poängsystemet och hur fungerar det?

  // Poängsystemet är vår unika belöningsmodell där du tjänar poäng för varje affär eller aktivitet i Dealerpro. Poängen kan sedan användas för att få rabatter, tjänster eller andra förmåner. Tack vare detta kan vi erbjuda plattformen kostnadsfritt – du betalar alltså inte fasta avgifter utan får värde tillbaka för varje affär du gör.

  const faqs = [
    {
      id: 0,
      question: "Är Dealerpro kostnadsfritt för bilhandlare?",
      answer:
        "Ja! Dealerpro är helt kostnadsfritt att använda för bilhandlare. Du kan prova alla funktioner utan bindning och utan dolda avgifter. ",
    },
    {
      id: 1,
      question: "Hur fungerar digital signering med BankID? ",
      answer:
        "Med Dealerpro kan du skapa och signera avtal digitalt med BankID eller annan e-underskrift. Det är snabbt, säkert och juridiskt bindande.",
    },
    {
      id: 2,
      question: "Hur uppdateras lageröversikten? ",
      answer:
        "När du köper in, säljer eller förmedlar ett fordon uppdateras lageröversikten automatiskt i realtid. Du slipper manuella registreringar och får alltid en korrekt bild av ditt lager. ",
    },
    {
      id: 3,
      question: "Kan jag använda Swish för betalningar och utbetalningar?",
      answer:
        "Ja, du kan både ta emot och skicka Swish-betalningar via Dealerpro. Det är ett snabbt och säkert sätt att hantera transaktioner, till exempel vid inköp från privatpersoner.",
    },
    {
      id: 4,
      question: "Kan jag annonsera mina bilar direkt på Blocket?",
      answer:
        "Absolut! Dealerpro gör det möjligt att publicera annonser på Blocket och Bytbil direkt från plattformen, vilket sparar tid och eliminerar dubbelarbete.",
    },
    {
      id: 5,
      question: "Kan jag skapa fakturor och kvitton i olika valutor och språk?",
      answer:
        "Ja, du kan enkelt skapa fakturor och kvitton på valfritt språk och i önskad valuta, vilket gör det enkelt att hantera affärer med kunder både i Sverige och inom EU.",
    },
    {
      id: 6,
      question: "Vad är poängsystemet och hur fungerar det?",
      answer:
        "Poängsystemet är vår unika belöningsmodell där du tjänar poäng för varje affär eller aktivitet i Dealerpro. Poängen kan sedan användas för att få rabatter, tjänster eller andra förmåner. Tack vare detta kan vi erbjuda plattformen kostnadsfritt – du betalar alltså inte fasta avgifter utan får värde tillbaka för varje affär du gör.",
    },
  ];

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="py-16 px-4 bg-white font-plus-jakarta">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Vanliga frågor & svar
          </h2>
          <p className="text-gray-500 text-lg">Allt du behöver veta om oss</p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              {/* Question Header */}
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  <div
                    className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center transition-all duration-200 ${
                      openFaq === faq.id ? "border-blue-500 bg-blue-50" : ""
                    }`}
                  >
                    <span
                      className={`text-sm transition-transform duration-200 cursor-pointer ${
                        openFaq === faq.id
                          ? "transform rotate-45 text-blue-500"
                          : "text-gray-400"
                      }`}
                    >
                      +
                    </span>
                  </div>
                </div>
              </button>

              {/* Answer Content */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openFaq === faq.id
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faqs;
