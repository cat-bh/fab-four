const User = require('./User');
const Personal = require('./Personal');
const Stats = require('./Stats');

User.hasMany(Stats, {
    foreignKey: 'user_id'
});

Stats.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasOne(Personal, {
    foreignKey: 'user_id'
});

Personal.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Personal, Stats };