import React, { useState, createContext } from 'react';

export const RosterContext = createContext();

export const RosterContextProvider = props => {
    const [players, setPlayers] = useState([])

    const addPlayers = (player) => {
        setPlayers([...players, player])
    }

    return (
        <RosterContext.Provider value={{ players, setPlayers, addPlayers }}>
            {props.children}
        </RosterContext.Provider>
    )
}