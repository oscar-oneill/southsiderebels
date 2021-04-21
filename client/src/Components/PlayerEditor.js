import React from 'react';
import '../styles/PlayerEditor.css';
import FormEditor from '../Components/FormEditor';

const PlayerEditor = ({ first, last, nickname, jersey, primary, secondary, isActive, health, status, image, firstX, lastX, jerseyX, nicknameX, primaryX, secondaryX, isActiveX, healthX, statusX, imageX, click, fatal }) => {    
    return (
        <div className="player_editor">
            <div className="nametab">
                <img src={image} alt="avatar" />

                <span>
                {primary} {jersey ? "| " + jersey : ""} - {first} {last}
                </span>
            </div>
            <div className="data_box">
                <FormEditor 
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

                    firstX={firstX} 
                    lastX={lastX} 
                    nicknameX={nicknameX} 
                    jerseyX={jerseyX} 
                    primaryX={primaryX}
                    secondaryX={secondaryX} 
                    isActiveX={isActiveX} 
                    healthX={healthX} 
                    statusX={statusX} 
                    imageX={imageX}

                    click={click}
                    fatal={fatal}
                />
            </div>
        </div>
    )
}

export default PlayerEditor
