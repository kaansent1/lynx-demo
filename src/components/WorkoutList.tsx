import { useCallback } from '@lynx-js/react'
import type { Workout } from "../types.ts"

interface WorkoutListProps {
  workouts: Workout[]
  onAddWorkout: () => void
  onEditWorkout: (workout: Workout) => void
  onDeleteWorkout: (workoutId: string) => void
  onStartWorkout: (workout: Workout) => void
}

export function WorkoutList({
  workouts,
  onAddWorkout,
  onEditWorkout,
  onDeleteWorkout,
  onStartWorkout
}: WorkoutListProps) {
  const formatDate = useCallback((dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('de-DE')
  }, [])
  return (
    <view className='WorkoutList'>
      <view className='ListHeader'>
        <text className='ListTitle'>Meine Workouts</text>
        <view className='AddButton' bindtap={onAddWorkout}><text className='AddButtonText'>+ Neues Workout/</text>
        </view>
      </view>

      {workouts.length === 0 ? (
        <view className='EmptyState'>
          <text className='EmptyStateText'>Noch keine erstellt</text>
          <text className='EmptyStateSubText'>Erstelle dein erstes Workout!</text>
        </view>  
      ) : (
        <view className='WorkoutCards'>
          {workouts.map(workout => (
            <view key={workout.id} className='WorkoutCard'>
              <view className='WorkoutCardHeader'>
                <text className='WorkoutCardTitle'>{workout.name}</text>
                <text className='WorkoutCardDate'>{formatDate(workout.date)}</text>
              </view>
              <text className='WorkoutCardInfo'>
                {workout.exercises.length} Übungen
              </text>
              <view className='WorkoutCardActions'>
                <view 
                  className='ActionButton StartButton' 
                  bindtap={() => onStartWorkout(workout)}
                >
                  <text className='ActionButtonText'>▶ Starten</text>
                </view>
                <view 
                  className='ActionButton EditButton' 
                  bindtap={() => onEditWorkout(workout)}
                >
                  <text className='ActionButtonText'>✏ Bearbeiten</text>
                </view>
                <view 
                  className='ActionButton DeleteButton' 
                  bindtap={() => onDeleteWorkout(workout.id)}
                >
                  <text className='ActionButtonText'>🗑 Löschen</text>
                </view>
              </view>
            </view>
          ))}
        </view>
      )}
    </view>
  )
}