import { motion } from "framer-motion";
import { getMockCities } from "@/data/mock-cities";
import { Link } from "wouter";

const PopularCities = () => {
  const cities = getMockCities();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-gray-900 mb-4">
            Popular Destinations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our most requested cities with available transportation options
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {cities.map((city, index) => (
            <motion.div
              key={index}
              className="rounded-xl overflow-hidden shadow-lg animate-hover relative group"
              variants={itemVariants}
            >
              <img
                src={city.imageUrl}
                alt={city.name}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-dark to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 w-full p-4">
                <h3 className="text-white font-poppins font-semibold text-xl">
                  {city.name}
                </h3>
                <p className="text-gray-200 text-sm">{city.vehiclesCount}+ vehicles available</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PopularCities;
