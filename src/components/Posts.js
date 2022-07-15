import React from 'react';

const Posts = ({posts}) => {
    // console.log(posts)
    return (
   <div>
    {
        posts ? posts.map( (post,idx) => { return <div className="postsPanel" key = {idx}><h1>{post.title}</h1><h2>{post.description}</h2></div>} ) : null 
    }
   </div>
    )
}

export default Posts