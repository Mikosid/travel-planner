import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchCamperById } from "../features/campers/camperDetailsThunks";
import { clearCamperDetails } from "../features/campers/camperDetailsSlice";
import noImage from "../assets/no image (1).jpg";
import CamperTabs from "../components/CamperTabs/CamperTabs";
import FeaturesSection from "../components/FeaturesSection/FeaturesSection";
import ReviewsSection from "../components/ReviewsSection/ReviewsSection";

export default function CamperDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Redux state
  const {
    item: camper,
    isLoading,
    error,
  } = useSelector((state) => state.camperDetails);

  // Локальний стан для форми бронювання
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("features");

  useEffect(() => {
    dispatch(fetchCamperById(id));

    // Очистка деталей при виході зі сторінки
    return () => {
      dispatch(clearCamperDetails());
    };
  }, [dispatch, id]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setBookingName("");
    setBookingEmail("");
    setTimeout(() => setBookingSuccess(false), 3000);
  };

  // Loader / Error
  if (isLoading) return <p>Loading camper...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!camper) return <p>Camper not found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{camper.name}</h1>
      <div style={{ display: "flex", gap: "20px", marginBottom: "10px" }}>
        <span>
          ⭐ {camper.rating} ({camper.reviews?.length || 0} Reviews)
        </span>

        <span>📍 {camper.location}</span>
      </div>
      <p>Price: {Number(camper.price).toFixed(2)} €</p>

      {/* Галерея */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {camper.gallery?.length > 0 ? (
          camper.gallery.map((img, idx) => (
            <img
              key={idx}
              src={img.original}
              alt={`${camper.name} ${idx}`}
              style={{ width: "150px", borderRadius: "8px" }}
            />
          ))
        ) : (
          <img src={noImage} alt="No image" />
        )}
      </div>

      {/* Tabs */}
      <CamperTabs activeTab={activeTab} onChange={setActiveTab} />

      {/* Features */}
      {activeTab === "features" && <FeaturesSection camper={camper} />}

      {/* Reviews */}
      {activeTab === "reviews" && <ReviewsSection reviews={camper.reviews} />}

      {/* Booking form */}
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
