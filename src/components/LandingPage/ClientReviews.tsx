import { useEffect, useRef, useState } from "react";
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
  const [activeReview, setActiveReview] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);

  const featuredReview = reviews[activeReview];

  /* =========================================================
     SCROLL FADE-IN
  ========================================================= */

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  /* =========================================================
     CHANGE REVIEW
  ========================================================= */

  const changeReview = (index: number) => {
    if (index === activeReview) return;

    setIsChanging(true);
    setActiveReview(index);

    window.setTimeout(() => {
      setIsChanging(false);
    }, 450);
  };

  /* =========================================================
     AUTO SLIDER
  ========================================================= */

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveReview((current) => {
        return (current + 1) % reviews.length;
      });
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`
        relative
        w-full
        overflow-hidden
        bg-white
        px-4
        py-12
        font-plus-jakarta
        transition-all
        duration-[1000ms]
        ease-[cubic-bezier(0.22,1,0.36,1)]

        dark:bg-[#020b16]

        sm:px-6
        sm:py-16

        lg:px-8
        lg:py-20

        ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }
      `}
    >
      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          top-10
          h-96
          w-96
          rounded-full
          bg-blue-500/10
          blur-[120px]
          animate-[reviewGlow_8s_ease-in-out_infinite]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-0
          h-96
          w-96
          rounded-full
          bg-cyan-400/10
          blur-[120px]
          animate-[reviewGlow_10s_ease-in-out_infinite_reverse]
        "
      />

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ===================================================
            MAIN REVIEW BANNER
        =================================================== */}

        <div
          className={`
            group/banner
            relative
            overflow-hidden
            rounded-3xl
            bg-gradient-to-br
            from-[#2563eb]
            via-[#416ff0]
            to-[#4f7cf7]
            shadow-[0_20px_55px_rgba(37,99,235,0.18)]
            transition-all
            duration-700

            hover:shadow-[0_30px_80px_rgba(37,99,235,0.25)]

            dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]

            ${
              isVisible
                ? "animate-[reviewBannerIn_900ms_cubic-bezier(0.22,1,0.36,1)]"
                : ""
            }
          `}
        >
          {/* =================================================
              DECORATIVE CIRCLES
          ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              -left-20
              -top-28
              h-72
              w-72
              rounded-full
              border
              border-white/10
              transition-transform
              duration-[1500ms]
              group-hover/banner:scale-125
              group-hover/banner:rotate-12
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              left-[30%]
              -bottom-32
              h-72
              w-72
              rounded-full
              border
              border-white/10
              transition-transform
              duration-[1800ms]
              group-hover/banner:-translate-y-10
              group-hover/banner:scale-110
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              right-[20%]
              -top-20
              h-48
              w-48
              rounded-full
              border
              border-white/10
              transition-transform
              duration-[1400ms]
              group-hover/banner:-translate-x-8
              group-hover/banner:scale-125
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-40
              -right-20
              h-80
              w-80
              rounded-full
              border
              border-white/10
              transition-transform
              duration-[1800ms]
              group-hover/banner:-translate-x-8
              group-hover/banner:-translate-y-8
            "
          />

          {/* =================================================
              MOVING SHINE
          ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              -left-[30%]
              top-0
              h-full
              w-[20%]
              rotate-[18deg]
              bg-white/10
              blur-xl
              transition-transform
              duration-[1800ms]
              group-hover/banner:translate-x-[700%]
            "
          />

          {/* =================================================
              CONTENT GRID
          ================================================= */}

          <div
            className="
              relative
              z-10
              grid
              items-center
              gap-8
              px-6
              py-8

              sm:px-9
              sm:py-10

              lg:grid-cols-[1fr_420px]
              lg:px-12
              lg:py-12
            "
          >
            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div
              className={`
                max-w-xl
                ${
                  isVisible
                    ? "animate-[reviewContentIn_800ms_cubic-bezier(0.22,1,0.36,1)]"
                    : "opacity-0"
                }
              `}
            >
              {/* Badge */}

              <div
                className="
                  mb-4
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-white/10
                  bg-white/10
                  px-3
                  py-1.5
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-white
                  shadow-lg
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white/15
                  sm:text-[9px]
                "
              >
                <CarFront
                  size={11}
                  className="
                    transition-transform
                    duration-500
                    group-hover/banner:rotate-[-8deg]
                  "
                />

                DealerPro Reviews
              </div>

              {/* Heading */}

              <h2
                className="
                  max-w-lg
                  text-3xl
                  font-bold
                  leading-[1.1]
                  tracking-tight
                  text-white
                  sm:text-4xl
                  lg:text-[42px]
                "
              >
                Our Clients

                <span
                  className={`
                    block
                    ${
                      isVisible
                        ? "animate-[titleReveal_900ms_ease-out]"
                        : "opacity-0"
                    }
                  `}
                >
                  Love DealerPro
                </span>
              </h2>

              {/* Description */}

              <p
                className={`
                  mt-4
                  max-w-lg
                  text-[10px]
                  leading-5
                  text-blue-100
                  sm:text-xs
                  sm:leading-6

                  ${
                    isVisible
                      ? "animate-[descriptionFadeIn_900ms_ease-out]"
                      : "opacity-0"
                  }
                `}
                style={{
                  animationDelay: "180ms",
                  animationFillMode: "both",
                }}
              >
                See what dealership owners and automotive
                professionals say about using DealerPro to
                manage their vehicles, customers and daily
                dealership operations.
              </p>

              {/* CTA */}

              <button
                type="button"
                className="
                  group/cta
                  mt-5
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-white
                  px-4
                  py-2.5
                  text-[9px]
                  font-bold
                  text-blue-600
                  shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:scale-[1.03]
                  hover:bg-blue-50
                  hover:shadow-xl
                  active:scale-95

                  dark:hover:bg-slate-100
                "
              >
                Read more reviews

                <span
                  className="
                    flex
                    h-5
                    w-5
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-50
                    transition-all
                    duration-300
                    group-hover/cta:bg-blue-100
                  "
                >
                  <ArrowRight
                    size={12}
                    className="
                      transition-transform
                      duration-300
                      group-hover/cta:translate-x-0.5
                    "
                  />
                </span>
              </button>

              {/* Review selectors */}

              <div className="mt-7 flex items-center gap-2">
                {reviews.map((review, index) => (
                  <button
                    key={review.id}
                    type="button"
                    aria-label={`Show review from ${review.name}`}
                    onClick={() => changeReview(index)}
                    className="
                      group/dot
                      flex
                      items-center
                      gap-1.5
                    "
                  >
                    <span
                      className={`
                        h-1.5
                        rounded-full
                        transition-all
                        duration-500

                        ${
                          activeReview === index
                            ? "w-8 bg-white"
                            : "w-1.5 bg-white/40 group-hover/dot:w-3 group-hover/dot:bg-white/70"
                        }
                      `}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* =================================================
                REVIEW CARD
            ================================================= */}

            <div
              className={`
                relative
                [perspective:1200px]

                ${
                  isVisible
                    ? "animate-[reviewCardIn_1000ms_cubic-bezier(0.22,1,0.36,1)]"
                    : "opacity-0"
                }
              `}
              style={{
                animationDelay: "180ms",
                animationFillMode: "both",
              }}
            >
              <div
                className="
                  group/card
                  relative
                  rounded-2xl
                  bg-white
                  p-5
                  shadow-[0_25px_60px_rgba(15,23,42,0.20)]
                  transition-all
                  duration-700
                  ease-out
                  hover:-translate-y-2
                  hover:rotate-[0.5deg]
                  hover:shadow-[0_35px_80px_rgba(15,23,42,0.26)]

                  dark:bg-[#0b1a2b]
                  dark:shadow-[0_25px_60px_rgba(0,0,0,0.4)]

                  sm:p-6
                "
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Top shine */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-0
                    h-px
                    w-1/2
                    -translate-x-1/2
                    bg-gradient-to-r
                    from-transparent
                    via-blue-400
                    to-transparent
                    opacity-70
                  "
                />

                {/* Quote + Stars */}

                <div className="mb-3 flex items-center justify-between">
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-blue-50
                      text-blue-600
                      shadow-sm
                      transition-all
                      duration-500
                      group-hover/card:rotate-[-8deg]
                      group-hover/card:scale-110

                      dark:bg-blue-500/10
                      dark:text-blue-400
                    "
                  >
                    <Quote size={14} />
                  </div>

                  <div className="flex gap-0.5">
                    {Array.from({
                      length: featuredReview.rating,
                    }).map((_, index) => (
                      <Star
                        key={index}
                        size={12}
                        className="
                          fill-yellow-400
                          text-yellow-400
                          animate-[starPop_500ms_ease-out]
                        "
                        style={{
                          animationDelay: `${index * 70}ms`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Review */}

                <div
                  key={featuredReview.id}
                  className={
                    isChanging
                      ? "animate-[reviewSwap_450ms_cubic-bezier(0.22,1,0.36,1)]"
                      : ""
                  }
                >
                  <p
                    className="
                      text-[10px]
                      leading-5
                      text-slate-600
                      transition-colors
                      duration-300
                      dark:text-slate-300
                      sm:text-xs
                      sm:leading-6
                    "
                  >
                    "{featuredReview.text}"
                  </p>

                  {/* Customer */}

                  <div
                    className="
                      mt-5
                      flex
                      items-center
                      gap-3
                      border-t
                      border-slate-100
                      pt-4
                      transition-colors
                      duration-300

                      dark:border-slate-700/70
                    "
                  >
                    <div
                      className="
                        relative
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-blue-600
                        text-[10px]
                        font-bold
                        text-white
                        shadow-lg
                        shadow-blue-600/20
                        transition-all
                        duration-500
                        group-hover/card:scale-110
                        group-hover/card:shadow-blue-600/35
                      "
                    >
                      {featuredReview.initials}

                      <span
                        className="
                          absolute
                          -right-0.5
                          -top-0.5
                          h-2.5
                          w-2.5
                          rounded-full
                          border-2
                          border-white
                          bg-emerald-400

                          dark:border-[#0b1a2b]
                        "
                      />
                    </div>

                    <div>
                      <p
                        className="
                          text-[10px]
                          font-bold
                          text-slate-900
                          dark:text-white
                        "
                      >
                        {featuredReview.name}
                      </p>

                      <p
                        className="
                          mt-0.5
                          text-[8px]
                          text-slate-400
                          dark:text-slate-500
                        "
                      >
                        {featuredReview.role} ·{" "}
                        {featuredReview.dealership}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -bottom-10
                    left-1/2
                    h-16
                    w-1/2
                    -translate-x-1/2
                    rounded-full
                    bg-blue-500/10
                    blur-2xl
                    transition-all
                    duration-500
                    group-hover/card:w-3/4
                  "
                />
              </div>

              {/* =================================================
                  FLOATING RATING
              ================================================= */}

              <div
                className="
                  absolute
                  -bottom-3
                  -right-2
                  rounded-full
                  border
                  border-white/60
                  bg-white
                  px-3
                  py-1.5
                  shadow-[0_15px_35px_rgba(15,23,42,0.15)]
                  backdrop-blur-xl
                  animate-[ratingFloat_4s_ease-in-out_infinite]

                  dark:border-slate-700
                  dark:bg-[#0b1a2b]
                  dark:shadow-[0_15px_35px_rgba(0,0,0,0.35)]

                  sm:right-4
                "
              >
                <div className="flex items-center gap-1.5">
                  <Star
                    size={11}
                    className="
                      fill-yellow-400
                      text-yellow-400
                      animate-[starPulse_2s_ease-in-out_infinite]
                    "
                  />

                  <span
                    className="
                      text-[9px]
                      font-bold
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

        <div
          className="
            mt-5
            grid
            grid-cols-1
            gap-4
            md:grid-cols-2
          "
        >
          {reviews.slice(1).map((review, index) => (
            <button
              type="button"
              key={review.id}
              onClick={() =>
                changeReview(
                  reviews.findIndex(
                    (item) => item.id === review.id
                  )
                )
              }
              className={`
                group/review
                relative
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                text-left
                shadow-sm
                transition-all
                duration-500

                hover:-translate-y-2
                hover:scale-[1.01]
                hover:border-blue-200
                hover:shadow-[0_25px_55px_rgba(15,23,42,0.12)]

                dark:border-slate-700/70
                dark:bg-[#0b1a2b]
                dark:shadow-none
                dark:hover:border-blue-500/30
                dark:hover:bg-[#0e2135]
                dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]

                ${
                  isVisible
                    ? "animate-[cardReveal_800ms_cubic-bezier(0.22,1,0.36,1)]"
                    : "opacity-0"
                }
              `}
              style={{
                animationDelay: isVisible
                  ? `${400 + index * 160}ms`
                  : "0ms",
                animationFillMode: "both",
              }}
            >
              {/* Hover glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-10
                  -top-10
                  h-24
                  w-24
                  rounded-full
                  bg-blue-500/10
                  blur-2xl
                  opacity-0
                  transition-all
                  duration-500
                  group-hover/review:opacity-100
                "
              />

              {/* Stars + Quote */}

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex gap-0.5">
                  {Array.from({
                    length: review.rating,
                  }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={12}
                      className="
                        fill-yellow-400
                        text-yellow-400
                        transition-transform
                        duration-300
                        group-hover/review:scale-110
                      "
                      style={{
                        transitionDelay: `${starIndex * 35}ms`,
                      }}
                    />
                  ))}
                </div>

                <Quote
                  size={18}
                  className="
                    text-blue-100
                    transition-all
                    duration-500
                    group-hover/review:rotate-[-8deg]
                    group-hover/review:scale-110
                    group-hover/review:text-blue-200

                    dark:text-blue-500/20
                    dark:group-hover/review:text-blue-500/30
                  "
                />
              </div>

              {/* Text */}

              <p
                className="
                  relative
                  z-10
                  mt-4
                  text-[10px]
                  leading-5
                  text-slate-500
                  transition-colors
                  duration-300
                  dark:text-slate-300
                  sm:text-xs
                  sm:leading-6
                "
              >
                "{review.text}"
              </p>

              {/* Author */}

              <div
                className="
                  relative
                  z-10
                  mt-5
                  flex
                  items-center
                  gap-3
                  border-t
                  border-slate-100
                  pt-4
                  transition-colors
                  duration-300

                  dark:border-slate-700/70
                "
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-slate-100
                    text-[9px]
                    font-bold
                    text-blue-600
                    transition-all
                    duration-500

                    group-hover/review:scale-110
                    group-hover/review:bg-blue-600
                    group-hover/review:text-white

                    dark:bg-blue-500/10
                    dark:text-blue-400
                    dark:group-hover/review:bg-blue-600
                    dark:group-hover/review:text-white
                  "
                >
                  {review.initials}
                </div>

                <div>
                  <p
                    className="
                      text-[10px]
                      font-bold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    {review.name}
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[8px]
                      text-slate-400
                      dark:text-slate-500
                    "
                  >
                    {review.role} · {review.dealership}
                  </p>
                </div>

                <ArrowRight
                  size={14}
                  className="
                    ml-auto
                    text-slate-300
                    transition-all
                    duration-500
                    group-hover/review:translate-x-1
                    group-hover/review:text-blue-500

                    dark:text-slate-600
                  "
                />
              </div>
            </button>
          ))}
        </div>

        {/* =====================================================
            TRUST LINE
        ===================================================== */}

        <div
          className={`
            mt-7
            flex
            flex-col
            items-center
            justify-center
            gap-2
            text-center

            sm:flex-row

            ${
              isVisible
                ? "animate-[trustFadeIn_900ms_ease-out]"
                : "opacity-0"
            }
          `}
          style={{
            animationDelay: "700ms",
            animationFillMode: "both",
          }}
        >
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={13}
                className="
                  fill-yellow-400
                  text-yellow-400
                  animate-[starPop_700ms_ease-out]
                "
                style={{
                  animationDelay: `${index * 80}ms`,
                }}
              />
            ))}
          </div>

          <p
            className="
              text-[10px]
              text-slate-500
              transition-colors
              duration-300
              dark:text-slate-400
            "
          >
            Trusted by dealership owners and automotive professionals
          </p>
        </div>
      </div>

      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style>
        {`
          /* Main section/banner */

          @keyframes reviewBannerIn {
            0% {
              opacity: 0;
              transform: translateY(35px) scale(0.985);
              filter: blur(5px);
            }

            60% {
              opacity: 1;
              transform: translateY(-3px) scale(1.002);
              filter: blur(0);
            }

            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0);
            }
          }

          /* Left content */

          @keyframes reviewContentIn {
            0% {
              opacity: 0;
              transform: translateX(-28px);
            }

            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          /* Heading */

          @keyframes titleReveal {
            0% {
              opacity: 0;
              transform: translateY(16px);
              filter: blur(6px);
            }

            100% {
              opacity: 1;
              transform: translateY(0);
              filter: blur(0);
            }
          }

          /* Description */

          @keyframes descriptionFadeIn {
            0% {
              opacity: 0;
              transform: translateY(12px);
            }

            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Review card */

          @keyframes reviewCardIn {
            0% {
              opacity: 0;
              transform: translateX(35px) translateY(15px)
                scale(0.96) rotateY(-5deg);
              filter: blur(5px);
            }

            70% {
              opacity: 1;
              transform: translateX(-3px) translateY(-2px)
                scale(1.01) rotateY(0deg);
              filter: blur(0);
            }

            100% {
              opacity: 1;
              transform: translateX(0) translateY(0)
                scale(1) rotateY(0deg);
            }
          }

          /* Changing review */

          @keyframes reviewSwap {
            0% {
              opacity: 0;
              transform: translateX(25px) scale(0.97);
              filter: blur(4px);
            }

            60% {
              opacity: 1;
              transform: translateX(-3px) scale(1.01);
              filter: blur(0);
            }

            100% {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }

          /* Bottom cards */

          @keyframes cardReveal {
            0% {
              opacity: 0;
              transform: translateY(28px) scale(0.97);
              filter: blur(4px);
            }

            70% {
              opacity: 1;
              transform: translateY(-2px) scale(1.01);
              filter: blur(0);
            }

            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          /* Trust */

          @keyframes trustFadeIn {
            0% {
              opacity: 0;
              transform: translateY(18px);
              filter: blur(3px);
            }

            100% {
              opacity: 1;
              transform: translateY(0);
              filter: blur(0);
            }
          }

          /* Floating rating */

          @keyframes ratingFloat {
            0%,
            100% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-5px);
            }
          }

          /* Star pulse */

          @keyframes starPulse {
            0%,
            100% {
              transform: scale(1);
            }

            50% {
              transform: scale(1.18);
            }
          }

          /* Star entrance */

          @keyframes starPop {
            0% {
              opacity: 0;
              transform: scale(0.4) rotate(-15deg);
            }

            70% {
              opacity: 1;
              transform: scale(1.15) rotate(3deg);
            }

            100% {
              opacity: 1;
              transform: scale(1) rotate(0);
            }
          }

          /* Background glow */

          @keyframes reviewGlow {
            0%,
            100% {
              transform: translate3d(0, 0, 0) scale(1);
            }

            50% {
              transform: translate3d(25px, -15px, 0) scale(1.08);
            }
          }

          /* Accessibility */

          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              scroll-behavior: auto !important;
            }
          }
        `}
      </style>
    </section>
  );
};

export default ClientReviews;