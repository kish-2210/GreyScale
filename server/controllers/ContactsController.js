import User from "../models/UserModel.js"

export const searchContacts = async (req,res)=>{

    try {
        const {searchText } = req.body;

        if(searchText === undefined || searchText === null) res.status(400).send("searchText is required")

        const sanitizedSearchText = searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

        const regex = new RegExp(sanitizedSearchText,"i");
        const contacts = await User.find({
            $and: [{_id: { $ne: req.userId}} , {
            $or: [{firstName: regex},{lastName: regex},{email:regex}],
            }],  
        });

        return res.status(200).json({ contacts })

        
    } catch (error) {
        return res.status(500).send("Server error")
    }
 }