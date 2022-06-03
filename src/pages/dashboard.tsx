import axios from 'axios'
import { NextPage, NextPageContext } from 'next'

export async function getServerSideProps(context: NextPageContext) {
  const bearerCode = context.query.code
  if (!bearerCode && context.res) {
    context.res.statusCode = 302
    context.res.setHeader('Location', `/`)
    return { props: {} }
  }
  //GET ALL USERS
  const clubData = await axios.get(
    `https://www.strava.com/api/v3/clubs/${process.env.STRAVA_CLUB_ID}/members`,
    {
      headers: {
        Authorization: `Bearer ${bearerCode}`,
      },
    }
  )
  //GET ALL DATA FROM USERS IN CLUB

  return {
    props: {}, // will be passed to the page component as props
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
