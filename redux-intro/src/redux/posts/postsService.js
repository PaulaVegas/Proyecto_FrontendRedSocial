import axios from "axios";

const API_URL = "http://localhost:3000";

const getAll = async () => {
	const res = await axios.get(`${API_URL}/posts/`);
	return res.data;
};

const getById = async (id) => {
	const res = await axios.get(`${API_URL}/posts/${id}`);
	return res.data;
};

const getPostByTitle = async (title) => {
	const res = await axios.get(`${API_URL}/posts/title/${title}`);
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
