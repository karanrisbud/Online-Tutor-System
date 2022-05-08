import React, { Component } from 'react';

function Navbar_empty() {

    const handleTutorLogin = () => {
        localStorage.clear();
        window.location.href = '/tutor_entry';
    }
    
    const handleUserLogin = () => {
        localStorage.clear();
        window.location.href = '/user_entry';
    }

    return (  
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
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
                    <li><a className="nav-link active" onClick={()=>handleTutorLogin()} href="#" aria-current="page">Tutor Login</a></li>
                    <li><a className="nav-link active" onClick={()=>handleUserLogin()} href="#" aria-current="page">User Login</a></li>
                </ul>
            </div>
            </div>
        </nav>
    );
}

export default Navbar_empty;