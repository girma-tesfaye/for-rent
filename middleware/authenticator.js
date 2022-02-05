const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/keys');

exports.authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            errorMessage: 'No token. Authorisation denied!'
        })
    }

    try {

        const decoded = jwt.verify(token, jwtSecret);

        req.user = decoded.user;
        
        next();
    } catch {(err) => {
        res.status(401).json({
            errorMessage: 'Invalid token'
        });
    }}

}