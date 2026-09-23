import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Vector } from "../../assets";

const Hero = () => {
  const topRowRef = useRef(null);
  const bottomRowRef = useRef(null);
  const navigate = useNavigate();

  const topRowImages = [
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1542362567-b07e54358753?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=300&h=400&fit=crop",
  ];

  const bottomRowImages = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1611651338412-8403fa6e3599?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=300&h=400&fit=crop",
  ];

  const altTexts = [
    "Car exterior",
    "Black luxury car",
    "Yellow sports car",
    "White car",
    "Dark car",
    "Car interior",
    "Blue car",
    "Car showroom",
    "Handshake deal",
    "Woman in car",
    "Car keys",
    "Red sports car",
  ];

  // Duplicate images for seamless loop
  const duplicatedTopRow = [...topRowImages, ...topRowImages, ...topRowImages];
  const duplicatedBottomRow = [
    ...bottomRowImages,
    ...bottomRowImages,
    ...bottomRowImages,
  ];

  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full pointer-events-none z-0">
        <img className="w-full h-full opacity-5" src={Vector} alt="" />
      </div>
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="text-center">
          <div className="inline-block mb-6">
            <span className="text-sm text-gray-600 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
              Kostnadsfritt för bilhandlare
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight max-w-4xl mx-auto">
            Allt din bilfirma behöver – utan att det kostar en krona
          </h1>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-12 mb-12">
            <div className="flex items-center text-[#232323] text-[18px] font-medium bg-[#E9F2FE] px-4 py-2 rounded-full shadow-sm">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
              <span>Helt kostnadsfritt</span>
            </div>
            <div className="flex items-center text-[#232323] text-[18px] font-medium bg-[#E9F2FE] px-4 py-2 rounded-full shadow-sm">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
              <span>Inga startavgifter</span>
            </div>
            <div className="flex items-center text-[#232323] text-[18px] font-medium bg-[#E9F2FE] px-4 py-2 rounded-full shadow-sm">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
              <span>Ingen uppsägningstid</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Skapa konto
          </button>
        </div>
      </div>

      {/* Image Slider Section */}
      <div className="relative mt-16">
        {/* Gradient overlays for fading effect - only at the ends */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-100 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-100 to-transparent z-10 pointer-events-none"></div>

        {/* Top row - sliding left to right */}
        <div className="relative h-32 lg:h-40 mb-4 overflow-hidden">
          <div
            ref={topRowRef}
            className="flex space-x-3 animate-slide-right"
            style={{
              width: `${duplicatedTopRow.length * 160}px`,
              animation: "slideRight 40s linear infinite",
            }}
          >
            {duplicatedTopRow.map((image, index) => (
              <div
                key={`top-${index}`}
                className="flex-shrink-0 w-36 h-32 lg:w-40 lg:h-40 bg-gray-200 overflow-hidden rounded-[12px] hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                <img
                  src={image}
                  alt={altTexts[index % altTexts.length]}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row - sliding right to left */}
        <div className="relative h-32 lg:h-40 overflow-hidden">
          <div
            ref={bottomRowRef}
            className="flex space-x-3 animate-slide-left"
            style={{
              width: `${duplicatedBottomRow.length * 160}px`,
              animation: "slideLeft 40s linear infinite",
            }}
          >
            {duplicatedBottomRow.map((image, index) => (
              <div
                key={`bottom-${index}`}
                className="flex-shrink-0 w-36 h-32 lg:w-40 lg:h-40 bg-gray-200 overflow-hidden rounded-[12px] hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                <img
                  src={image}
                  alt={altTexts[index % altTexts.length]}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideRight {
          from {
            transform: translateX(-33.333%);
          }
          to {
            transform: translateX(0%);
          }
        }

        @keyframes slideLeft {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-33.333%);
          }
        }

        .animate-slide-right {
          animation: slideRight 40s linear infinite;
        }

        .animate-slide-left {
          animation: slideLeft 40s linear infinite;
        }

        /* Pause animation on hover */
        .animate-slide-right:hover,
        .animate-slide-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Hero;
