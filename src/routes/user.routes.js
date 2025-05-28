const express = require('express');
const { findUsers, findUserById, updateUser, deleteUser } = require('../controllers/user.controllers');
const { requireAuth } = require('../services/auth.services');
const router = new express.Router();

router.get('/users', requireAuth, findUsers);
router.get('/users/:userId', requireAuth, findUserById);
router.put('/users/modify/:userId', requireAuth, updateUser);
router.delete('/users/remove/:userId', requireAuth, deleteUser);

module.exports = router;