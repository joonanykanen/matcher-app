// routes/api/message.js, JN, 19.02.2024
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });

const User = require("../../models/user");
const Like = require("../../models/like");
const Message = require("../../models/message");

// Apply JWT authentication middleware to all routes
router.use(jwtAuth);

router.get('/', async (req, res) => {
    try {
        // Fetch all messages where the current user is either the sender or the recipient
        const messages = await Message.find({
          $or: [{ sender: req.user._id }, { recipient: req.user._id }],
        }).populate('sender recipient', 'username'); // Populate sender and recipient details
    
        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { text } = req.body;
    

        // Check if the current user has liked the recipient
        const userLike = await Like.findOne({ user: req.user._id, likedUser: userId });

        // Check if the recipient has liked the current user
        const recipientLike = await Like.findOne({ user: userId, likedUser: req.user._id });

        // If both likes exist, then there is a mutual like
        const mutualLike = userLike && recipientLike;

        
        // If there is no mutual like, return an error
        if (!mutualLike) {
            return res.status(400).json({ message: 'You can only send messages to users you have matched with' });
        }

        // Check if the recipient user exists
        const recipientUser = await User.findById(userId);
        if (!recipientUser) {
            return res.status(404).json({ message: 'Recipient user not found' });
        }

        // Ensure that the recipient is not the current user
        if (recipientUser.id === req.user._id) {
            /* We shouldn't get here because of the mutual like check */
            return res.status(400).json({ message: 'Recipient cannot be the current user' });
        }

        // Create a new message
        const message = new Message({
            sender: req.user._id,
            recipient: userId,
            text,
        });
    
        // Save the message to the database
        await message.save();
    
        res.status(201).json(message);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;

// eof
