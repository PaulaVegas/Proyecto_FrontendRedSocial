import { useState } from "react";
import { Link } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import LikeButton from "./LikeButton";

const PostCard = ({ post }) => {
	const userId = localStorage.getItem("userId");
	const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
	const [liked, setLiked] = useState(
		post.likes?.some((id) => id.toString() === userId)
	);
	const [commentText, setCommentText] = useState("");

	const commentsCount = post.commentIds?.length || 0;

	const handleComment = async (e) => {
		e.preventDefault();
		if (!commentText.trim()) return;

		try {
			await axios.post(
				"http://localhost:3000/comments/",
				{ postId: post._id, content: commentText },
				{
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				}
			);
			setCommentText("");
			message.success("Comment added!");
		} catch (err) {
			message.error(err.response?.data?.message || "Error adding comment");
		}
	};

	return (
		<div className="post-card">
			<Link to={`/posts/${post._id}`} className="post-title">
				<h3>{post.title}</h3>
			</Link>
			<p className="post-content">{post.content}</p>
			{post.image && (
				<img
					className="post-image"
					src={`http://localhost:3000/${post.image}`}
					alt={post.title}
				/>
			)}
			<p className="post-author">By {post.userId?.username || "Unknown"}</p>

			<LikeButton
				postId={post._id}
				liked={liked}
				likesCount={likesCount}
				setLiked={setLiked}
				setLikesCount={setLikesCount}
			/>

			<p className="comments-count">
				{commentsCount} comment{commentsCount !== 1 ? "s" : ""}
			</p>

			{/* <form onSubmit={handleComment} style={{ display: "flex", gap: "0.5rem" }}>
				<input
					type="text"
					value={commentText}
					onChange={(e) => setCommentText(e.target.value)}
					placeholder="Write a comment..."
				/>
				<button type="submit">Comment</button>
			</form> */}
		</div>
	);
};

export default PostCard;
