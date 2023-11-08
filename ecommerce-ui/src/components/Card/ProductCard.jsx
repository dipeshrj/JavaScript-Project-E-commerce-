import { Button, Card, CardActions, CardContent, CardMedia, Grid, Popover, Stack, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import { deleteProduct } from '../lib/apis/product.apis';


const ProductCard = (props) => {
  const { name, company, price, _id } = props
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate()
  const queryCLient = useQueryClient()
  
  // extract role from local storage
  const role = localStorage.getItem('role')
  
  // mutate
  const deleteProductMutation = useMutation({
    mutationKey: ["delete-product"],
    mutationFn: () => deleteProduct(_id),
    onSuccess: () => {
      queryCLient.invalidateQueries("products")
    }
  })

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

   const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  if (deleteProductMutation.isLoading) {
  return <Loader/>
}
  return (
    <>
    <Popover
        id={_id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Grid sx={{padding:"1rem"}}>
        <Typography sx={{ p: 2 }}>Are you sure you want to delete this?</Typography>
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
              deleteProductMutation.mutate()
            }}>Yes</Button>
            <Button size= 'small' variant='outlined' onClick={()=>{handleClose()}}>No</Button>
        </Stack>
        </Grid>
      </Popover>

      <Card sx={{
        maxWidth: 345,
        boxShadow: " 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
        margin: "5px",
        padding:"0.5rem"
      }}>
      <CardMedia
        sx={{
          height: 190,
          width: 250,
          objectFit: "cover",
          cursor:"pointer"
        }}
        onClick={() => navigate(`/product/details/${_id}`)}
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTepyTqav6Ev1Ah_CUgxJD4XfuNyyUPfNlZA&usqp=CAU"
        title="green iguana"

      />
      <CardContent>
          <Grid container sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            fontFamily:"sans-serif"
          }}>
          <Grid item>
            
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
          </Grid>
          <Grid item sx={{display:"flex",flexDirection:"column"}}>
          <Typography gutterBottom variant="h7" component="div">
          {company}
              </Typography>
              <Typography gutterBottom variant="h7" component="div">
          Rs. {price}
        </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
        <CardActions >
        {role==="seller"&&
            <Button size="medium"  onClick={(event) => { handleClick(event) }}><AiOutlineDelete size={25} /></Button> }
        <Button size="small" variant='contained' sx={{marginLeft:"0.5rem"}}
          onClick={() => navigate(`/product/details/${_id}`)}
        >More Details</Button>
      </CardActions>
      </Card>
      </>
  )
}

export default ProductCard