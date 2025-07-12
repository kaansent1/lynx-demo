import { useCallback, useState } from '@lynx-js/react'
import type{ Workout, Exercise } from '../types.ts'

interface WorkoutFormProps {
  workout?: Workout | null
  onSave: (workout: Workout) => void
  onCancel: () => void
}

export function WorkoutForm({ workout, onSave, onCancel }: WorkoutFormProps) {
  const [name, setName] = useState(workout?.name || '')
  const [exercises, setExercises] = useState<Exercise[]>(workout?.exercises || [])
  const [newExercise, setNewExercise] = useState<Partial<Exercise>>({
    name: '',
    sets: 3,
    reps: 12,
    weight: 0
  })

  const onAddExercise = useCallback(() => {
    if (newExercise.name?.trim()) {
      const exercise: Exercise = {
        id: Date.now().toString(),
        name: newExercise.name.trim(),
        sets: newExercise.sets || 3,
        reps: newExercise.reps || 12,
        weight: newExercise.weight || 0
      }
      setExercises(prev => [...prev, exercise])
      setNewExercise({ name: '', sets: 3, reps: 12, weight: 0 })
    }
  }, [newExercise])

  const onRemoveExercise = useCallback((exerciseId: string) => {
    setExercises(prev => prev.filter(e => e.id !== exerciseId))
  }, [])

  const onSaveWorkout = useCallback(() => {
    if (name.trim() && exercises.length > 0) {
      const workoutData: Workout = {
        id: workout?.id || Date.now().toString(),
        name: name.trim(),
        exercises,
        date: workout?.date || new Date().toISOString()
      }
      onSave(workoutData)
    }
  }, [name, exercises, workout, onSave])
  
  return (
    <view className='WorkoutForm'>
      <scroll-view className='FormScrollContainer'>
        <text className='FormTitle'>
          {workout ? 'Workout bearbeiten' : 'Neues Workout'}
        </text>

        <view className='FormGroup'>
          <text className='FormLabel'>Workout Name</text>
          <input
            className='FormInput'
            value={name}
            placeholder='z.B. Push Day'
            bindinput={(e: any) => setName(e.detail.value)}
          />
        </view>

        <view className='FormGroup'>
          <text className='FormLabel'>Übungen hinzufügen</text>
          <view className='ExerciseForm'>
            <input
              className='FormInput'
              value={newExercise.name}
              placeholder='Übungsname'
              bindinput={(e: any) => setNewExercise(prev => ({ ...prev, name: e.detail.value }))}
            />
            <view className='ExerciseInputs'>
              <view className='InputGroup'>
                <text className='InputLabel'>Sätze</text>
                <input
                  className='FormInput Small'
                  type='number'
                  value={newExercise.sets?.toString()}
                  bindinput={(e: any) => setNewExercise(prev => ({ ...prev, sets: parseInt(e.detail.value) || 3 }))}
                />
              </view>
              <view className='InputGroup'>
                <text className='InputLabel'>Wdh.</text>
                <input
                  className='FormInput Small'
                  type='number'
                  value={newExercise.reps?.toString()}
                  bindinput={(e: any) => setNewExercise(prev => ({ ...prev, reps: parseInt(e.detail.value) || 12 }))}
                />
              </view>
              <view className='InputGroup'>
                <text className='InputLabel'>Gewicht (kg)</text>
                <input
                  className='FormInput Small'
                  type='number'
                  value={newExercise.weight?.toString()}
                  bindinput={(e: any) => setNewExercise(prev => ({ ...prev, weight: parseFloat(e.detail.value) || 0 }))}
                />
              </view>
            </view>
            <view className='AddExerciseButton' bindtap={onAddExercise}>
              <text className='AddExerciseButtonText'>+ Übung hinzufügen</text>
            </view>
          </view>
        </view>

        {exercises.length > 0 && (
          <view className='ExerciseList'>
            <text className='FormLabel'>Übungen ({exercises.length})</text>
            {exercises.map(exercise => (
              <view key={exercise.id} className='ExerciseItem'>
                <view className='ExerciseInfo'>
                  <text className='ExerciseName'>{exercise.name}</text>
                  <text className='ExerciseDetails'>
                    {exercise.sets} Sätze × {exercise.reps} Wdh.
                    {exercise.weight ? ` @ ${exercise.weight}kg` : ''}
                  </text>
                </view>
                <view 
                  className='RemoveExerciseButton' 
                  bindtap={() => onRemoveExercise(exercise.id)}
                >
                  <text className='RemoveExerciseButtonText'>×</text>
                </view>
              </view>
            ))}
          </view>
        )}

        {/* Spacer für besseren Abstand zum Button */}
        <view className='FormSpacer' />
      </scroll-view>

      {/* Buttons außerhalb des Scroll-Bereichs */}
      <view className='FormActions'>
        <view className='FormButton CancelButton' bindtap={onCancel}>
          <text className='FormButtonText'>Abbrechen</text>
        </view>
        <view className='FormButton SaveButton' bindtap={onSaveWorkout}>
          <text className='FormButtonText'>Speichern</text>
        </view>
      </view>
    </view>
  )
}