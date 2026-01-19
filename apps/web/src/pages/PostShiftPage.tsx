import React, { useState } from 'react';
import { useAuth, useShifts, VenueProfile } from '@gig-bartending/shared';
import { useNavigate } from 'react-router-dom';

const PostShiftPage: React.FC = () => {
  const { user } = useAuth();
  const { addShift } = useShifts();
  const navigate = useNavigate();

  const venueProfile = user?.profile as VenueProfile;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    hourlyRate: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.date || !formData.startTime || !formData.endTime || !formData.hourlyRate) {
      setError('Please fill in all required fields');
      return;
    }

    const rate = parseFloat(formData.hourlyRate);
    if (isNaN(rate) || rate <= 0) {
      setError('Please enter a valid hourly rate');
      return;
    }

    try {
      await addShift({
        venueId: user!.id,
        venueName: venueProfile.venueName,
        venueAddress: venueProfile.address,
        title: formData.title,
        description: formData.description,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        hourlyRate: rate,
      });

      navigate('/');
    } catch (err) {
      setError('Failed to post shift. Please try again.');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <h1 style={{ marginBottom: '30px' }}>Post a New Shift</h1>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Shift Title *</label>
            <input
              type="text"
              name="title"
              className="form-input"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Friday Night Bartender"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-textarea"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the shift, requirements, etc."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Date *</label>
            <input
              type="date"
              name="date"
              className="form-input"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Start Time *</label>
            <input
              type="time"
              name="startTime"
              className="form-input"
              value={formData.startTime}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">End Time *</label>
            <input
              type="time"
              name="endTime"
              className="form-input"
              value={formData.endTime}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Hourly Rate ($) *</label>
            <input
              type="number"
              name="hourlyRate"
              className="form-input"
              value={formData.hourlyRate}
              onChange={handleChange}
              placeholder="25.00"
              step="0.01"
              min="0"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button type="submit" className="button button-primary" style={{ flex: 1 }}>
              Post Shift
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="button button-secondary"
              style={{ flex: 1 }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostShiftPage;
