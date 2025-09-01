import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
	posts: [],
	isLoading: false,
	isError: false,
	message: "",
	post: {},
};

export const getAll = createAsyncThunk("posts/getAll", async (_, thunkAPI) => {
	try {
		const posts = await postsService.getAll();
		return posts;
	} catch (error) {
		return thunkAPI.rejectWithValue(
			error.response?.data?.message || error.message
		);
	}
});

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
	async (postTitle, thunkAPI) => {
		try {
			return await postsService.getPostByTitle(postTitle);
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
			state.isLoading = false;
			state.isError = false;
			state.message = "";
			state.post = {};
			state.posts = [];
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

