import { useEffect, useRef, useState } from "react";
import styles from "./BookingForm.module.css";

export default function BookingForm({ camperId }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [success, setSuccess] = useState(false);
  const successTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Booking for camper:", camperId);

    setSuccess(true);

    setName("");
    setEmail("");
    setDate("");
    setComment("");

    if (successTimerRef.current) {
      clearTimeout(successTimerRef.current);
    }
    successTimerRef.current = setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className={styles.bookingForm}>
      <h3 className={styles.title}>Book your camper now</h3>

      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      {success && <p className={styles.successMessage}>Booking successful!</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Name*"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={styles.input}
        />

        <input
          type="email"
          placeholder="Email*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className={styles.input}
        />

        <textarea
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className={styles.input}
        />

        <button type="submit" className={styles.submitButton}>
          Send
        </button>
      </form>
    </div>
  );
}
