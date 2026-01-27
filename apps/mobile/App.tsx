import React from 'react';
import { AuthProvider } from '@gig-bartending/shared';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
      <StatusBar barStyle="light-content" />
    </AuthProvider>
  );
}
