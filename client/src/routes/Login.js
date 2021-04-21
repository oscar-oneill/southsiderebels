import React, { useState, useEffect } from 'react';
import '../styles/Login.css';

const Login = ({setAuth}) => {
    document.title = "Login"
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState(null);
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const body = { username, password };

        try {
            const response = await fetch("/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            setCode(response.status);
            const data = await response.json();
            localStorage.setItem("token", data.token);
            setAuth(true);

        } catch (err) {
            console.error("Error: ", err.message);
        }
    }

    useEffect(() => {
        if (code === 401) {
            setMessage("Wrong Username or Password");
        }

    }, [code])

    return (
        <div className="login_container">
            <div className="form">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} name="username" type="text" placeholder="username" required/>

                    <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" placeholder="password" required/>

                    <button className="submit_button">Login</button>
                </form>
                <div className="login_message">{message}</div>
            </div>
        </div>
    )
}

export default Login
