import React, { useState } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    const staticUser = {
      id: 1,
      name: 'Jeyapratha',
      email: formData.email,
      phone: '8610441221',
    };
    onLogin(staticUser);
    navigate('/dashboard');
  };

  return (
    <div className="auth-container">
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Card className="auth-card">
          <Card.Body>
            <div className="auth-header">
              <h2 className="auth-title">
                <FaSignInAlt className="auth-icon" />
                RIDEZY
              </h2>
              <p className="auth-subtitle">Welcome back! Please enter your details</p>
            </div>
            
            {error && <Alert variant="danger" className="custom-alert">{error}</Alert>}
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label className="auth-label">Email</Form.Label>
                <div className="input-group">
                  <span className="input-icon">
                    <FaUser />
                  </span>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="auth-input"
                  />
                </div>
              </Form.Group>
              
              <Form.Group className="mb-4">
                <Form.Label className="auth-label">Password</Form.Label>
                <div className="input-group">
                  <span className="input-icon">
                    <FaLock />
                  </span>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="auth-input"
                  />
                </div>
              </Form.Group>
              
              <Button variant="success" type="submit" className="auth-btn">
                Login
              </Button>
            </Form>
            
            <div className="auth-footer">
              <span className="auth-footer-text">Don't have an account? </span>
              <Link to="/signup" className="auth-footer-link">Sign Up</Link>
            </div>
          </Card.Body>
        </Card>
      </Container>

      <style>{`
        .auth-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          padding: 2rem 0;
        }

        .auth-card {
          width: 100%;
          max-width: 450px;
          background: rgba(255, 255, 255, 0.95);
          border: none;
          border-radius: 20px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
          padding: 2rem;
        }

        .auth-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .auth-title {
          font-size: 2rem;
          font-weight: 700;
          color: #4ca64c;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .auth-icon {
          margin-right: 0.75rem;
        }

        .auth-subtitle {
          color: #6c757d;
          font-size: 1rem;
        }

        .auth-label {
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }

        .input-group {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #4ca64c;
          z-index: 2;
        }

        .auth-input {
          padding-left: 45px !important;
          height: 50px;
          border: 2px solid #e9ecef;
          border-radius: 15px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: white;
        }

        .auth-input:focus {
          border-color: #4ca64c;
          box-shadow: 0 0 0 0.2rem rgba(76, 166, 76, 0.25);
        }

        .auth-btn {
          background: linear-gradient(135deg, #4ca64c, #45a049);
          border: none;
          border-radius: 15px;
          padding: 1rem;
          font-size: 1.1rem;
          font-weight: 600;
          width: 100%;
          margin-top: 1rem;
          transition: all 0.3s ease;
        }

        .auth-btn:hover {
          background: linear-gradient(135deg, #45a049, #3d8b40);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(76, 166, 76, 0.3);
        }

        .auth-footer {
          text-align: center;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e9ecef;
        }

        .auth-footer-text {
          color: #6c757d;
        }

        .auth-footer-link {
          color: #4ca64c;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .auth-footer-link:hover {
          color: #3d8b40;
          text-decoration: underline;
        }

        .custom-alert {
          border: none;
          border-radius: 10px;
          background: rgba(220, 53, 69, 0.1);
          color: #dc3545;
          border-left: 4px solid #dc3545;
          margin-bottom: 1.5rem;
        }

        @media (max-width: 576px) {
          .auth-card {
            padding: 1.5rem;
          }

          .auth-title {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;