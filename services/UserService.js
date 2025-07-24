const constants = require('../shared/constants/ResponseConstants');

class UserService {
  constructor() {
    this.users = [
      { id: 1, name: 'Alice', email: 'alice@example.com',age : 25 },
      { id: 2, name: 'Bob', email: 'bob@example.com', age : 30 },
      { id: 3, name: 'Marley', email: 'marley@example.com' , age : 28 },
      { id: 4, name: 'Rajesh', email: 'rajesh@example.com' , age : 35 },
      { id: 5, name: 'Sita', email: 'sita@example.com' , age : 22 },
      { id: 6, name: 'John', email: 'john@example.com' , age : 40 },
      { id: 7, name: 'cena', email: 'cena@example.com' , age : 40 },
      //{ id: 8, name: 'Derek', email: 'Derek@gmail.com' , age : 45 },
    ];
    this.nextId = this.users.length + 1;
  }

  async getAllUsers() {
    if (this.users.length === 0) {
      throw new Error('No users found');
    }
    console.info('Fetching all users from the service.');
    return this.users;
  }

  async getUserById(id) {
    const user = this.users.find((u) => u.id == id);
    if (!user) {
      throw new Error(`User with ID ${id} not found.`);
    }
    return user;
  }

  async createUser(data) {
    const newUser = { id: this.nextId++, ...data };
    this.users.push(newUser);
    return newUser;
  }

  async updateUser(id, updates) {
    const idx = this.users.findIndex((u) => u.id == id);
    if (idx === -1) {
      throw new Error(`User with ID ${id} not found for update.`);
    }
    this.users[idx] = { ...this.users[idx], ...updates };
    return this.users[idx];
  }

  async deleteUser(id) {
    const idx = this.users.findIndex((u) => u.id == id);
    if (idx === -1) {
      throw new Error(`User with ID ${id} not found for deletion.`);
    }
    const removed = this.users.splice(idx, 1);
    return removed[0];
  }
}

module.exports = UserService;
