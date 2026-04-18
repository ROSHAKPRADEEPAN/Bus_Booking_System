import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const VehicleTypes = () => {
  const vehicleTypes = [
    {
      name: "Luxury Buses",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      description: "Perfect for large groups, weddings, corporate events, and long-distance travel. Includes premium amenities.",
      linkText: "Explore Buses",
    },
    {
      name: "Passenger Vans",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      description: "Ideal for medium-sized groups, family outings, and airport transfers. Comfortable seating for 10-15 people.",
      linkText: "Explore Vans",
    },
    {
      name: "Premium Cars",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      description: "Luxury sedans and SUVs for executive travel, special occasions, and personalized transportation needs.",
      linkText: "Explore Cars",
    },
  ];

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
            Explore Our Vehicle Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect transportation option for your next event or journey.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {vehicleTypes.map((vehicle, index) => (
            <motion.div
              key={index}
              className="rounded-xl overflow-hidden shadow-lg animate-hover"
              variants={itemVariants}
            >
              <div className="relative h-64">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-dark to-transparent py-6 px-4">
                  <h3 className="text-white font-poppins font-semibold text-xl">
                    {vehicle.name}
                  </h3>
                </div>
              </div>
              <div className="p-6 bg-white">
                <p className="text-gray-600 mb-4">{vehicle.description}</p>
                <Link href="/vehicles">
                  <Button className="btn-animate bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors duration-300">
                    {vehicle.linkText}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default VehicleTypes;
