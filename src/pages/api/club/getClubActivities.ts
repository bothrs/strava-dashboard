import { NextApiRequest, NextApiResponse } from 'next'

import { Activity } from '../../../types/activity'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { stravaAuth } = req.cookies
    const activitiesData = await getAllClubActivities(stravaAuth)
    res.json(activitiesData)
  } catch (error) {
    console.log(error)
  }
}

export const getAllClubActivities = async (stravaAuth: string) => {
  //REMARK: Strava has a rate limit of 100 calls per 15min (0, 15, 30, 45) and 1000 calls per day
  let allActivities: Activity[] = []
  let currentPage = 1
  while (currentPage !== 0) {
    console.log(currentPage)
    const activitiesResponse = await fetch(
      `https://www.strava.com/api/v3/clubs/${process.env.STRAVA_CLUB_ID}/activities?page=${currentPage}&per_page=200`,
      {
        headers: {
          Authorization: `Bearer ${stravaAuth}`,
        },
      }
    )
    const pageActivities = await activitiesResponse.json()
    if (pageActivities.length > 0) {
      allActivities = [...allActivities, ...pageActivities]
      currentPage++
    } else {
      currentPage = 0
    }
  }
  return allActivities
}
