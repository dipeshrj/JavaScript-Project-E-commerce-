import mongoose from "mongoose";

export const db_connect = async () => {
    const dbURL = process.env.MONGO_URL
    try {
        await mongoose.connect(dbURL)
        console.log("Database connection established")
    } catch (error) {
        console.log("Database connection failed")
        console.log(error.message)
    }
}