import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth, validateEmail, validatePassword } from '@gig-bartending/shared';
import { styles } from '../styles';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async () => {
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setError('Please enter your password');
      return;
    }

    try {
      await login({ email, password });
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Login</Text>

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
          placeholder="Enter your password"
          secureTextEntry
          editable={!isLoading}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>{isLoading ? 'Logging in...' : 'Login'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={[styles.text, { textAlign: 'center' }]}>
            Don't have an account?{' '}
            <Text style={styles.link}>Sign up</Text>
          </Text>
        </TouchableOpacity>

        <View style={[styles.card, { marginTop: 20, backgroundColor: '#f0f0f0' }]}>
          <Text style={styles.text}>
            <Text style={{ fontWeight: '600' }}>Demo accounts:</Text>
            {'\n'}Bartender: bartender@example.com
            {'\n'}Venue: venue@example.com
            {'\n'}Password: any password
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
