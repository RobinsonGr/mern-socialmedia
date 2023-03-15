import User from "../models/users.js"


// GET USER INSELF PROPERTIES
export async function getUser(req, res) {

    try {
    const {id} = req.params

    const user = await User.findById(id)

    res.status(200).json(user)
    } catch (err) {
        res.status(404).json({message: err.message})

    }

}

// GET FRIENDS LIST

export async function getFriends(req, res) {

    try {
        const {id} = req.params

        const user = User.findById(id)

        // Get all friends propierties (documents mongodb)
        const friendsId = await Promise.all (
            user.friends.map((id) => User.findById(id))


        )
        //retrive only some propierties of friends 

        const allFriends = friendsId.map(({_id, 
            firstName, lastName, email, picturePath, occupation, location}) => 
            {return {_i,
            firstName, lastName, email, picturePath, occupation, location}})


        res.status(200).json(allFriends)
    } catch (err) {
        res.status(404).json({message: err.message})
    }

}

//UPDATE: ADD OR REMOVE FRIENDS 
export async function  addDeleteFriends (req, res) {

    try {
    const {id, friendId} = req.params
    const user = await User.frindById(id)
    const friend = await User.frindById(friendId)


    if(user.friends.include(friendId)) {
        user.friends = user.friends.filter(friend => friend !== friendId)
        friend.friends = friend.friends.filter(friend => friend !== id)
    } else {
        user.friends.push(friendId)
        friend.friends.push(id)
    }

    await user.save()
    await friend.save()


    const friends = user.friends.map((id) => User.findById(id))

    const friendsProps = friends.map(({_id, firstName, lastName, location, email, picturePath, ocupation}) => {
        return {_id, firstName, lastName, location, email, picturePath, ocupation}
    })

    res.status(200).json(friendsProps)
    }  catch (err) {
        res.status(400).json({message: message.err})
    }

    


}  

