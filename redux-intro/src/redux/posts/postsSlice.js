import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
	posts: [],
	page: 1,
	totalPages: 1,
	totalPosts: 0,
	isLoading: false,
	isError: false,
	message: "",
	post: {},
};

export const getAll = createAsyncThunk(
	"posts/getAll",
	async ({ page = 1, limit = 10 } = {}, thunkAPI) => {
		try {
			return await postsService.getAll(page, limit);
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response?.data?.message || error.message
			);
		}
	}
);

export const getById = createAsyncThunk(
	"posts/getById",
	async (id, thunkAPI) => {
		try {
			return await postsService.getById(id);
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response?.data?.message || error.message
			);
		}
	}
);

export const getPostByTitle = createAsyncThunk(
	"posts/getPostByTitle",
	async ({ title, page = 1, limit = 10 }, thunkAPI) => {
		try {
			return await postsService.getPostByTitle(title, page, limit);
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response?.data?.message || error.message
			);
		}
	}
);

export const update = createAsyncThunk(
	"posts/update",
	async ({ id, postData }, thunkAPI) => {
		try {
			return await postsService.update(id, postData);
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response?.data?.message || error.message
			);
		}
	}
);

export const deletePost = createAsyncThunk(
	"posts/delete",
	async (id, thunkAPI) => {
		try {
			return await postsService.deletePost(id);
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response?.data?.message || error.message
			);
		}
	}
);

export const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		reset: (state) => {
			state.posts = [];
			state.page = 1;
			state.totalPages = 1;
			state.totalPosts = 0;
			state.isLoading = false;
			state.isError = false;
			state.message = "";
			state.post = {};
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(getAll.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.posts = action.payload.posts || [];
				state.page = action.payload.page || 1;
				state.totalPages = action.payload.totalPages || 1;
				state.totalPosts = action.payload.totalPosts || 0;
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
				state.isLoading = false;
				state.isError = false;
				state.posts = action.payload.posts || [];
				state.page = action.payload.page || 1;
				state.totalPages = action.payload.totalPages || 1;
				state.totalPosts = action.payload.totalPosts || 0;
			})
			.addCase(getPostByTitle.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getPostByTitle.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload || "Error fetching posts by title";
			})
			.addCase(update.fulfilled, (state, action) => {
				const updated = action.payload;
				state.posts = state.posts.map((p) =>
					p._id === updated._id ? updated : p
				);
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				const id = action.meta.arg;
				state.posts = state.posts.filter((p) => p._id !== id);
			});
	},
});

export const { reset } = postsSlice.actions;

export default postsSlice.reducer;
