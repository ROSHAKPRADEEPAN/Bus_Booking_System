import React, { useEffect, useState } from "react";

/* ---------------- TYPES ---------------- */
interface Vehicle {
  id: number;
  name: string;
  type: string;
  city: string;
  capacity: number;
  ratePerKm: number;
  available: boolean;
}

interface VehicleFormData {
  type: string;
  model: string;
  capacity: number | "";
  ratePerKm: number | "";
  city: string;
  imageFile: File | null;
}

/* ---------------- COMPONENT ---------------- */
const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState<"add" | "history">("add");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  const [formData, setFormData] = useState<VehicleFormData>({
    type: "",
    model: "",
    capacity: "",
    ratePerKm: "",
    city: "",
    imageFile: null,
  });

  /* ---------------- USER INFO ---------------- */
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const ownerEmail = storedUser?.email || "";
  const token = storedUser?.token || "";

  /* ---------------- AUTH CHECK ---------------- */
  useEffect(() => {
    if (!ownerEmail) {
      alert("Please login as owner");
      window.location.href = "/owner/login";
    }
  }, [ownerEmail]);

  /* ---------------- FETCH VEHICLES ---------------- */
  const fetchOwnerVehicles = async () => {
    try {
      const res = await fetch(
        `http://localhost:8090/api/vehicles/owner/${encodeURIComponent(
          ownerEmail
        )}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();
      setVehicles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setVehicles([]);
    }
  };

  useEffect(() => {
    if (activeTab === "history") fetchOwnerVehicles();
  }, [activeTab]);

  /* ---------------- SOFT DELETE ---------------- */
  const handleDisable = async (id: number) => {
    if (!window.confirm("Mark this vehicle as unavailable?")) return;

    await fetch(
      `http://localhost:8090/api/vehicles/${id}?ownerEmail=${encodeURIComponent(
        ownerEmail
      )}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ available: false }),
      }
    );

    setToast("🚫 Vehicle marked as unavailable");
    setTimeout(() => setToast(null), 3000);
    fetchOwnerVehicles();
  };

  /* ---------------- SAVE EDIT ---------------- */
  const saveEdit = async () => {
    if (!editingVehicle) return;

    await fetch(
      `http://localhost:8090/api/vehicles/${editingVehicle.id}?ownerEmail=${encodeURIComponent(
        ownerEmail
      )}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingVehicle),
      }
    );

    setEditingVehicle(null);
    setToast("✅ Vehicle updated");
    setTimeout(() => setToast(null), 3000);
    fetchOwnerVehicles();
  };

  /* ---------------- FORM HANDLING ---------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["capacity", "ratePerKm"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, imageFile: e.target.files![0] }));
    }
  };

  /* ---------------- ADD VEHICLE ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = new FormData();
    payload.append("name", formData.model);
    payload.append("type", formData.type);
    payload.append("city", formData.city);
    payload.append("capacity", String(formData.capacity));
    payload.append("ratePerKm", String(formData.ratePerKm));
    payload.append("available", "true");
    payload.append("ownerEmail", ownerEmail);
    if (formData.imageFile) payload.append("vehicleImage", formData.imageFile);

    await fetch("http://localhost:8090/api/vehicles", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: payload,
    });

    setToast("✅ Vehicle added successfully");
    setTimeout(() => setToast(null), 3000);
    setFormData({
      type: "",
      model: "",
      capacity: "",
      ratePerKm: "",
      city: "",
      imageFile: null,
    });

    setLoading(false);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Owner Dashboard</h1>

      {toast && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
          {toast}
        </div>
      )}

      <div className="flex mb-6 space-x-4">
        <button
          onClick={() => setActiveTab("add")}
          className={`px-4 py-2 rounded ${
            activeTab === "add" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          ➕ Add Vehicle
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 rounded ${
            activeTab === "history" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          📜 Vehicle History
        </button>
      </div>

      {/* ADD VEHICLE */}
      {activeTab === "add" && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow space-y-4"
        >
          <input name="model" placeholder="Name" onChange={handleChange} value={formData.model} className="input" required />
          <select name="type" onChange={handleChange} value={formData.type} className="input" required>
            <option value="">Select Type</option>
            <option>Car</option>
            <option>Bus</option>
            <option>Van</option>
          </select>
          <input name="capacity" type="number" placeholder="Capacity" onChange={handleChange} value={formData.capacity} className="input" required />
          <input name="ratePerKm" type="number" placeholder="Rate / Km" onChange={handleChange} value={formData.ratePerKm} className="input" required />
          <input name="city" placeholder="City" onChange={handleChange} value={formData.city} className="input" required />
          <input type="file" onChange={handleFileChange} />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            {loading ? "Adding..." : "Add Vehicle"}
          </button>
        </form>
      )}

      {/* VEHICLE HISTORY */}
      {activeTab === "history" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vehicles.map((v) => (
            <div key={v.id} className="border p-4 rounded shadow bg-white">
              <h3 className="font-bold">{v.name}</h3>
              <p>Type: {v.type}</p>
              <p>City: {v.city}</p>
              <p>Capacity: {v.capacity}</p>
              <p>₹{v.ratePerKm} / km</p>
              <p>Status: {v.available ? "Available" : "Unavailable"}</p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setEditingVehicle(v)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  ✏ Edit
                </button>
                <button
                  onClick={() => handleDisable(v.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  🚫 Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EDIT MODAL */}
      {editingVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="font-bold mb-4">Edit Vehicle</h2>

            <input
              className="input mb-2"
              value={editingVehicle.city}
              onChange={(e) =>
                setEditingVehicle({ ...editingVehicle, city: e.target.value })
              }
            />

            <input
              type="number"
              className="input mb-2"
              value={editingVehicle.ratePerKm}
              onChange={(e) =>
                setEditingVehicle({
                  ...editingVehicle,
                  ratePerKm: Number(e.target.value),
                })
              }
            />

            <select
              className="input mb-4"
              value={editingVehicle.available ? "true" : "false"}
              onChange={(e) =>
                setEditingVehicle({
                  ...editingVehicle,
                  available: e.target.value === "true",
                })
              }
            >
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>

            <div className="flex gap-2">
              <button onClick={saveEdit} className="bg-blue-600 text-white px-4 py-2 rounded">
                Save
              </button>
              <button onClick={() => setEditingVehicle(null)} className="bg-gray-400 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;