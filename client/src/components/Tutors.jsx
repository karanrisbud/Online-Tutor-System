import React, { Component } from "react";
import StarRatings from "react-star-ratings";

class Tutors extends Component {
  constructor() {
    super();
    this.state = {
      search: null,
      clicked: false,
      tutor_name: null,
      tutor_email: null,
      tutor_image: null,
      tutor_about_me: null,
      tutor_average_ratings: null,
      tutor_total_tutoring_hours: null,
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
      tutor_name: tutor.name,
      tutor_image: tutor.image,
      tutor_email: tutor.email,
      tutor_about_me: tutor.about_me,
      tutor_average_ratings: tutor.average_ratings,
      tutor_total_tutoring_hours: tutor.total_tutoring_hours,
      tutor_subject: tutor.subject,
    });
  };

  render() {
    if (this.state.clicked === false) {
      return (
        <div>
          <h2 style={{ textAlign: "center" }}>Renowned Professors</h2>
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
                  maxWidth: "45%",
                  float: "left",
                  height: "250px",
                  cursor: "pointer",
                  
                }}
              >
                <div className="row g-0">
                  <div className="col-md-4 py-2">
                    <img
                      src={"assets/tutor_images/" + tutor.image}
                      style={{ height: "150px", width: "250px" }}
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                    <br></br>
                    <StarRatings
                      rating={tutor.average_ratings}
                      starRatedColor="red"
                      numberOfStars={5}
                      name="rating"
                      starDimension="14px"
                      starSpacing="4px"
                    />
                    &nbsp;&nbsp;
                    <small>{tutor.average_ratings}</small>
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
          <div class="btn-group">
            <button class="button" onClick={() => this.goPrevious()} style ={{padding : '10px 15px 10px 15px'}}>
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
                    src={"assets/tutor_images/" + this.state.tutor_image}
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
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Tutors;
