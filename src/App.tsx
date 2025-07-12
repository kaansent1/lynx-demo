import { useCallback, useEffect, useState } from '@lynx-js/react'
import './App.css'
import { WorkoutList } from './components/WorkoutList.tsx'
import { WorkoutForm } from './components/WorkoutForm.tsx'
import { WorkoutTimer } from './components/WorkoutTimer.tsx'
import type { Workout } from './types.ts'

export function App(props: {
  onMounted?: () => void
}) {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [currentView, setCurrentView] = useState<'list' | 'form' | 'timer'>('list')
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null)
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null)

  useEffect(() => {
    console.info('Workout Planer App geladen')
    props.onMounted?.()
  }, [])

  const onAddWorkout = useCallback(() => {
    setEditingWorkout(null)
    setCurrentView('form')
  }, [])

  const onEditWorkout = useCallback((workout: Workout) => {
    setEditingWorkout(workout)
    setCurrentView('form')
  }, [])

  const onSaveWorkout = useCallback((workout: Workout) => {
    if (editingWorkout) {
      setWorkouts(prev => prev.map(w => w.id === workout.id ? workout : w))
    } else {
      setWorkouts(prev => [...prev, workout])
    }
    setCurrentView('list')
    setEditingWorkout(null)
  }, [editingWorkout])

  const onDeleteWorkout = useCallback((workoutId: string) => {
    setWorkouts(prev => prev.filter(w => w.id !== workoutId))
  }, [])

  const onStartWorkout = useCallback((workout: Workout) => {
    setSelectedWorkout(workout)
    setCurrentView('timer')
  }, [])

  const onBackToList = useCallback(() => {
    setCurrentView('list')
    setSelectedWorkout(null)
    setEditingWorkout(null)
  }, [])

  return (
    <view>
      <view className='Background' />
      <view className='App'>
        <view className='Header'>
          <text className='AppTitle'>💪 Workout Planer</text>
          {currentView !== 'list' && (
            <view className='BackButton' bindtap={onBackToList}>
              <text className='BackButtonText'>← Zurück</text>
            </view>
          )}
        </view>

        {currentView === 'list' && (
          <WorkoutList
            workouts={workouts}
            onAddWorkout={onAddWorkout}
            onEditWorkout={onEditWorkout}
            onDeleteWorkout={onDeleteWorkout}
            onStartWorkout={onStartWorkout}
          />
        )}

        {currentView === 'form' && (
          <WorkoutForm
            workout={editingWorkout}
            onSave={onSaveWorkout}
            onCancel={onBackToList}
          />
        )}

        {currentView === 'timer' && selectedWorkout && (
          <WorkoutTimer
            workout={selectedWorkout}
            onComplete={onBackToList}
          />
        )}
      </view>
    </view>
  )
}

