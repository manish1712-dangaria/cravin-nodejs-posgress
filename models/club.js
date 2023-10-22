'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Club extends Model {
        static associate(models) {
            // Define associations here (if any)
        }
    }

    Club.init({
        club_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        club_name: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Club',
    });

    return Club;
};
