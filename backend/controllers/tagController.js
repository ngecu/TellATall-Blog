import asyncHandler from 'express-async-handler'
import Tag from '../models/tagModel.js'



const allTags = asyncHandler(async (req,res)=>{
    const tags = await Tag.find()

    res.json(tags)
})

const addTag = asyncHandler(async (req, res) => {

        const {
            name,
            color,
            image
        } = req.body

        const tag = new Tag({
            name,
            color,
            image
        })

        const createdTag = await tag.save()

        res.status(201).json(createdTag)
    }
)


export {
    addTag,
    allTags,

}