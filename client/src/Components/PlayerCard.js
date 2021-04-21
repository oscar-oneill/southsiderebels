import React from 'react';
import '../styles/PlayerCard.css';

function PlayerCard({ first, last, jersey, primary, image }) {
    return (
        <div className="player_card">
            <div className="player_info">
                <div className="card_left">
                    <img src={image} alt="avatar"/>
                </div>

                <div className="card_right">
                    <div className="name_box">
                        {primary} {jersey ? "| " + jersey : ""} - {first} {last}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayerCard
