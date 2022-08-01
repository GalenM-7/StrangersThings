import React, { useState } from 'react';

const NewPost = ({loggedIn, setLoggedIn, posts, setPosts, filteredPosts, setFilteredPosts, filter, setFilter, currentUser, setCurrentUser}) => {

    let url = "https://strangers-things.herokuapp.com/api/2206-ftb-et-web-ft-b";

    const [ title, setTitle ] = useState("");
    const [ price, setPrice ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ location, setLocation ] = useState("");
    const [ willDeliver, setWillDeliver ] = useState("");


    return (
           <form className="createNewPostForm" onSubmit={async ( event ) => {
                event.preventDefault();
                let tokenFromLocal = localStorage.getItem("token");
                let newPost = {
                                title: title,
                                description: description,
                                price: price,
                                willDeliver: willDeliver
                            }

                    if (location) {
                        newPost.location = location
                    }

                try {
                    const token = await fetch(`${url}/posts`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${tokenFromLocal}`
                        },
                        body: JSON.stringify({
                            post: newPost
                        })
                    });
                    console.log(token)
                    const tokenConverted = await token.json();
                    console.log(tokenConverted);
                    const newPosts = await fetch(`${url}/posts`);
                    const newPostsConverted = await newPosts.json();
                    console.log("newPostsConverted");
                    console.log(newPostsConverted.data);
                    setPosts(newPostsConverted.data.posts);
                    
                } catch (error) {
                    console.log(error)
                }
            }}>
                <div className="createNewPostRows">
                    <label className="createNewPostLabel">Title</label>
                    <input
                        className="createNewPostLabel"
                        id="title"
                        type="text"
                        placeholder="title"
                        value={title}
                        onChange={(event) => {setTitle(event.target.value)}} 
                    />
                </div>

                <div className="createNewPostRows">
                    <label className="createNewPostLabel"> Price </label>
                    <input 
                        id="price"
                        type="text"
                        placeholder="price"
                        value={price}
                        onChange={(event) => {setPrice(event.target.value)}}
                    />
                </div>
    
                <div className="createNewPostRows">
                    <label className="createNewPostLabel">Description: </label>
                    <textarea 
                        className="formLoginInput"
                        id="description"
                        type="text"
                        placeholder="description"
                        rows="5"
                        cols="30"
                        value={description}
                        onChange={(event) => {setDescription(event.target.value)}} 
                    />
                </div>

                   <div className="createNewPostRows">
                    <label className="createNewPostLabel">Location: </label>
                    <input
                        className="formLoginInput"
                        id="location"
                        type="text"
                        placeholder="location"
                        value={location}
                        onChange={(event) => {setLocation(event.target.value)}} 
                    />
                </div>

                <div className="createNewPostRows">
                    <label className="createNewPostLabel">Will Deliver: </label>
                    <label className="createNewPostLabelTF">True</label>
                    <input
                        className="formLoginInput"
                        id="willDeliver"
                        type="radio"
                        name="willDeliver"
                        placeholder="Will Deliver"
                        value={true}
                        onChange={(event) => {setWillDeliver(event.target.value)}} 
                    />
                    <label className="createNewPostLabelTF">False</label>
                    <input
                        className="formLoginInput"
                        id="willDeliver"
                        type="radio"
                        name="willDeliver"
                        placeholder="Will Deliver"
                        value={false}
                        onChange={(event) => {setWillDeliver(event.target.value)}} 
                    />
                </div>
                    <div className="buttonContainer">
                        <button className="createPostButton"> Submit </button>
                    </div>
            </form>
    )
}

export default NewPost