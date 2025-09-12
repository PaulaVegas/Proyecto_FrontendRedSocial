import { useEffect, useState } from "react";
import axios from "axios";

const SidebarLeft = () => {
	const [suggestions, setSuggestions] = useState([]);
	const API_URL = import.meta.env.VITE_API_URL;
	useEffect(() => {
		const fetchSuggestions = async () => {
			try {
				const res = await axios.get(`${API_URL}/users/suggestions`, {
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				});
				setSuggestions(res.data);
			} catch (err) {
				console.error(err);
			}
		};
		fetchSuggestions();
	}, []);

	const handleFollow = async (id) => {
		try {
			await axios.post(
				`${API_URL}/users/${id}/follow`,
				{},
				{
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				}
			);
			setSuggestions((prev) => prev.filter((user) => user._id !== id));
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<aside className="sidebar-left">
			<h3>People you may know</h3>
			<ul className="suggestions-list">
				{suggestions.map((user) => (
					<li key={user._id} className="sidebar-user">
						<div className="sidebar-user-info">
							{user.avatar ? (
								<img src={`${API_URL}/${user.avatar}`} alt={user.username} />
							) : (
								<div className="avatar-placeholder" />
							)}
							<span>@{user.username}</span>
						</div>
						<button onClick={() => handleFollow(user._id)}>Seguir</button>
					</li>
				))}
			</ul>
		</aside>
	);
};

export default SidebarLeft;
