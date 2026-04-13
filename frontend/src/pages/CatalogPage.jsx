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
import styles from "./CatalogPage.module.css";

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
  };

  return (
    <div className={styles.catalogPage}>
      <div className={styles.catalogLayout}>
        {/* FILTERS */}
        <div className={styles.catalogFilters}>
          <Filters onApply={handleApplyFilters} />
        </div>

        {/* CAMPERS */}
        <div className={styles.catalogResults}>
          {error && <p className={styles.catalogError}>{error}</p>}

          <div className={styles.catalogGrid}>
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

          {!isLoading && items.length === 0 && (
            <p className={styles.catalogEmpty}>No campers found.</p>
          )}
        </div>
      </div>

      {!isLoading && hasMore && items.length > 0 && (
        <div className={styles.catalogLoadMoreWrapper}>
          <button
            onClick={handleLoadMore}
            className={styles.catalogLoadMoreButton}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
