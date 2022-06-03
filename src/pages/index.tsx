import styled from 'styled-components'

import type { NextPage } from 'next'

const Title = styled.h1`
  color: red;
`

const Home: NextPage = () => {
  console.log(process.env.NEXT_PUBLIC_CLIENT_ID_STAVA)
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Title>Welcome to Bothrs Strava Dashboard!</Title>
      <a
        href={`http://www.strava.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID_STAVA}&response_type=code&redirect_uri=http://localhost:3000/dashboard&approval_prompt=force&scope=read_all`}
      >
        Log in
      </a>
    </div>
  )
}

export default Home
