import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth, useShifts } from '@gig-bartending/shared';
import ShiftCard from '../components/ShiftCard';
import { styles } from '../styles';

const HomeScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const { shifts, loading, requestShift, cancelShift } = useShifts();

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>Loading shifts...</Text>
      </View>
    );
  }

  const userShifts = user?.role === 'venue'
    ? shifts.filter(shift => shift.venueId === user.id)
    : shifts;

  return (
    <View style={styles.container}>
      <View style={{ padding: 16, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
        <Text style={styles.header}>
          {user?.role === 'bartender' ? 'Available Shifts' : 'My Posted Shifts'}
        </Text>
        {user?.role === 'venue' && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('PostShift')}
          >
            <Text style={styles.buttonText}>Post New Shift</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {userShifts.length === 0 ? (
          <View style={styles.card}>
            <Text style={[styles.text, { textAlign: 'center' }]}>
              {user?.role === 'bartender'
                ? 'No shifts available at the moment. Check back soon!'
                : "You haven't posted any shifts yet."}
            </Text>
          </View>
        ) : (
          userShifts.map((shift) => (
            <ShiftCard
              key={shift.id}
              shift={shift}
              onRequest={requestShift}
              onCancel={cancelShift}
              userRole={user?.role}
              currentUserId={user?.id}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
