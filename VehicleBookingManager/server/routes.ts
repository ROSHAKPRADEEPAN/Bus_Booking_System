import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertVehicleSchema, 
  insertBookingSchema,
  insertReviewSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json({ 
        id: user.id, 
        username: user.username, 
        email: user.email,
        role: user.role
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Server error during registration" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.status(200).json({ 
        id: user.id, 
        username: user.username, 
        email: user.email,
        role: user.role
      });
    } catch (error) {
      res.status(500).json({ message: "Server error during login" });
    }
  });

  // Vehicle routes
  app.get("/api/vehicles", async (req, res) => {
    try {
      const { city, type } = req.query;
      let vehicles;

      if (city && type) {
        vehicles = await storage.getVehiclesByCityAndType(
          city as string, 
          type as string
        );
      } else if (city) {
        vehicles = await storage.getVehiclesByCity(city as string);
      } else if (type) {
        vehicles = await storage.getVehiclesByType(type as string);
      } else {
        vehicles = await storage.getAllVehicles();
      }

      res.status(200).json(vehicles);
    } catch (error) {
      res.status(500).json({ message: "Error fetching vehicles" });
    }
  });

  app.get("/api/vehicles/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const vehicle = await storage.getVehicle(parseInt(id));
      if (!vehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
      }
      res.status(200).json(vehicle);
    } catch (error) {
      res.status(500).json({ message: "Error fetching vehicle" });
    }
  });

  app.post("/api/vehicles", async (req, res) => {
    try {
      const vehicleData = insertVehicleSchema.parse(req.body);
      const vehicle = await storage.createVehicle(vehicleData);
      res.status(201).json(vehicle);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Error creating vehicle" });
    }
  });

  // Booking routes
  app.post("/api/bookings", async (req, res) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Error creating booking" });
    }
  });

  app.get("/api/users/:userId/bookings", async (req, res) => {
    try {
      const { userId } = req.params;
      const bookings = await storage.getUserBookings(parseInt(userId));
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user bookings" });
    }
  });

  // Review routes
  app.post("/api/reviews", async (req, res) => {
    try {
      const reviewData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(reviewData);
      res.status(201).json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Error creating review" });
    }
  });

  app.get("/api/vehicles/:vehicleId/reviews", async (req, res) => {
    try {
      const { vehicleId } = req.params;
      const reviews = await storage.getVehicleReviews(parseInt(vehicleId));
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Error fetching vehicle reviews" });
    }
  });

  // City routes
  app.get("/api/cities", async (req, res) => {
    try {
      const cities = await storage.getCities();
      res.status(200).json(cities);
    } catch (error) {
      res.status(500).json({ message: "Error fetching cities" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
