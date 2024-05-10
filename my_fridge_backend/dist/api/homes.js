'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require('../models');

var _jwt = require('../jwt');

var _express = require('express');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('babel-polyfill');
var nanoId = require('nanoid');

exports.default = function (_ref) {
    var config = _ref.config;

    var api = (0, _express.Router)().use(_jwt.jwtAuth);

    var wrap = function wrap(fn) {
        return function () {
            return fn.apply(undefined, arguments).catch(arguments.length <= 2 ? undefined : arguments[2]);
        };
    };

    api.post('/create', wrap(function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
            var AccountId, home;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            AccountId = req.account.id; // Extract AccountId from token

                            _context.prev = 1;
                            _context.next = 4;
                            return _models.Home.findOne({ where: { AccountId: AccountId } });

                        case 4:
                            home = _context.sent;

                            if (!home) {
                                _context.next = 9;
                                break;
                            }

                            res.json({ message: 'Home already exists.' });
                            _context.next = 12;
                            break;

                        case 9:
                            _context.next = 11;
                            return _models.Home.create({ AccountId: AccountId });

                        case 11:
                            res.json({ message: 'Home created.' });

                        case 12:
                            _context.next = 18;
                            break;

                        case 14:
                            _context.prev = 14;
                            _context.t0 = _context['catch'](1);

                            console.error('Error creating home:', _context.t0);
                            res.status(500).json({ message: 'Internal server error.' });

                        case 18:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined, [[1, 14]]);
        }));

        return function (_x, _x2) {
            return _ref2.apply(this, arguments);
        };
    }()));

    api.get('/', wrap(function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
            var AccountId, home, homeItems;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            AccountId = req.account.id; // Extract AccountId from the JWT

                            _context2.prev = 1;
                            _context2.next = 4;
                            return _models.Home.findOne({ where: { AccountId: AccountId } });

                        case 4:
                            home = _context2.sent;

                            if (!home) {
                                _context2.next = 12;
                                break;
                            }

                            _context2.next = 8;
                            return _models.HomeItem.findAll({
                                where: { HomeId: home.id }, // Assuming homeId is the correct column name
                                include: [{ model: _models.Item }] // Ensure Item is associated in your model definitions
                            });

                        case 8:
                            homeItems = _context2.sent;

                            res.json({ home: home, homeItems: homeItems });
                            _context2.next = 13;
                            break;

                        case 12:
                            res.json({ message: 'Home not found.' });

                        case 13:
                            _context2.next = 19;
                            break;

                        case 15:
                            _context2.prev = 15;
                            _context2.t0 = _context2['catch'](1);

                            console.error('Error fetching home:', _context2.t0);
                            res.status(500).json({ message: 'Internal server error.' });

                        case 19:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined, [[1, 15]]);
        }));

        return function (_x3, _x4) {
            return _ref3.apply(this, arguments);
        };
    }()));

    api.post('/add-item', wrap(function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
            var ean, item, response, data, product, categories, home, existingHomeItem;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            ean = req.body.ean;
                            _context3.prev = 1;

                            if (!(ean.length !== 13 && ean.length !== 8)) {
                                _context3.next = 5;
                                break;
                            }

                            res.json({ message: 'Invalid EAN.' });
                            return _context3.abrupt('return');

                        case 5:
                            _context3.next = 7;
                            return _models.Item.findOne({ where: { ean: ean } });

                        case 7:
                            item = _context3.sent;

                            if (!(!item || item.dataVersion !== config.dataVersion)) {
                                _context3.next = 23;
                                break;
                            }

                            _context3.next = 11;
                            return config.kassalClient.get('/api/v1/products/ean/' + ean);

                        case 11:
                            response = _context3.sent;
                            data = response && response.data && response.data.data || null;

                            if (!(data && data.products && data.products.length > 0)) {
                                _context3.next = 23;
                                break;
                            }

                            product = data.products[0];
                            categories = "";

                            if (product.category && product.category.length > 0) {
                                categories = product.category.map(function (category) {
                                    return category.name;
                                }).join(',');
                            }

                            if (!(item && item.dataVersion !== config.dataVersion)) {
                                _context3.next = 20;
                                break;
                            }

                            _context3.next = 20;
                            return _models.Item.destroy({ where: { ean: ean } });

                        case 20:
                            _context3.next = 22;
                            return _models.Item.create({
                                ean: ean,
                                name: product.name,
                                image: product.image,
                                external_id: product.id,
                                brand: product.brand,
                                description: product.description,
                                vendor: product.vendor,
                                categories: categories,
                                dataVersion: config.dataVersion
                            });

                        case 22:
                            item = _context3.sent;

                        case 23:
                            _context3.next = 25;
                            return _models.Home.findOne({ where: { AccountId: req.account.id } });

                        case 25:
                            home = _context3.sent;

                            if (!(home && item)) {
                                _context3.next = 39;
                                break;
                            }

                            _context3.next = 29;
                            return _models.HomeItem.findOne({ where: { HomeId: home.id, ItemId: item.id } });

                        case 29:
                            existingHomeItem = _context3.sent;

                            if (!existingHomeItem) {
                                _context3.next = 34;
                                break;
                            }

                            res.json({ message: 'Item already exists in home.' });
                            _context3.next = 37;
                            break;

                        case 34:
                            _context3.next = 36;
                            return _models.HomeItem.create({ HomeId: home.id, ItemId: item.id });

                        case 36:
                            res.json({ message: 'Item added to home.' });

                        case 37:
                            _context3.next = 40;
                            break;

                        case 39:
                            res.json({ message: 'Home not found.' });

                        case 40:
                            _context3.next = 46;
                            break;

                        case 42:
                            _context3.prev = 42;
                            _context3.t0 = _context3['catch'](1);

                            console.error('Error adding item to home:', _context3.t0);
                            res.status(500).json({ message: 'Internal server error.' });

                        case 46:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined, [[1, 42]]);
        }));

        return function (_x5, _x6) {
            return _ref4.apply(this, arguments);
        };
    }()));

    api.post('/remove-item', wrap(function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
            var ean, item, home, existingHomeItem;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            ean = req.body.ean;
                            _context4.prev = 1;

                            if (!(ean.length !== 13 && ean.length !== 8)) {
                                _context4.next = 5;
                                break;
                            }

                            res.json({ message: 'Invalid EAN.' });
                            return _context4.abrupt('return');

                        case 5:
                            _context4.next = 7;
                            return _models.Item.findOne({ where: { ean: ean } });

                        case 7:
                            item = _context4.sent;

                            if (item) {
                                _context4.next = 11;
                                break;
                            }

                            res.json({ message: 'Item not found.' });
                            return _context4.abrupt('return');

                        case 11:
                            _context4.next = 13;
                            return _models.Home.findOne({ where: { AccountId: req.account.id } });

                        case 13:
                            home = _context4.sent;

                            if (home) {
                                _context4.next = 17;
                                break;
                            }

                            res.json({ message: 'Home not found.' });
                            return _context4.abrupt('return');

                        case 17:
                            _context4.next = 19;
                            return _models.HomeItem.findOne({ where: { HomeId: home.id, ItemId: item.id } });

                        case 19:
                            existingHomeItem = _context4.sent;

                            if (existingHomeItem) {
                                _context4.next = 23;
                                break;
                            }

                            res.json({ message: 'Item not found in home.' });
                            return _context4.abrupt('return');

                        case 23:
                            _context4.next = 25;
                            return _models.HomeItem.destroy({ where: { id: existingHomeItem.id } });

                        case 25:
                            res.json({ message: 'Item removed from home.' });

                            _context4.next = 32;
                            break;

                        case 28:
                            _context4.prev = 28;
                            _context4.t0 = _context4['catch'](1);

                            console.error('Error removing item from home:', _context4.t0);
                            res.status(500).json({ message: 'Internal server error.' });

                        case 32:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, undefined, [[1, 28]]);
        }));

        return function (_x7, _x8) {
            return _ref5.apply(this, arguments);
        };
    }()));

    api.post('/check-item', wrap(function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
            var ean, item, response, data, product, categories, home, homeItems, homeItem, _response, items, similarItems;

            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            ean = req.body.ean;
                            _context6.prev = 1;

                            if (!(ean.length !== 13 && ean.length !== 8)) {
                                _context6.next = 5;
                                break;
                            }

                            res.json({ message: 'Invalid EAN.' });
                            return _context6.abrupt('return');

                        case 5:
                            _context6.next = 7;
                            return _models.Item.findOne({ where: { ean: ean } });

                        case 7:
                            item = _context6.sent;

                            if (!(!item || item.dataVersion !== config.dataVersion)) {
                                _context6.next = 22;
                                break;
                            }

                            _context6.next = 11;
                            return config.kassalClient.get('/api/v1/products/ean/' + ean);

                        case 11:
                            response = _context6.sent;
                            data = response && response.data && response.data.data || null;

                            if (!(data && data.products && data.products.length > 0)) {
                                _context6.next = 22;
                                break;
                            }

                            product = data.products[0];
                            categories = product.category.map(function (category) {
                                return category.name;
                            }).join(',');

                            if (!(item && item.dataVersion !== config.dataVersion)) {
                                _context6.next = 19;
                                break;
                            }

                            _context6.next = 19;
                            return _models.Item.destroy({ where: { ean: ean } });

                        case 19:
                            _context6.next = 21;
                            return _models.Item.create({
                                ean: ean,
                                name: product.name,
                                image: product.image,
                                external_id: product.id,
                                brand: product.brand,
                                description: product.description,
                                vendor: product.vendor,
                                categories: categories,
                                dataVersion: config.dataVersion
                            });

                        case 21:
                            item = _context6.sent;

                        case 22:
                            if (!item) {
                                _context6.next = 45;
                                break;
                            }

                            _context6.next = 25;
                            return _models.Home.findOne({ where: { AccountId: req.account.id } });

                        case 25:
                            home = _context6.sent;

                            if (!home) {
                                _context6.next = 42;
                                break;
                            }

                            _context6.next = 29;
                            return _models.HomeItem.findAll({
                                where: { HomeId: home.id }, // Assuming homeId is the correct column name
                                include: [{ model: _models.Item }] // Ensure Item is associated in your model definitions
                            });

                        case 29:
                            homeItems = _context6.sent;
                            homeItem = homeItems.find(function (homeItem) {
                                return homeItem.ItemId === item.id;
                            });
                            _response = { message: '', exactMatchHomeItem: null, similarItems: [], currentItem: item };

                            if (homeItem) {
                                _response.message = 'Item is in home.';
                                _response.exactMatchHomeItem = homeItem;
                            } else {
                                _response.message = 'Item is not in home.';
                            }
                            _context6.next = 35;
                            return Promise.all(homeItems.map(function () {
                                var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(homeItem) {
                                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                        while (1) {
                                            switch (_context5.prev = _context5.next) {
                                                case 0:
                                                    _context5.next = 2;
                                                    return _models.Item.findOne({ where: { id: homeItem.ItemId } });

                                                case 2:
                                                    return _context5.abrupt('return', _context5.sent);

                                                case 3:
                                                case 'end':
                                                    return _context5.stop();
                                            }
                                        }
                                    }, _callee5, undefined);
                                }));

                                return function (_x11) {
                                    return _ref7.apply(this, arguments);
                                };
                            }()));

                        case 35:
                            items = _context6.sent;
                            similarItems = items.filter(function (similarItem) {
                                return similarItem.categories.split(',').some(function (category) {
                                    return item.categories.split(',').includes(category);
                                });
                            });

                            _response.similarItems = similarItems.filter(function (similarItem) {
                                return similarItem.ean !== item.ean;
                            });
                            if (_response.similarItems.length > 0) {
                                _response.message = 'Item is not in home, but similar items were found.';
                            }
                            res.json(_response);
                            _context6.next = 43;
                            break;

                        case 42:
                            res.json({ message: 'Home not found.' });

                        case 43:
                            _context6.next = 46;
                            break;

                        case 45:
                            res.json({ message: 'Item not found.' });

                        case 46:
                            _context6.next = 52;
                            break;

                        case 48:
                            _context6.prev = 48;
                            _context6.t0 = _context6['catch'](1);

                            console.error('Error checking item in home:', _context6.t0);
                            res.status(500).json({ message: 'Internal server error.' });

                        case 52:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, undefined, [[1, 48]]);
        }));

        return function (_x9, _x10) {
            return _ref6.apply(this, arguments);
        };
    }()));

    return api;
};
//# sourceMappingURL=homes.js.map