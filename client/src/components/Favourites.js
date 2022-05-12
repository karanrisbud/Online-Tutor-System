import React, { useState, useEffect }  from 'react';
import Navbar from './Navbar.js'
import {Link} from 'react-router-dom';

const Favourites = () => {
const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    const [count, setCount] = React.useState(0);

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
                    setCount(50);
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
        fetch("http://localhost:3000/favourites/"+localstorage_user._id, {

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
      },[count])
if (error) {
        return <div>Error: {error.message}</div>;
    } 
     else {
         console.log(users)

         return (

          <div>
            <Navbar />
            <Link to = "/"><a href="#"></a>
            <button type="submit" class="btn" style={{margin : "20px"}}>
                Back
            </button></Link> &nbsp;&nbsp;
            
            <h2 style={{textAlign:"center",color:"white"}}>List of Favourite Tutors</h2>
            <table  className="table table-bordered table-light" style={{width:"80%",marginLeft:"10%"}}>
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tutor Name</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
            <tbody>

                {users.map((tutor, i) => (
                    <tr key={i}>

                        <td>{i+1}</td>
                        <td>{tutor.tutor_name}</td>
                        <td>{tutor.subject}</td>
                        <td>
                          <button className="button" 
                          onClick={() => handleFavourite(tutor)}>Remove</button>
                        </td>
 
                        
                        

                    </tr>
                ))}
            </tbody>
            </table>
            

        </div>
            
            
        );

    }
}
export default Favourites;