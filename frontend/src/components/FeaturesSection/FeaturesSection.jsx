export default function FeaturesSection({ camper }) {
  const features = [
    { key: "transmission", label: camper.transmission },
    { key: "engine", label: camper.engine },
    { key: "AC", label: "❄ AC" },
    { key: "bathroom", label: "🚿 Bathroom" },
    { key: "kitchen", label: "🍳 Kitchen" },
    { key: "TV", label: "📺 TV" },
    { key: "radio", label: "📻 Radio" },
    { key: "refrigerator", label: "🧊 Refrigerator" },
    { key: "microwave", label: "🔥 Microwave" },
    { key: "gas", label: "⛽ Gas" },
    { key: "water", label: "💧 Water" },
  ];

  const details = [
    { label: "Form", value: camper.form },
    { label: "Length", value: camper.length },
    { label: "Width", value: camper.width },
    { label: "Height", value: camper.height },
    { label: "Tank", value: camper.tank },
    { label: "Consumption", value: camper.consumption },
  ];

  return (
    <div>
      {/* FEATURES */}
      <h2>Features</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "30px",
        }}
      >
        {features.map((f) => {
          if (!camper[f.key]) return null;

          return (
            <div
              key={f.key}
              style={{
                padding: "8px 14px",
                borderRadius: "20px",
                background: "#f5f5f5",
                fontSize: "14px",
              }}
            >
              {f.label}
            </div>
          );
        })}
      </div>

      {/* VEHICLE DETAILS */}
      <h2>Vehicle details</h2>

      <div style={{ maxWidth: "400px" }}>
        {details.map((d) => {
          if (!d.value) return null;

          return (
            <div
              key={d.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #eee",
                padding: "6px 0",
              }}
            >
              <span>{d.label}</span>
              <span>{d.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
