'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

var _kassalClient = require('./clients/kassalClient');

var _kassalClient2 = _interopRequireDefault(_kassalClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var app = (0, _express2.default)();
app.server = _http2.default.createServer(app);

app.use((0, _cors2.default)({
    origin: '*'
}));

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

_config2.default.kassalClient = (0, _kassalClient2.default)(process.env.KASSAL_API_KEY);

app.use('/api', (0, _api2.default)({ config: _config2.default }));
app.server.listen(process.env.PORT);
console.log('Started on port ' + process.env.PORT);
//# sourceMappingURL=index.js.map