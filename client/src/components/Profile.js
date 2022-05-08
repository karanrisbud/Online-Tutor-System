import React, { useState, useEffect }  from 'react';
import './profile_style.css'
import {Link} from 'react-router-dom';
import Navbar from './Navbar.js'

const Profile = () => {
const [error, setError] = useState(null);
const [isLoaded, setIsLoaded] = useState(false);
//const [users, setUsers] = useState([]);
const [totHours, setTotHours] = useState(null);
const [email,setEmail] = useState(null);
const [name,setName] = useState(null);
const [mobile_no,setMobile] = useState(null);
const [username,setUsername] = useState(null);
const [id,setID] = useState(null);
const [errorMessage,seterrorMessage] = useState(null);

    useEffect(() => {
        try{
        const localstorage_user = JSON.parse(localStorage.getItem('user'))
        fetch("http://localhost:3000/profile_user/"+localstorage_user._id, {
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
                    //setUsers(data);
                    console.log(data)
                    setEmail(data[0].email);
                    setID(data[0]._id);
                    setMobile(data[0].mobile_no);
                    setUsername(data[0].username);
                    setName(data[0].name);
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
              const localstorage_user = JSON.parse(localStorage.getItem('user'))
              fetch("http://localhost:3000/appointments/"+localstorage_user._id, {
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
                          <img className="profile_img" src="./assets/images/prof2.jpg" alt="student dp" />
                          <h3>{name}</h3>
                        </div>
                        <div className="card-body">
                          <p class="mb-0"><strong class="pr-1">Student ID:</strong>{id}</p>
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
                              <th width="30%">Mobile No.</th>
                              <td width="2%">:</td>
                              <td>{mobile_no}</td>
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