import React, { useState } from 'react';

const Login = ({ loggedIn, currentUser, setLoggedIn, setCurrentUser }) => {

      let url = "https://strangers-things.herokuapp.com/api/2206-ftb-et-web-ft-b";

     const [ password, setPassword ] = useState("");
     const [ username, setUsername ] = useState("");
  
            return (
                    <div className="loginContainer">
                        <h1>Already Registered, login below</h1>
                          <form onSubmit={ async (event) => {
                            event.preventDefault();
                            try {
                                console.log(username);
                                console.log(password);
                                    const user = await fetch(`${url}/users/login`,{
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
                                console.log(user);
                                window.alert("try block successful")
                                const getUserConverted = await user.json();
                                console.log("this is getUserConverted");
                                console.log(getUserConverted);
                                setCurrentUser({username: username, password: password});
                                setLoggedIn(true);
                                setUsername("");
                                setPassword("");
                                const { data } = getUserConverted;
                                console.log("token")
                                localStorage.setItem( "token" , data.token)
                            } catch(error) {
                                console.log(error)
                            }
                          }}>
                            <div>
                                <label> Username </label>
                                <input
                                    className='formLoginInput'
                                    id="username"
                                    type="text"
                                    placeholder="username"
                                    value={username}
                                    onChange={(event) => {setUsername(event.target.value)}} 
                                />
                            </div>
                          
                          <div className="passwordDiv">
                              <label> Password </label>
                                <input 
                                    id="password"
                                    type="text"
                                    placeholder="password"
                                    value={password}
                                    onChange={(event) => {setPassword(event.target.value)}}
                                />
                                <br />
                          </div>
                          <div className="buttonContainer">
                            <button className="homeButtonsR"> Login </button>
                          </div>
                        </form>
                    </div>
            )
}



export default Login