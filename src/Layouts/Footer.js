import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-4 mt-auto">
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5>Ridezy</h5>
            <p>Your reliable ride booking service.</p>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="#about" className="text-white">About Us</a></li>
              <li><a href="#contact" className="text-white">Contact</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <address>
              <p>Email: info@rideease.com</p>
              <p>Phone: +1 (123) 456-7890</p>
            </address>
          </Col>
        </Row>
        <hr className="bg-light" />
        <div className="text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} Ridezy. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;