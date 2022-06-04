import axios from 'axios'
import { NextPage, NextPageContext } from 'next'

export async function getServerSideProps(context: NextPageContext) {
  const stravaCode = context.query.code
  if (!stravaCode && context.res) {
    context.res.statusCode = 302
    context.res.setHeader('Location', `/`)
    return { props: {} }
  }
  try {
    //GET TOKEN
    const { data: tokenData } = await axios.post(
      `https://www.strava.com/oauth/token`,
      {
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID_STAVA,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        code: stravaCode,
        grant_type: 'authorization_code',
      },
      {
        header: {},
      }
    )
    //GET ALL USERS
    const { data: clubData } = await axios.get(
      `https://www.strava.com/api/v3/clubs/${process.env.STRAVA_CLUB_ID}/members?page=&per_page=20`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    )
    //GET ALL DATA FROM USERS IN CLUB
    console.log(clubData)
    return {
      props: {}, // will be passed to the page component as props
    }
  } catch (error) {
    console.log(error)
  }
}

const Dashboard: NextPage = () => {
  return (
    <div>
      <p>Dashboard</p>
    </div>
  )
}
export default Dashboard
