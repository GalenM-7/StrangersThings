import React from 'react';

const HeaderButtons = ({ loggedIn, getLoggedIn, currentUser }) => {

     let url = "https://strangers-things.herokuapp.com/api/2206-ftb-et-web-ft-b"

    async function register(username, password) {
        fetch(`${url}/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password
                }
            })
        }
        )
    }
    
    function getButtons() {
        if ( loggedIn === true) {
            return (
                <div>
                    {currentUser.username} 
                    <button> Logout </button>
                </div>
            )
        } else {
            return (
                <div>
                    <button> Login </button>
                </div>
            )
        }
    }
 
    return (
        <div>
            {getButtons()}
        </div>
        
    )
}

const Header = ({ loggedIn, getLoggedIn }) => {

     
    return (
        <div className="backgroundHeader">Stranger's Things </div>
    )
}

export default Header