'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _package = require('../../package.json');

var _express = require('express');

var _items = require('./items');

var _items2 = _interopRequireDefault(_items);

var _accounts = require('./accounts');

var _accounts2 = _interopRequireDefault(_accounts);

var _homes = require('./homes');

var _homes2 = _interopRequireDefault(_homes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var config = _ref.config,
	    db = _ref.db;

	var api = (0, _express.Router)();

	// mount the facets resource
	api.use('/items', (0, _items2.default)({ config: config, db: db }));
	api.use('/accounts', (0, _accounts2.default)({ config: config, db: db }));
	api.use('/homes', (0, _homes2.default)({ config: config, db: db }));

	return api;
};
//# sourceMappingURL=index.js.map