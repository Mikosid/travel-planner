import { Link } from "react-router-dom";
import noImage from "../../assets/no image (1).jpg";

export default function CamperCard({ camper, isFavorite, onToggleFavorite }) {
  const firstImage = camper.gallery?.[0];
  const image = firstImage?.original || firstImage || noImage;

  const features = [];

  if (camper.transmission === "automatic") features.push("Automatic");
  if (camper.AC) features.push("AC");
  if (camper.kitchen) features.push("Kitchen");
  if (camper.bathroom) features.push("Bathroom");

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "16px",
        width: "100%",
        background: "#fff",
      }}
    >
      {/* IMAGE */}
      <img
        src={image}
        alt={camper.name}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "10px",
          marginBottom: "12px",
        }}
      />

      {/* NAME + PRICE */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "6px",
        }}
      >
        <h3 style={{ margin: 0 }}>{camper.name}</h3>

        <span style={{ fontWeight: "600" }}>
          € {Number(camper.price).toFixed(2)}
        </span>
      </div>

      {/* RATING + LOCATION */}
      <div
        style={{
          fontSize: "14px",
          marginBottom: "10px",
        }}
      >
        ⭐ {camper.rating} ({camper.reviews?.length || 0})
        <br />
        📍 {camper.location}
      </div>

      {/* DESCRIPTION */}
      <p
        style={{
          fontSize: "14px",
          color: "#666",
          marginBottom: "12px",
        }}
      >
        {camper.description?.slice(0, 70)}...
      </p>

      {/* FEATURES */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
          marginBottom: "14px",
        }}
      >
        {features.map((feature) => (
          <span
            key={feature}
            style={{
              padding: "4px 10px",
              background: "#f2f2f2",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          >
            {feature}
          </span>
        ))}
      </div>

      {/* ACTIONS */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <button
          onClick={onToggleFavorite}
          style={{
            cursor: "pointer",
            padding: "8px 10px",
            borderRadius: "6px",
            border: "none",
            background: isFavorite ? "gold" : "#eee",
          }}
        >
          {isFavorite ? "★ Favorite" : "☆ Favorite"}
        </button>

        <Link
          to={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            cursor: "pointer",
            padding: "8px 14px",
            borderRadius: "6px",
            background: "#333",
            color: "white",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Show more
        </Link>
      </div>
    </div>
  );
}
