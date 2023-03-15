
import User from "../models/users.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


/* Register new user */
export const register = async (req, res)  => {


try {
    const {
        fistName,
        lastName,
        email,
        password,
        picturePath,
        friends,
        location,
        ocupation,
        
        } = req.body

        const salt = bcrypt.genSalt();
        const passwordHashed = bcrypt.hash(password, salt)
    
        const newUser = new User({
        fistName,
        lastName,
        email,
        password: password,
        picturePath,
        friends,
        location,
        ocupation,
        viewedProfile:  Math.round(Math.random() * 1000),
        impresions : Math.round(Math.random() * 1000)
        })
        
        const saveUser = newUser.save();
        
        res.status(201).json(saveUser)


} catch (err) {
    res.status(500).json({err: err.message})
}
}


// Log in

export const login = async (req, res) => {

    try {
        const {email, password} = req.body
    
        const user = await User.findOne({email: email});
        if(!user) return res.status(400).json({msg: "User doesn´t existe"})
    
        const comparePass = await bcrypt.compare(password, user.password);
        if(!comparePass) return res.status(400).json({msg: "Invalid Password"})

        //Sign the token
    
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        delete user.password;
    
        res.status(200).json({token, user});


} catch(err) {
    res.status(500).json({error: err.message})
}

}