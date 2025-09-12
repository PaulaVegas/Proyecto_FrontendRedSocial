import { useState, useEffect } from "react";
import snacks from "../assets/images/snacks.jpg";
import sleeping_cat from "../assets/images/sleeping.jpg";
import playing from "../assets/images/playing.jpg";

const adsData = [
	{
		text: "Compra snacks para tu gato",
		image: snacks,
		link: "#",
	},
	{
		text: "Nueva cama para gatos disponible",
		image: sleeping_cat,
		link: "#",
	},
	{
		text: "Juguetes divertidos para tu gato",
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
			<a href={ad.link} target="_blank" rel="noopener noreferrer">
				<img src={ad.image} alt={ad.text} />
				<p>{ad.text}</p>
			</a>
		</div>
	);
};

export default SidebarAds;
