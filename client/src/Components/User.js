import React, { useState, useEffect } from 'react';
import '../styles/User.css';

const User = ({ first, last, auth, username }) => {
    const [color, setColor] = useState("");
    const [textColor, setTextColor] = useState("");

    const switchColor = () => {
        if (auth === "master") {
            setColor("#0b15a9");
            setTextColor("#7af5c3")
        } else if (auth === "admin") {
            setColor("#483d8b");
        } else if (auth === "media") {
            setColor("#29d9a1");
            setTextColor("#fdf72a");
        } else if (auth === "user") {
            setColor("#6f4569");
            setTextColor("#cbf365");
        } else {
            setColor("#407a8d");
            setTextColor("#3ef1c8");
        }
    }



    useEffect(() => {
        switchColor();
    })

    return (
        <div className="user_container" style={{backgroundColor: `${color}`, color: `${textColor}`}}>
            <h5>Logged In As</h5>
            <h5>{first ? `${first} ${last}` : username}</h5>
        </div>
    )
}

export default User
