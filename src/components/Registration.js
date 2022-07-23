import React, { useState } from 'react';

const Registration = ({ loggedIn, getLoggedIn, currentUser }) => {

     let url = "https://strangers-things.herokuapp.com/api/2206-ftb-et-web-ft-b";

     const [ password, setPassword ] = useState("");
     const [ username, setUsername ] = useState("")

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
    
    return (
        <div>
            <h1>Register Here</h1>
            <form>
                <label> Username </label>
                <input
                    id="username"
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(event) => {setUsername(event.target.value)}} 
                />

                <label> Password </label>
                <input 
                    id="password"
                    type="text"
                    placeholder="password"
                    value={password}
                    onChange={(event) => {setPassword(event.target.value)}}
                />

                <button> Submit </button>
            </form>
        </div>
        
    )
}

export default Registration