import React, { Component,useState,useEffect } from 'react';
import Navbar from './Navbar.js'
import {Link} from 'react-router-dom';

function AppointmentsTutor() {

    const [appointments, setappointments] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        try{
  
        const localstorage_tutor = JSON.parse(localStorage.getItem('tutor'));
  
        fetch( "http://localhost:3000/appointments_tutor/"+localstorage_tutor._id, {
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
                      setappointments(data);
                  },
                  (error) => {
                      setError(error);
                  }
              )}
              catch(e)
              {
                  console.log("Invalid User Token")
              }
              
        },[])
  if (error) {
          return <div>Error: {error.message}</div>;
      } 
       else {
           
          return (
  
            <div>
              <Navbar />
              <Link to = "/"><a href="#"></a>
              <button type="submit" class="btn" style={{margin : "20px"}}>
                  Back
              </button></Link> &nbsp;&nbsp;
              
              <h2 style={{textAlign:"center",color:"white"}}>List of Scheduled Upcoming Appointments</h2>
              <table  className="table table-bordered table-light" style={{width:"80%",marginLeft:"10%"}}>
                  <thead className="thead-dark">
                      <tr>
                      <th scope="col">#</th>
                      <th scope="col">Student Name</th>
                      <th scope="col">Subject</th>
                      <th scope="col">Date</th>
                      <th scope="col">Time</th>
                      </tr>
                  </thead>
              <tbody>
  
                  {appointments.map((user, i) => (
                      <tr key={i}>
  
                          <td>{i+1}</td>
                          <td>{user.user_name}</td>
                          <td>{user.subject}</td>
                          <td>{user.date}</td>
                          <td>{user.time}</td>

   
                          
                          
  
                      </tr>
                  ))}
              </tbody>
              </table>
              
  
          </div>
              
              
          );
    }
}

export default AppointmentsTutor;