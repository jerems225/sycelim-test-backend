const prisma = require("../config/database");
const HttpError = require("../utils/HttpError")

//Create Book property
const create = async (bookingData) => {
    try{
        const booking = await prisma.booking.create({
            data: bookingData
        });

        return booking;
    }catch(err){
        throw new HttpError(err.status, err.message, err.data);
    }
}

//Update Book property
const update = async (bookingData) => {
    try{
        const booking = await getBookingById(bookingData.id)
        if(!booking){
            throw new HttpError(404, "Booking not found !", null);
        }

        const updatedBooking = await prisma.booking.update({ where: {
            id: bookingData.id
            }, data: bookingData
        });

        return updatedBooking;
    }catch(err){
        throw new HttpError(err.status, err.message, err.data);

    }
}

//Get A List of Book property
const getBookings = async () => {
    try{
        const bookings = await prisma.booking.findMany({
            include: {
                user: true,
                property: true
            }
        });
        return bookings;
    }catch(err){
        throw new HttpError(err.status, err.message, err.data);

    }
}

//Get Book property
const getBookingById = async (bookingId) => {
    try{
        const booking = await prisma.booking.findUnique({where: { id : bookingId }});
        if(!booking){
            throw new HttpError(404, "Booking not found !", null);
        }
        return booking;
    }catch(err){
        throw new HttpError(err.status, err.message, err.data);

    }
}

//Remove Booking
const remove = async (bookingId) => {
    try{
        const booking = await getBookingById(bookingId)
        if(!booking){
            throw new HttpError(404, "Booking not found !", null);
        }
        const isDeleted = await prisma.booking.delete({where: {id : bookingId }});
        return isDeleted ? true : false;
    }catch(err){
        throw new HttpError(err.status, err.message, err.data);

    }
}

module.exports = {
    create,
    update,
    getBookings,
    getBookingById,
    remove
}