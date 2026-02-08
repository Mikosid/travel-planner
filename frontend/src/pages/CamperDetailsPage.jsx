import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCamperById } from "../services/campersApi";

export default function CamperDetailsPage() {
  const { id } = useParams();
  const [camper, setCamper] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    async function fetchCamper() {
      try {
        const { data } = await getCamperById(id);
        setCamper(data);
      } catch (err) {
        setError(err.message || "Failed to load camper");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCamper();
  }, [id]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Імітація успішного бронювання
    setBookingSuccess(true);
    setBookingName("");
    setBookingEmail("");
    setTimeout(() => setBookingSuccess(false), 3000); // нотифікація 3 сек
  };

  if (isLoading) return <p>Loading camper...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!camper) return <p>Camper not found.</p>;

  // Характеристики та деталі
  const features = [
    "transmission",
    "engine",
    "AC",
    "bathroom",
    "kitchen",
    "TV",
    "radio",
    "refrigerator",
    "microwave",
    "gas",
    "water",
  ];

  const details = ["form", "length", "width", "height", "tank", "consumption"];

  return (
    <div style={{ padding: "20px" }}>
      <h1>{camper.name}</h1>
      <p>Price: {camper.price}.00</p>

      {/* Галерея фото */}
      {camper.photos && camper.photos.length > 0 && (
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          {camper.photos.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`${camper.name} ${idx}`}
              style={{ width: "150px", borderRadius: "8px" }}
            />
          ))}
        </div>
      )}

      {/* Характеристики */}
      <h2>Features</h2>
      <ul>
        {features.map((f) =>
          camper[f] ? (
            <li key={f}>
              {f}: {String(camper[f])}
            </li>
          ) : null
        )}
      </ul>

      {/* Деталі */}
      <h2>Details</h2>
      <ul>
        {details.map((d) =>
          camper[d] ? (
            <li key={d}>
              {d}: {camper[d]}
            </li>
          ) : null
        )}
      </ul>

      {/* Відгуки */}
      {camper.reviews && camper.reviews.length > 0 && (
        <>
          <h2>Reviews</h2>
          {camper.reviews.map((r, idx) => (
            <div
              key={idx}
              style={{ borderBottom: "1px solid #ccc", padding: "5px 0" }}
            >
              <p>
                <strong>{r.user}</strong>: {r.comment}
              </p>
              <p>
                Rating: {"⭐".repeat(r.rating)} {"☆".repeat(5 - r.rating)}
              </p>
            </div>
          ))}
        </>
      )}

      {/* Форма бронювання */}
      <h2>Book this camper</h2>
      {bookingSuccess && <p style={{ color: "green" }}>Booking successful!</p>}
      <form
        onSubmit={handleBookingSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          placeholder="Your Name"
          value={bookingName}
          onChange={(e) => setBookingName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={bookingEmail}
          onChange={(e) => setBookingEmail(e.target.value)}
          required
        />
        <button type="submit" style={{ cursor: "pointer" }}>
          Book Now
        </button>
      </form>
    </div>
  );
}
