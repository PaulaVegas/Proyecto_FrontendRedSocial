import React, { useState } from "react";
import PostsContainer from "../Post/PostContainer";
import NewPostIcon from "../../assets/logos/newPawst.svg";
import NewPost from "../Post/NewPost";
import "./home.scss";

const Home = () => {
	const [showNewPost, setShowNewPost] = useState(false);

	return (
		<div className="page-layout">
			<div className="home-content-wrapper">
				<div className="home-page">
					<header className="home-header">
						<h1>🐾 Welcome to MeowSpace 🐾</h1>
						<p className="home-subtitle">
							The first social network made by cat lovers for cat lovers! Share
							your favorite moments with your feline friends and connect with
							other cat enthusiasts around the world.
						</p>
					</header>

					<main className="posts-center">
						<PostsContainer
							showNewPost={showNewPost}
							setShowNewPost={setShowNewPost}
						/>
					</main>

					<div
						className="new-post-button-wrapper"
						onClick={() => setShowNewPost((prev) => !prev)}
					>
						<span className="new-post-text">New</span>
						<img src={NewPostIcon} alt="New Post" className="new-post-icon" />
						<span className="new-post-text">Pawst</span>
					</div>

					{showNewPost && (
						<div className="new-post-form-wrapper">
							<NewPost onSuccess={() => setShowNewPost(false)} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Home;
