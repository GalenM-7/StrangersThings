import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

import { Header, Messages, Posts, Footer} from "./components";
import "./strangersStyles.css";

const App = () => {
  const [ posts, getPosts ] = useState([])
  let url = "https://strangers-things.herokuapp.com/api/2206-ftb-et-web-ft-b"

  useEffect(() => {
    const setPosts = async () => {
      try {
        const result = await fetch(`${url}/posts`);
        console.log(result)
        const resultParsed = await result.json();
        console.log(resultParsed.data.posts);
        getPosts(resultParsed.data.posts)
      } catch (error) {
        console.log(error)
      }
    }
    setPosts()
  }, [])
  return <div>
            < Header />
            < Posts posts = { posts } />
            < Messages />
            < Footer />
          </div>;
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
