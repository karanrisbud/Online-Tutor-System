import React, { useState, useEffect }  from 'react';
import './profile_style.css'

const Profile = () => {
const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/profile_user/6261d5490327f88a2e222b3a")
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
            )
      }, [])
if (error) {
        return <div>Error: {error.message}</div>;
    } 
     else {
         console.log(users)
        return (
            <ul>
                {users.map(user => (
                <div className="student-profile py-4">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="card shadow-sm">
                        <div className="card-header bg-transparent text-center">
                          <img className="profile_img" src="./assets/images/prof2.jpg" alt="student dp" />
                          <h3>{user.name}</h3>
                        </div>
                        <div className="card-body">
                          <p class="mb-0"><strong class="pr-1">Student ID:</strong>{user._id}</p>
                          <p class="mb-0"><strong class="pr-1">Class:</strong>4</p>
                          <p class="mb-0"><strong class="pr-1">Section:</strong>A</p>
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
                              <td>{user.username}</td>
                            </tr>
                            <tr>
                              <th width="30%">Email</th>
                              <td width="2%">:</td>
                              <td>{user.email}</td>
                            </tr>
                            <tr>
                              <th width="30%">Gender</th>
                              <td width="2%">:</td>
                              <td>Male</td>
                            </tr>
                            <tr>
                              <th width="30%">Age</th>
                              <td width="2%">:</td>
                              <td>23</td>
                            </tr>
                            <tr>
                              <th width="30%">Mobile No.</th>
                              <td width="2%">:</td>
                              <td>{user.mobile_no}</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                        <div style={{height: "26px"}}></div>
                      <div className="card shadow-sm">
                        <div className="card-header bg-transparent border-0">
                          <h3 class="mb-0"><i class="far fa-clone pr-1"></i>Other Information</h3>
                        </div>
                        <div className="card-body pt-0">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                      </div>
                      <button class="button" onClick={() => alert('Going Back')} style ={{padding : '10px 15px 10px 15px'}}>
              Back
            </button>
                    </div>
                  </div>
                </div>
              </div>
                ))}
            </ul>
        );
    }
}
export default Profile;