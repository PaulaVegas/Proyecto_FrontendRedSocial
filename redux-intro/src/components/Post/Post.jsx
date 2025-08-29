import { useSelector } from "react-redux";
import PostCard from "./PostCard";

const Post = () => {
	const { posts } = useSelector((state) => state.posts);

	if (!Array.isArray(posts) || posts.length === 0) {
		return <p className="no-posts">No posts found</p>;
	}

	return (
		<div className="posts-container">
			{posts.map((post, index) => (
				<PostCard key={post._id} post={post} index={index} />
			))}
		</div>
	);
};

export default Post;
