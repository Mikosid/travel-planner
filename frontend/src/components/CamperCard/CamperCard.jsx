import { Link } from "react-router-dom";
import noImage from "../../assets/no image (1).jpg";
import styles from "./CamperCard.module.css";

export default function CamperCard({ camper, isFavorite, onToggleFavorite }) {
  const firstImage = camper.gallery?.[0];
  const image = firstImage?.original || firstImage || noImage;
  const price = Number(camper.price);
  const formattedPrice = Number.isFinite(price) ? price.toFixed(2) : "0.00";
  const description = camper.description ?? "";
  const hasLongDescription = description.length > 70;
  const shortDescription = hasLongDescription
    ? `${description.slice(0, 70)}...`
    : description || "No description";

  const features = [];

  if (camper.transmission === "automatic") features.push("Automatic");
  if (camper.AC) features.push("AC");
  if (camper.kitchen) features.push("Kitchen");
  if (camper.bathroom) features.push("Bathroom");

  return (
    <div className={styles.card}>
      {/* IMAGE */}
      <img src={image} alt={camper.name} className={styles.image} />

      {/* NAME + PRICE */}
      <div className={styles.titleRow}>
        <h3 className={styles.name}>{camper.name}</h3>

        <span className={styles.price}>€ {formattedPrice}</span>
      </div>

      {/* RATING + LOCATION */}
      <div className={styles.meta}>
        ⭐ {camper.rating} ({camper.reviews?.length || 0})
        <br />
        📍 {camper.location}
      </div>

      {/* DESCRIPTION */}
      <p className={styles.description}>{shortDescription}</p>

      {/* FEATURES */}
      <div className={styles.features}>
        {features.map((feature) => (
          <span key={feature} className={styles.featureTag}>
            {feature}
          </span>
        ))}
      </div>

      {/* ACTIONS */}
      <div className={styles.actions}>
        <button
          onClick={onToggleFavorite}
          className={`${styles.favoriteButton} ${
            isFavorite ? styles.favoriteActive : ""
          }`}
        >
          {isFavorite ? "★ Favorite" : "☆ Favorite"}
        </button>

        <Link
          to={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.showMoreLink}
        >
          Show more
        </Link>
      </div>
    </div>
  );
}
