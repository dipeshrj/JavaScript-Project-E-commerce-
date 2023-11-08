import React from 'react'
import About from '../pages/About/About'
import Home from '../pages/Home/Home'
import MainLayout from '../pages/Layout/MainLayout'
import AddProduct from '../pages/seller/AddProduct'
import ProductDetails from '../pages/ProductDetails/ProductDetails'
import Products from '../pages/Product/Product'

const loginRoutes = [
    {
        path: "/",
        element: <MainLayout />,
        children:[      
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/products",
        element:<Products/>
    },
    {
        path: "/about",
        element:<About/>
    },
    {
        path: "/products/add",
        element:<AddProduct/>
    },
    {
        path: "/product/details/:id",
        element:<ProductDetails/>
    },
        ]
    }
    
]

export default loginRoutes