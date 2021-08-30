const express = require('express');
const router = express.Router();
const {todoAdd,todoGet} = require('../controller/todo')
router.use('/todoadd',todoAdd)
router.use('/todoget',todoGet)

module.exports = router