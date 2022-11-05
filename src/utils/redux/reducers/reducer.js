import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedin: false,
  loading: true,
};

const sliceState = createSlice({
  name: "state",
  initialState: initialState,
  reducers: {
    handleAuth: (state, action) => {
      state.isLoggedin = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

const reducer = {
  state: sliceState.reducer,
};

export const { handleAuth } = sliceState.actions;
export default reducer;
