import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../db';

// Account model
const Account = sequelize.define('Account', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hasMealScraperAccess: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

// Item model
const Item = sequelize.define('Item', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ean: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING(1000)
    },
    external_id: {
        type: DataTypes.STRING
    },
    brand: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING(1000)
    },
    vendor: {
        type: DataTypes.STRING
    },
    categories: {
        type: DataTypes.STRING(1000)
    },
    dataVersion: {
        type: DataTypes.STRING,
        defaultValue: 'v1'
    }
});

// Home model
const Home = sequelize.define('Home', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    AccountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Accounts',
            key: 'id'
        },
    },
});

const HomeItem = sequelize.define('HomeItem', {
    // Primary Key for the join table, if you want a specific one
    id: {
        type: Sequelize.INTEGER,
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



export { Account, Home, Item, HomeItem };
