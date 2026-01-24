import React from 'react';
import { useAuth, useShifts } from '@gig-bartending/shared';
import ShiftCard from '../components/ShiftCard';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const { shifts, loading, requestShift, cancelShift } = useShifts();

  if (loading) {
    return <div className="loading">Loading shifts...</div>;
  }

  const userShifts = user?.role === 'venue'
    ? shifts.filter(shift => shift.venueId === user.id)
    : shifts;

  return (
    <div className="container">
      <h1 style={{ marginBottom: '30px' }}>
        {user?.role === 'bartender' ? 'Available Shifts' : 'My Posted Shifts'}
      </h1>

      {user?.role === 'venue' && (
        <div style={{ marginBottom: '30px' }}>
          <a href="/post-shift">
            <button className="button button-primary">Post New Shift</button>
          </a>
        </div>
      )}

      {userShifts.length === 0 ? (
        <div className="card">
          <p style={{ textAlign: 'center', color: '#666' }}>
            {user?.role === 'bartender'
              ? 'No shifts available at the moment. Check back soon!'
              : 'You haven\'t posted any shifts yet.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-2">
          {userShifts.map((shift) => (
            <ShiftCard
              key={shift.id}
              shift={shift}
              onRequest={requestShift}
              onCancel={cancelShift}
              userRole={user?.role}
              currentUserId={user?.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
