import express from "express"
import jwt from "jsonwebtoken"
import { User } from "../User/user.entity.js"
import Joi from "joi"
import { Category } from "./category.entity.js"

const router = express.Router()

// add category
router.post("/category/add", async(req, res) => {
    // get access token
    const authorization = req.headers.authorization
    // split bearer and token
    const splittedArray = authorization?.split(" ")

    // extract token
    const token = splittedArray[1]

    if (!token) {
        return res.status(401).send({message:"Unauthorized access"})
    }

    // decrypt token
try {
    const data = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET)
    const user = await User.findOne( {email: data.email} )
    
    if (!user) {
        return res.status(401).send({message:"Unauthorized access"})
    }
} catch (error) {
        return res.status(401).send({message:"Unauthorized access"})
    }
    // after user verification
    const newCategory = req.body
    // validate req.body
    const schema = Joi.object({
        name: Joi.string().required().trim().lowercase()
    })
    try {
        await schema.validateAsync(newCategory)
    } catch (error) {
        return res.status(401).send({message:error.message})
    }
    // add category
    await Category.create(newCategory)

    return res.status(201).send({message:"Category added successfully."})
})

export default router