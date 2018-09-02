module.exports = (sequelize, DataTypes) => {
    return sequelize.define('wiki', {
        title : {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        content : {
            type: DataTypes.TEXT,
            allowNull : true,
        },
        parentId : {
            type: DataTypes.INTEGER,
            defaultValue : 0,
        },
        likes : {
            type: DataTypes.INTEGER,
            defaultValue : 0,
        },
        dislikes: {
            type: DataTypes.INTEGER,
            defaultValue : 0,
        }
    }, {
        timestamps: true,
        paranoid : true,
    })
}