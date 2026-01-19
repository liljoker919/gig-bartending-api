import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '@gig-bartending/shared';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import PostShiftScreen from '../screens/PostShiftScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#007bff' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    }}
  >
    <Stack.Screen 
      name="Login" 
      component={LoginScreen} 
      options={{ title: '🍸 Gig Bartending' }}
    />
    <Stack.Screen 
      name="Signup" 
      component={SignupScreen} 
      options={{ title: 'Sign Up' }}
    />
  </Stack.Navigator>
);

const MainStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#007bff' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    }}
  >
    <Stack.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ title: '🍸 Gig Bartending' }}
    />
    <Stack.Screen 
      name="PostShift" 
      component={PostShiftScreen} 
      options={{ title: 'Post Shift' }}
    />
    <Stack.Screen 
      name="Profile" 
      component={ProfileScreen} 
      options={{ title: 'Profile' }}
    />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
