import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { handleApiError } from "../../utils/notifications";

const safeParse = (item) => {
	try {
		return JSON.parse(item);
	} catch {
		return null;
	}
};

const userStorage = safeParse(localStorage.getItem("user"));
const tokenStorage = localStorage.getItem("token");

const initialState = {
	user: userStorage ? userStorage : null,
	token: tokenStorage || null,
	isError: false,
	isSuccess: false,
	message: "",
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		reset: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.message = "";
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload.user;
				state.token = action.payload.token;
				state.isSuccess = true;
				state.message = action.payload.message;
				localStorage.setItem("token", action.payload.token);
				localStorage.setItem("user", JSON.stringify(action.payload.user));
				localStorage.setItem("userId", action.payload.user.id);
			})
			.addCase(login.rejected, (state, action) => {
				state.isError = true;
				state.message = action.payload;
			})

			.addCase(logout.fulfilled, (state) => {
				state.user = null;
				state.token = null;
				localStorage.removeItem("token");
				localStorage.removeItem("user");
				localStorage.removeItem("userId");
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isSuccess = true;
				state.message = action.payload.message;
			})
			.addCase(register.rejected, (state, action) => {
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(fetchUserInfo.fulfilled, (state, action) => {
				state.user = action.payload;
			});
	},
});

export const register = createAsyncThunk(
	"auth/register",
	async (user, thunkAPI) => {
		try {
			return await authService.register(user);
		} catch (error) {
			const errorMessage = handleApiError(error, "Error al registrarse");
			return thunkAPI.rejectWithValue(errorMessage);
		}
	}
);

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
	try {
		return await authService.login(user);
	} catch (error) {
		const errorMessage = handleApiError(error, "Error al iniciar sesión");
		return thunkAPI.rejectWithValue(errorMessage);
	}
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
	try {
		return await authService.logout();
	} catch (error) {
		handleApiError(error, "Error al cerrar sesión");
		// Limpiar localStorage incluso si hay error
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		localStorage.removeItem("userId");
		return thunkAPI.rejectWithValue("Error al cerrar sesión");
	}
});

export const fetchUserInfo = createAsyncThunk(
	"auth/fetchUserInfo",
	async (_, thunkAPI) => {
		try {
			return await authService.getUserInfo();
		} catch (error) {
			const errorMessage = handleApiError(error, "Error al obtener información del usuario");
			return thunkAPI.rejectWithValue(errorMessage);
		}
	}
);

export const { reset } = authSlice.actions;

export default authSlice.reducer;
