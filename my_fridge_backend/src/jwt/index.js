const jwt = require('jsonwebtoken');
const config = require('../config');


// Middleware to validate token and set account in request
export function jwtAuth(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN_STRING

	if (!token) {
		return res.status(401).json({ message: 'No token provided. Authorization denied.' });
	}

	jwt.verify(token, config.secret, (err, account) => {
		if (err) {
			console.error(`Token verification failed: ${err.message}`);
			return res.status(403).json({ message: 'Token is invalid.' });
		}
		req.account = account; // set the account in the request
		next();
	});
}
