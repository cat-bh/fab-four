const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Personal extends Model {

}

Personal.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        weight: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        goal_weight: {
            type: DataTypes.DECIMAL
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'personal'
    }
)

module.exports = Personal;