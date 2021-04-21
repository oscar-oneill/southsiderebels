import React from 'react';
import Search from '../Components/Search';
import '../styles/EditPlayer.css';

const EditPlayer = () => {
    document.title = "Player Editor"

    return (
            <div className="playerEdit_container">
                <Search/>
            </div>

    )
}

export default EditPlayer
