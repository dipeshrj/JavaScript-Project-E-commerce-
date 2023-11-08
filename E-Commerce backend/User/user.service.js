
import { User } from "./user.entity.js";
import bcrypt from "bcrypt"
import { userValidationSchema } from "./user.validation.js";

// validate user data
export const validateUserData = async (req, res, next) => {

    // get new user from body
    const newUser = req.body

    // validate data
    try {
        await userValidationSchema.validateAsync(newUser)
    } catch (error) {
        return res.status(404).send({message:error.message})
    }

    next()
 }

// check if user with provided email already exist
 export const checkUser = async (req, res, next) => {
    // get new user from body
     const newUser = req.body
     
    // if user already exist, throw error
    const findUser = await User.findOne({ email: newUser.email })
    if (findUser) {
        return res.status(409).send({message:"User with this email is already registered in our system."})
    }
    next()
}
 
// register user with hashed password
export const registerUser =async(req, res) => {
    // get new user from body
    const newUser = req.body 

    // password=> hash using bcrypt
    const hashedPassword = await bcrypt.hash(newUser.password, 8)
    // replace password with hashed password
    newUser.password = hashedPassword

    // create user with hashed password
    await User.create(newUser)

    // send appropriate response
    return res.status(201).send({message:"User registered successfully."})
}