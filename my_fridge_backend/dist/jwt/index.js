'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.jwtAuth = jwtAuth;
var jwt = require('jsonwebtoken');
var config = require('../config');

// Middleware to validate token and set account in request
function jwtAuth(req, res, next) {
	var authHeader = req.headers['authorization'];
	var token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN_STRING

	if (!token) {
		return res.status(401).json({ message: 'No token provided. Authorization denied.' });
	}

	jwt.verify(token, config.secret, function (err, account) {
		if (err) {
			console.error('Token verification failed: ' + err.message);
			return res.status(403).json({ message: 'Token is invalid.' });
		}
		req.account = account; // set the account in the request
		next();
	});
}
//# sourceMappingURL=index.js.map