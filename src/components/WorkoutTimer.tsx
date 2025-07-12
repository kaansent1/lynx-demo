import { useCallback, useEffect, useState } from '@lynx-js/react'
import type { Workout } from '../types.ts'

interface WorkoutTimerProps {
  workout: Workout
  onComplete: () => void
}

export function WorkoutTimer({ workout, onComplete }: WorkoutTimerProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [currentSet, setCurrentSet] = useState(1)
  const [isResting, setIsResting] = useState(false)
  const [restTime, setRestTime] = useState(60) // 60 Sekunden Pause
  const [timeLeft, setTimeLeft] = useState(60)
  const [isActive, setIsActive] = useState(false)

  const currentExercise = workout.exercises[currentExerciseIndex]
  const isLastExercise = currentExerciseIndex === workout.exercises.length - 1
  const isLastSet = currentSet === currentExercise?.sets

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)
      if (isResting) {
        onNextSet()
      }
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, isResting])

  const onNextSet = useCallback(() => {
    if (isLastSet && isLastExercise) {
      // Workout beendet
      onComplete()
      return
    }

    if (isLastSet) {
      // Nächste Übung
      setCurrentExerciseIndex(prev => prev + 1)
      setCurrentSet(1)
    } else {
      // Nächster Satz
      setCurrentSet(prev => prev + 1)
    }
    
    setIsResting(false)
    setIsActive(false)
    setTimeLeft(restTime)
  }, [isLastSet, isLastExercise, restTime, onComplete])

  const onCompleteSet = useCallback(() => {
    if (!isLastSet || !isLastExercise) {
      setIsResting(true)
      setTimeLeft(restTime)
      setIsActive(true)
    } else {
      onNextSet()
    }
  }, [isLastSet, isLastExercise, restTime, onNextSet])

  const onSkipRest = useCallback(() => {
    setIsActive(false)
    setTimeLeft(0)
    onNextSet()
  }, [onNextSet])

  const onStartRest = useCallback(() => {
    setIsActive(true)
  }, [])

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }, [])

  if (!currentExercise) return null

  return (
    <view className='WorkoutTimer'>
      <view className='TimerHeader'>
        <text className='WorkoutName'>{workout.name}</text>
        <text className='Progress'>
          Übung {currentExerciseIndex + 1} von {workout.exercises.length}
        </text>
      </view>

      <view className='CurrentExercise'>
        <text className='ExerciseName'>{currentExercise.name}</text>
        <text className='SetInfo'>
          Satz {currentSet} von {currentExercise.sets}
        </text>
        <text className='ExerciseDetails'>
          {currentExercise.reps} Wiederholungen
          {currentExercise.weight ? ` @ ${currentExercise.weight}kg` : ''}
        </text>
      </view>

      {isResting ? (
        <view className='RestTimer'>
          <text className='RestTitle'>Pause</text>
          <text className='RestTime'>{formatTime(timeLeft)}</text>
          <view className='RestActions'>
            <view className='TimerButton' bindtap={onSkipRest}>
              <text className='TimerButtonText'>Pause überspringen</text>
            </view>
            {!isActive && (
              <view className='TimerButton StartButton' bindtap={onStartRest}>
                <text className='TimerButtonText'>Timer starten</text>
              </view>
            )}
          </view>
        </view>
      ) : (
        <view className='SetActions'>
          <view className='TimerButton CompleteButton' bindtap={onCompleteSet}>
            <text className='TimerButtonText'>
              {isLastSet && isLastExercise ? 'Workout beenden' : 'Satz abgeschlossen'}
            </text>
          </view>
        </view>
      )}

      <view className='ExerciseList'>
        <text className='ListTitle'>Alle Übungen</text>
        {workout.exercises.map((exercise, index) => (
          <view 
            key={exercise.id} 
            className={`ExerciseOverview ${index === currentExerciseIndex ? 'Current' : ''} ${index < currentExerciseIndex ? 'Completed' : ''}`}
          >
            <text className='ExerciseOverviewName'>{exercise.name}</text>
            <text className='ExerciseOverviewDetails'>
              {exercise.sets} × {exercise.reps}
              {exercise.weight ? ` @ ${exercise.weight}kg` : ''}
            </text>
          </view>
        ))}
      </view>
    </view>
  )
}