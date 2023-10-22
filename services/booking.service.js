const { Booking } = require('../models');
const { Op } = require('@sequelize/core');
class BookingService {
    // Create a new booking
    async createBooking(bookingData) {
        try {
            return await Booking.create(bookingData);
        } catch (error) {
            throw new Error('Failed to create a booking.');
        }
    }

    // Get all bookings
    async getAllBookings(data) {
        try {
            console.log(data)
            if(data.club_id !== undefined || data.customer_id !== undefined) {
                return await Booking.findAll({
                    where: data,
                })
            } else {
                return await Booking.findAll();
            }
        } catch (error) {
            throw new Error('Failed to fetch bookings.');
        }
    }

    // Get a booking by ID
    async getBookingById(bookingId) {
        try {
            const booking = await Booking.findByPk(bookingId);
            if (!booking) {
                throw new Error('Booking not found.');
            }
            return booking;
        } catch (error) {
            throw new Error('Failed to fetch the booking.');
        }
    }

    // Update a booking by ID
    async updateBooking(bookingId, updatedData) {
        try {
            const booking = await Booking.findByPk(bookingId);
            if (!booking) {
                throw new Error('Booking not found.');
            }
            await booking.update(updatedData);
            return booking;
        } catch (error) {
            throw new Error('Failed to update the booking.');
        }
    }

    // Delete a booking by ID
    async deleteBooking(bookingId) {
        try {
            const booking = await Booking.findByPk(bookingId);
            if (!booking) {
                throw new Error('Booking not found.');
            }
            await booking.destroy();
        } catch (error) {
            throw new Error('Failed to delete the booking.');
        }
    }
}

module.exports = BookingService;
