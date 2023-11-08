import Joi from "joi"

export const userValidationSchema = Joi.object({
        firstName: Joi.string().required().min(2).max(55).trim(),
        lastName: Joi.string().required().min(3).max(55).trim(),
        email: Joi.string().email().required().min(5).max(155).trim().lowercase(),
        password:Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required().trim(),
        gender: Joi.string().valid("male", "female", "preferNoToSay").required().trim(),
        dob: Joi.date().required(),
        role:Joi.string().valid("buyer", "seller").required().trim()
})
    

export const loginValidateSchema = Joi.object({
        email: Joi.string().email().required().trim(),
        password:Joi.string().required().trim()
    })