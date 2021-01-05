import React from 'react'
import '../App.css'
// import {Button,Carousel} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Eat from '../images/great.jpg'
import Lid from '../images/frat.jpg'
import Fin from '../images/fer.jpg'

function Home2() {
    return (  
      <div>    
    <div className="slider">
    <div className="slides">
      
        <img src={Fin} alt=''/> 
        <div class="caption center-align">
          <h3>This is our big Tagline!</h3>
          <h5 class="light grey-text text-lighten-3">Here's our small slogan.</h5>
        </div>

        <img src={Lid} alt=''/> 
        <div class="caption left-align">
          <h3>Left Aligned Caption</h3>
          <h5 class="light grey-text text-lighten-3">Here's our small slogan.</h5>
        </div>

        <img src={Eat} alt=''/> 
        <div class="caption right-align">
          <h3>Right Aligned Caption</h3>
          <h5 class="light grey-text text-lighten-3">Here's our small slogan.</h5>
        </div>
        <img src={Eat} alt=''/> 
        <div class="caption center-align">
          <h3>This is our big Tagline!</h3>
          <h5 class="light grey-text text-lighten-3">Here's our small slogan.</h5>
        </div>
        </div>


<div className="lip">
    <div className="arrange">WELCOME TO <span style={{color:"darkgreen"}}>DESIGN</span><span style={{color:"darkgoldenrod"}}>X</span></div>
    <div className="arrange">Are you looking for a designer to do some work for you or are you <br/>interested 
    in dispalying your design work for others to see your talent.
    <br/>DesignX is the risght place for you </div>
    <center>
    <button  type='submit' variant="outline-primary" size="lg" >
        <Link to="/">View More</Link>
        </button>{' '}
    </center>
    <br/>
        </div>
        
        </div>
        </div>
    )
}

export default Home2
