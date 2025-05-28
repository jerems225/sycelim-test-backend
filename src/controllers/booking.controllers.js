const { create, getBookings, getBookingById, remove, update } = require("../services/booking.services");
const { isAllFilled } = require("../utils/Fields");
const HttpError = require("../utils/HttpError");


//Create Booking Controller
const createBooking = async (req, res, next) => {
    try{
        
        const bookingData = { userId: userId, propertyId: propertyId } = req.body;
        if(!isAllFilled(bookingData)){
            throw new HttpError(401, "Do not pass a empty value", bookingData);
        }

        const booking = await create(bookingData);
        res.status(201).json({
            status: 201,
            message: "Property was successfully booked!",
            data: booking
        })
    }catch(err){
        next(err)
    }
}

//Update Booking Controller
const updateBooking = async (req, res, next) => {
    try{
        const { bookingId } = req.params;
        const bookingData = { userId, propertyId, status } = req.body;
        const updatedBookingData = {
            id: bookingId,
            ...bookingData
        }

        const updatedBooking = await update(updatedBookingData);
        res.status(201).json({
            status: 201,
            message: "The Booking was successfully updated!",
            data: updatedBooking
        })

    }catch(err){
        next(err)
    }
}

//Get A List of Booking Controller
const findBookings = async (req, res, next) => {
    try{
        const bookings = await getBookings();
        res.status(201).json({
            status: 201,
            message: "Booked Properties was successfully founded!",
            data: bookings
        })
    }catch(err){
        next(err)
    }
}

//Find A Booking Controller
const findBookingById = async (req, res, next) => {
    try{
        const { bookingId } = req.params;
        const booking = await getBookingById(bookingId);

        res.status(201).json({
            status: 201,
            message: "Booked Property was successfully founded!",
            data: booking
        })
    }catch(err){
        next(err)
    }
}

//Remove Booking Controller
const deleteBooking = async (req, res, next) => {
    try{
        const { bookingId } = req.params;
        const isDeleted = await remove(bookingId);

        res.status(201).json({
            status: 201,
            message: "Booked Property was successfully removed!",
            data: isDeleted
        })
    }catch(err){
        next(err)
    }
}

module.exports = {
    createBooking,
    updateBooking,
    findBookings,
    findBookingById,
    deleteBooking
}