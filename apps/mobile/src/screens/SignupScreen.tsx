import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Picker } from 'react-native';
import { useAuth, validateEmail, validatePassword, UserRole, BartenderProfile, VenueProfile } from '@gig-bartending/shared';
import { styles } from '../styles';

const SignupScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('bartender');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [venueName, setVenueName] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const { signup, isLoading } = useAuth();

  const handleSubmit = async () => {
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
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Sign Up</Text>

        <Text style={styles.label}>I am a...</Text>
        <View style={[styles.input, { padding: 0 }]}>
          <Picker
            selectedValue={role}
            onValueChange={(itemValue) => setRole(itemValue as UserRole)}
            enabled={!isLoading}
          >
            <Picker.Item label="Bartender" value="bartender" />
            <Picker.Item label="Venue Owner" value="venue" />
          </Picker>
        </View>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          autoCapitalize="none"
          keyboardType="email-address"
          editable={!isLoading}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="At least 8 characters"
          secureTextEntry
          editable={!isLoading}
        />

        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          editable={!isLoading}
        />

        {role === 'bartender' ? (
          <>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              editable={!isLoading}
            />
          </>
        ) : (
          <>
            <Text style={styles.label}>Venue Name</Text>
            <TextInput
              style={styles.input}
              value={venueName}
              onChangeText={setVenueName}
              placeholder="Enter venue name"
              editable={!isLoading}
            />
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Enter venue address"
              editable={!isLoading}
            />
          </>
        )}

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.text, { textAlign: 'center' }]}>
            Already have an account?{' '}
            <Text style={styles.link}>Login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
