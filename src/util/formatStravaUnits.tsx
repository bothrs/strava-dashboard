export const formatStravaDistanceToKm = (distanceInMeters: number) => {
  return Math.round(distanceInMeters / 1000)
}
