const jwt = require('jsonwebtoken');
const {userModel} = require('../models/userModel');

module.exports.isLoggedIn = async (req,res,next)=>{
    if(req.cookies.token){
        try {
            const data = jwt.verify(req.cookies.token, process.env.JWT_KEY);
            req.user = await userModel.findOne({email:data}).select("-password");
            next();
        } catch (error) {
            res.json(error.messeage)
        }
    }else{
        res.json("You are not autherised");
    }
}