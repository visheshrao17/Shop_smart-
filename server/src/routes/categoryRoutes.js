const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/list', categoryController.list);

module.exports = router;
