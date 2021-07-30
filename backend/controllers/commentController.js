import asyncHandler from 'express-async-handler'
import Comment from '../models/commentModel.js'



const allComments = asyncHandler(async (req,res)=>{
    const comments = await Comment.find()

    res.json(comments)
})

const addComment = asyncHandler(async (req, res) => {
        const post = req.params.postID
        const {
            comment,
            commentor,

        } = req.body

        console.log(req.body)
        const commen = new Comment({
            post,
            comment,
            commentor
        })

        const createdComment = await commen.save()

        res.status(201).json(createdComment)
    }
)

const commentPosts = asyncHandler(async (req, res) => {
    const comments = await Comment.find({post:req.params.postID})

    if (comments) {
        res.json(comments)
    } else {
        res.status(404)
        throw new Error('comment not found')
    }
})

export {
    addComment,
    allComments,
    commentPosts
}