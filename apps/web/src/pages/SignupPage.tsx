import React, { useState } from 'react';
import { useAuth, validateEmail, validatePassword, UserRole, BartenderProfile, VenueProfile } from '@gig-bartending/shared';
import { useNavigate } from 'react-router-dom';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('bartender');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [venueName, setVenueName] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      setError(passwordValidation.message || 'Invalid password');
      return;
    }

    if (!phone) {
      setError('Please enter your phone number');
      return;
    }

    if (role === 'bartender' && !name) {
      setError('Please enter your name');
      return;
    }

    if (role === 'venue' && (!venueName || !address)) {
      setError('Please enter venue name and address');
      return;
    }

    try {
      const profile = role === 'bartender'
        ? { name, phone } as BartenderProfile
        : { venueName, address, phone } as VenueProfile;

      await signup({ email, password, role, profile });
      navigate('/');
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '500px', marginTop: '50px' }}>
      <div className="card">
        <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">I am a...</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              disabled={isLoading}
            >
              <option value="bartender">Bartender</option>
              <option value="venue">Venue Owner</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              className="form-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              disabled={isLoading}
            />
          </div>

          {role === 'bartender' ? (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                disabled={isLoading}
              />
            </div>
          ) : (
            <>
              <div className="form-group">
                <label className="form-label">Venue Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  placeholder="Enter venue name"
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-input"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter venue address"
                  disabled={isLoading}
                />
              </div>
            </>
          )}

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="button button-primary"
            style={{ width: '100%', marginTop: '20px' }}
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p style={{ marginTop: '20px', textAlign: 'center' }}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
