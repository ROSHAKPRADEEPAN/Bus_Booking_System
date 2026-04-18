import { motion } from "framer-motion";
import { Search, Calculator, CheckCircle } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Search className="text-primary text-2xl" />,
      title: "Easy Search & Filter",
      description:
        "Find the perfect vehicle by filtering based on your city, type, and other preferences.",
      bgClass: "bg-primary-light bg-opacity-10",
      iconClass: "text-primary",
    },
    {
      icon: <Calculator className="text-secondary text-2xl" />,
      title: "Cost Calculator",
      description:
        "Calculate your trip cost instantly based on distance and price per kilometer.",
      bgClass: "bg-secondary-light bg-opacity-10",
      iconClass: "text-secondary",
    },
    {
      icon: <CheckCircle className="text-accent text-2xl" />,
      title: "Instant Booking",
      description:
        "Book your desired vehicle instantly through our streamlined booking process.",
      bgClass: "bg-accent-light bg-opacity-10",
      iconClass: "text-accent",
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-gray-900 mb-4">
            Why Choose TransportEase?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform offers a seamless experience for booking transportation vehicles
            for all your needs.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass-card rounded-xl p-6 animate-hover"
              variants={itemVariants}
            >
              <div
                className={`${feature.bgClass} w-16 h-16 rounded-full flex items-center justify-center mb-6`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
