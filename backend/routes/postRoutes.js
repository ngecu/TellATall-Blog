import express from 'express'
const router = express.Router()
import {
  allPostItems,
  addPostItems,
  individualpostItem,
  userPosts,
  updatepostItem,
  deletepostItem,
    myPosts
} from '../controllers/postController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/:userID').post(addPostItems)
router.route('/AllPosts').get(allPostItems)

router.route('/:id').get(individualpostItem)
router.route('/myposts').get(protect,myPosts)

router.route('/author/:authorID').get(userPosts)
router.route('/:id').put(updatepostItem)
router.route('/:id').delete(deletepostItem)






export default router
