// models/like.js, JN, 19.02.2024
const mongoose = require("mongoose");

// Define the Like schema
const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Like model
const Like = mongoose.model('Like', likeSchema);

// Export the model
module.exports = Like;

// eof
