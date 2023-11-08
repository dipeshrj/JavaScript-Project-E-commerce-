import React from 'react'
import { styled } from 'styled-components'

const Home = () => {
  return (
      <StyledDiv >
          <h1>Home</h1>
          
    </StyledDiv>
  )
}

export default Home

const StyledDiv = styled.div`
    display: grid;
    place-content: center;
    height: 100vh;
    width: 100vw;
  `