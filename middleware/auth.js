
import jwt  from "jsonwebtoken"

export const verifyToken = async (req, res, next) => {

    try{
        let token = req.header("Authorization")
    

    if(token.startWith("Bearer  ")) {
         token = token.slice(7, token.length).trimLeft()

    } else{
        if(!token) return res.status(400).send("Authorization invalid token")

    }

    // it's verified and it will be sent  to next middleware via  the req.user on the server side

    const verified = jwt.verify(token, process.env.JWT.SECRET)
    req.user(verfiied)

    next()
    } catch (err) {
        res.status(500).json({error: err.message})
    }
    
}