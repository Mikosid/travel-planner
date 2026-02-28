import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCamperById } from "../../services/campersApi";

// Thunk для завантаження одного кемпера за id
export const fetchCamperById = createAsyncThunk(
  "camperDetails/fetchById",
  async (id, thunkAPI) => {
    try {
      const { data } = await getCamperById(id);
      return data; // повертаємо дані кемпера
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);
