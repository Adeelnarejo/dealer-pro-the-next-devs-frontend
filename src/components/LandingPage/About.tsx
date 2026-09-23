import { useNavigate } from "react-router-dom";
import { aboutImg } from "../../assets";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white py-16 lg:py-24 font-plus-jakarta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative">
            <img
              src={aboutImg}
              alt="DealerPro Dashboard Interface"
              className="w-full lg:h-[457px] md:h-[360px] h-[300px] rounded-2xl shadow-lg object-cover"
            />
          </div>

          <div className="lg:pl-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Affärssystemet för bilhandlare
            </h2>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Dealerpro är ett affärssystem utvecklat specifikt för bilhandlare
              som vill arbeta smartare. Här samlar vi allt du behöver på ett och
              samma ställe – från lageröversikt och digitala avtal med
              BankID-signering, till Swish-utbetalningar, automatisk annonsering
              på Blocket och Bytbil, samt detaljerad fordonsinformation om
              ägare, skulder och historik.
            </p>

            <button
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Skapa konto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
