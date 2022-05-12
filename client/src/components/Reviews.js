import React, { Component, useState ,useEffect} from 'react';
import Navbar from './Navbar';
import {Link} from 'react-router-dom';
import StarRatings from "react-star-ratings";

function Reviews() {

    const [reviews,setReviews] = useState([]);
    const [count,setCount] = useState(0);



    useEffect(() => {

        try{

            const localstorage_user = JSON.parse(localStorage.getItem('user'))
            fetch("http://localhost:3000/feedback/"+localStorage.getItem("tutor_id"), {
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
                        setReviews(data);
                        console.log(data);
                    },
                )
        }
        catch(e){
            console.log(e);
        }


    },[])


    return (  
        <div>
            <Navbar />
            <Link to = "/tutors"><a href="#"></a>
            <button type="submit" class="btn" style={{margin : "20px"}}>
                Back
            </button></Link> &nbsp;&nbsp;
            

            <table  className="table table-bordered table-light" style={{width:"80%",marginLeft:"10%"}}>
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Comment</th>
                    <th scope="col">Rating</th>
                    </tr>
                </thead>
            <tbody>

                {reviews.map((item, i) => (
                    <tr key={i}>
                        <td>{i+1}</td>
                        <td>{item.comment}</td>
                        <td>
                        <StarRatings
                            rating={item.rating}
                            starRatedColor="red"
                            numberOfStars={5}
                            name="rating"
                            starDimension="14px"
                            starSpacing="4px"
                        />
                        &nbsp;&nbsp; &nbsp; &nbsp; {item.rating}/5
                        </td>
                        
                        

                    </tr>
                ))}
            </tbody>
            </table>
            

        </div>
    );
}

export default Reviews;