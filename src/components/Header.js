import React, { useState } from 'react';

const Header = ({ loggedIn, setLoggedIn, currentUser, setCurrentUser }) => {

    let url = "https://strangers-things.herokuapp.com/api/2206-ftb-et-web-ft-b";

    const [ password, setPassword ] = useState("");
    const [ username, setUsername ] = useState("");

    function getButtons() {
        if ( loggedIn === true) {
            return (
                <section className="headerSection">
                    <div className="backgroundHeader">Stranger's Things </div>
                    <div>
                        <p className="userLabel">{currentUser.username}</p>
                        <button> Logout </button>
                    </div>
                </section>
            )
        } else {
            return (
                <section className="headerSection">
                    <div className="logo">Stranger's Things </div>
                    <div className="formContainer">
                          <form className="formLogin" onSubmit={ async (event) => {
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
                                const getUserConverted = await user.json();
                                console.log("this is getUserConverted");
                                console.log(getUserConverted);
                                setCurrentUser({username: username, password: password});
                                setLoggedIn(true);
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
                          
                          <div>
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
                            <button> Login </button>
                        </form>
                    </div>
                      
            </section>
            )
        }
    }
 
    return (
        <div>
            {getButtons()}
        </div>
        
    )
}



export default Header