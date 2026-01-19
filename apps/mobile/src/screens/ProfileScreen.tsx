import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useAuth, BartenderProfile, VenueProfile } from '@gig-bartending/shared';
import { styles } from '../styles';

const ProfileScreen = ({ navigation }: any) => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>Please log in to view your profile.</Text>
      </View>
    );
  }

  const isBartender = user.role === 'bartender';
  const profile = user.profile as BartenderProfile | VenueProfile;

  const handleLogout = () => {
    logout();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.header}>My Profile</Text>

      <View style={[styles.badge, styles.badgeOpen, { marginBottom: 16 }]}>
        <Text style={[styles.badgeText, { color: 'white' }]}>
          {user.role.toUpperCase()}
        </Text>
      </View>

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={user.email} editable={false} />

      {isBartender ? (
        <>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={(profile as BartenderProfile).name}
            editable={isEditing}
          />
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={(profile as BartenderProfile).phone}
            editable={isEditing}
          />
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={styles.textarea}
            value={(profile as BartenderProfile).bio || ''}
            editable={isEditing}
            placeholder="Tell venues about yourself..."
            multiline
          />
          <Text style={styles.label}>Experience</Text>
          <TextInput
            style={styles.input}
            value={(profile as BartenderProfile).experience || ''}
            editable={isEditing}
            placeholder="e.g., 5 years"
          />
        </>
      ) : (
        <>
          <Text style={styles.label}>Venue Name</Text>
          <TextInput
            style={styles.input}
            value={(profile as VenueProfile).venueName}
            editable={isEditing}
          />
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={(profile as VenueProfile).address}
            editable={isEditing}
          />
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={(profile as VenueProfile).phone}
            editable={isEditing}
          />
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.textarea}
            value={(profile as VenueProfile).description || ''}
            editable={isEditing}
            placeholder="Describe your venue..."
            multiline
          />
          <Text style={styles.label}>Venue Type</Text>
          <TextInput
            style={styles.input}
            value={(profile as VenueProfile).venueType || ''}
            editable={isEditing}
            placeholder="e.g., Cocktail Bar, Sports Bar"
          />
        </>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsEditing(!isEditing)}
      >
        <Text style={styles.buttonText}>
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.buttonSecondary]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      <View style={[styles.card, { marginTop: 20, backgroundColor: '#f0f0f0' }]}>
        <Text style={styles.text}>
          <Text style={{ fontWeight: '600' }}>Note:</Text> Profile editing is currently in demo mode. 
          Changes will not be persisted. In a production environment, this would save to the backend API.
        </Text>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
