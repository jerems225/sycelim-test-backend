const prisma = require("../config/database");
const HttpError = require("../utils/HttpError")

/**
 * Create A Properties Category
 */
const create = async (categoryData) => {
    try {
        const category = await prisma.properties_categories.create({
            data: categoryData
        });

        return category;
    } catch (err) {
        throw new HttpError(err.status, err.message, err.data);
    }
}

/**
 * Update A Properties Category
 */
const update = async (categoryData) => {
    try {
        const category = await getCategoryById(categoryData.id);
        if (!category) {
            throw new HttpError(404, "Category not found!", null);
        }

        const updatedCategory = await prisma.properties_categories.update({where: {
                id: category.id
            }, data: categoryData
        });

        return updatedCategory;
    } catch (err) {
        throw new HttpError(err.status, err.message, err.data);
    }
}

/**
 * Get A List Of Properties Categories
 */
const getCategories = async () => {
    try {
        const categories = await prisma.properties_categories.findMany();
        return categories;
    } catch (err) {
        throw new HttpError(err.status, err.message, err.data);
    }
}

/**
 * Get A Properties Category
 */
const getCategoryById = async (categoryId) => {
    try {
        const category = await prisma.properties_categories.findUnique({ where: { id: categoryId } });
        if (!category) {
            throw new HttpError(404, "Category not found!", null);
        }

        return category;
    } catch (err) {
        throw new HttpError(err.status, err.message, err.data);
    }
}

/**
 * Remove A Properties Category
 */
const remove = async (categoryId) => {
    try {
        const category = await getCategoryById(categoryId);
        if (!category) {
            throw new HttpError(404, "Category not found!", null);
        }

        const isDeleted = await prisma.booking.delete({where: {id: categoryId}})
        return isDeleted ? true : false;
    } catch (err) {
        throw new HttpError(err.status, err.message, err.data);
    }
}

module.exports = {
    create,
    update,
    getCategories,
    getCategoryById,
    remove
}