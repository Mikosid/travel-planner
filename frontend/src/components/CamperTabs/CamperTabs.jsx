export default function CamperTabs({ activeTab, onChange }) {
  return (
    <div style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
      <button
        onClick={() => onChange("features")}
        style={{
          fontWeight: activeTab === "features" ? "bold" : "normal",
        }}
      >
        Features
      </button>

      <button
        onClick={() => onChange("reviews")}
        style={{
          fontWeight: activeTab === "reviews" ? "bold" : "normal",
        }}
      >
        Reviews
      </button>
    </div>
  );
}
