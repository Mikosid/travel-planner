export default function CamperGallery({ gallery }) {
  if (!gallery || gallery.length === 0) return null;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "12px",
        marginBottom: "24px",
      }}
    >
      {gallery.map((img, index) => (
        <img
          key={index}
          src={img.original}
          alt={`camper ${index}`}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "12px",
            cursor: "pointer",
            transition: "transform 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      ))}
    </div>
  );
}
