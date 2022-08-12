import React, { useState } from "react";

const Profile = ({ loggedIn, setLoggedIn, posts, setPosts, filteredPosts, setFilteredPosts, filter, setFilter, currentUser, setCurrentUser }) => {

    let url = "https://strangers-things.herokuapp.com/api/2206-ftb-et-web-ft-b";

     const [ receivedMessagesToggle, setReceivedMessagesToggle] = useState(false);
    const [ sentMessagesToggle, setSentMessagesToggle] = useState(false);
    const [ receivedMessages, setReceivedMessages] = useState([]);
    const [ sentMessages, setSentMessages] = useState([]);


    const checkUser = localStorage.getItem("token");
    console.log(checkUser)

    const getCurrentUser = async () => {
      try {
        const username = await fetch(`${url}/users/me`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${checkUser}`
          }
        })
        const usernameConverted = await username.json();
        setCurrentUser(usernameConverted.data.username);
        console.log("This is current Username");
        console.log(usernameConverted.data);
        console.log("This is current user")
        console.log(currentUser)

      } catch (error) {
        console.log(error);
      } 
    }

    if (checkUser) {
      console.log(checkUser)
      getCurrentUser();
    }

    async function getSentMessages() {
      try {
        const result = await fetch(`${url}/posts`);
        console.log(result)
        const resultParsed = await result.json();
        console.log(resultParsed.data.posts);
        setPosts(resultParsed.data.posts);
        console.log("result.data.posts.id")
        console.log(resultParsed.data.posts[0]._id);
      } catch (error) {
        console.log(error);
      }
    }

    function getProfile(){
        if ( !checkUser) {
            return (     
                <div className="homeContainer">
                    <Registration 
                        loggedIn = { loggedIn } 
                        setLoggedIn = { setLoggedIn }
                        currentUser = { currentUser } 
                        setCurrentUser = {setCurrentUser}/>
                    <Login 
                        loggedIn = { loggedIn } 
                        setLoggedIn = { setLoggedIn } 
                        currentUser = { currentUser }
                        setCurrentUser = {setCurrentUser}/>
                </div> 
            )
        } else {
          return(
            <div className="sectionBody">
            <div className="postsPanel">
                <div className="sectionHeader">
                    <h1 className="postsTitle">Profile</h1>
                    <div>
                        <button value={"sent"} className="togglePostButton" onClick={async ()=>{
                          setSentMessagesToggle(true);
                          setReceivedMessagesToggle(false);
                             try {
                                const result = await fetch(`${url}/users/me`,{
                                  headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${checkUser}`
                                  }
                                });
                                console.log(result)
                                const resultParsed = await result.json();
                                const sentMessagesFiltered = [];
                                const receivedMessagesFiltered = [];

                                for ( let i = 0; i < resultParsed.data.messages.length; i++) {
                                  if (resultParsed.data.messages[i].fromUser.username === currentUser){
                                    sentMessagesFiltered.push(resultParsed.data.messages[i])
                                    console.log(resultParsed.data.messages[i])
                                  } else {
                                    receivedMessagesFiltered.push(resultParsed.data.messages[i])
                                  }
                                };

                                setSentMessages(sentMessagesFiltered);
                                setReceivedMessages(receivedMessagesFiltered);
                                console.log("sentMessages");
                                console.log(sentMessagesFiltered);
                                console.log("resultParsed.dataworking");
                                console.log(resultParsed.data.messages);
                                    console.log("currentUsername");
                                console.log(currentUser);
                                    console.log("resultParsed.datato check");
                                console.log(resultParsed.data.messages.fromUser);
                                
                              } catch (error) {
                                console.log(error);
                              }
                        }}>See Sent Messages</button>
                        <button value={"recieved"} className="togglePostButton" onClick={()=>{
                          setReceivedMessagesToggle(true);
                          setSentMessagesToggle(false);
                        }}>See Received Messages</button>
                    </div>
                </div>
                {
                  sentMessagesToggle ? sentMessages.map((message, idx) => { 
                    return <div className="postItem" key = {idx}><h1>{message.content}</h1><h2>Post Title: {message.post.title}</h2></div>
                  }) : null
                }
                {
                  receivedMessagesToggle ? receivedMessages.map((message, idx) => { 
                    return <div className="postItem" key = {idx}><h1>{message.content}</h1><h2>Post Title: {message.post.title}</h2></div>
                  }) : null
                }
              </div>
            </div>
          )
         
        }
    }

    
    return (
        getProfile()
    )
}


export default Profile
