// src/components/UI/Timer/Timer.tsx
import { formatTime } from '../../../utils/formatTime';
import { Button } from '../Button/Button';
import { TimerState } from '../../../store/types';
import './Timer.css';

interface TimerProps {
  timerState: TimerState;
  onToggle: () => void;
  onReset: () => void;
}

export const Timer = ({ timerState, onToggle, onReset }: TimerProps) => {
  return (
    <view className="timer-container">
      <view className="timer-display">
        <text className="timer-time">{formatTime(timerState.time)}</text>
        <text className="timer-type">
          {timerState.type === 'exercise' ? 'Exercise Time' : 'Rest Time'}
        </text>
      </view>
      <view className="timer-controls">
        <Button 
          variant={timerState.isActive ? 'danger' : 'primary'}
          onClick={onToggle}
        >
          {timerState.isActive ? '⏸️ Pause' : '▶️ Start'}
        </Button>
        <Button 
          variant="outline" 
          onClick={onReset}
        >
          🔄 Reset
        </Button>
      </view>
    </view>
  );
};