import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const stravaCode = req.query.code as string
    const tokenData = await getStraveToken(stravaCode)
    res.json(tokenData)
  } catch (error) {
    console.log(error)
  }
}

export const getStraveToken = async (stravaCode: string) => {
  const tokenResponse = await fetch(
    'https://www.strava.com/api/v3/oauth/token',
    {
      body: `client_id=${process.env.NEXT_PUBLIC_CLIENT_ID_STAVA}&client_secret=${process.env.STRAVA_CLIENT_SECRET}&code=${stravaCode}&grant_type=authorization_code`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    }
  )
  return await tokenResponse.json()
}
