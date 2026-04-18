package com.vehiclebooking.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail;

    @Builder.Default
    private Boolean paid = false;

    private Long vehicleId;        // Allows null
    private String pickupLocation;
    private String dropLocation;

    private Double distanceInKm;   // Allows null
    private Double totalCost;      // Allows null

    @Builder.Default
    private Boolean confirmed = false;

    // ✅ New fields for trip date and time
    private LocalDateTime tripStart;   // Trip start date & time
    private LocalDateTime tripEnd;     // Trip end date & time
}
