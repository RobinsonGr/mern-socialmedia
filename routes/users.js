import express from "express"
import {getUser, getFriends, addDeleteFriends} from "../controllers/users.js"
import { verifyToken } from "../middleware/auth.js"


const userRouter = express.Router();

//get user and friends

userRouter.get("/", verifyToken, getUser)
userRouter.get("/friends", verifyToken, getFriends )

// update

userRouter.patch("/:id/:friendId", verifyToken, addDeleteFriends) 

export default userRouter