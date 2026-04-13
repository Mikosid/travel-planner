import styles from "./CamperGallery.module.css";

export default function CamperGallery({ gallery }) {
  if (!gallery || gallery.length === 0) return null;

  return (
    <div className={styles.galleryGrid}>
      {gallery.map((img, index) => {
        const src = typeof img === "string" ? img : img?.original;
        if (!src) return null;

        return (
          <img
            key={`${src}-${index}`}
            src={src}
            alt={`camper ${index}`}
            className={styles.galleryImage}
          />
        );
      })}
    </div>
  );
}
