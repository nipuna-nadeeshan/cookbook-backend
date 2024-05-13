import express from 'express';
const likeRouter = express.Router();
import { deleteLikeRecipe, getLikeRecipe,createLikeRecipe, isLiked } from '../controllers/likeController.js';

likeRouter.post('/', createLikeRecipe);
likeRouter.get('/', getLikeRecipe);
likeRouter.delete('/:id', deleteLikeRecipe);
likeRouter.get('/isLiked/:id', isLiked);

export default likeRouter;