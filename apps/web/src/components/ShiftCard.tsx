import React from 'react';
import { Shift, formatCurrency, formatDate, formatTime } from '@gig-bartending/shared';

interface ShiftCardProps {
  shift: Shift;
  onRequest?: (shiftId: string) => void;
  onAccept?: (shiftId: string, bartenderId: string) => void;
  onCancel?: (shiftId: string) => void;
  userRole?: 'bartender' | 'venue';
  currentUserId?: string;
}

const ShiftCard: React.FC<ShiftCardProps> = ({
  shift,
  onRequest,
  onAccept,
  onCancel,
  userRole,
  currentUserId,
}) => {
  const hasRequested = currentUserId && shift.requestedBy?.includes(currentUserId);
  const isAccepted = shift.acceptedBy === currentUserId;

  return (
    <div className="card">
      <h3>{shift.title}</h3>
      <div style={{ marginTop: '10px', marginBottom: '10px' }}>
        <span className={`badge badge-${shift.status}`}>
          {shift.status.toUpperCase()}
        </span>
      </div>
      <p style={{ color: '#666', marginBottom: '10px' }}>
        <strong>📍 {shift.venueName}</strong>
        <br />
        {shift.venueAddress}
      </p>
      <p style={{ marginBottom: '10px' }}>{shift.description}</p>
      <div style={{ marginBottom: '10px' }}>
        <p>
          <strong>📅 Date:</strong> {formatDate(shift.date)}
        </p>
        <p>
          <strong>🕐 Time:</strong> {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
        </p>
        <p>
          <strong>💰 Rate:</strong> {formatCurrency(shift.hourlyRate)}/hour
        </p>
      </div>

      {userRole === 'bartender' && shift.status === 'open' && !hasRequested && (
        <button
          onClick={() => onRequest?.(shift.id)}
          className="button button-primary"
          style={{ width: '100%' }}
        >
          Request This Shift
        </button>
      )}

      {userRole === 'bartender' && hasRequested && !isAccepted && (
        <button className="button button-secondary" disabled style={{ width: '100%' }}>
          Request Pending
        </button>
      )}

      {userRole === 'bartender' && isAccepted && (
        <button className="button button-success" disabled style={{ width: '100%' }}>
          ✓ Accepted
        </button>
      )}

      {userRole === 'venue' && shift.requestedBy && shift.requestedBy.length > 0 && (
        <div style={{ marginTop: '10px' }}>
          <p>
            <strong>Requests: {shift.requestedBy.length}</strong>
          </p>
        </div>
      )}

      {userRole === 'venue' && shift.status === 'open' && (
        <button
          onClick={() => onCancel?.(shift.id)}
          className="button button-secondary"
          style={{ width: '100%', marginTop: '10px' }}
        >
          Cancel Shift
        </button>
      )}
    </div>
  );
};

export default ShiftCard;
