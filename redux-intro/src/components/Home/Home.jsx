import React from "react";
import Posts from "../Post/Posts";
import "./home.scss";

const Home = () => {
	return (
		<div className="home-page">
			<header className="home-header">
				<h1>Welcome to MeowSpace 🐾</h1>
				<p className="home-subtitle">
					Discover cute posts and share your own adventures with other cat
					lovers!
				</p>
			</header>

			<section className="home-posts">
				<Posts />
			</section>
		</div>
	);
};

export default Home;
