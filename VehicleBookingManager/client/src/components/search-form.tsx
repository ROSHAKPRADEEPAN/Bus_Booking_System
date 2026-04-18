import { useState } from "react";
import { useLocation } from "wouter";
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
import { Search } from "lucide-react";

const formSchema = z.object({
  city: z.string().min(1, { message: "City is required" }),
  vehicleType: z.string().min(1, { message: "Vehicle type is required" }),
  date: z.string().min(1, { message: "Date is required" }),
});

type FormValues = z.infer<typeof formSchema>;

const SearchForm = () => {
  const [, navigate] = useLocation();
  const currentDate = new Date().toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
      vehicleType: "",
      date: currentDate,
    },
  });

  const onSubmit = (data: FormValues) => {
    // In a real app, we would pass these search parameters to the vehicles page
    // For now, just navigate to the vehicles page
    navigate("/vehicles");
  };

  const handleCityChange = (value: string) => {
    setValue("city", value);
  };

  const handleVehicleTypeChange = (value: string) => {
    setValue("vehicleType", value);
  };

  return (
    <GlassCard className="rounded-xl p-6 md:p-8 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-dark font-medium mb-2">City</label>
            <Select onValueChange={handleCityChange}>
              <SelectTrigger className="w-full form-input px-4 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="delhi">Delhi</SelectItem>
                <SelectItem value="bangalore">Bangalore</SelectItem>
                <SelectItem value="hyderabad">Hyderabad</SelectItem>
                <SelectItem value="chennai">Chennai</SelectItem>
              </SelectContent>
            </Select>
            {errors.city && (
              <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>
            )}
          </div>
          <div>
            <label className="block text-dark font-medium mb-2">Vehicle Type</label>
            <Select onValueChange={handleVehicleTypeChange}>
              <SelectTrigger className="w-full form-input px-4 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bus">Bus</SelectItem>
                <SelectItem value="van">Van</SelectItem>
                <SelectItem value="car">Car</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
              </SelectContent>
            </Select>
            {errors.vehicleType && (
              <p className="mt-1 text-sm text-red-500">{errors.vehicleType.message}</p>
            )}
          </div>
          <div>
            <label className="block text-dark font-medium mb-2">Date</label>
            <Input
              type="date"
              className="form-input w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none"
              min={currentDate}
              {...register("date")}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>
            )}
          </div>
        </div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button type="submit" className="btn-animate w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-lg transition-colors duration-300 shadow-md flex items-center justify-center">
            <Search className="h-4 w-4 mr-2" /> Find Vehicles
          </Button>
        </motion.div>
      </form>
    </GlassCard>
  );
};

export default SearchForm;
