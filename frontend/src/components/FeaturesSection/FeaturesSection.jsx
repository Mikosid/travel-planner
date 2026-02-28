export default function FeaturesSection({ camper }) {
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
    <>
      <h2>Features</h2>
      <ul>
        {features.map(
          (f) =>
            camper[f] && (
              <li key={f}>
                {f}: {String(camper[f])}
              </li>
            ),
        )}
      </ul>

      <h2>Details</h2>
      <ul>
        {details.map(
          (d) =>
            camper[d] && (
              <li key={d}>
                {d}: {camper[d]}
              </li>
            ),
        )}
      </ul>
    </>
  );
}
