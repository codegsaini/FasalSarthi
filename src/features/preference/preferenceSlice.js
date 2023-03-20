import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const preference = JSON.parse(localStorage.getItem("preference"));
const initialPreference = {
	refreshTimestamp: -1,
};
const initialState = {
	preference: preference ? preference : initialPreference,
};

export const setPreference = createAsyncThunk(
	"preference/set",
	async (preference, thunk) => {
		localStorage.setItem("preference", JSON.stringify(preference));
		return preference;
	}
);

export const preferenceSlice = createSlice({
	name: "preference",
	initialState: initialState,
	extraReducers: (builder) => {
		builder.addCase(setPreference.fulfilled, (state, action) => {
			state.preference = action.payload;
		});
	},
});

export default preferenceSlice.reducer;
