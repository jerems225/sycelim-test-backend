const prisma = require("../config/database");
const { create, getCategoryById, update, getCategories, remove } = require("../services/p.category.services");
const { isAllFilled } = require("../utils/Fields");

//Create A Properties Category Controller
const createCategory = async (req, res, next) => {
    try{
        const categoryData = { title, description } = req.body;
        if(!isAllFilled(categoryData)){
            throw new HttpError(401, "Do not pass a empty value", categoryData);
        }

        const category = await create(categoryData);
        res.status(201).json({
            status: 201,
            message: "Properties Category was successfully created!",
            data: category
        })
    }catch(err){
        next(err);
    }
}

//Update A Properties Category Controller
const updateCategory = async (req, res, next) => {
    try{
        const { categoryId } = req.params;
        const categoryData = { title, description } = req.body;
        const updatedCategoryData = {
            id: categoryId,
            ...categoryData
        }

        const updatedCategory = await update(updatedCategoryData);
        res.status(201).json({
            status: 201,
            message: "Properties Category was successfully updated!",
            data: updatedCategory
        });
    }catch(err){
        next(err);
    }
}

//Get A  List Of Properties Category Controller
const findCategories = async (req, res, next) => {
    try{
        const categories = await getCategories();
        res.status(201).json({
            status: 201,
            message: "Properties Categories was successfully founded!",
            data: categories
        })
    }catch(err){
        next(err);
    }
}

//Find A Properties Category Controller
const findCategoryById = async (req, res, next) => {
    try{
        const { categoryId } = req.params;
        const category = await getCategoryById(categoryId);

        res.status(201).json({
            status: 201,
            message: "Properties Category was successfully founded!",
            data: category
        })
    }catch(err){
        next(err);
    }
}

//Remove A Properties Category Controller
const deleteCategory = async (req, res, next) => {
    try{
        const { categoryId } = req.params;
        const isDelete = await remove(categoryId);

        res.status(201).json({
            status: 201,
            message: "Properties Category was successfully removed!",
            data: isDelete
        })
    }catch(err){
        next(err);
    }
}

module.exports = {
    createCategory,
    updateCategory,
    findCategories,
    findCategoryById,
    deleteCategory
}