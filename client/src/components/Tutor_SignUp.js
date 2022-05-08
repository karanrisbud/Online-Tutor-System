import React, {useState,setState} from 'react';
import Header from './Header.js';
import './style.css'
function Tutor_SignUp() {
    
    
    const [username, setUsername] = useState(null);
    const [name, setName] = useState(null);
    const [mobile_no, setMobile_no] = useState(null);
    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setconfirmPassword] = useState(null);
    const [subject,setSubject] = useState(null);
    const [about_me,setAbout_me] = useState(null);
    const [errorMessage,seterrorMessage] = useState(null);

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "username"){
            setUsername(value);
        }
        if(id === "name"){
            setName(value);
        }
        if(id === "mobile_no"){
            setMobile_no(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setconfirmPassword(value);
        }
        if(id === "subject"){
            setSubject(value);
        }
        if(id === "about_me"){
            setAbout_me(value);
        }

    }

    const handleSubmit  = (e) => {

        e.preventDefault();

        
        fetch('http://localhost:3000/tutorregister', {
            method: "POST",
            headers : { 
              'Content-Type': 'application/json',
               'Accept': 'application/json'
            },
            body: JSON.stringify( {  // you will get user information from login form
  
              "username":username,
              "name" : name,
              "mobile_no" : mobile_no,
              "email" : email,
              "password" : password,
              "subject" : subject,
              "about_me" : about_me,
              "image" : null,
              "total_tutoring_hours" : 0,
              "average_ratings" : 0
            } )
          })
          .then(res => res.json())
          .then(
              (data) => {
                if(data.status == 'error')
                    seterrorMessage(data.message);
                else
                    {
                        alert('Registered Successfully')
                        window.location.href = '/tutor_entry';
                    }
              },
              (error) => {
                console.log(error);
              }
          )

       
    }

    return(
        <div>
            

            <p style={{textAlign:"center",color:"red"}}>{errorMessage}</p>
                <div className="username">
                    <label className="form__label" for="username">Username</label>
                    <input className="form__input" type="text" value={username} onChange = {(e) => handleInputChange(e)} id="username" placeholder="Username"/>
                </div>
                <div className="name">
                    <label className="form__label" for="name">Name</label>
                    <input  type="text" name="" id="name" value={name}  className="form__input" onChange = {(e) => handleInputChange(e)} placeholder="Name"/>
                </div>


                <div className="email">
                    <label className="form__label" for="email">Email </label>
                    <input  type="email" id="email" className="form__input" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                </div>

                <div className="mobile_no">
                    <label className="form__label" for="mobile_no">Mobile Number: </label>
                    <input  type="tel" id="mobile_no" className="form__input" value={mobile_no} onChange = {(e) => handleInputChange(e)} placeholder="Mobile Number"/>
                </div>
          
                <div className="password">
                    <label className="form__label" for="password">Password </label>
                    <input className="form__input" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                </div>

                <div className="confirm-password">
                    <label className="form__label" for="confirmPassword">Confirm Password </label>
                    <input className="form__input" type="password" id="confirmPassword" value={confirmPassword} onChange = {(e) => handleInputChange(e)} placeholder="Confirm Password"/>
                </div>

                <div className="subject">
                    <label className="form__label" for="subject">Subject</label>
                    <input  type="text"  id="subject" value={subject}  className="form__input" onChange = {(e) => handleInputChange(e)} placeholder="Subject"/>
                </div>
                <div className="about_me">
                    <label className="form__label" for="about_me">About Me</label>
                    <textarea id="about_me" value={about_me}  className="form__input" onChange = {(e) => handleInputChange(e)} placeholder="about_me"/>
                </div>

        
            <div className="footer">
                <button onClick={(e)=>handleSubmit(e)} type="submit" className="btn">Register</button>
            </div>
            
        </div>
       
             
    )       
}

export default Tutor_SignUp;

