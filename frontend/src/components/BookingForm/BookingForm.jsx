import { useState } from "react";

export default function BookingForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccess(true);

    setName("");
    setEmail("");
    setDate("");
    setComment("");

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div
      style={{
        border: "1px solid #E4E7EC",
        padding: "24px",
        borderRadius: "12px",
        background: "#fff",
        width: "100%",
        maxWidth: "400px",
      }}
    >
      <h3 style={{ marginBottom: "8px" }}>Book your camper now</h3>

      <p style={{ fontSize: "14px", color: "#667085", marginBottom: "20px" }}>
        Stay connected! We are always ready to help you.
      </p>

      {success && (
        <p style={{ color: "green", marginBottom: "10px" }}>
          Booking successful!
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <input
          type="text"
          placeholder="Name*"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        />

        <input
          type="email"
          placeholder="Email*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        />

        <textarea
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            background: "#E44848",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
