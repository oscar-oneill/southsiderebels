import React from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';

function Home() {
    document.title = "Southside Rebels"
    return (
        <div className="home_container">
            <div className="home_content">
                <p>Southside Rebels Football</p>

                <div id="home_buttons">
                    <Link to='/auth/login'>
                        <button>Login</button>
                    </Link>
                    
                </div>
            </div>
        </div>
    )
}

export default Home
