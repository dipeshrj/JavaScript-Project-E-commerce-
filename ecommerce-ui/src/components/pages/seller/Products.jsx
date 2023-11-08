// import { Box, Button, Grid, Pagination } from '@mui/material'
// import React, { useEffect, useState } from 'react'
// import ProductCard from '../../Card/ProductCard'
// import { $axios } from '../../lib/axios'
// import "./Products.css"
// import { useQuery } from '@tanstack/react-query'
// import { fetchBuyerProducts } from '../../lib/apis/product.apis'
// import Loader from '../../Loader'

// const Products = () => {
//   const [page, setPage] = useState(1)
//  const getPaginationData = (event, data) => {
//     setPage(data)
//   }

//   // query
//   const {data, isError, isLoading} = useQuery({
//     queryKey: ["buyer-products",page],
//     queryFn: ()=> fetchBuyerProducts({page, limit:3})
//   })

//   if (isLoading) {
//     return <Loader/>
//   }
//   return (
//       <>
//  <Box sx={{minheight:"430px"}}>
//       <Grid container sx={{
//         display: "flex",
//         justifyContent: "flex-end",
//         margin: "1rem",
//         paddingRight:"3rem"
//       }}>
//         <Grid item>
//           <Button to="/product" variant="outlined">Add Product</Button>
//         </Grid>
//         </Grid>  
//         <Grid container>
//           <Grid item
//            sx={{
//             display: "flex",
//              paddingRight: "1rem",
//             paddingLeft:"1rem",
//             flexDirection: "flex-wrap",
//             gap: "1rem",
//             margin: "auto",
//                     }}>
//             {
//               data?.data?.map((item) => {
//                 return <ProductCard key={item._id}
//                   {...item}
//                 />
//               })
//           }
//         </Grid>
//         </Grid>
//         <Grid container sx={{
//           display: "flex",
//           justifyContent: "center",
//           margin:"1rem"
//         }}>
//           <Pagination  count={10} variant="outlined" shape="rounded" onChange={getPaginationData}/>
//       </Grid>
//     </Box>
//       </>
//   )
// }

// export default Products

