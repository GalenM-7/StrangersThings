import React, { useState, useEffect } from 'react';

const TopBarUser = ({setLoggedIn, loggedIn, currentUser, setCurrentUser, setPosts}) => {

let url = "https://strangers-things.herokuapp.com/api/2206-ftb-et-web-ft-b";



    let checkForToken = localStorage.getItem("token");

    if ( loggedIn === true || checkForToken) {

        return (
            <div className="topBar">
                <div className="currentUserContainer">
                    <p className="currentUser2">{currentUser}</p>
                    <button className="logOutButton" onClick = { () => {
                        const check = localStorage.getItem("token");
                        if (check) {
                            localStorage.removeItem("token");
                            setCurrentUser("")
                        }
                    }}>Log Out</button>
                </div>
            </div>
        )
    } else {
         return (
            <div className="topBar">
                 <div className="currentUserContainer">
                    <p className="currentUser">Not Logged In</p>
                </div>
            </div>
        )
    }
}

export default TopBarUser