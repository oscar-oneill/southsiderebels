import React from 'react';
import '../styles/Form.css';

const Form = ({ first, last, nickname, jersey, primary, secondary, isActive, health, status, image, firstX, lastX, jerseyX, nicknameX, primaryX, secondaryX, isActiveX, healthX, statusX, imageX, click }) => {
    return (
            <form className="addPlayer_form">
                <input value={first} onChange={firstX} className="first" name="first" type="text" placeholder="First" required></input>
                <input value={last} onChange={lastX} className="last" name="last" type="text" placeholder="Last" required></input>
                <input value={nickname} onChange={nicknameX} className="nickname" name="nickname" type="text" placeholder="Nickname" required></input>
                <input value={jersey} onChange={jerseyX} className="jersey" name="jersey" type="text" placeholder="Jersey No." required></input>

                <select value={primary} onChange={primaryX} name="primary" className="primary" required>
                    <option selected disabled value="Primary Position">Primary Position</option>
                    <option value="QB">QB</option>
                    <option value="RB">RB</option>
                    <option value="FB">FB</option>
                    <option value="WR">WR</option>
                    <option value="TE">TE</option>
                    <option value="OL">OL</option>
                    <option value="DE">DE</option>
                    <option value="DT">DT</option>
                    <option value="ILB">ILB</option>
                    <option value="OLB">OLB</option>
                    <option value="CB">CB</option>
                    <option value="FS">FS</option>
                    <option value="SS">SS</option>
                </select>
                
                <select value={secondary} onChange={secondaryX} name="secondary" className="secondary" required>
                    <option selected disabled value="Secondary Position">Secondary Position</option>
                    <option value="QB">QB</option>
                    <option value="RB">RB</option>
                    <option value="FB">FB</option>
                    <option value="WR">WR</option>
                    <option value="TE">TE</option>
                    <option value="OL">OL</option>
                    <option value="DE">DE</option>
                    <option value="DT">DT</option>
                    <option value="ILB">ILB</option>
                    <option value="OLB">OLB</option>
                    <option value="CB">CB</option>
                    <option value="FS">FS</option>
                    <option value="SS">SS</option>
                </select>

                <select value={isActive} onChange={isActiveX} name="isActive" className="isActive" required>
                    <option selected disabled value="Active">Is Player Relatively Active?</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>

                <input value={health} onChange={healthX} className="health" name="health" type="text" placeholder="Health Condition" required></input>

                <select value={status} onChange={statusX} name="status" className="status" required>
                    <option selected disabled value="Status">Status</option>
                    <option value="Active">Active</option>
                    <option value="Probable">Probable</option>
                    <option value="Game-Time Decision">Game-Time Decision</option>
                    <option value="Questionable">Questionable</option>
                    <option value="Doubtful">Doubtful</option>
                    <option value="Out">Out</option>
                    <option value="Out Indefinitely">Out Indefinitely</option>
                    <option value="Out For Season">Out For Season</option>
                </select>

                <input value={image} onChange={imageX} className="image" name="image" type="text" placeholder="Image URL" required></input>
                
                <div style={{width: "100%", marginTop: "10px"}}>
                    <button onClick={click} className="submit_button" type="submit">Submit</button>
                </div>
            </form>
    )
}

export default Form
