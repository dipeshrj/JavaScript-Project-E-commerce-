import mongoose from "mongoose";

// create rule
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 55,
        trim:true
    },
    company: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 55,
        trim:true
    },
    price: {
        type: Number,
        min:0,
        required:true
    },
    freeShipping: {
        type: Boolean,
        default:false
    },
    quantity: {
        type: Number,
        min:0,
        required:true
    },
    color: {
        type: [String],
        required:false
    },
    inStock: {
        type: Boolean,
        default:true
    },
    sellerId: {
        type: mongoose.ObjectId,
        ref:"User"
    },
    category: {
        type: String,
        required: true,
        trim: true,
        enum:["groceries","electronics","furniture","kitchen","cosmetics","clothing","accessories","bakery","liquor"]
    }
})

// create table
export const Product =mongoose.model("Product",productSchema)