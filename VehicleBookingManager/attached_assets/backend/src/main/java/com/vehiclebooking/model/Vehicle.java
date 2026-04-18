package main.java.com.vehiclebooking.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ownerEmail;

    private String type; // e.g., car, van, bus

    private String model;

    private String city;

    private Double ratePerKm;

    private boolean available;
}
