import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth, useShifts, VenueProfile } from '@gig-bartending/shared';
import { styles } from '../styles';

const PostShiftScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const { addShift } = useShifts();

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

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
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

      navigation.goBack();
    } catch (err) {
      setError('Failed to post shift. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Post a New Shift</Text>

        <Text style={styles.label}>Shift Title *</Text>
        <TextInput
          style={styles.input}
          value={formData.title}
          onChangeText={(value) => handleChange('title', value)}
          placeholder="e.g., Friday Night Bartender"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.textarea}
          value={formData.description}
          onChangeText={(value) => handleChange('description', value)}
          placeholder="Describe the shift, requirements, etc."
          multiline
        />

        <Text style={styles.label}>Date * (YYYY-MM-DD)</Text>
        <TextInput
          style={styles.input}
          value={formData.date}
          onChangeText={(value) => handleChange('date', value)}
          placeholder="2026-01-24"
        />

        <Text style={styles.label}>Start Time * (HH:MM)</Text>
        <TextInput
          style={styles.input}
          value={formData.startTime}
          onChangeText={(value) => handleChange('startTime', value)}
          placeholder="18:00"
        />

        <Text style={styles.label}>End Time * (HH:MM)</Text>
        <TextInput
          style={styles.input}
          value={formData.endTime}
          onChangeText={(value) => handleChange('endTime', value)}
          placeholder="02:00"
        />

        <Text style={styles.label}>Hourly Rate ($) *</Text>
        <TextInput
          style={styles.input}
          value={formData.hourlyRate}
          onChangeText={(value) => handleChange('hourlyRate', value)}
          placeholder="25.00"
          keyboardType="decimal-pad"
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Post Shift</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PostShiftScreen;
