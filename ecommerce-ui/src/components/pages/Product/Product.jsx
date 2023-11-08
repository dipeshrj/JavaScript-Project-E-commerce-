
import { useState } from "react"
// import "./Products.css"
import { useQuery } from "@tanstack/react-query"
import { fetchBuyerProducts, fetchSellerProducts } from "../../lib/apis/product.apis"
import Loader from "../../Loader"
import { Box, Button, Grid, InputBase, Pagination } from "@mui/material"
import ProductCard from "../../Card/ProductCard"
import { useNavigate } from "react-router-dom"
import SearchIcon from '@mui/icons-material/Search';



const Products = () => {
  const [searchText, setSearchText] = useState("")
  const [page, setPage] = useState(1)
  const navigate= useNavigate()
 const getPaginationData = (event, data) => {
    setPage(data)
  }
  
    // extract role from local storage
  const role = localStorage.getItem('role')

  // query
  
    const getAllProductsQuery= useQuery({
    queryKey: ["products",page,searchText],
    queryFn: role === "buyer" ? () => fetchBuyerProducts({ page, limit: 3, searchText }) :
      () => fetchSellerProducts({ page, limit: 3, searchText })
  })
// console.log(getAllProductsQuery)

  if (getAllProductsQuery?.isLoading) {
    return <Loader/>
  }
  return (
    <>
      
 <Box sx={{minheight:"430px"}}>
      <Grid container sx={{
        display: "flex",
        justifyContent: "space-between",
        margin: "1.5rem",
        paddingRight: "5rem",
        }}>
          <Grid item>
      <Box variant="outlined" sx={{
        border: "1px solid purple",
        borderRadius: "5px",
        marginLeft: "5rem",
        display: "flex",
        justifyContent: "center",
        width: "10rem",
        height:"35px"
      }}>
          <SearchIcon sx={{
            paddingTop: "4px",
            padddingLeft: "5px"
          }} />           
            <InputBase
            placeholder=" Search…"
            onChange={(event)=>setSearchText(event.target.value)}
            />
          </Box>
      </Grid>
          {role === "seller" && <Grid item>
            <Button onClick={() => navigate("/products/add")} variant="contained">Add Product</Button>
          </Grid>}
        </Grid>  
        <Grid container>
          <Grid item
           sx={{
            display: "flex",
             paddingRight: "1rem",
            paddingLeft:"1rem",
            flexDirection: "flex-wrap",
            gap: "1rem",
            margin: "auto",
                    }}>
            {
              getAllProductsQuery?.data?.data?.products?.map((item) => {
                return <ProductCard key={item._id}
                  {...item}
                />
              })
          }
        </Grid>
        </Grid>
        <Grid container sx={{
          display: "flex",
          justifyContent: "center",
          margin:"1rem"
        }}>
          <Pagination  count={getAllProductsQuery?.data?.data?.totalPage} variant="outlined" shape="rounded" onChange={getPaginationData}/>
      </Grid>
    </Box>
      </>
  )
}

export default Products

