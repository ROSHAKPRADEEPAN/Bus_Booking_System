package com.vehiclebooking.service;

import com.vehiclebooking.model.Vehicle;
import com.vehiclebooking.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    // ------------------- VEHICLE CRUD ------------------------

    public Vehicle addVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    /**
     * FIX: Added save() method that controller calls directly.
     * This is a generic save method for persisting vehicle changes.
     */
    public Vehicle save(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public List<Vehicle> getAvailableVehiclesByCity(String city) {
        return vehicleRepository.findByCityIgnoreCaseAndAvailableTrue(city);
    }

    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }

    // ------------------- DATE-BASED AVAILABILITY ------------------------

    /**
     * ✅ City + Date Filter
     */
    public List<Vehicle> getAvailableVehiclesByCityAndDate(
            String city,
            LocalDateTime tripStart,
            LocalDateTime tripEnd
    ) {
        System.out.println("📅 Checking vehicles for city=" + city +
                ", start=" + tripStart + ", end=" + tripEnd);

        if (tripStart == null || tripEnd == null) {
            throw new IllegalArgumentException("Trip dates must be provided.");
        }

        List<Vehicle> availableVehicles =
                vehicleRepository.findAvailableVehiclesFlexible(
                        city.toLowerCase(), tripStart, tripEnd
                );

        System.out.println("✅ Found " + availableVehicles.size() + " available vehicles.");
        return availableVehicles;
    }

    /**
     * ✅ Date-only filter (ALL CITIES + Date Only)
     */
    public List<Vehicle> getAvailableVehiclesByDateOnly(
            LocalDateTime tripStart,
            LocalDateTime tripEnd
    ) {
        System.out.println("📅 Checking vehicles for ALL cities" +
                ", start=" + tripStart + ", end=" + tripEnd);

        if (tripStart == null || tripEnd == null) {
            throw new IllegalArgumentException("Trip dates must be provided.");
        }

        List<Vehicle> availableVehicles =
                vehicleRepository.findAvailableVehiclesByDateOnly(
                        tripStart, tripEnd
                );

        System.out.println("✅ Found " + availableVehicles.size() + " vehicles (ALL cities).");
        return availableVehicles;
    }

    // ------------------- HELPER METHODS ------------------------

    public Vehicle getVehicleById(Long id) {
        if (id == null) {
            throw new RuntimeException("Vehicle ID cannot be null");
        }
        return vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found with id: " + id));
    }

    // ------------------- OWNER METHODS ------------------------

    public List<Vehicle> getVehiclesByOwner(String ownerEmail) {
        return vehicleRepository.findByOwnerEmail(ownerEmail);
    }

    public Vehicle updateVehicle(Long id, Vehicle vehicle) {
        if (id == null) {
            throw new RuntimeException("Vehicle ID cannot be null");
        }
        Vehicle existing = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        // FIX: Ensure availability is updated properly
        existing.setName(vehicle.getName());
        existing.setType(vehicle.getType());
        existing.setCapacity(vehicle.getCapacity());
        existing.setRatePerKm(vehicle.getRatePerKm());
        existing.setCity(vehicle.getCity());
        existing.setAvailable(vehicle.isAvailable()); // ✅ Explicitly sets availability

        return vehicleRepository.save(existing);
    }

    /**
     * FIX: Removed duplicate methods. Kept single version with proper validation.
     * Deletes vehicle only if owner email matches. Includes null check for vehicle ID.
     */
    public void deleteVehicleByOwner(Long id, String ownerEmail) {
        if (id == null) {
            throw new RuntimeException("Vehicle ID cannot be null");
        }
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        if (!vehicle.getOwnerEmail().equals(ownerEmail)) {
            throw new RuntimeException("Not authorized to delete this vehicle");
        }

        vehicleRepository.delete(vehicle);
    }
}
