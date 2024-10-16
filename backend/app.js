const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/mongoose');
const userModel = require('./models/userModel');
const userRoute = require('./routes/user');

// app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// const corsOptions = {
//     origin: ['http://127.0.0.1:5500', 'https://dsa-launchpad-5.netlify.app'], // Add more origins as needed
//     optionsSuccessStatus: 200,
//   };
  
//   app.use(cors(corsOptions));
//   app.use(cors())
// const corsOptions = {
//     origin: 'https://dsa-launchpad-5.netlify.app',
//     optionsSuccessStatus: 200,
//   };
//   app.use(cors(corsOptions));


const corsOptions = {
  origin: ['https://dsa-launchpad-5.netlify.app'], // Add your frontend URL here
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the HTTP methods you allow
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  optionsSuccessStatus: 200, // For legacy browser support
  credentials: true, // To allow cookies
};

app.use(cors(corsOptions));

app.options('*', cors({
  origin: 'https://dsa-launchpad-5.netlify.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


  
app.use((req, res, next) => {
    console.log(`Request URL: ${req.originalUrl}`);
    next();
});

// app.post('/registerUser', async (req, res) => {
//     let {email} = req.body;
//     try {
//         //Checking is user is already registered or not
//         let user = await userModel.findOne({ email: email });
//         if (user) {
//             return res.json({message: "You are already registered. Please log in"});
//         }

//        const password = "DSALAUNCHPAD@5";

//         //User creation
//         user = await userModel.create({
//             email,
//             password: password,
//         });

//         //Token generation
//         let token = generateToken(user.email);

//         //Setting cookie into browser
//         res.cookie("token", token, {
//             httpOnly: true,
//             secure: true,
//             maxAge: 30 * 24 * 60 * 60 * 1000,
//         });


//         res.json({message:`User created with email ${email}`, success: true});
//     } catch (error) {
//         res.json({error: error.message, success: false});
//     }

// })

// app.post('/loginUser', async (req, res) => {
//     let { email, password } = req.body;
//     try {
//         //finding user in database
//         let user = await userModel.findOne({ email });

//         //checking user exists or not
//         if (!user) {
//             return res.json({message:"User not found! Register first.", success: false});
//         }

//         //if user exists then validating his password
//         if (password === user.password) {
//             //Token generation
//             let token = generateToken(user.email);

//             //Setting cookie into browser
//             res.cookie("token", token, {
//                 httpOnly: true,
//                 secure: true,
//                 maxAge: 30 * 24 * 60 * 60 * 1000,
//             });

//         res.json({message: `Loged in with email ${email}`, success: true});
            

//         } else {
//             res.json({message: "username or password is incorrect", success: false});
//         }
//     } catch (error) {
//         res.json({error: error.message, success: false});
//     }
// });


app.use('/', userRoute);

app.listen(process.env.PORT);