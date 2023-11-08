import Joi from "joi"
import { Product } from "./product.entity.js"
import mongoose from "mongoose"
import { getAllProductsValidation, productSchema } from "./product.validation.schema.js"


export const addProduct = async(req, res) => {
    // extract product from req.body
    const newProduct = req.body

    // validate product
try {
    await productSchema.validateAsync(newProduct)
} catch (error) {
        // if not valid terminate
    return res.status(400).send({message:error.message})
    }

    // adding sellerId
    newProduct.sellerId = req.userInfo._id

    // add product
    await Product.create(newProduct)
    
    return res.status(201).send({message:"Product added successfully."})
}

export const deleteProduct =async(req, res) => {
    // extract id from params
    const productId = req.params.id

    // check if valid mongoId
    const isValidMongoId = mongoose.Types.ObjectId.isValid(productId)

    // if not , terminate
    if (!isValidMongoId) {
        return res.status(400).send({ message: "Invalid MongoId." })
    }    
   
    // check if product exists
    const product = await Product.findOne({_id: productId})
    // if not ,terminate
    if (!product) {
    return res.status(404).send({ message: "Product does not exist." })
    }

    // logged in user must be owner of the product
    const loggedInUserId = req.userInfo._id
    
    const isProductOwner = loggedInUserId.equals(product.sellerId)
    // if not ,terminate
    if (!isProductOwner) {
        return res.status(404).send({message:"You are not owner of the product."})
    }

    // delete product
    await Product.deleteOne({_id:productId})

    return res.status(201).send({message:"Product deleted successfully."})
}

export const getProductDetails = async (req, res) => {
    // extract productId from params
    const productId = req.params.id

    // validate id for mongoId validity
    const isValidMongoId = mongoose.Types.ObjectId.isValid(productId)
    
    // if not valid, terminate
    if (!isValidMongoId) {
        return res.status(401).send({message:"Invalid Mongo Id."})
    }
    // check if product exists
    const product = await Product.findOne({ _id: productId })
    
    // if not product, terminate
    if (!product) {
        return res.status(404).send({message:"Product does not exist."})
    }

    // check if logged in user is seller
    const loggedInUser = req.userInfo
    const loggedInUserId = req.userInfo._id

    if (loggedInUser.role === "seller") {
    // check if seller is owner of the product
    const isProductOwner = loggedInUserId.equals(product.sellerId)

    // if not ,terminate
    if (!isProductOwner) {
        return res.status(404).send({message:"You are not owner of the product."})
    }
    }

    // return product
    return res.status(200).send(product)
}

export const  getAllProducts = async (req, res) => {
// extract page and limit from req.body
    const query = req.body

    // validate query
    try {
        await getAllProductsValidation.validateAsync(query)
    } catch (error) {
        return res.status(400).send({message: error.message})
    }

    const skip = (query.page - 1) * query.limit
    let match = query.searchText?
        { name: {$regex: query.searchText, $options: "i"}} : {}
    const products = await Product.aggregate([
        {
            $match:match
        },
        {
            $skip:skip
        },
        {
            $limit:query.limit
        }
    ])

    const totalProducts = await Product.find({}).count()

    const totalPage = Math.ceil(totalProducts/query.limit)
    
    return res.status(200).send({products, totalPage})
}

export const getSellerProducts = async (req, res) => {
// extract page and limit from req.body
    const query = req.body

    // validate query
    try {
        await getAllProductsValidation.validateAsync(query)
    } catch (error) {
        return res.status(400).send({message: error.message})
    }

    const skip = (query.page - 1) * query.limit
    let match = query.searchText ?
        {
            sellerId: req.userInfo._id,
            name: {$regex: query.searchText, $options: "i"} 
        } : { sellerId: req.userInfo._id }
    const products = await Product.aggregate([
        {
            $match:match
        },
        {
            $skip:skip
        },
        {
            $limit:query.limit
        }
    ])

    const totalProducts = await Product.find({
        sellerId : req.userInfo._id
    }).count()

    const totalPage = Math.ceil(totalProducts/query.limit)

    return res.status(200).send({products, totalPage})
}

export const editProduct = async (req, res) => {
    // extract productId from params
    const productId = req.params.id

    // validate id for mongoId validity
    const isValidMongoId = mongoose.Types.ObjectId.isValid(productId)
    
    // if not valid, terminate
    if (!isValidMongoId) {
        return res.status(401).send({message:"Invalid Mongo Id."})
    }
    // check if product exists
    const product = await Product.findOne({ _id: productId })
    
    // if not product, terminate
    if (!product) {
        return res.status(404).send({message:"Product does not exist."})
    }

    // extract product from req.body
    const productDetails = req.body

    // validate product
    try {
    await productSchema.validateAsync(productDetails)
    } catch (error) {

    // if not validate terminate
    return res.status(400).send({message:error.message})
    }

    // edit product
    await Product.updateOne({ _id: productId }, { $set: productDetails })
    
    return res.status(201).send({message:"Product edited successfully."})
}