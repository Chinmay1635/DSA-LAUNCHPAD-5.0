const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

const {loginUser, registerUser} = require('../controllers/userControl');
const { isLoggedIn } = require('../middlewares/isLoggedIn');

router.get("/", function(req,res){
    res.json("Welcome to DSA Launchpad 5.0");
});

router.post("/registerUser", registerUser);

router.post("/loginuser", loginUser);

module.exports = router;