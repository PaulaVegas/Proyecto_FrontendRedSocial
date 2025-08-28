import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
	posts: [],
	isLoading: false,
	isError: false,
	message: "",
	post: {},
};

export const getAll = createAsyncThunk("posts/", async () => {
	try {
		return await postsService.getAll();
	} catch (error) {
		console.error(error);
	}
});

export const getById = createAsyncThunk("posts/:_id", async (id) => {
	try {
		return await postsService.getById(id);
	} catch (error) {
		console.error(error);
	}
});

export const getPostByTitle = createAsyncThunk(
	"posts/title/:title",
	async (postTitle) => {
		try {
			return await postsService.getPostByTitle(postTitle);
		} catch (error) {
			console.error(error);
		}
	}
);

export const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAll.fulfilled, (state, action) => {
				state.posts = action.payload || [];
				state.isLoading = false;
				state.isError = false;
			})
			.addCase(getAll.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAll.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.error?.message || "Error obtaining posts";
			})
			.addCase(getById.fulfilled, (state, action) => {
				state.post = action.payload;
			})
			.addCase(getPostByTitle.fulfilled, (state, action) => {
				state.posts = Array.isArray(action.payload)
					? action.payload
					: [action.payload];
			});
	},
});

export const { reset } = postsSlice.actions;

export default postsSlice.reducer;
