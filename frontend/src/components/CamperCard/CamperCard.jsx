import { Link } from "react-router-dom";
import noImage from "../../assets/no image (1).jpg";

export default function CamperCard({ camper, isFavorite, onToggleFavorite }) {
  const firstImage = camper.gallery?.[0];
  const image = firstImage?.original || firstImage || noImage;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        width: "280px",
      }}
    >
      <img
        src={image}
        alt={camper.name}
        style={{ width: "100%", borderRadius: "8px" }}
      />

      <h3>{camper.name}</h3>

      <p>
        ⭐ {camper.rating} ({camper.reviews?.length || 0} Reviews)
      </p>

      <p>📍 {camper.location}</p>

      <p style={{ fontWeight: "600" }}> € {camper.price.toFixed(2)}</p>

      <p
        style={{
          fontSize: "14px",
          color: "#666",
        }}
      >
        {camper.description?.slice(0, 60)}...
      </p>

      <button
        onClick={onToggleFavorite}
        style={{
          marginBottom: "10px",
          cursor: "pointer",
          background: isFavorite ? "gold" : "lightgray",
        }}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>

      <Link to={`/catalog/${camper.id}`}>
        <button style={{ cursor: "pointer" }}>Show more</button>
      </Link>
    </div>
  );
}
