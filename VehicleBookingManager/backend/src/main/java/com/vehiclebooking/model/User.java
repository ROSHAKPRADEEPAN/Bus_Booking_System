package com.vehiclebooking.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;    // used by regular users
    private String lastName;     // used by regular users
    private String name;         // used by owners
    private String phoneNumber;  // shared field

    private String companyName;  // ✅ used by owners

    @Column(unique = true)
    private String email;

    private String password;

    private String role;         // "USER" or "OWNER"
}
