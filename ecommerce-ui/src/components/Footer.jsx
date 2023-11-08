import { Typography } from '@mui/material'
import React from 'react'
import { styled } from 'styled-components'

const Footer = () => {
  return (
    <div style={{ 
      marginTop:"auto",
      width: "100%",
      height: "70px", 
      background: "#352F44",
      display: "flex",
      justifyContent: 'center',
      alignItems: "center"
    }}>
      <Typography variant='h7'color='#d3d3d3'>Copyright Nepal Mart @2023</Typography>
    </div>
  )
}

export default Footer

