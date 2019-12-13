import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Carousel from "react-bootstrap/Carousel";
// import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

class ContactSection extends Component {
  render() {
    return (
      <Fragment>
        <div className="w-100 py-3 px-5 mb-0 GreenBg text-center">
          <Row className="d-flex align-items-center">
            <Col sm={6}>
              <p>Have any suggestions for us? Let us know!</p>
            </Col>
            <Col sm={6}>
              <Button className="MyBtn">Contact Us</Button>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}

export default ContactSection;