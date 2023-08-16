// Purpose: Establishes connection to database.

const { Sequelize } = require('sequelize');
require('dotenv').config();

// If the app is deployed on Heroku, use the JawsDB database.
if (process.env.JAWSDB_URL) {

    sequelize = new Sequelize (process.env.JAWSDB_URL);

}

// Otherwise, use the local database.
else {

    sequelize = new Sequelize (

        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {

            host: '127.0.0.1',
            dialect: 'mysql',
            port: 3306

        }

    );

}

module.exports = sequelize;