import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';
import User from '../Components/User';

const Navigation = ({setAuth}) => {
    const dropRef = useRef(null);
    const [dropdown, setDropdown] = useState(false);
    const showDropdown = () => setDropdown(!dropdown);
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [credentials, setCredentials] = useState("");
    const [username, setUsername] = useState("");

    const getData = async () => {
        try {
            const response = await fetch("/user", {
                method: "GET",
                headers: { token: localStorage.token }
            });
            
            const data = await response.json();
            setCredentials(data.credentials);

            if (data.player_id > 0) {
                const player = await fetch(`/api/v1/roster/${data.player_id}`);
                const playerData = await player.json();
                setFirst(playerData.data.player.first_name);
                setLast(playerData.data.player.last_name);
            } else {
                setUsername(data.username);
            }
            

        } catch (error) {
            console.error(error.message);
        }
    }

    const logout = (e) => {
        e.preventDefault();

        localStorage.removeItem("token");
        window.location.reload(false);
        // setAuth(false);
    }

    useEffect(() => {
        getData();

    });

    return (
        <nav className="navbar">
            <div className="nav_title">Southside Rebels</div>
            <div ref={dropRef} className="nav_menu" onClick={showDropdown}>
                <div className="nav_user">
                    <User first={first} last={last} auth={credentials} username={username ? username : ""}/>
                </div>
            </div>

            <div className={`nav_dropdown ${dropdown ? "active" : "inactive"}`}>
                <div className="menu_items">
                    <ul className="nav_items">
                        <Link to="/roster" onClick={showDropdown}>
                            <li className="nav_links">
                                Roster
                            </li>
                        </Link>

                        <Link to="/add" onClick={showDropdown}>
                            <li className="nav_links">
                                {credentials === "master" || credentials === "admin" ? "Add Player" : "Add Player 🔐"}
                            </li>
                        </Link>

                        <Link to="/edit" onClick={showDropdown}>
                            <li className="nav_links">
                                {credentials === "master" || credentials === "admin" ? "Edit Player" : "Edit Player 🔐"}
                            </li>
                        </Link>

                        <Link to="/draft" onClick={showDropdown}>
                            <li className="nav_links">
                                Draft
                            </li>
                        </Link>

                        <Link to="/auth/register" onClick={showDropdown}>
                            <li className="nav_links">
                                {credentials === "master" ? "Add User" : "Add User 🔐"}
                            </li>
                        </Link>

                        <li onClick={showDropdown}>
                            <button className="logout_btn" onClick={(e) => logout(e)}>Log Out</button>
                        </li> 
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navigation
