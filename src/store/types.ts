export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  weight: number;
  restTime: number;
}

export interface Workout {
  id: number;
  name: string;
  category: 'strength' | 'cardio';
  duration: number;
  exercises: Exercise[];
}

export interface UserProfile {
  name: string;
  goal: string;
  weeklyGoal: number;
  completedWorkouts: number;
}

export interface WorkoutHistory {
  date: string;
  workout: string;
  duration: number;
  completed: boolean;
}

export interface TimerState {
  isActive: boolean;
  time: number;
  type: 'exercise' | 'rest';
}