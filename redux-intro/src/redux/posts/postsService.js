import axios from "axios";

const API_URL = "http://localhost:3000";

const getAll = async () => {
	const res = await axios.get(`${API_URL}/posts/`);
	return res.data.postsWithComments;
};

const getById = async (id) => {
	const res = await axios.get(`${API_URL}/posts/${id}`);
	return res.data;
};

const getPostByTitle = async (title) => {
	const res = await axios.get(`${API_URL}/posts/title/${title}`);
	return res.data;
};

const postsService = {
	getAll,
	getById,
	getPostByTitle,
};

export default postsService;
