const express = require('express');
const { requireAuth } = require('../services/auth.services');
const { findCategories, findCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/p.category.controllers');
const router = express.Router();

router.get('/categories', requireAuth, findCategories);
router.get('/categories/:categoryId', requireAuth, findCategoryById);
router.post('/categories/add', requireAuth, createCategory);
router.put('/categories/modify/:categoryId', requireAuth, updateCategory);
router.delete('/categories/remove/:categoryId', requireAuth, deleteCategory)

module.exports = router;