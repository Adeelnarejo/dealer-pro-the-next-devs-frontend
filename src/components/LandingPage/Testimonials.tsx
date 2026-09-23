const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.",
      author: "Andrew Jackson",
      position: "left",
    },
    {
      id: 2,
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porta natoque volutpat mauris lectus enim, sapien tempor risus aptent. Neque tortor nostra suscipit maecenas bibendum dui porttitor. Amet quis commodo amet, sodales iaculis diam. Congue pharetra class gravida, phasellus pretium semper. Volutpat nascetur sit accumsan et elit, posuere tempus blandit. Nibh enim lacinia hendrerit sed elit faucibus ullamcorper odio. Cubilia lobortis iaculis fringilla dapibus ligula nec lacus fringilla. Volutpat imperdiet et accumsan nisi quisque tempus blandit. Nibh enim lacinia hendrerit sed elit faucibus. Cubilia lobortis iaculis fringilla dapibus ligula nec lacus fringilla. Volutpat nascetur sit accumsan qui, posuere tempus blandit. Nibh enim lacinia hendrerit sed elit faucibus.",
      author: "Andrew Jackson",
      position: "center",
    },
    {
      id: 3,
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.",
      author: "Andrew Jackson",
      position: "right-top",
    },
    {
      id: 4,
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.",
      author: "Andrew Jackson",
      position: "left-bottom",
    },
    {
      id: 5,
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.",
      author: "Andrew Jackson",
      position: "right-bottom",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="py-16 px-4 bg-[#E9F2FE] font-plus-jakarta">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What our customers say
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
          {/* Left Column */}
          <div className="space-y-6">
            {/* First testimonial - left */}
            <div className="bg-white p-6 rounded-2xl shadow-sm relative">
              <div className="flex mb-4">{renderStars(5)}</div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {testimonials[0].text}
              </p>
              <p className="font-semibold text-gray-900">
                {testimonials[0].author}
              </p>
              <div className="absolute -bottom-2 -right-2 text-red-400 text-6xl font-bold opacity-20">
                "
              </div>
            </div>

            {/* Fourth testimonial - left bottom */}
            <div className="bg-white p-6 rounded-2xl shadow-sm relative">
              <div className="flex mb-4">{renderStars(5)}</div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {testimonials[3].text}
              </p>
              <p className="font-semibold text-gray-900">
                {testimonials[3].author}
              </p>
              <div className="absolute -bottom-2 -right-2 text-red-400 text-6xl font-bold opacity-20">
                "
              </div>
            </div>
          </div>

          {/* Center Column */}
          <div className="space-y-6">
            {/* Second testimonial - center (longer) */}
            <div className="bg-white p-6 rounded-2xl shadow-sm relative">
              <div className="flex mb-4">{renderStars(5)}</div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {testimonials[1].text}
              </p>
              <p className="font-semibold text-gray-900">
                {testimonials[1].author}
              </p>
              <div className="absolute -bottom-2 -right-2 text-red-400 text-6xl font-bold opacity-20">
                "
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Third testimonial - right top */}
            <div className="bg-white p-6 rounded-2xl shadow-sm relative">
              <div className="flex mb-4">{renderStars(5)}</div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {testimonials[2].text}
              </p>
              <p className="font-semibold text-gray-900">
                {testimonials[2].author}
              </p>
              <div className="absolute -bottom-2 -right-2 text-red-400 text-6xl font-bold opacity-20">
                "
              </div>
            </div>

            {/* Fifth testimonial - right bottom */}
            <div className="bg-white p-6 rounded-2xl shadow-sm relative">
              <div className="flex mb-4">{renderStars(5)}</div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {testimonials[4].text}
              </p>
              <p className="font-semibold text-gray-900">
                {testimonials[4].author}
              </p>
              <div className="absolute -bottom-2 -right-2 text-red-400 text-6xl font-bold opacity-20">
                "
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
