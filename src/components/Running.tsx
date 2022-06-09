import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

import { Activity } from '../types/activity'
import { formatStravaDistanceToKm } from '../util/formatStravaUnits'
import { groupBy } from '../util/groupActivities'

interface RunningProps {
  activities: Activity[]
}

type ActivitiesForUser = [string, Activity[]]

export function Running({ activities }: RunningProps) {
  const [activitiesPerUser, setActivitiesPerUser] =
    useState<ActivitiesForUser[]>()

  useEffect(() => {
    const res = groupBy(
      activities,
      (activity) => activity.athlete.firstname + ' ' + activity.athlete.lastname
    )

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setActivitiesPerUser([...res])
  }, [activities])

  const columns = [
    {
      name: 'Athlete',
      selector: (row: ActivitiesForUser) => row[0],
      sortable: true,
    },
    {
      name: 'distance in km',
      selector: (row: ActivitiesForUser) =>
        formatStravaDistanceToKm(
          row[1].reduce((a, b) => a + (b.distance || 0), 0)
        ),
      sortable: true,
    },
  ]

  if (!activitiesPerUser) {
    return null
  }

  return <DataTable columns={columns} data={activitiesPerUser} />
}
