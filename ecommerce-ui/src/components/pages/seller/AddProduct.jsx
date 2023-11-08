import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Formik } from 'formik';
import React from 'react';
import { IoReturnUpBackSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import Loader from '../../Loader';
import { addProduct } from '../../lib/apis/product.apis';
import "./AddProduct.css";

const AddProduct = () => {
  const navigate = useNavigate()
  
// mutate
    const addProductMutation = useMutation({
      mutationKey: ["add-product"],
      mutationFn: (values) => addProduct(values),
      onSuccess: ()=>navigate("/products")
     })

  if (addProductMutation.isLoading) {
    return <Loader/>
  }
  return (
      <div className='divContainer'>
      <Button onClick={() => navigate("/products")} variant='contained' size='small' sx={{
        margin:"1rem 2rem",
        width: "50px",
      }}><IoReturnUpBackSharp size={25} /></Button>
    <Formik
        initialValues={{
          name: '',
          company: '',
          price: 0,
          freeShipping: '',
          quantity: 0,
          inStock: '',
          category: ''
        }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(55, "Must be at most 55 characters.")
            .required("Name is required.")
            .min(2, "Must be at least 2 characters.")
            .trim(),
        company: Yup.string()
          .max(55, "Must be at most 55 characters.")
            .required("Company name is required.")
            .min(2, "Must be at least 2 characters.")
            .trim(),
        price: Yup.number().required('Price is required')
              .min(0,"Price cannot be 0."),
        freeShipping: Yup.boolean().required("Free Shipping cannot be empty"),
        quantity: Yup.number().min(1,"Quantity must be at least 1.").integer(),
        inStock: Yup.boolean().required("In Stock cannot be empty").default(true),
        category: Yup.mixed().oneOf(["groceries","electronics","furniture","kitchen","cosmetics","clothing","accessories","bakery","liquor"]).required()
        
      })}
      onSubmit={async(values) => {
        addProductMutation.mutate(values)
      }}
    >
        {({ errors, handleSubmit, touched, getFieldProps }) => (
          
          <form className='form' onSubmit={handleSubmit}>
                  <Typography variant="h5" sx={{display:"block", margin:"auto",textAlign:"center"}}>Add Product</Typography>

                      
            <TextField
              name="name"
              label="Product Name"
              {...getFieldProps("name")}
            />
            {touched.name && errors.name ? (
              <div className="error-message">{errors.name}</div>
            ) : null}

            <TextField
              name="company"
              label="Company"
              {...getFieldProps("company")}
            />
            {touched.company && errors.company ? (
              <div className="error-message">{errors.company}</div>
            ) : null}

            <TextField
              name="price"
              label="Price"
              {...getFieldProps("price")}
              type="number"
            />
            {touched.price && errors.price ? (
              <div className="error-message">{errors.price}</div>
            ) : null}

            <FormControl sx={{width:"224px"}}>
           <InputLabel id="demo-simple-select-label">Category</InputLabel>
           <Select
             name="category"
                label="Category"
                {...getFieldProps("category")}
            >
              <MenuItem value={"groceries"}>Groceries</MenuItem>
                <MenuItem value={"electronics"}>Electronics</MenuItem>
                <MenuItem value={"furniture"}>Furniture</MenuItem>
                <MenuItem value={"kitchen"}>Kitchen</MenuItem>
                <MenuItem value={"accessories"}>Accessories</MenuItem>
                <MenuItem value={"bakery"}>Bakery</MenuItem>
                <MenuItem value={"liquor"}>Liquor</MenuItem>
                <MenuItem value={"cosmetics"}>Cosmetics</MenuItem>
                <MenuItem value={"clothing"}>Clothing</MenuItem>
              </Select>
              {touched.category && errors.category ? (
              <div className="error-message">{errors.category}</div>
            ) : null}
          </FormControl>
          

           <FormControl sx={{width:"224px"}}>
           <InputLabel id="demo-simple-select-label">Free Shipping</InputLabel>
           <Select
             name="freeShipping"
                label="Free Shipping"
                {...getFieldProps("freeShipping")}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
              </Select>
              {touched.freeShipping && errors.freeShipping ? (
              <div className="error-message">{errors.freeShipping}</div>
            ) : null}
          </FormControl>
            
            <TextField
              name="quantity"
              label="Quantity"
              {...getFieldProps("quantity")}
              type="number"
            />
            {touched.quantity && errors.quantity ? (
              <div className="error-message">{errors.quantity}</div>
            ) : null}

                      
            <FormControl sx={{width:"224px"}}>
           <InputLabel id="demo-simple-select-label">In Stock</InputLabel>
           <Select
             name="inStock"
                label="In Stock"
                {...getFieldProps("inStock")}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
              </Select>
              {touched.inStock && errors.inStock ? (
              <div className="error-message">{errors.inStock}</div>
            ) : null}
          </FormControl>

           <Button
              variant="contained"
              type="submit"
              sx={{ marginTop: "1rem" }}
            >
              Add Product
              </Button>
        </form>
      )}
    </Formik>
    </div>
  )
}

export default AddProduct