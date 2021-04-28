import React, { useEffect, useContext } from 'react';
import { RosterContext } from '../context/RosterContext';
import '../styles/Roster.css';
import PlayerCard from '../Components/PlayerCard';

const Roster = () => {
    document.title = "2021 Southside Rebels Team Roster"

    const default_avatar = 'https://firebasestorage.googleapis.com/v0/b/southside-football-data.appspot.com/o/player-avatars%2Fdefault%2Fplaceholder.png?alt=media&token=5cbeca7f-2da7-4aa3-b590-df2563c4f469';
    const {players, setPlayers} = useContext(RosterContext);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/v1/roster");
                const data = await response.json();
                setPlayers(data);
                
            } catch (err) {
                console.log(err);
            }
        }
        fetchData(); // eslint-disable-next-line
    }, [])

    return (
        <div className="roster_container">
            <div className="roster_data">
                <div className="roster_header">Southside Rebels Team Roster</div>

                <div className="roster_box">
                      {players && players.map(player => {
                          return (
                            <PlayerCard
                                key={player.id}
                                primary={player.primary_position}
                                jersey={player.jersey_number === "--" ? "" : player.jersey_number}
                                first={player.first_name}
                                last={player.last_name}
                                image={player.image_url === "null" ? default_avatar : player.image_url}
                            />
                          )
                      })}
                </div>
            </div>
        </div>
    )
}

export default Roster
