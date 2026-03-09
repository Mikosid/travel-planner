import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../features/campers/campersThunks"; // <-- thunk
import { loadMore, toggleFavorite } from "../features/campers/campersSlice"; // <-- slice
import CamperCard from "../components/CamperCard/CamperCard";
import Filters from "../components/Filters/Filters";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error, page, favorites, hasMore } = useSelector(
    (state) => state.campers,
  );

  const [filters, setFilters] = useState(null);

  useEffect(() => {
    dispatch(fetchCampers({ page }));
  }, [dispatch, page]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      dispatch(loadMore());
    }
  };

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };

  const handleApplyFilters = (data) => {
    setFilters(data);
  };

  const filteredCampers = items.filter((camper) => {
    if (!filters) return true;

    // LOCATION
    if (
      filters.location &&
      !camper.location?.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      return false;
    }

    // VEHICLE TYPE
    if (filters.vehicleType && camper.form !== filters.vehicleType) {
      return false;
    }

    // EQUIPMENT
    if (filters.equipment) {
      for (const key in filters.equipment) {
        if (filters.equipment[key] && !camper[key]) {
          return false;
        }
      }
    }

    return true;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Catalog</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: "40px",
          alignItems: "start",
        }}
      >
        {/* LEFT SIDE */}
        <div>
          <Filters onApply={handleApplyFilters} />
        </div>

        {/* RIGHT SIDE */}
        <div>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {filteredCampers.length === 0 && !isLoading && (
              <p>No campers found.</p>
            )}

            {filteredCampers.map((camper) => (
              <CamperCard
                key={camper.id}
                camper={camper}
                isFavorite={favorites.includes(camper.id)}
                onToggleFavorite={() => handleToggleFavorite(camper.id)}
              />
            ))}
          </div>
        </div>

        {isLoading && <p>Loading campers...</p>}

        {!isLoading && hasMore && items.length > 0 && (
          <button
            onClick={handleLoadMore}
            style={{
              marginTop: "20px",
              cursor: "pointer",
              padding: "10px 20px",
            }}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
