const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');
const { authenticateJWT } = require('../middleware/authenticator');

router.post('/', authenticateJWT, categoryController.create);
router.get('/', authenticateJWT, categoryController.readAll);

module.exports = router;