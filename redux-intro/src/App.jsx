import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Header from './components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
	return (
		<div className="App">
			<BrowserRouter>
      <Header />
				<Routes>
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
					<Route path="/profile" element={<Profile />} />
				</Routes>
        
			</BrowserRouter>
		</div>
	)
}
export default App
