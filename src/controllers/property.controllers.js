const { create, update, getProperties, getPropertyById, remove } = require("../services/property.services");
const { uploadFile } = require("../services/upload.services");
const { isAllFilled } = require("../utils/Fields");
const HttpError = require("../utils/HttpError");

//Create New Property Controller
const createProperty = async (req, res, next) => {
    try{
        const { title, description, location, price, categoryId, ownerId } = req.body;

        //Upload Property Cover
        const fileUrl  = await uploadFile(req.file);

        const propertyData = {
            title, description, location, price: parseFloat(price), cover: fileUrl, categoryId: categoryId, ownerId: ownerId
        }

        if(!isAllFilled(propertyData)){
            throw new HttpError(401, "Do not pass a empty value", propertyData);
        }
        const property = await create(propertyData);
        res.status(201).json({
            status: 201,
            message: "Property was successfully created!",
            data: property
        })
    }catch(err){
        next(err);
    }
}

//Update A Property Controller
const updateProperty = async (req, res, next) => {
    try{
        const { propertyId } = req.params;
        const propertyData = { title, description, location, price } = req.body;
        const updatedPropertyData = {
            id: propertyId,
            ...propertyData
        }

        const updatedProperty = await update(updatedPropertyData);
        res.status(201).json({
            status: 201,
            message: "Property was successfully updated!",
            data: updatedProperty
        })
    }catch(err){
        next(err);
    }
}

//Get A List Of Properties Controller
const findProperties = async (req, res, next) => {
    try{
        const properties = await getProperties();
        res.status(201).json({
            status: 201,
            message: "Properties was successfully founded!",
            data: properties
        })
    }catch(err){
        next(err);
    }
}

//Find Property By Id Controller
const findPropertyById = async (req, res, next) => {
    try{
        const { propertyId } = req.params;
        const property = await getPropertyById(propertyId);
        res.status(201).json({
            status:201,
            message: "Property was successfully founded!",
            data: property
        })
    }catch(err){
        next(err);
    }
}

//Remove Property By Id Controller
const deleteProperty = async (req, res, next) => {
    try{
        const { propertyId } = req.params;
        const isDeleted = await remove(propertyId);

        res.status(201).json({
            status: 201,
            message: "Property was successfully removed!",
            data: isDeleted
        })
    }catch(err){
        next(err)
    }
}

module.exports = {
    createProperty,
    updateProperty,
    findProperties,
    findPropertyById,
    deleteProperty
}