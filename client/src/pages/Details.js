import React from 'react'
import {Link} from 'react-router-dom'



function Details() {
    return (
        <div>
           {/* <h2>Designx</h2>
            <input type="text" placeholder="About me" />
            <input type="email" placeholder="skills" />
            <input type="password" placeholder="password" />
            <input type="password" placeholder="repeat password"/>  */}
            <Link to="/add" className="btn waves-effect waves-light #00c853 green accent-4 lit">Add</Link>
            <Link to="/edit" className="btn waves-effect waves-light #00c853 green accent-4 lit">Edit</Link>
            
        </div>
    )
}

export default Details
