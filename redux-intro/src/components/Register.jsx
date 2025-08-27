import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register, reset } from '../redux/auth/authSlice'
import { notification } from 'antd'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
	const dispatch = useDispatch()
    const { isSuccess, message, isError } = useSelector((state) => state.auth)

    const [formData, setFormData] = useState({ firstName: '', username: '', email: '', password: '', password2:''})
    const { firstName, username, email, password, password2} = formData
    
    useEffect(() => {
            if (isSuccess) {
                notification.success({
                    message: 'Success',
                    description: message,
                })
                navigate('/login')
            }

            if (isError) {
                notification.error({ message: 'Error', description: message })
            }
            dispatch(reset())
        }, [isSuccess, isError, message])

    const onChange = (e) => {
        const {name, value} = e.target 
        setFormData({ ...formData, [name]: value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (password !== password2) {
			return notification.error({
				message: 'Error',
				description: 'Passwords does not match',
			})
		} else {
			notification.success({
				message: 'Success',
				description: 'User registered!',
			})
			navigate('/login')
		}
		dispatch(register(formData))
	}

    return (
        <form onSubmit={onSubmit}>
            <input type="text" name="firstName" value={firstName} onChange={onChange} payload="first name"/>
            <input type="text" name="username" value={username} onChange={onChange} />
            <input type="email" name="email" value={email} onChange={onChange} />
            <input type="password" name="password" value={password} onChange={onChange} />
            <input type="password" name="password2" value={password2} onChange={onChange} />
            <button type="submit">Register</button>
        </form>
    )
}

export default Register
