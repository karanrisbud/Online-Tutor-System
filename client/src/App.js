import Home from './Home.js';
import Tutor from './Tutor.js';
import React, { Component } from 'react';
import {Routes,Route} from 'react-router-dom'

class App extends Component {
    
  
      render () {
        return(
          <Routes>
            <Route path='/' element = {<Home />}></Route>
            <Route path='/tutors' element = {<Tutor />}></Route>
          </Routes>
          )
 
      }
}

export default App;

