import Tutor_EntryPage from './components/Tutor_EntryPage.js';
import User_EntryPage from './components/User_EntryPage.js';
import Welcome from './components/Welcome.js';
import Home from './components/Home.js';
import Tutor from './components/Tutor.js';
import Profile from './components/Profile.js';
import Favourites from './components/Favourites.js';
import About from './components/About.js'
import Appointments from './components/Appointments.js'
import Profile_edit from './components/Profile_edit.js'

import React, { Component } from 'react';
import {Routes,Route} from 'react-router-dom'

class App extends Component {
    
  
      render () {
        return(
          <Routes>
            <Route path='/tutor_entry' element = {<Tutor_EntryPage />}></Route>
            <Route path='/user_entry' element = {<User_EntryPage />}></Route>
            <Route path='/welcome' element = {<Welcome />}></Route>
            <Route path='/' element = {<Home />}></Route>
            <Route path='/profile' element = {<Profile />}></Route>
            <Route path='/favourites' element = {<Favourites />}></Route>
            <Route path='/about' element = {<About />}></Route>
            <Route path='/tutors' element = {<Tutor />}></Route>
            <Route path='/appointments' element = {<Appointments />}></Route>
            <Route path='/profile_edit' element = {<Profile_edit />}></Route>
          </Routes>
          )
 
      }
}

export default App;

