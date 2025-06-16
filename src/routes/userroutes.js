const express = require('express');

const userRoutes = express.Router({ mergeParams: true });

const UserController = require('../controller/UserController');

userRoutes.get('/', UserController.getAllUsers);
userRoutes.get('/:id', UserController.getUserById);
userRoutes.post('/', UserController.createUser);
userRoutes.put('/:id', UserController.updateUser);
userRoutes.delete('/:id', UserController.deleteUser);

module.exports = userRoutes;
