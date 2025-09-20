import Message from "../models/MessagesModel.js"

export const getMessages = async (req,res)=>{

    try {
        const user1 = req.userId;
        const user2 = req.body.id

        console.log( "user1:", user1 ,"user 2:", user2 )

        if(!user1 || !user2) res.status(400).send("Both user ID's are required")

        const messages = await Message.find({
            $or: [
                {sender: user1, recipient: user2},
                {sender: user2 , recipient: user1},
            ],
        }).sort({ timestamp: 1});


        return res.status(200).json({ messages })

        
    } catch (error) {
        return res.status(500).send("Server error")
    }
 }