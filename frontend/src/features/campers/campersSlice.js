import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers } from "./campersThunks";

const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    page: 1,
    limit: 4,
    filters: {},
    favorites: savedFavorites,
    isLoading: false,
    error: null,
    hasMore: true,
  },
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload;
      state.page = 1;
      state.items = [];
    },
    loadMore(state) {
      state.page += 1;
    },
    toggleFavorite(state, action) {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((fid) => fid !== id);
      } else {
        state.favorites.push(id);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;
        const data = Array.isArray(action.payload) ? action.payload : [];
        state.items = state.page === 1 ? data : [...state.items, ...data];
        state.hasMore = data.length > 0;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setFilters, loadMore, toggleFavorite } = campersSlice.actions;
export default campersSlice.reducer;
