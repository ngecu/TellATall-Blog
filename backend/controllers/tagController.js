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



const updateTag = asyncHandler(async (req, res) => {

    const findTag = await Tag.findOne({_id:req.params.id})

        const {
            name,
            color,
            image
        } = req.body
  
    if (findTag){
      findPost.name = name
      findPost.color = color || findPost.color
      findPost.image = image ||  findPost.image
    
  
    }
  
        const updatedTag = await findTag.save()
  
        res.status(201).json(updatedTag)
      }
  )
  
  const deleteTag = asyncHandler(async (req, res) => {
    const tag = await Tag.findOne({_id:req.params.id})
  
    if (tag) {
      await tag.remove()
      res.json({ message: 'Tag removed' })
    } else {
      res.status(404)
      throw new Error('Tag not found')
    }
  })


export {
    addTag,
    allTags,
    updateTag,
    deleteTag

}