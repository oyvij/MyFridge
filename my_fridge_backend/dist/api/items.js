'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('babel-polyfill');

exports.default = function (_ref) {
	var config = _ref.config,
	    db = _ref.db;

	var api = (0, _express.Router)();

	var wrap = function wrap(fn) {
		return function () {
			return fn.apply(undefined, arguments).catch(arguments.length <= 2 ? undefined : arguments[2]);
		};
	};

	api.get('/', wrap(function () {
		var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
			var items;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return db.all("SELECT * FROM ITEMS");

						case 2:
							items = _context.sent;

							res.json(items);

						case 4:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, undefined);
		}));

		return function (_x, _x2) {
			return _ref2.apply(this, arguments);
		};
	}()));

	return api;
};
//# sourceMappingURL=items.js.map