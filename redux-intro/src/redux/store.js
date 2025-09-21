import { configureStore } from "@reduxjs/toolkit";
import auth from "../redux/auth/authSlice";
import posts from "../redux/posts/postsSlice";
import localStorageMiddleware from "./middleware/localStorageMiddleware";

export const store = configureStore({
	reducer: { auth, posts },
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['persist/PERSIST'],
			},
		}).concat(localStorageMiddleware),
});
