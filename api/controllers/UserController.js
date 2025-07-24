const c = require('config');
const UserService = require('../../services/UserService');
const constants = require('../../shared/constants/ResponseConstants');
const ErrorHandler = require('../../shared/utils/ErrorHandler');

const userService = new UserService();

class UserController {
  static async getAllUsers(req, res) {
    try {
      console.info('Request to Get All Users.');
      const users = await userService.getAllUsers();
      console.info('Users fetched successfully.', { users });
      return res.status(200).json({
        status: constants.STATUS.SUCCESS,
        message: 'Users fetched successfully.',
        data: users,
      });
    } catch (error) {
      console.error('Error fetching users', { error });
      return ErrorHandler.handle(error, res);
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      return res.status(200).json({
        status: constants.STATUS.SUCCESS,
        message: 'User fetched successfully.',
        data: user,
      });
    } catch (error) {
      return ErrorHandler.handle(error, res);
    }
  }

  static async createUser(req, res) {
    try {
      const userData = req.body;
      const user = await userService.createUser(userData);
      return res.status(201).json({
        status: constants.STATUS.SUCCESS,
        message: 'User created successfully.',
        data: user,
      });
    } catch (error) {
      return ErrorHandler.handle(error, res);
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const user = await userService.updateUser(id, updates);
      return res.status(200).json({
        status: constants.STATUS.SUCCESS,
        message: 'User updated successfully.',
        data: user,
      });
    } catch (error) {
      return ErrorHandler.handle(error, res);
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await userService.deleteUser(id);
      return res.status(200).json({
        status: constants.STATUS.SUCCESS,
        message: 'User deleted successfully.',
      });
    } catch (error) {
      return ErrorHandler.handle(error, res);
    }
  }
}

module.exports = UserController;
