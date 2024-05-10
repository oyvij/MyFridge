'use strict';

var _require = require('sequelize'),
    Sequelize = _require.Sequelize;

require('dotenv').config();

var sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  alter: true
});

sequelize.sync() // { force: true }
.then(function () {
  console.log('All models were synchronized successfully.');
}).catch(function (error) {
  console.error('An error occurred while synchronizing models:', error);
});

module.exports = sequelize;
//# sourceMappingURL=db.js.map