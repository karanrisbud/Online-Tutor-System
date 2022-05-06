import React, { Component } from 'react';
import Tutors from './Tutors';
import Navbar from './Navbar.js'
import './dropdown_style.css'
import {Link} from 'react-router-dom';

class Home extends Component {
    state = {
        tutors:[]
      }
      componentDidMount(){
    
        fetch('tutors.json',{
        headers : {
          'Content-Type':'appication/json',
          'Accept' : 'application/json'
        }
      })
    
      .then(res => res.json())
      .then((data)=>{
        this.setState({tutors:data})
        console.log(this.state.tutors)
      })
      .catch(console.log)
      }

    render() {
         
        return (

            <div className="wrapper">
            <div id="content">

            <Navbar />



    
    <Tutors tutorlist = {this.state.tutors} />    
            
        </div>
    </div>

        );
    }
}
 
export default Home;