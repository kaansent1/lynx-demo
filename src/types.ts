export interface Exercise {
  id: string
  name: string
  sets: number
  reps: number
  weight?: number
  duration?: number // in seconds
}

export interface Workout {
  id: string
  name: string
  exercises: Exercise[]
  date: string
}