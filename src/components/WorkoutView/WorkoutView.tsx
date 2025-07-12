import { Timer } from '../UI/Timer/Timer';
import { Button } from '../UI/Button/Button';
import { ProgressBar } from '../UI/ProgressBar/ProgressBar';
import { Workout, TimerState } from '../../store/types';
import './WorkoutView.css';

interface WorkoutViewProps {
  currentWorkout: Workout;
  activeExercise: number;
  timerState: TimerState;
  onTimerToggle: () => void;
  onTimerReset: () => void;
  onNextExercise: () => void;
  onExitWorkout: () => void;
}

export const WorkoutView = ({
  currentWorkout,
  activeExercise,
  timerState,
  onTimerToggle,
  onTimerReset,
  onNextExercise,
  onExitWorkout
}: WorkoutViewProps) => {
  if (!currentWorkout || activeExercise === null) return null;
  
  const exercise = currentWorkout.exercises[activeExercise];
  const isLastExercise = activeExercise === currentWorkout.exercises.length - 1;
  const progressPercentage = ((activeExercise + 1) / currentWorkout.exercises.length) * 100;

  return (
    <view className="workout-view">
      <view className="workout-container">
        
        {/* Header */}
        <view className="workout-header">
          <text className="workout-title">{currentWorkout.name}</text>
          <text className="workout-progress-text">
            Exercise {activeExercise + 1} of {currentWorkout.exercises.length}
          </text>
        </view>

        {/* Progress Bar */}
        <ProgressBar 
          percentage={progressPercentage} 
          className="workout-progress-bar"
          color="primary"
          animated={true}
        />

        {/* Current Exercise */}
        <view className="exercise-card">
          <text className="exercise-name">{exercise.name}</text>
          <view className="exercise-stats">
            <view className="exercise-stat">
              <text className="exercise-stat-number">{exercise.sets}</text>
              <text className="exercise-stat-label">Sets</text>
            </view>
            <view className="exercise-stat">
              <text className="exercise-stat-number">{exercise.reps}</text>
              <text className="exercise-stat-label">Reps</text>
            </view>
            {exercise.weight > 0 && (
              <view className="exercise-stat">
                <text className="exercise-stat-number">{exercise.weight}kg</text>
                <text className="exercise-stat-label">Weight</text>
              </view>
            )}
            <view className="exercise-stat">
              <text className="exercise-stat-number">{exercise.restTime}s</text>
              <text className="exercise-stat-label">Rest</text>
            </view>
          </view>
        </view>

        {/* Timer */}
        <Timer 
          timerState={timerState}
          onToggle={onTimerToggle}
          onReset={onTimerReset}
        />

        {/* Navigation */}
        <view className="workout-navigation">
          <Button 
            variant="outline" 
            onClick={onExitWorkout}
            className="workout-nav-button"
          >
            Exit Workout
          </Button>
          <Button 
            variant="primary" 
            onClick={onNextExercise}
            className="workout-nav-button"
          >
            {isLastExercise ? 'Complete Workout' : 'Next Exercise'}
          </Button>
        </view>
      </view>
    </view>
  );
};