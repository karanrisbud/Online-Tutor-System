import React, {useState,setState} from 'react';
import Header from './Header.js';
import './style.css'
function SignUp() {
    

    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);


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
      
        fetch('http://localhost:3000/userlogin', {
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
          .then( (data) => { 
              console.log(data);
  
              let inMemoryToken = data.token;
              console.log(inMemoryToken);
  
              localStorage.setItem('user', JSON.stringify(data));
  
              
          })
          .catch((error) => {
            console.log(error.message);
          
          });
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


    return(
        <div>
            <Header />
        <div className="form">
            <div className="form-body">

                <div className="email">
                    <label className="form__label" for="email">Email </label>
                    <input  type="email" id="email" className="form__input" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                </div>

          
                <div className="password">
                    <label className="form__label" for="password">Password </label>
                    <input className="form__input" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                </div>

            </div>
            <div class="footer">
                <button onClick={()=>handleSubmit()} type="submit" class="btn">Login</button>
            </div>
        </div>
        </div>
       
    )       
}

export default SignUp

