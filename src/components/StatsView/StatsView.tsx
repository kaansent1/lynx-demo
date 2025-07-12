import { Card } from '../UI/Card/Card';
import { UserProfile, WorkoutHistory } from '../../store/types';
import './StatsView.css';

interface StatsViewProps {
  userProfile: UserProfile;
  workoutHistory: WorkoutHistory[];
}

export const StatsView = ({ userProfile, workoutHistory }: StatsViewProps) => {
  const getTotalWorkouts = () => workoutHistory.length;
  
  const getAverageDuration = () => {
    if (workoutHistory.length === 0) return 0;
    const totalDuration = workoutHistory.reduce((acc, workout) => acc + workout.duration, 0);
    return Math.round(totalDuration / workoutHistory.length);
  };

  const getWorkoutsByCategory = () => {
    const categories = workoutHistory.reduce((acc, workout) => {
      const category = workout.workout.toLowerCase().includes('cardio') ? 'Cardio' : 'Strength';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return categories;
  };

  const getThisWeekWorkouts = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    return workoutHistory.filter(workout => {
      const workoutDate = new Date(workout.date);
      return workoutDate >= oneWeekAgo;
    }).length;
  };

  const categories = getWorkoutsByCategory();

  return (
    <view className="stats-view">
      <view className="container">
        <text className="stats-title">Statistics</text>
        
        {/* Summary Cards */}
        <view className="stats-grid">
          <Card className="stats-card">
            <view className="stats-card-content">
              <view className="stats-card-info">
                <text className="stats-card-label">Total Workouts</text>
                <text className="stats-card-value">{getTotalWorkouts()}</text>
              </view>
              <text className="stats-card-icon">💪</text>
            </view>
          </Card>
          
          <Card className="stats-card">
            <view className="stats-card-content">
              <view className="stats-card-info">
                <text className="stats-card-label">This Week</text>
                <text className="stats-card-value">{getThisWeekWorkouts()}</text>
              </view>
              <text className="stats-card-icon">📅</text>
            </view>
          </Card>
          
          <Card className="stats-card">
            <view className="stats-card-content">
              <view className="stats-card-info">
                <text className="stats-card-label">Average Duration</text>
                <text className="stats-card-value">{getAverageDuration()} min</text>
              </view>
              <text className="stats-card-icon">⏱️</text>
            </view>
          </Card>
        </view>

        {/* Category Breakdown */}
        <Card className="stats-breakdown">
          <text className="stats-section-title">Workout Categories</text>
          <view className="category-stats">
            {Object.entries(categories).map(([category, count]) => (
              <view key={category} className="category-item">
                <view className="category-info">
                  <text className="category-name">{category}</text>
                  <text className="category-count">{count} workouts</text>
                </view>
                <view className="category-bar">
                  <view 
                    className={`category-bar-fill ${category.toLowerCase()}`}
                    style={{ 
                      width: `${(count / getTotalWorkouts()) * 100}%` 
                    }}
                  ></view>
                </view>
              </view>
            ))}
          </view>
        </Card>

        {/* Workout History */}
        <Card className="stats-history">
          <text className="stats-section-title">Workout History</text>
          <view className="history-list">
            {workoutHistory.map((entry, index) => (
              <view key={index} className="history-item">
                <view className="history-info">
                  <view className="history-indicator"></view>
                  <view className="history-details">
                    <text className="history-workout">{entry.workout}</text>
                    <text className="history-date">{entry.date}</text>
                  </view>
                </view>
                <view className="history-meta">
                  <text className="history-duration">{entry.duration} min</text>
                  <text className="history-status">Completed</text>
                </view>
              </view>
            ))}
          </view>
        </Card>
      </view>
    </view>
  );
};