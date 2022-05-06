import React, { Component } from 'react';

class Navbar extends Component {

    render(){
        return(
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img src="assets/images/logo.png" height="75px" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item"><a className="nav-link active" aria-current="page" href="/">Home</a></li>
                    <li><a className="nav-link active" href="/about" aria-current="page">About</a></li>
                    <li><a className="nav-link active" href="/profile" aria-current="page">Profile</a></li>
                    <li><a className="nav-link active" href="/appointments" aria-current="page">Appointments</a></li>
                    <li><a className="nav-link active" href="/tutors" aria-current="page">Tutors</a></li>
                    <li><a className="nav-link active" href="/favourites" aria-current="page">Favourites</a></li>
                </ul>
            </div>
            </div>
        </nav>
        )
    }

}

export default Navbar;