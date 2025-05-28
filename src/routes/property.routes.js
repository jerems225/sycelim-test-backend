const express = require('express');
const { findProperties, findPropertyById, createProperty, updateProperty, deleteProperty } = require('../controllers/property.controllers');
const { requireAuth } = require('../services/auth.services');
const { upload } = require('../services/upload.services');
const router = express.Router()

router.get('/properties', findProperties);
router.get('/properties/:propertyId', findPropertyById);
router.post('/properties/add', upload.single('cover'), requireAuth, createProperty);
router.put('/properties/modify/:propertyId', requireAuth, updateProperty);
router.delete('/properties/remove/:propertyId', requireAuth, deleteProperty);

module.exports = router;