import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchCamperById } from "../features/campers/camperDetailsThunks";
import { clearCamperDetails } from "../features/campers/camperDetailsSlice";
import CamperTabs from "../components/CamperTabs/CamperTabs";
import FeaturesSection from "../components/FeaturesSection/FeaturesSection";
import ReviewsSection from "../components/ReviewsSection/ReviewsSection";
import RatingLocation from "../components/RatingLocation/RatingLocation";
import BookingForm from "../components/BookingForm/BookingForm";
import CamperGallery from "../components/CamperGallery/CamperGallery";
import styles from "./CamperDetailsPage.module.css";

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
  const camperPrice = Number(camper?.price);
  const formattedPrice = Number.isFinite(camperPrice)
    ? camperPrice.toFixed(2)
    : "0.00";

  useEffect(() => {
    dispatch(fetchCamperById(id));

    // Очистка деталей при виході зі сторінки
    return () => {
      dispatch(clearCamperDetails());
    };
  }, [dispatch, id]);

  // Loader / Error
  if (isLoading) {
    return (
      <div className={styles.camperDetailsPage}>
        <p>Loading camper...</p>
      </div>
    );
  }
  if (error) return <p className={styles.camperDetailsError}>Error: {error}</p>;
  if (!camper)
    return <p className={styles.camperDetailsEmpty}>Camper not found.</p>;

  return (
    <div className={styles.camperDetailsPage}>
      <h1>{camper.name}</h1>

      <RatingLocation
        rating={camper.rating}
        reviews={camper.reviews}
        location={camper.location}
      />

      <p className={styles.camperDetailsPrice}>€ {formattedPrice}</p>

      {/* Галерея */}
      <CamperGallery gallery={camper.gallery || []} />

      <p className={styles.camperDetailsDescription}>{camper.description}</p>

      {/* Tabs */}
      <CamperTabs activeTab={activeTab} onChange={setActiveTab} />

      <div className={styles.camperDetailsContent}>
        {/* LEFT SIDE */}
        <div className={styles.camperDetailsMain}>
          {activeTab === "features" && <FeaturesSection camper={camper} />}
          {activeTab === "reviews" && (
            <ReviewsSection reviews={camper.reviews} />
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.camperDetailsSidebar}>
          <BookingForm camperId={camper.id} />
        </div>
      </div>
    </div>
  );
}
