import React, {useState,setState} from 'react';
import Header from './Header.js';
import './style.css'
function Tutor_SignIn() {
    

    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [errorMessage,seterrorMessage] = useState(null);


    const handleInputChange = (e) => {
        const {id , value} = e.target;

        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }


    }

    const handleSubmit  = () => {
      
        fetch('http://localhost:3000/tutorlogin', {
            method: "POST",
            headers : { 
              'Content-Type': 'application/json',
               'Accept': 'application/json'
            },
            body: JSON.stringify( { 
              "email" : email,
              "password" : password       
            } )
          })

          .then( res => res.json() )
          .then( 
                (data) => { 
                    if(data.status == 'error')
                        seterrorMessage(data.message);
                    else
                    {
                        let inMemoryToken = data.token;
                        console.log(inMemoryToken);
                        localStorage.setItem('tutor', JSON.stringify(data));
                        alert("logined Succesfully");
                        window.location.href = '/';
                    }

              
            })
          .catch((error) => {
            console.log(error.message);
          
          });

    }


    return(
        <div>
            
  
            <p style={{textAlign:"center",color:"red"}}>{errorMessage}</p>

                <div className="email">
                    <label className="form__label" for="email">Email </label>
                    <input  type="email" id="email" className="form__input" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                </div>

          
                <div className="password">
                    <label className="form__label" for="password">Password </label>
                    <input className="form__input" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                </div>

            
            <div className="footer">
                <button onClick={()=>handleSubmit()} type="submit" class="btn">Login</button>
            </div>
        </div>
        
       
    )       
}

export default Tutor_SignIn;

