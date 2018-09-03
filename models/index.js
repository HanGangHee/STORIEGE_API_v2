
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config)
const db = {};


db.User = require('./user')(sequelize, Sequelize)
db.Hashtag = require('./Hashtag')(sequelize, Sequelize)
db.Wiki = require('./wiki')(sequelize, Sequelize)

db.User.hasMany(db.Wiki)
db.Wiki.belongsTo(db.User)

db.Hashtag.belongsToMany(db.Wiki, { through : 'WikiHashtag' })
db.Wiki.belongsToMany(db.Hashtag, { through : 'WikiHashtag' })

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
