const express = require('express');
const router = express.Router();
const assetController = require('../controllers/asset');
const { authenticateJWT } = require('../middleware/authenticator');
const upload = require('../middleware/multer');

router.post('/', authenticateJWT, upload.single('assetImage'), assetController.create);

module.exports = router;