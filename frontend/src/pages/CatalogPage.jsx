import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../features/campers/campersThunks";
import {
  loadMore,
  toggleFavorite,
  setFilters,
} from "../features/campers/campersSlice";

import CamperCard from "../components/CamperCard/CamperCard";
import Filters from "../components/Filters/Filters";
import SkeletonCard from "../components/CamperCard/SkeletonCard";

const CatalogPage = () => {
  const dispatch = useDispatch();

  const { items, isLoading, error, page, favorites, hasMore, filters } =
    useSelector((state) => state.campers);

  useEffect(() => {
    dispatch(fetchCampers({ page, filters }));
  }, [dispatch, page, filters]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      dispatch(loadMore());
    }
  };

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };

  const handleApplyFilters = (data) => {
    dispatch(setFilters(data));
    dispatch(fetchCampers({ page: 1, filters: data }));
  };

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
        {/* FILTERS */}
        <div>
          <Filters onApply={handleApplyFilters} />
        </div>

        {/* CAMPERS */}
        <div>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {items.map((camper) => (
              <CamperCard
                key={camper.id}
                camper={camper}
                isFavorite={favorites.includes(camper.id)}
                onToggleFavorite={() => handleToggleFavorite(camper.id)}
              />
            ))}

            {isLoading && [...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>

          {!isLoading && items.length === 0 && <p>No campers found.</p>}
        </div>
      </div>

      {!isLoading && hasMore && items.length > 0 && (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button
            onClick={handleLoadMore}
            style={{
              cursor: "pointer",
              padding: "10px 24px",
            }}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
