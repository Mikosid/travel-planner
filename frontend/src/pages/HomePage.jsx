import { Link } from "react-router-dom";
import heroImg from "../assets/Campers_photo.jpg";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <section
      className={styles.hero}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${heroImg})`,
      }}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Campers of your dreams</h1>

          <p className={styles.text}>
            You can find everything you want in our catalog
          </p>

          <Link to="/catalog" className={styles.button}>
            View Now
          </Link>
        </div>
      </div>
    </section>
  );
}
