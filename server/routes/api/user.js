// routes/api/user.js, JN, 19.02.2024

// Import required modules
const express = require('express');
const multer = require('multer');
const passport = require('passport');
const router = express.Router();
const User = require('../../models/user');
const jwtAuth = passport.authenticate('jwt', { session: false });

// Apply JWT authentication middleware to all routes
router.use(jwtAuth);

// Set up storage engine
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/'); // Ensure the uploads directory exists
    },
    filename: function(req, file, cb) {
        cb(null, new Date().valueOf() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

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
    const { firstName, lastName, email, age, gender, bio } = req.body;
    try {
        // !!! This is a security flaw, use only req.user !!!
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // If the email is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(403).json({ error: "Email already in use" });
        }

        // Validate age
        if (typeof age !== 'number' || age < 18 || age > 99) {
            return res.status(400).json({ error: "Invalid age. Age must be a number between 18 and 99 years old." });
        }

        // Validate gender
        if (!["Male", "Female", "Other"].includes(gender)) {
            return res.status(400).json({ error: "Invalid gender. Gender must be 'Male', 'Female', or 'Other'." });
        }

        // Validate bio
        const words = bio.split(' ');
        if (words.length > 200) {
            return res.status(400).json({ error: "Invalid bio. Bio can have only 200 characters." });
        }

        // Update user properties
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;
        user.age = age || user.age;
        user.gender = gender || user.gender;
        user.bio = bio || user.bio;

        // Save the updated user
        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Upload profile picture
router.post('/uploadPic/', upload.single('profilePic'), async (req, res) => {
    try {
        const user = req.user;

        // Assuming we're storing the file path in the user model
        user.profilePic = req.file.path;
        await user.save();
        
        res.json({ message: 'Profile picture uploaded successfully', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

// eof
