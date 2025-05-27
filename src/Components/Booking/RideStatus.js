import React, { useState, useEffect } from 'react';
import { Card, Container, ProgressBar, Button, Alert, Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { 
  FaMotorcycle, 
  FaMapMarkerAlt, 
  FaUserAlt, 
  FaPhoneAlt, 
  FaStar,
  FaCar,
  FaTaxi,
  FaCarSide,
  FaClock,
  FaRoute,
  FaCheckCircle,
  FaSpinner,
  FaArrowLeft
} from 'react-icons/fa';


const driver = {
  id: 1,
  name: 'AK',
  phone: '+919876543210',
  rating: 4.8,
  vehicle: {
    type: 'Bike',
    model: 'Bajaj Pulsar 150',
    number: 'TN 60 J 2126',
  },
};

const rideStatuses = [
  { 
    id: 1, 
    status: 'pending', 
    label: 'Looking for driver', 
    progress: 25,
    description: 'We are finding the best driver for you...',
    icon: <FaSpinner className="status-icon spinning" />
  },
  { 
    id: 2, 
    status: 'accepted', 
    label: 'Driver assigned', 
    progress: 50,
    description: 'Your driver is on the way to pickup location',
    icon: <FaCheckCircle className="status-icon" />
  },
  { 
    id: 3, 
    status: 'arriving', 
    label: 'Driver arriving', 
    progress: 75,
    description: 'Driver will reach you in 2-3 minutes',
    icon: <FaRoute className="status-icon" />
  },
  { 
    id: 4, 
    status: 'in_progress', 
    label: 'Ride in progress', 
    progress: 90,
    description: 'Enjoy your ride! You will reach soon',
    icon: <FaCar className="status-icon" />
  },
  { 
    id: 5, 
    status: 'completed', 
    label: 'Ride completed', 
    progress: 100,
    description: 'Thank you for riding with us!',
    icon: <FaCheckCircle className="status-icon" />
  },
];

const getVehicleIcon = (type) => {
  switch(type.toLowerCase()) {
    case 'bike': return <FaMotorcycle size={24} />;
    case 'auto': return <FaTaxi size={24} />;
    case 'mini': return <FaCar size={24} />;
    case 'suv': return <FaCarSide size={24} />;
    default: return <FaCar size={24} />;
  }
};

const RideStatus = ({ user }) => {
  const { id } = useParams();
  const [currentStatus, setCurrentStatus] = useState(rideStatuses[0]);
  const [driverAssigned, setDriverAssigned] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState('5-7 min');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setCurrentStatus(rideStatuses[1]);
      setDriverAssigned(true);
      setEstimatedTime('3-5 min');
    }, 3000);

    const timer2 = setTimeout(() => {
      setCurrentStatus(rideStatuses[2]);
      setEstimatedTime('2-3 min');
    }, 6000);

    const timer3 = setTimeout(() => {
      setCurrentStatus(rideStatuses[3]);
      setEstimatedTime('15-20 min');
    }, 9000);

    const timer4 = setTimeout(() => {
      setCurrentStatus(rideStatuses[4]);
      setEstimatedTime('Completed');
    }, 12000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="ride-status-container">
      <Container fluid className="px-3">
        <div className="page-header mb-4">
          <h2 className="page-title">
            <FaRoute className="me-2" />
            Ride Tracking
          </h2>
          <p className="page-subtitle">Booking #{id}</p>
        </div>

        <Row>
          <Col lg={8} xl={6} className="mx-auto">
            
            <Card className="status-card mb-4">
              <Card.Body>
                <div className="status-header">
                  <div className="status-icon-wrapper">
                    {currentStatus.icon}
                  </div>
                  <div className="status-info">
                    <h4 className="status-title">{currentStatus.label}</h4>
                    <p className="status-description">{currentStatus.description}</p>
                  </div>
                  {currentStatus.status !== 'completed' && (
                    <div className="estimated-time">
                      <FaClock className="time-icon" />
                      <span className="time-text">{estimatedTime}</span>
                    </div>
                  )}
                </div>

                <div className="progress-wrapper">
                  <ProgressBar
                    now={currentStatus.progress}
                    className="custom-progress"
                    animated={currentStatus.progress < 100}
                  />
                  <div className="progress-steps">
                    {rideStatuses.map((status, index) => (
                      <div 
                        key={status.id}
                        className={`progress-step ${currentStatus.progress >= status.progress ? 'completed' : ''}`}
                      >
                        <div className="step-dot"></div>
                        <span className="step-label">{status.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card.Body>
            </Card>

            
            {driverAssigned && (
              <Card className="driver-card mb-4">
                <Card.Body>
                  <h5 className="card-title mb-4">
                    <FaUserAlt className="me-2 text-success" />
                    Your Driver
                  </h5>
                  
                  <div className="driver-info">
                    <div className="driver-avatar">
                      <FaUserAlt size={30} />
                    </div>
                    <div className="driver-details">
                      <h6 className="driver-name">{driver.name}</h6>
                      <div className="driver-rating">
                        <FaStar className="star-icon" />
                        <span className="rating-text">{driver.rating}</span>
                        <span className="rating-label">(4.8/5)</span>
                      </div>
                    </div>
                    <div className="contact-actions">
                      <Button variant="success" size="sm" className="contact-btn">
                        <FaPhoneAlt className="me-1" />
                        Call
                      </Button>
                    </div>
                  </div>

                  <div className="vehicle-info">
                    <div className="vehicle-icon">
                      {getVehicleIcon(driver.vehicle.type)}
                    </div>
                    <div className="vehicle-details">
                      <h6 className="vehicle-model">{driver.vehicle.model}</h6>
                      <p className="vehicle-number">{driver.vehicle.number}</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            )}

           
            <Card className="trip-details-card mb-4">
              <Card.Body>
                <h5 className="card-title mb-4">
                  <FaMapMarkerAlt className="me-2 text-success" />
                  Trip Details
                </h5>
                
                <div className="location-details">
                  <div className="location-item pickup">
                    <div className="location-indicator">
                      <div className="pickup-dot"></div>
                    </div>
                    <div className="location-info">
                      <span className="location-label">Pickup Location</span>
                      <p className="location-address">123 Main Street, Downtown Area</p>
                    </div>
                  </div>

                  <div className="location-connector"></div>

                  <div className="location-item dropoff">
                    <div className="location-indicator">
                      <FaMapMarkerAlt className="dropoff-marker" />
                    </div>
                    <div className="location-info">
                      <span className="location-label">Drop-off Location</span>
                      <p className="location-address">456 Central Avenue, Business District</p>
                    </div>
                  </div>
                </div>

                <div className="trip-summary">
                  <div className="summary-item">
                    <span className="summary-label">Distance</span>
                    <span className="summary-value">5.2 km</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Fare</span>
                    <span className="summary-value">Rs.120.50</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Payment</span>
                    <span className="summary-value">Cash</span>
                  </div>
                </div>
              </Card.Body>
            </Card>

            
            {currentStatus.status === 'completed' && (
              <Alert className="completion-alert">
                <FaCheckCircle className="alert-icon" />
                <div className="alert-content">
                  <h6>Ride Completed Successfully!</h6>
                  <p>Thank you for choosing Ridezy. Rate your experience to help us improve.</p>
                  <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} className="rating-star" />
                    ))}
                  </div>
                </div>
              </Alert>
            )}

            <div className="action-buttons">
              <Button 
                as={Link} 
                to="/dashboard" 
                variant="outline-light" 
                className="back-btn"
              >
                <FaArrowLeft className="me-2" />
                Back to Dashboard
              </Button>
              
              {currentStatus.status === 'completed' && (
                <Button 
                  as={Link} 
                  to="/book-ride" 
                  variant="success" 
                  className="book-again-btn"
                >
                  Book Another Ride
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Container>

      <style>{`
        .ride-status-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          padding: 2rem 0;
        }

        .page-header {
          text-align: center;
          color: white;
          margin-bottom: 2rem;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 700;
          color: #4ca64c;
          margin-bottom: 0.5rem;
        }

        .page-subtitle {
          color: #b0b0b0;
          font-size: 1.1rem;
        }

        .status-card, .driver-card, .trip-details-card {
          background: rgba(255, 255, 255, 0.95);
          border: none;
          border-radius: 20px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
        }

        .card-title {
          color: #2c3e50;
          font-weight: 600;
          font-size: 1.2rem;
        }

        /* Status Header */
        .status-header {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
        }

        .status-icon-wrapper {
          width: 60px;
          height: 60px;
          background: rgba(76, 166, 76, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1rem;
          flex-shrink: 0;
        }

        .status-icon {
          color: #4ca64c;
          font-size: 1.5rem;
        }

        .spinning {
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .status-info {
          flex: 1;
        }

        .status-title {
          color: #2c3e50;
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .status-description {
          color: #6c757d;
          margin-bottom: 0;
        }

        .estimated-time {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .time-icon {
          color: #4ca64c;
          font-size: 1.2rem;
          margin-bottom: 0.25rem;
        }

        .time-text {
          font-weight: 600;
          color: #2c3e50;
          font-size: 0.9rem;
        }

        /* Progress Bar */
        .progress-wrapper {
          position: relative;
        }

        .custom-progress {
          height: 8px;
          background-color: rgba(76, 166, 76, 0.2);
          border-radius: 10px;
          margin-bottom: 2rem;
        }

        .custom-progress .progress-bar {
          background: linear-gradient(90deg, #4ca64c, #45a049);
          border-radius: 10px;
        }

        .progress-steps {
          display: flex;
          justify-content: space-between;
          position: relative;
          margin-top: 1rem;
        }

        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
        }

        .step-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #e9ecef;
          border: 2px solid #e9ecef;
          margin-bottom: 0.5rem;
          transition: all 0.3s ease;
        }

        .progress-step.completed .step-dot {
          background: #4ca64c;
          border-color: #4ca64c;
        }

        .step-label {
          font-size: 0.75rem;
          color: #6c757d;
          text-align: center;
          max-width: 80px;
        }

        .progress-step.completed .step-label {
          color: #4ca64c;
          font-weight: 600;
        }

        /* Driver Info */
        .driver-info {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .driver-avatar {
          width: 60px;
          height: 60px;
          background: rgba(76, 166, 76, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1rem;
          color: #4ca64c;
        }

        .driver-details {
          flex: 1;
        }

        .driver-name {
          color: #2c3e50;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .driver-rating {
          display: flex;
          align-items: center;
        }

        .star-icon {
          color: #ffc107;
          margin-right: 0.25rem;
        }

        .rating-text {
          font-weight: 600;
          color: #2c3e50;
          margin-right: 0.5rem;
        }

        .rating-label {
          color: #6c757d;
          font-size: 0.9rem;
        }

        .contact-btn {
          background: linear-gradient(135deg, #4ca64c, #45a049);
          border: none;
          border-radius: 8px;
          padding: 0.5rem 1rem;
        }

        .vehicle-info {
          display: flex;
          align-items: center;
          padding: 1rem;
          background: rgba(76, 166, 76, 0.05);
          border-radius: 12px;
          border: 1px solid rgba(76, 166, 76, 0.2);
        }

        .vehicle-icon {
          width: 50px;
          height: 50px;
          background: rgba(76, 166, 76, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1rem;
          color: #4ca64c;
        }

        .vehicle-model {
          color: #2c3e50;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .vehicle-number {
          color: #6c757d;
          margin-bottom: 0;
          font-family: monospace;
          font-weight: 600;
        }

        /* Location Details */
        .location-details {
          position: relative;
          margin-bottom: 2rem;
        }

        .location-item {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }

        .location-indicator {
          width: 30px;
          display: flex;
          justify-content: center;
          margin-right: 1rem;
        }

        .pickup-dot {
          width: 12px;
          height: 12px;
          background: #4ca64c;
          border-radius: 50%;
        }

        .dropoff-marker {
          color: #e74c3c;
          font-size: 16px;
        }

        .location-info {
          flex: 1;
        }

        .location-label {
          font-size: 0.9rem;
          color: #6c757d;
          display: block;
          margin-bottom: 0.25rem;
        }

        .location-address {
          color: #2c3e50;
          font-weight: 500;
          margin-bottom: 0;
        }

        .location-connector {
          position: absolute;
          left: 14px;
          top: 30px;
          bottom: 30px;
          width: 2px;
          background: linear-gradient(to bottom, #4ca64c, #e74c3c);
          z-index: 1;
        }

        /* Trip Summary */
        .trip-summary {
          display: flex;
          justify-content: space-between;
          padding: 1rem;
          background: rgba(76, 166, 76, 0.05);
          border-radius: 12px;
          border: 1px solid rgba(76, 166, 76, 0.2);
        }

        .summary-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .summary-label {
          font-size: 0.85rem;
          color: #6c757d;
          margin-bottom: 0.25rem;
        }

        .summary-value {
          font-weight: 600;
          color: #2c3e50;
        }

        /* Completion Alert */
        .completion-alert {
          background: rgba(76, 166, 76, 0.1);
          border: 1px solid rgba(76, 166, 76, 0.3);
          border-radius: 15px;
          padding: 1.5rem;
          display: flex;
          align-items: flex-start;
        }

        .alert-icon {
          color: #4ca64c;
          font-size: 1.5rem;
          margin-right: 1rem;
          margin-top: 0.25rem;
        }

        .alert-content h6 {
          color: #2c3e50;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .alert-content p {
          color: #6c757d;
          margin-bottom: 1rem;
        }

        .rating-stars {
          display: flex;
          gap: 0.5rem;
        }

        .rating-star {
          color: #ddd;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .rating-star:hover,
        .rating-star.active {
          color: #ffc107;
        }

        /* Action Buttons */
        .action-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 2rem;
        }

        .back-btn {
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          border-radius: 12px;
          padding: 0.75rem 1.5rem;
          font-weight: 500;
        }

        .back-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.5);
          color: white;
        }

        .book-again-btn {
          background: linear-gradient(135deg, #4ca64c, #45a049);
          border: none;
          border-radius: 12px;
          padding: 0.75rem 1.5rem;
          font-weight: 500;
        }

        .book-again-btn:hover {
          background: linear-gradient(135deg, #45a049, #3d8b40);
          transform: translateY(-2px);
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .ride-status-container {
            padding: 1rem 0;
          }

          .page-title {
            font-size: 1.5rem;
          }

          .status-header {
            flex-direction: column;
            text-align: center;
          }

          .status-icon-wrapper {
            margin-right: 0;
            margin-bottom: 1rem;
          }

          .estimated-time {
            margin-top: 1rem;
          }

          .driver-info {
            flex-direction: column;
            text-align: center;
          }

          .driver-avatar {
            margin-right: 0;
            margin-bottom: 1rem;
          }

          .trip-summary {
            flex-direction: column;
            gap: 1rem;
          }

          .action-buttons {
            flex-direction: column;
          }

          .progress-steps {
            flex-direction: column;
            gap: 1rem;
          }

          .progress-step {
            flex-direction: row;
            justify-content: flex-start;
          }

          .step-dot {
            margin-right: 1rem;
            margin-bottom: 0;
          }

          .step-label {
            max-width: none;
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
};

export default RideStatus;
