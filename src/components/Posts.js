import React, { useState, useEffect } from 'react';
import NewPost from './NewPost';
import UpdatePost from './UpdatePost';

const Posts = ({loggedIn, setLoggedIn, posts, setPosts, filteredPosts, setFilteredPosts, filter, setFilter, currentUser, setCurrentUser}) => {

    let url = "https://strangers-things.herokuapp.com/api/2206-ftb-et-web-ft-b";

      const resetPosts = async () => {
                try {
                    const posts = await fetch(`${url}/posts`);
                    const postsParsed = await posts.json();
                    setPosts(postsParsed.data.posts);
                    console.log("posts //////////////////");
                    console.log(posts)

                } catch (error) {
                    console.log(error)
                }
            }

        const getPosts = async () => {
                try {
                    const posts = await fetch(`${url}/posts`);
                    const postsParsed = await posts.json();
                    return postsParsed.data.posts;
                    console.log("posts //////////////////");
                    console.log(posts)

                } catch (error) {
                    console.log(error)
                }
            }


    useEffect(() => {
        window.alert("activated")
      
        if ( !currentUser ) {
            resetPosts()
        }

    }, [currentUser])      

    const [ author, setAuthor ] = useState("");
    const [ location, setLocation ] = useState("");
    const [ newMessage, setNewMessage ] = useState("")

//Below is toggle state for new/update post, not passed to new/update post component
    const [ newPostToggle, setNewPostToggle ] = useState(false);
    const [ updatePostToggle, setUpdatePostToggle ] = useState(false);
    const [ newMessageToggle, setNewMessageToggle ] = useState(false);

// Below Only two pieces of state local to this component, passed to new post component
    const [ singlePost, setSinglePost] = useState([]);
    const [ useSinglePost, setUseSinglePost ] = useState(false);
    const [ buttonValue, setButtonValue ] = useState("");

    const checkUser = localStorage.getItem("token");

   async function deletePost(postId) {
        const result = await fetch(`${url}/posts/${postId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${checkUser}`
            }
        })
        const resultConverted = await result.json();
        return resultConverted
    }



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
        if ( newMessageToggle === false ) {
            setNewMessageToggle(true);
            setButtonValue(event.target.value)
        } else if (newMessageToggle === true && buttonValue !== event.target.value) {
            setButtonValue(event.target.value)
            setNewPostToggle(false);
        }else {
            setNewMessageToggle(false);
        }
    }


     function filterPosts() {
        let newPosts = false;
        if ( author && !location) {
            newPosts = posts.filter( item => item.author.username === author );
            setPosts(newPosts);
            // setFilter(true);
        } else if (!author && location) {
            newPosts = posts.filter( item => item.location === location );
            setPosts(newPosts);
            // setFilter(true);
        } else if (author && location) {
            newPosts = posts.filter( item => item.location === location && item.author.username === author);
            setFilteredPosts(newPosts);
            // setFilter(true);
        } else {
            resetPosts()
            // setFilter(false)
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
                    {/* <button className="editPostButton">Submit</button> */}
                    </div>
                 
                </form>
                   {
                        updatePostToggle
                        ? <UpdatePost
                            loggedIn = { loggedIn } 
                            setLoggedIn = {setLoggedIn}
                            posts = { posts } 
                            setPosts = { setPosts }
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
                            setCurrentUser = {setCurrentUser}
                            // singlePost = { updateSinglePost }
                            useSinglePost = { useSinglePost }
                            buttonValue = { buttonValue } 
                            />
                        : null
                    }
                    {
                        posts.map( (post,idx) => { if ( currentUser === post.author.username) { return <div className="postItem" key = {idx}>
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
                                    <button value={post._id} className="deletePostButton" onClick={ async (postId) => {

                                        deletePost(event.target.value)

                                        setButtonValue(event.target.value);
                                        console.log("buttonValue");
                                        console.log(buttonValue);
                                        const checkUser = localStorage.getItem("token");
                                        console.log("event.target.value");
                                        console.log(event.target.value);
                                        if ( checkUser) {

                                                const postsFiltered = posts.filter( item => item._id !== buttonValue );
                                                console.log("buttonValue")
                                                console.log(buttonValue)                                                                                    
                                                console.log("postsFiltered")
                                                console.log(postsFiltered)
                                                setPosts(postsFiltered)

                                        }
                                        
                                    }
                                }>Delete This Post</button>
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
                                                        <button value={post._id} className="editPostButton" onClick={ () => {
                                                            
                                                            const checkUser = localStorage.getItem("token");
                                                        
                                                            console.log("checkUser ////////////////////////////////")
                                                            console.log(checkUser)

                                                            if ( checkUser) {
                                                                sendMessageToggle()
                                                            }
                                        
                                                        }}>Send Message to Author</button>                                
                                                    </div>
                                                      { newMessageToggle && post._id === buttonValue ? 
                                                    <div className="sendMessageForm">
                                                        <form onSubmit = { async (event) => {
                                                            event.preventDefault();
                                                            let tokenFromLocal = localStorage.getItem("token");

                                                            try {
                                                                const result = await fetch(`${url}/posts/${post._id}/messages`, {
                                                                method: "POST",
                                                                headers: {
                                                                    'Content-Type': 'application/json',
                                                                    'Authorization': `Bearer ${tokenFromLocal}`
                                                                },
                                                                body: JSON.stringify({
                                                                    message: {
                                                                        content: newMessage 
                                                                    }
                                                                })
                                                            });
                                                            window.alert("your message has been sent");
                                                            setNewMessage("");
                                                            setNewMessageToggle(false);
                                                            console.log("message");
                                                            console.log(result);
                                                            } catch (error) {
                                                                console.log(error)
                                                            }
                                                          

                                                        }}>
                                                            <textarea
                                                                    className="sendMessage"
                                                                    id="message"
                                                                    type="text"
                                                                    placeholder="your message"
                                                                    rows="3"
                                                                    cols="30"
                                                                    value={newMessage}
                                                                    onChange = {(event) => {
                                                                        setNewMessage(event.target.value)
                                                                    }}
                                                                    >
                                                            </textarea>
                                                            <br />
                                                            <button className="sendMessageButton">
                                                                Send Message
                                                            </button>
                                                        </form>
                                                    </div>
                                                    : null}
                                                    
                                            </div> 
                                    }
                                }) 
                    }
                  
            </div>
        </div>
    )
}

export default Posts