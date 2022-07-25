import React from "react";

const Registration = ({ loggedIn, getLoggedIn, currentUser }) => {

     let url = "https://strangers-things.herokuapp.com/api/2206-ftb-et-web-ft-b";

     const [ password, setPassword ] = useState("");
     const [ username, setUsername ] = useState("");
    
    return (
        <div className="registrationPanel">
            <h1>Register Here </h1>
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
                <label> Username </label>
                <input
                    className="loginInput"
                    id="username"
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(event) => {setUsername(event.target.value)}} 
                />
                <br />
                <label> Password </label>
                <br />
                <input 
                    id="password"
                    type="text"
                    placeholder="password"
                    value={password}
                    onChange={(event) => {setPassword(event.target.value)}}
                />
                <br />
                <button> Submit </button>
            </form>
        </div>
        
    )
}

const Messages = ({ loggedIn, getLoggedIn, currentUser }) => {


    
    return (
        <p>These are Messages</p>
    )
}



export default Messages