import Post from './Post'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAll, reset } from '../../redux/posts/postsSlice'

const Posts = () => {
	const dispatch = useDispatch()
	const { isLoading } = useSelector((state) => state.posts)

	useEffect(() => {
		const fetchPosts = async () => {
			await dispatch(getAll())
			await dispatch(reset())
		}

		fetchPosts()
	}, [dispatch])

	return <>{isLoading ? 'Cargando...' : <Post />}</>
}

export default Posts