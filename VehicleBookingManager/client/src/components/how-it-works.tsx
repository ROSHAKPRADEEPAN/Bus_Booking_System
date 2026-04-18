import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Search",
      description: "Enter your location, date, and vehicle preference to find available options.",
    },
    {
      number: "2",
      title: "Compare",
      description: "Browse through available vehicles and compare prices, features, and reviews.",
    },
    {
      number: "3",
      title: "Book",
      description: "Select your preferred vehicle and book it instantly with secure payment options.",
    },
    {
      number: "4",
      title: "Travel",
      description: "Enjoy your journey with the confidence of a confirmed booking and professional service.",
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
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Book your ideal transportation in just a few simple steps
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              variants={itemVariants}
            >
              <div className="w-20 h-20 bg-primary-light bg-opacity-10 rounded-full flex items-center justify-center mb-6 relative">
                <span className="text-primary font-poppins font-bold text-2xl">
                  {step.number}
                </span>
                <motion.div
                  className="absolute w-full h-full rounded-full border-2 border-primary border-dashed"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                ></motion.div>
              </div>
              <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
