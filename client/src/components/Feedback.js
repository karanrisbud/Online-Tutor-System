import React, { Component,useEffect,useState } from 'react';
import Navbar from './Navbar';
import {Link} from 'react-router-dom';

function Feedback(props) 
{

    const [comment,setcomment] = useState(null);
    const [rating,setrating] = useState(0);
    const[error,setError] = useState(null);
    const [id,setid] = useState(0);

    const handleInputChange = (e) => {
        const {id , value} = e.target;

        if(id === "comment"){
            setcomment(value);
        }
        if(id === "rating"){
            setrating(value);
        }
            
    }
    


    const handleSubmit  = (e) => {

        e.preventDefault();
        const localstorage_user = JSON.parse(localStorage.getItem('user'))

        if(rating < 0 || rating > 5)
            setError("Rating cannot be greater than 5 or less than 0");
        else{
        
        if(id == 0)
        {
     

            fetch('http://localhost:3000/feedback/', {
                method: "POST",
                headers : { 
                  'Content-Type': 'application/json',
                   'Accept': 'application/json',
                   'x-auth-token': localstorage_user.token
                },
                body: JSON.stringify( {  // you will get user information from login form
      
                  "user_id":localstorage_user._id,
                  "tutor_id" : localStorage.getItem("tutor_id"),
                  "comment" : comment,
                  "rating" : rating     
                } )
              })
              .then(res => res.json())
              .then(
                  (data) => {
    
                    alert("Added Successfully");
                    window.location.href = '/tutors';
    
    
                  },
                  (error) => {
                    console.log(error);
                  }
              )
        }
        else{

            fetch('http://localhost:3000/feedback/' + id, {
                method: "PUT",
                headers : { 
                  'Content-Type': 'application/json',
                   'Accept': 'application/json',
                   'x-auth-token': localstorage_user.token
                },
                body: JSON.stringify( {  // you will get user information from login form
                  "comment" : comment,
                  "rating" : rating     
                } )
              })
              .then(res => res.json())
              .then(
                  (data) => {
    
                    alert("Edited Successfully");
                    window.location.href = '/tutors';
    
    
                  },
                  (error) => {
                    console.log(error);
                  }
              )

        }

    }


       
    }

    useEffect(() => {
        try{
        
        const localstorage_user = JSON.parse(localStorage.getItem('user'))
        fetch("http://localhost:3000/feedback/"+localstorage_user._id +'/'+localStorage.getItem("tutor_id"), {
          method: 'get',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'x-auth-token': localstorage_user.token
              
          }
    
      })
            .then(res => res.json())
            .then(
                (data) => {
                    //console.log(data);
                    setcomment(data[0].comment);
                    setrating(data[0].rating);
                    setid(data[0]._id);
                },

            )
            
          }
            catch(e)
            {
                console.log("Invalid User Token")
            }
            
      }, [])














    return ( 
        <div>
            <Navbar />

            <div className="form">
            <div className="form-body">
            <p style={{textAlign:"center",color:"red"}}>{error}</p>

            <div className="comment">
                    <label className="form__label" for="comment">About Me</label>
                    <textarea id="comment" value={comment}  className="form__input" onChange = {(e) => handleInputChange(e)} placeholder="comment"/>
            </div>

            
            <div className="number">
                    <label className="form__label" for="number">Ratings from 5</label>
                    <input type="number" id="rating" value = {rating} name="rating" min="10" max="100"  className="form__input" onChange = {(e) => handleInputChange(e)} ></input>
            </div>

            </div>
            <div className="footer">
            <Link to = "/tutors"><a href="#"></a><button type="submit" class="btn">Back</button></Link> &nbsp;&nbsp;
            <button onClick={(e)=>handleSubmit(e)} type="submit" class="btn">Submit </button>
            
           
            </div>

            </div>
            


        </div>
        
     );
}

export default Feedback;