import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

import { Footer, Login, Messages, Posts,  Profile, Registration, Homepage, TopBarUser } from "./components";
import "./strangersStyles.css";

const App = () => {
  const [ posts, setPosts ] = useState([]);
  const [ filteredPosts, setFilteredPosts ] = useState([]);
  const [ filter, setFilter ] = useState(false)
  const [ messages, setMessages ] =  useState([]);
  const [ users, setUsers ] = useState([]);
  const [ currentUser, setCurrentUser ] = useState("");
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ isLoading, setIsLoading ] =  useState(false);

  let url = "https://strangers-things.herokuapp.com/api/2206-ftb-et-web-ft-b"

  useEffect(() => {
    const getPosts = async () => {
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
    getPosts()
  }, [])



useEffect(() => {
    const checkUser = localStorage.getItem("token");

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
        console.log(usernameConverted.data.username);
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
})
  return <div>
                       
            <section className="mainSection">
           
              <BrowserRouter>
                <section className="headerSection">
                  <div className="logo">Stranger's Things </div>
                  <div className="linksContainer">
                    <div className="linksInnerContainer">
                      <Link to="/" className="link">Login/Registration</Link>
                      <Link to="/posts" className="link">Posts</Link>
                      <Link to="/profile" className="link">Profile</Link>
                    </div>
                  </div>
               
                </section>
               <TopBarUser loggedIn = { loggedIn } setLoggedIn = { setLoggedIn } currentUser = { currentUser } setCurrentUser = {setCurrentUser}/>

                <Routes>
                 <Route path="/" element={<Homepage loggedIn = { loggedIn } setLoggedIn = { setLoggedIn } currentUser = { currentUser.username } setCurrentUser = {setCurrentUser}/>} />
                  <Route path="/posts" element={< Posts
                      loggedIn = { loggedIn } 
                      setLoggedIn = {setLoggedIn}
                      posts = { posts } 
                      setPosts = { setPosts }
                      currentUser = { currentUser }
                      setCurrentUser = {setCurrentUser}/>} />
                   <Route path="/profile" element={
                    <Profile 
                      loggedIn = { loggedIn } 
                      setLoggedIn = {setLoggedIn}
                      posts = { posts } 
                      setPosts = { setPosts }
                      currentUser = { currentUser }
                      setCurrentUser = {setCurrentUser}/>} />
                </Routes>
              </BrowserRouter>
            </section>

          </div>;
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
