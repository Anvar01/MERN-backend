import express from 'express';
import {getPosts, getPost, createPost, updatePost, deletePost, likePost, comment} from '../controllers/posts.js'
import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.patch('/comment/:id', auth, comment)
export default router;