const {userModel} = require('../models/userModel');

module.exports.updateScore = async function (req, res) {
    const { score, level, game, email } = req.body;
    

    try {
        // Find user and update the score for the specific game and level
        const user = await userModel.findOneAndUpdate(
            { email, "scores.game": game, "scores.levels.level": level },
            { $set: { "scores.$[game].levels.$[level].score": score } },
            {
                arrayFilters: [
                    { "game.game": game },  // Filter to find the game
                    { "level.level": level } // Filter to find the level inside the game
                ],
                new: true // Return the updated document
            }
        );

        if (user) {
            res.json({ success: true, message: "Score updated successfully", newScore: score });
        } else {
            res.status(404).json({ success: false, message: "User or level not found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update score", error: error.message });
    }
};