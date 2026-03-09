export default function RatingLocation({ rating, reviews, location }) {
  return (
    <div style={{ display: "flex", gap: "20px", margin: "10px 0" }}>
      <span>
        ⭐ {rating} ({reviews?.length || 0} Reviews)
      </span>

      <span>📍 {location}</span>
    </div>
  );
}
