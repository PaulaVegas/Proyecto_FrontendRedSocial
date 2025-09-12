import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getAll = async (page = 1, limit = 10) => {
	const res = await axios.get(`${API_URL}/posts?page=${page}&limit=${limit}`);
	return res.data;
};

const getById = async (id) => {
	const res = await axios.get(`${API_URL}/posts/${id}`);
	return res.data;
};

const getPostByTitle = async (title, page = 1, limit = 10) => {
	const res = await axios.get(
		`${API_URL}/posts/title/${encodeURIComponent(
			title
		)}?page=${page}&limit=${limit}`
	);
	return res.data;
};

const update = async (id, postData) => {
	const token = localStorage.getItem("token");
	const res = await axios.put(`${API_URL}/posts/update/${id}`, postData, {
		headers: { Authorization: `Bearer ${token}` },
	});
	return res.data;
};

const deletePost = async (id) => {
	const token = localStorage.getItem("token");
	const res = await axios.delete(`${API_URL}/posts/delete/${id}`, {
		headers: { Authorization: `Bearer ${token}` },
	});
	return res.data;
};

const postsService = {
	getAll,
	getById,
	getPostByTitle,
	update,
	deletePost,
};

export default postsService;
