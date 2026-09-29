import About from "../../components/LandingPage/About.tsx";
import Banner from "../../components/LandingPage/Banner.tsx";
import Faqs from "../../components/LandingPage/Faqs.tsx";
import Features from "../../components/LandingPage/OfferBanner.tsx";
import Footer from "../../components/LandingPage/Footer.tsx";
import Header from "../../components/LandingPage/Header.tsx";
import Hero from "../../components/LandingPage/Hero.tsx";
import Stats from "../../components/LandingPage/Cars.tsx";
import Testimonials from "../../components/LandingPage/Testimonials.tsx";
import ClientReviews from "../../components/LandingPage/ClientReviews.tsx";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#020b16]">
      {/* Global Header */}
      <Header />

      {/* Landing Page Content */}
      <main>
        <Hero />

        <About />

        <Stats />

        <Features />

        <Testimonials />

        <Faqs />

        <Banner />

        <ClientReviews />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;