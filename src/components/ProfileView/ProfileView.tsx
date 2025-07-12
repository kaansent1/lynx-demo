import { useState } from '@lynx-js/react';
import { Card } from '../UI/Card/Card';
import { Button } from '../UI/Button/Button';
import { UserProfile } from '../../store/types';
import './ProfileView.css';

interface ProfileViewProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

export const ProfileView = ({ userProfile, onUpdateProfile }: ProfileViewProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(userProfile);

  const handleSave = () => {
    onUpdateProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(userProfile);
    setIsEditing(false);
  };

  return (
    <view className="profile-view">
      <view className="container">
        <text className="profile-title">Profile</text>
        
        {/* Profile Info Card */}
        <Card className="profile-card">
          <view className="profile-header">
            <view className="profile-avatar">
              <text className="avatar-emoji">👤</text>
            </view>
            <view className="profile-info">
                <text className="profile-name">{userProfile.name}</text>
              <text className="profile-subtitle">Fitness Enthusiast</text>
            </view>
          </view>
        </Card>

        {/* Settings Card */}
        <Card className="profile-settings">
          <text className="settings-title">Settings</text>
          
          <view className="setting-item">
            <text className="setting-label">Fitness Goal</text>
              <text className="setting-value">{userProfile.goal}</text>
          </view>

          <view className="setting-item">
            <text className="setting-label">Weekly Goal</text>
              <text className="setting-value">{userProfile.weeklyGoal} workouts</text>
          </view>
        </Card>

        {/* Stats Card */}
        <Card className="profile-stats">
          <text className="stats-title">Your Stats</text>
          
          <view className="stats-grid">
            <view className="stat-item">
              <text className="stat-number">{userProfile.completedWorkouts}</text>
              <text className="stat-label">Completed This Week</text>
            </view>
            <view className="stat-item">
              <text className="stat-number">{Math.round((userProfile.completedWorkouts / userProfile.weeklyGoal) * 100)}%</text>
              <text className="stat-label">Weekly Progress</text>
            </view>
          </view>
        </Card>

        {/* Action Buttons */}
        <view className="profile-actions">
          {isEditing ? (
            <view className="edit-actions">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save Changes
              </Button>
            </view>
          ) : (
            <Button variant="primary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </view>
      </view>
    </view>
  );
};