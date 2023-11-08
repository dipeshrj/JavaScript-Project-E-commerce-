import mongoose, { mongo } from "mongoose"

// create rule
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 55,
        trim:true
    }
})

// create table
export const Category = mongoose.model("Category",categorySchema)