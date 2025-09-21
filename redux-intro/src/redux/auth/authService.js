import api from "../../utils/axiosConfig";

const API_URL = import.meta.env.VITE_API_URL;

const register = async (userData) => {
	const res = await api.post("/users/register", userData);
	return res.data;
};

const login = async (userData) => {
	const res = await api.post("/users/login", userData);

	if (res.data) {
		localStorage.setItem("user", JSON.stringify(res.data.user));
		localStorage.setItem("token", res.data.token);
	}
	return res.data;
};

const logout = async () => {
	const res = await api.delete("/users/logout");
	if (res.data) localStorage.clear();
	return res.data;
};

const getUserInfo = async () => {
	const res = await api.get("/users/info");
	return res.data;
};
const authService = {
	register,
	login,
	logout,
	getUserInfo,
};

export default authService;
