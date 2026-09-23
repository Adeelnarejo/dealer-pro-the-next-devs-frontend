const Footer = () => {
  return (
    <footer className="bg-[#0D3466] text-white py-6 lg:pt-12 pt-6 px-6 font-plus-jakarta">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* DealerPro Section */}
          <div className="space-y-3 px-10">
            <h2 className="text-2xl font-bold text-white">DealerPro</h2>
            <p className="text-blue-200 text-sm leading-relaxed">
              Allt din bilfirma behöver – utan att det kostar en krona!
            </p>
          </div>

          {/* Navigation Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Navigation</h3>
            <nav className="flex flex-col space-y-2">
              <a
                href="#"
                className="text-blue-200 hover:text-white text-sm transition-colors duration-200"
              >
                Om oss
              </a>
              <a
                href="#"
                className="text-blue-200 hover:text-white text-sm transition-colors duration-200"
              >
                Funktioner
              </a>
              <a
                href="#"
                className="text-blue-200 hover:text-white text-sm transition-colors duration-200"
              >
                Kontakt
              </a>
              <a
                href="#"
                className="text-blue-200 hover:text-white text-sm transition-colors duration-200"
              >
                FAQ
              </a>
            </nav>
          </div>

          {/* Social Media Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Dataskydd</h3>
            <div className="flex flex-col space-y-2">
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-colors duration-200"
              >
                Allmänna villkor
              </a>
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-colors duration-200"
              >
                Integritetspolicy
              </a>
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-colors duration-200"
              >
                Cookiepolicy
              </a>
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-colors duration-200"
              >
                Dina rättigheter
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Kontakt</h3>
            <div className="flex flex-col space-y-2">
              <p className="text-blue-200 text-sm">Hej@dealerpro.se </p>
              {/* <p className="text-blue-200 text-sm">08-123 45 678</p> */}
              <a className="text-blue-200 text-sm" href="#">
                {/* facebook */}
                Facebook
              </a>
              <a className="text-blue-200 text-sm" href="#">
                {/* instagram */}
                Instagram
              </a>
              <a className="text-blue-200 text-sm" href="#">
                {/* linkedin */}
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 pt-6 border-t border-blue-800">
          <p className="text-blue-300 text-xs text-center">
            © 2024 BIICRM. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
