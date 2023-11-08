import jwt from "jsonwebtoken"
import { User } from "../User/user.entity.js"


export const isSeller= async(req, res, next) => {

    // extract token from headers
    const authorization = req?.headers?.authorization

    const splittedArray = authorization?.split(" ")

    const token = splittedArray?.length === 2 && splittedArray[1]

    // if not token , terminate
    if (!token) {
        return res.status(401).send({message:"Unauthorized access."})
    }

    // decrypt token and extract email
    try {
        const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET)

        // find user by email
        const userEmail = userData.email
        const user = await User.findOne({ email: userEmail })

        // if not user, terminate
        if (!user) {
        return res.status(401).send({message:"Unauthorized access."})
        }

        // user role must be seller
        if (user.role !== "seller") {
            return res.status(401).send({ message: "Unauthorized access." })        
        }
        // add user to req
        req.userInfo = user
         next()
    } catch (error) {
        // if something goes wrong while decrypting, terminate
        return res.status(401).send({message:"Unauthorized access."})  
    }
    
}

export const isBuyer= async(req, res, next) => {

    // extract token from headers
    const authorization = req?.headers?.authorization

    const splittedArray = authorization?.split(" ")

    const token = splittedArray?.length === 2 && splittedArray[1]

    // if not token , terminate
    if (!token) {
        return res.status(401).send({message:"Unauthorized access."})
    }

    // decrypt token and extract email
    try {
        const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET)

        // find user by email
        const userEmail = userData.email
        const user = await User.findOne({ email: userEmail })

        // if not user, terminate
        if (!user) {
        return res.status(401).send({message:"Unauthorized access."})
        }

        // user role must be buyer
        if (user.role !== "buyer") {
            return res.status(401).send({ message: "Unauthorized access." })        
        }
        // add user to req
        req.userInfo = user
         next()
    } catch (error) {
        // if something goes wrong while decrypting, terminate
        return res.status(401).send({message:"Unauthorized access."})  
    }
    
}

export const isUser= async(req, res, next) => {

    // extract token from headers
    const authorization = req?.headers?.authorization

    const splittedArray = authorization?.split(" ")

    const token = splittedArray?.length === 2 && splittedArray[1]

    // if not token , terminate
    if (!token) {
        return res.status(401).send({message:"Unauthorized access."})
    }

    // decrypt token and extract email
    try {
        const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET)

        // find user by email
        const userEmail = userData.email
        const user = await User.findOne({ email: userEmail })

        // if not user, terminate
        if (!user) {
        return res.status(401).send({message:"Unauthorized access."})
        }

        // add user to req
        req.userInfo = user
        next()
        
    } catch (error) {
        // if something goes wrong while decrypting, terminate
        return res.status(401).send({message:"Unauthorized access."})  
    }
    
}