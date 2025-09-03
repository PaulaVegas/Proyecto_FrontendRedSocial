import PostCard from "./PostCard";

const Posts = ({ posts, refreshPosts, isLoading }) => {
	if (isLoading) return <p>Loading...</p>;
	if (!posts || posts.length === 0) return <p>No posts found</p>;
	const sortedPosts = posts
		.slice()
		.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

	return (
		<div className="post-container">
			{sortedPosts.map((post) => (
				<PostCard key={post._id} post={post} refreshPosts={refreshPosts} />
			))}
		</div>
	);
};

export default Posts;
