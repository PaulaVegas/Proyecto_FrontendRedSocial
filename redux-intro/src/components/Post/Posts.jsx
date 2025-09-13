import PostCard from "./PostCard";
import { useState } from "react";
import EditModal from "../Utils/EditModal";
import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/posts/postsSlice";

const Posts = ({ posts = [], refreshPosts, isLoading }) => {
	const [editingPost, setEditingPost] = useState(null);
	const dispatch = useDispatch();

	if (isLoading) return <p>Loading...</p>;
	if (!posts || posts.length === 0) return <p>No posts found</p>;

	const sortedPosts = posts
		.slice()
		.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

	const handleEdit = (post) => setEditingPost(post);

	const handleDelete = async (postId) => {
		if (!window.confirm("Are you sure you want to delete this post?")) return;
		try {
			await dispatch(deletePost(postId));
			if (refreshPosts) refreshPosts();
		} catch (err) {
			console.error("Error deleting post:", err);
		}
	};

	const handleSaved = () => {
		setEditingPost(null);
		if (refreshPosts) refreshPosts();
	};

	return (
		<div className="post-container">
			{editingPost && (
				<EditModal
					visible={!!editingPost}
					setVisible={() => setEditingPost(null)}
					post={editingPost}
					onSaved={handleSaved}
				/>
			)}

			{sortedPosts.map((post) => (
				<PostCard
					key={post._id}
					post={post}
					currentUserId={localStorage.getItem("userId")}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			))}
		</div>
	);
};

export default Posts;
