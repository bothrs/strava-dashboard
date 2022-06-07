import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { stravaAuth } = req.cookies
    const activitiesResponse = await fetch(
      `https://www.strava.com/api/v3/clubs/${process.env.STRAVA_CLUB_ID}/members
        `,
      {
        headers: {
          Authorization: `Bearer ${stravaAuth}`,
        },
      }
    )
    const activitiesData = await activitiesResponse.json()
    res.json(activitiesData)
  } catch (error) {
    console.log(error)
  }
}

export const getClubActivities = async (stravaAuth: string) => {
  const activitiesResponse = await fetch(
    `https://www.strava.com/api/v3/clubs/${process.env.STRAVA_CLUB_ID}/activities
      `,
    {
      headers: {
        Authorization: `Bearer ${stravaAuth}`,
      },
    }
  )
  return await activitiesResponse.json()
}
