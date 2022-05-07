import React, { useState, useEffect }  from 'react';
import Navbar from './Navbar.js'
import {Link} from 'react-router-dom';

const Profile = () => {
const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
      try{
      const localstorage_user = JSON.parse(localStorage.getItem('user'))
        fetch("http://localhost:3000/favourites/6261d5490327f88a2e222b3a", {
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
      }, [])
if (error) {
        return <div>Error: {error.message}</div>;
    } 
     else {
         console.log(users)
        return (

          <div>
            <Navbar />
            <ul>
                {users.map(user => (
                <div className="student-profile py-4">
                <div className="container">
                    <div className="col-lg-8">
                      <div className="card shadow-sm">
                        <div className="card-header bg-transparent border-0">
                          <h3 class="mb-0"><i class="far fa-clone pr-1"></i>General Information</h3>
                        </div>
                        <div className="card-body pt-0">
                          <table className="table table-bordered">
                            <tr>
                              <th width="30%">Professor</th>
                              <td width="2%">:</td>
                              <td>{user.tutor_name}</td>
                            </tr>
                            <tr>
                              <th width="30%">Subject</th>
                              <td width="2%">:</td>
                              <td>{user.subject}</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                      <Link to = {`/home`}><a href="#"></a><button class="button" style ={{padding : '10px 15px 10px 15px'}}>
              Back
            </button></Link>
                    </div>
                  </div>
                </div>
                ))}
            </ul>
          </div>
            
            
        );
    }
}
export default Profile;