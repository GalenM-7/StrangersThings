import React, { useState } from 'react';

const TopBarUser = ({loggedIn, currentUser}) => {
    if ( loggedIn === true) {

        return (
            <div className="topBar">
                <div className="currentUserContainer">
                    <p className="currentUser">{currentUser}</p>
                    <button>Log Out</button>
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