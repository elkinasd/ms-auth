class User {
    constructor({ id, name, user, email, passwordHash, createdAt }) {
        this.id = id;
        this.name = name;
        this.user = user;
        this.email = email.toLowerCase();
        this.passwordHash = passwordHash;
        this.createdAt = createdAt || new Date().toISOString();
    }
}

module.exports = User;