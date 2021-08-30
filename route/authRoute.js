const express = require('express');
const router = express.Router();
const {signUp,signIn,delUser} = require('../controller/auth')
router.use('/signup',signUp)
router.use('/signin',signIn)
router.use('/deluser',delUser)

module.exports = router