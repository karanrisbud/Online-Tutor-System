import React, { Component, useEffect,useState } from 'react';

function Favourite_button(props) {
    const [favourited, setfavourited] = useState(false);
    const [errorMessage,seterrorMessage] = useState(null);
    

    const handleFavourite = (e) =>{

        e.preventDefault();

        if(favourited)
        {   
            console.log('xxxx');
        }
        else{

            try{
            
            const localstorage_user = JSON.parse(localStorage.getItem('user'))
            console.log(props.tutor_id);
            fetch('http://localhost:3000/favourites/' + localstorage_user._id, {
                method: "POST",
                headers : { 
                  'Content-Type': 'application/json',
                   'Accept': 'application/json',
                   'x-auth-token': localstorage_user.token

                   
                },
                body: JSON.stringify( {  // you will get user information from login form
                    
                  "tutor_id" : props.tutor_id

                } )
              })
              .then(res => res.json())
              .then(
                  (data) => {
                    if(data)
                        setfavourited(true);
                        alert("added to favourites");

                  },
                  (error) => {
                    console.log(error);
                  }
              )
              
            }
              catch(e){
                  console.log(e);
              }

        }


        
    }

    
    useEffect(() => {
        try{

          const localstorage_user = JSON.parse(localStorage.getItem('user'))
          fetch("http://localhost:3000/favourites/favourited/" + localstorage_user._id + "/" + props.tutor_id, {
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
                      
                      if(data.result)
                      {
                          setfavourited(true);
                      }
                      else{
                          setfavourited(false);
                      }
                      console.log(favourited);

                  },
                  (error) => {
                      console.log(error);

                  }
              )}
              catch(e)
              {
                  console.log("Invalid User Token")
              }
        }, [])

    


    return (  
    <button onClick={(e) => handleFavourite(e)}>{favourited ? "Remove from Favourite" : "Add to favourite"}</button>
    );
}

export default Favourite_button;