package com.vehiclebooking.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "vehicles")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "picture", columnDefinition = "TEXT")
    private String picture; // stores image as base64-encoded data URL


    private String name;

    private String type;

    private int capacity;

    private double ratePerKm;

    private boolean available;

    private String city;

    private String ownerEmail;

    // @Column(name = "picture")
    // private String imageUrl; // ✅ Add this field for image support
}
