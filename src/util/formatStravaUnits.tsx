export const formatStravaDistanceToKm = (distanceInMeters: number) => {
  return (distanceInMeters / 1000).toFixed(2) + ' km'
}
