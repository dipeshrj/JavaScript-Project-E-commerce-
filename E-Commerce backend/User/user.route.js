import express from "express";
import { checkUser, registerUser, validateUserData } from "./user.service.js";
import { User } from "./user.entity.js";
import { loginValidateSchema } from "./user.validation.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"



const router = express.Router()

// register user
router.post("/user/register", validateUserData, checkUser,registerUser)

// login user
router.post("/user/login", async(req, res) => {
    // get credentials from user
    const loginCredentials = req.body

    // validate data
    try {
        await loginValidateSchema.validateAsync(loginCredentials)
    } catch (error) {
        return res.status(404).send({message:error.message})
    }
   

    // check if user exists
    const user = await User.findOne({ email: loginCredentials.email })
    if (!user) {
        return res.status(404).send({message:"Invalid Credentials."})
    }

    // check if password matches
    const passwordMatch = await bcrypt.compare(loginCredentials.password, user.password)
    if (!passwordMatch) {
        return res.status(404).send({message:"Invalid Credentials."})
    }

    // generate access token
    const access_token = jwt.sign({ email: user.email },process.env.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn:"1d"
    })

    // remove password
    user.password = undefined
    
    // return appropriate response
    return res.status(200).send({user,access_token})
})



export default router