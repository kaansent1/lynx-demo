import { useState, useEffect, useCallback } from '@lynx-js/react';
import { TimerState } from '../store/types';

export const useTimer = () => {
  const [timerState, setTimerState] = useState<TimerState>({ 
    isActive: false, 
    time: 0, 
    type: 'exercise' 
  });

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (timerState.isActive) {
      interval = setInterval(() => {
        setTimerState(prev => ({ ...prev, time: prev.time + 1 }));
      }, 1000);
    } else if (!timerState.isActive && timerState.time !== 0) {
      if (interval) clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerState.isActive, timerState.time]);

  const toggleTimer = useCallback(() => {
    setTimerState(prev => ({ ...prev, isActive: !prev.isActive }));
  }, []);

  const resetTimer = useCallback(() => {
    setTimerState({ isActive: false, time: 0, type: 'exercise' });
  }, []);

  const startTimer = useCallback(() => {
    setTimerState(prev => ({ ...prev, isActive: true }));
  }, []);

  return {
    timerState,
    toggleTimer,
    resetTimer,
    startTimer,
    setTimerState
  };
};