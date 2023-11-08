import { Avatar, Badge, Box, Button, Grid, Popover, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingCart } from "react-icons/fa";
import { styled } from 'styled-components';
import { BiLogOut } from "react-icons/bi";


const Header = () => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);


    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
     const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <>
      <Popover
        // id={_id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Grid sx={{padding:"1rem"}}>
        <Typography sx={{ p: 2 }}>Are you sure you want to log out?</Typography>
          <Stack sx={
            {
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "row",
              gap:"1rem"
            }
          }>
            <Button size='small' variant='contained'
              onClick={() => {
              handleClose(), 
              navigate("/login")
            }}>Yes</Button>
            <Button size= 'small' variant='outlined' onClick={()=>{handleClose()}}>No</Button>
        </Stack>
        </Grid>
      </Popover>
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignContent:"center",
      height:"80px",
      width:"100vw",
      padding: "0.5rem",
      boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
      backgroundColor: "#B9B4C7",

    }}>
      <Grid container sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",   
        }}>
        <Grid item
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80px",
          marginLeft:"1rem"
          }}
        >
          <img
            src='\images\nepal-mart-logo.png'
            height={140}
            width={140}
            style={{ objectFit: "contain" }} />
          <Typography variant="h4">Nepal Mart</Typography>
        </Grid>

        <Grid item
          sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
            gap: "3rem",
            height: "80px",          
        }}
        >
          <Link to='/'><StyledLink variant="h4">Home</StyledLink></Link>
          <Link to='/products'><StyledLink variant="h4">Products</StyledLink></Link>
          <Link to='/about'><StyledLink variant="h4">About</StyledLink></Link>
        </Grid>

        <Grid item
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "1rem",
          height: "80px",
          alignItems: "center",
          marginRight:"2rem",          
          }}
        > 
          <Badge badgeContent={4} color="secondary" sx={{marginRight:"30px"}}>
            <FaShoppingCart size={30} />
          </Badge>
          <Avatar alt="Chris Hemsworth" src="\images\avatar-image.png" sx={{height:"50px",width:"50px"}} />
          <Button 
            onClick={(event) => { handleClick(event) }}><BiLogOut size={25} color='black' />
          </Button>
        </Grid>

      </Grid>
      </Box>
      </>
  )
}

export default Header


const StyledLink = styled(Typography)`
  color: #352F44
`