import React, { useState } from 'react';

const TopBarUser = ({loggedIn, currentUser}) => {

    let checkForToken = localStorage.getItem("token");

    if ( loggedIn === true || checkForToken) {

        return (
            <div className="topBar">
                <div className="currentUserContainer">
                    <p className="currentUser2">{currentUser}</p>
                    <button className="logOutButton">Log Out</button>
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