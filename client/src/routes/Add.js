import React, { useContext, useState } from 'react';
import '../styles/Add.css';
import Form from '../Components/Form';
import { RosterContext } from '../context/RosterContext';
import successIcon from '../images/success_icon.png';

const Add = () => {
    document.title = "Add Player"

    const { addPlayers } = useContext(RosterContext);
    const default_avatar = 'https://firebasestorage.googleapis.com/v0/b/southside-football-data.appspot.com/o/player-avatars%2Fdefault%2Fplaceholder.png?alt=media&token=5cbeca7f-2da7-4aa3-b590-df2563c4f469';
    const prompt = document.querySelector('.success');

    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [nickname, setNickname] = useState("");
    const [jersey, setJersey] = useState("");
    const [primary, setPrimary] = useState("Primary Position");
    const [secondary, setSecondary] = useState("Secondary Position");
    const [isActive, setActive] = useState("Active");
    const [health, setHealth] = useState("");
    const [status, setStatus] = useState("Status");
    const [image, setImage] = useState("");
    const [message, setMessage] = useState("");

    const chainFunction = (e) => {
        handleSubmit(e);
        clearForm(e);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        prompt.innerHTML = '';

        const body = { 
            first_name: first, 
            last_name: last, 
            nickname: nickname,
            jersey_number: jersey, 
            primary_position: primary, 
            secondary_position: secondary, 
            is_active: isActive, 
            health_condition: health,
            gameday_status: status, 
            image_url: image
        }

        try {
            const response = await fetch("/api/v1/roster", {
                method: "POST", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            addPlayers(data.data.player);

            const addedPlayer = () => {
                if (response.status !== 201) {
                    const fail = {
                        status: response.statusText,
                    }

                    setMessage(fail.status);

                } else {
                    const pass = {
                        status: `
                            <div class="player_card">
                                <div class="player_card_data">
                                    <div class="card_left">
                                        <img id="success" src="${successIcon}" alt="success icon"/>
                                        <img src="${image === "null" ? default_avatar : image}" alt="avatar"/>
                                    </div>

                                    <div class="card_right">
                                        <div class="name_box">
                                            ${primary} ${jersey ? "| " + jersey : ""} - ${first} ${last}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                    }

                    prompt.innerHTML += addElement(pass)

                    function addElement(pass) {
                        return pass.status
                    }
                }
            }

            addedPlayer()

        }
        catch (err) {
            console.log(err);
        }
    }

    const clearForm = (e) => {
        setFirst("")
        setLast("")
        setNickname("")
        setJersey("")
        setPrimary("Primary Position")
        setSecondary("Secondary Position")
        setActive("Active")
        setHealth("")
        setStatus("Status")
        setImage("")
        setMessage("")
    }

    return (
        <div className="add_container">
            <div className="addForm_container">
                <div className="add_header">Add Player</div>
                <div className="success">{message}</div>
                
                <Form
                    first={first} 
                    last={last} 
                    nickname={nickname} 
                    jersey={jersey} 
                    primary={primary} 
                    secondary={secondary} 
                    isActive={isActive} 
                    health={health} 
                    status={status} 
                    image={image} 

                    firstX={e => setFirst(e.target.value)} 
                    lastX={e => setLast(e.target.value)} 
                    nicknameX={e => setNickname(e.target.value)} 
                    jerseyX={e => setJersey(e.target.value)} 
                    primaryX={e => setPrimary(e.target.value)} 
                    secondaryX={e => setSecondary(e.target.value)} 
                    isActiveX={e => setActive(e.target.value)} 
                    healthX={e => setHealth(e.target.value)} 
                    statusX={e => setStatus(e.target.value)} 
                    imageX={e => setImage(e.target.value)}

                    click={chainFunction}
                />
                
            </div>
        </div>
    )
}

export default Add