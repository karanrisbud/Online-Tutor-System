import { useEffect } from "react";

function Welcome() {

    useEffect(() => {


            try{
                const localstorage_user = JSON.parse(localStorage.getItem('user'))
                fetch( "http://localhost:3000/welcome", {
                  method: 'get',
                  headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                      'x-auth-token': localstorage_user.token
                      
                  }
            
              })
              .then( res => res.json() )
              .then( res => console.log( res ) );
            }
            catch(e)
            {
                console.log("Invalid User Token")
            }

            



    },[])


    return (  
        <h1>Hello World</h1>
    );
}

export default Welcome;