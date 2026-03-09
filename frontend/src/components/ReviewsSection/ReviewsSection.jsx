export default function ReviewsSection({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <p>No reviews yet</p>;
  }

  return (
    <div>
      <h2>Reviews</h2>

      {reviews.map((r, idx) => {
        const initial = r.reviewer_name?.charAt(0).toUpperCase();

        return (
          <div
            key={idx}
            style={{
              borderBottom: "1px solid #eee",
              padding: "16px 0",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "6px",
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#f2f4f7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "600",
                }}
              >
                {initial}
              </div>

              {/* Name + rating */}
              <div>
                <div style={{ fontWeight: "600" }}>{r.reviewer_name}</div>

                <div style={{ fontSize: "14px" }}>
                  {"⭐".repeat(r.reviewer_rating)}
                </div>
              </div>
            </div>

            {/* Comment */}
            <p style={{ margin: 0 }}>{r.comment}</p>
          </div>
        );
      })}
    </div>
  );
}
