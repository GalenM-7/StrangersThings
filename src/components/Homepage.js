import React, { useState } from "react";
import Registration from "./Registration";
import Login from "./Login";

const Homepage = ({ loggedIn, getLoggedIn, currentUser, setLoggedIn, setCurrentUser }) => {

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
}

export default Homepage