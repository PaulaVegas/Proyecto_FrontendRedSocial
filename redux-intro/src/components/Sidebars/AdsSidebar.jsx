import { useState, useEffect } from "react";
import snacks from "../../assets/images/snacks.jpg";
import sleeping_cat from "../../assets/images/sleeping.jpg";
import playing from "../../assets/images/playing.jpg";

const adsData = [
	{
		text: "Buy snacks for your cat!",
		image: snacks,
		link: "#",
	},
	{
		text: "New sleeping spots for your cat!",
		image: sleeping_cat,
		link: "#",
	},
	{
		text: "Buy fun toys for your cat!",
		image: playing,
		link: "#",
	},
];

const SidebarAds = ({ interval = 10000 }) => {
	const [currentAd, setCurrentAd] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentAd((prev) => (prev + 1) % adsData.length);
		}, interval);

		return () => clearInterval(timer);
	}, [interval]);

	const ad = adsData[currentAd];

	return (
		<div className="sidebar-ads">
			<h3>Advertisement</h3>
			<a href={ad.link} target="_blank" rel="noopener noreferrer">
				<p>{ad.text}</p>
				<img src={ad.image} alt={ad.text} />
			</a>
		</div>
	);
};

export default SidebarAds;
