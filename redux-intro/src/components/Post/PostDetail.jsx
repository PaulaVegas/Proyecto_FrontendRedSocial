import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getById } from '../../redux/posts/postsSlice'

const PostDetail = () => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const { post, isLoading } = useSelector((state) => state.posts)

	useEffect(() => {
		if (id) {
			dispatch(getById(id))
		}
	}, [dispatch, id])

	if (isLoading) return <p>Loading...</p>
	if (!post || !post._id) return <p>Post not found</p>

	return (
		<>
			<h1>{post.title}</h1>
			<p>{post.content}</p>
			{post.image && (
				<img
					height="150"
					src={`http://localhost:3000/${post.image}`}
					alt={post.title}
				/>
			)}
		</>
	)
}

export default PostDetail