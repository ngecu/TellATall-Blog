import mongoose from 'mongoose'


const postSchema = mongoose.Schema(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Post',
        },


        comment: {
            type: String,

        },
        commentor: {
            type: String,
            default: ''

        },


    },
    {
        timestamps: true,
    }
)

const Comment = mongoose.model('Comment', postSchema)

export default Comment
