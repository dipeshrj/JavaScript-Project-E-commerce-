import express from "express";
import mongoose from "mongoose";
import { quantityValidationSchema } from "./cart.validation.js";
import { Product } from "../Product/product.entity.js";
import { isBuyer, isSeller, isUser } from "../auth/auth.middleware.js"
import { Cart } from "./cart.entity.js";


const router = express.Router()

// add Item to cart
router.post("/cart/add/item", isBuyer, async (req, res) => {
    
    const {productId, quantity} = req.body
    // validate the data
    try {
        await quantityValidationSchema.validateAsync({quantity})
    } catch (error) {
        res.status(400).send({message:  error.message})
    }

    // check if productId is mongoId
    const isValidMongoId = mongoose.Types.ObjectId.isValid(productId)

    if (!isValidMongoId) {
        res.status(400).send({message:"Invalid Mongo id."})
    }

    // check if product exists
    const product = await Product.findOne({ _id: productId })
    
    if (!product) {
        res.status(404).send({message:"Product does not exist."})
    }

    if (quantity > product.quantity) {
        res.status(403).send({message:"Product is out of stock."})  
    }

    // add product to cart
    const buyerId = req.userInfo._id

    // if product already exists on cart
    const cartHasProduct = await Cart.findOne({
        buyerId: buyerId,
        "productList.productId": productId
    })
    if (cartHasProduct) {
        await Cart.updateOne({
        buyerId: buyerId,
        "productList.productId": productId     
    }, {
        $inc:{"productList.$.quantity": quantity}
    })
    }
    else {await Cart.updateOne({
        buyerId: buyerId
    }, {
        $push: {
            productList:{productId, quantity}
        }
    }, {
        upsert:true
    })}

    return res.status(200).send({ message: "Item is added to cart successfully." });
})

// remove item from cart
router.put("/cart/remove/item/:id", isBuyer, async (req, res) => {
    const productId = req.params.id
    const userId = req.userInfo._id

 // check if productId is mongoId
    const isValidMongoId = mongoose.Types.ObjectId.isValid(productId)

    if (!isValidMongoId) {
        res.status(400).send({message:"Invalid Mongo id."})
    }

// check if product exists
    const product = await Product.findOne({ _id: productId })
    if (!product) {
        res.status(404).send({message:"Product does not exist."})
    }

    await Cart.updateOne({
        buyerId: userId
    }, {
        $pull: {
        productList: { productId: new mongoose.Types.ObjectId(productId) },
      },
    })
    
    res.status(200).send({message:"Item removed successfully."})
})

export default router