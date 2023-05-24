import { createSlice } from "@reduxjs/toolkit";

export const megaMenuSlice = createSlice({
  name: "megaMenu",
  initialState: {
    megaMenu: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getMegaMenuStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getMegaMenuSuccess: (state, action) => {
      state.isFetching = false;
      state.megaMenu = action.payload;
      // state.lastPage = action.payload.last_page;
    },
    getMegaMenuFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    }
  
  
  },
});

export const {
  getMegaMenuStart,
  getMegaMenuSuccess,
  getMegaMenuFailure,

} = megaMenuSlice.actions;

export default megaMenuSlice.reducer;