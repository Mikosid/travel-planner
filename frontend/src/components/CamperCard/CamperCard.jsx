import { Link } from "react-router-dom";
import noImage from "../../assets/no image (1).jpg";

export default function CamperCard({ camper, isFavorite, onToggleFavorite }) {
  const image = camper.gallery?.[0]?.original || noImage;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        width: "200px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img src={image} alt={camper.name} width="180" />

      <h3>{camper.name}</h3>
      <p>{camper.price.toFixed(2)} €</p>

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
