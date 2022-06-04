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
    // const tokenData = await tokenResponse.json()
    // //GET ALL USERS FROM CLUB
    // const clubResponse = await fetch(
    //   `https://www.strava.com/api/v3/clubs/${process.env.STRAVA_CLUB_ID}/members
    //   `,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${tokenData.access_token}`,
    //     },
    //   }
    // )
    // const clubData = await clubResponse.json()
    // //GET ALL DATA FROM USERS IN CLUB

    // console.log(clubData)
    // const userIds = clubData

    console.log('token airtable', process.env.AIRTABLE_API_KEY)

    const usersPromise = await fetch(
      'https://api.airtable.com/v0/appVzgNst5ii1659k/participants?maxRecords=3&view=Grid%20view',
      {
        headers: {
          Authorization: ('Bearer ' + process.env.AIRTABLE_API_KEY) as string,
        },
      }
    )

    const airtableUser = await usersPromise.json()
    const userIds = airtableUser?.records
      .map((user: unknown) => user.fields.profile_url)
      .map((url: string) => url.split('/').at(-1))
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
