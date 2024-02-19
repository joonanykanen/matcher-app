// routes/api.js, JN, 14.02.2024
const express = require('express');
const router = express.Router();

const authRouter = require('./api/auth');
const likeRouter = require('./api/like');
const messageRouter = require('./api/message');
const userRouter = require('./api/user');

router.use('/auth', authRouter);
router.use('/likes', likeRouter);
router.use('/messages', messageRouter);
router.use('/users', userRouter);

module.exports = router;

// eof
