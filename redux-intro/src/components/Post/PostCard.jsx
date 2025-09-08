import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";

const PostCard = ({ post, currentUserId, onDelete, onEdit }) => {
	const currentId = currentUserId || localStorage.getItem("userId") || "";
	const postOwnerId = post.userId?._id ?? post.userId;

	const isOwner =
		postOwnerId && postOwnerId.toString() === (currentId || "").toString();

	const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
	const [liked, setLiked] = useState(
		post.likes?.some((id) =>
			typeof id === "string"
				? id === currentId
				: id?._id?.toString() === currentId
		)
	);

	useEffect(() => {
		setLikesCount(post.likes?.length || 0);
		setLiked(
			post.likes?.some((like) =>
				typeof like === "string"
					? like === currentId
					: like?._id?.toString() === currentId
			)
		);
	}, [post, currentId]);

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
						{new Date(post.createdAt).toLocaleDateString("es-ES", {
							year: "numeric",
							month: "long",
							day: "numeric",
							hour: "2-digit",
							minute: "2-digit",
						})}
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
				{(post.commentIds?.length || 0) !== 1 ? "s" : ""}
			</p>

			{isOwner && (
				<div className="post-actions">
					<button type="button" onClick={() => onEdit && onEdit(post)}>
						Editar
					</button>
					<button type="button" onClick={() => onDelete && onDelete(post._id)}>
						Borrar
					</button>
				</div>
			)}
		</div>
	);
};

export default PostCard;
