import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Shift, formatCurrency, formatDate, formatTime } from '@gig-bartending/shared';
import { styles } from '../styles';

interface ShiftCardProps {
  shift: Shift;
  onRequest?: (shiftId: string, bartenderId: string) => void;
  onCancel?: (shiftId: string) => void;
  userRole?: 'bartender' | 'venue';
  currentUserId?: string;
}

const ShiftCard: React.FC<ShiftCardProps> = ({
  shift,
  onRequest,
  onCancel,
  userRole,
  currentUserId,
}) => {
  const hasRequested = currentUserId && shift.requestedBy?.includes(currentUserId);
  const isAccepted = shift.acceptedBy === currentUserId;

  const getBadgeStyle = (status: string) => {
    switch (status) {
      case 'open':
        return styles.badgeOpen;
      case 'pending':
        return styles.badgePending;
      case 'accepted':
        return styles.badgeAccepted;
      case 'cancelled':
        return styles.badgeCancelled;
      default:
        return styles.badgeOpen;
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.subheader}>{shift.title}</Text>
      <View style={[styles.badge, getBadgeStyle(shift.status), { marginVertical: 8 }]}>
        <Text style={[styles.badgeText, { color: 'white' }]}>
          {shift.status.toUpperCase()}
        </Text>
      </View>
      <Text style={styles.text}>
        <Text style={{ fontWeight: '600' }}>📍 {shift.venueName}</Text>
        {'\n'}{shift.venueAddress}
      </Text>
      <Text style={styles.text}>{shift.description}</Text>
      <View style={{ marginVertical: 8 }}>
        <Text style={styles.text}>
          <Text style={{ fontWeight: '600' }}>📅 Date:</Text> {formatDate(shift.date)}
        </Text>
        <Text style={styles.text}>
          <Text style={{ fontWeight: '600' }}>🕐 Time:</Text> {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
        </Text>
        <Text style={styles.text}>
          <Text style={{ fontWeight: '600' }}>💰 Rate:</Text> {formatCurrency(shift.hourlyRate)}/hour
        </Text>
      </View>

      {userRole === 'bartender' && shift.status === 'open' && !hasRequested && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRequest?.(shift.id, currentUserId!)}
        >
          <Text style={styles.buttonText}>Request This Shift</Text>
        </TouchableOpacity>
      )}

      {userRole === 'bartender' && hasRequested && !isAccepted && (
        <View style={[styles.button, styles.buttonSecondary, styles.buttonDisabled]}>
          <Text style={styles.buttonText}>Request Pending</Text>
        </View>
      )}

      {userRole === 'bartender' && isAccepted && (
        <View style={[styles.button, styles.buttonSuccess, styles.buttonDisabled]}>
          <Text style={styles.buttonText}>✓ Accepted</Text>
        </View>
      )}

      {userRole === 'venue' && shift.requestedBy && shift.requestedBy.length > 0 && (
        <Text style={styles.text}>
          <Text style={{ fontWeight: '600' }}>Requests: {shift.requestedBy.length}</Text>
        </Text>
      )}

      {userRole === 'venue' && shift.status === 'open' && (
        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary, { marginTop: 8 }]}
          onPress={() => onCancel?.(shift.id)}
        >
          <Text style={styles.buttonText}>Cancel Shift</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ShiftCard;
