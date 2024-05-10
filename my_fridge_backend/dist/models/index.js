'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HomeItem = exports.Item = exports.Home = exports.Account = undefined;

var _sequelize = require('sequelize');

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Account model
var Account = _db2.default.define('Account', {
    id: {
        type: _sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
    }
});

// Item model
var Item = _db2.default.define('Item', {
    id: {
        type: _sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
    },
    ean: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: _sequelize.DataTypes.STRING(1000)
    },
    external_id: {
        type: _sequelize.DataTypes.STRING
    },
    brand: {
        type: _sequelize.DataTypes.STRING
    },
    description: {
        type: _sequelize.DataTypes.STRING(1000)
    },
    vendor: {
        type: _sequelize.DataTypes.STRING
    },
    categories: {
        type: _sequelize.DataTypes.STRING(1000)
    },
    dataVersion: {
        type: _sequelize.DataTypes.STRING,
        defaultValue: 'v1'
    }
});

// Home model
var Home = _db2.default.define('Home', {
    id: {
        type: _sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    AccountId: {
        type: _sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Accounts',
            key: 'id'
        }
    }
});

var HomeItem = _db2.default.define('HomeItem', {
    // Primary Key for the join table, if you want a specific one
    id: {
        type: _sequelize.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

// Define associations
Account.hasOne(Home, { foreignKey: 'AccountId' });
Home.belongsTo(Account, { foreignKey: 'AccountId' });

Home.belongsToMany(Item, { through: 'HomeItem' });
Item.belongsToMany(Home, { through: 'HomeItem' });

HomeItem.belongsTo(Item, { foreignKey: 'ItemId' });
Item.hasMany(HomeItem, { foreignKey: 'ItemId' });

exports.Account = Account;
exports.Home = Home;
exports.Item = Item;
exports.HomeItem = HomeItem;
//# sourceMappingURL=index.js.map