// user.js, JN, 08.01.2024
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});

// Hash the password before saving
userSchema.pre("save", async function (next) {
    const user = this;
    
    if (user.isModified("password") || user.isNew) {
        try {
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash;
        } catch (err) {
            return next(err);
        }
    }
    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;

// eof
