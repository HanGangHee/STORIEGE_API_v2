
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config)
const db = {};


db.User = require('./user')(sequelize, Sequelize)
db.Hashtag = require('./Hashtag')(sequelize, Sequelize)
db.Wiki = require('./wiki')(sequelize, Sequelize)

db.User.hasMany(db.Wiki, { foreignKey : 'userId', sourceKey : 'id' })
db.Wiki.belongsTo(db.User, { foreignKey : 'userId', targetKey : 'id' })

db.Hashtag.belongsToMany(db.Wiki, { through : 'WikiHashtag' })
db.Wiki.belongsToMany(db.Hashtag, { through : 'WikiHashtag' })


db.WikiHashtag = sequelize.define("WikiHashtag", {},{
    freezeTableName : true,
    timestamps : true })

db.WikiHashtag.belongsTo(db.Wiki)
db.WikiHashtag.belongsTo(db.Hashtag)

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
