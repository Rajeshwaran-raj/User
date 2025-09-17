const UserService = require('../service/UserService');

const userService = new UserService();

class UserController {
static async getAllUsers(req, res) {
    try {
      console.info('Request to Get All Users.');
      const users = await userService.getAllUsers();
      return res.status(200).json({
        status: 'Success',
        message: 'Users fetched successfully.',
        data: users,
      });
    } catch (error) {
      console.error('Error fetching users', { message: error.message });
      return res.status(500).json({
        status: 'Error fetching users',
        message: 'Error fetching users.',
        error: error.message,
      });
    }
  }

    static async getUserById(req, res) {
    try { 
      const { id } = req.params;
      const user = await userService.getUserById(id);
      return res.status(200).json({
        status: 'Success',
        message: 'User fetched successfully.',
        data: user,
      });
    } catch (error) {
       console.error('Error fetching user by id', { message: error.message });
       return res.status(500).json({
        status: 'Error fetching users',
        message: 'Error fetching users.',
        error: error.message,
      });    
    }
  }

    static async createUser(req, res) {
    try {
      const userData = req.body;
      console.info('Request to Create User.', { userData });
      const user = await userService.createUser(userData);
      return res.status(201).json({
        status: 'Success',
        message: 'User created successfully.',
        data: user,
      });
    } catch (error) {
       console.error('Error creating user', { message: error.message });
       return res.status(500).json({
        status: 'Error fetching users',
        message: 'Error fetching users.',
        error: error.message,
      });
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
        console.error('Error updating user', { message: error.message });
      return res.status(500).json({ 
        status: 'Error updating user',
        message: 'Error updating user.',
        error: error.message,
      });
    }
  }

    static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await userService.deleteUser(id);
      return res.status(200).json({
        status: 'Success',
        message: 'User deleted successfully.',
      });
    } catch (error) {
        console.error('Error deleting user', { message: error.message });
        return res.status(500).json({
            status: 'Error deleting user',
            message: 'Error deleting user.',
            error: error.message,
        });
    }
  }
  
}

module.exports = UserController;