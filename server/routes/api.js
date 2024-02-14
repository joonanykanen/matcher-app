// routes/api.js, JN, 14.02.2024
const express = require('express');
const router = express.Router();
const userRouter = require('.api/user');

router.use('/user', userRouter);

module.exports = router;

// eof
