// routes/api/like.js, JN, 19.02.2024
const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwtAuth = passport.authenticate('jwt', { session: false });

const User = require("../../models/user");
const Like = require("../../models/like");

// Apply JWT authentication middleware to all routes
router.use(jwtAuth);

// Like a user
router.post('/:id', async (req, res) => {
    try {
        // Get the user ID to like
        const userIdToLike = req.params.id;
        // Get the current user's ID
        const userId = req.user._id;

        // Check if the user to like exists
        const userToLike = await User.findById(userIdToLike);
        if (!userToLike) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the user is trying to like themselves
        if (userId === userIdToLike) {
            return res.status(400).json({ error: 'Cannot like yourself' });
        }

        // Check if the user has already liked the other user
        const existingLike = await Like.findOne({ user: userId, likedUser: userIdToLike });
        if (existingLike) {
            return res.status(400).json({ error: 'You already liked this user' });
        }

        // Create a new like
        const like = new Like({
            user: userId,
            likedUser: userIdToLike
        });
        await like.save();

        res.status(200).json({ message: 'User liked successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Dislike a user
router.delete('/:id', async (req, res) => {
    try {
        // Get the user ID to dislike
        const userIdToDislike = req.params.id;
        // Get the current user's ID
        const userId = req.user._id;

        // Delete the like
        await Like.findOneAndDelete({ user: userId, likedUser: userIdToDislike });

        res.status(200).json({ message: 'User disliked successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Get matches (mutual likes)
router.get('/matches', async (req, res) => {
    try {
        // Get the current user's ID
        const userId = req.user._id;

        // Use MongoDB aggregation to find mutual likes
        const matches = await Like.aggregate([
            {
                $match: { $or: [{ user: userId }, { likedUser: userId }] }
            },
            {
                $group: {
                    _id: null,
                    likes: { $addToSet: '$user' },
                    likedBy: { $addToSet: '$likedUser' }
                }
            },
            {
                $project: {
                    matches: { $setIntersection: ['$likes', '$likedBy'] }
                }
            },
            {
                $project: {
                    matches: { $setDifference: ['$matches', [userId]] }
                }
            }
        ]);

        // If there are matches, extract the user IDs
        const matchedUserIds = matches.length > 0 ? matches[0].matches : [];

        res.status(200).json({ matches: matchedUserIds });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;

// eof
