import { createSlice } from "@reduxjs/toolkit";

const initiaState = {
  drawerState: "closed",
};

export const otherSlice = createSlice({
  name: "auth",
  initialState: initiaState,
  reducers: {
    toggleDrawer: (state) => {
      state.drawerState = !state.drawerState;
    },
  },
});

export const { toggleDrawer } = otherSlice.actions;

export default otherSlice.reducer;
