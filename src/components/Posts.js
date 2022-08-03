import React, { useState } from 'react';
import NewPost from './NewPost';
import UpdatePost from './UpdatePost';

const Posts = ({loggedIn, setLoggedIn, posts, setPosts, filteredPosts, setFilteredPosts, filter, setFilter, currentUser, setCurrentUser}) => {

    const [ author, setAuthor ] = useState("");
    const [ location, setLocation ] = useState("");

//Below is toggle state for new/update post, not passed to new/update post component
    const [ newPostToggle, setNewPostToggle ] = useState(false);
    const [ updatePostToggle, setUpdatePostToggle ] = useState(false);
    const [ newMessage, newMessageToggle ] = useState(false);

// Below Only two pieces of state local to this component, passed to new post component
    const [ singlePost, setSinglePost] = useState([]);
    const [ useSinglePost, setUseSinglePost ] = useState(false);
    const [ buttonValue, setButtonValue ] = useState("");


    function toggleNewPost() {
        if (newPostToggle === false) {
            setNewPostToggle(true);
            setUpdatePostToggle(false);
            // setUpdatePostToggle(false);
            // setUseSinglePost(false);
        } else {
            setNewPostToggle(false);
            setUpdatePostToggle(false);        }
    }

    function toggleUpdatePost() {

        if (updatePostToggle === false) {
            setUpdatePostToggle(true);
            setNewPostToggle(false);
            setButtonValue(event.target.value)
        } else if (updatePostToggle === true && buttonValue !== event.target.value) {
            setButtonValue(event.target.value)
            setNewPostToggle(false);
        } else {
            setNewPostToggle(false);
            setUpdatePostToggle(false);
        }

    }

    function sendMessageToggle() {
        if ( newMessage === false ) {
            newMessageToggle(true);
            setButtonValue(event.target.value)
        } else {
            newMessageToggle(false);
        }
    }

    //     function togglePostsUpdate() {

    //         if (updatePostToggle === false) {
    //             const checkUser = localStorage.getItem("token");
    //             const filterSinglePost = posts.filter( item => item._id === checkUser);
    //             if (filterSinglePost.length > 0) {
    //                 setUpdateSinglePost(filterSinglePost)
    //             }
    //             setUpdatePostToggle(true);
    //             setNewPostToggle(false);
    //             setUseSinglePost(true);
    //         } else {
    //             setUpdatePostToggle(false)
    //         }

    // }

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
                        <button value={"create"} className="togglePostButton" onClick={toggleNewPost}>Toggle Create Post</button>
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
                        updatePostToggle
                        ? <UpdatePost
                            loggedIn = { loggedIn } 
                            setLoggedIn = {setLoggedIn}
                            posts = { posts } 
                            setPosts = { setPosts }
                            filteredPosts = { filteredPosts }
                            setFilteredPosts = { setFilteredPosts }
                            filter = { filter }
                            setFilter = { setFilter }
                            setCurrentUser = {setCurrentUser}
                            // singlePost = { updateSinglePost }
                            useSinglePost = { useSinglePost }
                            buttonValue = { buttonValue } 
                            />
                        : null
                    }
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
                            setCurrentUser = {setCurrentUser}
                            // singlePost = { updateSinglePost }
                            useSinglePost = { useSinglePost }
                            buttonValue = { buttonValue } 
                            />
                        : null
                    }
                    {
                        filter 
                        ? filteredPosts.map( (post,idx) => { return <div className="postItem" key = {idx}>
                            <h2>{post.title} Price: {post.price}</h2><h3>{post.description}</h3>
                                <div className="postDetails"> 
                                <h4>Location: {post.location}
                                </h4><h4>posted by {post.author.username} </h4> 
                                    <button value={post._id} className="editPostButton" onClick={ async () => {

                                        const checkUser = localStorage.getItem("token");

                                        if ( checkUser) {

                                            toggleUpdatePost()
                                        }
                                    
                                    }}>Edit A Post</button>
                                </div>
                            </div>}) 
                        : posts.map( (post,idx) => { if ( currentUser === post.author.username) { return <div className="postItem" key = {idx}>
                            <h2>{post.title} | <span> Price: {post.price} </span></h2><h3>{post.description} </h3>
                                <div className="postDetails"> 
                                    <h4>Location: {post.location} </h4>
                                    <h4>posted by {post.author.username} </h4>  
                                    { post.willDeliver ? <h4>Will Deliver</h4> : <h4>Will Not Deliver</h4>} 
                                </div> 
                                <div className="postButtons">
                                         <button value={post._id} className="editPostButton" onClick={()=>{
                                        
                                        const checkUser = localStorage.getItem("token");

                                        if ( checkUser) {
                                            toggleUpdatePost()
                                        }
                                        
                                    }}>Edit This Post</button>
                                    <button value={post._id} className="deletePostButton" onClick={()=>{
                                        
                                        const checkUser = localStorage.getItem("token");

                                        if ( checkUser) {
                                            toggleUpdatePost()
                                        }
                                        
                                    }}>Delete This Post</button>
                                    </div>                                                                
                                   
                                </div>
                                } else {
                                    return <div className="postItem" key = {idx}>
                                                <h2>{post.title} | <span> Price: {post.price} </span></h2><h3>{post.description} </h3>
                                                    <div className="postDetails"> 
                                                        <h4>Location: {post.location} </h4>
                                                        <h4>posted by {post.author.username} </h4>
                                                        { post.willDeliver ? <h4>Will Deliver</h4> : <h4>Will Not Deliver</h4>}                                    
                                                    </div>
                                                    <div className="postButtons">
                                                            <button value={post._id} className="editPostButton" onClick={()=>{
                                                            
                                                            const checkUser = localStorage.getItem("token");

                                                            if ( checkUser) {
                                                                sendMessageToggle()
                                                            }
                                        
                                                        }}>Send Message to Author</button>
                                                    { newMessage && post._id === buttonValue ? <h4>Send Message</h4> : null}                                
                                                    </div>
                                            </div> 
                                    }
                                }) 
                    }
                  
            </div>
        </div>
    )
}

export default Posts