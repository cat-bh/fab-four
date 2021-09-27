const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Stats extends Model {

}

Stats.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        activity: {
            type: DataTypes.STRING,
            allowNull: false
        },
        distance: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        calories_burned: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        calories_intake: {
            type: DataTypes.INTEGER
        },
        water: {
            type: DataTypes.INTEGER
        },
        /* date: {
            type: DataTypes.DATE,
            allowNull: false
        }, */
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'stats'
    }
)

module.exports = Stats;