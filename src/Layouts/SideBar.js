import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaHome, 
  FaHistory, 
  FaMapMarkedAlt, 
  FaSignOutAlt,
  FaTachometerAlt 
} from 'react-icons/fa';

const Sidebar = ({ collapsed, toggleSidebar, onLogout }) => {
  const location = useLocation();

  const menuItems = [
    {
      path: '/dashboard',
      icon: <FaTachometerAlt />,
      label: 'Dashboard'
    },
    {
      path: '/book-ride',
      icon: <FaMapMarkedAlt />,
      label: 'Book Ride'
    },
    {
      path: '/booking-history',
      icon: <FaHistory />,
      label: 'Booking History'
    }
  ];

  return (
    <>
      <div className={`sidebar ${collapsed ? 'collapsed' : 'expanded'}`}>
        
        <div className="sidebar-header">
          <div className="brand">
            {!collapsed && (
              <span className="brand-text">
                <span style={{ color: '#4ca64c' }}>Ride</span>zy
              </span>
            )}
          </div>
          <Button 
            variant="link" 
            className="toggle-btn" 
            onClick={toggleSidebar}
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </Button>
        </div>

        <Nav className="flex-column sidebar-nav">
          {menuItems.map((item, index) => (
            <Nav.Link
              key={index}
              as={Link}
              to={item.path}
              className={`sidebar-nav-item ${location.pathname === item.path ? 'active' : ''}`}
              title={collapsed ? item.label : ''}
            >
              <span className="nav-icon">{item.icon}</span>
              {!collapsed && <span className="nav-label">{item.label}</span>}
            </Nav.Link>
          ))}
        </Nav>

       
        <div className="sidebar-footer">
          <Button
            variant="link"
            className="logout-btn"
            onClick={onLogout}
            title={collapsed ? 'Logout' : ''}
          >
            <span className="nav-icon"><FaSignOutAlt /></span>
            {!collapsed && <span className="nav-label">Logout</span>}
          </Button>
        </div>
      </div>

      <style>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          background: linear-gradient(135deg,black, #34495e);
          color: white;
          transition: width 0.3s ease;
          z-index: 1000;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
        }

        .sidebar.expanded {
          width: 250px;
        }

        .sidebar.collapsed {
          width: 70px;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          min-height: 60px;
        }

        .brand {
          display: flex;
          align-items: center;
        }

        .brand-text {
          font-size: 1.2rem;
          font-weight: bold;
          white-space: nowrap;
        }

        .toggle-btn {
          color: white !important;
          padding: 0.5rem;
          border: none;
          background: none;
          font-size: 1rem;
          transition: transform 0.2s ease;
        }

        .toggle-btn:hover {
          transform: scale(1.1);
          color: #4ca64c !important;
        }

        .sidebar-nav {
          flex: 1;
          padding: 1rem 0;
        }

        .sidebar-nav-item {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          color: rgba(255, 255, 255, 0.8) !important;
          text-decoration: none;
          transition: all 0.3s ease;
          border: none;
          margin: 0.2rem 0;
        }

        .sidebar-nav-item:hover {
          background: rgba(76, 166, 76, 0.2);
          color: white !important;
          transform: translateX(5px);
        }

        .sidebar-nav-item.active {
          background: rgba(76, 166, 76, 0.3);
          color: #4ca64c !important;
          border-right: 3px solid #4ca64c;
        }

        .nav-icon {
          font-size: 1.1rem;
          width: 20px;
          text-align: center;
          flex-shrink: 0;
        }

        .nav-label {
          margin-left: 1rem;
          white-space: nowrap;
          opacity: 1;
          transition: opacity 0.3s ease;
        }

        .sidebar.collapsed .nav-label {
          opacity: 0;
        }

        .sidebar-footer {
          padding: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .logout-btn {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 0.75rem 1rem;
          color: rgba(255, 255, 255, 0.8) !important;
          text-decoration: none;
          transition: all 0.3s ease;
          border: none;
          background: none;
          text-align: left;
        }

        .logout-btn:hover {
          background: rgba(231, 76, 60, 0.2);
          color: #e74c3c !important;
          transform: translateX(5px);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(-100%);
          }
          
          .sidebar.expanded {
            transform: translateX(0);
            width: 250px;
          }
          
          .sidebar.collapsed {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;