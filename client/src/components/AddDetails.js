import React from 'react'
import {Link} from 'react-router-dom'

function AddDetails() {
    return (
        <div className="auth-card">
            
            {/* <input type="text" placeholder="About me" cols="50" rows="30"/>
            <input type="text" placeholder="skills" />
            <input type="text" placeholder="Facebook" />
            <input type="text" placeholder="LinkedIn"/>
            <input type="text" placeholder="Github"/> 
            <input type="text" placeholder="Other(s)"/>
            <button className="btn waves-effect waves-light #00c853 green accent-4"
                 type="submit">
                    Add Info
                </button> */}
                
    <form className="col s12">
      <div>
        <div class="input-field col s12">
          <textarea id="textarea1" class="materialize-textarea"></textarea>
          <label for="textarea1">About Me</label>
        </div>
        <div class="input-field col s12">
          <textarea id="textarea2" class="materialize-textarea"></textarea>
          <label for="textarea2">Skills</label>
        </div>
        <div class="input-field col s12">
          <textarea id="textarea3" class="materialize-textarea"></textarea>
          <label for="textarea3">Github</label>
        </div>
        <div class="input-field col s12">
          <textarea id="textarea4" class="materialize-textarea"></textarea>
          <label for="textarea4">LinkedIn</label>
        </div>
        <div class="input-field col s12">
          <textarea id="textarea5" class="materialize-textarea"></textarea>
          <label for="textarea5">Facebook</label>
        </div>
        <div class="input-field col s12">
          <textarea id="textarea6" className="materialize-textarea"></textarea>
          <label for="textarea6">Other(s)</label>
        </div>
      </div>
    </form>
        <button className="btn waves-effect waves-light #00c853 green accent-4 lit"
            type="submit">
                Add Info
        </button>
        <Link to="/details" className="btn waves-effect waves-light #b71c1c red darken-4">Cancel</Link>
        </div>
    )
}

export default AddDetails
