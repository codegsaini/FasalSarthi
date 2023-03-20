import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const lessonCache = JSON.parse(localStorage.getItem("lessonCache"));

const initialState = {
	lessonCache: lessonCache ? lessonCache : [],
};

export const setLessonCache = createAsyncThunk(
	"lessonCache/set",
	async (lessonCache, thunk) => {
		localStorage.setItem("lessonCache", JSON.stringify(lessonCache));
		return lessonCache;
	}
);

export const lessonCacheSlice = createSlice({
	name: "lessonCache",
	initialState: initialState,
	extraReducers: (builder) => {
		builder.addCase(setLessonCache.fulfilled, (state, action) => {
			state.lessonCache = action.payload;
		});
	},
});

export default lessonCacheSlice.reducer;
