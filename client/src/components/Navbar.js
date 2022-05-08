import React, { Component, useState,useEffect } from 'react';

function Navbar() {

    const [tutor,setTutor] = useState(false);

    useEffect(() => {

        if(localStorage.getItem("tutor") === null)
        {
            setTutor(false);
        }
        else{
            setTutor(true);
        }
    
      },[])

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    }

    return (  
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
            <div className="container">
                <a className="navbar-brand" href="/">
                    <img src="assets/images/logo.png" height="75px" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item"><a className="nav-link active" aria-current="page" href="/">Home</a></li>
                    {!tutor && <li><a className="nav-link active" href="/profile" aria-current="page">Profile</a></li>}
                    {tutor && <li><a className="nav-link active" href="/tutor_profile" aria-current="page">Profile</a></li>}
                    <li><a className="nav-link active" href="/appointments" aria-current="page">Appointments</a></li>
                    {!tutor &&<li><a className="nav-link active" href="/tutors" aria-current="page">Tutors</a></li>}
                    {!tutor &&<li><a className="nav-link active" href="/favourites" aria-current="page">Favourites</a></li>}
                    <li><a className="nav-link active" onClick={()=>handleLogout()} href="#" aria-current="page">Logout</a></li>
                </ul>
            </div>
            </div>
        </nav>
    );
}

export default Navbar;