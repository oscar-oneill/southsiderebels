import React from 'react'
import { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import '../styles/Edit.css';
import RosterAPI from '../API/RosterAPI';
import { RosterContext } from '../context/RosterContext';
import PlayerEditor from '../Components/PlayerEditor';

const Edit = () => {
    const default_avatar = 'https://firebasestorage.googleapis.com/v0/b/southside-football-data.appspot.com/o/player-avatars%2Fdefault%2Fplaceholder.png?alt=media&token=5cbeca7f-2da7-4aa3-b590-df2563c4f469';
    const {players, setPlayers} = useContext(RosterContext);
    const { id } = useParams();
    let history = useHistory();

    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [nickname, setNickname] = useState("");
    const [jersey, setJersey] = useState("");
    const [primary, setPrimary] = useState("");
    const [secondary, setSecondary] = useState("");
    const [isActive, setActive] = useState("");
    const [health, setHealth] = useState("");
    const [status, setStatus] = useState("");
    const [image, setImage] = useState("");

    document.title = `Editing: ${primary} - ${first} ${last}`
    
    useEffect(() => {
        const fetchData = async () => {

            const response = await RosterAPI.get(`/${id}`)
                setFirst(response.data.data.player.first_name)
                setLast(response.data.data.player.last_name)
                setNickname(response.data.data.player.nickname)
                setJersey(response.data.data.player.jersey_number)
                setPrimary(response.data.data.player.primary_position)
                setSecondary(response.data.data.player.secondary_position)
                setActive(response.data.data.player.is_active)
                setHealth(response.data.data.player.health_condition)
                setStatus(response.data.data.player.gameday_status)
                setImage(response.data.data.player.image_url)
        } 
        
        fetchData(); // eslint-disable-next-line
    }, [])

    const deleteFunction = (e, id) => {
        handleDelete(e, id)
        history.push("/edit")
    }

    const updateFunction = (e, id) => {
        handleUpdate(e, id)
        history.push("/edit")
    }

    const handleUpdate = async (id) => { // eslint-disable-next-line
        const response = await RosterAPI.put(`/${id}`, {
            id: id,
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
        })
    }

    const handleDelete = async (e, id) => {        
        e.stopPropagation()
        try { // eslint-disable-next-line
            const response = await RosterAPI.delete(`/${id}`)
            setPlayers(players.filter(player => {
                return player.id !== id
            }))
        } catch (err) {
            console.log(err)
        }
    }

   return (
       <div className="edit_container">
            <div className="editForm_container">
                <div className="edit_header">Edit Player</div>
                <div className="player_data">
                    <PlayerEditor
                        key={id}
                        first={first}
                        last={last}
                        nickname={nickname} 
                        jersey={jersey === "--" ? "" : jersey}
                        primary={primary}
                        secondary={secondary}
                        isActive={isActive} 
                        health={health} 
                        status={status}
                        image={image === "null" ? default_avatar : image}

                        firstX={(e) => setFirst(e.target.value)} 
                        lastX={(e) => setLast(e.target.value)} 
                        nicknameX={(e) => setNickname(e.target.value)} 
                        jerseyX={(e) => setJersey(e.target.value)} 
                        primaryX={(e) => setPrimary(e.target.value)} 
                        secondaryX={(e) => setSecondary(e.target.value)} 
                        isActiveX={(e) => setActive(e.target.value)} 
                        healthX={(e) => setHealth(e.target.value)} 
                        statusX={(e) => setStatus(e.target.value)} 
                        imageX={(e) => setImage(e.target.value)}

                        click={(e) => {updateFunction(id)}}
                        fatal={(e) => {deleteFunction(e, id)}}
                    />
                </div>
            </div>
       </div>
    )
}

export default Edit
