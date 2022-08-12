import React, { useState } from 'react';

const Registration = ({ loggedIn, getLoggedIn, currentUser }) => {

     let url = "https://strangers-things.herokuapp.com/api/2206-ftb-et-web-ft-b";

     const [ password, setPassword ] = useState("");
     const [ username, setUsername ] = useState("");
    
    return (
        <div className="registrationContainer">
            <h1>Register Here to add posts and send messages </h1>
            <form onSubmit={async ( event ) => {
                
                event.preventDefault();
                try {
                    const token = await fetch(`${url}/users/register`, {
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
                    });
                    console.log(token)
                    const tokenConverted = await token.json();
                    console.log(tokenConverted);
                    window.alert(tokenConverted.data.message);
                } catch (error) {
                    console.log(error)
                }
            }}>
                <div>
                    <label>Username </label>
                    <input
                        className="formLoginInput"
                        id="username"
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(event) => {setUsername(event.target.value)}} 
                    />
                </div>

                <div className='passwordDiv'>
                    <label> Password </label>
                    <input 
                        id="password"
                        type="text"
                        placeholder="password"
                        value={password}
                        onChange={(event) => {setPassword(event.target.value)}}
                    />
                </div>
               
                <br />
                <div className="buttonContainer">
                    <button className="homeButtonsL"> Submit </button>
                </div>
            </form>
        </div>
        
    )
}

export default Registration