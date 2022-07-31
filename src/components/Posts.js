import React, { useState } from 'react';

const Posts = ({posts, setPosts, filteredPosts, setFilteredPosts, filter, setFilter}) => {

    const [ author, setAuthor ] = useState("");
    const [ location, setLocation ] = useState("");

     function filterPosts() {
        let newPosts = false;
        if ( author && !location) {
            newPosts = posts.filter( item => item.author.username === author );
              setFilteredPosts(newPosts);
        setFilter(true);
        } else if (!author && location) {
            newPosts = posts.filter( item => item.location === location );
              setFilteredPosts(newPosts);
        setFilter(true);
        } else if (author && location) {
            newPosts = posts.filter( item => item.location === location && item.author.username === author);
              setFilteredPosts(newPosts);
        setFilter(true);
        } else {
            setFilter(false)
        }
        console.log("posts[0].author.username")
        console.log(posts[0].author.username)
      
    }


    return (
        <div className="postsPanelInitial">
            <h1>Posts</h1>
            <form onSubmit = {(event) => {
                    event.preventDefault();
                    filterPosts()
                }
            }>
                <h2> sort by: </h2>
                    <label>Author</label>
                    <input
                        id="author"
                        type="text"
                        placeholder="author"
                        value={author}
                        onChange={(event) => {setAuthor(event.target.value)}} />
                    <label>Location</label>
                    <input 
                        id="location"
                        type="text"
                        placeholder="location"
                        value={location}
                        onChange={(event) => {setLocation(event.target.value)}} />
                <button>Submit</button>
            </form>
                {
                    filter 
                    ? filteredPosts.map( (post,idx) => { return <div className="postsPanel" key = {idx}><h2>{post.title} Price: {post.price}</h2><h3>{post.description}</h3><h4>Location: {post.location} </h4><h5>posted by {post.author.username} </h5></div>}) 
                    : posts.map( (post,idx) => { return <div className="postsPanel" key = {idx}><h2>{post.title} Price: {post.price}</h2><h3>{post.description}</h3><h4>Location: {post.location} </h4><h5>posted by {post.author.username} </h5></div>}) 
                }
        </div>
    )
}

export default Posts