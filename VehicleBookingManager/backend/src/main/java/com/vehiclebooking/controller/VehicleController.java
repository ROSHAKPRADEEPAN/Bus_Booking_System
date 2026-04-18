package com.vehiclebooking.controller;

import com.vehiclebooking.model.Vehicle;
import com.vehiclebooking.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.Base64;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5000")
@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService vehicleService;

    /* ===================== ADD VEHICLE ===================== */
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addVehicle(
            @RequestPart("name") String name,
            @RequestPart("type") String type,
            @RequestPart("city") String city,
            @RequestPart("capacity") String capacity,
            @RequestPart("ratePerKm") String ratePerKm,
            @RequestPart("available") String available,
            @RequestPart("ownerEmail") String ownerEmail,
            @RequestPart(value = "vehicleImage", required = false) MultipartFile vehicleImage
    ) {
        try {
            Vehicle vehicle = new Vehicle();
            vehicle.setName(name);
            vehicle.setType(type);
            vehicle.setCity(city.toLowerCase());
            vehicle.setCapacity(Integer.parseInt(capacity));
            vehicle.setRatePerKm(Double.parseDouble(ratePerKm));
            vehicle.setAvailable(Boolean.parseBoolean(available));
            vehicle.setOwnerEmail(ownerEmail);

            if (vehicleImage != null && !vehicleImage.isEmpty()) {
                String mimeType = vehicleImage.getContentType();
                if (mimeType == null) mimeType = "image/jpeg";

                String base64 = Base64.getEncoder()
                        .encodeToString(vehicleImage.getBytes());

                vehicle.setPicture("data:" + mimeType + ";base64," + base64);
            }

            return ResponseEntity.ok(vehicleService.addVehicle(vehicle));

        } catch (IOException | NumberFormatException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /* ===================== UPDATE VEHICLE (EDIT / SOFT DELETE) ===================== */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateVehicle(
            @PathVariable Long id,
            @RequestParam String ownerEmail,
            @RequestBody Vehicle updatedVehicle
    ) {
        try {
            Vehicle vehicle = vehicleService.getVehicleById(id);

            // FIX: Added authorization check before allowing update
            if (!vehicle.getOwnerEmail().equals(ownerEmail)) {
                return ResponseEntity.status(403).body("Not allowed");
            }

            // FIX: Merge only safe fields to avoid overwriting unintended properties
            if (updatedVehicle.getCity() != null) {
                vehicle.setCity(updatedVehicle.getCity());
            }

            // FIX: ratePerKm is primitive double, so always update if > 0
            if (updatedVehicle.getRatePerKm() > 0) {
                vehicle.setRatePerKm(updatedVehicle.getRatePerKm());
            }

            // FIX: Explicitly update availability flag
            vehicle.setAvailable(updatedVehicle.isAvailable());

            // FIX: Use save() method to persist the updated vehicle
            return ResponseEntity.ok(vehicleService.save(vehicle));

        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /* ===================== DELETE VEHICLE (HARD DELETE) ===================== */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVehicle(
            @PathVariable Long id,
            @RequestParam String ownerEmail
    ) {
        vehicleService.deleteVehicleByOwner(id, ownerEmail);
        return ResponseEntity.ok("Vehicle deleted successfully");
    }

    /* ===================== GET ALL VEHICLES ===================== */
    @GetMapping
    public ResponseEntity<List<Vehicle>> getAllVehicles() {
        return ResponseEntity.ok(vehicleService.getAllVehicles());
    }

    /* ===================== GET OWNER VEHICLES ===================== */
    @GetMapping("/owner/{email}")
    public ResponseEntity<List<Vehicle>> getVehiclesByOwner(
            @PathVariable String email
    ) {
        return ResponseEntity.ok(vehicleService.getVehiclesByOwner(email));
    }

    /* ===================== AVAILABLE VEHICLES FILTER ===================== */
    @GetMapping("/available")
    public ResponseEntity<?> getAvailableVehiclesByDate(
            @RequestParam(required = false) String city,
            @RequestParam String start,
            @RequestParam String end
    ) {
        try {
            LocalDateTime startDate = LocalDateTime.parse(start);
            LocalDateTime endDate = LocalDateTime.parse(end);

            if (endDate.isBefore(startDate)) {
                return ResponseEntity.badRequest()
                        .body("End date cannot be before start date");
            }

            List<Vehicle> vehicles =
                    (city != null && !city.isBlank())
                            ? vehicleService.getAvailableVehiclesByCityAndDate(
                            city.toLowerCase(), startDate, endDate)
                            : vehicleService.getAvailableVehiclesByDateOnly(
                            startDate, endDate);

            return ResponseEntity.ok(vehicles);

        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest()
                    .body("Invalid date format (yyyy-MM-ddTHH:mm:ss)");
        }
    }
}