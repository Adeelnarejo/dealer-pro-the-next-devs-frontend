import { useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navigate = useNavigate();

  return (
    <header className="font-plus-jakarta">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-xl font-semibold text-blue-600">
              DealerPro
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#about"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Om oss
            </a>
            <a
              href="#features"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Funktioner
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Kontakt
            </a>
            <a
              href="#faq"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              FAQ
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => navigate("login")}
              className="text-blue-600 hover:text-blue-700 transition-colors duration-200 flex items-center border border-[#98C2FA] rounded-md py-[10px] px-[16px] gap-2 cursor-pointer"
            >
              Logga in
              <span className="mr-1">
                <LogOut size={20} />
              </span>
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-blue-600 text-white px-[16px] py-[4px] rounded hover:bg-blue-700 transition-colors duration-200 flex items-center cursor-pointer"
            >
              <span className="mr-2 mb-1 text-2xl">+</span>
              Skapa konto
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-3">
              <a
                href="#about"
                className="block text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Om oss
              </a>
              <a
                href="#features"
                className="block text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Funktioner
              </a>
              <a
                href="#contact"
                className="block text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Kontakt
              </a>
              <a
                href="#faq"
                className="block text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                FAQ
              </a>
              <div className="space-y-3">
                <button className="flex items-center gap-2 w-full text-left text-blue-600 hover:text-blue-700 transition-colors duration-200">
                  Logga in
                  <span className="mr-1">
                    <LogOut size={20} />
                  </span>
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="block w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
                >
                  <span className="mr-2 mb-1 text-2xl">+</span> Skapa konto
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
