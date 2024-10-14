const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;

db.on("error", (err)=>{
    console.log(err.messeage);
});

db.on("open", ()=>{
    console.log(`Connected to db at ${process.env.MONGO_URL}`);
});

module.exports = db;