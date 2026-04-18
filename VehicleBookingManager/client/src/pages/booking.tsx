import { useState } from "react";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const BookingPage = () => {

  const [match, params] = useRoute("/booking/:vehicleId");
  const vehicleId = params?.vehicleId;

  const [formData, setFormData] = useState({
    userEmail: "",
    pickupLocation: "",
    dropLocation: "",
    distanceInKm: "",
    tripStart: "",
    tripEnd: "",
  });

  const [loading, setLoading] = useState(false);

  // -------------------------
  // INPUT CHANGE
  // -------------------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // -------------------------
  // SUBMIT BOOKING + PAYMENT
  // -------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!vehicleId) {
      alert("Vehicle not found.");
      return;
    }

    if (!formData.tripStart || !formData.tripEnd) {
      alert("Select trip dates.");
      return;
    }

    if (new Date(formData.tripEnd) <= new Date(formData.tripStart)) {
      alert("Trip end must be after trip start.");
      return;
    }

    setLoading(true);

    try {

      // ======================
      // 1) CREATE BOOKING
      // ======================
      const bookingRes = await fetch(
        "http://localhost:8090/api/bookings",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            vehicleId: Number(vehicleId),
            distanceInKm: Number(formData.distanceInKm),
            paid: false,
            confirmed: false,
          }),
        }
      );

      if (!bookingRes.ok) {
        alert("Vehicle already booked.");
        setLoading(false);
        return;
      }

      const booking = await bookingRes.json();
      console.log("BOOKING CREATED:", booking);

      // ======================
      // 2) CREATE RAZORPAY ORDER
      // ======================
      const orderRes = await fetch(
        `http://localhost:8090/api/payment/create-order/${booking.id}`,
        { method: "POST" }
      );

      if (!orderRes.ok) {
        alert("Order creation failed.");
        setLoading(false);
        return;
      }

      const order = await orderRes.json();
      console.log("ORDER:", order);

      // ======================
      // 3) OPEN RAZORPAY
      // ======================
      const options = {
        key: "rzp_test_S9kPIXdbBkqZJa",
        amount: order.amount,
        currency: "INR",
        name: "TransportEase",
        description: "Vehicle Booking Payment",
        order_id: order.id,

        handler: async function () {

          // ======================
          // 4) SIMULATE SUCCESS
          // ======================
          await fetch(
            `http://localhost:8090/api/payment/success/${booking.id}`,
            { method: "POST" }
          );

          alert("Payment Successful (Simulated)");
          window.location.href = "/";
        },

        theme: { color: "#2563eb" },
      };

      const razor = new window.Razorpay(options);
      razor.open();

    } catch (err) {
      console.error(err);
      alert("Payment Failed.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // UI
  // -------------------------
  return (
    <section className="py-20 mt-16 flex justify-center bg-gray-50 min-h-screen">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-6">
          TransportEase - Vehicle Booking
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <Input
            type="email"
            name="userEmail"
            placeholder="User Email"
            value={formData.userEmail}
            onChange={handleChange}
            required
          />

          <Input
            type="text"
            name="pickupLocation"
            placeholder="Pickup Location"
            value={formData.pickupLocation}
            onChange={handleChange}
            required
          />

          <Input
            type="text"
            name="dropLocation"
            placeholder="Drop Location"
            value={formData.dropLocation}
            onChange={handleChange}
            required
          />

          <Input
            type="number"
            name="distanceInKm"
            placeholder="Distance (km)"
            value={formData.distanceInKm}
            onChange={handleChange}
            required
          />

          <Input
            type="datetime-local"
            name="tripStart"
            value={formData.tripStart}
            onChange={handleChange}
            required
          />

          <Input
            type="datetime-local"
            name="tripEnd"
            value={formData.tripEnd}
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Processing..." : "Proceed to Pay"}
          </Button>

        </form>
      </div>
    </section>
  );
};

export default BookingPage;
