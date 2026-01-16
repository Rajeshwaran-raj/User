const fs = require("fs").promises;
const path = require("path");

class UserService {
  constructor() {
    this.filePath = path.join(__dirname, "../data/user.json");
    console.log(
      `[${new Date().toISOString()}] UserService initialized using JSON file`
    );
  }

  log(action, details) {
    console.log(
      `[${new Date().toISOString()}] [UserService] ${action}:`,
      details
    );
  }

  async ensureFileExists() {
    try {
      await fs.access(this.filePath);
    } catch {
      await fs.mkdir(path.dirname(this.filePath), { recursive: true });
      await fs.writeFile(this.filePath, "[]", "utf-8");
      this.log("ensureFileExists", "user.json created");
    }
  }

  async readUsers() {
    await this.ensureFileExists();

    const data = await fs.readFile(this.filePath, "utf-8");

    if (!data.trim()) {
      return [];
    }

    try {
      return JSON.parse(Buffer.from(data, "base64").toString("utf-8"));
    } catch (err) {
      this.log("readUsers - INVALID JSON", err.message);
      throw new Error("user.json contains invalid JSON");
    }
  }

  async writeUsers(users) {
    await fs.writeFile(
      this.filePath,
      JSON.stringify(users, null, 2),
      "utf-8"
    );
  }

  async getAllUsers() {
    const users = await this.readUsers();
    this.log("getAllUsers", `Returning ${users.length} users`);
    return users;
  }

  async getUserById(id) {
    const users = await this.readUsers();
    const user = users.find(u => u.id === Number(id));
    this.log("getUserById", { id, found: !!user });
    return user;
  }

  async createUser(data) {
    const users = await this.readUsers();

    const newId =
      users.length > 0
        ? Math.max(...users.map(u => u.id)) + 1
        : 1;

    const newUser = { id: newId, ...data };
    users.push(newUser);

    await this.writeUsers(users);
    this.log("createUser", newUser);

    return newUser;
  }

  async updateUser(id, updates) {
    const users = await this.readUsers();
    const index = users.findIndex(u => u.id === Number(id));

    if (index === -1) {
      this.log("updateUser - NOT FOUND", { id });
      return null;
    }

    users[index] = { ...users[index], ...updates };
    await this.writeUsers(users);

    this.log("updateUser", users[index]);
    return users[index];
  }

  async deleteUser(id) {
    const users = await this.readUsers();
    const index = users.findIndex(u => u.id === Number(id));

    if (index === -1) {
      this.log("deleteUser - NOT FOUND", { id });
      return null;
    }

    const deletedUser = users[index];
    users.splice(index, 1);

    await this.writeUsers(users);
    this.log("deleteUser", deletedUser);

    return deletedUser;
  }
}

module.exports = UserService;
