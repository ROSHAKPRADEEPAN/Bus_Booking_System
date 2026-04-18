import { Helmet } from "react-helmet";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import VehicleTypes from "@/components/vehicle-types";
import HowItWorks from "@/components/how-it-works";
import PopularCities from "@/components/popular-cities";
import Testimonials from "@/components/testimonials";
import CtaSection from "@/components/cta-section";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>TransportEase - Book Your Perfect Transportation Vehicle</title>
        <meta 
          name="description" 
          content="Find and book the ideal transportation for your events, functions and travels. Our vehicle booking system offers buses, vans, and cars at competitive rates." 
        />
        <meta property="og:title" content="TransportEase - Book Your Perfect Transportation Vehicle" />
        <meta property="og:description" content="Find and book the ideal transportation for your events, functions and travels." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div>
        <HeroSection />
        <FeaturesSection />
        <VehicleTypes />
        <HowItWorks />
        <PopularCities />
        <Testimonials />
        <CtaSection />
      </div>
    </>
  );
};

export default Home;
