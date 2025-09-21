import api from "../../utils/axiosConfig";

const getAll = async (page = 1, limit = 10) => {
	const res = await api.get(`/posts?page=${page}&limit=${limit}`);
	return res.data;
};

const getById = async (id) => {
	const res = await api.get(`/posts/${id}`);
	return res.data;
};

const getPostByTitle = async (title, page = 1, limit = 10) => {
	const res = await api.get(
		`/posts/title/${encodeURIComponent(title)}?page=${page}&limit=${limit}`
	);
	return res.data;
};

const update = async (id, postData) => {
	const res = await api.put(`/posts/update/${id}`, postData);
	return res.data;
};

const deletePost = async (id) => {
	const res = await api.delete(`/posts/delete/${id}`);
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
