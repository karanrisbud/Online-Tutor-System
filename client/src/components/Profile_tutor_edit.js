import React, {useState,useEffect} from 'react';
import './style.css'
import {Link} from 'react-router-dom';
import Navbar from './Navbar.js'
import axios from 'axios'

function Profile_tutor_edit() {

    const [selectedFile,setselectedFile] = useState(null);

    const [email,setEmail] = useState(null);
    const [name,setName] = useState(null);
    const [about_me,setAboutMe] = useState(null);
    const [username,setUsername] = useState(null);
    const [id,setID] = useState(null);
    const [image,setImage] = useState(null);
    const [subject,setSubject] = useState(null);
    

    const handleInputChange = (e) => {
        const {id , value} = e.target;

        if(id === "email"){
            setEmail(value);
        }
        if(id === "name"){
            setName(value);
        }
        if(id === "username"){
            setUsername(value);
        }
        if(id === "subject"){
            setSubject(value);
        }
        if(id === "about_me"){
            setAboutMe(value);
        }

    }

 
    const handleSubmit  = (e) => {

        e.preventDefault();
        const localstorage_tutor = JSON.parse(localStorage.getItem('tutor'))
        
        fetch('http://localhost:3000/profile_tutor/' + localstorage_tutor._id, {
            method: "PUT",
            headers : { 
              'Content-Type': 'application/json',
               'Accept': 'application/json',
               'x-auth-token': localstorage_tutor.token
            },
            body: JSON.stringify( {  // you will get user information from login form
  
              "username":username,
              "name" : name,
              "subject" : subject,
              "email" : email,
              "about_me" : about_me
            } )
          })
          .then(res => res.json())
          .then(
              (data) => {

                alert("Edited Successfully");
                window.location.href = '/tutor_profile';


              },
              (error) => {
                console.log(error);
              }
          )

       
    }

    useEffect(() => {
        try{
        const localstorage_tutor = JSON.parse(localStorage.getItem('tutor'))
        fetch("http://localhost:3000/profile_tutor/"+localstorage_tutor._id, {
          method: 'get',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'x-auth-token': localstorage_tutor.token
              
          }
    
      })
            .then(res => res.json())
            .then(
                (data) => {
                    //console.log(data);
                    setSubject(data[0].subject);
                    setUsername(data[0].username);
                    setName(data[0].name);
                    setAboutMe(data[0].about_me);
                },

            )
            
          }
            catch(e)
            {
                console.log("Invalid User Token")
            }
            
      }, [])
  
    return(
        <div>
        <Navbar />
        <div className="form">
            <div className="form-body">
            

                <div className="name">
                    <label className="form__label" for="name">Name </label>
                    <input  type="name" id="name" className="form__input" value={name} onChange = {(e) => handleInputChange(e)} />
                </div>

                <div className="username">
                    <label className="form__label" for="username">User Name </label>
                    <input  type="username" id="username" className="form__input" value={username} onChange = {(e) => handleInputChange(e)} />
                </div>

                <div className="subject">
                    <label className="form__label" for="subject">Subject </label>
                    <input  type="subject" id="subject" className="form__input" value={subject} onChange = {(e) => handleInputChange(e)} />
                </div>

                <div className="subject">
                    <label className="form__label" for="about_me">About Me </label>
                    <input  type="about_me" id="about_me" className="form__input" value={about_me} onChange = {(e) => handleInputChange(e)} />
                </div>

            </div>
            <div className="footer">
            <Link to = "/tutor_profile"><a href="#"></a><button type="submit" class="btn">Back</button></Link> &nbsp;&nbsp;
            <button onClick={(e)=>handleSubmit(e)} type="submit" class="btn">Edit </button>
            </div>
        </div>
        </div>
       
    )       
}

export default Profile_tutor_edit;

