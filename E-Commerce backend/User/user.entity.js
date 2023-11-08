import mongoose from "mongoose";

// create rules
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 55,
        trim:true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 55,
        trim:true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 155,
        lowercase:true,
        trim: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "preferNotToSay"],
        required: true,
        trim:true
    },
    dob: {
        type: Date,
        required: true,
    },
    role: {
        type: String,
        enum: ["buyer", "seller","admin"],
        requiredd: true,
        trim:true
    }
})

// create table
export const User = mongoose.model("User", userSchema)