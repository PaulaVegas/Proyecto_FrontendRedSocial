import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Header from './components/Header'
import PostDetail from './components/Post/PostDetail'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
	return (
		<div className="App">
			<BrowserRouter>
      			<Header />
				<Routes>
          			<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/post/:id" element={<PostDetail />} />					
				</Routes>      
			</BrowserRouter>
		</div>
	)
}
export default App
