const { log } = require('console');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv")

class AuthorizationConfig {
    authorization(req, res, next) {
        const authHeader = req.header('Authorization');
        const token =authHeader && authHeader.split(' ')[1];
        if(!token) return res.sendStatus(401);
        try {
            const decoded = jwt.verify(token, process.env.MY_SECRET_KEY);
            console.log(decoded);
            next();
        } catch (error) {
            console.log(error);
            return res.sendStatus(403);
        }
    }
}

module.exports = new AuthorizationConfig;