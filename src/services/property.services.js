const prisma = require("../config/database");
const HttpError = require("../utils/HttpError");
const { getCategoryById } = require("./p.category.services");
const { getUserById } = require("./user.services");

/**
 * Create A Property
 * 
 * @param {Object} propertyData 
 */
const create = async (propertyData) => {
    try {
        const owner = await getUserById(propertyData.ownerId);
        if(!owner){
            throw new HttpError(404, `Owner not found !`, null)
        }

        const category = await getCategoryById(propertyData.categoryId)
        if(!category){
            throw new HttpError(404, `Properties Categroy not found !`, null)
        }

        const property = await prisma.properties.create({
            data: propertyData
        });

        return property;
    } catch (err) {
        throw new HttpError(err.status, err.message, err.data);
    }
}

/**
 * Update A Property
 * 
 * @param {Object} propertyData 
 */
const update = async (propertyData) => {
    try {
        const property = await getPropertyById(propertyData.id);
        if(!property){
            throw new HttpError(404, `Property not found !`, null);
        }

        const updatedProperty = await prisma.properties.update({
            where: {
                id: propertyData.id
            },
            data: propertyData
        });

        return updatedProperty;
    } catch (err) {
        throw new HttpError(err.status, err.message, err.data);
    }
}

/**
 * Get A List Of Properties
 */
const getProperties = async () => {
    try{
        const properties = await prisma.properties.findMany({
            include: {
                owner: true,
                category: true
            }
        });
        return properties;
    }catch (err) {
        throw new HttpError(err.status, err.message, err.data);
    }
}

/**
 * Get A Property
 * 
 * @param {String} propertyId 
 */
const getPropertyById = async (propertyId) => {
    try{
        const property = await prisma.properties.findUnique({where: {id: propertyId}, include : {
            owner: true,
            category: true
        }});

        if(!property){
            throw new HttpError(404, `Property not found !`, null)
        }

        return property;
    }catch (err) {
        throw new HttpError(err.status, err.message, err.data);
    }
}

/**
 * Remove A Property
 * 
 * @param {String} propertyId 
 */
const remove = async (propertyId) => {
    try{
        const property = await getPropertyById(propertyId);
        if(!property){
            throw new HttpError(404, `Property not found !`, null)
        }
        const isDeleted = await prisma.properties.delete({ where: {id: propertyId}});
        return isDeleted ? true : false;
    }catch (err) {
        throw new HttpError(err.status, err.message, err.data);
    }
}

module.exports = {
    create,
    update,
    getProperties,
    getPropertyById,
    remove
}