import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPostByTitle } from '../../redux/posts/postsSlice'

const Search = () => {
    const dispatch = useDispatch()
    const { postTitle } = useParams()
    const { posts, isLoading } = useSelector((state) => state.posts)

    useEffect(() => {
        if (postTitle) {
        dispatch(getPostByTitle(postTitle))
        }
    }, [dispatch, postTitle])

    if (isLoading) return <p>Loading...</p>
    if (!posts || posts.length === 0) return <p>No posts found</p>

return (
    <>
        {posts.map((post) => (
            <div key={post._id} className='post'>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                {post.image && (
                            <img
                            src={`http://localhost:3000/${post.image}`}
                            width='350px'
                            alt={post.title}
                            />
                        )}
            </div>
        ))}
    </>
)

}



export default Search