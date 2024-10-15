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
app.use(cors());
// app.use((req, res, next) => {
//     console.log(`Request URL: ${req.originalUrl}`);
//     next();
// });

app.use('/', userRoute);

app.listen(process.env.PORT);