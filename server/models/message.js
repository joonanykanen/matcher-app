// models/message.js, JN, 19.02.2024
const mongoose = require('mongoose');

// Define the message schema
const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
  
// Define the Message model
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;

// eof
