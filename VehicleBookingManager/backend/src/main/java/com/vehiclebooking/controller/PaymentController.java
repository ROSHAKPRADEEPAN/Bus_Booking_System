package com.vehiclebooking.controller;

import com.razorpay.Order;
import com.razorpay.RazorpayException;
import com.vehiclebooking.model.Booking;
import com.vehiclebooking.repository.BookingRepository;
import com.vehiclebooking.service.BookingService;
import com.vehiclebooking.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PaymentController {

    private final PaymentService paymentService;
    private final BookingRepository bookingRepository;
    private final BookingService bookingService;

    // ----------------------------
    // CREATE RAZORPAY ORDER
    // ----------------------------
    @PostMapping("/create-order/{bookingId}")
    public String createOrder(@PathVariable Long bookingId)
            throws RazorpayException {
        
        if (bookingId == null) {
            throw new IllegalArgumentException("Booking ID cannot be null");
        }

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        Order order = paymentService.createOrder(
                booking.getTotalCost()
        );

        return order.toJson().toString();

    }

    // ----------------------------
    // PAYMENT SUCCESS
    // ----------------------------
    @PostMapping("/success/{bookingId}")
    public String paymentSuccess(@PathVariable Long bookingId) {
        
        if (bookingId == null) {
            throw new IllegalArgumentException("Booking ID cannot be null");
        }

        bookingService.confirmBookingAfterPayment(bookingId);

        return "PAYMENT_SUCCESS";
    }
}
