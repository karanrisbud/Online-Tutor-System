import Home from './components/Home.js';
import Tutor from './components/Tutors.jsx';
import SignUp from './components/SignUp.js';
import SignIn from './components/SignIn.js';
import React, { Component } from 'react';
import {Routes,Route} from 'react-router-dom'

class App extends Component {
    
  
      render () {
        return(
          <Routes>
            <Route path='/SignUp' element = {<SignUp />}></Route>
            <Route path='/SignIn' element = {<SignIn />}></Route>
            <Route path='/home' element = {<Home />}></Route>
            <Route path='/tutors' element = {<Tutor />}></Route>
          </Routes>
          )
 
      }
}

export default App;

