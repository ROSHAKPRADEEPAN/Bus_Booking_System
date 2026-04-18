// User Types
export interface User {
  id: string;
  username: string;
  email: string;
  role: "user" | "owner";
}

// Vehicle Types
export interface Vehicle {
  id: string;
  name: string;
  type: "bus" | "van" | "car" | "luxury";
  description: string;
  capacity: number;
  pricePerKm: number;
  city: string;
  available: boolean;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  features?: string[];
  owner?: {
    id: string;
    name: string;
    rating: number;
  };
}

// City Types
export interface City {
  id: string;
  name: string;
  imageUrl: string;
  vehiclesCount: number;
}

// Booking Types
export interface Booking {
  id: string;
  userId: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropLocation: string;
  distance: number;
  totalCost: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

// Form Types
export interface SearchFormData {
  city: string;
  vehicleType: string;
  date: string;
}

export interface UserLoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface UserRegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export interface OwnerRegisterFormData {
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  password: string;
  confirmPassword: string;
  city: string;
  vehicleTypes: {
    bus: boolean;
    van: boolean;
    car: boolean;
    luxury: boolean;
  };
  additionalInfo?: string;
  terms: boolean;
}

export interface CostCalculatorFormData {
  distance: string;
  vehicleType: string;
}
