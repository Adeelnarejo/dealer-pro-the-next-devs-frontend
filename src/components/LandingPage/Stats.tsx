const Stats = () => {
  return (
    <div className="bg-gray-800 py-16 lg:py-20 font-plus-jakarta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-gray-400 text-lg">
            Skapa ett konto och signera ditt första avtal med BankID – inom 5
            minuter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center">
          <div>
            <div className="text-4xl lg:text-5xl font-bold text-white mb-3">
              1
            </div>
            <div className="text-gray-400 text-base">Skapa</div>
          </div>

          <div>
            <div className="text-4xl lg:text-5xl font-bold text-white mb-3">
              2
            </div>
            <div className="text-gray-400 text-base">Anpassa</div>
          </div>

          <div>
            <div className="text-4xl lg:text-5xl font-bold text-white mb-3">
              3
            </div>
            <div className="text-gray-400 text-base">Lägg till</div>
          </div>

          <div>
            <div className="text-4xl lg:text-5xl font-bold text-white mb-3">
              4
            </div>
            <div className="text-gray-400 text-base">Kör igång</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
