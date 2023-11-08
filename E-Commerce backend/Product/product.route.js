import express from "express"
import { isBuyer, isSeller, isUser } from "../auth/auth.middleware.js"
import {
    addProduct,
    deleteProduct,
    getProductDetails,
    getAllProducts,
    getSellerProducts,
    editProduct
} from "./product.service.js"

const router = express.Router()

// add product
router.post("/product/add", isSeller, addProduct)

// delete product
router.delete("/product/delete/:id",isSeller, deleteProduct)

// get product details
router.get("/product/details/:id", isUser, getProductDetails)

// get all products by buyer
router.post("/products/buyer/all", isBuyer, getAllProducts)

// get all products by seller
router.post("/products/seller/all", isSeller, getSellerProducts)

// edit products
router.put("/product/edit/:id", isSeller, editProduct)

export default router