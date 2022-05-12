import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import Favourite_button from "./Favourite_button";
import {Routes,Route} from 'react-router-dom'
import {Link} from "react-router-dom";

class Tutor_details extends Component {
  constructor() {
    super();
    this.state = {
      search: null,
      clicked: false,
      tutor_id : null,
      tutor_name: null,
      tutor_email: null,
      tutor_image: null,
      tutor_about_me: null,
      tutor_average_ratings: 0,
      tutor_total_tutoring_hours: 0,
      tutor_subject: null,
    };
  }

  

  searchSpace = (event) => {
    let keyword = event.target.value;
    this.setState({ search: keyword });
  };

  goPrevious = () => {
    this.setState({
      clicked: !this.state.clicked,
    });
  };

  handleClick = (tutor) => {
    this.setState({
      clicked: !this.state.clicked,
    });
    this.setState({
      tutor_id : tutor._id,
      tutor_name: tutor.name,
      
      tutor_email: tutor.email,
      tutor_about_me: tutor.about_me,     
      tutor_subject: tutor.subject,
    });
    console.log(tutor.image);
    console.log(tutor.image);
    console.log(tutor.image);
    if(tutor.image)
    
      this.setState({tutor_image :"assets/tutor_images/" + tutor.image});
    else
      this.setState({tutor_image : "assets/tutor_images/prof_default.jpg"})
    localStorage.setItem('tutor_id',tutor._id);

    try{
      const localstorage_user = JSON.parse(localStorage.getItem('user'));
      const localstorage_tutor = localStorage.getItem('tutor_id');
      fetch("http://localhost:3000/appointments_tutor/"+localstorage_tutor, {
      method: 'get',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'x-auth-token': localstorage_user.token
          
      }

  })
        .then(res => res.json())
        .then(
            (data) => {
              this.setState({tutor_total_tutoring_hours: data.length});
            },

        )
    }
    catch(e)
    {
      console.log("Invalid token");
    }
    try{
      const localstorage_user = JSON.parse(localStorage.getItem('user'))
      const localstorage_tutor = localStorage.getItem('tutor_id')
        fetch("http://localhost:3000/feedback/"+localstorage_tutor, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-auth-token': localstorage_user.token
            
        }
  
    })
          .then(res => res.json())
          .then(
              (data) => {
                if(data.length>0){
                var tot = 0
                console.log(data)
                for (let i = 0; i < data.length; i++) {
                    tot = tot + data[i]["rating"]
                }
                this.setState({tutor_average_ratings:tot/data.length});
              }
              },

          )
      }
      catch(e)
      {
        console.log("Invalid token");
      }





    
  };

  render() {
    if (this.state.clicked === false) {
      return (
        <div>
          <h2 style={{ textAlign: "center" }}>Reknowned Professors</h2>
          <input
            type="text"
            placeholder="Search Tutor/Subject"
            onChange={(e) => this.searchSpace(e)}
            style={{ marginLeft: "10px" }}
          />

          <br></br>

          {this.props.tutorlist
            .filter((tutor) => {
              if (this.state.search == null) return tutor;
              else if (
                tutor.name
                  .toLowerCase()
                  .includes(this.state.search.toLowerCase()) ||
                tutor.subject
                  .toLowerCase()
                  .includes(this.state.search.toLowerCase())
              ) {
                return tutor;
              }
            })
            .map((tutor, id) => (
              <div
                className="card mb-3"
                onClick={() => this.handleClick(tutor)}
                style={{
                  width: "45%",
                  float: "left",
                  height: "250px",
                  cursor: "pointer",
                  
                }}
              >
                <div className="row g-0">
                  <div className="col-md-4 py-2">
                    <img
                        src={"assets/tutor_images/" + tutor.image}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src="assets/tutor_images/prof_default.jpg";
                        }}
                      
                      style={{ height: "150px", width: "250px" }}
                      className="img-fluid rounded-start"
                      
                    />
                    <br></br>

                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{tutor.name}</h5>
                      <p className="card-text">{tutor.subject}</p>

                      <p
                        className="card-text"
                      >
                        <small className="text-muted">{tutor.about_me}</small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      );
    } else {
      return (
        <div>
          <div className="btn-group">
            <button className="button" onClick={() => this.goPrevious()} style ={{margin : '10px 15px 10px 15px'}}>
              Back
            </button>
          </div>
          <div className="container bootstrap snippets bootdey">
            <div className="panel-body inf-content">
              <div className="row">
                <div className="col-md-4">
                  <img
                    alt=""
                    style={{ width: "600px" }}
                    title=""
                    className="img-circle img-thumbnail isTooltip"
                    src={this.state.tutor_image}
                    data-original-title="Usuario"
                  />
                  <ul
                    title="Ratings"
                    className="list-inline ratings text-center"
                  >
                    <li>
                      <a href="#">
                        <span className="glyphicon glyphicon-star"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="glyphicon glyphicon-star"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="glyphicon glyphicon-star"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="glyphicon glyphicon-star"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="glyphicon glyphicon-star"></span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <div className="table-responsive">
                    <table className="table table-user-information">
                      <tbody>
                        <tr>
                          <td>
                            <strong>
                              <span className="glyphicon glyphicon-user  text-primary"></span>
                              Name
                            </strong>
                          </td>
                          <td className="text-primary">
                            {this.state.tutor_name}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>
                              <span className="glyphicon glyphicon-eye-open text-primary"></span>
                              Email
                            </strong>
                          </td>
                          <td className="text-primary">
                            {this.state.tutor_email}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>
                              <span className="glyphicon glyphicon-envelope text-primary"></span>
                              Subject
                            </strong>
                          </td>
                          <td className="text-primary">
                            {this.state.tutor_subject}
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <strong>
                              <span className="glyphicon glyphicon-envelope text-primary"></span>
                              About Me
                            </strong>
                          </td>
                          <td className="text-primary">
                            {this.state.tutor_about_me}
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <strong>
                              <span className="glyphicon glyphicon-envelope text-primary"></span>
                              Total Tutoring Hours
                            </strong>
                          </td>
                          <td className="text-primary">
                            {this.state.tutor_total_tutoring_hours}
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <strong>
                              <span className="glyphicon glyphicon-envelope text-primary"></span>
                              Average Ratings
                            </strong>
                          </td>
                          <td className="text-primary">
                          <StarRatings
                      rating={this.state.tutor_average_ratings}
                      starRatedColor="red"
                      numberOfStars={5}
                      name="rating"
                      starDimension="20px"
                      starSpacing="5px"
                    />
                     &nbsp;&nbsp;
                  {this.state.tutor_average_ratings}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    
                  </div>
                  
                </div>
                
              </div>
              <div style={{marginLeft:"20%"}}>
              <Favourite_button
                     tutor_id = {this.state.tutor_id} />

                     &nbsp;&nbsp;

                
                    <Link to= '/feedback'>
                        <button type="button">
                              Give Feedback
                        </button>
                    </Link>

                    &nbsp;&nbsp;

                    <Link to= '/reviews'>
                        <button type="button">
                              Reviews
                        </button>
                    </Link>

                    &nbsp;&nbsp;

                    <Link to= '/schedule_appointment'>
                        <button type="button">
                              Book Appointment
                        </button>
                    </Link>
                    </div>


            </div>
          </div>
        </div>
      );
    }
  }
}

export default Tutor_details;
