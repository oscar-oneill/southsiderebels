import React from 'react';
import '../styles/FormEditor.css';

const FormEditor = ({ first, last, nickname, jersey, primary, secondary, isActive, health, status, image, click, fatal, firstX, lastX, nicknameX, jerseyX, primaryX, secondaryX, isActiveX, healthX, statusX, imageX}) => {
    return (
    <form className="addPlayer_form">
      <div>
        <label>First</label>
        <input value={first} onChange={firstX} className="first" name="first" type="text" placeholder={"First"} required></input>
      </div>
      
      <div>
        <label>Last</label>
        <input value={last} onChange={lastX} className="last" name="last" type="text" placeholder="Last" required></input>
      </div>
      
      <div>
        <label>Nickname</label>
        <input value={nickname} onChange={nicknameX} className="nickname" name="nickname" type="text" placeholder="Nickname" required></input>
      </div>
      
      <div>
        <label>Jersey No.</label>  
        <input value={jersey} onChange={jerseyX} className="jersey" name="jersey" type="text" placeholder="Jersey No." required></input>
      </div>


      <div>
        <label>Primary Pos.</label>  
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
      </div>

      <div>
        <label>Secondary Pos.</label>  
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
      </div>

      <div>
        <label>Activity</label>  
        <select value={isActive} onChange={isActiveX} name="isActive" className="isActive" required>
          <option selected disabled value="Active">Is Player Relatively Active?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      <div>
        <label>Health</label>  
        <input value={health} onChange={healthX} className="health" name="health" type="text" placeholder="Health Condition" required></input>
      </div>

      <div>
        <label>Status</label>  
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
      </div>

      <div>
        <label>Image URL</label>
        <input value={image} onChange={imageX} className="image" name="image" type="text" placeholder="Image URL" required></input>
      </div>

      <div style={{ width: "100%", marginTop: "10px" }}>
        <button onClick={click} className="update_button" type="submit">
          Update
        </button>

        <button onClick={fatal} className="delete_button" type="submit">
          Delete
        </button>
      </div>
    </form>
    )
}

export default FormEditor
