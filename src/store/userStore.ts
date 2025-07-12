import { useState } from '@lynx-js/react';
import { UserProfile } from './types';

const initialProfile: UserProfile = {
  name: 'Max Mustermann',
  goal: 'Muscle Building',
  weeklyGoal: 4,
  completedWorkouts: 2
};

export const useUserStore = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>(initialProfile);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  const incrementCompletedWorkouts = () => {
    setUserProfile(prev => ({ 
      ...prev, 
      completedWorkouts: prev.completedWorkouts + 1 
    }));
  };

  return {
    userProfile,
    updateProfile,
    incrementCompletedWorkouts
  };
};