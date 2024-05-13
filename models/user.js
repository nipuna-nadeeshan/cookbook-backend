import mongoose from "mongoose";
import dotenv from "dotenv";

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNumber : String,
    password: String,
    email: {
        type: String,
        unique: true
    },
});
export default userSchema;