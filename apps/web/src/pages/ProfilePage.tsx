import React, { useState } from 'react';
import { useAuth, BartenderProfile, VenueProfile } from '@gig-bartending/shared';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return <div className="container">Please log in to view your profile.</div>;
  }

  const isBartender = user.role === 'bartender';
  const profile = user.profile as BartenderProfile | VenueProfile;

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <h1 style={{ marginBottom: '30px' }}>My Profile</h1>

      <div className="card">
        <div style={{ marginBottom: '20px' }}>
          <span className="badge badge-open">{user.role.toUpperCase()}</span>
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input type="email" className="form-input" value={user.email} disabled />
        </div>

        {isBartender ? (
          <>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-input"
                value={(profile as BartenderProfile).name}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                className="form-input"
                value={(profile as BartenderProfile).phone}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Bio</label>
              <textarea
                className="form-textarea"
                value={(profile as BartenderProfile).bio || ''}
                disabled={!isEditing}
                placeholder="Tell venues about yourself..."
              />
            </div>
            <div className="form-group">
              <label className="form-label">Experience</label>
              <input
                type="text"
                className="form-input"
                value={(profile as BartenderProfile).experience || ''}
                disabled={!isEditing}
                placeholder="e.g., 5 years"
              />
            </div>
          </>
        ) : (
          <>
            <div className="form-group">
              <label className="form-label">Venue Name</label>
              <input
                type="text"
                className="form-input"
                value={(profile as VenueProfile).venueName}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-input"
                value={(profile as VenueProfile).address}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                className="form-input"
                value={(profile as VenueProfile).phone}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                value={(profile as VenueProfile).description || ''}
                disabled={!isEditing}
                placeholder="Describe your venue..."
              />
            </div>
            <div className="form-group">
              <label className="form-label">Venue Type</label>
              <input
                type="text"
                className="form-input"
                value={(profile as VenueProfile).venueType || ''}
                disabled={!isEditing}
                placeholder="e.g., Cocktail Bar, Sports Bar"
              />
            </div>
          </>
        )}

        <div style={{ marginTop: '20px' }}>
          <button
            className="button button-primary"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
          <p style={{ fontSize: '14px', color: '#666' }}>
            <strong>Note:</strong> Profile editing is currently in demo mode. Changes will not be persisted.
            In a production environment, this would save to the backend API.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
