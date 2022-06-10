import { Activity } from '../types/activity'

export function groupBy(
  list: Activity[],
  keyGetter: (activity: Activity) => string
) {
  const map = new Map()
  list.forEach((item) => {
    const key = keyGetter(item)
    const collection = map.get(key)
    if (!collection) {
      map.set(key, [item])
    } else {
      collection.push(item)
    }
  })
  return map
}
