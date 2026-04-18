import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Vehicle } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Link } from "wouter";
import { Users, Star, Clock, MapPin } from "lucide-react";

interface VehicleCardProps {
  vehicle: Vehicle;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  return (
    <motion.div
      className="rounded-xl overflow-hidden shadow-lg animate-hover bg-white"
      variants={cardVariants}
    >
      <div className="relative h-64">
       <img
  src={
    vehicle.imageUrl
      ? vehicle.imageUrl // ✅ already prefixed base64 from backend
      : "https://via.placeholder.com/400x200?text=No+Image"
  }
  alt={vehicle.name || "Vehicle"}
  className="w-full h-full object-cover"
/>

      
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-dark to-transparent py-6 px-4">
          <h3 className="text-white font-poppins font-semibold text-xl">
            {vehicle.name}
          </h3>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-gray-600 text-sm">{vehicle.city}</span>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="text-gray-600 text-sm">
              {vehicle.rating} ({vehicle.reviewCount} reviews)
            </span>
          </div>
        </div>

        <p className="text-gray-600 mb-4">{vehicle.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-2 rounded-lg text-center">
            <Users className="h-4 w-4 text-primary mx-auto mb-1" />
            <span className="text-gray-600 text-sm">
              {vehicle.capacity} Passengers
            </span>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg text-center">
            <Clock className="h-4 w-4 text-primary mx-auto mb-1" />
            <span className="text-gray-600 text-sm">
              {vehicle.available ? "Available Now" : "Not Available"}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="block text-primary font-semibold text-xl">
              {formatCurrency(vehicle.pricePerKm)}
            </span>
            <span className="text-gray-500 text-sm">per kilometer</span>
          </div>

          <Link href="/calculator">
            <Button variant="outline" size="sm">
              Calculate Cost
            </Button>
          </Link>
        </div>

        {/* ✅ Navigation to booking page */}
        <Link href={`/booking/${vehicle.id}`}>
          <Button className="btn-animate bg-primary text-white w-full hover:bg-primary-dark transition-colors duration-300">
            Book Now
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default VehicleCard;
