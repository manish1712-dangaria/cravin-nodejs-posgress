'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
        static associate(models) {
            Customer.hasMany(models.Booking, { foreignKey: 'customer_id' });
            // Define other associations here (if any)
        }
    }

    Customer.init({
        customer_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        customer_name: DataTypes.STRING,
        broadcast: DataTypes.BOOLEAN,
        number_of_bookings: DataTypes.INTEGER,
        total_spend: DataTypes.DECIMAL(10, 2),
        facility: {
            type: DataTypes.TEXT('long'),
            get() {
                // Convert the JSON string back to an array when accessing the attribute
                return this.getDataValue('facility').split(',');
            },
            set(value) {
                // Convert the array to a JSON string when setting the attribute
                this.setDataValue('facility', value.join(','));
            },
        }
    }, {
        sequelize,
        modelName: 'Customer',
    });

    return Customer;
};
