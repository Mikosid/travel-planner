import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchCamperById } from "../features/campers/camperDetailsThunks";
import { clearCamperDetails } from "../features/campers/camperDetailsSlice";
import noImage from "../assets/no image (1).jpg";
import CamperTabs from "../components/CamperTabs/CamperTabs";
import FeaturesSection from "../components/FeaturesSection/FeaturesSection";
import ReviewsSection from "../components/ReviewsSection/ReviewsSection";
import RatingLocation from "../components/RatingLocation/RatingLocation";
import BookingForm from "../components/BookingForm/BookingForm";

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
  const [activeTab, setActiveTab] = useState("features");

  useEffect(() => {
    dispatch(fetchCamperById(id));

    // Очистка деталей при виході зі сторінки
    return () => {
      dispatch(clearCamperDetails());
    };
  }, [dispatch, id]);

  // Loader / Error
  if (isLoading) return <p>Loading camper...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!camper) return <p>Camper not found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{camper.name}</h1>
      <RatingLocation
        rating={camper.rating}
        reviews={camper.reviews}
        location={camper.location}
      />
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

      <div
        style={{
          display: "flex",
          gap: "40px",
          marginTop: "20px",
          alignItems: "flex-start",
        }}
      >
        {/* LEFT SIDE */}
        <div style={{ flex: 2 }}>
          {activeTab === "features" && <FeaturesSection camper={camper} />}
          {activeTab === "reviews" && (
            <ReviewsSection reviews={camper.reviews} />
          )}
        </div>

        {/* RIGHT SIDE */}
        <div style={{ flex: 1 }}>
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
