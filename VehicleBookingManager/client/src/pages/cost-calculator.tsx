import { useState } from "react";
import { Helmet } from "react-helmet";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import GlassCard from "@/components/ui/glass-card";
import { formatCurrency, calculateTripCost } from "@/lib/utils";
import { getMockVehicles } from "@/data/mock-vehicles";
import { Vehicle } from "@/types";

const formSchema = z.object({
  distance: z.string().min(1, { message: "Distance is required" })
    .refine((val) => !isNaN(Number(val)), { message: "Distance must be a number" })
    .refine((val) => Number(val) > 0, { message: "Distance must be greater than 0" }),
  vehicleType: z.string().min(1, { message: "Vehicle type is required" }),
});

type FormValues = z.infer<typeof formSchema>;

const CostCalculator = () => {
  const [result, setResult] = useState<{
    distance: number;
    vehicleType: string;
    pricePerKm: number;
    totalCost: number;
    vehicle: Vehicle | null;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      distance: "",
      vehicleType: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    const vehicles = getMockVehicles();
    const selectedVehicle = vehicles.find(v => v.id === data.vehicleType);
    
    if (selectedVehicle) {
      const distance = Number(data.distance);
      const totalCost = calculateTripCost(distance, selectedVehicle.pricePerKm);
      
      setResult({
        distance,
        vehicleType: selectedVehicle.name,
        pricePerKm: selectedVehicle.pricePerKm,
        totalCost,
        vehicle: selectedVehicle,
      });
    }
  };

  const handleReset = () => {
    reset();
    setResult(null);
  };

  const handleVehicleChange = (value: string) => {
    setValue("vehicleType", value);
  };

  return (
    <>
      <Helmet>
        <title>Trip Cost Calculator - TransportEase</title>
        <meta 
          name="description" 
          content="Calculate the cost of your trip based on distance and vehicle type" 
        />
      </Helmet>
      
      <section className="py-20 mt-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-poppins font-bold text-gray-900 mb-4">Trip Cost Calculator</h1>
              <p className="text-lg text-gray-600">Estimate the cost of your journey based on distance and vehicle type</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <GlassCard className="rounded-xl p-8 h-full">
                  <h2 className="text-2xl font-poppins font-semibold text-gray-900 mb-6">Calculate Your Trip Cost</h2>
                  
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="distance">
                        Trip Distance (km)
                      </label>
                      <Input
                        id="distance"
                        type="number"
                        className="form-input w-full px-4 py-3 rounded-lg border"
                        placeholder="Enter distance in kilometers"
                        {...register("distance")}
                      />
                      {errors.distance && (
                        <p className="mt-1 text-sm text-red-500">{errors.distance.message}</p>
                      )}
                    </div>
                    
                    <div className="mb-8">
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="vehicleType">
                        Vehicle Type
                      </label>
                      <Select onValueChange={handleVehicleChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                        <SelectContent>
                          {getMockVehicles().map((vehicle) => (
                            <SelectItem key={vehicle.id} value={vehicle.id}>
                              {vehicle.name} - {formatCurrency(vehicle.pricePerKm)}/km
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.vehicleType && (
                        <p className="mt-1 text-sm text-red-500">{errors.vehicleType.message}</p>
                      )}
                    </div>
                    
                    <div className="flex space-x-4">
                      <Button
                        type="submit"
                        className="btn-animate flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-lg transition-colors duration-300 shadow-md"
                      >
                        Calculate Cost
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleReset}
                        className="btn-animate flex-1"
                      >
                        Reset
                      </Button>
                    </div>
                  </form>
                </GlassCard>
              </motion.div>
              
              {/* Result Display */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <GlassCard className="rounded-xl p-8 h-full">
                  <h2 className="text-2xl font-poppins font-semibold text-gray-900 mb-6">Cost Estimation</h2>
                  
                  {result ? (
                    <div>
                      <div className="bg-primary/10 rounded-lg p-6 mb-6">
                        <div className="text-center mb-4">
                          <span className="text-2xl font-bold text-primary">
                            {formatCurrency(result.totalCost)}
                          </span>
                          <p className="text-gray-600">Estimated Total Cost</p>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Distance:</span>
                            <span className="font-medium">{result.distance} km</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Vehicle:</span>
                            <span className="font-medium">{result.vehicleType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Rate:</span>
                            <span className="font-medium">{formatCurrency(result.pricePerKm)}/km</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Calculation:</span>
                            <span className="font-medium">
                              {result.distance} km × {formatCurrency(result.pricePerKm)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {result.vehicle && (
                        <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                          {result.vehicle.imageUrl && (
                            <img
                              src={result.vehicle.imageUrl}
                              alt={result.vehicle.name}
                              className="w-16 h-16 object-cover rounded-md mr-4"
                            />
                          )}
                          <div>
                            <h3 className="font-medium">{result.vehicle.name}</h3>
                            <p className="text-sm text-gray-600">{result.vehicle.description}</p>
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-6">
                        <Button className="btn-animate w-full bg-secondary hover:bg-secondary-dark text-white font-medium py-3 rounded-lg transition-colors duration-300 shadow-md">
                          Book This Vehicle
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                      <svg
                        className="h-16 w-16 text-gray-400 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-gray-500">
                        Fill out the form to calculate your trip cost.
                      </p>
                      <p className="text-gray-500 text-sm mt-2">
                        The estimate will appear here.
                      </p>
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            </div>
            
            <div className="mt-12">
              <GlassCard className="rounded-xl p-8">
                <h2 className="text-2xl font-poppins font-semibold text-gray-900 mb-4">How Our Pricing Works</h2>
                <p className="text-gray-600 mb-6">
                  Our pricing is transparent and based on the distance traveled and the vehicle type you choose.
                  Each vehicle has a specific rate per kilometer, which is multiplied by the total distance of your trip.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-medium text-gray-900 mb-2">Distance Calculation</h3>
                    <p className="text-gray-600 text-sm">
                      We calculate the total distance of your journey from start to end points.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-medium text-gray-900 mb-2">Vehicle Rate</h3>
                    <p className="text-gray-600 text-sm">
                      Each vehicle has a fixed rate per kilometer based on its type and features.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-medium text-gray-900 mb-2">Total Cost</h3>
                    <p className="text-gray-600 text-sm">
                      Your total cost is simply the distance multiplied by the vehicle's rate per kilometer.
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 text-gray-600 text-sm">
                  <p>
                    <strong>Note:</strong> This calculator provides an estimate. Additional charges may apply for
                    waiting time, multiple stops, or special requirements.
                  </p>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CostCalculator;
