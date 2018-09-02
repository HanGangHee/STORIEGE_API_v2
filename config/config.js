require('dotenv').config()

module.exports = {
  "development": {
    "username": process.env.SEQUELIZE_USERNAME,
    "password": process.env.SEQUELIZE_PASSWORD,
    "database": process.env.SEQUELIZE_DATABASE,
    "host": process.env.SEQUELIZE_HOST,
    "dialect": "mysql",
    "operatorsAliases" : false,
  },
  "test": {
    "username": process.env.SEQUELIZE_USERNAME,
    "password": process.env.SEQUELIZE_PASSWORD,
    "database": process.env.SEQUELIZE_DATABASE,
    "host": process.env.SEQUELIZE_HOST,
    "dialect": "mysql",
    "operatorsAliases" : false,
  },
  "production": {
    "username": process.env.SEQUELIZE_USERNAME,
    "password": process.env.SEQUELIZE_PASSWORD,
    "database": process.env.SEQUELIZE_DATABASE,
    "host": process.env.SEQUELIZE_HOST,
    "dialect": "mysql",
    "operatorsAliases" : false,
  }
}
