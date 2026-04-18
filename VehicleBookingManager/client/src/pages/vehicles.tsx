import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import GlassCard from "@/components/ui/glass-card";
import VehicleCard from "@/components/vehicle-card";
import { formatCurrency } from "@/lib/utils";
import { Vehicle } from "@/types";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState<number[]>([2000]);
  const [filters, setFilters] = useState({
    city: "",
    type: "",
    search: "",
  });

  const [tripStart, setTripStart] = useState("");
    const [tripEnd, setTripEnd] = useState("");

  // ✅ Fetch vehicles dynamically based on filters and date range
  const fetchVehicles = async () => {
  setLoading(true);
  try {
    let response;
    if (filters.city && tripStart && tripEnd) {
      // ✅ Convert to proper ISO format for Spring Boot
      const startISO = new Date(tripStart).toISOString().slice(0, 19);
      const endISO = new Date(tripEnd).toISOString().slice(0, 19);

      console.log("📡 Fetching available vehicles:", {
        city: filters.city,
        start: startISO,
        end: endISO,
      });

      response = await fetch(
        `http://localhost:8090/api/vehicles/available?city=${filters.city}&start=${startISO}&end=${endISO}`
      );
    } else {
      response = await fetch("http://localhost:8090/api/vehicles");
    }

    if (!response.ok) throw new Error("Failed to fetch vehicles");

    const data = await response.json();
    console.log("✅ Fetched vehicles:", data);

    const safeData = data.map((v: any) => ({
      ...v,
      description: v.description || "Comfortable and reliable vehicle.",
      imageUrl: v.picture
        ? v.picture.startsWith("data:image")
          ? v.picture
          : `data:image/jpeg;base64,${v.picture}`
        : "https://via.placeholder.com/400x200",
      rating: v.rating ?? 4.5,
      reviewCount: v.reviewCount ?? 10,
      pricePerKm: v.pricePerKm ?? v.ratePerKm ?? 0,
    }));

    setVehicles(safeData);
    setFilteredVehicles(safeData);
  } catch (error) {
    console.error("❌ Error fetching vehicles:", error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchVehicles();
  }, [filters.city, tripStart, tripEnd]);

  // ✅ Filter vehicles on the client side
  useEffect(() => {
    let filtered = [...vehicles];

    if (filters.city.trim()) {
      filtered = filtered.filter((v) =>
        v.city?.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    if (filters.type.trim()) {
      filtered = filtered.filter((v) =>
        v.type?.toLowerCase().includes(filters.type.toLowerCase())
      );
    }

    filtered = filtered.filter((v) => v.pricePerKm <= priceRange[0]);

    if (filters.search.trim()) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (v) =>
          v.name?.toLowerCase().includes(searchTerm) ||
          v.description?.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredVehicles(filtered);
  }, [filters.city, filters.type, filters.search, priceRange, vehicles]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values);
  };

  const handleReset = () => {
    setFilters({
      city: "",
      type: "",
      search: "",
    });
    setTripStart("");
    setTripEnd("");
    setPriceRange([2000]);
    fetchVehicles();
  };

  const staggerVehicles = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <>
      <Helmet>
        <title>Available Vehicles - TransportEase</title>
        <meta
          name="description"
          content="Browse and book from our wide range of available vehicles for your trip."
        />
      </Helmet>

      <section className="py-20 mt-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-poppins font-bold text-gray-900 mb-4">
                Available Vehicles
              </h1>
              <p className="text-lg text-gray-600">
                Find and book the perfect vehicle for your journey.
              </p>
            </div>

            {/* Filters Section */}
            <GlassCard className="rounded-xl p-6 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {/* City Input */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    City
                  </label>
                  <Input
                    type="text"
                    name="city"
                    placeholder="Enter city..."
                    value={filters.city}
                    onChange={handleChange}
                  />
                </div>

                {/* Type Input */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Vehicle Type
                  </label>
                  <Input
                    type="text"
                    name="type"
                    placeholder="Enter type (Car, Bus...)"
                    value={filters.type}
                    onChange={handleChange}
                  />
                </div>

                {/* Trip Start Date */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Trip Start
                  </label>
                  <Input
                    type="datetime-local"
                    value={tripStart}
                    onChange={(e) => setTripStart(e.target.value)}
                  />
                </div>

                {/* Trip End Date */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Trip End
                  </label>
                  <Input
                    type="datetime-local"
                    value={tripEnd}
                    onChange={(e) => setTripEnd(e.target.value)}
                  />
                </div>

                {/* Search Field */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Search
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      name="search"
                      placeholder="Search vehicles..."
                      value={filters.search}
                      onChange={handleChange}
                    />
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      className="whitespace-nowrap"
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="mt-8">
                <label className="block text-gray-700 font-medium mb-2">
                  Max Price (per km): {formatCurrency(priceRange[0])}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={handlePriceRangeChange}
                  max={3000}
                  min={100}
                  step={100}
                  className="py-4"
                />
              </div>
            </GlassCard>

            {/* Vehicles Grid */}
            {loading ? (
              <div className="text-center py-12">
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
                <p className="mt-4 text-gray-600">Loading vehicles...</p>
              </div>
            ) : filteredVehicles.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={staggerVehicles}
                initial="hidden"
                animate="show"
              >
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                <p className="mt-4 text-gray-600">
                  No vehicles found matching your filters.
                </p>
                <Button variant="outline" onClick={handleReset} className="mt-4">
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Vehicles;
