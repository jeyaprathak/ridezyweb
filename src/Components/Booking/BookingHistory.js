import React from 'react';
import { Card, Container, Badge, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaHistory, 
  FaMapMarkerAlt, 
  FaCalendarAlt,
  FaCar,
  FaDollarSign,
  FaEye,
  FaBiking,
  FaTaxi,
  FaCarSide,
  FaCircle,
  FaRoute,
  FaRupeeSign
} from 'react-icons/fa';


const bookings = [
  {
    id: 1234,
    date: '2023-05-15',
    time: '2:30 PM',
    pickup: '123 Main St',
    dropoff: '456 Central Ave',
    vehicle: 'Mini',
    status: 'completed',
    amount: '250',
    distance: '4.2 km',
    duration: '18 min'
  },
  {
    id: 1235,
    date: '2023-05-10',
    time: '9:15 AM',
    pickup: '789 Park Boulevard',
    dropoff: '321 Market Street',
    vehicle: 'Bike',
    status: 'completed',
    amount: '200',
    distance: '2.1 km',
    duration: '12 min'
  },
  {
    id: 1236,
    date: '2023-05-05',
    time: '6:45 PM',
    pickup: '555 Oak Lane',
    dropoff: '999 Pine Road',
    vehicle: 'SUV',
    status: 'cancelled',
    amount: '100',
    distance: '6.8 km',
    duration: '25 min'
  },
  {
    id: 1237,
    date: '2023-05-02',
    time: '11:20 AM',
    pickup: '777 Beach Drive',
    dropoff: '888 Hill Street',
    vehicle: 'Auto',
    status: 'completed',
    amount: '120',
    distance: '3.5 km',
    duration: '15 min'
  }
];

const getStatusBadge = (status) => {
  switch (status) {
    case 'completed':
      return <Badge className="status-badge status-completed bg-black">Completed</Badge>;
    case 'cancelled':
      return <Badge className="status-badge status-cancelled bg-black">Cancelled</Badge>;
    case 'ongoing':
      return <Badge className="status-badge status-ongoing bg-black">Ongoing</Badge>;
    default:
      return <Badge className="status-badge status-unknown bg-black">Unknown</Badge>;
  }
};

const getVehicleIcon = (vehicle) => {
  switch (vehicle.toLowerCase()) {
    case 'bike':
      return <FaBiking className="vehicle-icon-small" />;
    case 'auto':
      return <FaTaxi className="vehicle-icon-small" />;
    case 'mini':
      return <FaCar className="vehicle-icon-small" />;
    case 'suv':
      return <FaCarSide className="vehicle-icon-small" />;
    default:
      return <FaCar className="vehicle-icon-small" />;
  }
};

const BookingHistory = ({ user }) => {
  return (
    <div className="booking-history-container">
      <Container fluid className="px-3">
        <div className="page-header mb-4">
          <h2 className="page-title">
            <FaHistory className="me-2" />
            Booking History
          </h2>
          <p className="page-subtitle">Track all your previous rides</p>
        </div>

        <Row>
          <Col lg={10} xl={8} className="mx-auto">
            <Card className="history-card">
              <Card.Body>
                <div className="card-header-custom mb-4">
                  <h5 className="card-title">
                    <FaRoute className="me-2 text-success" />
                    Your Rides
                  </h5>
                  <span className="total-rides">{bookings.length} total rides</span>
                </div>

                <div className="bookings-list">
                  {bookings.map((booking, index) => (
                    <div key={booking.id} className="booking-item">
                      <div className="booking-main">
                        <div className="booking-left">
                          <div className="vehicle-section">
                            <div className="vehicle-icon-wrapper">
                              {getVehicleIcon(booking.vehicle)}
                            </div>
                            <div className="vehicle-details">
                              <span className="vehicle-name">{booking.vehicle}</span>
                              <span className="booking-id">{booking.id}</span>
                            </div>
                          </div>

                          <div className="journey-section">
                            <div className="location-item pickup-location">
                              <FaCircle className="location-dot pickup-dot" />
                              <span className="location-text">{booking.pickup}</span>
                            </div>
                            <div className="journey-line"></div>
                            <div className="location-item dropoff-location">
                              <FaMapMarkerAlt className="location-dot dropoff-dot" />
                              <span className="location-text">{booking.dropoff}</span>
                            </div>
                          </div>
                        </div>

                        <div className="booking-right">
                          <div className="booking-meta">
                            <div className="date-time">
                              <FaCalendarAlt className="meta-icon" />
                              <div className="date-time-text">
                                <span className="date">{booking.date}</span>
                                <span className="time">{booking.time}</span>
                              </div>
                            </div>
                            
                            <div className="trip-stats">
                              <div className="stat-item">
                                <span className="stat-label">Distance</span>
                                <span className="stat-value">{booking.distance}</span>
                              </div>
                              <div className="stat-item">
                                <span className="stat-label">Duration</span>
                                <span className="stat-value">{booking.duration}</span>
                              </div>
                            </div>
                          </div>

                          <div className="booking-actions">
                            <div className="amount-section">
                              <FaRupeeSign className="dollar-icon" />
                              <span className="amount">{booking.amount}</span>
                            </div>
                            
                            <div className="status-action">
                              {getStatusBadge(booking.status)}
                              <Link 
                                to={`/ride-status/${booking.id}`} 
                                className="view-btn"
                              >
                                <FaEye className="me-1" />
                                View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {bookings.length === 0 && (
                  <div className="empty-state">
                    <FaHistory className="empty-icon" />
                    <h5>No rides yet</h5>
                    <p>Your booking history will appear here after your first ride.</p>
                    <Link to="/book-ride" className="btn btn-success">
                      Book Your First Ride
                    </Link>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <style>{`
        .booking-history-container {
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

        .history-card {
          background: rgba(255, 255, 255, 0.95);
          border: none;
          border-radius: 20px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
        }

        .card-header-custom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 1rem;
          border-bottom: 2px solid #f8f9fa;
        }

        .card-title {
          color: #2c3e50;
          font-weight: 600;
          margin: 0;
        }

        .total-rides {
          color: #6c757d;
          font-size: 0.9rem;
          background: rgba(76, 166, 76, 0.1);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
        }

        .bookings-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .booking-item {
          background: white;
          border: 2px solid #f8f9fa;
          border-radius: 15px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .booking-item:hover {
          border-color: #4ca64c;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(76, 166, 76, 0.15);
        }

        .booking-main {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 2rem;
        }

        .booking-left {
          flex: 1;
          display: flex;
          gap: 1.5rem;
        }

        .vehicle-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        .vehicle-icon-wrapper {
          width: 50px;
          height: 50px;
          background: rgba(76, 166, 76, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4ca64c;
        }

        .vehicle-icon-small {
          font-size: 24px;
        }

        .vehicle-details {
          display: flex;
          flex-direction: column;
        }

        .vehicle-name {
          font-weight: 600;
          color: #2c3e50;
          font-size: 1.1rem;
        }

        .booking-id {
          color: #6c757d;
          font-size: 0.85rem;
        }

        .journey-section {
          flex: 1;
          position: relative;
        }

        .location-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .location-item:last-child {
          margin-bottom: 0;
        }

        .location-dot {
          flex-shrink: 0;
          font-size: 12px;
        }

        .pickup-dot {
          color: #4ca64c;
        }

        .dropoff-dot {
          color: #e74c3c;
          font-size: 14px;
        }

        .location-text {
          color: #2c3e50;
          font-size: 0.95rem;
          line-height: 1.2;
        }

        .journey-line {
          position: absolute;
          left: 6px;
          top: 20px;
          bottom: 35px;
          width: 2px;
          background: linear-gradient(to bottom, #4ca64c, #e74c3c);
        }

        .booking-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1rem;
          flex-shrink: 0;
        }

        .booking-meta {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: flex-end;
        }

        .date-time {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .meta-icon {
          color: #4ca64c;
          font-size: 0.9rem;
        }

        .date-time-text {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .date {
          color: #2c3e50;
          font-weight: 500;
          font-size: 0.95rem;
        }

        .time {
          color: #6c757d;
          font-size: 0.85rem;
        }

        .trip-stats {
          display: flex;
          gap: 1rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .stat-label {
          color: #6c757d;
          font-size: 0.8rem;
        }

        .stat-value {
          color: #2c3e50;
          font-weight: 500;
          font-size: 0.9rem;
        }

        .booking-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .amount-section {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .dollar-icon {
          color: #4ca64c;
          font-size: 0.9rem;
        }

        .amount {
          font-size: 1.2rem;
          font-weight: 700;
          color: #4ca64c;
        }

        .status-action {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.5rem;
        }

        .status-badge {
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.35rem 0.75rem;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-completed {
          background: rgba(76, 166, 76, 0.1);
          color: #4ca64c;
        }

        .status-cancelled {
          background: rgba(220, 53, 69, 0.1);
          color: #dc3545;
        }

        .status-ongoing {
          background: rgba(255, 193, 7, 0.1);
          color: #ffc107;
        }

        .status-unknown {
          background: rgba(108, 117, 125, 0.1);
          color: #6c757d;
        }

        .view-btn {
          background: rgba(76, 166, 76, 0.1);
          color: #4ca64c;
          border: 1px solid rgba(76, 166, 76, 0.3);
          padding: 0.4rem 0.8rem;
          border-radius: 8px;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
        }

        .view-btn:hover {
          background: #4ca64c;
          color: white;
          border-color: #4ca64c;
          text-decoration: none;
        }

        .empty-state {
          text-align: center;
          padding: 3rem 1rem;
          color: #6c757d;
        }

        .empty-icon {
          font-size: 4rem;
          color: #dee2e6;
          margin-bottom: 1rem;
        }

        .empty-state h5 {
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }

        .empty-state p {
          margin-bottom: 2rem;
        }

        .empty-state .btn {
          background: linear-gradient(135deg, #4ca64c, #45a049);
          border: none;
          border-radius: 10px;
          padding: 0.75rem 1.5rem;
          font-weight: 600;
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .booking-history-container {
            padding: 1rem 0;
          }

          .page-title {
            font-size: 1.5rem;
          }

          .booking-item {
            padding: 1rem;
          }

          .booking-main {
            flex-direction: column;
            gap: 1rem;
          }

          .booking-left {
            flex-direction: column;
            gap: 1rem;
          }

          .booking-right {
            align-items: flex-start;
            width: 100%;
          }

          .booking-meta {
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
            align-items: flex-start;
          }

          .booking-actions {
            justify-content: space-between;
            width: 100%;
          }

          .trip-stats {
            flex-direction: column;
            gap: 0.5rem;
          }

          .stat-item {
            align-items: flex-start;
          }

          .date-time-text {
            align-items: flex-start;
          }

          .status-action {
            align-items: flex-end;
          }

          .card-header-custom {
            flex-direction: column;
            gap: 0.5rem;
            align-items: flex-start;
          }
        }

        @media (max-width: 480px) {
          .journey-section {
            margin-left: 1rem;
          }

          .vehicle-section {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 0.5rem;
          }

          .location-text {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default BookingHistory;