import { motion } from "framer-motion";
import GlassCard from "@/components/ui/glass-card";
import { Star } from "lucide-react";

interface Testimonial {
  rating: number;
  content: string;
  author: {
    initials: string;
    name: string;
    position: string;
  };
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      rating: 5.0,
      content:
        "We booked a luxury bus for our corporate retreat and the experience was fantastic. The booking process was simple, and the vehicle was exactly as described. Would definitely use again!",
      author: {
        initials: "RK",
        name: "Rahul Kumar",
        position: "HR Manager, Tech Solutions",
      },
    },
    {
      rating: 4.5,
      content:
        "I used TransportEase to book a van for my family function. The cost calculator helped me budget accurately, and the driver was punctual and professional. Great service overall!",
      author: {
        initials: "PP",
        name: "Priya Patel",
        position: "Event Planner",
      },
    },
    {
      rating: 5.0,
      content:
        "As a vehicle owner, listing my fleet on TransportEase has significantly increased my bookings. The platform is easy to use, and the support team is very responsive. Highly recommended!",
      author: {
        initials: "AK",
        name: "Amit Khan",
        position: "Fleet Owner, Star Travels",
      },
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

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="fill-current text-yellow-400" />);
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <svg
          key="half"
          className="h-5 w-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M12 1.5l2.779 6.4L22 9.125l-5 4.875 1.178 6.875L12 17.5l-6.178 3.375L7 14l-5-4.875 7.221-1.225L12 1.5z"
            clipRule="evenodd"
            fill="url(#half-star)"
          />
          <defs>
            <linearGradient id="half-star" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="none" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      );
    }

    // Empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="text-yellow-400 stroke-current fill-none" />
      );
    }

    return stars;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Read testimonials from customers who have used our platform to book transportation
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <GlassCard className="rounded-xl p-6 animate-hover">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 flex">
                    {renderStars(testimonial.rating)}
                  </div>
                  <span className="ml-2 text-gray-600">{testimonial.rating.toFixed(1)}</span>
                </div>
                <p className="text-gray-600 mb-6">{testimonial.content}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl font-semibold text-gray-600">
                    {testimonial.author.initials}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-poppins font-semibold text-gray-900">
                      {testimonial.author.name}
                    </h4>
                    <p className="text-sm text-gray-500">{testimonial.author.position}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
