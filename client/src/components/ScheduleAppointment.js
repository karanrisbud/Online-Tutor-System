import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function ScheduleAppointment() {

        
    var week = new Date(new Date().setDate(new Date().getDate() + 14));
    var dd_max = week.getDate();
    var mm_max = week.getMonth()+1;
    var yyyy_max = week.getFullYear();

    var today = new Date(new Date().setDate(new Date().getDate()));
    var dd_min = today.getDate();
    var mm_min = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    var yyyy_min = today.getFullYear();

    

    if (dd_max < 10) {
        dd_max = '0' + dd_max
    }

    if (mm_max < 10) {
        mm_max = '0' + mm_max
    }

    week = yyyy_max + '-' + mm_max + '-' + dd_max;

    if (dd_min < 10) {
        dd_min = '0' + dd_min
    }

    if (mm_min < 10) {
        mm_min = '0' + mm_min
    }

    today = yyyy_min + '-' + mm_min + '-' + dd_min;

    const [error,setError] = useState(null);

    const [date,setdate] = useState(today);
    const [time,settime] = useState("9am-10am");



    const handleInputChange = (e) => {
        const {id , value} = e.target;

        if(id === "date"){
            setdate(value);
        }
        if(id === "time"){
            settime(value);
        }
            
    }

    const handleSubmit  = (e) => {

        e.preventDefault();

            const localstorage_user = JSON.parse(localStorage.getItem('user'))
            fetch("http://localhost:3000/appointments/"+localStorage.getItem("tutor_id")+"/" + date + "/" + time, {
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

                                         
                        if(data.length > 0){
                            setError("This appointment slot is not available please choose another slot");
                            
                        }
                        else{

                            
   
        const localstorage_user = JSON.parse(localStorage.getItem('user'))
        fetch('http://localhost:3000/appointments/', {
            method: "POST",
            headers : { 
              'Content-Type': 'application/json',
               'Accept': 'application/json',
               'x-auth-token': localstorage_user.token
            },
            body: JSON.stringify( {  // you will get user information from login form
  
              "user_id":localstorage_user._id,
              "tutor_id" : localStorage.getItem("tutor_id"),
              "date" : date,
              "time" : time     
            } )
          })
          .then(res => res.json())
          .then(
              (data) => {

                alert("Appointment booked Successfully");
                window.location.href = '/tutors';


              },
              (error) => {
                console.log(error);
              }
          )

                        }
                            

                    },
    
                )
                



        


    }

    return (  
        <div>
            <Navbar />
            <div className="form">
            <div className="form-body">
            <p style={{textAlign:"center",color:"red"}}>{error}</p>
            
            <div className="date">
                    <label className="form__label" for="date">Appointment Date : </label>
                    <input type="date" min = {today} max = {week} defaultValue={today}
                     id="date" className="form__input" onChange = {(e) => handleInputChange(e)}></input>
            </div>

            <div className="time">
            <label className="form__label" for="time">Appointment Time:</label>
            <select className = "form-select form__label" id ="time" onChange = {(e) => handleInputChange(e)}>
                <option value="9am-10am">9am - 10am</option>
                <option value="10am-11am">10am - 11am</option>
                <option value="11am-12pm">11am - 12pm</option>
                <option value="12pm-1pm">12pm - 1pm</option>
                <option value="1pm-2pm">1pm - 2pm</option>
                <option value="2pm-3pm">2pm - 3pm</option>
                <option value="3pm-4m">3pm - 4pm</option>
                <option value="4pm-5pm">4pm - 5pm</option>
                <option value="5pm-6pm">5pm - 6pm</option>

            </select>
            </div>



            </div>
            <div className="footer">
            <Link to = "/tutors"><a href="#"></a><button type="submit" className="btn">Back</button></Link> &nbsp;&nbsp;
            <button type="submit" class="btn" onClick={(e)=>handleSubmit(e)} >Book </button>
            
           
            </div>

            </div>
        </div>
    );
}

export default ScheduleAppointment;