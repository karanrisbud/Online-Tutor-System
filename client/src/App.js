import Tutor_EntryPage from './components/Tutor_EntryPage.js';
import User_EntryPage from './components/User_EntryPage.js';
import Welcome from './components/Welcome.js';
import Home from './components/Home.js';
import Tutor from './components/Tutor.js';
import Profile from './components/Profile.js';
import Favourites from './components/Favourites.js';
import About from './components/About.js'
import Feedback from './components/Feedback.js'
import Reviews from './components/Reviews.js'
import Appointments from './components/Appointments.js'
import Profile_edit from './components/Profile_edit.js'
import Profile_tutor from './components/Profile_tutor.js'
import Profile_tutor_edit from './components/Profile_tutor_edit.js'
import React, { Component } from 'react';
import {Routes,Route} from 'react-router-dom'
import ScheduleAppointment from './components/ScheduleAppointment.js';
import AppointmentsTutor from './components/AppointmentsTutor.js';

class App extends Component {
    
  
      render () {
        return(
          <Routes>
            <Route path='/tutor_entry' element = {<Tutor_EntryPage />}></Route>
            <Route path='/user_entry' element = {<User_EntryPage />}></Route>
            <Route path='/welcome' element = {<Welcome />}></Route>
            <Route path='/' element = {<Home />}></Route>
            <Route path='/profile' element = {<Profile />}></Route>
            <Route path='/tutor_profile' element = {<Profile_tutor />}></Route>
            <Route path='/favourites' element = {<Favourites />}></Route>
            <Route path='/about' element = {<About />}></Route>
            <Route path='/tutors' element = {<Tutor />}></Route>
            <Route path='/feedback' element = {<Feedback />}></Route>
            <Route path='/schedule_appointment' element = {<ScheduleAppointment />}></Route>
            <Route path='/reviews' element = {<Reviews />}></Route>
            <Route path='/appointments' element = {<Appointments />}></Route>
            <Route path='/tutor_appointments' element = {<AppointmentsTutor />}></Route>
            <Route path='/profile_edit' element = {<Profile_edit />}></Route>
            <Route path='/profile_tutor_edit' element = {<Profile_tutor_edit />}></Route>
          </Routes>
          )
 
      }
}

export default App;

