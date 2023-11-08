import { Button, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { $axios } from '../../lib/axios';
import "./Login.css";
import { styled } from 'styled-components';
import Loader from '../../Loader';


const Login = () => {

  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const navigate = useNavigate()
  
  if (loading) {
  return <Loader/>
}
  return (
    <StyledDivContainer>
      <Formik
       initialValues={{ email: '',password: ''}}
       validationSchema={Yup.object({
         email: Yup.string().email('Invalid email address')
           .required('Email is required').trim(),
         password: Yup.string()
           .required('Required')
         .trim(),
         
       })}
       onSubmit={async (values, ) => {
        console.log(values)
         try {
           setLoading(true)
          //  hit route
           const response = await $axios.post("/user/login", values)
           
          //  extract access Token
           const accesstoken = response.data.access_token

          //  save accesstoken to local storage
           localStorage.setItem('accesstoken', accesstoken)
           
            //  extract role
           const role = response.data.user.role
           //  save role of person
           localStorage.setItem('role', role)
           
          // navigate to home page
           navigate("/")
           console.log(response.data)
           
         } catch (error) {
           setIsError(true)
          console.log(error.response.data.message)
         } finally {
           setLoading(false)
        }
       }}
      >
        {({ errors, handleSubmit, touched, getFieldProps }) => (
        
          <Form className='form'>
      <Typography variant="h4" sx={{display:"block", margin:"auto",textAlign:"center"}}>Login Page</Typography>

            
            <TextField name="email" label="Email" {...getFieldProps("email")} />
            {touched.email && errors.email ? (
              <div className="error-message">{errors.email}</div>
            ) : null}
          
 
            <TextField
              name="password"
              label="Password"
              type="password"
              {...getFieldProps("password")}
            />
            {touched.password && errors.password ? (
              <div className="error-message">{errors.password}</div>
            ) : null}
 
             <Button variant="contained" type="submit">Login</Button>
              <Link to="/register">Does not have an account?</Link>
          </Form>
        )}
     </Formik>
    </StyledDivContainer>
  )
}

export default Login


const StyledDivContainer = styled.div`
    display: grid;
    place-content: center;
    height: 100vh;
    width: 100vw;
`