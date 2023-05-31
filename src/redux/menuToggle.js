import { createSlice } from "@reduxjs/toolkit";

const menuToggle = createSlice({
  name: "menuToggle",
  initialState: {
   menuOpen: false
  },
  reducers: {
    openMenu: (state) => {
      state.menuOpen = true;
      
    },
    closeMenu: (state) =>{
        state.menuOpen = false;
    }
  },
});

export const { openMenu , closeMenu } = menuToggle.actions;
export default menuToggle.reducer;