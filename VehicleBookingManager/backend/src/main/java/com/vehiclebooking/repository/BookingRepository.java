package com.vehiclebooking.repository;

import com.vehiclebooking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserEmail(String email);

    /**
     * ✅ Check if there’s already a booking for the same vehicle
     * that overlaps with the given tripStart and tripEnd.
     *
     * Overlap logic:
     *   NewStart < ExistingEnd  AND  NewEnd > ExistingStart
     */
    @Query("""
        SELECT COUNT(b) > 0 FROM Booking b
        WHERE b.vehicleId = :vehicleId
          AND b.tripStart IS NOT NULL AND b.tripEnd IS NOT NULL
          AND :tripStart < b.tripEnd
          AND :tripEnd > b.tripStart
    """)
    boolean existsOverlappingBooking(@Param("vehicleId") Long vehicleId,
                                     @Param("tripStart") LocalDateTime tripStart,
                                     @Param("tripEnd") LocalDateTime tripEnd);
}
