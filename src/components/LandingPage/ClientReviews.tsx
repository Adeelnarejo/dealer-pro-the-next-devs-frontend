import {
  Star,
  Quote,
  ArrowRight,
  CarFront,
} from "lucide-react";

interface Review {
  id: number;
  name: string;
  role: string;
  dealership: string;
  text: string;
  rating: number;
  initials: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "James Anderson",
    role: "Dealership Owner",
    dealership: "Anderson Motors",
    text:
      "DealerPro has completely simplified the way we manage our dealership. Our vehicle inventory, customers and sales are now all organized in one place.",
    rating: 5,
    initials: "JA",
  },
  {
    id: 2,
    name: "Michael Roberts",
    role: "Sales Manager",
    dealership: "Roberts Auto Group",
    text:
      "The inventory management and digital contracts have saved our team hours every week. Everything feels much easier to manage now.",
    rating: 5,
    initials: "MR",
  },
  {
    id: 3,
    name: "David Wilson",
    role: "Dealership Manager",
    dealership: "Wilson Automotive",
    text:
      "DealerPro gives us a much clearer overview of our vehicles and daily dealership operations. Our whole team adopted it very quickly.",
    rating: 5,
    initials: "DW",
  },
];

const ClientReviews = () => {
  return (
    <section
      className="
        w-full
        bg-white
        px-4 py-12
        font-plus-jakarta
        transition-colors duration-300
        dark:bg-[#020b16]
        sm:px-6
        lg:px-8 lg:py-16
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            MAIN REVIEW BANNER
        ===================================================== */}

        <div
          className="
            relative overflow-hidden rounded-3xl
            bg-gradient-to-br
            from-[#2563eb]
            via-[#416ff0]
            to-[#4f7cf7]
            shadow-sm
            dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]
          "
        >

          {/* Decorative circles */}

          <div className="pointer-events-none absolute -left-20 -top-28 h-72 w-72 rounded-full border border-white/10" />

          <div className="pointer-events-none absolute left-[30%] -bottom-32 h-72 w-72 rounded-full border border-white/10" />

          <div className="pointer-events-none absolute right-[20%] -top-20 h-48 w-48 rounded-full border border-white/10" />

          <div className="pointer-events-none absolute right-[-100px] bottom-[-140px] h-80 w-80 rounded-full border border-white/10" />

          {/* =================================================
              CONTENT
          ================================================= */}

          <div
            className="
              relative z-10 grid items-center gap-8
              px-6 py-8
              sm:px-9 sm:py-10
              lg:grid-cols-[1fr_420px]
              lg:px-12 lg:py-12
            "
          >

            {/* =================================================
                LEFT
            ================================================= */}

            <div className="max-w-xl">

              {/* Badge */}

              <div
                className="
                  mb-4 inline-flex items-center gap-1.5
                  rounded-full
                  bg-white/10
                  px-3 py-1.5
                  text-[8px] font-bold uppercase
                  tracking-[0.15em]
                  text-white
                  backdrop-blur-sm
                  sm:text-[9px]
                "
              >
                <CarFront size={11} />

                DealerPro Reviews
              </div>

              {/* Heading */}

              <h2
                className="
                  max-w-lg
                  text-3xl font-bold
                  leading-[1.1]
                  tracking-tight
                  text-white
                  sm:text-4xl
                  lg:text-[42px]
                "
              >
                Our Clients
                <span className="block">
                  Love DealerPro
                </span>
              </h2>

              {/* Description */}

              <p
                className="
                  mt-4 max-w-lg
                  text-[10px]
                  leading-5
                  text-blue-100
                  sm:text-xs sm:leading-6
                "
              >
                See what dealership owners and automotive professionals
                say about using DealerPro to manage their vehicles,
                customers and daily dealership operations.
              </p>

              {/* CTA */}

              <button
                type="button"
                className="
                  group mt-5 flex items-center gap-2
                  rounded-full
                  bg-white
                  px-4 py-2.5
                  text-[9px] font-bold
                  text-blue-600
                  shadow-lg
                  transition-all duration-300
                  hover:bg-blue-50
                  dark:hover:bg-slate-100
                "
              >
                Read more reviews

                <ArrowRight
                  size={12}
                  className="
                    transition-transform duration-300
                    group-hover:translate-x-1
                  "
                />
              </button>

            </div>

            {/* =================================================
                REVIEW CARD
            ================================================= */}

            <div className="relative">

              <div
                className="
                  rounded-2xl
                  bg-white
                  p-5
                  shadow-[0_20px_50px_rgba(15,23,42,0.18)]
                  transition-colors duration-300
                  dark:bg-[#0b1a2b]
                  dark:shadow-[0_20px_50px_rgba(0,0,0,0.35)]
                  sm:p-6
                "
              >

                {/* Quote */}

                <div className="mb-3 flex items-center justify-between">

                  <div
                    className="
                      flex h-8 w-8 items-center justify-center
                      rounded-full
                      bg-blue-50
                      text-blue-600
                      dark:bg-blue-500/10
                      dark:text-blue-400
                    "
                  >
                    <Quote size={14} />
                  </div>

                  {/* Stars */}

                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        size={12}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                </div>

                {/* Review */}

                <p
                  className="
                    text-[10px]
                    leading-5
                    text-slate-600
                    transition-colors duration-300
                    dark:text-slate-300
                    sm:text-xs sm:leading-6
                  "
                >
                  "{reviews[0].text}"
                </p>

                {/* Customer */}

                <div
                  className="
                    mt-5 flex items-center gap-3
                    border-t
                    border-slate-100
                    pt-4
                    transition-colors duration-300
                    dark:border-slate-700/70
                  "
                >

                  <div
                    className="
                      flex h-9 w-9 items-center justify-center
                      rounded-full
                      bg-blue-600
                      text-[10px] font-bold
                      text-white
                    "
                  >
                    {reviews[0].initials}
                  </div>

                  <div>

                    <p
                      className="
                        text-[10px] font-bold
                        text-slate-900
                        transition-colors duration-300
                        dark:text-white
                      "
                    >
                      {reviews[0].name}
                    </p>

                    <p
                      className="
                        mt-0.5 text-[8px]
                        text-slate-400
                        dark:text-slate-500
                      "
                    >
                      {reviews[0].role} · {reviews[0].dealership}
                    </p>

                  </div>

                </div>

              </div>

              {/* Floating rating */}

              <div
                className="
                  absolute -bottom-3 -right-2
                  rounded-full
                  bg-white
                  px-3 py-1.5
                  shadow-lg
                  transition-colors duration-300
                  dark:bg-[#0b1a2b]
                  dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)]
                  sm:right-4
                "
              >

                <div className="flex items-center gap-1.5">

                  <Star
                    size={11}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  <span
                    className="
                      text-[9px] font-bold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    5.0
                  </span>

                  <span
                    className="
                      text-[8px]
                      text-slate-400
                      dark:text-slate-500
                    "
                  >
                    Dealer Reviews
                  </span>

                </div>

              </div>

            </div>

          </div>
        </div>

        {/* =====================================================
            REVIEW CARDS
        ===================================================== */}

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">

          {reviews.slice(1).map((review) => (
            <div
              key={review.id}
              className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-lg
                dark:border-slate-700/70
                dark:bg-[#0b1a2b]
                dark:shadow-none
                dark:hover:bg-[#0e2135]
                dark:hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)]
              "
            >

              {/* Stars */}

              <div className="flex items-center justify-between">

                <div className="flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star
                      key={index}
                      size={12}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <Quote
                  size={18}
                  className="
                    text-blue-100
                    dark:text-blue-500/20
                  "
                />

              </div>

              {/* Text */}

              <p
                className="
                  mt-4
                  text-[10px]
                  leading-5
                  text-slate-500
                  transition-colors duration-300
                  dark:text-slate-300
                  sm:text-xs sm:leading-6
                "
              >
                "{review.text}"
              </p>

              {/* Author */}

              <div
                className="
                  mt-5 flex items-center gap-3
                  border-t
                  border-slate-100
                  pt-4
                  transition-colors duration-300
                  dark:border-slate-700/70
                "
              >

                <div
                  className="
                    flex h-9 w-9 items-center justify-center
                    rounded-full
                    bg-slate-100
                    text-[9px] font-bold
                    text-blue-600
                    transition-colors duration-300
                    dark:bg-blue-500/10
                    dark:text-blue-400
                  "
                >
                  {review.initials}
                </div>

                <div>

                  <p
                    className="
                      text-[10px] font-bold
                      text-slate-900
                      transition-colors duration-300
                      dark:text-white
                    "
                  >
                    {review.name}
                  </p>

                  <p
                    className="
                      mt-0.5 text-[8px]
                      text-slate-400
                      dark:text-slate-500
                    "
                  >
                    {review.role} · {review.dealership}
                  </p>

                </div>

              </div>

            </div>
          ))}

        </div>

        {/* =====================================================
            TRUST LINE
        ===================================================== */}

        <div
          className="
            mt-7 flex flex-col
            items-center justify-center
            gap-2 text-center
            sm:flex-row
          "
        >

          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={13}
                className="fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>

          <p
            className="
              text-[10px]
              text-slate-500
              transition-colors duration-300
              dark:text-slate-400
            "
          >
            Trusted by dealership owners and automotive professionals
          </p>

        </div>

      </div>
    </section>
  );
};

export default ClientReviews;