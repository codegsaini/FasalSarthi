import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService.js";

//Get user from local storage

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
	user: user ? user : null,
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};

//Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
	try {
		return await authService.login(user);
	} catch (error) {
		const message = error.response.data.message;

		return thunkAPI.rejectWithValue(message);
	}
});

export const logout = createAsyncThunk("auth/logout", async () => {
	await authService.logout();
});

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		reset: (state) => {
			state.isSuccess = false;
			state.isError = false;
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(login.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.user = action.payload;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.message = action.payload;
			state.user = null;
		});
		builder.addCase(logout.fulfilled, (state) => {
			state.user = null;
		});
	},
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
