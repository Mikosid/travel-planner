import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h1>Campers of your dreams</h1>

      <p>Find the perfect camper for your next adventure</p>

      <Link to="/catalog">
        <button
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          View Now
        </button>
      </Link>
    </div>
  );
}
