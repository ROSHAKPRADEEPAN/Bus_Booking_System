import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const UserDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState<number | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    // ✅ IMPORTANT: Always use EMAIL for backend
    const email = parsedUser.email;
    fetchUserBookings(email);
  }, []);

  const fetchUserBookings = async (email: string) => {
    try {
      console.log("📡 Fetching bookings for:", email);

      const res = await fetch(
        `http://localhost:8090/api/bookings/user/${email}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await res.json();
      console.log("✅ Dashboard bookings:", data);

      setBookings(data);
    } catch (err) {
      console.error("❌ Failed to fetch bookings", err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ PAY NOW HANDLER
  const handlePayNow = async (bookingId: number) => {
    try {
      setPayingId(bookingId);

      const res = await fetch(
        `http://localhost:8090/api/bookings/${bookingId}/pay`,
        {
          method: "POST",
        }
      );

      if (!res.ok) {
        throw new Error("Payment failed");
      }

      const updatedBooking = await res.json();

      // ✅ Update booking status instantly in UI
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, paid: true } : b
        )
      );

      alert("✅ Payment successful!");
    } catch (err) {
      console.error("❌ Payment error:", err);
      alert("❌ Payment failed. Try again.");
    } finally {
      setPayingId(null);
    }
  };

  return (
    <section className="py-20 mt-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-2">User Dashboard</h1>
        <p className="text-gray-600 mb-8">
          Welcome, {user?.username || user?.email}
        </p>

        {loading ? (
          <p>Loading your bookings...</p>
        ) : bookings.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">No bookings found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-lg shadow p-5 border"
              >
                <h3 className="text-lg font-semibold mb-2">
                  Vehicle ID: {b.vehicleId}
                </h3>

                <p>
                  <b>Pickup:</b> {b.pickupLocation}
                </p>
                <p>
                  <b>Drop:</b> {b.dropLocation}
                </p>
                <p>
                  <b>Distance:</b> {b.distanceInKm} km
                </p>

                <p>
                  <b>Trip Start:</b>{" "}
                  {new Date(b.tripStart).toLocaleString()}
                </p>
                <p>
                  <b>Trip End:</b>{" "}
                  {new Date(b.tripEnd).toLocaleString()}
                </p>

                <p className="mt-2">
                  <b>Total Cost:</b>{" "}
                  <span className="font-semibold">₹{b.totalCost}</span>
                </p>

                <p className="mt-1">
                  <b>Status:</b>{" "}
                  <span
                    className={`font-semibold ${
                      b.paid ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {b.paid ? "Paid" : "Not Paid"}
                  </span>
                </p>

                {!b.paid && (
                  <Button
                    className="mt-4 w-full"
                    onClick={() => handlePayNow(b.id)}
                    disabled={payingId === b.id}
                  >
                    {payingId === b.id ? "Processing..." : "Pay Now"}
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default UserDashboard;
