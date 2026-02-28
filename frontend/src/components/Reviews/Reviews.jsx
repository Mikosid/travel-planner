export default function Reviews({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <p>No reviews yet.</p>;
  }

  return (
    <>
      <h2>Reviews</h2>

      {reviews.map((r, idx) => (
        <div
          key={idx}
          style={{ borderBottom: "1px solid #ccc", padding: "8px 0" }}
        >
          <p>
            <strong>{r.reviewer_name}</strong>
          </p>

          <p>{r.comment}</p>

          <p>
            Rating: {"⭐".repeat(r.reviewer_rating)}
            {"☆".repeat(5 - r.reviewer_rating)}
          </p>
        </div>
      ))}
    </>
  );
}
