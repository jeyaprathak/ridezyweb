import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Dashboard from './Components/Pages/DashBoard';
import BookRide from './Components/Booking/BookRides';
import ProtectedRoute from './Components/Auth/ProductedRoute';
import BookingHistory from './Components/Booking/BookingHistory';
import RideStatus from './Components/Booking/RideStatus';
import Sidebar from './Layouts/SideBar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="App d-flex">
      {isAuthenticated && (
        <Sidebar 
          collapsed={sidebarCollapsed} 
          toggleSidebar={toggleSidebar}
          onLogout={handleLogout}
        />
      )}
      <div className={`main-content ${isAuthenticated ? (sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded') : 'no-sidebar'}`}>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book-ride"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <BookRide user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking-history"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <BookingHistory user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ride-status/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <RideStatus user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;