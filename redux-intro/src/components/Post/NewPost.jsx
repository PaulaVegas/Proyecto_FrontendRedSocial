import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getAll } from "../../redux/posts/postsSlice";

const NewPost = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [image, setImage] = useState(null);
	const dispatch = useDispatch();
	const token = localStorage.getItem("token");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("title", title);
		formData.append("content", content);
		if (image) formData.append("image", image);

		try {
			await axios.post("http://localhost:3000/posts", formData, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setTitle("");
			setContent("");
			setImage(null);
			dispatch(getAll());
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<form className="new-post-form" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				required
			/>
			<textarea
				placeholder="Content"
				value={content}
				onChange={(e) => setContent(e.target.value)}
				required
			></textarea>
			<input type="file" onChange={(e) => setImage(e.target.files[0])} />
			<button type="submit">Create Post</button>
		</form>
	);
};

export default NewPost;
