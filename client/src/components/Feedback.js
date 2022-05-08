import React, { Component } from 'react';
import Navbar from './Navbar';

function Feedback(props) 
{

    console.log(localStorage.getItem('tutor_id'));

    return ( 
        <div>
            <Navbar />
        </div>
        
     );
}

export default Feedback;