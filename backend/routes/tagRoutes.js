import express from 'express'
const router = express.Router()

import {
    addTag,allTags
} from '../controllers/tagController.js'
import { protect, admin } from '../middleware/authMiddleware.js'


router.route('/').post(addTag)
router.route('/AllTags').get(allTags)


export default router
