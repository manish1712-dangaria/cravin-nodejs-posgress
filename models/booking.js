'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        static associate(models) {
            Booking.belongsTo(models.Customer, { foreignKey: 'customer_id' });
            // Define other associations here (if any)
        }
    }

    Booking.init({
        booking_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        club_id: DataTypes.INTEGER,
        time_of_booking: DataTypes.DATE,
        bill: DataTypes.DECIMAL(10, 2),
    }, {
        sequelize,
        modelName: 'Booking',
    });

    // Define the afterCreate and afterUpdate hooks
    Booking.afterCreate(async (booking, options) => {
        // Calculate the total spend of the customer associated with this booking
        const customer = await booking.getCustomer();
        const bookings = await customer.getBookings();
        const total_spend = bookings.reduce((sum, b) => sum + (parseFloat(b.bill) || 0), 0);
        await customer.update({ total_spend, number_of_bookings: bookings.length });
    });

    Booking.afterUpdate(async (booking, options) => {
        // Calculate the total spend of the customer associated with this booking
        const customer = await booking.getCustomer();
        const bookings = await customer.getBookings();
        const total_spend = bookings.reduce((sum, b) => sum + (parseFloat(b.bill) || 0), 0);
        await customer.update({ total_spend, number_of_bookings: bookings.length });
    });

    return Booking;
};
