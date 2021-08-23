import express from 'express'
const router = express.Router()

import {
    addTag,allTags,deleteTag,updateTag
} from '../controllers/tagController.js'
import { protect, admin } from '../middleware/authMiddleware.js'


router.route('/').post(addTag)
router.route('/AllTags').get(allTags)



router.route('/:id').put(updateTag)
router.route('/:id').delete(deleteTag)
export default router
