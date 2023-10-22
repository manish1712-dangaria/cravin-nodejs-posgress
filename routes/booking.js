const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/BookingController');
const verifyAdminToken = require("../middleware/adminAuth");

router.use(
    verifyAdminToken
);
// Create a new booking
router.post('/', BookingController.validate('createBooking'), BookingController.createBooking);

// Get all bookings
router.get('/', BookingController.getAllBookings);

// Get a specific booking by ID
router.get('/:id', BookingController.getBookingById);

// Update a booking by ID
router.put('/:id', BookingController.validate('updateBooking'), BookingController.updateBooking);

// Delete a booking by ID
router.delete('/:id', BookingController.deleteBooking);

module.exports = router;