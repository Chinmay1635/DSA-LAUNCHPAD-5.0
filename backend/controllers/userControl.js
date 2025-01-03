const {userModel} = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const mongoose  = require('mongoose');
const predefinedGames = require('../config/gamesConfig');


module.exports.registerUser = async function (req, res) {
    let {email, name} = req.body;
    try {
        //Checking is user is already registered or not
        let user = await userModel.findOne({ email: email });
        if (user) {
            return res.json({message: "You are already registered. Please log in"});
        }

       const password = "DSALAUNCHPAD@5";

        //User creation
        user = await userModel.create({
            email,
            name: name,
            password: password,
            scores: predefinedGames,
        });

        //Token generation
        let token = generateToken(user.email);

        // Setting cookie into browser
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: 'none',
            path: '/',
            domain: 'https://dsa-launchpad-5.netlify.app/'
        });

       


        res.json({message:`User created with email ${email}`, success: true, token: token});
    } catch (error) {
        res.json({error: error.message, success: false});
    }
}

module.exports.loginUser = async function (req, res) {
    let { email, password } = req.body;
    try {
        //finding user in database
        let user = await userModel.findOne({ email });

        //checking user exists or not
        if (!user) {
            return res.json({message:"User not found! Register first.", success: false});
        }

        //if user exists then validating his password
        if (password === user.password) {
            //Token generation
            let token = generateToken(user.email);

            // Setting cookie into browser
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
                sameSite: 'none',
                path: '/',
            });

        res.json({message: `Loged in with email ${email}`, success: true});
            

        } else {
            res.json({message: "username or password is incorrect", success: false});
        }
    } catch (error) {
        res.json({error: error.message, success: false});
    }
}
