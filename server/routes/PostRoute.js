import express from 'express'
import { createPost, deletePost, getPost, getTimelinePosts, likePost, updatePost, addComment, deleteComment, editComment } from '../controllers/PostController.js'
import authMiddleWare from '../middleware/AuthMiddleware.js'
const router = express.Router()

router.post('/',createPost)
router.get('/:id', getPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)
router.put('/:id/like', likePost)
router.get('/:id/timeline', getTimelinePosts)
router.post('/:id/comments', addComment);
router.delete('/:id/comments/:commentId', deleteComment);
router.put('/:id/comments/:commentId', editComment);

export default router