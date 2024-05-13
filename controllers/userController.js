import mongoose from "mongoose";
import userSchema from "../models/user.js";
import crypto from 'crypto';
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
const userModel = mongoose.model("user", userSchema);

export const createUser = async (req, res) => {
    const user = req.body;
    user.password = hashPassword(user.password);
    const newUser = new userModel(user);
    try {
        await newUser.save().then((result) => {
            res.status(201).json(result);
        });
       
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
export const loginUser = async (req, res) => {
    const user = req.body;
    user.password = hashPassword(user.password);
    try {
        const existingUser = await userModel.findOne({ email: user.email, password: user.password });
        if (existingUser) {
            
            const token = jwt.sign({ email: existingUser.email, id: existingUser._id , user : existingUser }, process.env.JWT_SECRET, { expiresIn: "72h" });
            
            res.status(200).json({
                token,
                user: existingUser
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export function hashPassword(password){
    return crypto.pbkdf2Sync(password, "no_salt",  
        1000, 64, `sha512`).toString(`hex`); 
    
}