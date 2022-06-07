export interface Activity {
  resource_state: number
  athlete: ActivityAthlete
  name: string
  distance: number
  moving_time: number
  elapsed_time: number
  total_elevation_gain: number
  type: string
  workout_type: string
}

export interface ActivityAthlete {
  resource_state: number
  firstname: string
  lastname: string
}
