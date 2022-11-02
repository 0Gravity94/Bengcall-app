import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: true,
};

const sliceState = createSlice({
	name: "state",
	initialState: initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});

const reducer = {
	state: sliceState.reducer,
};

export default reducer;
