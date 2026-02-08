import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCampers } from "../../services/campersApi";

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async ({ page, limit, filters } = {}, thunkAPI) => {
    try {
      const state = thunkAPI.getState().campers;

      const params = {
        page: page ?? state.page,
        limit: limit ?? state.limit,
        ...(filters ?? state.filters),
      };

      const { data } = await getCampers(params);

      // Повертаємо саме масив кемперів
      return Array.isArray(data.items) ? data.items : [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);
