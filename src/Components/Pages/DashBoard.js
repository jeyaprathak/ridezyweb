import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaBiking, 
  FaCar, 
  FaTaxi, 
  FaCarSide, 
  FaRoute,
  FaHistory,
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaDollarSign,
  FaArrowRight,
  FaStar,
  FaChartLine,
  FaTachometerAlt,
  FaRupeeSign
} from 'react-icons/fa';

const vehicleTypes = [
  {
    id: 1,
    name: 'Bike',
    icon: <FaBiking size={32} />,
    price: '2/km',
    description: 'Fast and eco-friendly',
    time: '3-5 min',
    seats: 1,
    color: '#4ca64c'
  },
  {
    id: 2,
    name: 'Auto',
    icon: <FaTaxi size={32} />,
    price: '3/km',
    description: 'Compact and quick',
    time: '5-7 min',
    seats: 3,
    color: '#17a2b8'
  },
  {
    id: 3,
    name: 'Mini',
    icon: <FaCar size={32} />,
    price: '4/km',
    description: 'Comfort for small groups',
    time: '8-10 min',
    seats: 4,
    color: '#ffc107'
  },
  {
    id: 4,
    name: 'SUV',
    icon: <FaCarSide size={32} />,
    price: '6/km',
    description: 'Spacious and premium',
    time: '10-12 min',
    seats: 6,
    color: '#6f42c1'
  }
];

const quickStats = [
  {
    icon: <FaRoute />,
    title: 'Total Rides',
    value: '24',
    change: '+3 this week',
    color: '#4ca64c'
  },
  {
    icon: <FaRupeeSign />,
    title: 'Total Spent',
    value: '186',
    change: '+24 this week',
    color: '#17a2b8'
  },
  {
    icon: <FaStar />,
    title: 'Average Rating',
    value: '4.8',
    change: 'Excellent service',
    color: '#ffc107'
  },
  {
    icon: <FaClock />,
    title: 'Time Saved',
    value: '8.2h',
    change: 'This month',
    color: '#6f42c1'
  }
];

const Dashboard = ({ user }) => {
  return (
    <div className="dashboard-container">
      <Container fluid className="px-3">
       
        <div className="welcome-header mb-4">
          <div className="welcome-content">
            <h1 className="welcome-title">
              <FaTachometerAlt className="me-3" />
              Welcome back, {user?.name || 'Rider'}!
            </h1>
            <p className="welcome-subtitle">Enjoy Your Ride!</p>
          </div>
          <div className="welcome-avatar">
            <div className="avatar-circle">
              {(user?.name || 'U').charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        <Row>
          <Col xl={8} className="mb-4">
            
            <Card className="action-card mb-4">
              <Card.Body>
                <div className="card-header-custom mb-4">
                  <h5 className="card-title">
                    <FaRoute className="me-2 text-success" />
                    Quick Actions
                  </h5>
                  <span className="card-subtitle">Start your journey</span>
                </div>

                <Row>
                  <Col md={6} className="mb-3">
                    <Link to="/book-ride" className="action-link">
                      <div className="action-item book-ride">
                        <div className="action-icon">
                          <FaMapMarkerAlt />
                        </div>
                        <div className="action-content">
                          <h6 className="action-title">Book a Ride</h6>
                          <p className="action-description">Get to your destination quickly and safely</p>
                          <div className="action-meta">
                            <span className="meta-item">
                              <FaClock className="meta-icon" />
                              Available 24/7
                            </span>
                          </div>
                        </div>
                        <div className="action-arrow">
                          <FaArrowRight />
                        </div>
                      </div>
                    </Link>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Link to="/booking-history" className="action-link">
                      <div className="action-item history">
                        <div className="action-icon">
                          <FaHistory />
                        </div>
                        <div className="action-content">
                          <h6 className="action-title">Booking History</h6>
                          <p className="action-description">View and track all your past rides</p>
                          <div className="action-meta">
                            <span className="meta-item">
                              <FaChartLine className="meta-icon" />
                              Track your trips
                            </span>
                          </div>
                        </div>
                        <div className="action-arrow">
                          <FaArrowRight />
                        </div>
                      </div>
                    </Link>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="vehicles-card">
              <Card.Body>
                <div className="card-header-custom mb-4">
                  <h5 className="card-title">
                    <FaCar className="me-2 text-success" />
                    Available Vehicles
                  </h5>
                  <span className="card-subtitle">Choose your perfect ride</span>
                </div>

                <Row>
                  {vehicleTypes.map((vehicle) => (
                    <Col xs={6} lg={3} key={vehicle.id} className="mb-3">
                      <div className="vehicle-card">
                        <div className="vehicle-icon" style={{ color: vehicle.color }}>
                          {vehicle.icon}
                        </div>
                        <div className="vehicle-info">
                          <h6 className="vehicle-name">{vehicle.name}</h6>
                          <p className="vehicle-description">{vehicle.description}</p>
                          <div className="vehicle-details">
                            <div className="detail-row">
                              <FaClock className="detail-icon" />
                              <span>{vehicle.time}</span>
                            </div>
                            <div className="detail-row">
                              <FaUsers className="detail-icon" />
                              <span>{vehicle.seats} seats</span>
                            </div>
                            <div className="detail-row price-row">
                              <FaRupeeSign className="detail-icon" />
                              <span className="price">{vehicle.price}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col xl={4}>
          
            <Card className="stats-card">
              <Card.Body>
                <div className="card-header-custom mb-4">
                  <h5 className="card-title">
                    <FaChartLine className="me-2 text-success" />
                    Your Status
                  </h5>
                  <span className="card-subtitle">At a glance</span>
                </div>

                <div className="stats-grid">
                  {quickStats.map((stat, index) => (
                    <div key={index} className="stat-item">
                      <div className="stat-icon" style={{ color: stat.color }}>
                        {stat.icon}
                      </div>
                      <div className="stat-content">
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-title">{stat.title}</div>
                        <div className="stat-change">{stat.change}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <style>{`
        .dashboard-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          padding: 2rem 0;
        }

        .welcome-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .welcome-content {
          flex: 1;
        }

        .welcome-title {
          font-size: 2.2rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
        }

        .welcome-title svg {
          color: #4ca64c;
        }

        .welcome-subtitle {
          color: #b0b0b0;
          font-size: 1.1rem;
          margin: 0;
        }

        .welcome-avatar {
          flex-shrink: 0;
          margin-left: 2rem;
        }

        .avatar-circle {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #4ca64c, #45a049);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 700;
          color: white;
          box-shadow: 0 8px 25px rgba(76, 166, 76, 0.3);
        }

        .action-card, .vehicles-card, .stats-card {
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
          font-size: 1.3rem;
        }

        .card-subtitle {
          color: #6c757d;
          font-size: 0.9rem;
          background: rgba(76, 166, 76, 0.1);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
        }

        .action-link {
          text-decoration: none;
          color: inherit;
        }

        .action-item {
          display: flex;
          align-items: center;
          padding: 2rem;
          background: white;
          border: 2px solid #f8f9fa;
          border-radius: 15px;
          transition: all 0.3s ease;
          height: 100%;
          position: relative;
          overflow: hidden;
        }

        .action-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #4ca64c, #45a049);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .action-item:hover {
          border-color: #4ca64c;
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(76, 166, 76, 0.2);
        }

        .action-item:hover::before {
          transform: scaleX(1);
        }

        .action-icon {
          width: 60px;
          height: 60px;
          background: rgba(76, 166, 76, 0.1);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4ca64c;
          font-size: 1.5rem;
          flex-shrink: 0;
          margin-right: 1.5rem;
        }

        .book-ride:hover .action-icon {
          background: rgba(76, 166, 76, 0.2);
          transform: scale(1.1);
        }

        .history:hover .action-icon {
          background: rgba(23, 162, 184, 0.2);
          color: #17a2b8;
        }

        .action-content {
          flex: 1;
        }

        .action-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }

        .action-description {
          color: #6c757d;
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
        }

        .action-meta {
          display: flex;
          gap: 1rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          font-size: 0.85rem;
          color: #6c757d;
        }

        .meta-icon {
          margin-right: 0.25rem;
          font-size: 0.8rem;
        }

        .action-arrow {
          color: #4ca64c;
          font-size: 1.2rem;
          opacity: 0.7;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .action-item:hover .action-arrow {
          opacity: 1;
          transform: translateX(5px);
        }

        .vehicle-card {
          background: white;
          border: 2px solid #f8f9fa;
          border-radius: 15px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
          height: 100%;
          position: relative;
          overflow: hidden;
        }

        .vehicle-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: currentColor;
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .vehicle-card:hover {
          border-color: currentColor;
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .vehicle-card:hover::before {
          transform: scaleX(1);
        }

        .vehicle-icon {
          margin-bottom: 1rem;
          transition: transform 0.3s ease;
        }

        .vehicle-card:hover .vehicle-icon {
          transform: scale(1.1);
        }

        .vehicle-name {
          font-size: 1.2rem;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }

        .vehicle-description {
          color: #6c757d;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .vehicle-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .detail-row {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          color: #6c757d;
        }

        .detail-icon {
          margin-right: 0.5rem;
          font-size: 0.8rem;
        }

        .price-row {
          color: #4ca64c;
          font-weight: 600;
          font-size: 0.95rem;
        }

        .stats-grid {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .stat-item {
          display: flex;
          align-items: center;
          padding: 1.5rem;
          background: white;
          border: 2px solid #f8f9fa;
          border-radius: 15px;
          transition: all 0.3s ease;
        }

        .stat-item:hover {
          border-color: rgba(76, 166, 76, 0.3);
          transform: translateX(5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .stat-icon {
          width: 50px;
          height: 50px;
          background: rgba(76, 166, 76, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          margin-right: 1rem;
          flex-shrink: 0;
        }

        .stat-content {
          flex: 1;
        }

        .stat-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2c3e50;
          line-height: 1;
        }

        .stat-title {
          font-size: 0.9rem;
          color: #6c757d;
          margin: 0.25rem 0;
        }

        .stat-change {
          font-size: 0.8rem;
          color: #4ca64c;
          font-weight: 500;
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .dashboard-container {
            padding: 1rem 0;
          }

          .welcome-header {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
            padding: 1.5rem;
          }

          .welcome-avatar {
            margin-left: 0;
          }

          .welcome-title {
            font-size: 1.8rem;
            justify-content: center;
          }

          .action-item {
            padding: 1.5rem;
          }

          .action-icon {
            width: 50px;
            height: 50px;
            margin-right: 1rem;
          }

          .vehicle-card {
            padding: 1rem;
          }

          .stat-item {
            padding: 1rem;
          }

          .avatar-circle {
            width: 60px;
            height: 60px;
            font-size: 1.5rem;
          }
        }

        @media (max-width: 576px) {
          .card-header-custom {
            flex-direction: column;
            gap: 0.5rem;
            align-items: flex-start;
          }

          .action-item {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .action-icon {
            margin-right: 0;
          }

          .action-arrow {
            transform: rotate(90deg);
          }

          .action-item:hover .action-arrow {
            transform: rotate(90deg) translateX(5px);
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;