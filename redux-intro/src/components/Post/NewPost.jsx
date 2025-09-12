import { useState, useEffect } from "react";
import axios from "axios";

const NewPost = ({ postToEdit = null, onSuccess, onCancel }) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [image, setImage] = useState(null);
	const [preview, setPreview] = useState(null);
	const token = localStorage.getItem("token");
	const API_URL = import.meta.env.VITE_API_URL;

	useEffect(() => {
		if (postToEdit) {
			setTitle(postToEdit.title);
			setContent(postToEdit.content);
			setPreview(postToEdit.image ? `${API_URL}/${postToEdit.image}` : null);
		}
	}, [postToEdit]);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setImage(file);
		setPreview(file ? URL.createObjectURL(file) : null);
		if (file.size > 10 * 1024 * 1024) {
			alert("File too large. Max 10MB.");
			return;
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!title.trim() || !content.trim()) return;

		const formData = new FormData();
		formData.append("title", title);
		formData.append("content", content);
		if (image) formData.append("image", image);

		try {
			if (postToEdit) {
				await axios.put(`${API_URL}/posts/${postToEdit._id}`, formData, {
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "multipart/form-data",
					},
				});
			} else {
				await axios.post(`${API_URL}/posts/newPost`, formData, {
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "multipart/form-data",
					},
				});
			}

			setTitle("");
			setContent("");
			setImage(null);
			setPreview(null);

			if (onSuccess) onSuccess();
		} catch (error) {
			console.error("Error saving post:", error);
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
			<button type="submit">
				{postToEdit ? "Update Post" : "Create Post"}
			</button>
			{postToEdit && onCancel && (
				<button type="button" onClick={onCancel} style={{ marginLeft: "1rem" }}>
					Cancel
				</button>
			)}
		</form>
	);
};

export default NewPost;
