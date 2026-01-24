export type UserRole = 'bartender' | 'venue';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  profile: BartenderProfile | VenueProfile;
}

export interface BartenderProfile {
  name: string;
  phone: string;
  bio?: string;
  experience?: string;
  certifications?: string[];
  availability?: string;
  photoUrl?: string;
}

export interface VenueProfile {
  venueName: string;
  address: string;
  phone: string;
  description?: string;
  venueType?: string;
  photoUrl?: string;
}

export type ShiftStatus = 'open' | 'pending' | 'accepted' | 'completed' | 'cancelled';

export interface Shift {
  id: string;
  venueId: string;
  venueName: string;
  venueAddress: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  hourlyRate: number;
  status: ShiftStatus;
  requestedBy?: string[]; // Array of bartender IDs who requested
  acceptedBy?: string; // Bartender ID who was accepted
  createdAt: string;
}

export interface ShiftRequest {
  id: string;
  shiftId: string;
  bartenderId: string;
  bartenderName: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  role: UserRole;
  profile: Partial<BartenderProfile | VenueProfile>;
}
