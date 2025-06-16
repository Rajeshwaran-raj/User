class UserRepository {
  constructor({ model }) {
    this.model = model;
  }
  
  async getAllUsers() {
    try {
      return await this.model.findAll();
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw new Error(
        'Database error occurred while fetching users',
        'Database Error',  
       );    
    }
  }

  async getUserById(id) {
    try {
      return await this.model.findByPk(id);
    } catch (error) {
      console.error('DB_ERROR', 'Failed to fetch user by ID', error);
      throw new Error(
        'Database error occurred while fetching users',
        'Database Error', 
      );
    }
  }

  async createUser(data) {
    try {
      console.info('Request to Create User in Repository.', { data });
      return await this.model.create(data);
    } catch (error) {
      console.error('DB_ERROR', 'Failed to create user', error);
      throw new Error(
        'Database error occurred while fetching users',
        error.message, 
      );
    }
  }

  async updateUser(id, updates) {
    try {
      const user = await this.model.findByPk(id);
      if (!user) return null;
      await user.update(updates);
      return user;
    } catch (error) {
      console.error('DB_ERROR', 'Failed to update user', error);
      throw new Error(
        'Database error occurred while fetching users',
        error.message, 
      );
    }
  }

  async deleteUser(id) {
    try {
      const user = await this.model.findByPk(id);
      if (!user) return null;
      await user.destroy();
      return true;
    } catch (error) {
      console.error('DB_ERROR', 'Failed to delete user', error);
      throw new Error(
        'Database error occurred while fetching users',
        'Database Error', 
      );
    }
  }
}

module.exports = UserRepository;