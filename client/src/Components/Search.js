import React, { useEffect, useContext, useState } from 'react';
import RosterAPI from '../API/RosterAPI';
import { Link } from 'react-router-dom';
import { RosterContext } from '../context/RosterContext';
import PlayerCard from './PlayerCard';
import '../styles/Search.css';


const Search = () => {
    const default_avatar = 'https://firebasestorage.googleapis.com/v0/b/southside-football-data.appspot.com/o/player-avatars%2Fdefault%2Fplaceholder.png?alt=media&token=5cbeca7f-2da7-4aa3-b590-df2563c4f469';
    const {players, setPlayers} = useContext(RosterContext);

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RosterAPI.get("/")
                setPlayers(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData(); // eslint-disable-next-line
    }, [])

    return (
        <div className="search_container">
            <input className="search_input" name="search" type="text" onChange={(e) => {setSearchTerm(e.target.value)}} placeholder="Search by Name or Nickname"></input>

            <div className="search_data"> 
                {players && players.filter((val) => {
                    if (searchTerm === "") {
                        return val
                    } else if (val.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                               val.last_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                               val.nickname.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val
                    }
                }).map(player => {
                    return (
                            <Link to={`/edit/${player.id}/update`} key={player.id}>
                                <PlayerCard
                                    primary={player.primary_position}
                                    jersey={player.jersey_number === "--" ? "" : player.jersey_number}
                                    first={player.first_name}
                                    last={player.last_name}
                                    image={player.image_url === "null" ? default_avatar : player.image_url}
                                />
                            </Link>
                            )
                    })}
            </div>
        </div>
    )
}

export default Search
