import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { 
  FaBiking, 
  FaCar, 
  FaTaxi, 
  FaCarSide, 
  FaMapMarkerAlt, 
  FaCircle,
  FaExchangeAlt,
  FaClock,
  FaUsers,
  FaDollarSign,
  FaRupeeSign
} from 'react-icons/fa';

const vehicleTypes = [
  { 
    id: 1, 
    name: 'Bike', 
    icon: <FaBiking size={28} />, 
    price: 'Rs.20/km', 
    basePrice: 5,
    time: '3-5 min', 
    seats: 1,
    description: 'Quick and eco-friendly'
  },
  { 
    id: 2, 
    name: 'Auto', 
    icon: <FaTaxi size={28} />, 
    price: 'Rs.30/km', 
    basePrice: 8,
    time: '5-7 min', 
    seats: 3,
    description: 'Affordable and comfortable'
  },
  { 
    id: 3, 
    name: 'Mini', 
    icon: <FaCar size={28} />, 
    price: 'Rs.40/km', 
    basePrice: 12,
    time: '8-10 min', 
    seats: 4,
    description: 'Perfect for small groups'
  },
  { 
    id: 4, 
    name: 'SUV', 
    icon: <FaCarSide size={28} />, 
    price: 'Rs.60/km', 
    basePrice: 18,
    time: '10-12 min', 
    seats: 6,
    description: 'Spacious and luxurious'
  },
];

const BookRide = ({ user }) => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [error, setError] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const navigate = useNavigate();

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    
    const distance = 5; 
    const price = vehicle.basePrice + (distance * parseInt(vehicle.price.replace('Rs', '').replace('/km', '')));
    setEstimatedPrice(price);
  };

  const swapLocations = () => {
    const temp = pickup;
    setPickup(dropoff);
    setDropoff(temp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pickup || !dropoff || !selectedVehicle) {
      setError('Please fill in all fields and select a vehicle type');
      return;
    }
    const bookingId = Math.floor(Math.random() * 10000);
    navigate(`/ride-status/${bookingId}`);
  };

  return (
    <div className="book-ride-container">
      <Container fluid className="px-3">
        <div className="page-header mb-4">
          <h2 className="page-title">
            <FaMapMarkerAlt className="me-2" />
            Book Your Ride
          </h2>
          <p className="page-subtitle">Choose your destination and ride type</p>
        </div>

        <Row>
          <Col lg={8} xl={6} className="mx-auto">
            {/* Location Selection Card */}
            <Card className="location-card mb-4">
              <Card.Body>
                <h5 className="card-title mb-4">
                  <FaMapMarkerAlt className="me-2 text-success" />
                  Where to?
                </h5>
                
                <Form onSubmit={handleSubmit}>
                  <div className="location-inputs">
                    {/* Pickup Location */}
                    <div className="location-input-wrapper">
                      <div className="location-indicator">
                        <FaCircle className="pickup-dot" />
                      </div>
                      <Form.Control
                        type="text"
                        placeholder="Pickup location"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        className="location-input pickup-input"
                      />
                    </div>

                    
                    <div className="swap-button-wrapper">
                      <Button 
                        variant="outline-success" 
                        size="sm" 
                        className="swap-btn"
                        onClick={swapLocations}
                        type="button"
                      >
                        <FaExchangeAlt />
                      </Button>
                    </div>

                    <div className="location-input-wrapper">
                      <div className="location-indicator">
                        <FaMapMarkerAlt className="dropoff-marker" />
                      </div>
                      <Form.Control
                        type="text"
                        placeholder="Drop-off location"
                        value={dropoff}
                        onChange={(e) => setDropoff(e.target.value)}
                        className="location-input dropoff-input"
                      />
                    </div>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            <Card className="vehicle-selection-card mb-4">
              <Card.Body>
                <h5 className="card-title mb-4">
                  <FaCar className="me-2 text-success" />
                  Choose Your Ride
                </h5>
                
                {error && <Alert variant="danger" className="custom-alert">{error}</Alert>}
                
                <div className="vehicle-grid">
                  {vehicleTypes.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className={`vehicle-option ${selectedVehicle?.id === vehicle.id ? 'selected' : ''}`}
                      onClick={() => handleVehicleSelect(vehicle)}
                    >
                      <div className="vehicle-icon">
                        {vehicle.icon}
                      </div>
                      <div className="vehicle-info">
                        <h6 className="vehicle-name">{vehicle.name}</h6>
                        <p className="vehicle-description">{vehicle.description}</p>
                        <div className="vehicle-details">
                          <span className="detail-item">
                            <FaClock className="detail-icon" />
                            {vehicle.time}
                          </span>
                          <span className="detail-item">
                            <FaUsers className="detail-icon" />
                            {vehicle.seats} seats
                          </span>
                        </div>
                      </div>
                      <div className="vehicle-price">
                        <span className="price">{vehicle.price}</span>
                        {selectedVehicle?.id === vehicle.id && estimatedPrice > 0 && (
                          <span className="estimated-price">
                            Est. Rs.{estimatedPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {selectedVehicle && (
                  <div className="booking-summary">
                    <div className="summary-content">
                      <div className="selected-vehicle">
                        <span className="vehicle-icon-small">{selectedVehicle.icon}</span>
                        <span className="vehicle-name-small">{selectedVehicle.name}</span>
                      </div>
                      {estimatedPrice > 0 && (
                        <div className="estimated-total">
                          <FaRupeeSign className="dollar-icon" />
                          <span className="total-price">RS{estimatedPrice}</span>
                          <small className="price-note">Estimated fare</small>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <Button 
                  variant="success" 
                  size="lg" 
                  className="confirm-btn w-100 mt-4"
                  onClick={handleSubmit}
                  disabled={!pickup || !dropoff || !selectedVehicle}
                >
                  {selectedVehicle ? `Book ${selectedVehicle.name}` : 'Confirm Booking'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <style>{`
        .book-ride-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          padding: 2rem 0;
        }

        .page-header {
          text-align: center;
          color: white;
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

        .location-card, .vehicle-selection-card {
          background: rgba(255, 255, 255, 0.95);
          border: none;
          border-radius: 20px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
        }

        .card-title {
          color: #2c3e50;
          font-weight: 600;
        }

        .location-inputs {
          position: relative;
        }

        .location-input-wrapper {
          position: relative;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
        }

        .location-indicator {
          position: absolute;
          left: 15px;
          z-index: 2;
          width: 20px;
          text-align: center;
        }

        .pickup-dot {
          color: #4ca64c;
          font-size: 12px;
        }

        .dropoff-marker {
          color: #e74c3c;
          font-size: 16px;
        }

        .location-input {
          padding-left: 45px !important;
          height: 55px;
          border: 2px solid #e9ecef;
          border-radius: 15px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: white;
        }

        .location-input:focus {
          border-color: #4ca64c;
          box-shadow: 0 0 0 0.2rem rgba(76, 166, 76, 0.25);
          background: white;
        }

        .pickup-input:focus {
          border-color: #4ca64c;
        }

        .dropoff-input:focus {
          border-color: #e74c3c;
        }

        .swap-button-wrapper {
          display: flex;
          justify-content: center;
          margin: -10px 0;
          position: relative;
          z-index: 3;
        }

        .swap-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border: 2px solid #4ca64c;
          color: #4ca64c;
          transition: all 0.3s ease;
        }

        .swap-btn:hover {
          background: #4ca64c;
          color: white;
          transform: rotate(180deg);
        }

        .vehicle-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .vehicle-option {
          display: flex;
          align-items: center;
          padding: 1.5rem;
          border: 2px solid #e9ecef;
          border-radius: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: white;
        }

        .vehicle-option:hover {
          border-color: #4ca64c;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(76, 166, 76, 0.15);
        }

        .vehicle-option.selected {
          border-color: #4ca64c;
          background: rgba(76, 166, 76, 0.05);
          box-shadow: 0 8px 25px rgba(76, 166, 76, 0.2);
        }

        .vehicle-icon {
          flex-shrink: 0;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(76, 166, 76, 0.1);
          border-radius: 15px;
          color: #4ca64c;
          margin-right: 1rem;
        }

        .vehicle-option.selected .vehicle-icon {
          background: rgba(76, 166, 76, 0.2);
        }

        .vehicle-info {
          flex: 1;
        }

        .vehicle-name {
          font-size: 1.2rem;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 0.25rem;
        }

        .vehicle-description {
          color: #6c757d;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .vehicle-details {
          display: flex;
          gap: 1rem;
        }

        .detail-item {
          display: flex;
          align-items: center;
          font-size: 0.85rem;
          color: #6c757d;
        }

        .detail-icon {
          margin-right: 0.3rem;
          font-size: 0.8rem;
        }

        .vehicle-price {
          text-align: right;
          flex-shrink: 0;
        }

        .price {
          font-size: 1.1rem;
          font-weight: 600;
          color: #4ca64c;
          display: block;
        }

        .estimated-price {
          font-size: 0.9rem;
          color: #6c757d;
          display: block;
          margin-top: 0.25rem;
        }

        .booking-summary {
          margin-top: 2rem;
          padding: 1.5rem;
          background: rgba(76, 166, 76, 0.05);
          border-radius: 15px;
          border: 1px solid rgba(76, 166, 76, 0.2);
        }

        .summary-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .selected-vehicle {
          display: flex;
          align-items: center;
        }

        .vehicle-icon-small {
          margin-right: 0.75rem;
          color: #4ca64c;
        }

        .vehicle-name-small {
          font-weight: 600;
          color: #2c3e50;
        }

        .estimated-total {
          text-align: right;
        }

        .dollar-icon {
          color: #4ca64c;
          margin-right: 0.25rem;
        }

        .total-price {
          font-size: 1.3rem;
          font-weight: 700;
          color: #4ca64c;
        }

        .price-note {
          display: block;
          color: #6c757d;
          font-size: 0.8rem;
          margin-top: 0.25rem;
        }

        .confirm-btn {
          background: linear-gradient(135deg, #4ca64c, #45a049);
          border: none;
          border-radius: 15px;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
        }

        .confirm-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #45a049, #3d8b40);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(76, 166, 76, 0.3);
        }

        .confirm-btn:disabled {
          background: #6c757d;
          opacity: 0.6;
        }

        .custom-alert {
          border: none;
          border-radius: 10px;
          background: rgba(220, 53, 69, 0.1);
          color: #dc3545;
          border-left: 4px solid #dc3545;
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .book-ride-container {
            padding: 1rem 0;
          }

          .page-title {
            font-size: 1.5rem;
          }

          .location-input {
            height: 50px;
            font-size: 0.95rem;
          }

          .vehicle-option {
            padding: 1rem;
          }

          .vehicle-icon {
            width: 50px;
            height: 50px;
          }

          .vehicle-details {
            flex-direction: column;
            gap: 0.25rem;
          }

          .summary-content {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }

        /* Connecting line between pickup and dropoff */
        .location-inputs::before {
          content: '';
          position: absolute;
          left: 24px;
          top: 35px;
          bottom: 75px;
          width: 2px;
          background: linear-gradient(to bottom, #4ca64c, #e74c3c);
          z-index: 1;
        }
      `}</style>
    </div>
  );
};

export default BookRide;