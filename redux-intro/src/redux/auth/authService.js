import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const register = async (userData) => {
	const res = await axios.post(`${API_URL}/users/register`, userData);
	return res.data;
};

const login = async (userData) => {
	const res = await axios.post(`${API_URL}/users/login`, userData);

	if (res.data) {
		localStorage.setItem("user", JSON.stringify(res.data.user));
		localStorage.setItem("token", res.data.token);
	}
	return res.data;
};

const logout = async () => {
	const token = localStorage.getItem("token");

	const res = await axios.delete(`${API_URL}/users/logout`, {
		headers: {
			authorization: `Bearer ${token}`,
		},
	});
	if (res.data) localStorage.clear();
	return res.data;
};
const getUserInfo = async () => {
	const token = localStorage.getItem("token");
	const res = await axios.get(`${API_URL}/users/info`, {
		headers: { authorization: `Bearer ${token}` },
	});
	return res.data;
};
const authService = {
	register,
	login,
	logout,
	getUserInfo,
};

export default authService;
