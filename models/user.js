module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        userId : {
            type: DataTypes.STRING(30),
            allowNull : false,
            unique : true,
        },
        pwd : {
            type : DataTypes.STRING(100),
            allowNull: false,
        },
        nick : {
            type : DataTypes.STRING(30),
            allowNull: false,
        },
        age : {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        sex : {
            type: DataTypes.STRING(5),
            allowNull : false,
        },
        thema : {
            type: DataTypes.ENUM,
            values: ['A', 'B', 'C']
        }

    }, {
        timestamps: true,
        paranoid : true,
    })
}