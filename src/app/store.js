import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import lessonCacheReducer from "../features/LessonCache/lessonCache.js";
import preferenceReducer from "../features/preference/preferenceSlice.js";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		preference: preferenceReducer,
		lessonCache: lessonCacheReducer,
	},
});
