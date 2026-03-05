export default function FeaturesSection({ camper }) {
  const features = [
    "transmission",
    "engine",
    "AC",
    "bathroom",
    "kitchen",
    "TV",
    "radio",
    "refrigerator",
    "microwave",
    "gas",
    "water",
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
        {features.map((feature) => {
          if (!camper[feature]) return null;

          return (
            <div
              key={feature}
              style={{
                padding: "8px 14px",
                border: "1px solid #ddd",
                borderRadius: "20px",
                background: "#f5f5f5",
                fontSize: "14px",
              }}
            >
              {feature === "AC"
                ? "AC"
                : camper[feature] === true
                  ? feature
                  : camper[feature]}
            </div>
          );
        })}
      </div>

      {/* VEHICLE DETAILS */}
      <h2>Vehicle details</h2>

      <div style={{ maxWidth: "400px" }}>
        {details.map((item) => {
          if (!item.value) return null;

          return (
            <div
              key={item.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #eee",
                padding: "6px 0",
              }}
            >
              <span>{item.label}</span>
              <span>{item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
