const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

const {loginUser, registerUser} = require('../controllers/userControl');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const { updateScore, getLeaderboard } = require('../controllers/scoreControl');
const userModel = require('../models/userModel');

router.get("/", function(req,res){
    res.json("Welcome to DSA Launchpad 5.0");
});

router.post("/registerUser", registerUser);

router.post("/loginuser", loginUser);

router.post("/update-score", updateScore);

router.get("/leaderboard/:game", getLeaderboard)

module.exports = router;