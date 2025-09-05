import React, { useEffect, useState } from "react";
import axios from "axios";
import Posts from "./Posts";
import NewPost from "./NewPost";

const PostsContainer = () => {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [limit] = useState(10);
	const [editingPost, setEditingPost] = useState(null);

	const token = localStorage.getItem("token");
	const currentUserId = localStorage.getItem("userId");

	const fetchPosts = async (pageNumber = 1) => {
		setIsLoading(true);
		try {
			const res = await axios.get(
				`http://localhost:3000/posts?page=${pageNumber}&limit=${limit}`,
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			setPosts(res.data);
		} catch (err) {
			console.error("Error fetching posts:", err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchPosts(page);
	}, [page]);

	const handleDeletePost = async (postId) => {
		try {
			await axios.delete(`http://localhost:3000/posts/${postId}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setPosts((prev) => prev.filter((p) => p._id !== postId));
		} catch (err) {
			console.error(err);
		}
	};

	const handleEditPost = (post) => {
		setEditingPost(post);
	};

	const handleSuccess = () => {
		setEditingPost(null);
		fetchPosts(page);
	};

	return (
		<div>
			{editingPost && (
				<div className="new-post-form-wrapper">
					<NewPost postToEdit={editingPost} onSuccess={handleSuccess} />
				</div>
			)}

			<Posts
				posts={posts
					.slice()
					.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))}
				currentUserId={currentUserId}
				onDelete={handleDeletePost}
				onEdit={handleEditPost}
				isLoading={isLoading}
			/>

			<div className="pagination-controls">
				<button
					onClick={() => setPage((prev) => prev - 1)}
					disabled={page === 1}
				>
					Previous
				</button>
				<span>Page {page}</span>
				<button
					onClick={() => setPage((prev) => prev + 1)}
					disabled={posts.length < limit}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default PostsContainer;
