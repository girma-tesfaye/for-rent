const express = require("express");
const { signupController, signinController } = require("../controllers/auth");
const router = express.Router();
const { signinValidator, signupValidator, validationResult } = require('../middleware/validator');

router.post('/signup', signupValidator, validationResult, signupController);
router.post('/signin', signinValidator, validationResult, signinController);

module.exports = router;
