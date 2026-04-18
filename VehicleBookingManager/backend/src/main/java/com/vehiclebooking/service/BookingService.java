package com.vehiclebooking.service;

import com.vehiclebooking.model.Booking;
import com.vehiclebooking.model.Vehicle;
import com.vehiclebooking.repository.BookingRepository;
import com.vehiclebooking.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final VehicleRepository vehicleRepository;
    private final EmailService emailService;

    // ----------------------------
    // CREATE BOOKING (UNPAID)
    // ----------------------------
    public Booking createBooking(Booking booking) {

        if (booking.getUserEmail() == null || booking.getUserEmail().isEmpty()) {
            throw new IllegalArgumentException("User email is required.");
        }

        if (booking.getTripStart() == null || booking.getTripEnd() == null) {
            throw new IllegalArgumentException("Trip start and end dates are required.");
        }

        if (booking.getVehicleId() == null) {
            throw new IllegalArgumentException("Vehicle ID is required.");
        }

        Vehicle vehicle = vehicleRepository.findById(booking.getVehicleId())
                .orElseThrow(() ->
                        new IllegalArgumentException("Vehicle not found with ID: " + booking.getVehicleId())
                );

        // Overlap validation
        boolean overlapExists = bookingRepository.existsOverlappingBooking(
                booking.getVehicleId(),
                booking.getTripStart(),
                booking.getTripEnd()
        );

        if (overlapExists) {
            throw new IllegalArgumentException("Vehicle already booked for selected dates.");
        }

        // Cost Calculation
        double ratePerKm = vehicle.getRatePerKm();
        double totalCost = booking.getDistanceInKm() * ratePerKm;

        Duration duration = Duration.between(booking.getTripStart(), booking.getTripEnd());
        long totalDays = Math.max(1, duration.toDays());
        double waitingCharge = totalDays * 1000.0;

        totalCost += waitingCharge;

        booking.setTotalCost(totalCost);
        booking.setConfirmed(false);   // 🔥 wait until payment success
        booking.setPaid(false);

        return bookingRepository.save(booking);
    }

    // ----------------------------
    // AFTER PAYMENT SUCCESS
    // ----------------------------
    public Booking confirmBookingAfterPayment(Long bookingId) {
        if (bookingId == null) {
            throw new IllegalArgumentException("Booking ID cannot be null");
        }

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() ->
                        new IllegalArgumentException("Booking not found with ID: " + bookingId)
                );

        booking.setPaid(true);
        booking.setConfirmed(true);

        Booking saved = bookingRepository.save(booking);
        
        if (saved == null) {
            throw new RuntimeException("Failed to save booking confirmation");
        }

        sendBookingConfirmationEmail(saved);

        return saved;
    }

    // ----------------------------
    // EMAIL
    // ----------------------------
    private void sendBookingConfirmationEmail(Booking booking) {
        if (booking.getVehicleId() == null) {
            throw new RuntimeException("Vehicle ID cannot be null");
        }

        Vehicle vehicle = vehicleRepository.findById(booking.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        double ratePerKm = vehicle.getRatePerKm();
        double waitingCharge = 1000;

        String subject = "Your Vehicle Booking Confirmation";

        DateTimeFormatter formatter =
                DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a");

        String tripStartFormatted = booking.getTripStart().format(formatter);
        String tripEndFormatted = booking.getTripEnd().format(formatter);

        String htmlBody = String.format("""
            <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;
                        border:1px solid #e2e2e2; border-radius:10px; padding:20px;">

                <h2 style="text-align:center; color:#1a73e8;">
                🚗 TransportEase - Booking Confirmed</h2>

                <p>Hello <b>%s</b>,</p>

                <p>Your payment was successful and booking is confirmed.</p>

                <table style="width:100%%; border-collapse:collapse;">
                    <tr><td><b>Vehicle</b></td><td>%s (%s)</td></tr>
                    <tr><td><b>Pickup</b></td><td>%s</td></tr>
                    <tr><td><b>Drop</b></td><td>%s</td></tr>
                    <tr><td><b>Trip Start</b></td><td>%s</td></tr>
                    <tr><td><b>Trip End</b></td><td>%s</td></tr>
                    <tr><td><b>Distance</b></td><td>%.2f km</td></tr>
                    <tr><td><b>Rate / km</b></td><td>₹%.2f</td></tr>
                    <tr><td><b>Waiting Charge</b></td><td>₹%.2f</td></tr>
                    <tr>
                      <td><b>Total Paid</b></td>
                      <td style="color:#1a73e8;"><b>₹%.2f</b></td>
                    </tr>
                </table>

                <p>Thank you for choosing TransportEase 🚙</p>
            </div>
        """,
                booking.getUserEmail(),
                vehicle.getName(),
                vehicle.getType(),
                booking.getPickupLocation(),
                booking.getDropLocation(),
                tripStartFormatted,
                tripEndFormatted,
                booking.getDistanceInKm(),
                ratePerKm,
                waitingCharge,
                booking.getTotalCost()
        );

        emailService.sendBookingConfirmation(
                booking.getUserEmail(),
                subject,
                htmlBody
        );
    }

    // ----------------------------
    // OTHER APIS
    // ----------------------------
    public List<Booking> getBookingsByUser(String email) {
        return bookingRepository.findByUserEmail(email);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}
