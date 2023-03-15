import Post from "../models/posts";
import User from "../models/users"


/* CREATE  POST */

export async function createPost (req, res) {

   try {
    const {userId, postPicturePath, description, } = req.body

    const {firstName, lastName, location, picturePath} = await User.findById(userId)

    const newPost = new Post({

        userId,
        firstName: firstName,
        lastName: lastName,
        location: location,
        postPicturePath: postPicturePath,
        picturePath,
        description,
        likes: {},
        comments: []
    });

    await newPost.save()

    const post = await Post.find()

    res.status(201).json(post)

   } catch (err) {
    res.status(409).json({message: err.message})
   }
}

/* GET POST */

export async function getFeedPost(req, res) {

   try{
    const post = await Post.find();
    res.status(200).json(post)


   } catch (err){ res.status(404).json({message: err.message})}

}


export async function getUserPost(req, res) {
    try {
    const {userId} = req.params
    const post = await Post.find({userId})

    } catch (err) {res.status(404).json({message: err.message})}



}

/* UPDATE */

export async function likedPost(req, res) {

try {
    
    const {id} = req.params
    const {userId} = req.body
    const post = await Post.findById(id)
    const isLiked = post.likes.get(userId)

    if(isLiked) {
        post.likes.delete(userId)
    } else {
        post.likes.set(userId, true)
    }


    const updatedPost = await Post.findbyIdAndUpdate(id, {likes: post.likes}, {new: true})

    res.status(200).json(updatedPost)


}catch (err ) {res.status(400).json({message: err.message})}

}