import Post from "./Post";
import PostCard from "./PostCard";
import NewPost from "./NewPost";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll, reset } from "../../redux/posts/postsSlice";

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
		<div>
			<NewPost />
			{posts.map((post) => (
				<PostCard key={post._id} post={post} refreshPosts={refreshPosts} />
			))}
		</div>
	);
};
export default Posts;
