import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";

const PostCard = ({ post }) => {
	const userId = localStorage.getItem("userId") || "";
	const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
	const [liked, setLiked] = useState(
		post.likes?.some((id) => id.toString() === userId)
	);

	useEffect(() => {
		setLikesCount(post.likes?.length || 0);
		setLiked(
			post.likes?.some((like) =>
				typeof like === "string"
					? like === userId
					: like?._id?.toString() === userId
			)
		);
	}, [post, userId]);
	const imageUrl =
		post.image &&
		(post.image.startsWith("http")
			? post.image
			: `http://localhost:3000/${post.image}`);

	return (
		<div className="post-card">
			<Link to={`/posts/${post._id}`} className="post-title">
				<h3>{post.title}</h3>
			</Link>
			{imageUrl && (
				<>
					<img className="post-image" src={imageUrl} alt={post.title} />
					<p className="post-date">
						{new Date(post.createdAt).toLocaleString()}
					</p>
				</>
			)}
			<p className="post-content">{post.content}</p>
			<p className="post-author">By {post.userId?.username || "Unknown"}</p>
			<LikeButton
				postId={post._id}
				liked={liked}
				likesCount={likesCount}
				setLiked={setLiked}
				setLikesCount={setLikesCount}
			/>
			<p className="comments-count">
				{post.commentIds?.length || 0} comment
				{post.commentIds?.length !== 1 ? "s" : ""}
			</p>
		</div>
	);
};

export default PostCard;
