import mongoose from "mongoose";

const {Schema} = mongoose;

const UserSchema = new Schema( {

    firstName : {
        type: String,
        required: true,
        min: 2,
        max: 50

    },
    lastName:{
        type: String,
        required: true,
        min: 2,
        max: 2
    },
    email: {
        type: String,
        max: 50,
        required: true,
        unique: true,
    },
    picturePath :{
        type: String,
        default: ""
    },
    password: {
        type: String,
        require: true,
        min: 5,
    },
    friends: {
        type: Array,
        dafult: [],
    },
    location: String,
    ocupation: String,
    viewedProfile: Number,
    impressions: Number,



}, 
{timestamps: true}

);



const User = mongoose.model("User", UserSchema)
export default User;