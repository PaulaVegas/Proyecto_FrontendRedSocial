import AppLayout from "./components/layout";
import Home from "./components/Home/Home";
import Login from "./components/Users/Login";
import Register from "./components/Users/Register";
import Profile from "./components/Users/Profile";
import PostDetail from "./components/Post/PostDetail";
import Search from "./components/Search/Search";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<AppLayout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/posts/:id" element={<PostDetail />} />
					<Route path="/posts/title/:title" element={<Search />} />
				</Routes>
			</AppLayout>
		</BrowserRouter>
	);
}
export default App;
