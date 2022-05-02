import React, { Component } from 'react';
import Tutors from './Tutors';
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
            <nav id="sidebar">
                <div className="sidebar-header">
                    <img src="assets/images/logo.png" height="150" width="200px" />
                </div>
    
                <ul className="list-unstyled components" style={{textAlign : "left",padding:"20px 0px 0px 15px"}}>
    
    
                    <li>
                    <li>
                    <Link to = {`/profile`}><a href="#"><i className="fa fa-book" aria-hidden="true"></i>Profile</a></Link>
                    </li> 
                    </li>
    
                    <li>
                        <a href="#"><i className="fa fa-shopping-cart" aria-hidden="true"></i>Appointments</a>
                    </li>
                    <li>
                    <Link to = {`/tutors`}><a href="#"><i className="fa fa-book" aria-hidden="true"></i>Tutors</a></Link>
                    </li>    
                    <li>
                    <li>
                    <Link to = {`/favourites`}><a href="#"><i className="fa fa-book" aria-hidden="true"></i>Favourites</a></Link>
                    </li> 
                    </li>
                    <li>
                        <a href="#"><i className="fa fa-key" aria-hidden="true"></i> Change Password</a>
                    </li>
                </ul>
    
    
    
            </nav>
    
            <div id="content">
    
    
    
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
    
                        <button type="button" id="sidebarCollapse" className="btn btn-info">
                            <i className="fas fa-align-left"></i>
                            <span>Toggle Sidebar</span>
                        </button>
    
    
                           <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="fas fa-align-justify"></i>
                        </button>
    
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="nav navbar-nav ml-auto">
                                <li className="nav-item active">
                                <Link to = {`/`}><a href="#"><i className="fa fa-home" aria-hidden="true"></i>Home</a></Link>
                                </li>
                                <li>
                                    <Link to = {`/about`}><a href="#"><i className="fa fa-users" aria-hidden="true"></i>About</a></Link>
                                </li> 
                                <li className="nav-item active">
                                    <a className="nav-link" href="#"><i className="fa fa-phone" aria-hidden="true"></i> Contact</a>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link" href="#"><i className="fa fa-user" aria-hidden="true"></i> Login</a>
                                </li>
    
                            </ul>
                        </div>
                    </div>
                </nav>


    
    <Tutors tutorlist = {this.state.tutors} />

    
{/*       
        <div className="footer">
            <p>Designed by Deeprangshu Pal and Karan Sandeep Risbud &copy;</p>
        </div>
     */}
    
    
    
            
        </div>
    </div>

        );
    }
}
 
export default Home;