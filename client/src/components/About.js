import React, { Component } from 'react';
import './about_style.css'
import Navbar from './Navbar';

class About extends Component {
    state = {  } 
    render() { 
        return (
          
            <div>
                <div className="about-section">
  <h1>Welcome</h1>
  <p>Hi, This is Tutor Online</p>
  <p>We provide a quick and easy way to connect students with tutors</p>
</div>
<br></br>
<h2 style={{textAlign:"center"}}>Our Team</h2>
<br></br>
<div className="row">

  <div className="column">
    <div className="card">
      <img src="./assets/images/prof2.jpg" alt="Karan" style={{width:"25%"}} />
      <div className="container">
        <h2>Karan Sandeep Risbud</h2>
      </div>
      <div className="container">
        <p className="title">Developer</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>krisbud@gmail.com</p>
        <p><button className="button">Contact</button></p>
      </div>
    </div>
  </div>
  
  <div className="column">
    <div className="card">
      <img src="./assets/images/prof1.jpg" alt="Deep" style={{width:"25%"}} />
      <div className="container">
        <h2>Deeprangshu Pal</h2>
        <p className="title">Developer</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>dpal@gmail.com</p>
        <p><button className="button">Contact</button></p>
      </div>
    </div>
  </div>
</div>
            </div>
        );
    }
}
 
export default About;