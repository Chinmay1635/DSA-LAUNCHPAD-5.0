const jwt = require('jsonwebtoken');
const {userModel} = require('../models/userModel');

module.exports.isLoggedIn = async (req,res,next)=>{
    if(req.cookies.token){
        try {
            const data = jwt.verify(req.cookies.token, process.env.JWT_KEY);
            // Fetch the user email from the token
            const user = await userModel.findOne({ email: data.email });

            if (user) {
                req.email = user.email; // Attach email to req object
                next(); // Proceed to the next middleware or route handler
            } else {
                res.status(401).json({ message: "User not found" });
            }
        } catch (error) {
            res.json({error: error.messeage})
        }
    }else{
        res.json({message: "You are not autherised"});
    }
}