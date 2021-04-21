import React, { useState } from 'react';
import '../styles/Login.css';

const Login = ({setAuth}) => {
    document.title = "Register User"

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [credentials, setCredentials] = useState("");
    const [playerID, setPlayerID] = useState("");

    const chainFunction = (e) => {
        handleRegistration(e);
        clearForm(e);
    }

    const handleRegistration = async (e) => {
        e.preventDefault();

        const player_id = playerID

        const body = { username, password, credentials, player_id };
        console.log(body)

        try {
            const response = await fetch("/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const data = await response.json();
            console.log(response);
            alert(`${username} has been added with ${credentials} credentials to the database.`);
            // localStorage.setItem("token", data.token);
            // setAuth(true);

        } catch (error) {
            console.error(error.message);
        }
    }

    const clearForm = (e) => {
        setUsername("")
        setPassword("")
        setCredentials("")
        setPlayerID("")
    }

    return (
        <div className="login_container">
            <div className="form">
                <h2>Register</h2>
                {/* <h3>{status}</h3> */}
                <form onSubmit={chainFunction}>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} name="username" type="text" placeholder="username" required/>

                    <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" placeholder="password" required/>

                    <select value={credentials} onChange={e => setCredentials(e.target.value)} name="credentials" required>
                        <option value="user">user</option>
                        <option value="media">media</option>
                        <option value="master">master</option>
                        <option value="admin">admin</option>
                        <option value="visitor">visitor</option>
                    </select>

                    <input value={playerID} onChange={(e) => setPlayerID(e.target.value)} name="player_id" type="text" placeholder="player_id" required/>

                    <button className="submit_button">Register</button>
                </form>
            </div>
        </div>
    )
}

export default Login
