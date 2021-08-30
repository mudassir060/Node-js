const express = require('express');
const router = express.Router();
const {signUp,signIn} = require('../controller/auth')
router.use('/signup',signUp)
router.use('/signin',signIn)

module.exports = router