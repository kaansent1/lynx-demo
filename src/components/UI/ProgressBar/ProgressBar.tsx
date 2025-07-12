import './ProgressBar.css';

interface ProgressBarProps {
  percentage: number;
  className?: string;
  color?: 'primary' | 'secondary' | 'danger' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
}

export const ProgressBar = ({ 
  percentage, 
  className = '',
  color = 'primary',
  size = 'md',
  showLabel = false,
  animated = false
}: ProgressBarProps) => {
  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <view className={`progress-bar progress-bar-${size} ${className}`}>
      <view className="progress-bar-track">
        <view 
          className={`progress-bar-fill progress-bar-${color} ${animated ? 'animated' : ''}`}
          style={{ width: `${clampedPercentage}%` }}
        >
          {showLabel && (
            <text className="progress-bar-label">
              {Math.round(clampedPercentage)}%
            </text>
          )}
        </view>
      </view>
    </view>
  );
};