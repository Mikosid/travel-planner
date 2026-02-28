import { createSlice } from "@reduxjs/toolkit";
import { fetchCamperById } from "./camperDetailsThunks";

const camperDetailsSlice = createSlice({
  name: "camperDetails",
  initialState: {
    item: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearCamperDetails(state) {
      state.item = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCamperById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.item = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearCamperDetails } = camperDetailsSlice.actions;
export default camperDetailsSlice.reducer;
