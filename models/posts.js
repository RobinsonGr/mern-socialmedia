import mongoose from "mongoose"


const postSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true, 
    },
    firstName: {
        required: true,
        type: String
    },
    lastName:{
        required: true,
        type: String,
    },
    description: String,
    location: String,
    userPicturePath: String, 
    postPicturePath: String,
    likes: {
        type: Map,
        of: Boolean,
    },
    comments: {
        type: Array,
        default: []
    }
    

}, {timestamps: true})


const Post = mongoose.model("Post", postSchema)

export default Post