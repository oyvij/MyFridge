'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require('../models');

var _express = require('express');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var verifier = require('email-verify');

exports.default = function (_ref) {
    var config = _ref.config;

    var api = (0, _express.Router)();

    var wrap = function wrap(fn) {
        return function () {
            return fn.apply(undefined, arguments).catch(arguments.length <= 2 ? undefined : arguments[2]);
        };
    };

    // Utility function to generate a JWT
    var generateAccessToken = function generateAccessToken(account) {
        return jwt.sign({ id: account.id, email: account.email }, config.secret, {
            expiresIn: '24h' // token will expire in 24 hours
        });
    };

    var generateRefreshToken = function generateRefreshToken(account) {
        return jwt.sign({ id: account.id, email: account.email }, config.refreshTokenSecret, {
            expiresIn: '7d' // longer expiration for refresh token
        });
    };

    api.post('/register', wrap(function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
            var _req$body, email, password, password2, account, hash;

            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _req$body = req.body, email = _req$body.email, password = _req$body.password, password2 = _req$body.password2;

                            if (!(password !== password2)) {
                                _context2.next = 4;
                                break;
                            }

                            res.status(400).json({ message: "Passwords do not match.", success: false });
                            return _context2.abrupt('return');

                        case 4:

                            // Verify the email
                            verifier.verify(email, function () {
                                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, info) {
                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    if (!err) {
                                                        _context.next = 3;
                                                        break;
                                                    }

                                                    res.status(400).json({ message: "Invalid email.", success: false });
                                                    return _context.abrupt('return');

                                                case 3:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, undefined);
                                }));

                                return function (_x3, _x4) {
                                    return _ref3.apply(this, arguments);
                                };
                            }());

                            _context2.next = 7;
                            return _models.Account.findOne({ where: { email: email } });

                        case 7:
                            account = _context2.sent;

                            if (!account) {
                                _context2.next = 11;
                                break;
                            }

                            res.status(409).json({ message: "Account already exists.", success: false });
                            return _context2.abrupt('return');

                        case 11:
                            _context2.next = 13;
                            return bcrypt.hash(password, 10);

                        case 13:
                            hash = _context2.sent;
                            _context2.next = 16;
                            return _models.Account.create({ email: email, password: hash });

                        case 16:
                            // Generate a token
                            res.json({ message: "Account created.", success: true });

                        case 17:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        }));

        return function (_x, _x2) {
            return _ref2.apply(this, arguments);
        };
    }()));

    api.post('/login', wrap(function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
            var _req$body2, email, password, account, match, accessToken, refreshToken;

            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
                            // Get the account from the database

                            _context3.next = 3;
                            return _models.Account.findOne({ where: { email: email } });

                        case 3:
                            account = _context3.sent;

                            if (account) {
                                _context3.next = 7;
                                break;
                            }

                            res.status(404).json({ message: "Account not found.", success: false });
                            return _context3.abrupt('return');

                        case 7:
                            _context3.next = 9;
                            return bcrypt.compare(password, account.password);

                        case 9:
                            match = _context3.sent;

                            if (match) {
                                accessToken = generateAccessToken(account);
                                refreshToken = generateRefreshToken(account);

                                // Optionally save the refresh token in the database or a secure cache
                                // e.g., await saveRefreshToken(account.id, refreshToken);

                                // Send the tokens to the client

                                res.json({
                                    accessToken: accessToken,
                                    refreshToken: refreshToken,
                                    message: "Login successful.", success: true
                                });
                            } else {
                                res.status(401).json({ message: "Incorrect password.", success: false });
                            }

                        case 11:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        }));

        return function (_x5, _x6) {
            return _ref4.apply(this, arguments);
        };
    }()));

    api.post('/refresh_token', function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
            var refreshToken, payload, accountId, newAccessToken;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            refreshToken = req.cookies.refreshToken; // Assuming the refresh token is stored in cookies

                            if (refreshToken) {
                                _context4.next = 3;
                                break;
                            }

                            return _context4.abrupt('return', res.status(401).json({ message: "No refresh token provided.", success: false }));

                        case 3:
                            _context4.prev = 3;
                            payload = jwt.verify(refreshToken, config.refreshTokenSecret);
                            accountId = payload.id; // Extract user ID or other identifiers from the payload
                            // Optionally check against a stored value in the database to ensure the refresh token is still valid

                            newAccessToken = jwt.sign({ id: accountId }, config.accessTokenSecret, { expiresIn: '24h' });

                            res.json({ accessToken: newAccessToken });
                            _context4.next = 13;
                            break;

                        case 10:
                            _context4.prev = 10;
                            _context4.t0 = _context4['catch'](3);
                            return _context4.abrupt('return', res.status(403).json({ message: "Invalid refresh token.", success: false }));

                        case 13:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, undefined, [[3, 10]]);
        }));

        return function (_x7, _x8) {
            return _ref5.apply(this, arguments);
        };
    }());

    return api;
};
//# sourceMappingURL=accounts.js.map