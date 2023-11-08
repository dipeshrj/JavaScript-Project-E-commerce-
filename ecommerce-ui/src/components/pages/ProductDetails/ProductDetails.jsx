import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { $axios } from '../../lib/axios'
import { GrAdd, GrSubtract } from 'react-icons/gr';
import Loader from '../../Loader';
import { IoReturnUpBackSharp } from "react-icons/io5";


const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState([])
  const [counter, setCounter] = useState(1)
  const [isLoading, setIsLoading]= useState(false)
  const params = useParams()
  const navigate = useNavigate()

    const productId = params.id

    const getProductDetails = async() => {
      try {
          setIsLoading(true)
            const response = await $axios.get(`/product/details/${productId}`)
        setProductDetails(response.data)
          setIsLoading(false)
        
      } catch (error) {
          setIsLoading(false)
        
            console.log(error.message)
        }
    }

    useEffect(() => {
        getProductDetails()
    }, [])
  
  if (isLoading) {
    return <Loader/>
  }
  return (
      <>
      <Box sx={{
        minHeight:"70vh",
        display: "flex",
        justifyContent: "center",
        margin: "auto",
        padding: "1rem",
        flexDirection: "column",
        gap:"1rem"
      }}>
        <Button onClick={() => navigate("/products")} variant='contained' size='small' sx={{
        margin:"0.5rem 1rem",
        width: "35px",
        }}>
        <IoReturnUpBackSharp size={25} />
        </Button>

        <Grid container
          sx={{
            height: "400px",
            minWidth:"1000px",
            display: "flex",
            justifyContent: "center",
            flexDirection:"row",
            margin: "auto",
            boxShadow: " 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
            marginRight: "1rem",
            padding: "1rem",
            gap:"5px"
        }}>
          <Grid item sx={{
            width: "49.5%",
            padding: "3rem 0",
            display: "flex",
            justifyContent: "center",
          }}>
            <CardMedia
        sx={{
                height: 260,
                width:450,  
                objectFit: "cover",
        }}
        image="https://www.rochester.co.za/media/catalog/product/cache/2bc2f148dc23cafaa22d929dc6e18cfe/1/0/10282069_hfc_ecommerce_622e.png"
        title="TV"
      />
          </Grid>
          <Grid item sx={{
            width: "49.5%",
            padding: "1rem",
            fontSize:"1.5rem"
          }}>
            <Typography variant='h4' >Name: { productDetails.name}</Typography>
            <Typography variant='h5'>Company: { productDetails.company}</Typography>
            <Typography variant='h6'>Price: Rs { productDetails.price}</Typography>
            <Typography variant='h6'>Free Shipping: { productDetails.freeShipping === true ? "Yes":"No"}</Typography>
            <Typography variant='h6'>Quantity:{ productDetails.quantity}</Typography>
            <Typography variant='h6'>Category: { productDetails.category}</Typography>
            <Typography >Product Description</Typography>
            <Grid item sx={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
            }}>  
            <Typography>No. of items</Typography>
              <Button onClick={() => {
                if (counter === productDetails.quantity) {
                setCounter(counter)
                } else {
                setCounter(counter+1)
                }
              }} variant='outlined' >
                <GrAdd  size={30} />
              </Button>
              <Typography variant='h4'>{counter}</Typography>
              <Button onClick={() => {
                if (counter === 1) {
                setCounter(1)
                } else {
                setCounter(counter-1)
                }
              }} variant='outlined' >
                <GrSubtract  size={30}/>
              </Button>
            </Grid>
          </Grid>
        </Grid>
            </Box>
      </>
  )
}

export default ProductDetails