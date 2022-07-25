import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

import { Header, Messages, Posts, Footer, Registration } from "./components";
import "./strangersStyles.css";

const App = () => {
  const [ posts, setPosts ] = useState([]);
  const [ filteredPosts, setFilteredPosts ] = useState([]);
  const [ filter, setFilter ] = useState(false)
  const [ messages, setMessages ] =  useState([]);
  const [ users, setUsers ] = useState([]);
  const [ currentUser, setCurrentUser ] = useState({});
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
        setPosts(resultParsed.data.posts)
      } catch (error) {
        console.log(error)
      }
    }
    getPosts()
  }, [])
  return <div>
            < Header loggedIn = { loggedIn } setLoggedIn = { setLoggedIn } currentUser = { currentUser } setCurrentUser = {setCurrentUser}/>
            <section className="mainSection">
              < Posts 
                  posts = { posts } 
                  loggedIn = { loggedIn } 
                  setPosts = { setPosts }
                  setFilteredPosts = { setFilteredPosts }
                  filteredPosts = { filteredPosts }
                  filter = { filter }
                  setFilter = { setFilter }/>
              {
                loggedIn ? null : 
                < Registration 
                  loggedIn = { loggedIn } 
                  setLoggedIn = { setLoggedIn } 
                  currentUser = { currentUser } 
                  setCurrentUser = {setCurrentUser}
                  />
              }
              {
                loggedIn ?   
                < Messages 
                  loggedIn = { loggedIn } 
                  setLoggedIn = { setLoggedIn } 
                  currentUser = { currentUser } 
                  setCurrentUser = {setCurrentUser}
                  /> 
                  : null 
              
              }
          
            </section>
           
            < Footer />
          </div>;
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
