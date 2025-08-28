import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getById } from '../../redux/posts/postsSlice'

const PostDetail = () => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const { post } = useSelector((state) => state.posts)

	useEffect(() => {
		dispatch(getById(id))
	}, [])

	return (
		<>
			<h1>{post.title}</h1>
			<p>{post.content}</p>
			<img height="150" src={`http://localhost:3000/${post.post_img}`} alt="" />
		</>
	)
}

export default PostDetail