import React, { useEffect, useState } from 'react';

const UpdatePost = ({loggedIn, setLoggedIn, posts, setPosts, filteredPosts, setFilteredPosts, filter, setFilter, currentUser, setCurrentUser, singleUser, useSingleUser, buttonValue}) => {

    let url = "https://strangers-things.herokuapp.com/api/2206-ftb-et-web-ft-b";

    const [ title, setTitle ] = useState("");
    const [ price, setPrice ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ location, setLocation ] = useState("");
    const [ willDeliver, setWillDeliver ] = useState("");

    useEffect(() => {
               const updateSetValues = () => {
            // try {
                // const result = await fetch(`${url}/posts`);
                // console.log(result)
                // const resultParsed = await result.json();
                // const singlePost = resultParsed.filter( item => item._id === buttonValue);
                const getInitialPost = posts.filter( item => item._id === buttonValue );
                setTitle(getInitialPost[0].title);
                setPrice(getInitialPost[0].price);
                setDescription(getInitialPost[0].description);
                setLocation(getInitialPost[0].location);
                setWillDeliver(getInitialPost[0].willDeliver)
            // } catch (error) {
            //     console.log(error);
            // }
    }
// change file
    updateSetValues()

    }, [buttonValue])

 
   

    return (
           <form className="createNewPostForm" onSubmit={ async ( event ) => {
                event.preventDefault();
                let tokenFromLocal = localStorage.getItem("token");
                let post = {
                                title: title,
                                description: description,
                                price: price,
                                willDeliver: willDeliver
                            }
                            
                                if (location) {
                                    post.location = location
                                }

                                try {
                                    await fetch(`${url}/posts/${buttonValue}`, {
                                        method: "PATCH",
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${tokenFromLocal}`
                                        },
                                        body: JSON.stringify({
                                            post: post
                                        })
                                    });
                                 
                                    const fetchAgain = await fetch(`${url}/posts`);
                                    const fetchAgainConverted = await fetchAgain.json();
                                    console.log("fetchAgainConverted");
                                    console.log(fetchAgainConverted);
                                    setPosts(fetchAgainConverted.data.posts);

                                } catch ( error ) {
                                    console.log(error)
                                }
            }}>
                <h1>Update Post</h1>

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

export default UpdatePost