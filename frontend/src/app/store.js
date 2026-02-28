import { configureStore } from "@reduxjs/toolkit";
import campersReducer from "../features/campers/campersSlice";
import camperDetailsReducer from "../features/campers/camperDetailsSlice";

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    camperDetails: camperDetailsReducer,
  },
});
