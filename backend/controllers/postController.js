import asyncHandler from 'express-async-handler'
import Post from '../models/postModel.js'


const allPostItems = asyncHandler(async (req,res)=>{
  const posts = await Post.find().populate('tags').populate('author')
 

  res.json(posts)
})


// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addPostItems = asyncHandler(async (req, res) => {
  
    const post = new Post({
      author:req.params.userID,
      text:req.body.text,
      title:req.body.title,
      tags:req.body.tag,
      description:req.body.description,
      photo:req.body.photo
    })

    const createdPost = await post.save()
    res.status(201).json(createdPost)
  }
)

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const individualpostItem = asyncHandler(async (req, res) => {
  const order = await Post.find({_id:req.params.id}).populate('tags').populate('author')

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Post not found')
  }
})

const userPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({author:req.params.authorID}).populate('tags').populate('author')

  if (posts) {
    res.json(posts)
  } else {
    res.status(404)
    throw new Error('Posts not found')
  }
})

const myPosts = asyncHandler(async (req, res) => {
  console.log(req.user._id)
  const posts = await Post.findOne({author:req.user._id}).populate('tags').populate('author')

  if (posts) {
    res.json(posts)
  } else {
    res.status(404)
    throw new Error('Posts not found')
  }
})




const updatepostItem = asyncHandler(async (req, res) => {

  const findPost = await Post.findOne({_id:req.params.id})
  const author = findPost.author
      const {
        text,
        title,
        photo,
      } = req.body

  if (findPost){
    findPost.author = author
    findPost.text = text || findPost.text
    findPost.title = title ||  findPost.title
    findPost.photo = photo || findPost.photo

  }

      const updatedPost = await findPost.save()

      res.status(201).json(updatedPost)
    }
)

const deletepostItem = asyncHandler(async (req, res) => {
  const post = await Post.findOne({_id:req.params.id})

  if (post) {
    await post.remove()
    res.json({ message: 'Post removed' })
  } else {
    res.status(404)
    throw new Error('Post not found')
  }
})




export {
  allPostItems,
  addPostItems,
  individualpostItem,
  userPosts,
updatepostItem,
  deletepostItem,
  myPosts
}