import mongoose from "mongoose";
import dotenv from "dotenv";

const likeSchema = mongoose.Schema({
  email : String,
  recipeId : Number
});
export default likeSchema;