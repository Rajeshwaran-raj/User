class UserService {
  constructor() {
    // In-memory users list
    this.users = [
      { id: 1, name: "Rajesh", email: "rajesh@example.com" },
      { id: 2, name: "Arun", email: "arun@example.com" },
      { id: 3, name: "Kumar", email: "kumar@example.com" },
      { id: 4, name: "Suresh", email: "suresh@example.com" },
      { id: 5, name: "Priya", email: "priya@example.com" },
      { id: 6, name: "Deepa", email: "deepa@example.com" },
      { id: 7, name: "Rahul", email: "rahul@example.com" },
      { id: 8, name: "Vikram", email: "vikram@example.com" },
      { id: 9, name: "Anjali", email: "anjali@example.com" },
      { id: 10, name: "Mohan", email: "mohan@example.com" },
    ];
    console.log(`[${new Date().toISOString()}] UserService initialized with ${this.users.length} users`);
  }

  log(action, details) {
    console.log(`[${new Date().toISOString()}] [UserService] ${action}:`, details);
  }

  async getAllUsers() {
    this.log("getAllUsers", `Returning ${this.users.length} users`);
    return this.users;
  }

  async getUserById(id) {
    const user = this.users.find(u => u.id === Number(id));
    this.log("getUserById", { id, found: user ? true : false });
    return user;
  }

  async createUser(data) {
    const newId = this.users.length > 0
      ? Math.max(...this.users.map(u => u.id)) + 1
      : 1;

    const newUser = { id: newId, ...data };
    this.users.push(newUser);

    this.log("createUser", newUser);
    return newUser;
  }

  async updateUser(id, updates) {
    const index = this.users.findIndex(u => u.id === Number(id));

    if (index === -1) {
      this.log("updateUser - NOT FOUND", { id });
      return null;
    }

    const updatedUser = { ...this.users[index], ...updates };
    this.users[index] = updatedUser;

    this.log("updateUser", updatedUser);
    return updatedUser;
  }

  async deleteUser(id) {
    const index = this.users.findIndex(u => u.id === Number(id));

    if (index === -1) {
      this.log("deleteUser - NOT FOUND", { id });
      return null;
    }

    const deleted = this.users[index];
    this.users.splice(index, 1);

    this.log("deleteUser", deleted);
    return deleted;
  }
}

module.exports = UserService;
