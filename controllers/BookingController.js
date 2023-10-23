const BookingService = require('../services/booking.service');
const { body } = require('express-validator');
const bookingService = new BookingService();

exports.validate = (method) => {
    switch (method) {
        case 'createBooking': {
            return [
                body('name').notEmpty(),
            ];
        }
        case 'updateBooking': {
            return [
                body('name').notEmpty(),
            ];
        }
    }
};

// Create a new booking
exports.createBooking = async (req, res) => {
    try {
        const bookingData = req.body;
        const booking = await bookingService.createBooking(bookingData);
        res.status(201).json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const queryParams = req.query
        const bookings = await bookingService.getAllBookings(queryParams);
        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Get a booking by ID
exports.getBookingById = async (req, res) => {
    const { bookingId } = req.params;
    try {
        const booking = await bookingService.getBookingById(bookingId);
        res.json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Update a booking by ID
exports.updateBooking = async (req, res) => {
    const { bookingId } = req.params;
    const updatedData = req.body;
    try {
        const booking = await bookingService.updateBooking(bookingId, updatedData);
        res.json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Delete a booking by ID
exports.deleteBooking = async (req, res) => {
    const { bookingId } = req.params;
    try {
        await bookingService.deleteBooking(bookingId);
        res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
