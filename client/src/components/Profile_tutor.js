import React, { useState, useEffect }  from 'react';
import './profile_style.css'
import {Link} from 'react-router-dom';
import Navbar from './Navbar.js'

const Profile = () => {
const [error, setError] = useState(null);
const [isLoaded, setIsLoaded] = useState(false);
//const [users, setUsers] = useState([]);

const [totHours, setTotHours] = useState(null);
const [avgRating, setAvgRating] = useState(null);
const [email,setEmail] = useState(null);
const [name,setName] = useState(null);
const [about_me,setAboutMe] = useState(null);
const [username,setUsername] = useState(null);
const [id,setID] = useState(null);
const [image,setImage] = useState(null);
const [subject,setSubject] = useState(null);

const [errorMessage,seterrorMessage] = useState(null);

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
                    setIsLoaded(true);
                    //setUsers(data);
                    console.log(data)
                    setEmail(data[0].email);
                    setID(data[0]._id);
                    setAboutMe(data[0].about_me);
                    setUsername(data[0].username);
                    setName(data[0].name);
                    setImage(data[0].image)
                    setSubject(data[0].subject)
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
            
          }
            catch(e)
            {
                console.log("Invalid User Token")
            }
            try{
              const localstorage_tutor = JSON.parse(localStorage.getItem('tutor'))
              fetch("http://localhost:3000/appointments_tutor/"+localstorage_tutor._id, {
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
                      setTotHours(data.length);

                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
            }
            catch(e)
            {
              console.log("Invalid token");
            }
            try{
                const localstorage_tutor = JSON.parse(localStorage.getItem('tutor'))
                fetch("http://localhost:3000/feedback/"+localstorage_tutor._id, {
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
                        setAvgRating(data.length);
  
                      },
                      (error) => {
                          setIsLoaded(true);
                          setError(error);
                      }
                  )
              }
              catch(e)
              {
                console.log("Invalid token");
              }
      }, [])
if (error) {
        return <div>Error: {error.message}</div>;
    } 
     else {
         //console.log(users)
        return (
          <div>
            <Navbar />
            <ul>
                <div className="student-profile py-4">
          
                <div className="container">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="card shadow-sm">
                        <div className="card-header bg-transparent text-center">
                          <img className="profile_img" src={"./assets/images/"+image} alt="student dp" />
                          <h3>{name}</h3>
                        </div>
                        <div className="card-body">
                          <p class="mb-0"><strong class="pr-1">Tutor ID:</strong>{id}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="card shadow-sm">
                        <div className="card-header bg-transparent border-0">
                          <h3 class="mb-0"><i class="far fa-clone pr-1"></i>General Information</h3>
                        </div>
                        <div className="card-body pt-0">
                          <table className="table table-bordered">
                            <tr>
                              <th width="30%">Username</th>
                              <td width="2%">:</td>
                              <td>{username}</td>
                            </tr>
                            <tr>
                              <th width="30%">Email</th>
                              <td width="2%">:</td>
                              <td>{email}</td>
                            </tr>
                            <tr>
                              <th width="30%">Subject</th>
                              <td width="2%">:</td>
                              <td>{subject}</td>
                            </tr>
                            <tr>
                              <th width="30%">About Me</th>
                              <td width="2%">:</td>
                              <td>{about_me}</td>
                            </tr>
                            <tr>
                              <th width="30%">Tutoring hours</th>
                              <td width="2%">:</td>
                              <td>{totHours}</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                        <div style={{height: "26px"}}></div>
                      <Link to = "/profile_edit"><a href="#"></a><button class="button" style ={{padding : '10px 15px 10px 15px'}}>
              Edit
            </button></Link>
                    </div>
                  </div>
                </div>
              </div>
            </ul>
            </div>
        );
    }
}
export default Profile;