export default function CamperTabs({ activeTab, onChange }) {
  const tabStyle = {
    padding: "10px 0",
    cursor: "pointer",
    border: "none",
    borderBottom: "2px solid transparent",
    background: "none",
    fontSize: "16px",
    fontWeight: "500",
    outline: "none",
  };

  const activeStyle = {
    borderBottom: "2px solid red",
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "30px",
        borderBottom: "1px solid #ddd",
        marginTop: "20px",
      }}
    >
      <button
        onClick={() => onChange("features")}
        style={{
          ...tabStyle,
          ...(activeTab === "features" ? activeStyle : {}),
        }}
      >
        Features
      </button>

      <button
        onClick={() => onChange("reviews")}
        style={{
          ...tabStyle,
          ...(activeTab === "reviews" ? activeStyle : {}),
        }}
      >
        Reviews
      </button>
    </div>
  );
}
