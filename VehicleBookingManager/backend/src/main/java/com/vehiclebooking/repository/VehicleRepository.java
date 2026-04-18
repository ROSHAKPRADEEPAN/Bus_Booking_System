package com.vehiclebooking.repository;

import com.vehiclebooking.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    // ✅ City Filter Only
    List<Vehicle> findByCityIgnoreCaseAndAvailableTrue(String city);

    // ✅ Owner Vehicles
    List<Vehicle> findByOwnerEmail(String ownerEmail);

    // ✅ City + Date OR Date Only (Flexible Filter)
    @Query(value = """
        SELECT * FROM vehicles v
        WHERE v.available = true
          AND (:city IS NULL OR :city = '' OR LOWER(v.city) = LOWER(:city))
          AND v.id NOT IN (
              SELECT b.vehicle_id
              FROM booking b
              WHERE b.trip_start <= :endDate
                AND b.trip_end >= :startDate
          )
    """, nativeQuery = true)
    List<Vehicle> findAvailableVehiclesFlexible(
            @Param("city") String city,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );

    // ✅ ✅ Date Only Filter (ALL Cities)
    @Query(value = """
        SELECT * FROM vehicles v
        WHERE v.available = true
          AND v.id NOT IN (
              SELECT b.vehicle_id
              FROM booking b
              WHERE b.trip_start <= :endDate
                AND b.trip_end >= :startDate
          )
    """, nativeQuery = true)
    List<Vehicle> findAvailableVehiclesByDateOnly(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );
}
