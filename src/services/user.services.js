const prisma = require("../config/database");
const HttpError = require("../utils/HttpError");

/**
 * Create a User
 * @param {Object} userData 
 */

const create = async (userData) => {
    try{
        const user = await prisma.user.create({
            data: userData
        })

        return user;
    }
    catch(err) {
        throw new HttpError(err.status, err.message, err.data)
    }
}

/**
 * Update a User
 * 
 * @param {Object} userData 
 */
const update = async (userData) => {
    try{
        const user = await getUserById(userData.id);
        if(!user){
            throw new HttpError(404, `User not found !`, null)
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: userData.id
            },
            data: userData
        })

        return updatedUser
    }
    catch(err){
        throw new HttpError(err.status, err.message, err.data)
    }
}

/**
 * Get A List Of Users
 */
const getUsers = async () => {
    try{
        const users = await prisma.user.findMany();
        return users;
    }catch(err){
        throw new HttpError(err.status, err.message, err);
    }
}


/**
 * get User By Id
 * @param {String} userId
 */
const getUserById = async (userId) => {
    try {
        const user = await prisma.user.findUnique({
            where: {id : userId}
        });

        if(!user){
            throw new HttpError(404, `User not found !`, null)
        }

        return user;
    } catch(err) {
        throw new HttpError(err.status, err.message, err.data)
    }
}

//Find Unique User By Any Property
const findUserBy = async (valueObject) => {
    try{
        const user = await prisma.user.findUnique({
            where: valueObject
        });

        return user;
    }catch(err){
        throw new HttpError(err.data, err.message, err.data);
    }
}

/**
 * @param {String} userId
 */
const remove = async (userId) => {
    try{
        const user = await getUserById(userId);
        if(!user){
            throw new HttpError(404, `User not found !`, null)
        }
        const isDeleted = await prisma.user.delete({where: {id: userId}})
        return isDeleted ? true : false;
    }catch(err){
        throw new HttpError(err.status, err.message, err.data)
    }
}

module.exports =  {
    create,
    update,
    getUsers,
    getUserById,
    findUserBy,
    remove
}