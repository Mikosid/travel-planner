import { useState } from "react";

export default function BookingForm() {
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setBookingSuccess(true);

    setBookingName("");
    setBookingEmail("");

    setTimeout(() => setBookingSuccess(false), 3000);
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h2>Book this camper</h2>

      {bookingSuccess && <p style={{ color: "green" }}>Booking successful!</p>}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
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

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}
