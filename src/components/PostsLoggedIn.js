import React from 'react';

const PostsLoggedIn = ({posts, loggedIn}) => {

    function getLayoutPosts () {
        if ( loggedIn === false ) {
            return (
                <div className="postsPanelInitial">
                    <h1>Posts</h1>
                        {
                            posts ? posts.map( (post,idx) => { return <div className="postsPanel" key = {idx}><h2>{post.title}</h2><h3>{post.description}</h3><h4>{post.price}</h4><h5>posted by {post.author.username}</h5></div>} ) : null 
                        }
                </div>
            )
        } else {
            return (
                <div className="postsPanelInitial">
                    <h1>Posts</h1>
                        {
                            posts ? posts.map( (post,idx) => { return <div className="postsPanel" key = {idx}><h2>{post.title}</h2><h3>{post.description}</h3><h4>{post.price}</h4><h5>posted by {post.author.username}</h5></div>} ) : null 
                        }
                </div>
            )
        }
    }    
        
    // console.log(posts)
    return (
        getLayoutPosts()
    )
}

export default PostsLoggedIn