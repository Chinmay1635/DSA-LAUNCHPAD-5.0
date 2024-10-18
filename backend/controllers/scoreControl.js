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

        // if (user) {
        //     res.json({ success: true, message: "Score updated successfully", newScore: score });
        // } else {
        //     res.status(404).json({ success: false, message: "User or level not found" });
        // }

        const updatedUser = await userModel.findOne({ email });
        const gameData = updatedUser.scores.find(g => g.game === game);

        if (!gameData) {
            return res.status(404).json({ success: false, message: "Game not found" });
        }

        const totalScore = gameData.levels.reduce((total, levelData) => total + (levelData.score || 0), 0);

        // Update the totalScore field for the game
        await userModel.updateOne(
            { email, "scores.game": game },
            { $set: { "scores.$.totalScore": totalScore } }
        );

        res.json({ success: true, message: "Score and total score updated successfully", newScore: score, totalScore });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update score", error: error.message });
    }
};


module.exports.getLeaderboard = async function (req, res) {
    const { game } = req.params;  

    try {
        const users = await userModel.find({ "scores.game": game }, { email: 1, scores: 1 });

        const leaderboard = users
            .map(user => {
                const gameData = user.scores.find(g => g.game === game);
                return {
                    name: user.email,
                    totalScore: gameData ? gameData.totalScore : 0
                };
            })
            .sort((a, b) => b.totalScore - a.totalScore); 

        // Add rank to each user in the leaderboard
        leaderboard.forEach((user, index) => {
            user.rank = index + 1;
        });

        res.json({ success: true, leaderboard });

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch leaderboard", error: error.message });
    }
};
