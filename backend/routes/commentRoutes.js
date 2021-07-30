import express from 'express'
const router = express.Router()

import {
    addComment,allComments,commentPosts
} from '../controllers/commentController.js'
import { protect, admin } from '../middleware/authMiddleware.js'


router.route('/:postID').post(addComment)
router.route('/AllComments').get(allComments)
router.route('/:postID').get(commentPosts)

export default router