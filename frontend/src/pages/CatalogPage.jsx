import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../features/campers/campersThunks"; // <-- thunk
import { loadMore, toggleFavorite } from "../features/campers/campersSlice"; // <-- slice
import CamperCard from "../components/CamperCard/CamperCard";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error, page, favorites, hasMore } = useSelector(
    (state) => state.campers,
  );

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

  return (
    <div style={{ padding: "20px" }}>
      <h1>Catalog</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {items.length === 0 && !isLoading && <p>No campers found.</p>}

        {items.map((camper) => (
          <CamperCard
            key={camper.id}
            camper={camper}
            isFavorite={favorites.includes(camper.id)}
            onToggleFavorite={() => handleToggleFavorite(camper.id)}
          />
        ))}
      </div>

      {isLoading && <p>Loading...</p>}

      {!isLoading && hasMore && items.length > 0 && (
        <button
          onClick={handleLoadMore}
          style={{ marginTop: "20px", cursor: "pointer", padding: "10px 20px" }}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default CatalogPage;
