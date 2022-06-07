import cookie, { serialize } from 'cookie'
import { NextPage, NextPageContext } from 'next'

import { Activity } from '../types/activity'

import { getClubActivities } from './api/club/getClubActivities'
import { getStraveToken } from './api/token/getStravaToken'

const cookieOptions: cookie.CookieSerializeOptions = {
  httpOnly: true,
  maxAge: 21600,
  path: '/',
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
}

export async function getServerSideProps(context: NextPageContext) {
  try {
    const stravaCode = context.query.code as string
    let { stravaAuth } = cookie.parse(context.req?.headers.cookie || '')
    if (!stravaCode && context.res && !stravaAuth) {
      context.res.statusCode = 302
      context.res.setHeader('Location', `/`)
      return { props: {} }
    }
    if (!stravaAuth && context.res) {
      const tokenData = await getStraveToken(stravaCode)
      stravaAuth = tokenData.access_token
      context.res.setHeader(
        'Set-Cookie',
        serialize('stravaAuth', tokenData.access_token, cookieOptions)
      )
    }

    const activitiesData = await getClubActivities(stravaAuth)
    return {
      props: {
        activitiesData,
      },
    }
  } catch (error) {
    console.log(error)
    context.res?.setHeader('Location', `/`)
    return { props: {} }
  }
}

interface Props {
  activitiesData: Activity[]
}

const Dashboard: NextPage<Props> = ({ activitiesData }: Props) => {
  const runningActivities = activitiesData.filter((activity) => {
    return activity.type === 'Run'
  })
  const noSport = activitiesData.filter((activity) => {
    return activity.type === 'Yoga'
  })

  return (
    <div style={{ margin: '20px' }}>
      <h1>Dashboard</h1>
      <div style={{ display: 'flex', gap: '50px' }}>
        <div>
          <h2>All</h2>
          {activitiesData.map((activity, index) => (
            <div key={`all-${index}`}>
              {activity.name} - {activity.type}
            </div>
          ))}
        </div>
        <div>
          <h2>Running</h2>
          {runningActivities.map((activity, index) => (
            <div key={`running-${index}`}>
              {activity.name} - {activity.type}
            </div>
          ))}
        </div>
        <div>
          <h2>No Sport</h2>
          {noSport.map((activity, index) => (
            <div key={`no-sport-${index}`}>
              {activity.name} - {activity.type}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default Dashboard
