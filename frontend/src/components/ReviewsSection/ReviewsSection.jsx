export default function ReviewsSection({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <p>No reviews yet</p>;
  }

  return (
    <>
      <h2>Reviews</h2>

      {reviews.map((review, idx) => {
        const { reviewer_name, reviewer_rating, comment } = review;

        return (
          <div
            key={`${reviewer_name}-${idx}`}
            style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}
          >
            <p>
              <strong>{reviewer_name}</strong>
            </p>

            <p>
              {"⭐".repeat(reviewer_rating)}
              {"☆".repeat(5 - reviewer_rating)}
            </p>

            <p>{comment}</p>
          </div>
        );
      })}
    </>
  );
}
