const express = require('express');
const { requireAuth } = require('../services/auth.services');
const { findBookings, findBookingById, createBooking, updateBooking, deleteBooking } = require('../controllers/booking.controllers');
const router = express.Router();

router.get('/booking', requireAuth, findBookings);
router.get('/booking/:bookingId', requireAuth, findBookingById);
router.post('/booking/add', requireAuth, createBooking);
router.put('/booking/modify/:bookingId', requireAuth, updateBooking);
router.delete('/booking/remove/:bookingId', requireAuth, deleteBooking);

module.exports = router;