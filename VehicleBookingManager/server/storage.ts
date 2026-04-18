import { 
  users, 
  vehicles, 
  vehicleTypes, 
  bookings, 
  reviews,
  type User, 
  type Vehicle, 
  type VehicleType, 
  type Booking, 
  type Review,
  type InsertUser,
  type InsertVehicle,
  type InsertVehicleType,
  type InsertBooking,
  type InsertReview
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Vehicle operations
  getVehicle(id: number): Promise<Vehicle | undefined>;
  getAllVehicles(): Promise<Vehicle[]>;
  getVehiclesByOwner(ownerId: number): Promise<Vehicle[]>;
  getVehiclesByCity(city: string): Promise<Vehicle[]>;
  getVehiclesByType(type: string): Promise<Vehicle[]>;
  getVehiclesByCityAndType(city: string, type: string): Promise<Vehicle[]>;
  createVehicle(vehicle: InsertVehicle): Promise<Vehicle>;
  updateVehicleAvailability(id: number, available: boolean): Promise<Vehicle | undefined>;
  
  // Vehicle Type operations
  getVehicleType(id: number): Promise<VehicleType | undefined>;
  getAllVehicleTypes(): Promise<VehicleType[]>;
  createVehicleType(vehicleType: InsertVehicleType): Promise<VehicleType>;
  
  // Booking operations
  getBooking(id: number): Promise<Booking | undefined>;
  getUserBookings(userId: number): Promise<Booking[]>;
  getVehicleBookings(vehicleId: number): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;
  
  // Review operations
  getReview(id: number): Promise<Review | undefined>;
  getVehicleReviews(vehicleId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  
  // City operations
  getCities(): Promise<{id: number, name: string, count: number}[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private vehicles: Map<number, Vehicle>;
  private vehicleTypes: Map<number, VehicleType>;
  private bookings: Map<number, Booking>;
  private reviews: Map<number, Review>;
  
  private userId: number;
  private vehicleId: number;
  private vehicleTypeId: number;
  private bookingId: number;
  private reviewId: number;

  constructor() {
    this.users = new Map();
    this.vehicles = new Map();
    this.vehicleTypes = new Map();
    this.bookings = new Map();
    this.reviews = new Map();
    
    this.userId = 1;
    this.vehicleId = 1;
    this.vehicleTypeId = 1;
    this.bookingId = 1;
    this.reviewId = 1;
    
    // Initialize with some vehicle types
    this.initializeVehicleTypes();
  }

  private initializeVehicleTypes() {
    const types = [
      { name: "bus", description: "Large vehicles for group transportation" },
      { name: "van", description: "Medium-sized vehicles for small groups" },
      { name: "car", description: "Standard vehicles for small groups or individuals" },
      { name: "luxury", description: "Premium vehicles for special occasions" }
    ];
    
    types.forEach(type => {
      this.createVehicleType({
        name: type.name,
        description: type.description
      });
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const now = new Date();
    const user: User = { ...insertUser, id, createdAt: now };
    this.users.set(id, user);
    return user;
  }

  // Vehicle operations
  async getVehicle(id: number): Promise<Vehicle | undefined> {
    return this.vehicles.get(id);
  }

  async getAllVehicles(): Promise<Vehicle[]> {
    return Array.from(this.vehicles.values());
  }

  async getVehiclesByOwner(ownerId: number): Promise<Vehicle[]> {
    return Array.from(this.vehicles.values()).filter(
      (vehicle) => vehicle.ownerId === ownerId
    );
  }

  async getVehiclesByCity(city: string): Promise<Vehicle[]> {
    return Array.from(this.vehicles.values()).filter(
      (vehicle) => vehicle.city.toLowerCase() === city.toLowerCase()
    );
  }

  async getVehiclesByType(type: string): Promise<Vehicle[]> {
    const vehicleType = await this.getVehicleTypeByName(type);
    if (!vehicleType) return [];
    
    return Array.from(this.vehicles.values()).filter(
      (vehicle) => vehicle.typeId === vehicleType.id
    );
  }

  async getVehiclesByCityAndType(city: string, type: string): Promise<Vehicle[]> {
    const vehicleType = await this.getVehicleTypeByName(type);
    if (!vehicleType) return [];
    
    return Array.from(this.vehicles.values()).filter(
      (vehicle) => 
        vehicle.city.toLowerCase() === city.toLowerCase() && 
        vehicle.typeId === vehicleType.id
    );
  }

  async createVehicle(insertVehicle: InsertVehicle): Promise<Vehicle> {
    const id = this.vehicleId++;
    const now = new Date();
    const vehicle: Vehicle = { ...insertVehicle, id, createdAt: now };
    this.vehicles.set(id, vehicle);
    return vehicle;
  }

  async updateVehicleAvailability(id: number, available: boolean): Promise<Vehicle | undefined> {
    const vehicle = await this.getVehicle(id);
    if (!vehicle) return undefined;
    
    const updatedVehicle = { ...vehicle, available };
    this.vehicles.set(id, updatedVehicle);
    return updatedVehicle;
  }

  // Vehicle Type operations
  async getVehicleType(id: number): Promise<VehicleType | undefined> {
    return this.vehicleTypes.get(id);
  }

  private async getVehicleTypeByName(name: string): Promise<VehicleType | undefined> {
    return Array.from(this.vehicleTypes.values()).find(
      (type) => type.name.toLowerCase() === name.toLowerCase()
    );
  }

  async getAllVehicleTypes(): Promise<VehicleType[]> {
    return Array.from(this.vehicleTypes.values());
  }

  async createVehicleType(insertVehicleType: InsertVehicleType): Promise<VehicleType> {
    const id = this.vehicleTypeId++;
    const vehicleType: VehicleType = { ...insertVehicleType, id };
    this.vehicleTypes.set(id, vehicleType);
    return vehicleType;
  }

  // Booking operations
  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async getUserBookings(userId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      (booking) => booking.userId === userId
    );
  }

  async getVehicleBookings(vehicleId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      (booking) => booking.vehicleId === vehicleId
    );
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.bookingId++;
    const now = new Date();
    const booking: Booking = { ...insertBooking, id, createdAt: now };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const booking = await this.getBooking(id);
    if (!booking) return undefined;
    
    const updatedBooking = { ...booking, status };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }

  // Review operations
  async getReview(id: number): Promise<Review | undefined> {
    return this.reviews.get(id);
  }

  async getVehicleReviews(vehicleId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.vehicleId === vehicleId
    );
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.reviewId++;
    const now = new Date();
    const review: Review = { ...insertReview, id, createdAt: now };
    this.reviews.set(id, review);
    return review;
  }

  // City operations
  async getCities(): Promise<{id: number, name: string, count: number}[]> {
    const cities = new Map<string, {id: number, name: string, count: number}>();
    let cityId = 1;
    
    Array.from(this.vehicles.values()).forEach(vehicle => {
      const cityName = vehicle.city;
      if (cities.has(cityName)) {
        const city = cities.get(cityName)!;
        cities.set(cityName, { ...city, count: city.count + 1 });
      } else {
        cities.set(cityName, { id: cityId++, name: cityName, count: 1 });
      }
    });
    
    return Array.from(cities.values());
  }
}

export const storage = new MemStorage();
