
import Home from './components/Home.js';
import SignUp from './components/SignUp.js';
import SignIn from './components/SignIn.js';
import Welcome from './components/Welcome.js';

import Home from './Home.js';
import Tutor from './Tutor.js';
import Profile from './Profile.js';
import Favourites from './Favourites.js';
import About from './About.js'
import Appointments from './Appointments.js'

import React, { Component } from 'react';
import {Routes,Route} from 'react-router-dom'

class App extends Component {
    
  
      render () {
        return(
          <Routes>

            <Route path='/signup' element = {<SignUp />}></Route>
            <Route path='/signin' element = {<SignIn />}></Route>
            <Route path='/welcome' element = {<Welcome />}></Route>
            <Route path='/home' element = {<Home />}></Route>
            <Route path='/' element = {<Home />}></Route>
            <Route path='/profile' element = {<Profile />}></Route>
            <Route path='/favourites' element = {<Favourites />}></Route>
            <Route path='/about' element = {<About />}></Route>
            <Route path='/tutors' element = {<Tutor />}></Route>
            <Route path='/appointments' element = {<Appointments />}></Route>
          </Routes>
          )
 
      }
}

export default App;

