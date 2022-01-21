const { check, validationResult } = require('express-validator');

exports.signupValidator = [
    check('fullName')
        .not().isEmpty()
        .trim()
        .withMessage('All fields are required'),
    check('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid email'),
    check('password')
        .isLength( {min: 6})
        .withMessage('Password must be at least six characters long')
]

exports.signinValidator = [
    check('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid email'),
    check('password')
        .isLength( {min: 6})
        .withMessage('Password must be at least six characters long')
]

exports.validationResult = (req, res, next) => {

    const result = validationResult(req);
    const hasErrors = !result.isEmpty();

    if (hasErrors) {
        const firstError = result.array()[0].msg;
        return res.status(400).json({
            errorMessage: firstError,
        });
    }

    next();
}