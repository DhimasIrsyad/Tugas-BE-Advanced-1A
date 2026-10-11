import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "courses",
  // Initial State: State awal berupa array kosong
  initialState: {
    list: [],
  },
  // Reducer untuk Data API: Menangani data hasil API ke state global
  reducers: {
    setCourses: (state, action) => {
      state.list = action.payload;
    },
    addCourseToState: (state, action) => {
      state.list.unshift(action.payload);
    },
    updateCourseInState: (state, action) => {
      const index = state.list.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteCourseFromState: (state, action) => {
      state.list = state.list.filter((c) => c.id !== action.payload);
    },
  },
});

export const { 
  setCourses, 
  addCourseToState, 
  updateCourseInState, 
  deleteCourseFromState 
} = courseSlice.actions;

export default courseSlice.reducer;
