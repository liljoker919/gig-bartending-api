import { useState, useEffect } from 'react';
import { Shift, ShiftRequest } from '../types';

// Mock data for shifts
const generateMockShifts = (): Shift[] => [
  {
    id: '1',
    venueId: 'venue1',
    venueName: 'The Golden Bar',
    venueAddress: '123 Main St, Downtown',
    title: 'Friday Night Bartender',
    description: 'Looking for an experienced bartender for busy Friday night shift. Must know classic cocktails.',
    date: '2026-01-24',
    startTime: '18:00',
    endTime: '02:00',
    hourlyRate: 25,
    status: 'open',
    requestedBy: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    venueId: 'venue2',
    venueName: 'Rooftop Lounge',
    venueAddress: '456 High St, Uptown',
    title: 'Weekend Mixologist',
    description: 'Upscale rooftop bar seeking skilled mixologist for Saturday evening.',
    date: '2026-01-25',
    startTime: '19:00',
    endTime: '01:00',
    hourlyRate: 30,
    status: 'open',
    requestedBy: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    venueId: 'venue3',
    venueName: 'Sports Bar & Grill',
    venueAddress: '789 Stadium Rd',
    title: 'Game Day Bartender',
    description: 'Fast-paced sports bar needs bartender for Sunday game day.',
    date: '2026-01-26',
    startTime: '12:00',
    endTime: '20:00',
    hourlyRate: 22,
    status: 'open',
    requestedBy: [],
    createdAt: new Date().toISOString(),
  },
];

export const useShifts = () => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadShifts = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setShifts(generateMockShifts());
      setLoading(false);
    };

    loadShifts();
  }, []);

  const addShift = async (shift: Omit<Shift, 'id' | 'status' | 'createdAt' | 'requestedBy'>) => {
    const newShift: Shift = {
      ...shift,
      id: Math.random().toString(36).substring(2, 11),
      status: 'open',
      requestedBy: [],
      createdAt: new Date().toISOString(),
    };

    setShifts(prev => [...prev, newShift]);
    return newShift;
  };

  const requestShift = async (shiftId: string, bartenderId: string) => {
    setShifts(prev =>
      prev.map(shift =>
        shift.id === shiftId
          ? { ...shift, requestedBy: [...(shift.requestedBy || []), bartenderId], status: 'pending' as const }
          : shift
      )
    );
  };

  const acceptRequest = async (shiftId: string, bartenderId: string) => {
    setShifts(prev =>
      prev.map(shift =>
        shift.id === shiftId
          ? { ...shift, acceptedBy: bartenderId, status: 'accepted' as const }
          : shift
      )
    );
  };

  const cancelShift = async (shiftId: string) => {
    setShifts(prev =>
      prev.map(shift =>
        shift.id === shiftId
          ? { ...shift, status: 'cancelled' as const }
          : shift
      )
    );
  };

  return {
    shifts,
    loading,
    addShift,
    requestShift,
    acceptRequest,
    cancelShift,
  };
};
