import { useState } from '@lynx-js/react';
import { Workout, WorkoutHistory } from './types';

const initialWorkouts: Workout[] = [
  {
    id: 1,
    name: 'Push Day',
    category: 'strength',
    duration: 45,
    exercises: [
      { name: 'Bench Press', sets: 3, reps: '8-10', weight: 80, restTime: 120 },
      { name: 'Shoulder Press', sets: 3, reps: '10-12', weight: 30, restTime: 90 },
      { name: 'Push-ups', sets: 3, reps: '12-15', weight: 0, restTime: 60 }
    ]
  },
  {
    id: 2,
    name: 'Pull Day',
    category: 'strength',
    duration: 50,
    exercises: [
      { name: 'Pull-ups', sets: 3, reps: '6-8', weight: 0, restTime: 120 },
      { name: 'Rows', sets: 3, reps: '8-10', weight: 60, restTime: 90 },
      { name: 'Face Pulls', sets: 3, reps: '12-15', weight: 15, restTime: 60 }
    ]
  },
  {
    id: 3,
    name: 'Cardio HIIT',
    category: 'cardio',
    duration: 20,
    exercises: [
      { name: 'Burpees', sets: 4, reps: '30s', weight: 0, restTime: 30 },
      { name: 'Mountain Climbers', sets: 4, reps: '30s', weight: 0, restTime: 30 },
      { name: 'Jump Squats', sets: 4, reps: '30s', weight: 0, restTime: 30 }
    ]
  }
];

export const useWorkoutStore = () => {
  const [workouts, setWorkouts] = useState<Workout[]>(initialWorkouts);
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutHistory[]>([
    { date: '2024-01-10', workout: 'Push Day', duration: 45, completed: true },
    { date: '2024-01-08', workout: 'Pull Day', duration: 50, completed: true },
    { date: '2024-01-06', workout: 'Cardio HIIT', duration: 20, completed: true }
  ]);

  const addWorkoutToHistory = (workout: WorkoutHistory) => {
    setWorkoutHistory(prev => [workout, ...prev]);
  };

  return {
    workouts,
    workoutHistory,
    addWorkoutToHistory
  };
};