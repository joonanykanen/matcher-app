// routes/api/like.js, JN, 19.02.2024
const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwtAuth = passport.authenticate('jwt', { session: false });

const User = require("../../models/user");
const Like = require("../../models/like");

// Apply JWT authentication middleware to all routes
router.use(jwtAuth);

// Get all likes for the current user
router.get('/', async (req, res) => {
    try {
        // Get the current user's ID
        const userId = req.user._id;

        // Find all likes for the current user
        const likes = await Like.find({ user: userId });

        // Extract the user IDs of the liked users
        const likedUserIds = likes.map(like => like.likedUser);

        res.status(200).json({ likes: likedUserIds });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Like or dislike a user
router.post('/:id', async (req, res) => {
    try {
        // Get the user ID to like or dislike
        const userIdToLikeOrDislike = req.params.id;
        // Get the current user's ID
        const userId = req.user._id;

        // Check if the user to like or dislike exists
        const userToLikeOrDislike = await User.findById(userIdToLikeOrDislike);
        if (!userToLikeOrDislike) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the user is trying to like or dislike themselves
        if (userId === userIdToLikeOrDislike) {
            return res.status(400).json({ error: 'Cannot like or dislike yourself' });
        }

        // Check if the user has already liked or disliked the other user
        const existingLikeOrDislike = await Like.findOne({ user: userId, likedUser: userIdToLikeOrDislike });
        if (existingLikeOrDislike) {
            return res.status(400).json({ error: 'You already liked or disliked this user' });
        }

        // Get the type from the request payload
        const { type } = req.body;

        if (type !== 'like' && type !== 'dislike') {
            return res.status(400).json({ error: 'Invalid type' });
        }

        // Perform like or dislike
        const like = new Like({
            user: userId,
            likedUser: userIdToLikeOrDislike,
            type: type
        });
        await like.save();

        res.status(200).json({ message: 'User liked successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Delete a like of a user
router.delete('/:id', async (req, res) => {
    try {
        // Get the user ID to dislike
        const userIdToDislike = req.params.id;
        // Get the current user's ID
        const userId = req.user._id;

        // Find and delete the like
        const deletedLike = await Like.findOneAndDelete({ user: userId, likedUser: userIdToDislike });

        if (!deletedLike) {
            return res.status(404).json({ error: 'Like not found' });
        }

        res.status(200).json({ message: 'User like removed successfully' });
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
                $match: { $or: [{ user: userId }, { likedUser: userId }], type: 'like' }
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

// Check if there's a match between a user and the current user
router.get('/:id/check-match', async (req, res) => {
    try {
        // Get the user ID to check match
        const userIdToCheckMatch = req.params.id;
        // Get the current user's ID
        const userId = req.user._id;

        // Find if the current user liked the other user
        const currentUserLikesOtherUser = await Like.findOne({ user: userId, likedUser: userIdToCheckMatch, type: 'like' });

        // Find if the other user liked the current user
        const otherUserLikesCurrentUser = await Like.findOne({ user: userIdToCheckMatch, likedUser: userId, type: 'like' });

        // If both users liked each other, it's a match
        if (currentUserLikesOtherUser && otherUserLikesCurrentUser) {
            res.status(200).json({ matched: true });
        } else {
            res.status(200).json({ matched: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;

// eof
