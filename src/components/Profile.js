import React, { useState } from "react";

const Profile = ({ loggedIn, getLoggedIn, currentUser, setCurrentUser }) => {

    let url = "https://strangers-things.herokuapp.com/api/2206-ftb-et-web-ft-b";

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
            
        }
    }

    
    return (
        getProfile()
    )
}


export default Profile
