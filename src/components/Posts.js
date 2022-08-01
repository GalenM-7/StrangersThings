import React, { useState } from 'react';
import NewPost from './NewPost';

const Posts = ({loggedIn, setLoggedIn, posts, setPosts, filteredPosts, setFilteredPosts, filter, setFilter, currentUser, setCurrentUser}) => {

    const [ author, setAuthor ] = useState("");
    const [ location, setLocation ] = useState("");
    const [ newPostToggle, setNewPostToggle ] = useState(false);

    function togglePosts() {

        
        if (newPostToggle === false) {
            setNewPostToggle(true)
        } else {
            setNewPostToggle(false)
        }

        // if ( loggedIn === true && newPostToggle === false) {
        //     setNewPostToggle(true)
        // }

        // if ( loggedIn === true && newPostToggle === true) {
        //     setNewPostToggle(false)
        // }
    }

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
        <div className="sectionBody">
            <div className="postsPanel">
                <div className="sectionHeader">
                    <h1 className="postsTitle">Posts</h1>
                    <div>
                        <button className="togglePostButton" onClick={togglePosts}>Toggle Create Post</button>
                    </div>
                </div>
                
                <form onSubmit = {(event) => {
                        event.preventDefault();
                        filterPosts()
                    }
                }>
                    <div className="sortContainer">
                        <label className="sortByLabel">Sort By:</label>
                        <label className="sortByLabel">Author</label>
                        <input
                            className="sortByInput"
                            id="author"
                            type="text"
                            placeholder="author"
                            value={author}
                            onChange={(event) => {setAuthor(event.target.value)}} />
                        <label className="sortByLabel">Location</label>
                        <input 
                            className="sortByInput"
                            id="location"
                            type="text"
                            placeholder="location"
                            value={location}
                            onChange={(event) => {setLocation(event.target.value)}} />
                    <button className="editPostButton">Submit</button>
                    </div>
                 
                </form>
                    {
                        newPostToggle
                        ? <NewPost
                            loggedIn = { loggedIn } 
                            setLoggedIn = {setLoggedIn}
                            posts = { posts } 
                            setPosts = { setPosts }
                            filteredPosts = { filteredPosts }
                            setFilteredPosts = { setFilteredPosts }
                            filter = { filter }
                            setFilter = { setFilter }
                            setCurrentUser = {setCurrentUser}/>
                        : null
                    }
                    {
                        filter 
                        ? filteredPosts.map( (post,idx) => { return <div className="postItem" key = {idx}>
                            <h2>{post.title} Price: {post.price}</h2><h3>{post.description}</h3>
                                <div className="postDetails"> 
                                <h4>Location: {post.location}
                                </h4><h4>posted by {post.author.username} </h4> 
                                    <button value={post._id} className="editPostButton" onClick={ async (event) => {

                                        const checkUser = localStorage.getItem("token");

                                        if ( checkUser) {
                                            try {

                                                await fetch(`${url}/posts/${event.target.value}`, {
                                                    method: "POST",
                                                    headers: {
                                                    'Content-Type': 'application/json',
                                                    'Authorization': `Bearer ${checkUser}`
                                                    },
                                                    body: JSON.stringify({
                                                    })
                                                });

                                            } catch (error) {
                                                console.log(error)
                                            }
                                        }
                                    
                                    }}>Edit A Post</button>
                                </div>
                            </div>}) 
                        : posts.map( (post,idx) => { return <div className="postItem" key = {idx}>
                            <h2>{post.title} | <span> Price: {post.price} </span></h2><h3>{post.description} </h3>
                                <div className="postDetails"> 
                                    <h4>Location: {post.location} </h4>
                                    <h4>posted by {post.author.username} </h4>                                    
                                    <button value={post._id} className="editPostButton" onClick={()=>{
                                        window.alert("trig")
                                        console.log("event.target.value");
                                        console.log(event.target.value);
                                    }}>Edit This Post</button>
                                </div>
                                </div>}) 
                    }
                  
            </div>
        </div>
    )
}

export default Posts