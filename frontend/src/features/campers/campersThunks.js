// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { getCampers } from "../../services/campersApi";

// export const fetchCampers = createAsyncThunk(
//   "campers/fetchCampers",
//   async ({ page, limit, filters } = {}, thunkAPI) => {
//     try {
//       const state = thunkAPI.getState().campers;

//       const params = {
//         page: page ?? state.page,
//         limit: limit ?? state.limit,
//         ...(filters ?? state.filters),
//       };

//       const { data } = await getCampers(params);

//       console.log("API DATA:", data);

//       return Array.isArray(data.items) ? data.items : [];
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   },
// );
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
        ...state.filters,
        ...filters,
      };

      const response = await getCampers(params);
      const data = response.data;

      const items = Array.isArray(data) ? data : data.items || [];
      const total = typeof data.total === "number" ? data.total : null;

      return {
        items,
        total,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);
