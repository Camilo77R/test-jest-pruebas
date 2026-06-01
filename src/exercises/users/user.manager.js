class UserManager {
  constructor() {
    this.users = new Set();
  }

  normalizeName(name) {
    if (typeof name !== 'string') {
      throw new TypeError('El nombre del usuario debe ser texto');
    }

    const normalized = name.trim();
    if (!normalized) {
      throw new Error('El nombre del usuario no puede estar vacío');
    }

    return normalized;
  }

  addUser(name) {
    const normalized = this.normalizeName(name);
    this.users.add(normalized);
    return this.listUsers();
  }

  findUser(name) {
    const normalized = this.normalizeName(name);
    return this.users.has(normalized);
  }

  removeUser(name) {
    const normalized = this.normalizeName(name);
    return this.users.delete(normalized);
  }

  listUsers() {
    return [...this.users];
  }

  clear() {
    this.users.clear();
  }
}

module.exports = {
  UserManager,
};
