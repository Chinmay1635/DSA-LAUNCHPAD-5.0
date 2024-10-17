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

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));



const corsOptions = {
  origin: ['https://dsa-launchpad-5.netlify.app'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  optionsSuccessStatus: 200,
  credentials: true, 
};

app.use(cors(corsOptions));

// app.options('*', cors({
//   origin: 'https://dsa-launchpad-5.netlify.app',
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

app.options('*', cors(corsOptions));


  
app.use((req, res, next) => {
    console.log(`Request URL: ${req.originalUrl}`);
    next();
});

app.use('/', userRoute);

app.listen(process.env.PORT || 3000);