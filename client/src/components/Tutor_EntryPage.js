import React, { Component } from 'react';
import Tutor_SignIn from './Tutor_SignIn';
import Tutor_SignUp from './Tutor_SignUp';
import Header from './Header';



class Tutor_EntryPage extends Component {
    state = { isLoginOpen :true,isRegisterOpen :false}
    showLoginBox() {
        this.setState({isLoginOpen: true, isRegisterOpen: false});
      }
    
      showRegisterBox() {
        this.setState({isRegisterOpen: true, isLoginOpen: false});
      } 
    render() { 
        return (

            <div>

            <Header />
            <div className="form">
            <div className="form-body">
                <div className='footer'>
            <button type="submit" onClick={this.showLoginBox.bind(this)} className="btn">Login</button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={this.showRegisterBox.bind(this)} type="submit" className="btn">Register</button>
            </div>

        {this.state.isLoginOpen && <Tutor_SignIn/>}
        {this.state.isRegisterOpen && <Tutor_SignUp/>}

        </div>
        </div>
        
          </div>


        );
    }
}
 
export default Tutor_EntryPage;