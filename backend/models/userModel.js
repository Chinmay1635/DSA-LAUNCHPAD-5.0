const mongoose = require('mongoose');

// Schema for levels within a game
const levelSchema = new mongoose.Schema({
    level: Number,  // Level number
    score: Number   // Score (default set to 0 or null)
});

// Schema for games with levels
const gameSchema = new mongoose.Schema({
    game: String,             // Game name
    levels: [levelSchema]     // Array of levels and their scores
});

// User schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    scores: [gameSchema]     // Predefined games and scores for each user
});

const userModel = mongoose.model('User', userSchema);

module.exports = { userModel };
