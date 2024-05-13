import mongoose from "mongoose";
import likeSchema from "../models/likes.js";

const likeModel  = mongoose.model("like", likeSchema);

export const createLikeRecipe = async (req, res) => {
    if(req.user?.user){
        const like = req.body;
        like.email = req.user.email;
        const newLike = new likeModel(like);
        //valide if the user already liked the recipe
        const likes = await likeModel.find({email : req.user.email, recipeId : like.recipeId});
        if(likes.length > 0){
            res.status(200).json({ message: "Already liked" });
            return;
        }
        try {
            await newLike.save().then((result) => {
                res.status(201).json(result);
            });
        } catch (error) {
            res.status(409).json({ message: error.message });
        }
      }else{
        res.status(401).json({message : "Unauthorized"});
      }
}
//get by email
export const getLikeRecipe = async (req, res) => {
    if(req.user?.user){
        try {
            const likes = await likeModel.find({email : req.user.email});
            res.status(200).json(likes);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
      }else{
        res.status(401).json({message : "Unauthorized"});
      }
}
//delete by email and recipe id
export const deleteLikeRecipe = async (req, res) => {
    if(req.user?.user){
        try {
            const result = await likeModel.deleteOne({email : req.user.email, recipeId : req.params.id});
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
      }else{
        res.status(401).json({message : "Unauthorized"});
      }
}
//get is Liked
export const isLiked = async (req, res) => {
    if(req.user?.user){
        try {
            const likes = await likeModel.find({email : req.user.email, recipeId : req.params.id});
            if(likes.length > 0){
                res.status(200).json({isLiked : true});
            }else{
                res.status(200).json({isLiked : false});
            }
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
      }else{
        res.status(401).json({message : "Unauthorized"});
      }
}