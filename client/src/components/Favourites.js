import React, { useState, useEffect }  from 'react';
import Navbar from './Navbar.js'
import {Link} from 'react-router-dom';

const Favourites = () => {
const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);

    const handleFavourite = (tutor) => {
      try{
        const localstorage_user = JSON.parse(localStorage.getItem('user'));
          fetch("http://localhost:3000/favourites/" + tutor._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-auth-token': localstorage_user.token
                
            }
      
        })
              .then(res => res.json())
              .then(
                  (data) => {
                    alert("Removed from favourites");
                  },
                  (error) => {
                    console.log(error);
                  }
              )}
              catch(e)
              {
                  console.log("Invalid User Token")
              }
    };

    useEffect(() => {
      try{
      const localstorage_user = JSON.parse(localStorage.getItem('user'))
        fetch("http://localhost:3000/favourites/" + localstorage_user._id, {
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
                    setUsers(data);
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
      })
if (error) {
        return <div>Error: {error.message}</div>;
    } 
     else {
         console.log(users)
        return (

          <div>
            <Navbar />
            <ul>
                {users.map((tutors,id) => (
                <div className="student-profile py-4">
                <div className="container">
                    <div className="col-lg-8">
                      <div className="card shadow-sm">
                        <div className="card-header bg-transparent border-0">
                          <h3 className="mb-0"><i className="far fa-clone pr-1"></i>General Information</h3>
                        </div>
                        <div className="card-body pt-0">
                          <table className="table table-bordered">
                            <tr>
                              <th width="30%">Professor</th>
                              <td width="2%">:</td>
                              <td>{tutors.tutor_name}</td>
                            </tr>
                            <tr>
                              <th width="30%">Subject</th>
                              <td width="2%">:</td>
                              <td>{tutors.subject}</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                      <button className="button" style ={{padding : '10px 15px 10px 15px'}} onClick={() => handleFavourite(tutors)}>Remove from favourites</button>
            
                    </div>
                  </div>
                </div>
                ))}
            </ul>
          </div>
            
            
        );
    }
}
export default Favourites;