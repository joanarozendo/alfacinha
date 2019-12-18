import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
// import Carousel from "react-bootstrap/Carousel";

// import { loadUserInformation as loadUserInformationService } from "./../../services/authentication";

import "./style.css";

class UserProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    };
    console.log(this.state.user);
  }

  async componentDidMount() {
    // const id = this.props.match.params.id;
    const id = this.props.user
    console.log('heyyy',this.props)
    // const id = this.props.user._id;
    console.log("SHOW ME THE IDDDD", id);
    try {
      // const user = await loadUserInformationService(id);
      this.setState({
        user: this.props.user
      });
    } catch (error) {
      console.log(error);
      this.props.history.push("/error/404");
    }
  }

  render() {
    const user = this.state.user;
    //console.log("SHOW ME THE PROPS", this.props.user._id);
    //const id = this.props.match.params.id;
   const userFavorites = this.state.user.favorites;
   const id = this.state.user._id;
    return (
      <div className="MinPageHeight my-5 mx-5 justify-content-center UserProfileBg">
        {(user && (
          <Container>
            <Row className="mb-5">
              <Col
                sm={9}
                className="d-flex justify-content-end align-items-end"
              >
                <h1 className="text-right">{user.name}</h1>
              </Col>
              <Col
                sm={3}
                className="d-flex justify-content-end align-items-end"
              >
                <Image
                  fluid
                  src={user.image}
                  alt="User profile pic"
                  className="UserProfileImg m-0 p-0"
                />
              </Col>
            </Row>
            <Row className="my-1">
              <Col
                sm={12}
                className="d-flex justify-content-start align-items-center"
              >
                <h4 className="text-left">About Me</h4>
              </Col>
            </Row>
            <Row className="my-1">
              <Col
                sm={12}
                className="d-flex justify-content-start align-items-center"
              >
                <p className="text-left">{user.aboutMe}</p>
              </Col>
            </Row>
            {userFavorites && (
              <Fragment>
                <Row className="my-1">
                  <Col
                    sm={12}
                    className="d-flex justify-content-end align-items-center"
                  >
                    <h4 className="text-right">My Favorites</h4>
                  </Col>
                </Row>
                <Row className="my-1">
                  <Col
                    sm={12}
                    className="d-flex justify-content-end align-items-center"
                  >
                    <ul className="text-right">
                      {userFavorites.map(userFavorite => {
                        return (
                          <li className="text-right">
                            <Link to={`/restaurant/${userFavorite.resId}`}>
                              {/* {userFavorite.image} */}
                              {userFavorite.name}
                              {userFavorite.location}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </Col>
                </Row>
              </Fragment>
            )}
            {userFavorites.length === 0 && (
              <Fragment>
                <Row className="my-1">
                  <Col
                    sm={12}
                    className="d-flex justify-content-end align-items-center"
                  >
                    <p className="text-right">
                      You have no favorites yet. Browse through our lists to
                      find some you like!
                    </p>
                  </Col>
                </Row>
              </Fragment>
            )}
            <Row className="my-1">
              <Col
                sm={12}
                className="d-flex justify-content-start align-items-center"
              >
                <Link className="btn MyBtn" to={`/user-profile/edit`}>
                  Edit Profile
                </Link>
              </Col>
            </Row>
          </Container>
        )) || <p>There's no user logged in...</p>}
      </div>
    );
  }
}

export default UserProfileView;
