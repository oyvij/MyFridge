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

                            res.status(409).json({ message: 'Home already exists.', success: false });
                            _context.next = 12;
                            break;

                        case 9:
                            _context.next = 11;
                            return _models.Home.create({ AccountId: AccountId });

                        case 11:
                            res.status(201).json({ message: 'Home created.', success: true });

                        case 12:
                            _context.next = 18;
                            break;

                        case 14:
                            _context.prev = 14;
                            _context.t0 = _context['catch'](1);

                            console.error('Error creating home:', _context.t0);
                            res.status(500).json({ message: 'Internal server error.', success: false });

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

                            res.json({ home: home, homeItems: homeItems, message: "Found home", success: true });
                            _context2.next = 13;
                            break;

                        case 12:
                            res.status(404).json({ message: 'Home not found.', success: false });

                        case 13:
                            _context2.next = 19;
                            break;

                        case 15:
                            _context2.prev = 15;
                            _context2.t0 = _context2['catch'](1);

                            console.error('Error fetching home:', _context2.t0);
                            res.status(500).json({ message: 'Internal server error.', success: false });

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

    api.post('/add-item-by-ean', wrap(function () {
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

                            res.status(400).json({ message: 'Invalid EAN.', success: false });
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

                            res.status(409).json({ message: 'Item already exists in home.', success: false });
                            _context3.next = 37;
                            break;

                        case 34:
                            _context3.next = 36;
                            return _models.HomeItem.create({ HomeId: home.id, ItemId: item.id });

                        case 36:
                            res.status(200).json({ message: 'Item added to home.', success: true });

                        case 37:
                            _context3.next = 40;
                            break;

                        case 39:
                            res.status(404).json({ message: 'Home not found.', success: false });

                        case 40:
                            _context3.next = 46;
                            break;

                        case 42:
                            _context3.prev = 42;
                            _context3.t0 = _context3['catch'](1);

                            console.error('Error adding item to home:', _context3.t0);
                            res.status(500).json({ message: 'Internal server error.', success: false });

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

    api.delete('/remove-item-by-ean', wrap(function () {
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

                            res.status(400).json({ message: 'Invalid EAN.', success: false });
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

                            res.status(404).json({ message: 'Item not found.', success: false });
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

                            res.status(404).json({ message: 'Home not found.', success: false });
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

                            res.status(404).json({ message: 'Item not found in home.', success: false });
                            return _context4.abrupt('return');

                        case 23:
                            _context4.next = 25;
                            return _models.HomeItem.destroy({ where: { id: existingHomeItem.id } });

                        case 25:
                            res.status(200).json({ message: 'Item removed from home.', success: true });

                            _context4.next = 32;
                            break;

                        case 28:
                            _context4.prev = 28;
                            _context4.t0 = _context4['catch'](1);

                            console.error('Error removing item from home:', _context4.t0);
                            res.status(500).json({ message: 'Internal server error.', success: false });

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

    // remove item from kitchen by id
    api.delete('/remove-item-by-id', wrap(function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
            var id, homeItem, home, existingHomeItem;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            id = req.body.id;
                            _context5.prev = 1;
                            _context5.next = 4;
                            return _models.HomeItem.findOne({ where: { id: id } });

                        case 4:
                            homeItem = _context5.sent;

                            if (homeItem) {
                                _context5.next = 8;
                                break;
                            }

                            res.status(404).json({ message: 'Item not found.', success: false });
                            return _context5.abrupt('return');

                        case 8:
                            _context5.next = 10;
                            return _models.Home.findOne({ where: { AccountId: req.account.id } });

                        case 10:
                            home = _context5.sent;

                            if (home) {
                                _context5.next = 14;
                                break;
                            }

                            res.status(404).json({ message: 'Home not found.', success: false });
                            return _context5.abrupt('return');

                        case 14:
                            _context5.next = 16;
                            return _models.HomeItem.findOne({ where: { HomeId: home.id, ItemId: homeItem.ItemId } });

                        case 16:
                            existingHomeItem = _context5.sent;

                            if (existingHomeItem) {
                                _context5.next = 20;
                                break;
                            }

                            res.status(404).json({ message: 'Item not found in home.', success: false });
                            return _context5.abrupt('return');

                        case 20:
                            _context5.next = 22;
                            return _models.HomeItem.destroy({ where: { id: id } });

                        case 22:
                            res.status(200).json({ message: 'Item removed from home.', success: true });

                            _context5.next = 29;
                            break;

                        case 25:
                            _context5.prev = 25;
                            _context5.t0 = _context5['catch'](1);

                            console.error('Error removing item from home:', _context5.t0);
                            res.status(500).json({ message: 'Internal server error.', success: false });

                        case 29:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, undefined, [[1, 25]]);
        }));

        return function (_x9, _x10) {
            return _ref6.apply(this, arguments);
        };
    }()));

    api.post('/check-item', wrap(function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
            var ean, item, response, data, product, categories, home, homeItems, homeItem, _response, items, similarItems;

            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            ean = req.body.ean;
                            _context7.prev = 1;

                            if (!(ean.length !== 13 && ean.length !== 8)) {
                                _context7.next = 5;
                                break;
                            }

                            res.status(400).json({ message: 'Invalid EAN.', success: false });
                            return _context7.abrupt('return');

                        case 5:
                            _context7.next = 7;
                            return _models.Item.findOne({ where: { ean: ean } });

                        case 7:
                            item = _context7.sent;

                            if (!(!item || item.dataVersion !== config.dataVersion)) {
                                _context7.next = 29;
                                break;
                            }

                            _context7.prev = 9;
                            _context7.next = 12;
                            return config.kassalClient.get('/api/v1/products/ean/' + ean);

                        case 12:
                            response = _context7.sent;
                            data = response && response.data && response.data.data || null;

                            if (!(data && data.products && data.products.length > 0)) {
                                _context7.next = 23;
                                break;
                            }

                            product = data.products[0];
                            categories = product.category.map(function (category) {
                                return category.name;
                            }).join(',');

                            if (!(item && item.dataVersion !== config.dataVersion)) {
                                _context7.next = 20;
                                break;
                            }

                            _context7.next = 20;
                            return _models.Item.destroy({ where: { ean: ean } });

                        case 20:
                            _context7.next = 22;
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
                            item = _context7.sent;

                        case 23:
                            _context7.next = 29;
                            break;

                        case 25:
                            _context7.prev = 25;
                            _context7.t0 = _context7['catch'](9);

                            res.status(404).json({ message: 'Item not found.', success: false });
                            return _context7.abrupt('return');

                        case 29:
                            if (!item) {
                                _context7.next = 52;
                                break;
                            }

                            _context7.next = 32;
                            return _models.Home.findOne({ where: { AccountId: req.account.id } });

                        case 32:
                            home = _context7.sent;

                            if (!home) {
                                _context7.next = 49;
                                break;
                            }

                            _context7.next = 36;
                            return _models.HomeItem.findAll({
                                where: { HomeId: home.id }, // Assuming homeId is the correct column name
                                include: [{ model: _models.Item }] // Ensure Item is associated in your model definitions
                            });

                        case 36:
                            homeItems = _context7.sent;
                            homeItem = homeItems.find(function (homeItem) {
                                return homeItem.ItemId === item.id;
                            });
                            _response = { message: '', exactMatchHomeItem: null, similarItems: [], currentItem: item, success: true };

                            if (homeItem) {
                                _response.message = 'Item is in home.';
                                _response.exactMatchHomeItem = homeItem;
                            } else {
                                _response.message = 'Item is not in home.';
                            }
                            _context7.next = 42;
                            return Promise.all(homeItems.map(function () {
                                var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(homeItem) {
                                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                                        while (1) {
                                            switch (_context6.prev = _context6.next) {
                                                case 0:
                                                    _context6.next = 2;
                                                    return _models.Item.findOne({ where: { id: homeItem.ItemId } });

                                                case 2:
                                                    return _context6.abrupt('return', _context6.sent);

                                                case 3:
                                                case 'end':
                                                    return _context6.stop();
                                            }
                                        }
                                    }, _callee6, undefined);
                                }));

                                return function (_x13) {
                                    return _ref8.apply(this, arguments);
                                };
                            }()));

                        case 42:
                            items = _context7.sent;
                            similarItems = items.filter(function (similarItem) {
                                return similarItem.categories.split(',').some(function (category) {
                                    return item.categories.split(',').includes(category);
                                });
                            });

                            _response.similarItems = similarItems.filter(function (similarItem) {
                                return similarItem.ean !== item.ean;
                            });
                            if (_response.similarItems.length > 0 && _response.message === 'Item is not in home.') {
                                _response.message = 'Item is not in home, but similar items were found.';
                            }
                            res.status(200).json(_response);
                            _context7.next = 50;
                            break;

                        case 49:
                            res.status(404).json({ message: 'Home not found.', success: false });

                        case 50:
                            _context7.next = 53;
                            break;

                        case 52:
                            res.status(404).json({ message: 'Item not found.', success: false });

                        case 53:
                            _context7.next = 58;
                            break;

                        case 55:
                            _context7.prev = 55;
                            _context7.t1 = _context7['catch'](1);

                            //console.error('Error checking item in home:', error);
                            res.status(500).json({ message: 'Internal server error.', success: false });

                        case 58:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, undefined, [[1, 55], [9, 25]]);
        }));

        return function (_x11, _x12) {
            return _ref7.apply(this, arguments);
        };
    }()));

    return api;
};
//# sourceMappingURL=homes.js.map