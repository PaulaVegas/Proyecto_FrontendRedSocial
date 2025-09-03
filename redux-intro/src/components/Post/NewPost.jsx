import { useState } from "react";
import axios from "axios";

const NewPost = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [image, setImage] = useState(null);
	const [preview, setPreview] = useState(null);
	const token = localStorage.getItem("token");

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setImage(file);
		setPreview(file ? URL.createObjectURL(file) : null);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!title.trim() || !content.trim()) return;
		const formData = new FormData();
		formData.append("title", title);
		formData.append("content", content);
		if (image) formData.append("image", image);
		try {
			await axios.post("http://localhost:3000/posts/newPost", formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data",
				},
			});

			setTitle("");
			setContent("");
			setImage(null);
			setPreview(null);

			if (onPostCreated) onPostCreated();
		} catch (error) {
			console.error("Error creating post:", error);
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
			/>
			<input type="file" onChange={handleImageChange} name="image" />
			{preview && (
				<img
					src={preview}
					alt="Preview"
					style={{ maxWidth: "200px", marginTop: "1rem" }}
				/>
			)}
			<button type="submit">Create Post</button>
		</form>
	);
};

export default NewPost;
