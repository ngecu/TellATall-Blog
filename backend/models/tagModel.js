import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        color: {
            type : String,
            required: true,
        },
        image:{
            type:Array
        },
    },
    {
        timestamps: true,
    }
)

const Tag = mongoose.model('Tag', userSchema)

export default Tag