import { useState, useCallback } from '@lynx-js/react';
import { Workout } from '../store/types';

export const useWorkoutManager = () => {
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [activeExercise, setActiveExercise] = useState<number | null>(null);

  const startWorkout = useCallback((workout: Workout) => {
    setCurrentWorkout(workout);
    setActiveExercise(0);
  }, []);

  const nextExercise = useCallback(() => {
    if (currentWorkout && activeExercise !== null && activeExercise < currentWorkout.exercises.length - 1) {
      setActiveExercise(prev => prev! + 1);
      return false; // Not completed
    }
    return true; // Workout completed
  }, [currentWorkout, activeExercise]);

  const endWorkout = useCallback(() => {
    setCurrentWorkout(null);
    setActiveExercise(null);
  }, []);

  return {
    currentWorkout,
    activeExercise,
    startWorkout,
    nextExercise,
    endWorkout
  };
};