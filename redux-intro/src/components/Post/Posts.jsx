import PostCard from "./PostCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../redux/posts/postsSlice";

const Posts = () => {
	const dispatch = useDispatch();
	const { isLoading, posts } = useSelector((state) => state.posts);

	useEffect(() => {
		dispatch(getAll());
	}, [dispatch]);
	const refreshPosts = () => dispatch(getAll());

	if (isLoading) return <p>Loading...</p>;
	if (!posts.length) return <p>No posts found</p>;

	return (
		<div className="post-container">
			{posts.map((post) => (
				<PostCard key={post._id} post={post} refreshPosts={refreshPosts} />
			))}
		</div>
	);
};
export default Posts;
