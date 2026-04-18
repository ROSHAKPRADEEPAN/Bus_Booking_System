import { motion } from "framer-motion";
import SearchForm from "@/components/search-form";

const HeroSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section
      className="parallax h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://cdn.pixabay.com/photo/2017/02/15/17/57/bus-2069419_1280.jpg')",
        paddingTop: "70px",
      }}
    >
      <div className="absolute inset-0 bg-dark-dark bg-opacity-50"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-poppins font-bold text-white mb-6"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            Book Your Perfect Ride
          </motion.h1>
          
          <motion.p
            className="text-xl text-gray-200 mb-10"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            Find and book the ideal transportation for your events, functions and travels.
            Fast, simple, reliable.
          </motion.p>
          
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <SearchForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
