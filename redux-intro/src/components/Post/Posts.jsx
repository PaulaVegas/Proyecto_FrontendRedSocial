import PostCard from "./PostCard";
import { useState } from "react";
import NewPost from "./NewPost";

const Posts = ({ posts, refreshPosts, isLoading }) => {
	const [editingPost, setEditingPost] = useState(null);
	const currentUserId = localStorage.getItem("userId") || "";

	if (isLoading) return <p>Loading...</p>;
	if (!posts || posts.length === 0) return <p>No posts found</p>;

	const sortedPosts = posts
		.slice()
		.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

	const handleEdit = (post) => {
		setEditingPost(post);
	};

	const handleDelete = async (postId) => {
		if (!window.confirm("Are you sure you want to delete this post?")) return;
		const token = localStorage.getItem("token");
		try {
			await fetch(`http://localhost:3000/posts/${postId}`, {
				method: "DELETE",
				headers: { Authorization: `Bearer ${token}` },
			});
			if (refreshPosts) refreshPosts();
		} catch (err) {
			console.error(err);
		}
	};

	const handleSuccess = () => {
		setEditingPost(null);
		if (refreshPosts) refreshPosts();
	};

	if (editingPost) {
		return <NewPost postToEdit={editingPost} onSuccess={handleSuccess} />;
	}

	return (
		<div className="post-container">
			{sortedPosts.map((post) => (
				<PostCard
					key={post._id}
					post={post}
					currentUserId={currentUserId}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			))}
		</div>
	);
};

export default Posts;
