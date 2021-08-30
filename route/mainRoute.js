const express = require('express');
const router = express.Router();
const authRouter = require('./authRoute')
const todoRouter = require('./todoRouter')
router.use('/auth',authRouter)
router.use('/todo',todoRouter)

module.exports = router;