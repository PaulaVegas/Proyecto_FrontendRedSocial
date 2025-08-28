import Post from './Post'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAll, reset } from '../../redux/posts/postsSlice'

const Posts = () => {
	const dispatch = useDispatch()
	const { isLoading, posts } = useSelector((state) => state.posts)

	useEffect(() => {
		dispatch(getAll())
	}, [dispatch])

	return <>{isLoading ? 'Loading...' : <Post />}</>
}

export default Posts