import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, SignupData } from '../types';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  });

  const login = async (credentials: LoginCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      // Mock login - in production, this would call the API
      // For demo purposes, we'll create a mock user based on email
      const isBartender = credentials.email.includes('bartender');
      const mockUser: User = {
        id: Math.random().toString(36).substring(2, 11),
        email: credentials.email,
        role: isBartender ? 'bartender' : 'venue',
        profile: isBartender
          ? {
              name: 'John Bartender',
              phone: '555-0123',
              bio: 'Experienced bartender',
              experience: '5 years',
            }
          : {
              venueName: 'The Golden Bar',
              address: '123 Main St',
              phone: '555-0456',
              description: 'Premium cocktail bar',
            },
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const signup = async (data: SignupData) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      // Mock signup - in production, this would call the API
      const mockUser: User = {
        id: Math.random().toString(36).substring(2, 11),
        email: data.email,
        role: data.role,
        profile: data.profile as any,
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
