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
        background: "#f6f7fb",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "42px", marginBottom: "20px" }}>
        Find your perfect camper
      </h1>

      <p style={{ fontSize: "18px", marginBottom: "30px", maxWidth: "600px" }}>
        Discover the best campers for your next adventure. Comfortable, reliable
        and ready for the road.
      </p>

      <Link
        to="/catalog"
        style={{
          padding: "14px 28px",
          background: "#E44848",
          color: "white",
          textDecoration: "none",
          borderRadius: "8px",
          fontWeight: "600",
        }}
      >
        View Now
      </Link>
    </div>
  );
}
