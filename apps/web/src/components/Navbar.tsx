import React from 'react';
import { useAuth } from '@gig-bartending/shared';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <a href="/" className="navbar-brand">
          🍸 Gig Bartending
        </a>
        {isAuthenticated && user ? (
          <div className="navbar-menu">
            <a href="/" className="navbar-link">
              {user.role === 'bartender' ? 'Browse Shifts' : 'My Shifts'}
            </a>
            <a href="/profile" className="navbar-link">
              Profile
            </a>
            <button onClick={handleLogout} className="button button-secondary">
              Logout
            </button>
          </div>
        ) : (
          <div className="navbar-menu">
            <a href="/login" className="navbar-link">
              Login
            </a>
            <a href="/signup" className="navbar-link">
              Sign Up
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
