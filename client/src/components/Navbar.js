import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'

function Navbar() {
    const {state,dispatch} =useContext(UserContext)
    const history= useHistory()
    const renderList= () => {
      if(state){
        return [
          <li><Link to="/profile">Profile</Link></li>,
          // <li><Link to="/details">Details</Link></li>,
            <li><Link to="/work">Work</Link></li>,
            <li>
                <button className="btn waves-effect #c63828 red darken-3"
                 type="submit" onClick={() =>{
                  localStorage.clear()
                  dispatch({type:"CLEAR"})
                  history.push('/login')
                  }}>
                    Logout
                </button>
            </li>
        ]
      }else{
        return [
          <li><Link to="/intro">Home</Link></li>,
          <li><Link to="/signup">Signup</Link></li>,
          <li><Link to="/login">Login</Link></li>
        ]
      }
    }
    return (
        <nav>
        <div className="nav-wrapper #00c853 green accent-4">
          <Link to={state?"/" : "/login"} className="brand-logo left">Designx</Link>
          <ul id="nav-mobile" className="right ">
            {renderList()}
            
          </ul>
        </div>
      </nav>
    )
}

export default Navbar
