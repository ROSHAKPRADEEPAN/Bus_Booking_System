package com.vehiclebooking.controller;

import com.vehiclebooking.model.Booking;
import com.vehiclebooking.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5000") // ✅ Allow frontend access
@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    /**
     * ✅ Handles new booking requests
     */
    @PostMapping
    public ResponseEntity<?> bookVehicle(@RequestBody Booking booking) {
        System.out.println("📥 Received booking request from: " + booking.getUserEmail());

        // Logging trip details for debugging
        System.out.println("🕓 Trip Start: " + booking.getTripStart());
        System.out.println("🕓 Trip End: " + booking.getTripEnd());
        System.out.println("🚗 Vehicle ID: " + booking.getVehicleId());

        try {
            Booking savedBooking = bookingService.createBooking(booking);
            System.out.println("✅ Booking saved successfully with ID: " + savedBooking.getId());
            return ResponseEntity.ok(savedBooking);
        } 
        // ⚠️ If overlapping booking or invalid input occurs
        catch (IllegalArgumentException e) {
            System.err.println("❌ Booking failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        } 
        // ⚠️ Other unexpected errors (database, network, etc.)
        catch (Exception e) {
            e.printStackTrace();
            System.err.println("💥 Server error while booking: " + e.getMessage());
            return ResponseEntity.internalServerError().body("Server error: " + e.getMessage());
        }
    }

    /**
     * ✅ Get all bookings made by a specific user
     */
    @GetMapping("/user/{email}")
    public ResponseEntity<List<Booking>> getUserBookings(@PathVariable String email) {
        System.out.println("📤 Fetching bookings for user: " + email);
        return ResponseEntity.ok(bookingService.getBookingsByUser(email));
    }

    /**
     * ✅ Get all bookings (Admin use)
     */
    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        System.out.println("📤 Fetching all bookings...");
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    /**
     * ✅ Mark a booking as paid
     */
}
