// routes/api/user.js, JN, 19.02.2024

// Import required modules
const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../../models/user');
const jwtAuth = passport.authenticate('jwt', { session: false });

// Apply JWT authentication middleware to all routes
router.use(jwtAuth);

/* Consider improving security by reducing the returned parameters of the requested users */

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get authenticated user
router.get('/me', async (req, res) => {
    try {
      res.json(req.user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
});

// GET user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update user by ID
router.put('/:id', async (req, res) => {
    const { firstName, lastName } = req.body;
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user properties
        user.firstName = firstName;
        user.lastName = lastName;

        // Save the updated user
        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

// eof
