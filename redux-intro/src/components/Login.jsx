import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, reset } from '../redux/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { notification } from 'antd'

const Login = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [formData, setFormData] = useState({ email: '', password: '' })
	const { isError, isSuccess, message } = useSelector((state) => state.auth)
	const { email, password } = formData

	useEffect(() => {
		if (isError) {
			notification.error({ message: 'Error', description: message })
		}
		if (isSuccess) {
			notification.success({ message: 'Success', description: message })
			setTimeout(() => {
				navigate('/profile')
			}, 2000)
		}
		dispatch(reset())
	}, [isError, isSuccess, message])

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}))
	}
	const onSubmit = (e) => {
		e.preventDefault()
		dispatch(login(formData))
		console.log('formData', formData)
		navigate('/')
	}
	return (
		<form onSubmit={onSubmit}>
			<input type="email" name="email" value={email} onChange={onChange} />
			<input
				type="password"
				name="password"
				value={password}
				onChange={onChange}
			/>
			<button type="submit">Login</button>
		</form>
	)
}
export default Login