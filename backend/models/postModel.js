import mongoose from 'mongoose'


const postSchema = mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },

        tags:[
            {type: mongoose.Schema.Types.ObjectId,
                ref: 'Tag'
            }
        ],

        text: {
            type: String,

        },
        title: {
            type: String,

        },
        description: {
            type:String,
        },
        photo: {
            type: Array
        },
        approved : {
            type:Boolean,
            default:false
        },


    },
    {
        timestamps: true,
    }
)

const Post = mongoose.model('Post', postSchema)

export default Post
