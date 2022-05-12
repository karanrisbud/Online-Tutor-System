import React, { useState, useEffect }  from 'react';
import Navbar from './Navbar.js'
import {Link} from 'react-router-dom';

const Appointments = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    const [count, setCount] = React.useState(0);

    const handleDelete =(user) => {

      try{
        const localstorage_user = JSON.parse(localStorage.getItem('user'));
          fetch("http://localhost:3000/appointments/" + user._id + "/" + user.date, {
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
                    
                    if(data.status == "error")
                    {
                      alert(data.message);
                                     
                    }
                    else{
                      alert("Appointment Cancelled Successfully");
                      setCount(50);
                    }
                   
                  },

              )}
              catch(e)
              {
                  console.log("Invalid User Token")
              }

    }

    useEffect(() => {
      try{

      const localstorage_user = JSON.parse(localStorage.getItem('user'));

      fetch( "http://localhost:3000/appointments/"+localstorage_user._id, {
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
            setCount(100);
      }, [count])
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
                    <th scope="col">Tutor Name</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
            <tbody>

                {users.map((user, i) => (
                    <tr key={i}>

                        <td>{i+1}</td>
                        <td>{user.tutor_name}</td>
                        <td>{user.subject}</td>
                        <td>{user.date}</td>
                        <td>{user.time}</td>
                        <td>
                          <button className="button" 
                          onClick={() => handleDelete(user)}>Cancel</button>
                        </td>
 
                        
                        

                    </tr>
                ))}
            </tbody>
            </table>
            

        </div>
            
            
        );
    }
}
export default Appointments;