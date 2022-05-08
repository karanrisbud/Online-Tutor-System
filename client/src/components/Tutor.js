import React, { useState, useEffect }  from 'react';
import Navbar from './Navbar.js'
import {Link} from 'react-router-dom';
import StarRatings from "react-star-ratings";
import Tutor_details from './Tutor_details.jsx'

const Tutor = () => {
const [error, setError] = useState(null);
const [isLoaded, setIsLoaded] = useState(false);
const [tutors, setTutors] = useState([]);

    useEffect(() => {
      try{

      const localstorage_user = JSON.parse(localStorage.getItem('user'))
      fetch( "http://localhost:3000/tutors", {
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
                    setIsLoaded(true);
                    setTutors(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )}
            catch(e)
            {
                console.log("Invalid User Token")
            }
      }, [])
if (error) {
        return <div>Error: {error.message}</div>;
    } 
     else {
         console.log(tutors)
        return (
            <div>
                <Navbar />
                <Tutor_details tutorlist={tutors} />
            </div>  
            
        );
    }
}
export default Tutor;