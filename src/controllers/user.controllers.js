const { getUsers, getUserById, remove, update } = require("../services/user.services");

//Find a List Of Users Controller
const findUsers = async (req, res, next) => {
    try{
        const users = await getUsers();
        res.status(201).json({
            status: 201,
            message: "Users found successfully !",
            data: users
        });
    }
    catch(err){
        next(err);
    }
}

//Find A User By Id Controller
const findUserById = async (req, res, next) => {
    try{
        const { userId } = req.params
        const user = await getUserById(userId);
        res.status(201).json({
            status: 201,
            message: "User founded successfully!",
            data: user
        });
    }catch(err){
        next(err)
    }
}

//Update A User By Id Controller
const updateUser = async (req, res, next) => {
    try{
        const { userId } = req.params;
        const userData = { fullName, email } = req.body;
        const updatedUserDatas = {
            id: userId,
            ...userData
        }
        const updatedUser = await update(updatedUserDatas);
        res.status(201).json({
            status: 201,
            message: "User was successfully updated!",
            data: updatedUser
        })
    }catch(err){
        next(err)
    }
}

//Delete A User By Id Controller
const deleteUser = async (req, res, next) => {
    try{
        const { userId } = req.params;
        const isDeleted = await remove(userId);
        res.status(201).json({
            status: 201,
            message: "User was successfully removed!",
            data: isDeleted
        });
    }catch(err){
        next(err);
    }
}

module.exports = {
    findUsers,
    findUserById,
    updateUser,
    deleteUser
}