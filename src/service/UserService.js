const { DataTypes } = require('sequelize');
const User  = require('../../models/user');
const db = require('../../Connection');
const UserRepository = require('../repository/UserRepository');

const userModel = require('../../models/user')(
  db.sequelize,
  DataTypes,
);

class UserService {
  constructor() {
    this.userRepository = new UserRepository({ model: userModel });
  }

  async getAllUsers() {
    const users = await this.userRepository.getAllUsers();
    if (!users || users.length === 0) {
      throw new NotFoundError(
        constants.ERROR_CODES.USER_NOT_FOUND_CODE,
        'No users found.'
      );
    }
    return users;
  }

  async getUserById(id) {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new NotFoundError(
        constants.ERROR_CODES.USER_NOT_FOUND_CODE,
        `User with ID ${id} not found.`
      );
    }
    return user;
  }

  async createUser(data) {
    console.info('Request to Create User in Service.', { data });
    return await this.userRepository.createUser(data);
  }

  async updateUser(id, updates) {
    const user = await this.userRepository.updateUser(id, updates);
    if (!user) {
      throw new NotFoundError(
        constants.ERROR_CODES.USER_NOT_FOUND_CODE,
        `User with ID ${id} not found for update.`
      );
    }
    return user;
  }

  async deleteUser(id) {
    const result = await this.userRepository.deleteUser(id);
    if (!result) {
      throw new NotFoundError(
        constants.ERROR_CODES.USER_NOT_FOUND_CODE,
        `User with ID ${id} not found for deletion.`
      );
    }
    return result;
  }
}

module.exports = UserService;