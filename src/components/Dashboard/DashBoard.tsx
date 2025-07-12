import { Card } from '../UI/Card/Card';
import { ProgressBar } from '../UI/ProgressBar/ProgressBar';
import { Button } from '../UI/Button/Button';
import { UserProfile, Workout, WorkoutHistory } from '../../store/types';
import './Dashboard.css';

interface DashboardProps {
  userProfile: UserProfile;
  workouts: Workout[];
  workoutHistory: WorkoutHistory[];
  onStartWorkout: (workout: Workout) => void;
}

export const Dashboard = ({ 
  userProfile, 
  workouts, 
  workoutHistory, 
  onStartWorkout 
}: DashboardProps) => {
  const getProgressPercentage = () => {
    return Math.round((userProfile.completedWorkouts / userProfile.weeklyGoal) * 100);
  };

  return (
    <view className="dashboard">
      <view className="container">
        
        {/* Header */}
        <Card className="dashboard-header">
          <view className="flex justify-between items-center">
            <view>
              <text className="dashboard-title">
                Welcome back, {userProfile.name}!
              </text>
              <text className="dashboard-subtitle">
                Ready for your next workout?
              </text>
            </view>
            <view className="text-right">
              <text className="dashboard-stat-number">
                {userProfile.completedWorkouts}
              </text>
              <text className="dashboard-stat-label">
                Workouts this week
              </text>
            </view>
          </view>
        </Card>

        {/* Progress Card */}
        <Card className="dashboard-progress">
          <view className="flex justify-between items-center mb-lg">
            <text className="card-title">Weekly Progress</text>
            <text className="progress-emoji">🏆</text>
          </view>
          <ProgressBar 
            percentage={getProgressPercentage()} 
            className="mb-sm"
          />
          <text className="progress-text">
            {userProfile.completedWorkouts} of {userProfile.weeklyGoal} workouts completed ({getProgressPercentage()}%)
          </text>
        </Card>

        {/* Workout Plans */}
        <Card className="dashboard-workouts">
          <text className="card-title mb-lg">Available Workouts</text>
          <view className="workout-grid">
            {workouts.map(workout => (
              <view key={workout.id} className="workout-card">
                <view className="workout-header">
                  <text className="workout-name">{workout.name}</text>
                  <text className={`workout-category ${workout.category}`}>
                    {workout.category}
                  </text>
                </view>
                <view className="workout-info">
                  <text>⏱️ {workout.duration} min • {workout.exercises.length} exercises</text>
                </view>
                <Button 
                  variant="primary" 
                  onClick={() => onStartWorkout(workout)}
                  className="workout-start-btn"
                >
                  ▶️ Start Workout
                </Button>
              </view>
            ))}
          </view>
        </Card>

        {/* Recent Activity */}
        <Card className="dashboard-activity">
          <text className="card-title mb-lg">Recent Activity</text>
          <view className="activity-list">
            {workoutHistory.slice(0, 5).map((entry, index) => (
              <view key={index} className="activity-item">
                <view className="flex items-center">
                  <view className="activity-indicator"></view>
                  <view>
                    <text className="activity-workout">{entry.workout}</text>
                    <text className="activity-date">{entry.date}</text>
                  </view>
                </view>
                <text className="activity-duration">{entry.duration} min</text>
              </view>
            ))}
          </view>
        </Card>
      </view>
    </view>
  );
};