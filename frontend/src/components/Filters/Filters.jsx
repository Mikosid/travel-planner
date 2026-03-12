import { useState } from "react";

export default function Filters({ onApply }) {
  const [location, setLocation] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [equipment, setEquipment] = useState({
    AC: false,
    kitchen: false,
    TV: false,
    bathroom: false,
  });

  const handleCheckboxChange = (key) => {
    setEquipment((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const filters = {};

    if (location) filters.location = location;
    if (vehicleType) filters.form = vehicleType;

    Object.keys(equipment).forEach((key) => {
      if (equipment[key]) {
        filters[key] = true;
      }
    });

    onApply(filters);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      <h3>Filters</h3>

      {/* LOCATION */}
      <div style={{ marginBottom: "15px" }}>
        <label>Location</label>
        <input
          type="text"
          placeholder="City"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      {/* VEHICLE TYPE */}
      <div style={{ marginBottom: "15px" }}>
        <label>Vehicle type</label>

        <div>
          <label>
            <input
              type="radio"
              name="vehicle"
              value="van"
              onChange={(e) => setVehicleType(e.target.value)}
            />
            Van
          </label>
        </div>

        <div>
          <label>
            <input
              type="radio"
              name="vehicle"
              value="fullyIntegrated"
              onChange={(e) => setVehicleType(e.target.value)}
            />
            Fully Integrated
          </label>
        </div>

        <div>
          <label>
            <input
              type="radio"
              name="vehicle"
              value="alcove"
              onChange={(e) => setVehicleType(e.target.value)}
            />
            Alcove
          </label>
        </div>
      </div>

      {/* EQUIPMENT */}
      <div style={{ marginBottom: "15px" }}>
        <label>Equipment</label>

        {Object.keys(equipment).map((key) => (
          <div key={key}>
            <label>
              <input
                type="checkbox"
                checked={equipment[key]}
                onChange={() => handleCheckboxChange(key)}
              />
              {key}
            </label>
          </div>
        ))}
      </div>

      <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
        Search
      </button>
    </form>
  );
}
