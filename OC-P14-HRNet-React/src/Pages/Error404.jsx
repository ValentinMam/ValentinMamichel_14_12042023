import React from 'react'
import { styled } from 'styled-components'
import { Link as routerLink } from 'react-router-dom'
import { Link } from '@mui/material'

const Container404 = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`

const Number404 = styled.h1`
  font-size: 8rem;
  color: #586f05;
  font-weight: 700;
  font-size: 12rem;
`

const Oups = styled.h2`
  color: #93ad18;
  font-weight: 500;
  font-size: 1.5rem;
  text-align: center;
`

function Error404() {
  return (
    <Container404>
      <Number404>404</Number404>
      <Oups>Oups ! La page que vous demandez n'existe pas.</Oups>
      <Link to="/" component={routerLink}>
        Back Home
      </Link>
    </Container404>
  )
}

export default Error404
